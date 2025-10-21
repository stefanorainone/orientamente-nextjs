'use client'

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Laptop, Palette, Music, Dumbbell, Lightbulb, Sparkles } from 'lucide-react'

export default function WorkshopPage() {
  const workshops = [
    {
      icon: Laptop,
      title: 'Programmazione',
      description: 'Workshop di coding e sviluppo web per imparare le basi della programmazione e creare progetti digitali',
      color: 'text-blue-500'
    },
    {
      icon: Palette,
      title: 'Design e Arte',
      description: 'Laboratori creativi per esplorare tecniche artistiche, graphic design e espressione visiva',
      color: 'text-purple-500'
    },
    {
      icon: Music,
      title: 'Musica',
      description: 'Attività musicali per sviluppare competenze ritmiche, vocali e strumentali in gruppo',
      color: 'text-pink-500'
    },
    {
      icon: Dumbbell,
      title: 'Sport',
      description: 'Attività sportive per promuovere il lavoro di squadra, la disciplina e il benessere fisico',
      color: 'text-green-500'
    },
    {
      icon: Lightbulb,
      title: 'Gestione dei Conflitti',
      description: 'Workshop su tecniche di mediazione e risoluzione pacifica dei conflitti',
      color: 'text-yellow-500'
    },
    {
      icon: Sparkles,
      title: 'Autostima',
      description: 'Percorsi per sviluppare fiducia in sé stessi e riconoscere il proprio valore',
      color: 'text-cyan-500'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-500 to-teal-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <Sparkles className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Workshop ed Eventi</h1>
            </div>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl">
              Laboratori extrascolastici per lo sviluppo di competenze trasversali e creatività
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Apprendimento Creativo e Coinvolgente</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                I nostri workshop e laboratori extrascolastici offrono agli studenti l'opportunità
                di esplorare nuovi interessi e sviluppare competenze pratiche in un ambiente
                informale e stimolante.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Attraverso attività hands-on su tematiche di interesse come programmazione, design,
                arte, musica e sport, gli studenti possono scoprire nuove passioni e talenti.
              </p>
            </div>
          </div>
        </section>

        {/* Workshop Grid */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Le Nostre Attività</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map((workshop, index) => {
                const Icon = workshop.icon
                return (
                  <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardHeader>
                      <Icon className={`w-12 h-12 ${workshop.color} mb-3`} />
                      <CardTitle className="text-2xl">{workshop.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {workshop.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-teal-50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Metodologia</h2>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700">
                    Le attività sono progettate seguendo principi di educazione non formale,
                    privilegiando l'apprendimento attraverso l'esperienza diretta.
                  </p>
                  <p className="text-lg text-gray-700">
                    Gli studenti lavorano in gruppo, sviluppando competenze collaborative e
                    imparando dai propri pari in un ambiente sicuro e supportivo.
                  </p>
                  <div className="space-y-3 mt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-lg text-gray-700">Learning by doing - apprendimento pratico</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-lg text-gray-700">Peer-to-peer - apprendimento tra pari</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-lg text-gray-700">Ambiente informale e inclusivo</span>
                    </div>
                  </div>
                </div>
              </div>
              <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Obiettivi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg">
                    Sviluppare competenze trasversali utili per il futuro personale e professionale
                  </p>
                  <p className="text-lg">
                    Favorire la socializzazione e il lavoro di squadra
                  </p>
                  <p className="text-lg">
                    Prevenire l'abbandono scolastico attraverso attività coinvolgenti
                  </p>
                  <p className="text-lg">
                    Promuovere l'autostima e la scoperta di nuovi talenti
                  </p>
                  <p className="text-lg">
                    Creare un ambiente di apprendimento positivo e stimolante
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Themes Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Tematiche Affrontate</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">Gestione dei Conflitti</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Workshop dedicati a sviluppare competenze di mediazione e risoluzione
                    pacifica dei conflitti, fondamentali per le relazioni sociali.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-teal-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-teal-600">Autostima e Crescita Personale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Percorsi per aiutare gli studenti a riconoscere il proprio valore,
                    sviluppare fiducia in sé stessi e affrontare le sfide con resilienza.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
