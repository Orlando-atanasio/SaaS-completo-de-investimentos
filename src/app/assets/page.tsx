'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AssetSearch, Asset } from '@/components/asset-search'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LineChart, Plus, ArrowUpRight, ArrowDownRight, TrendingUp, Building2 } from 'lucide-react'

export default function AssetsPage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [filterType, setFilterType] = useState<string>('all')

  // Mock data - será substituído por API real
  const assets = [
    { ticker: 'PETR4', name: 'Petrobras PN', type: 'Ação', price: 36.45, change: 2.34, volume: 12540000, marketCap: 'R$ 230B' },
    { ticker: 'VALE3', name: 'Vale ON', type: 'Ação', price: 68.90, change: -1.23, volume: 9870000, marketCap: 'R$ 340B' },
    { ticker: 'ITUB4', name: 'Itaú Unibanco PN', type: 'Ação', price: 32.15, change: 0.89, volume: 8900000, marketCap: 'R$ 190B' },
    { ticker: 'HGLG11', name: 'CSHG Logística', type: 'FII', price: 162.50, change: 0.15, volume: 45000, marketCap: 'R$ 4.5B' },
    { ticker: 'BBDC4', name: 'Bradesco PN', type: 'Ação', price: 14.32, change: -0.78, volume: 12300000, marketCap: 'R$ 95B' },
    { ticker: 'XPML11', name: 'XP Malls', type: 'FII', price: 108.90, change: 1.45, volume: 32000, marketCap: 'R$ 2.2B' },
    { ticker: 'WEGE3', name: 'WEG ON', type: 'Ação', price: 35.67, change: 3.21, volume: 5600000, marketCap: 'R$ 85B' },
    { ticker: 'BOVA11', name: 'iShares IBOV', type: 'ETF', price: 125.67, change: 1.23, volume: 890000, marketCap: 'R$ 12.5B' },
    { ticker: 'KNRI11', name: 'Kinea Renda', type: 'FII', price: 152.30, change: 0.67, volume: 28000, marketCap: 'R$ 3.0B' },
    { ticker: 'BBAS3', name: 'Banco do Brasil ON', type: 'Ação', price: 15.67, change: 1.45, volume: 7800000, marketCap: 'R$ 105B' },
  ]

  const filteredAssets = filterType === 'all'
    ? assets
    : assets.filter(asset => asset.type === filterType)

  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset)
    // TODO: Implementar lógica para adicionar à carteira ou visualizar detalhes
    console.log('Selected asset:', asset)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Ativos</h1>
          <p className="text-muted-foreground text-lg">
            Explore e encontre as melhores oportunidades de investimento
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-6 border-2">
          <CardHeader>
            <CardTitle>Buscar Ativos</CardTitle>
            <CardDescription>
              Encontre ações, FIIs, ETFs e BDRs para adicionar à sua carteira
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssetSearch
              onSelectAsset={handleSelectAsset}
              placeholder="Digite o ticker, nome ou tipo do ativo..."
            />
            {selectedAsset && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {selectedAsset.type === 'FII' ? (
                        <Building2 className="h-6 w-6 text-primary" />
                      ) : (
                        <TrendingUp className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{selectedAsset.ticker}</span>
                        <Badge variant="outline">{selectedAsset.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedAsset.name}</p>
                    </div>
                  </div>
                  {selectedAsset.price && (
                    <div className="text-right">
                      <p className="text-2xl font-bold">R$ {selectedAsset.price.toFixed(2)}</p>
                      {selectedAsset.change !== undefined && (
                        <Badge
                          variant={selectedAsset.change >= 0 ? 'default' : 'destructive'}
                          className={selectedAsset.change >= 0 ? 'bg-green-600' : ''}
                        >
                          {selectedAsset.change >= 0 ? '+' : ''}
                          {selectedAsset.change.toFixed(2)}%
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar à Carteira
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Assets Table */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lista de Ativos</CardTitle>
                <CardDescription>
                  Todos os ativos disponíveis para investimento
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Ação">Ações</SelectItem>
                    <SelectItem value="FII">FIIs</SelectItem>
                    <SelectItem value="ETF">ETFs</SelectItem>
                    <SelectItem value="BDR">BDRs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ativo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Variação</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow key={asset.ticker} className="hover:bg-muted/50 cursor-pointer">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {asset.type === 'FII' ? (
                              <Building2 className="h-5 w-5 text-primary" />
                            ) : (
                              <TrendingUp className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{asset.ticker}</p>
                            <p className="text-sm text-muted-foreground">
                              {asset.name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{asset.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-medium">
                          R$ {asset.price.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={asset.change >= 0 ? 'default' : 'destructive'}
                          className={asset.change >= 0 ? 'bg-green-600' : ''}
                        >
                          {asset.change >= 0 ? <ArrowUpRight className="h-3 w-3 inline mr-1" /> : <ArrowDownRight className="h-3 w-3 inline mr-1" />}
                          {asset.change >= 0 ? '+' : ''}
                          {asset.change.toFixed(2)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {(asset.volume / 1000000).toFixed(1)}M
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {asset.marketCap}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <LineChart className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
