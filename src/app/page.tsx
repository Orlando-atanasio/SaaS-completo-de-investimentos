'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Check, TrendingUp, Shield, Zap, BarChart3, Bell, Globe, ArrowRight, LineChart, Users, Award } from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const [email, setEmail] = useState('')

  const features = [
    {
      icon: TrendingUp,
      title: 'Cotações em Tempo Real',
      description: 'Acompanhe preços de ações, FIIs e ETFs com atualizações em tempo real'
    },
    {
      icon: BarChart3,
      title: 'Gráficos Avançados',
      description: 'Análise técnica com gráficos candlestick, indicadores e ferramentas profissionais'
    },
    {
      icon: Bell,
      title: 'Alertas Inteligentes',
      description: 'Configure alertas de preço e receba notificações automaticamente'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Seus dados protegidos com criptografia de ponta a ponta'
    },
    {
      icon: Zap,
      title: 'Análise IA',
      description: 'Recomendações personalizadas baseadas em inteligência artificial'
    },
    {
      icon: Globe,
      title: 'Dados Globais',
      description: 'Acesse mercados internacionais: B3, NYSE, NASDAQ e mais'
    }
  ]

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      description: 'Perfeito para começar',
      features: [
        'Acesso a cotações delayed',
        'Até 5 ativos na carteira',
        'Gráficos básicos',
        'Alertas de preço limitados'
      ],
      cta: 'Começar Grátis',
      popular: false
    },
    {
      name: 'Pro',
      price: 'R$ 49/mês',
      description: 'Para investidores ativos',
      features: [
        'Cotações em tempo real',
        'Até 50 ativos na carteira',
        'Gráficos avançados',
        'Alertas ilimitados',
        'Análise IA básica',
        'Exportar relatórios'
      ],
      cta: 'Assinar Pro',
      popular: true
    },
    {
      name: 'Premium',
      price: 'R$ 99/mês',
      description: 'Para traders profissionais',
      features: [
        'Tudo do plano Pro',
        'Carteira ilimitada',
        'Análise IA avançada',
        'API access',
        'Suporte prioritário',
        'Métricas avançadas',
        'Integração com corretoras'
      ],
      cta: 'Assinar Premium',
      popular: false
    }
  ]

  const stats = [
    { value: '50K+', label: 'Investidores ativos', icon: Users },
    { value: '1M+', label: 'Transações monitoradas', icon: TrendingUp },
    { value: '99.9%', label: 'Uptime garantido', icon: Award },
    { value: '24/7', label: 'Suporte disponível', icon: Shield }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LineChart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">InvestPro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-primary transition-colors">Recursos</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Preços</a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">Sobre</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contato</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Entrar</Button>
            <Button>Começar Grátis</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="outline" className="mb-6">
            🚀 Nova versão 2.0 disponível
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Invista com{' '}
            <span className="text-primary">Inteligência</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plataforma completa de análise e gestão de investimentos em bolsa de valores.
            Ações, FIIs, ETFs e muito mais com dados em tempo real e IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Ver Demonstração
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <stat.icon className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para investir com segurança e rentabilidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Planos para todos os perfis</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para sua jornada de investimentos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Card
                key={i}
                className={`border-2 ${
                  plan.popular ? 'border-primary shadow-xl scale-105' : 'border-border'
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Por que escolher o InvestPro?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Nascemos em 2024 com a missão de democratizar o acesso à inteligência
                de mercado. Nossa plataforma combina tecnologia de ponta, dados
                confiáveis e inteligência artificial para ajudar você a tomar
                melhores decisões de investimento.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Seja você um investidor iniciante ou um trader experiente, o InvestPro
                tem as ferramentas certas para potencializar seus resultados.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  Conhecer Nossa História
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">5+</CardTitle>
                  <CardDescription>Anos de experiência</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">B3</CardTitle>
                  <CardDescription>Integração oficial</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">AI</CardTitle>
                  <CardDescription>Inteligência artificial</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">24/7</CardTitle>
                  <CardDescription>Suporte disponível</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
            <p className="text-xl text-muted-foreground">
              Dúvidas ou sugestões? Estamos aqui para ajudar!
            </p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Fale Conosco</CardTitle>
              <CardDescription>Respondemos em até 24 horas úteis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Como podemos ajudar?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua dúvida ou sugestão..."
                    rows={5}
                  />
                </div>
                <Button className="w-full" size="lg">
                  Enviar Mensagem
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">InvestPro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Plataforma completa de gestão de investimentos em bolsa de valores.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Recursos</a></li>
                <li><a href="#" className="hover:text-primary">Preços</a></li>
                <li><a href="#" className="hover:text-primary">Integrações</a></li>
                <li><a href="#" className="hover:text-primary">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Sobre</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Carreiras</a></li>
                <li><a href="#" className="hover:text-primary">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary">Cookies</a></li>
                <li><a href="#" className="hover:text-primary">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 InvestPro. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs">
              Investir em bolsa de valores envolve riscos. Consulte um profissional antes de investir.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
