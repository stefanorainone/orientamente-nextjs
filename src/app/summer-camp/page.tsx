'use client'

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tent, Globe, Users2, MapPin, Calendar, Heart } from 'lucide-react'
import Image from 'next/image'

export default function SummerCampPage() {
  const activities = [
    {
      icon: Globe,
      title: 'Scambi Interregionali',
      description: 'Incontri tra studenti provenienti da Campania, Puglia e Sicilia per favorire lo scambio culturale'
    },
    {
      icon: MapPin,
      title: 'Visite Reciproche',
      description: 'Visite alle scuole partner nelle diverse regioni per conoscere nuove realtà educative'
    },
    {
      icon: Users2,
      title: 'Progetti Collaborativi',
      description: 'Attività di gruppo che promuovono la collaborazione e il lavoro di squadra interregionale'
    },
    {
      icon: Heart,
      title: 'Integrazione e Crescita',
      description: 'Esperienze pensate per favorire l\'integrazione sociale e la crescita personale'
    }
  ]

  const regions = [
    { name: 'Campania', color: 'bg-cyan-500' },
    { name: 'Puglia', color: 'bg-blue-500' },
    { name: 'Sicilia', color: 'bg-green-500' }
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-500 to-pink-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <Tent className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Summer Camp</h1>
            </div>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl">
              Scambi interregionali per favorire l'integrazione e la crescita personale
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Un'Estate di Crescita e Scoperta</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Il Summer Camp OrientaMENTE promuove attività incentrate sullo scambio interregionale
                fra studenti delle scuole secondarie di II grado delle tre regioni coinvolte nel progetto.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Attraverso visite reciproche alle scuole, campi estivi, scambi linguistici e progetti
                collaborativi, gli studenti vivono esperienze uniche di crescita personale e integrazione.
              </p>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Le Nostre Attività</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {activities.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardHeader>
                      <Icon className="w-10 h-10 text-purple-500 mb-3" />
                      <CardTitle className="text-xl">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {activity.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Regions Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Regioni Coinvolte</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {regions.map((region, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 ${region.color} rounded-full mx-auto mb-4`}></div>
                    <CardTitle className="text-2xl">{region.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Studenti delle scuole secondarie di II grado
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-purple-500" />
                  Sede del Camp
                </h2>
                <Card className="border-2 border-purple-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Agriturismo Eucalipto</h3>
                    <p className="text-lg text-gray-700 mb-2">Perdifumo (SA)</p>
                    <p className="text-lg text-gray-700">Provincia di Salerno, Campania</p>
                  </CardContent>
                </Card>
                <p className="text-lg text-gray-700 mt-6">
                  Una location immersa nella natura, perfetta per favorire la socializzazione
                  e le attività di gruppo in un ambiente rilassante e stimolante.
                </p>
              </div>
              <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Obiettivi del Summer Camp</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">
                    Favorire lo scambio culturale tra studenti di diverse regioni italiane
                  </p>
                  <p className="text-lg">
                    Promuovere l'integrazione sociale attraverso attività condivise
                  </p>
                  <p className="text-lg">
                    Sviluppare competenze collaborative e relazionali
                  </p>
                  <p className="text-lg">
                    Creare reti di amicizia che superano i confini regionali
                  </p>
                  <p className="text-lg">
                    Offrire esperienze di crescita personale e scoperta di nuove realtà
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Momenti del Summer Camp</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_449272537_430448463162127_578085043717871020_n_1080-768x768.jpg"
                  alt="Summer Camp"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_470700251_122158447376277446_4088375750969847782_n_1080-1024x1024.jpg"
                  alt="Summer Camp"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_470570203_122158447286277446_32007128294357455_n_1080-1024x1024.jpg"
                  alt="Summer Camp"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_449165405_122127632504277446_6819560962099626320_n_1080-1024x1024.jpg"
                  alt="Summer Camp"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_470207438_122158060070277446_7985068210020788358_n_1080-1024x1024.jpg"
                  alt="Summer Camp"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/Snapins.ai_449109547_122127795698277446_5298654493098649911_n_1080-1024x1024.jpg"
                  alt="Summer Camp"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <div className="container mx-auto max-w-7xl text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Calendar className="w-10 h-10" />
              <h2 className="text-3xl font-bold">Iscrizioni</h2>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Per partecipare al Summer Camp, scarica il modulo di iscrizione e contattaci
              per maggiori informazioni sulle prossime date disponibili.
            </p>
            <Card className="max-w-2xl mx-auto bg-white/10 border-white/20 backdrop-blur">
              <CardContent className="p-6">
                <p className="text-lg mb-4">
                  Il modulo di iscrizione può essere richiesto contattando la segreteria del progetto.
                </p>
                <p className="text-lg">
                  Per informazioni: <strong>orientamente@modavi.it</strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  )
}
