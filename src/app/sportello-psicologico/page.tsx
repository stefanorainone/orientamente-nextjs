'use client'

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeartHandshake, Users, Shield, MessageCircle, Brain, Lightbulb } from 'lucide-react'

export default function SportelloPsicologicoPage() {
  const services = [
    {
      icon: MessageCircle,
      title: 'Incontri Individuali',
      description: 'Colloqui personali con psicologi esperti in un ambiente riservato e accogliente'
    },
    {
      icon: Users,
      title: 'Sessioni di Gruppo',
      description: 'Discussioni collettive su tematiche specifiche come regolazione emotiva e motivazione allo studio'
    },
    {
      icon: Brain,
      title: 'Supporto Emotivo',
      description: 'Ascolto e supporto per affrontare difficoltà emotive e relazionali'
    },
    {
      icon: Shield,
      title: 'Spazio Sicuro',
      description: 'Un luogo sicuro dove parlare liberamente di ciò che preoccupa'
    }
  ]

  const supportAreas = [
    'Stress e ansia legati allo studio',
    'Conflitti con i compagni o in famiglia',
    'Insicurezza e bassa autostima',
    'Difficoltà legate alla crescita adolescenziale',
    'Sfide accademiche e motivazione',
    'Dinamiche di gruppo e relazioni'
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <HeartHandshake className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Sportello Psicologico</h1>
            </div>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl">
              Uno spazio dedicato all'ascolto e al supporto psicologico degli studenti
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Lo Sportello Psicologico è uno spazio dedicato per offrire agli studenti un servizio
                    di ascolto e supporto psicologico in un ambiente accogliente e riservato.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Gli incontri, gestiti da uno psicologo esperto, possono essere individuali o di gruppo,
                    a seconda delle esigenze, e mirano ad aiutare gli studenti ad affrontare difficoltà
                    emotive, relazionali o legate al percorso scolastico.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">I Nostri Servizi</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <Icon className="w-10 h-10 text-blue-500 mb-3" />
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Support Areas Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Lightbulb className="w-8 h-8 text-blue-500" />
                  Aree di Supporto
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Il servizio si rivolge a studenti che affrontano varie difficoltà durante il loro
                  percorso scolastico e di crescita personale:
                </p>
                <div className="space-y-3">
                  {supportAreas.map((area, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-lg text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Obiettivi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg">
                      Creare un luogo sicuro dove parlare liberamente di ciò che preoccupa gli studenti
                    </p>
                    <p className="text-lg">
                      Favorire il benessere psicologico e la continuità del percorso scolastico
                    </p>
                    <p className="text-lg">
                      Supportare la crescita personale attraverso l'ascolto professionale e empatico
                    </p>
                    <p className="text-lg">
                      Organizzare discussioni collettive su tematiche specifiche di interesse comune
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold mb-6">Workshop Collettivi</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Oltre ai colloqui individuali, organizziamo discussioni collettive su tematiche specifiche
              come la regolazione emotiva, la motivazione allo studio e le dinamiche di gruppo.
            </p>
            <Card className="max-w-2xl mx-auto border-2 border-blue-200">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700">
                  I workshop di gruppo creano un ambiente di condivisione dove gli studenti possono
                  confrontarsi con i pari e sviluppare competenze emotive e sociali fondamentali.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  )
}
