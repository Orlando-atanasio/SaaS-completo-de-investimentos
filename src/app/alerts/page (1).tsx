'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { AssetSearch, Asset } from '@/components/asset-search'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Trash2, Plus, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface PriceAlert {
  id: string
  ticker: string
  assetName: string
  alertType: 'above' | 'below'
  targetPrice: number
  currentPrice: number
  triggered: boolean
  createdAt: string
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      ticker: 'PETR4',
      assetName: 'Petrobras PN',
      alertType: 'above',
      targetPrice: 38.00,
      currentPrice: 36.45,
      triggered: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      ticker: 'VALE3',
      assetName: 'Vale ON',
      alertType: 'below',
      targetPrice: 68.00,
      currentPrice: 68.90,
      triggered: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      ticker: 'ITUB4',
      assetName: 'Itaú Unibanco PN',
      alertType: 'above',
      targetPrice: 33.00,
      currentPrice: 32.15,
      triggered: false,
      createdAt: new Date().toISOString()
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [alertType, setAlertType] = useState<'above' | 'below'>('above')
  const [targetPrice, setTargetPrice] = useState<number>(0)

  const handleCreateAlert = async () => {
    if (!selectedAsset || !targetPrice) return

    // TODO: Call API POST /api/alerts
    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      ticker: selectedAsset.ticker,
      assetName: selectedAsset.name,
      alertType,
      targetPrice,
      currentPrice: selectedAsset.price || 0,
      triggered: false,
      createdAt: new Date().toISOString()
    }

    setAlerts([...alerts, newAlert])
    setIsDialogOpen(false)
    setSelectedAsset(null)
    setAlertType('above')
    setTargetPrice(0)
  }

  const handleDeleteAlert = async (id: string) => {
    // TODO: Call API DELETE /api/alerts/[id]
    setAlerts(alerts.filter(alert => alert.id !== id))
  }

  const getDistancePercent = (current: number, target: number) => {
    const diff = ((target - current) / current) * 100
    return diff.toFixed(2)
  }

  const isNearTarget = (current: number, target: number) => {
    const percent = Math.abs((target - current) / current) * 100
    return percent < 2 // Within 2%
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Alertas de Preço</h1>
              <p className="text-muted-foreground text-lg">
                Configure notificações para quando ativos atingirem seus preços-alvo
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Novo Alerta
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Criar Novo Alerta</DialogTitle>
                  <DialogDescription>
                    Configure quando você quer ser notificado sobre um ativo
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Selecione o Ativo</Label>
                    <AssetSearch
                      onSelectAsset={setSelectedAsset}
                      placeholder="Buscar ação, FII ou ETF..."
                    />
                  </div>
                  {selectedAsset && (
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-sm">
                          {selectedAsset.ticker}
                        </Badge>
                        <div>
                          <p className="font-medium">{selectedAsset.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedAsset.type}
                          </p>
                        </div>
                        {selectedAsset.price && (
                          <div className="ml-auto">
                            <p className="text-lg font-bold">
                              R$ {selectedAsset.price.toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="alertType">Tipo de Alerta</Label>
                      <Select value={alertType} onValueChange={(v) => setAlertType(v as 'above' | 'below')}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="above">
                            <div className="flex items-center gap-2">
                              <ArrowUpRight className="h-4 w-4 text-green-600" />
                              Acima de
                            </div>
                          </SelectItem>
                          <SelectItem value="below">
                            <div className="flex items-center gap-2">
                              <ArrowDownRight className="h-4 w-4 text-red-600" />
                              Abaixo de
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="targetPrice">Preço Alvo (R$)</Label>
                      <Input
                        id="targetPrice"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={targetPrice || ''}
                        onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  {selectedAsset && targetPrice > 0 && (
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm">
                        <Bell className="h-4 w-4 inline mr-2" />
                        Você será notificado quando <strong>{selectedAsset.ticker}</strong> estiver{' '}
                        <strong>{alertType === 'above' ? 'acima' : 'abaixo'}</strong> de R$ {targetPrice.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateAlert} disabled={!selectedAsset || !targetPrice}>
                    <Bell className="h-4 w-4 mr-2" />
                    Criar Alerta
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Alertas List */}
        <div className="grid gap-4">
          {alerts.length === 0 ? (
            <Card className="border-2">
              <CardContent className="py-16 text-center">
                <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum alerta configurado</h3>
                <p className="text-muted-foreground mb-6">
                  Crie seu primeiro alerta para receber notificações sobre movimentos de preço
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Alerta
                </Button>
              </CardContent>
            </Card>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id} className={`border-2 ${
                isNearTarget(alert.currentPrice, alert.targetPrice)
                  ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                  : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      alert.alertType === 'above'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {alert.alertType === 'above' ? (
                        <ArrowUpRight className="h-6 w-6 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-6 w-6 text-red-600" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-base">
                          {alert.ticker}
                        </Badge>
                        <Badge
                          variant={alert.alertType === 'above' ? 'default' : 'destructive'}
                          className={alert.alertType === 'above' ? 'bg-green-600' : ''}
                        >
                          {alert.alertType === 'above' ? 'Acima de' : 'Abaixo de'}
                        </Badge>
                        {isNearTarget(alert.currentPrice, alert.targetPrice) && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-700 dark:text-yellow-400">
                            <Bell className="h-3 w-3 mr-1" />
                            Próximo!
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Preço Atual</p>
                          <p className="text-xl font-bold">
                            R$ {alert.currentPrice.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Preço Alvo</p>
                          <p className={`text-xl font-bold ${
                            alert.alertType === 'above' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            R$ {alert.targetPrice.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Distância</p>
                          <p className="text-xl font-bold">
                            {getDistancePercent(alert.currentPrice, alert.targetPrice)}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Criado em {new Date(alert.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Como Funciona
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure alertas de preço para receber notificações quando um ativo atingir o valor desejado. Você será alertado por email e notificação push.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5 text-green-600" />
                Alerta "Acima de"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seja notificado quando o preço subir acima do valor alvo. Ideal para vender na alta e realizar lucros.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ArrowDownRight className="h-5 w-5 text-red-600" />
                Alerta "Abaixo de"
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seja notificado quando o preço cair abaixo do valor alvo. Ideal para comprar na queda e entrar em posição.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
