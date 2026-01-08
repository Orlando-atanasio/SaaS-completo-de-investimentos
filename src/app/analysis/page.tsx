'use client'

import { PriceChart, generateMockPriceData } from '@/components/price-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Activity, Target } from 'lucide-react'

export default function AnalysisPage() {
  const stockData = generateMockPriceData(30)
  const lastPrice = stockData[stockData.length - 1].close
  const firstPrice = stockData[0].close
  const change = ((lastPrice - firstPrice) / firstPrice) * 100

  const technicalIndicators = [
    {
      name: 'Média Móvel 20 dias',
      value: 'R$ 34.50',
      status: 'Acima',
      positive: true
    },
    {
      name: 'RSI (14)',
      value: '62.5',
      status: 'Neutro',
      positive: true
    },
    {
      name: 'MACD',
      value: '+0.45',
      status: 'Compra',
      positive: true
    },
    {
      name: 'Estocástico',
      value: '58.3',
      status: 'Neutro',
      positive: true
    }
  ]

  const supportResistance = [
    { level: 'Resistência 1', price: 38.50, type: 'resistance' },
    { level: 'Resistência 2', price: 40.00, type: 'resistance' },
    { level: 'Suporte 1', price: 33.50, type: 'support' },
    { level: 'Suporte 2', price: 32.00, type: 'support' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="text-lg px-4 py-1">PETR4</Badge>
            <h1 className="text-4xl font-bold">Petrobras PN</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Análise técnica e fundamentalista completa
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-3">
            <PriceChart
              data={stockData}
              title="PETR4 - Histórico de Preços"
              description="Últimos 30 dias de negociação"
              ticker="PETR4"
              currentPrice={lastPrice}
              change={change}
            />

            {/* Technical Indicators */}
            <Card className="border-2 mt-6">
              <CardHeader>
                <CardTitle>Indicadores Técnicos</CardTitle>
                <CardDescription>
                  Análise baseada em indicadores técnicos populares
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {technicalIndicators.map((indicator, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border bg-card"
                    >
                      <p className="text-sm text-muted-foreground mb-1">
                        {indicator.name}
                      </p>
                      <p className="text-xl font-bold mb-2">
                        {indicator.value}
                      </p>
                      <Badge
                        variant={indicator.positive ? 'default' : 'destructive'}
                        className={indicator.positive ? 'bg-green-600' : ''}
                      >
                        {indicator.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support & Resistance */}
            <Card className="border-2 mt-6">
              <CardHeader>
                <CardTitle>Níveis de Suporte e Resistência</CardTitle>
                <CardDescription>
                  Pontos importantes de entrada e saída
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {supportResistance.map((level, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        level.type === 'resistance'
                          ? 'border-red-200 bg-red-50 dark:bg-red-950/10'
                          : 'border-green-200 bg-green-50 dark:bg-green-950/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {level.type === 'resistance' ? (
                          <TrendingUp className="h-5 w-5 text-red-600" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-green-600" />
                        )}
                        <span className="font-medium">{level.level}</span>
                      </div>
                      <span className="text-xl font-bold">R$ {level.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Estatísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Preço Atual</span>
                  <span className="text-xl font-bold">R$ {lastPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Variação (30d)</span>
                  <Badge
                    variant={change >= 0 ? 'default' : 'destructive'}
                    className={change >= 0 ? 'bg-green-600' : ''}
                  >
                    {change >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {change >= 0 ? '+' : ''}
                    {change.toFixed(2)}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Máxima (30d)</span>
                  <span className="font-medium">
                    R$ {Math.max(...stockData.map(d => d.high || 0)).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mínima (30d)</span>
                  <span className="font-medium">
                    R$ {Math.min(...stockData.map(d => d.low || 0)).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Volume Médio</span>
                  <span className="font-medium">
                    {(
                      stockData.reduce((acc, d) => acc + (d.volume || 0), 0) /
                      stockData.length /
                      1000000
                    ).toFixed(1)}M
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Análise IA
                </CardTitle>
                <CardDescription>
                  Recomendações baseadas em inteligência artificial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-background border">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">COMPRA</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Com base nos indicadores técnicos e tendência de curto prazo, o ativo apresenta boa oportunidade de entrada.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border">
                    <p className="text-sm font-medium mb-1">Preço Alvo</p>
                    <p className="text-2xl font-bold">R$ 38.50</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Prazo: 15-30 dias
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border">
                    <p className="text-sm font-medium mb-1">Stop Loss</p>
                    <p className="text-xl font-bold text-red-600">R$ 32.00</p>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Activity className="h-4 w-4 mr-2" />
                  Ver Análise Completa
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="default">
                  <Target className="h-4 w-4 mr-2" />
                  Adicionar à Carteira
                </Button>
                <Button className="w-full" variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Criar Alerta
                </Button>
                <Button className="w-full" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Comparar com IBOV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
