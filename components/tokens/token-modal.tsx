"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Key } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface TokenModalProps {
  isOpen: boolean
  onClose: () => void
  onTokenGenerated: (tokenData: any) => void
}

export function TokenModal({ isOpen, onClose, onTokenGenerated }: TokenModalProps) {
  const [step, setStep] = useState<"form" | "generated">("form")
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    customerEmail: "",
    sfmcClientId: "",
    sfmcClientSecret: "",
    sfmcSubdomain: "",
    expirationDays: "365",
    requestsPerMinute: "100",
    requestsPerDay: "10000",
    description: "",
  })
  const [generatedToken, setGeneratedToken] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate a mock token
    const newToken = `tok_${Math.random().toString(36).substr(2, 16)}`
    setGeneratedToken(newToken)
    setStep("generated")

    // Call the callback with the token data
    onTokenGenerated({
      ...formData,
      token: newToken,
      createdAt: new Date(),
    })
  }

  const copyToken = () => {
    navigator.clipboard.writeText(generatedToken)
    toast({
      title: "Token copied",
      description: "The API token has been copied to your clipboard.",
    })
  }

  const handleClose = () => {
    setStep("form")
    setFormData({
      customerId: "",
      customerName: "",
      customerEmail: "",
      sfmcClientId: "",
      sfmcClientSecret: "",
      sfmcSubdomain: "",
      expirationDays: "365",
      requestsPerMinute: "100",
      requestsPerDay: "10000",
      description: "",
    })
    setGeneratedToken("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>Generate New API Token</span>
              </DialogTitle>
              <DialogDescription>
                Create a new API token for a customer to access the SFMC MCP server.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Information</CardTitle>
                  <CardDescription>Basic customer details for token assignment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerId">Customer ID</Label>
                      <Input
                        id="customerId"
                        value={formData.customerId}
                        onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                        placeholder="cust_001"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="Acme Corporation"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Customer Email</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      placeholder="admin@acme.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Production API access for marketing campaigns"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* SFMC Credentials */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SFMC Credentials</CardTitle>
                  <CardDescription>Salesforce Marketing Cloud API credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sfmcClientId">Client ID</Label>
                    <Input
                      id="sfmcClientId"
                      value={formData.sfmcClientId}
                      onChange={(e) => setFormData({ ...formData, sfmcClientId: e.target.value })}
                      placeholder="your-client-id"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sfmcClientSecret">Client Secret</Label>
                    <Input
                      id="sfmcClientSecret"
                      type="password"
                      value={formData.sfmcClientSecret}
                      onChange={(e) => setFormData({ ...formData, sfmcClientSecret: e.target.value })}
                      placeholder="your-client-secret"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sfmcSubdomain">Subdomain</Label>
                    <Input
                      id="sfmcSubdomain"
                      value={formData.sfmcSubdomain}
                      onChange={(e) => setFormData({ ...formData, sfmcSubdomain: e.target.value })}
                      placeholder="mc123456789"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Token Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Token Settings</CardTitle>
                  <CardDescription>Configure token expiration and rate limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="expirationDays">Expiration (Days)</Label>
                    <Select
                      value={formData.expirationDays}
                      onValueChange={(value) => setFormData({ ...formData, expirationDays: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="never">Never expires</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="requestsPerMinute">Requests per Minute</Label>
                      <Input
                        id="requestsPerMinute"
                        type="number"
                        value={formData.requestsPerMinute}
                        onChange={(e) => setFormData({ ...formData, requestsPerMinute: e.target.value })}
                        min="1"
                        max="1000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="requestsPerDay">Requests per Day</Label>
                      <Input
                        id="requestsPerDay"
                        type="number"
                        value={formData.requestsPerDay}
                        onChange={(e) => setFormData({ ...formData, requestsPerDay: e.target.value })}
                        min="1"
                        max="100000"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0176D3] hover:bg-[#014486]">
                  Generate Token
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-green-700">
                <Key className="h-5 w-5" />
                <span>Token Generated Successfully</span>
              </DialogTitle>
              <DialogDescription>
                Your API token has been generated. Make sure to copy it now as you won't be able to see it again.
              </DialogDescription>
            </DialogHeader>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg">API Token</CardTitle>
                <CardDescription>Copy this token and store it securely</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 p-3 bg-white border rounded-lg">
                  <code className="flex-1 text-sm font-mono">{generatedToken}</code>
                  <Button variant="outline" size="icon" onClick={copyToken}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Token Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Customer:</span>
                  <span className="text-sm font-medium">{formData.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm font-medium">{formData.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rate Limit:</span>
                  <span className="text-sm font-medium">
                    {formData.requestsPerMinute}/min, {formData.requestsPerDay}/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expires:</span>
                  <span className="text-sm font-medium">
                    {formData.expirationDays === "never"
                      ? "Never"
                      : new Date(
                          Date.now() + Number.parseInt(formData.expirationDays) * 24 * 60 * 60 * 1000,
                        ).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <DialogFooter>
              <Button onClick={handleClose} className="bg-[#0176D3] hover:bg-[#014486]">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
