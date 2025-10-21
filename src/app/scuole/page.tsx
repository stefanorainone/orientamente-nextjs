'use client'

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { School } from 'lucide-react'
import Image from 'next/image'

export default function ScuolePage() {
  const schools = {
    campania: [
      'Liceo Scientifico N. Sensale – Nocera Inferiore (SA)',
      'Istituto di Istruzione Superiore "De Filippis – Galdi" – Cava de\' Tirreni (SA)',
      'Istituto di Istruzione Superiore "Parmenide" – Roccadaspide (SA)',
      'Istituto di Istruzione Superiore "T. Confalonieri" – Campagna (SA)',
      'Istituto Tecnico Economico "Antonio Genovesi" – Salerno',
      'Istituto di Istruzione Superiore "Giovanni XXIII" – Battipaglia (SA)'
    ],
    puglia: [
      'I.I.S.S. Fiani – Leccisotti – Torremaggiore (FG)',
      'I.P.E.O.A. Michele Lecce – Manfredonia/San Giovanni Rotondo (FG)',
      'I.I.S.S. Augusto Righi – Cerignola (FG)',
      'I.I.S.S. Einaudi – Foggia',
      'I.I.S.S. Altamura-Da Vinci – Foggia',
      'I.I.S.S. Pavoncelli – Cerignola (FG)'
    ],
    sicilia: [
      'IPSSAT Rocco Chinnici – Nicolosi (CT)',
      'Istituto Tecnico Galileo Ferraris – Acireale (CT)',
      'I.I.S. Francesco Redi – Paternò (CT)',
      'I.I.S. Majorana-Arcoleo – Caltagirone (CT)',
      'I.I.S. Luigi Sturzo – Bagheria (PA)',
      'I.I.S. Don Giovanni Colletto – Corleone (PA)'
    ]
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <School className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Scuole</h1>
            </div>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl">
              Le istituzioni scolastiche partner del progetto OrientaMENTE
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Il progetto coinvolge scuole secondarie di secondo grado in Campania, Puglia e Sicilia,
                offrendo percorsi formativi strutturati basati su metodologie di educazione non formale,
                con approccio peer-to-peer e learning by doing.
              </p>
            </div>

            {/* Campania */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-cyan-600 flex items-center gap-3">
                <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                Campania
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.campania.map((school, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{school}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Puglia */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-blue-600 flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                Puglia
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.puglia.map((school, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{school}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sicilia */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-green-600 flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                Sicilia
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.sicilia.map((school, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{school}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Le Nostre Attività</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_474630671_122163760214277446_6893278854678754103_n_1080-1024x1024.jpg"
                  alt="Attività scolastiche"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_480273104_122166925094277446_749353869561434360_n_1080-819x1024.jpg"
                  alt="Attività scolastiche"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_473618589_122162717306277446_1957688735066618776_n_1080-1024x1024.jpg"
                  alt="Attività scolastiche"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_473070212_122162023628277446_3870046563619403262_n_1080-1024x1024.jpg"
                  alt="Attività scolastiche"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_473086733_122162020094277446_6368726433856088746_n_1080-1024x1024.jpg"
                  alt="Attività scolastiche"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_475039179_122163760184277446_3561517422491705164_n_1080-1024x1024.jpg"
                  alt="Attività scolastiche"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="container mx-auto max-w-7xl">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-cyan-600">Metodologia</h3>
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg">
                    I percorsi formativi sono strutturati sulla base di metodologie di educazione non formale,
                    privilegiando l'apprendimento peer-to-peer e il learning by doing.
                  </p>
                  <p className="text-lg">
                    L'obiettivo è fornire agli studenti strumenti per fare scelte consapevoli e coerenti
                    con le proprie capacità e aspirazioni, prevenendo l'abbandono scolastico.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  )
}
