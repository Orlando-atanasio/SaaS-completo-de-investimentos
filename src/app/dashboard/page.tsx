'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  PieChart,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreVertical,
  RefreshCw
} from 'lucide-react'

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Visão Geral', icon: LayoutDashboard, href: '#', active: true },
    { name: 'Minha Carteira', icon: Wallet, href: '#', active: false },
    { name: 'Ativos', icon: TrendingUp, href: '#', active: false },
    { name: 'Análises', icon: PieChart, href: '#', active: false },
    { name: 'Alertas', icon: Bell, href: '#', active: false },
    { name: 'Configurações', icon: Settings, href: '#', active: false },
  ]

  const portfolioSummary = [
    {
      label: 'Saldo Total',
      value: 'R$ 125.450,00',
      change: '+2.5%',
      positive: true,
      icon: Wallet
    },
    {
      label: 'Rentabilidade (Mês)',
      value: 'R$ 3.120,00',
      change: '+12.8%',
      positive: true,
      icon: TrendingUp
    },
    {
      label: 'Investido',
      value: 'R$ 98.500,00',
      change: '0%',
      positive: true,
      icon: PieChart
    },
    {
      label: 'Lucro/Prejuízo',
      value: 'R$ 26.950,00',
      change: '+27.4%',
      positive: true,
      icon: LineChart
    },
  ]

  const assets = [
    {
      ticker: 'PETR4',
      name: 'Petrobras PN',
      type: 'Ação',
      price: 36.45,
      change: 2.34,
      positive: true,
      quantity: 150,
      total: 5467.50
    },
    {
      ticker: 'VALE3',
      name: 'Vale ON',
      type: 'Ação',
      price: 68.90,
      change: -1.23,
      positive: false,
      quantity: 80,
      total: 5512.00
    },
    {
      ticker: 'ITUB4',
      name: 'Itaú Unibanco PN',
      type: 'Ação',
      price: 32.15,
      change: 0.89,
      positive: true,
      quantity: 200,
      total: 6430.00
    },
    {
      ticker: 'HGLG11',
      name: 'CSHG Logística',
      type: 'FII',
      price: 162.50,
      change: 0.15,
      positive: true,
      quantity: 30,
      total: 4875.00
    },
    {
      ticker: 'BBDC4',
      name: 'Bradesco PN',
      type: 'Ação',
      price: 14.32,
      change: -0.78,
      positive: false,
      quantity: 300,
      total: 4296.00
    },
    {
      ticker: 'XPML11',
      name: 'XP Malls',
      type: 'FII',
      price: 108.90,
      change: 1.45,
      positive: true,
      quantity: 20,
      total: 2178.00
    },
    {
      ticker: 'WEGE3',
      name: 'WEG ON',
      type: 'Ação',
      price: 35.67,
      change: 3.21,
      positive: true,
      quantity: 100,
      total: 3567.00
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      ticker: 'PETR4',
      type: 'Acima de',
      target: 37.00,
      current: 36.45,
      time: '5 min atrás'
    },
    {
      id: 2,
      ticker: 'VALE3',
      type: 'Abaixo de',
      target: 68.00,
      current: 68.90,
      time: '1 hora atrás'
    },
    {
      id: 3,
      ticker: 'ITUB4',
      type: 'Acima de',
      target: 33.00,
      current: 32.15,
      time: '3 horas atrás'
    },
  ]

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-muted/10">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <LineChart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">InvestPro</span>
          </div>
        </div>

        <nav className="flex-1 px-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">João Silva</p>
              <p className="text-xs text-muted-foreground truncate">
                joao@email.com
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-background px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">InvestPro</span>
                      </div>
                    </div>
                    <nav className="flex-1 p-4">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              item.active
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                    <div className="p-4 border-t">
                      <Button variant="outline" className="w-full" size="sm">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="relative flex-1 max-w-md hidden sm:block">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar ativos, notícias..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-9 w-9 hidden sm:flex">
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Visão Geral</h1>
            <p className="text-muted-foreground">
              Acompanhe o desempenho da sua carteira de investimentos
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {portfolioSummary.map((item, index) => (
              <Card key={index} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-sm">
                      {item.label}
                    </CardDescription>
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{item.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {item.positive ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        item.positive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Assets Table */}
            <Card className="lg:col-span-2 border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Meus Ativos</CardTitle>
                    <CardDescription>
                      Acompanhe seus investimentos em tempo real
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="max-h-[400px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-medium text-sm">
                          Ativo
                        </th>
                        <th className="text-right py-3 px-2 font-medium text-sm">
                          Preço
                        </th>
                        <th className="text-right py-3 px-2 font-medium text-sm">
                          Variação
                        </th>
                        <th className="text-right py-3 px-2 font-medium text-sm hidden md:table-cell">
                          Qtd
                        </th>
                        <th className="text-right py-3 px-2 font-medium text-sm hidden sm:table-cell">
                          Total
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-sm">
                          <span className="sr-only">Ações</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.map((asset) => (
                        <tr key={asset.ticker} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">
                            <div>
                              <p className="font-medium">{asset.ticker}</p>
                              <p className="text-sm text-muted-foreground">
                                {asset.name}
                              </p>
                            </div>
                          </td>
                          <td className="text-right py-3 px-2">
                            R$ {asset.price.toFixed(2)}
                          </td>
                          <td className="text-right py-3 px-2">
                            <Badge
                              variant={asset.positive ? 'default' : 'destructive'}
                              className={asset.positive ? 'bg-green-600' : ''}
                            >
                              {asset.positive ? '+' : ''}
                              {asset.change.toFixed(2)}%
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-2 hidden md:table-cell">
                            {asset.quantity}
                          </td>
                          <td className="text-right py-3 px-2 hidden sm:table-cell">
                            R$ {asset.total.toFixed(2)}
                          </td>
                          <td className="text-center py-3 px-2">
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Alertas Recentes</CardTitle>
                    <CardDescription>
                      Notificações de preço configuradas
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">
                            {alert.ticker}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {alert.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {alert.type} R$ {alert.target.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Atual: R$ {alert.current.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Alerta
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
