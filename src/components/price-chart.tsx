'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  CandlestickChart,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, ArrowDownRight, Calendar, TrendingUp, Activity } from 'lucide-react'

export interface PriceDataPoint {
  date: string
  open?: number
  high?: number
  low?: number
  close: number
  volume?: number
}

interface PriceChartProps {
  data: PriceDataPoint[]
  title?: string
  description?: string
  ticker?: string
  currentPrice?: number
  change?: number
  height?: number
}

export function PriceChart({
  data,
  title = 'Gráfico de Preços',
  description = 'Histórico de preços do ativo',
  ticker,
  currentPrice,
  change,
  height = 400,
}: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL'>('1M')
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line')

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium mb-2">{data.date}</p>
          {data.open && data.close && (
            <>
              <p className="text-sm">Abertura: R$ {data.open.toFixed(2)}</p>
              <p className="text-sm">Máxima: R$ {data.high?.toFixed(2)}</p>
              <p className="text-sm">Mínima: R$ {data.low?.toFixed(2)}</p>
              <p className="text-sm">Fechamento: R$ {data.close.toFixed(2)}</p>
            </>
          )}
          {data.volume && (
            <p className="text-sm text-muted-foreground mt-2">
              Volume: {(data.volume / 1000000).toFixed(2)}M
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
        <XAxis
          dataKey="date"
          stroke="currentColor"
          opacity={0.5}
          fontSize={12}
          tickFormatter={(value) => value.split('-').slice(1).join('/')}
        />
        <YAxis
          stroke="currentColor"
          opacity={0.5}
          fontSize={12}
          tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
          domain={['dataMin - 1', 'dataMax + 1']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceLine y={currentPrice || data[data.length - 1]?.close} stroke="hsl(var(--primary))" strokeDasharray="2 2" label="Atual" />
        <Line
          type="monotone"
          dataKey="close"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )

  const renderAreaChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
        <XAxis
          dataKey="date"
          stroke="currentColor"
          opacity={0.5}
          fontSize={12}
          tickFormatter={(value) => value.split('-').slice(1).join('/')}
        />
        <YAxis
          stroke="currentColor"
          opacity={0.5}
          fontSize={12}
          tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
          domain={['dataMin - 1', 'dataMax + 1']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceLine y={currentPrice || data[data.length - 1]?.close} stroke="hsl(var(--primary))" strokeDasharray="2 2" label="Atual" />
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="close"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
        <XAxis
          dataKey="date"
          stroke="currentColor"
          opacity={0.5}
          fontSize={12}
          tickFormatter={(value) => value.split('-').slice(1).join('/')}
        />
        <YAxis
          stroke="currentColor"
          opacity={0.5}
          fontSize={12}
          tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceLine y={currentPrice || data[data.length - 1]?.close} stroke="hsl(var(--primary))" strokeDasharray="2 2" label="Atual" />
        <Bar dataKey="close" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )

  const renderVolumeChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
        <XAxis
          dataKey="date"
          stroke="currentColor"
          opacity={0.5}
          fontSize={12}
          tickFormatter={(value) => value.split('-').slice(1).join('/')}
        />
        <YAxis
          stroke="currentColor"
          opacity={0.5}
          fontSize={12}
          tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="volume"
          fill={change && change >= 0 ? '#22c55e' : '#ef4444'}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {ticker && <Badge variant="outline">{ticker}</Badge>}
              <CardTitle className="text-2xl">{title}</CardTitle>
            </div>
            <CardDescription>{description}</CardDescription>
          </div>
          {currentPrice && (
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">R$ {currentPrice.toFixed(2)}</span>
                {change !== undefined && (
                  <Badge
                    variant={change >= 0 ? 'default' : 'destructive'}
                    className={change >= 0 ? 'bg-green-600' : ''}
                  >
                    {change >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {change >= 0 ? '+' : ''}
                    {change.toFixed(2)}%
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <div className="flex rounded-lg border p-1">
            {(['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="h-8 px-3"
              >
                {range}
              </Button>
            ))}
          </div>
          <Tabs defaultValue="line" value={chartType} onValueChange={(v) => setChartType(v as any)}>
            <TabsList>
              <TabsTrigger value="line" className="h-8">
                <Activity className="h-4 w-4 mr-1" />
                Linha
              </TabsTrigger>
              <TabsTrigger value="area" className="h-8">
                <TrendingUp className="h-4 w-4 mr-1" />
                Área
              </TabsTrigger>
              <TabsTrigger value="bar" className="h-8">
                <BarChart className="h-4 w-4 mr-1" />
                Barras
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs defaultValue="price">
          <TabsList className="mb-4">
            <TabsTrigger value="price">Preço</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
          </TabsList>
          <TabsContent value="price">
            {chartType === 'line' && renderLineChart()}
            {chartType === 'area' && renderAreaChart()}
            {chartType === 'bar' && renderBarChart()}
          </TabsContent>
          <TabsContent value="volume">
            {renderVolumeChart()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Mock data generator for demo
export function generateMockPriceData(days: number = 30): PriceDataPoint[] {
  const data: PriceDataPoint[] = []
  let basePrice = 35.00

  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const volatility = Math.random() * 2 - 1 // Random between -1 and 1
    const change = basePrice * (volatility * 0.03)
    basePrice = Math.max(25, Math.min(50, basePrice + change)) // Keep between 25 and 50

    const high = basePrice * (1 + Math.random() * 0.02)
    const low = basePrice * (1 - Math.random() * 0.02)
    const open = low + Math.random() * (high - low)
    const close = low + Math.random() * (high - low)
    const volume = Math.floor(Math.random() * 20000000) + 5000000

    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume,
    })
  }

  return data
}
