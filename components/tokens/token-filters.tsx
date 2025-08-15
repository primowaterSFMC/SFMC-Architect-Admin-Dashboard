"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"

interface TokenFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function TokenFilters({ onFiltersChange }: TokenFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Filters</CardTitle>
        <CardDescription>Filter tokens by various criteria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="status-filter">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="customer-filter">Customer</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All customers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="acme">Acme Corporation</SelectItem>
                <SelectItem value="beta">Beta LLC</SelectItem>
                <SelectItem value="gamma">Gamma Industries</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Created Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Select date range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="usage-filter">Usage Range</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All usage levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Usage Levels</SelectItem>
                <SelectItem value="low">Low (0-100)</SelectItem>
                <SelectItem value="medium">Medium (101-1000)</SelectItem>
                <SelectItem value="high">High (1000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" size="sm">
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
          <Button size="sm" className="bg-[#0176D3] hover:bg-[#014486]">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
