'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Plus, Edit2, Trash2, Users, FileQuestion, Search, ArrowUpDown } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
  hasCompletedQuiz: boolean
  totalResponses?: number
  results?: Record<string, number>
}

interface Question {
  id: string
  question: string
  options: { a: string; b: string; c: string; d: string }
  points: { a: number; b: number; c: number; d: number }
  category: string
  order: number
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date')

  useEffect(() => {
    if (status === 'loading') return // Wait for session to load

    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }

    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchUsers()
      fetchQuestions()
    }
  }, [session])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/admin/questions')
      const data = await res.json()
      setQuestions(data)
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteQuestion = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa domanda?')) return

    try {
      await fetch(`/api/admin/questions/${id}`, { method: 'DELETE' })
      fetchQuestions()
    } catch (error) {
      console.error('Error deleting question:', error)
    }
  }

  // Filter and sort users
  const getFilteredAndSortedUsers = () => {
    let filtered = users.filter(user => {
      const searchLower = searchTerm.toLowerCase()
      return (
        user.name?.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    })

    // Calculate total score for each user
    const usersWithTotalScore = filtered.map(user => {
      let totalScore = 0
      if (user.results) {
        totalScore = Object.values(user.results).reduce((sum, score) => sum + score, 0)
      }
      return { ...user, totalScore }
    })

    // Sort users
    if (sortBy === 'score') {
      usersWithTotalScore.sort((a, b) => b.totalScore - a.totalScore)
    } else {
      usersWithTotalScore.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    return usersWithTotalScore
  }

  const filteredAndSortedUsers = getFilteredAndSortedUsers()

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-600" />
        </div>
      </>
    )
  }

  if (session?.user?.role !== 'ADMIN') {
    return null
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard Amministratore</h1>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Utenti
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <FileQuestion className="w-4 h-4" />
              Domande
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Utenti Registrati</CardTitle>
                <CardDescription>
                  Visualizza tutti gli utenti e i loro risultati del quiz
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Sort Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Cerca per nome o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={sortBy === 'date' ? 'default' : 'outline'}
                      onClick={() => setSortBy('date')}
                      className="flex items-center gap-2"
                    >
                      <ArrowUpDown className="w-4 h-4" />
                      Data Registrazione
                    </Button>
                    <Button
                      variant={sortBy === 'score' ? 'default' : 'outline'}
                      onClick={() => setSortBy('score')}
                      className="flex items-center gap-2"
                    >
                      <ArrowUpDown className="w-4 h-4" />
                      Punteggio Totale
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredAndSortedUsers.map((user) => (
                    <Card key={user.id} className="border-2">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{user.name || 'Nome non specificato'}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                          </div>
                          <div className="text-sm text-gray-500">
                            Registrato: {new Date(user.createdAt).toLocaleDateString('it-IT')}
                          </div>
                        </div>
                      </CardHeader>
                      {user.hasCompletedQuiz && user.results && (
                        <CardContent>
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold">Risultati Quiz ({user.totalResponses} risposte):</h4>
                            <div className="bg-cyan-100 px-4 py-2 rounded-lg">
                              <span className="text-sm text-gray-600">Punteggio Totale: </span>
                              <span className="text-2xl font-bold text-cyan-600">{user.totalScore?.toFixed(1) || 0}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {Object.entries(user.results).map(([category, score]) => (
                              <div key={category} className="bg-gray-50 p-3 rounded">
                                <div className="text-sm text-gray-600">{category}</div>
                                <div className="text-xl font-bold text-cyan-600">{score}/5</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                      {!user.hasCompletedQuiz && (
                        <CardContent>
                          <p className="text-gray-500 italic">Non ha ancora completato il quiz</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                  {filteredAndSortedUsers.length === 0 && users.length > 0 && (
                    <p className="text-center text-gray-500 py-8">Nessun utente trovato con i criteri di ricerca</p>
                  )}
                  {users.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Nessun utente registrato</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gestione Domande</h2>
              <Button onClick={() => {
                setEditingQuestion(null)
                setShowQuestionForm(true)
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Nuova Domanda
              </Button>
            </div>

            {!showQuestionForm && (
              <div className="space-y-4">
                {questions.map((q) => (
                  <Card key={q.id} className="border-2">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{q.question}</CardTitle>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>Categoria: <strong>{q.category}</strong></span>
                            <span>Ordine: <strong>{q.order}</strong></span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingQuestion(q)
                              setShowQuestionForm(true)
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteQuestion(q.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(q.options).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                            <span><strong>{key.toUpperCase()})</strong> {value}</span>
                            <span className="text-cyan-600 font-bold">Punti: {q.points[key as keyof typeof q.points]}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {questions.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <p className="text-gray-500">Nessuna domanda presente. Crea la prima domanda!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {showQuestionForm && (
              <QuestionForm
                question={editingQuestion}
                onSave={() => {
                  setShowQuestionForm(false)
                  setEditingQuestion(null)
                  fetchQuestions()
                }}
                onCancel={() => {
                  setShowQuestionForm(false)
                  setEditingQuestion(null)
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

// Question Form Component
function QuestionForm({
  question,
  onSave,
  onCancel
}: {
  question: Question | null
  onSave: () => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    question: question?.question || '',
    category: question?.category || 'Generale',
    order: question?.order || 0,
    optionA: question?.options.a || '',
    optionB: question?.options.b || '',
    optionC: question?.options.c || '',
    optionD: question?.options.d || '',
    pointsA: question?.points.a || 0,
    pointsB: question?.points.b || 0,
    pointsC: question?.points.c || 0,
    pointsD: question?.points.d || 0,
  })

  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      question: formData.question,
      category: formData.category,
      order: formData.order,
      options: {
        a: formData.optionA,
        b: formData.optionB,
        c: formData.optionC,
        d: formData.optionD
      },
      points: {
        a: formData.pointsA,
        b: formData.pointsB,
        c: formData.pointsC,
        d: formData.pointsD
      }
    }

    try {
      if (question) {
        await fetch(`/api/admin/questions/${question.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      } else {
        await fetch('/api/admin/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }
      onSave()
    } catch (error) {
      console.error('Error saving question:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{question ? 'Modifica Domanda' : 'Nuova Domanda'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="question">Domanda *</Label>
            <Input
              id="question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Categoria *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="order">Ordine</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Risposte e Punteggi</h3>

            {['A', 'B', 'C', 'D'].map((letter) => (
              <div key={letter} className="border p-4 rounded-lg">
                <Label className="text-lg font-semibold mb-2">Risposta {letter}</Label>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor={`option${letter}`}>Testo Risposta *</Label>
                    <Input
                      id={`option${letter}`}
                      value={formData[`option${letter}` as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [`option${letter}`]: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`points${letter}`}>Punteggio (0-5) *</Label>
                    <Input
                      id={`points${letter}`}
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData[`points${letter}` as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [`points${letter}`]: parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                question ? 'Aggiorna Domanda' : 'Crea Domanda'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Annulla
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
