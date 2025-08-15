"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
import { Building, Shield, CheckCircle, AlertCircle } from "lucide-react"

interface Customer {
  id: string
  companyName: string
  primaryContact: {
    name: string
    email: string
    phone: string
  }
  tokens: number
  totalApiUsage: number
  accountStatus: "active" | "suspended" | "terminated"
  createdAt: Date
  lastActivity: Date
  industry: string
  plan: string
  sfmcCredentials?: {
    clientId: string
    clientSecret: string
    subdomain: string
    accountId: string
    stack: string
    environment: string
  }
}

interface CustomerFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (customerData: any) => void
  customer?: Customer | null
}

export function CustomerForm({ isOpen, onClose, onSave, customer }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    industry: "",
    plan: "Professional",
    accountStatus: "active",
    notes: "",
    sfmcClientId: "",
    sfmcClientSecret: "",
    sfmcSubdomain: "",
    sfmcAccountId: "",
    sfmcStack: "mc",
    sfmcEnvironment: "production",
  })

  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (customer) {
      setFormData({
        companyName: customer.companyName,
        contactName: customer.primaryContact.name,
        contactEmail: customer.primaryContact.email,
        contactPhone: customer.primaryContact.phone,
        industry: customer.industry,
        plan: customer.plan,
        accountStatus: customer.accountStatus,
        notes: "",
        sfmcClientId: customer.sfmcCredentials?.clientId || "",
        sfmcClientSecret: customer.sfmcCredentials?.clientSecret || "",
        sfmcSubdomain: customer.sfmcCredentials?.subdomain || "",
        sfmcAccountId: customer.sfmcCredentials?.accountId || "",
        sfmcStack: customer.sfmcCredentials?.stack || "mc",
        sfmcEnvironment: customer.sfmcCredentials?.environment || "production",
      })
    } else {
      setFormData({
        companyName: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        industry: "",
        plan: "Professional",
        accountStatus: "active",
        notes: "",
        sfmcClientId: "",
        sfmcClientSecret: "",
        sfmcSubdomain: "",
        sfmcAccountId: "",
        sfmcStack: "mc",
        sfmcEnvironment: "production",
      })
    }
  }, [customer])

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    setConnectionStatus("idle")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (formData.sfmcClientId && formData.sfmcClientSecret && formData.sfmcSubdomain) {
        setConnectionStatus("success")
      } else {
        setConnectionStatus("error")
      }
    } catch (error) {
      setConnectionStatus("error")
    } finally {
      setIsTestingConnection(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const customerData = {
      companyName: formData.companyName,
      primaryContact: {
        name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
      },
      industry: formData.industry,
      plan: formData.plan,
      accountStatus: formData.accountStatus,
      sfmcCredentials: {
        clientId: formData.sfmcClientId,
        clientSecret: formData.sfmcClientSecret,
        subdomain: formData.sfmcSubdomain,
        accountId: formData.sfmcAccountId,
        stack: formData.sfmcStack,
        environment: formData.sfmcEnvironment,
      },
    }

    onSave(customerData)
  }

  const handleClose = () => {
    setFormData({
      companyName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      industry: "",
      plan: "Professional",
      accountStatus: "active",
      notes: "",
      sfmcClientId: "",
      sfmcClientSecret: "",
      sfmcSubdomain: "",
      sfmcAccountId: "",
      sfmcStack: "mc",
      sfmcEnvironment: "production",
    })
    setConnectionStatus("idle")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>{customer ? "Edit Customer" : "Add New Customer"}</span>
          </DialogTitle>
          <DialogDescription>
            {customer ? "Update customer information and settings." : "Create a new customer account."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Company Information</CardTitle>
              <CardDescription>Basic company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Acme Corporation"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="plan">Plan</Label>
                  <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Starter">Starter</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Primary Contact</CardTitle>
              <CardDescription>Main point of contact for this customer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="john.smith@acme.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* SFMC Credentials */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>SFMC Credentials</span>
              </CardTitle>
              <CardDescription>Salesforce Marketing Cloud API credentials for this customer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <Label htmlFor="sfmcAccountId">Account ID</Label>
                  <Input
                    id="sfmcAccountId"
                    value={formData.sfmcAccountId}
                    onChange={(e) => setFormData({ ...formData, sfmcAccountId: e.target.value })}
                    placeholder="123456789"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sfmcStack">Stack</Label>
                  <Select
                    value={formData.sfmcStack}
                    onValueChange={(value) => setFormData({ ...formData, sfmcStack: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mc">mc (Default)</SelectItem>
                      <SelectItem value="us1">us1 (US East)</SelectItem>
                      <SelectItem value="us2">us2 (US West)</SelectItem>
                      <SelectItem value="eu1">eu1 (Europe)</SelectItem>
                      <SelectItem value="ap1">ap1 (Asia Pacific)</SelectItem>
                      <SelectItem value="ca1">ca1 (Canada)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sfmcEnvironment">Environment</Label>
                  <Select
                    value={formData.sfmcEnvironment}
                    onValueChange={(value) => setFormData({ ...formData, sfmcEnvironment: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="sandbox">Sandbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestConnection}
                  disabled={isTestingConnection || !formData.sfmcClientId || !formData.sfmcClientSecret}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  {isTestingConnection ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0176D3]"></div>
                      <span>Testing...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>Test Connection</span>
                    </>
                  )}
                </Button>

                {connectionStatus === "success" && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Connection successful</span>
                  </div>
                )}

                {connectionStatus === "error" && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Connection failed</span>
                  </div>
                )}
              </div>

              {/* 
              <div className="pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex items-center space-x-2"
                  disabled={connectionStatus !== "success"}
                >
                  <Plus className="h-4 w-4" />
                  <span>Generate Token</span>
                </Button>
              </div>
              */}
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Settings</CardTitle>
              <CardDescription>Account status and additional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="accountStatus">Account Status</Label>
                <Select
                  value={formData.accountStatus}
                  onValueChange={(value) => setFormData({ ...formData, accountStatus: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes about this customer..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0176D3] hover:bg-[#014486]">
              {customer ? "Update Customer" : "Create Customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
