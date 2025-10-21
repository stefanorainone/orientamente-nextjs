import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { Users, School, Calendar, Target } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-cyan-500 to-blue-600 text-white py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <Image
                  src="/images/orientamente-logo.png"
                  alt="OrientaMENTE Logo"
                  width={250}
                  height={250}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  OrientaMENTE
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-95">
                  Contrasto alla dispersione scolastica e supporto ai percorsi di crescita
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/quiz">
                    <Button size="lg" variant="secondary" className="text-lg">
                      Inizia il Quiz
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white/20">
                      Registrati
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/10 -z-10"></div>
        </section>

        {/* Info Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-12">Il Nostro Progetto</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <School className="w-10 h-10 text-cyan-500 mb-2" />
                  <CardTitle>Scuole</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Percorsi formativi strutturati sulla base di metodologie di educazione non formale
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>Sportello Psicologico</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Supporto individuale e di gruppo per studenti e famiglie
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Calendar className="w-10 h-10 text-green-500 mb-2" />
                  <CardTitle>Workshop ed Eventi</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Laboratori extrascolastici per lo sviluppo di competenze trasversali
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Target className="w-10 h-10 text-purple-500 mb-2" />
                  <CardTitle>Summer Camp</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Scambi interregionali per favorire l'integrazione e la crescita personale
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coverage Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Copertura Territoriale</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Il progetto OrientaMENTE opera in tre regioni italiane con l'obiettivo di
                  prevenire l'abbandono scolastico e sviluppare competenze sociali nei giovani.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                    <span className="text-lg">Campania</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-lg">Puglia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-lg">Sicilia</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Image
                    src="/images/layouyt.png"
                    alt="Mappa regioni"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Informazioni</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p><strong>Durata:</strong> 24 mesi</p>
                  <p><strong>Target:</strong> Studenti Istituti Secondari di Secondo Grado</p>
                  <p><strong>Approccio:</strong> Peer-to-peer, Learning by doing</p>
                  <p><strong>Finanziamento:</strong> Fondazione CDP</p>
                  <div className="pt-4">
                    <Image
                      src="/images/loghi-1024x143.png"
                      alt="Loghi partner"
                      width={400}
                      height={56}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <div className="container mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold mb-6">Scopri il tuo percorso ideale</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Fai il nostro quiz orientativo per scoprire quali sono le tue attitudini
              e i percorsi di studio più adatti a te.
            </p>
            <Link href="/quiz">
              <Button size="lg" variant="secondary" className="text-lg">
                Fai il Quiz Ora
              </Button>
            </Link>
          </div>
        </section>

        {/* Partner Section */}
        <section className="py-12 px-4 bg-white border-t">
          <div className="container mx-auto max-w-7xl">
            <h3 className="text-center text-gray-600 text-lg mb-8 font-semibold">
              Progetto finanziato da Fondazione CDP
            </h3>
            <div className="flex justify-center">
              <Image
                src="/images/loghi-1024x143.png"
                alt="Partner del progetto: Fondazione CDP, MODAVI, Moby Dick ETS, Arcistr. Elios, Coop. Soc. San Riccardo Pampuri"
                width={1024}
                height={143}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}