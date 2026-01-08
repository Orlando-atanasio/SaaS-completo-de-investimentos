'use client'

import { useState, useEffect } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { Search, TrendingUp, Building2, ArrowRight } from 'lucide-react'

export interface Asset {
  ticker: string
  name: string
  type: 'Ação' | 'FII' | 'ETF' | 'BDR'
  sector?: string
  price?: number
  change?: number
}

interface AssetSearchProps {
  onSelectAsset: (asset: Asset) => void
  placeholder?: string
}

// Mock data - será substituído por API real
const mockAssets: Asset[] = [
  // Ações
  { ticker: 'PETR4', name: 'Petrobras PN', type: 'Ação', sector: 'Petróleo', price: 36.45, change: 2.34 },
  { ticker: 'VALE3', name: 'Vale ON', type: 'Ação', sector: 'Mineração', price: 68.90, change: -1.23 },
  { ticker: 'ITUB4', name: 'Itaú Unibanco PN', type: 'Ação', sector: 'Bancos', price: 32.15, change: 0.89 },
  { ticker: 'BBDC4', name: 'Bradesco PN', type: 'Ação', sector: 'Bancos', price: 14.32, change: -0.78 },
  { ticker: 'BBAS3', name: 'Banco do Brasil ON', type: 'Ação', sector: 'Bancos', price: 15.67, change: 1.45 },
  { ticker: 'WEGE3', name: 'WEG ON', type: 'Ação', sector: 'Indústria', price: 35.67, change: 3.21 },
  { ticker: 'RENT3', name: 'Localiza ON', type: 'Ação', sector: 'Aluguel', price: 48.90, change: 2.56 },
  { ticker: 'MGLU3', name: 'Magazine Luiza ON', type: 'Ação', sector: 'Varejo', price: 2.45, change: -3.45 },
  { ticker: 'BOVA11', name: 'iShares IBOV', type: 'ETF', sector: 'Índice', price: 125.67, change: 1.23 },
  { ticker: 'IVVB11', name: 'iShares S&P 500', type: 'ETF', sector: 'Índice', price: 289.45, change: 0.89 },
  // FIIs
  { ticker: 'HGLG11', name: 'CSHG Logística', type: 'FII', sector: 'Logística', price: 162.50, change: 0.15 },
  { ticker: 'XPML11', name: 'XP Malls', type: 'FII', sector: 'Shoppings', price: 108.90, change: 1.45 },
  { ticker: 'KNRI11', name: 'Kinea Renda', type: 'FII', sector: 'Títulos', price: 152.30, change: 0.67 },
  { ticker: 'VGIP11', name: 'Vinci Garantia', type: 'FII', sector: 'Títulos', price: 110.45, change: 0.23 },
  { ticker: 'HGRE11', name: 'CSHG Residencial', type: 'FII', sector: 'Lajes', price: 156.78, change: -0.34 },
  { ticker: 'SAFY11', name: 'Safra Logística', type: 'FII', sector: 'Logística', price: 107.23, change: 0.89 },
  { ticker: 'RBRP11', name: 'RBR Properties', type: 'FII', sector: 'Galpões', price: 142.56, change: 1.12 },
  { ticker: 'BCRI11', name: 'Brasil Capital', type: 'FII', sector: 'Títulos', price: 112.34, change: 0.45 },
  { ticker: 'XPCR11', name: 'XP Corporate', type: 'FII', sector: 'Lajes', price: 104.56, change: 0.78 },
  { ticker: 'FIIB11', name: 'FII Banespa', type: 'FII', sector: 'Títulos', price: 98.45, change: 0.23 },
]

export function AssetSearch({ onSelectAsset, placeholder = 'Buscar ativos...' }: AssetSearchProps) {
  const [search, setSearch] = useState('')
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(mockAssets)

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredAssets(mockAssets)
      return
    }

    const searchTerm = search.toLowerCase()
    const filtered = mockAssets.filter(
      (asset) =>
        asset.ticker.toLowerCase().includes(searchTerm) ||
        asset.name.toLowerCase().includes(searchTerm) ||
        asset.type.toLowerCase().includes(searchTerm) ||
        (asset.sector && asset.sector.toLowerCase().includes(searchTerm))
    )
    setFilteredAssets(filtered)
  }, [search])

  const groupedAssets = {
    Ações: filteredAssets.filter((a) => a.type === 'Ação'),
    FIIs: filteredAssets.filter((a) => a.type === 'FII'),
    ETFs: filteredAssets.filter((a) => a.type === 'ETF'),
    BDRs: filteredAssets.filter((a) => a.type === 'BDR'),
  }

  return (
    <div className="w-full">
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            placeholder={placeholder}
            value={search}
            onValueChange={setSearch}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <CommandList>
          {Object.entries(groupedAssets).map(([group, assets]) =>
            assets.length > 0 ? (
              <CommandGroup key={group} heading={group}>
                {assets.map((asset) => (
                  <CommandItem
                    key={asset.ticker}
                    onSelect={() => {
                      onSelectAsset(asset)
                      setSearch('')
                    }}
                    className="flex items-center justify-between py-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {asset.type === 'FII' ? (
                          <Building2 className="h-5 w-5 text-primary" />
                        ) : (
                          <TrendingUp className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{asset.ticker}</span>
                          <Badge variant="outline" className="text-xs">
                            {asset.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {asset.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      {asset.price !== undefined && (
                        <p className="font-medium">
                          R$ {asset.price.toFixed(2)}
                        </p>
                      )}
                      {asset.change !== undefined && (
                        <Badge
                          variant={asset.change >= 0 ? 'default' : 'destructive'}
                          className={asset.change >= 0 ? 'bg-green-600' : ''}
                        >
                          {asset.change >= 0 ? '+' : ''}
                          {asset.change.toFixed(2)}%
                        </Badge>
                      )}
                      <ArrowRight className="h-4 w-4 ml-2 inline text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null
          )}
          {filteredAssets.length === 0 && (
            <CommandEmpty>Nenhum ativo encontrado</CommandEmpty>
          )}
        </CommandList>
      </Command>
    </div>
  )
}
