import { Firestore } from '@google-cloud/firestore';
import admin from 'firebase-admin';

// Initialize Firestore
let db: Firestore;

if (!admin.apps.length) {
  // In production (Firebase), credentials are automatically provided
  // In development, you can use a service account key
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
    });
  } else {
    // For Firebase deployment, no credentials needed
    admin.initializeApp();
  }
}

db = admin.firestore();

export { db };

// Collection references
export const collections = {
  users: () => db.collection('users'),
  questions: () => db.collection('questions'),
  quizResponses: () => db.collection('quizResponses'),
};

// User operations
export const userOps = {
  async findByEmail(email: string) {
    const snapshot = await collections.users().where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  async findById(id: string) {
    const doc = await collections.users().doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async create(data: any) {
    const docRef = await collections.users().add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  },

  async update(id: string, data: any) {
    await collections.users().doc(id).update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return this.findById(id);
  },

  async getAll() {
    const snapshot = await collections.users().get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
};

// Question operations
export const questionOps = {
  async findAll() {
    const snapshot = await collections.questions().orderBy('order', 'asc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async findById(id: string) {
    const doc = await collections.questions().doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async create(data: any) {
    const docRef = await collections.questions().add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  },

  async update(id: string, data: any) {
    await collections.questions().doc(id).update({
      ...data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return this.findById(id);
  },

  async delete(id: string) {
    await collections.questions().doc(id).delete();
  },
};

// Quiz response operations
export const quizResponseOps = {
  async findByUserId(userId: string) {
    const snapshot = await collections.quizResponses()
      .where('userId', '==', userId)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async create(data: any) {
    const docRef = await collections.quizResponses().add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  },

  async deleteByUserId(userId: string) {
    const snapshot = await collections.quizResponses()
      .where('userId', '==', userId)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  },

  async findByUserAndQuestion(userId: string, questionId: string) {
    const snapshot = await collections.quizResponses()
      .where('userId', '==', userId)
      .where('questionId', '==', questionId)
      .limit(1)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  async upsert(userId: string, questionId: string, answer: string) {
    const existing = await this.findByUserAndQuestion(userId, questionId);

    if (existing) {
      await collections.quizResponses().doc(existing.id).update({
        answer,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return this.findByUserAndQuestion(userId, questionId);
    } else {
      return this.create({ userId, questionId, answer });
    }
  },
};
