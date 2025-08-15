"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Eye, MoreHorizontal, Pause, Play, Trash2, AlertTriangle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Token {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  status: "active" | "suspended" | "revoked"
  createdAt: Date
  lastUsedAt: Date
  usageCount: number
  expiresAt: Date
  rateLimits: {
    requestsPerMinute: number
    requestsPerDay: number
  }
}

interface TokenTableProps {
  tokens: Token[]
  selectedTokens: string[]
  onSelectAll: (checked: boolean) => void
  onSelectToken: (tokenId: string, checked: boolean) => void
  onTokenAction: (tokenId: string, action: string) => void
}

export function TokenTable({ tokens, selectedTokens, onSelectAll, onSelectToken, onTokenAction }: TokenTableProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Token ID has been copied to your clipboard.",
    })
  }

  const getStatusBadge = (status: Token["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Suspended</Badge>
      case "revoked":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Revoked</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const truncateToken = (tokenId: string) => {
    return `${tokenId.slice(0, 12)}...${tokenId.slice(-4)}`
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedTokens.length === tokens.length && tokens.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead>Token ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTokens.includes(token.id)}
                    onCheckedChange={(checked) => onSelectToken(token.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{truncateToken(token.id)}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(token.id)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{token.customerName}</div>
                    <div className="text-sm text-gray-500">{token.customerEmail}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(token.status)}</TableCell>
                <TableCell>{formatDate(token.createdAt)}</TableCell>
                <TableCell>{formatDate(token.lastUsedAt)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{token.usageCount.toLocaleString()}</div>
                    <div className="text-gray-500">{token.rateLimits.requestsPerDay.toLocaleString()}/day limit</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDate(token.expiresAt)}
                    {token.expiresAt < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                      <div className="flex items-center text-yellow-600 mt-1">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span className="text-xs">Expires soon</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onTokenAction(token.id, "view")}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {token.status === "active" ? (
                        <DropdownMenuItem onClick={() => onTokenAction(token.id, "suspend")}>
                          <Pause className="mr-2 h-4 w-4" />
                          Suspend
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onTokenAction(token.id, "activate")}>
                          <Play className="mr-2 h-4 w-4" />
                          Activate
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onTokenAction(token.id, "revoke")}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Revoke
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onTokenAction(token.id, "delete")} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
