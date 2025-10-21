'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/orientamente-logo.png"
              alt="OrientaMENTE"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-bold text-xl text-cyan-600 hidden sm:inline">
              OrientaMENTE
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-cyan-600 transition">
              Home
            </Link>

            {/* Informazioni Dropdown */}
            <div className="relative group">
              <button className="hover:text-cyan-600 transition flex items-center gap-1">
                Informazioni
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link href="/scuole" className="block px-4 py-3 hover:bg-gray-50 transition">
                  Scuole
                </Link>
                <Link href="/sportello-psicologico" className="block px-4 py-3 hover:bg-gray-50 transition">
                  Sportello Psicologico
                </Link>
                <Link href="/workshop" className="block px-4 py-3 hover:bg-gray-50 transition">
                  Workshop ed Eventi
                </Link>
                <Link href="/summer-camp" className="block px-4 py-3 hover:bg-gray-50 transition">
                  Summer Camp
                </Link>
              </div>
            </div>

            <Link href="/quiz" className="hover:text-cyan-600 transition">
              Quiz
            </Link>
            <Link href="/contatti" className="hover:text-cyan-600 transition">
              Contatti
            </Link>

            {/* Auth Buttons */}
            {status === 'loading' ? (
              <div>...</div>
            ) : session ? (
              <div className="flex items-center gap-4">
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {session.user?.name}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Esci
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Accedi
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">
                    Registrati
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link href="/" className="block py-2 hover:text-cyan-600">
              Home
            </Link>
            <Link href="/scuole" className="block py-2 hover:text-cyan-600">
              Scuole
            </Link>
            <Link href="/sportello-psicologico" className="block py-2 hover:text-cyan-600">
              Sportello Psicologico
            </Link>
            <Link href="/workshop" className="block py-2 hover:text-cyan-600">
              Workshop ed Eventi
            </Link>
            <Link href="/summer-camp" className="block py-2 hover:text-cyan-600">
              Summer Camp
            </Link>
            <Link href="/quiz" className="block py-2 hover:text-cyan-600">
              Quiz
            </Link>
            <Link href="/contatti" className="block py-2 hover:text-cyan-600">
              Contatti
            </Link>

            <div className="pt-4 border-t mt-4">
              {session ? (
                <>
                  {session.user?.role === 'ADMIN' && (
                    <Link href="/admin" className="block py-2">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href="/profile" className="block py-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      {session.user?.name}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Esci
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href="/auth/login" className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      Accedi
                    </Button>
                  </Link>
                  <Link href="/auth/register" className="block">
                    <Button size="sm" className="w-full">
                      Registrati
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}