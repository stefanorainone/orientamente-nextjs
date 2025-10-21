'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Navbar } from '@/components/navbar'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface Question {
  id: string
  question: string
  options: { a: string; b: string; c: string; d: string }
  category: string
}

interface QuizResults {
  categories: Record<string, number>
}

export default function QuizPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [results, setResults] = useState<QuizResults | null>(null)
  const [hasCompleted, setHasCompleted] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/quiz')
    }
  }, [status, router])

  useEffect(() => {
    fetchQuestions()
    checkIfCompleted()
  }, [])

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/quiz/questions')
      const data = await res.json()
      setQuestions(data)
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfCompleted = async () => {
    try {
      const res = await fetch('/api/quiz/check-completion')
      const data = await res.json()
      if (data.completed) {
        setHasCompleted(true)
        setResults(data.results)
      }
    } catch (error) {
      console.error('Error checking completion:', error)
    }
  }

  const handleAnswerSelect = (answer: string) => {
    if (!questions[currentQuestion]) return

    // Salva la risposta
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: answer
    }
    setAnswers(newAnswers)

    // Auto-advance dopo un breve delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        // Vai alla prossima domanda
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Ultima domanda - invia automaticamente il quiz
        handleSubmit(newAnswers)
      }
    }, 300)
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async (finalAnswers?: Record<string, string>) => {
    const answersToSubmit = finalAnswers || answers

    setSubmitting(true)
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersToSubmit })
      })

      const data = await res.json()
      if (data.success) {
        setResults(data.results)
        setHasCompleted(true)
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const resetQuiz = async () => {
    try {
      await fetch('/api/quiz/reset', { method: 'POST' })
      setHasCompleted(false)
      setResults(null)
      setAnswers({})
      setCurrentQuestion(0)
    } catch (error) {
      console.error('Error resetting quiz:', error)
    }
  }

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

  if (hasCompleted && results) {
    const chartData = {
      labels: Object.keys(results.categories),
      datasets: [
        {
          label: 'Il tuo punteggio',
          data: Object.values(results.categories),
          backgroundColor: 'rgba(6, 182, 212, 0.2)',
          borderColor: 'rgb(6, 182, 212)',
          pointBackgroundColor: 'rgb(6, 182, 212)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(6, 182, 212)',
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 5,
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          angleLines: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          pointLabels: {
            font: {
              size: 14,
              weight: '600' as const
            },
            padding: 15
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          enabled: true
        }
      }
    }

    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                Quiz Completato! 🎉
              </CardTitle>
              <CardDescription className="text-center text-lg">
                Ecco il tuo profilo basato sulle risposte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full max-w-2xl mx-auto" style={{ position: 'relative', height: '500px' }}>
                <Radar data={chartData} options={chartOptions as any} />
              </div>
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold">I tuoi risultati per categoria:</h3>
                <div className="grid gap-3">
                  {Object.entries(results.categories).map(([category, score]) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{category}:</span>
                      <span className="text-cyan-600 font-bold">{score}/5</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button onClick={resetQuiz} size="lg">
                  Rifai il Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </>
    )
  }

  if (submitting) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mb-4" />
          <p className="text-lg text-gray-600">Elaborazione risultati...</p>
        </div>
      </>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Domanda {currentQuestion + 1} di {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent>
            {question && (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  {question.question}
                </h2>
                <RadioGroup
                  value={answers[question.id] || ''}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {Object.entries(question.options).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer"
                    >
                      <RadioGroupItem value={key} id={`option-${key}`} />
                      <Label
                        htmlFor={`option-${key}`}
                        className="flex-1 cursor-pointer"
                      >
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Indietro
                  </Button>

                  <div className="text-sm text-gray-500">
                    Seleziona una risposta per continuare
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  )
}