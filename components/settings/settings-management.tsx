"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Download,
  Upload,
  Save,
  RefreshCw,
  Shield,
  Server,
  Database,
  FileText,
  Users,
  Bell,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState("server")
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const handleSave = () => {
    // Save settings logic
    setUnsavedChanges(false)
  }

  const handleExport = () => {
    // Export configuration logic
    const config = {
      server: { port: 3000, host: "localhost" },
      rateLimiting: { enabled: true, requestsPerMinute: 100 },
      // ... other settings
    }
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sfmc-mcp-config.json"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure system settings and administration options</p>
        </div>
        <div className="flex items-center gap-3">
          {unsavedChanges && (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </Button>
          <Button onClick={handleSave} disabled={!unsavedChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="server" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            Server
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="server" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Server Configuration</CardTitle>
              <CardDescription>Configure server settings and connection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input id="port" type="number" defaultValue="3000" onChange={() => setUnsavedChanges(true)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host">Host</Label>
                  <Input id="host" defaultValue="localhost" onChange={() => setUnsavedChanges(true)} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ssl">Enable SSL/TLS</Label>
                    <p className="text-sm text-gray-600">Use HTTPS for secure connections</p>
                  </div>
                  <Switch id="ssl" onCheckedChange={() => setUnsavedChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cors">Enable CORS</Label>
                    <p className="text-sm text-gray-600">Allow cross-origin requests</p>
                  </div>
                  <Switch id="cors" defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowed-origins">Allowed Origins</Label>
                <Textarea
                  id="allowed-origins"
                  placeholder="https://example.com&#10;https://app.example.com"
                  onChange={() => setUnsavedChanges(true)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rate Limiting</CardTitle>
              <CardDescription>Configure API rate limiting and throttling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="rate-limiting">Enable Rate Limiting</Label>
                  <p className="text-sm text-gray-600">Protect against API abuse</p>
                </div>
                <Switch id="rate-limiting" defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="requests-per-minute">Requests per Minute</Label>
                  <Input
                    id="requests-per-minute"
                    type="number"
                    defaultValue="100"
                    onChange={() => setUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="burst-limit">Burst Limit</Label>
                  <Input id="burst-limit" type="number" defaultValue="200" onChange={() => setUnsavedChanges(true)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>Configure authentication and authorization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="auth-method">Authentication Method</Label>
                <Select onValueChange={() => setUnsavedChanges(true)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select authentication method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api-key">API Key</SelectItem>
                    <SelectItem value="jwt">JWT Token</SelectItem>
                    <SelectItem value="oauth">OAuth 2.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="token-expiry">Token Expiry (hours)</Label>
                  <Input id="token-expiry" type="number" defaultValue="24" onChange={() => setUnsavedChanges(true)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refresh-expiry">Refresh Token Expiry (days)</Label>
                  <Input id="refresh-expiry" type="number" defaultValue="30" onChange={() => setUnsavedChanges(true)} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-2fa">Require Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">Enhanced security for admin access</p>
                </div>
                <Switch id="require-2fa" onCheckedChange={() => setUnsavedChanges(true)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>Configure security policies and restrictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select onValueChange={() => setUnsavedChanges(true)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (16+ chars, symbols required)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="60"
                    onChange={() => setUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Input
                    id="max-login-attempts"
                    type="number"
                    defaultValue="5"
                    onChange={() => setUnsavedChanges(true)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
              <CardDescription>Configure database connection and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>Database changes require server restart to take effect.</AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="db-url">Database URL</Label>
                <Input
                  id="db-url"
                  type="password"
                  placeholder="postgresql://..."
                  onChange={() => setUnsavedChanges(true)}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="max-connections">Max Connections</Label>
                  <Input
                    id="max-connections"
                    type="number"
                    defaultValue="20"
                    onChange={() => setUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="connection-timeout">Connection Timeout (ms)</Label>
                  <Input
                    id="connection-timeout"
                    type="number"
                    defaultValue="5000"
                    onChange={() => setUnsavedChanges(true)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Enable Automatic Backups</Label>
                  <p className="text-sm text-gray-600">Daily database backups</p>
                </div>
                <Switch id="auto-backup" defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
              </div>

              <div className="flex gap-3">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Backup Now
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Restore Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logging Configuration</CardTitle>
              <CardDescription>Configure system logging and audit trails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="log-level">Log Level</Label>
                <Select onValueChange={() => setUnsavedChanges(true)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select log level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="log-retention">Log Retention (days)</Label>
                  <Input id="log-retention" type="number" defaultValue="30" onChange={() => setUnsavedChanges(true)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-log-size">Max Log File Size (MB)</Label>
                  <Input id="max-log-size" type="number" defaultValue="100" onChange={() => setUnsavedChanges(true)} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-logging">Enable Audit Logging</Label>
                    <p className="text-sm text-gray-600">Log all admin actions</p>
                  </div>
                  <Switch id="audit-logging" defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="api-logging">Enable API Request Logging</Label>
                    <p className="text-sm text-gray-600">Log all API requests and responses</p>
                  </div>
                  <Switch id="api-logging" defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Logs
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage admin users and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Admin Users</h3>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  { name: "John Doe", email: "john@company.com", role: "Super Admin", status: "Active" },
                  { name: "Jane Smith", email: "jane@company.com", role: "Admin", status: "Active" },
                  { name: "Bob Wilson", email: "bob@company.com", role: "Viewer", status: "Inactive" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.role === "Super Admin" ? "default" : "secondary"}>{user.role}</Badge>
                      <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>Configure system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="error-alerts">Error Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified of system errors</p>
                  </div>
                  <Switch id="error-alerts" defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="performance-alerts">Performance Alerts</Label>
                    <p className="text-sm text-gray-600">Alert when performance degrades</p>
                  </div>
                  <Switch id="performance-alerts" defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                    <p className="text-sm text-gray-600">Alert on security events</p>
                  </div>
                  <Switch id="security-alerts" defaultChecked onCheckedChange={() => setUnsavedChanges(true)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="admin@company.com"
                  onChange={() => setUnsavedChanges(true)}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="alert-threshold">CPU Alert Threshold (%)</Label>
                  <Input
                    id="alert-threshold"
                    type="number"
                    defaultValue="80"
                    onChange={() => setUnsavedChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memory-threshold">Memory Alert Threshold (%)</Label>
                  <Input
                    id="memory-threshold"
                    type="number"
                    defaultValue="85"
                    onChange={() => setUnsavedChanges(true)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
