'use client'

import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, Instagram, MapPin, Building2 } from 'lucide-react'

export default function ContattiPage() {
  const contacts = [
    {
      icon: Phone,
      title: 'Telefono',
      value: '06 8424 2188',
      link: 'tel:0684242188',
      color: 'text-blue-500'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'orientamente@modavi.it',
      link: 'mailto:orientamente@modavi.it',
      color: 'text-cyan-500'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@orienta_mente24',
      link: 'https://instagram.com/orienta_mente24',
      color: 'text-pink-500'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">Contatti</h1>
            </div>
            <p className="text-xl md:text-2xl opacity-95 max-w-3xl">
              Mettiti in contatto con noi per qualsiasi informazione sul progetto OrientaMENTE
            </p>
          </div>
        </section>

        {/* Contact Cards Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contacts.map((contact, index) => {
                const Icon = contact.icon
                return (
                  <a
                    key={index}
                    href={contact.link}
                    target={contact.link.startsWith('http') ? '_blank' : undefined}
                    rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                      <CardHeader className="text-center">
                        <Icon className={`w-12 h-12 ${contact.color} mx-auto mb-3`} />
                        <CardTitle className="text-xl">{contact.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-lg font-semibold text-gray-700">{contact.value}</p>
                      </CardContent>
                    </Card>
                  </a>
                )
              })}
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Project Info */}
              <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-0 shadow-lg">
                <CardHeader>
                  <Building2 className="w-10 h-10 text-cyan-500 mb-2" />
                  <CardTitle className="text-2xl">Informazioni Progetto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-700">Nome Progetto:</p>
                    <p className="text-gray-600">OrientaMENTE</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Durata:</p>
                    <p className="text-gray-600">24 mesi</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Finanziamento:</p>
                    <p className="text-gray-600">Fondazione CDP</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Target:</p>
                    <p className="text-gray-600">Studenti Scuole Secondarie di II Grado</p>
                  </div>
                </CardContent>
              </Card>

              {/* Coverage Area */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
                <CardHeader>
                  <MapPin className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle className="text-2xl">Aree di Intervento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-700">Campania</p>
                      <p className="text-sm text-gray-600">6 istituti scolastici partner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-700">Puglia</p>
                      <p className="text-sm text-gray-600">6 istituti scolastici partner</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-700">Sicilia</p>
                      <p className="text-sm text-gray-600">6 istituti scolastici partner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form Alternative Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">Hai bisogno di informazioni?</h2>
            <Card className="border-2 border-cyan-200">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 mb-6">
                  Per qualsiasi informazione sul progetto OrientaMENTE, sulle attività proposte
                  o per iscriverti ai nostri servizi, non esitare a contattarci.
                </p>
                <div className="space-y-4">
                  <p className="text-lg">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:orientamente@modavi.it" className="text-cyan-600 hover:underline">
                      orientamente@modavi.it
                    </a>
                  </p>
                  <p className="text-lg">
                    <strong>Telefono:</strong>{' '}
                    <a href="tel:0684242188" className="text-cyan-600 hover:underline">
                      06 8424 2188
                    </a>
                  </p>
                  <p className="text-lg">
                    <strong>Instagram:</strong>{' '}
                    <a
                      href="https://instagram.com/orienta_mente24"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-600 hover:underline"
                    >
                      @orienta_mente24
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Reminder */}
        <section className="py-12 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <div className="container mx-auto max-w-7xl text-center">
            <h3 className="text-2xl font-bold mb-4">I Nostri Servizi</h3>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <span>📚 Orientamento Scolastico</span>
              <span>💬 Sportello Psicologico</span>
              <span>🎨 Workshop & Eventi</span>
              <span>⛺ Summer Camp</span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
