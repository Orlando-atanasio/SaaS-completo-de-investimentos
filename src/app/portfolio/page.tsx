'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { Plus, Trash2, Edit, ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, PieChart as PieChartIcon, RefreshCw } from 'lucide-react'

interface PortfolioAsset {
  id: string
  ticker: string
  name: string
  type: 'Ação' | 'FII' | 'ETF' | 'BDR'
  quantity: number
  avgPrice: number
  currentPrice: number
  total: number
  profit: number
  profitPercent: number
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([
    {
      id: '1',
      ticker: 'PETR4',
      name: 'Petrobras PN',
      type: 'Ação',
      quantity: 150,
      avgPrice: 32.00,
      currentPrice: 36.45,
      total: 5467.50,
      profit: 667.50,
      profitPercent: 13.91
    },
    {
      id: '2',
      ticker: 'VALE3',
      name: 'Vale ON',
      type: 'Ação',
      quantity: 80,
      avgPrice: 68.00,
      currentPrice: 68.90,
      total: 5512.00,
      profit: 72.00,
      profitPercent: 1.32
    },
    {
      id: '3',
      ticker: 'ITUB4',
      name: 'Itaú Unibanco PN',
      type: 'Ação',
      quantity: 200,
      avgPrice: 30.50,
      currentPrice: 32.15,
      total: 6430.00,
      profit: 330.00,
      profitPercent: 5.41
    },
    {
      id: '4',
      ticker: 'HGLG11',
      name: 'CSHG Logística',
      type: 'FII',
      quantity: 30,
      avgPrice: 160.00,
      currentPrice: 162.50,
      total: 4875.00,
      profit: 75.00,
      profitPercent: 1.56
    },
    {
      id: '5',
      ticker: 'WEGE3',
      name: 'WEG ON',
      type: 'Ação',
      quantity: 100,
      avgPrice: 33.00,
      currentPrice: 35.67,
      total: 3567.00,
      profit: 267.00,
      profitPercent: 8.09
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [avgPrice, setAvgPrice] = useState<number>(0)

  const totalInvested = portfolio.reduce((acc, asset) => acc + (asset.quantity * asset.avgPrice), 0)
  const totalCurrent = portfolio.reduce((acc, asset) => acc + asset.total, 0)
  const totalProfit = totalCurrent - totalInvested
  const totalProfitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0

  const handleAddAsset = () => {
    if (!selectedAsset) return

    const newAsset: PortfolioAsset = {
      id: Date.now().toString(),
      ticker: selectedAsset.ticker,
      name: selectedAsset.name,
      type: selectedAsset.type,
      quantity,
      avgPrice: avgPrice || selectedAsset.price || 0,
      currentPrice: selectedAsset.price || 0,
      total: quantity * (selectedAsset.price || 0),
      profit: quantity * ((selectedAsset.price || 0) - avgPrice),
      profitPercent: avgPrice > 0 ? ((selectedAsset.price || 0) - avgPrice) / avgPrice * 100 : 0
    }

    setPortfolio([...portfolio, newAsset])
    setIsAddDialogOpen(false)
    setSelectedAsset(null)
    setQuantity(1)
    setAvgPrice(0)
  }

  const handleRemoveAsset = (id: string) => {
    setPortfolio(portfolio.filter(asset => asset.id !== id))
  }

  const handleEditAsset = (id: string) => {
    // TODO: Implementar edição de ativo
    console.log('Edit asset:', id)
  }

  const distributionData = portfolio.map(asset => ({
    name: asset.ticker,
    value: asset.total,
    profit: asset.profit
  }))

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16']

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Minha Carteira</h1>
          <p className="text-muted-foreground text-lg">
            Acompanhe todos os seus investimentos em um só lugar
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Valor Total
              </CardDescription>
              <CardTitle className="text-2xl">
                R$ {totalCurrent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {portfolio.length} ativos na carteira
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Total Investido
              </CardDescription>
              <CardTitle className="text-2xl">
                R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Custo de aquisição
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Lucro/Prejuízo
              </CardDescription>
              <CardTitle className={`text-2xl ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalProfit >= 0 ? '+' : ''}
                R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={totalProfit >= 0 ? 'default' : 'destructive'}
                className={totalProfit >= 0 ? 'bg-green-600' : ''}
              >
                {totalProfitPercent >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {totalProfitPercent >= 0 ? '+' : ''}
                {totalProfitPercent.toFixed(2)}%
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                Rentabilidade
              </CardDescription>
              <CardTitle className={`text-2xl ${totalProfitPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalProfitPercent >= 0 ? '+' : ''}
                {totalProfitPercent.toFixed(2)}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Desde a primeira compra
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Portfolio Table */}
          <Card className="lg:col-span-2 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ativos na Carteira</CardTitle>
                  <CardDescription>
                    Lista de todos os seus investimentos
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Adicionar Ativo à Carteira</DialogTitle>
                        <DialogDescription>
                          Busque e selecione um ativo para adicionar à sua carteira
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Buscar Ativo</Label>
                          <AssetSearch
                            onSelectAsset={setSelectedAsset}
                            placeholder="Digite o ticker ou nome do ativo..."
                          />
                        </div>
                        {selectedAsset && (
                          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">{selectedAsset.ticker}</Badge>
                              <span className="font-medium">{selectedAsset.name}</span>
                              <Badge variant="outline">{selectedAsset.type}</Badge>
                            </div>
                            {selectedAsset.price && (
                              <p className="text-sm text-muted-foreground">
                                Preço atual: R$ {selectedAsset.price.toFixed(2)}
                              </p>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="quantity">Quantidade</Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  min="1"
                                  value={quantity}
                                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                                />
                              </div>
                              <div>
                                <Label htmlFor="avgPrice">Preço Médio</Label>
                                <Input
                                  id="avgPrice"
                                  type="number"
                                  step="0.01"
                                  placeholder={`Atual: ${selectedAsset.price?.toFixed(2) || 'N/A'}`}
                                  value={avgPrice}
                                  onChange={(e) => setAvgPrice(parseFloat(e.target.value) || 0)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddAsset} disabled={!selectedAsset}>
                          Adicionar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ativo</TableHead>
                      <TableHead>Qtd</TableHead>
                      <TableHead className="text-right">Preço Médio</TableHead>
                      <TableHead className="text-right">Preço Atual</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Lucro/Prej</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolio.map((asset) => (
                      <TableRow key={asset.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{asset.ticker}</p>
                            <p className="text-sm text-muted-foreground">
                              {asset.name}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{asset.quantity}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          R$ {asset.avgPrice.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          R$ {asset.currentPrice.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-medium">
                            R$ {asset.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div>
                            <Badge
                              variant={asset.profit >= 0 ? 'default' : 'destructive'}
                              className={asset.profit >= 0 ? 'bg-green-600' : ''}
                            >
                              {asset.profit >= 0 ? '+' : ''}
                              {asset.profitPercent.toFixed(2)}%
                            </Badge>
                            <p className={`text-xs mt-1 ${asset.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {asset.profit >= 0 ? '+' : ''}
                              R$ {asset.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditAsset(asset.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveAsset(asset.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Distribution Chart */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Distribuição</CardTitle>
              <CardDescription>
                Alocação por ativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {distributionData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">
                        {((item.value / totalCurrent) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
