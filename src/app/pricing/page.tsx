'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, ArrowRight, Crown, Sparkles, Zap } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: number
  period: string
  description: string
  popular: boolean
  icon: any
  color: string
  features: {
    text: string
    included: boolean
  }[]
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    period: 'para sempre',
    description: 'Perfeito para começar a explorar o mercado',
    popular: false,
    icon: Sparkles,
    color: 'border-gray-300',
    features: [
      { text: 'Acesso a cotações delayed (15 min)', included: true },
      { text: 'Até 5 ativos na carteira', included: true },
      { text: 'Gráficos básicos', included: true },
      { text: 'Alertas de preço (limitados a 5)', included: true },
      { text: 'Busca de ativos completa', included: true },
      { text: 'Cotações em tempo real', included: false },
      { text: 'Carteira ilimitada', included: false },
      { text: 'Alertas ilimitados', included: false },
      { text: 'Gráficos avançados', included: false },
      { text: 'Análise IA básica', included: false },
      { text: 'Exportar relatórios', included: false },
      { text: 'API access', included: false },
      { text: 'Suporte prioritário', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    period: 'mês',
    description: 'Para investidores ativos que querem mais recursos',
    popular: true,
    icon: Zap,
    color: 'border-primary',
    features: [
      { text: 'Tudo do plano Gratuito', included: true },
      { text: 'Cotações em tempo real', included: true },
      { text: 'Até 50 ativos na carteira', included: true },
      { text: 'Gráficos avançados (candlestick, indicadores)', included: true },
      { text: 'Alertas ilimitados', included: true },
      { text: 'Análise IA básica', included: true },
      { text: 'Exportar relatórios (PDF, Excel)', included: true },
      { text: 'Notícias do mercado', included: true },
      { text: 'Carteira ilimitada', included: false },
      { text: 'Análise IA avançada', included: false },
      { text: 'API access', included: false },
      { text: 'Suporte prioritário (24h)', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    period: 'mês',
    description: 'Para traders profissionais e investidores experientes',
    popular: false,
    icon: Crown,
    color: 'border-yellow-500',
    features: [
      { text: 'Tudo do plano Pro', included: true },
      { text: 'Carteira ilimitada', included: true },
      { text: 'Análise IA avançada', included: true },
      { text: 'API access completa', included: true },
      { text: 'Métricas avançadas', included: true },
      { text: 'Integração com corretoras', included: true },
      { text: 'Backtesting de estratégias', included: true },
      { text: 'Suporte prioritário (24h/7d)', included: true },
      { text: 'Acesso antecipado a novas features', included: true },
      { text: 'Webinars exclusivos', included: true },
      { text: 'Consultoria mensal', included: false },
    ]
  }
]

const faqs = [
  {
    question: 'Posso mudar de plano a qualquer momento?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Ao fazer upgrade, você terá acesso imediato às novas features. Ao fazer downgrade, a alteração entra no próximo ciclo de faturamento.'
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartão de crédito, débito, PIX e boleto bancário. Pagamentos com PIX e cartão são processados imediatamente, enquanto boletos levam até 3 dias úteis para compensar.'
  },
  {
    question: 'Há garantia de satisfação?',
    answer: 'Sim! Oferecemos garantia de 7 dias. Se você não estiver satisfeito, podemos reembolsar integralmente o valor pago, sem perguntas.'
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Com certeza. Não há contratos de fidelidade. Você pode cancelar sua assinatura a qualquer momento e continuará tendo acesso até o final do período já pago.'
  },
  {
    question: 'O plano gratuito tem expiração?',
    answer: 'Não! O plano gratuito é vitalício e nunca expira. Você pode continuar usando gratuitamente sem limites de tempo.'
  }
]

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const getDiscountedPrice = (price: number) => {
    if (annualBilling) {
      return (price * 12 * 0.83).toFixed(0) // 17% discount
    }
    return price
  }

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId)
    // TODO: Implement Stripe/Mercado Pago integration
    console.log('Subscribe to plan:', planId, 'Annual:', annualBilling)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Escolha o Plano Ideal para Você
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Planos flexíveis para todos os perfis de investidor. Comece gratuitamente e evolua conforme sua necessidade.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!annualBilling ? 'font-medium' : 'text-muted-foreground'}`}>
            Mensal
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAnnualBilling(!annualBilling)}
            className={annualBilling ? 'bg-primary text-primary-foreground' : ''}
          >
            Anual
            {annualBilling && (
              <Badge className="ml-2 bg-green-600">-17%</Badge>
            )}
          </Button>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card key={plan.id} className={`border-2 relative ${
                plan.popular ? 'scale-105 shadow-xl' : ''
              } ${plan.color}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-base px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      plan.id === 'premium' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                      plan.id === 'pro' ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        plan.id === 'premium' ? 'text-yellow-600' :
                        plan.id === 'pro' ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold">
                        R$ {getDiscountedPrice(plan.price)}
                      </span>
                      <span className="text-xl text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                    {annualBilling && plan.price > 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        Economize R$ {(plan.price * 12 * 0.17).toFixed(0)}/ano
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${
                          !feature.included ? 'text-muted-foreground line-through' : ''
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {plan.price === 0 ? 'Começar Grátis' : 'Assinar Agora'}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Enterprise CTA */}
        <Card className="border-2 bg-gradient-to-r from-primary/5 to-primary/10 mb-16">
          <CardContent className="p-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Precisa de uma Solução Corporativa?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Oferecemos planos personalizados para gestoras de investimentos, bancos e empresas.
                Inclua múltiplos usuários, API dedicada, suporte exclusivo e recursos avançados.
              </p>
              <Button size="lg">
                Falar com Vendas
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t">
          <div className="flex items-center gap-2">
            <Check className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">7 Dias de Garantia</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">Sem Contrato de Fidelidade</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium">Cancelamento a Qualquer Momento</span>
          </div>
        </div>
      </div>
    </div>
  )
}
