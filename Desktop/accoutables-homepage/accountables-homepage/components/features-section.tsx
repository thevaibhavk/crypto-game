"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, RefreshCw, FileText } from "lucide-react"

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Classification",
      description:
        "Our AI learns your business to categorize 98%+ of transactions automatically, flagging anomalies for human review. The more you use it, the smarter it gets.",
      visual: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">Stripe *CustomerPayment</span>
            <Badge className="gradient-primary text-white">Revenue - 99.8%</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">AWS *Infrastructure</span>
            <Badge className="gradient-primary text-white">Cloud Services - 97.2%</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm">Unknown Vendor XYZ</span>
            <Badge variant="outline">Needs Review - 45.1%</Badge>
          </div>
        </div>
      ),
    },
    {
      icon: RefreshCw,
      title: "Automated Reconciliation",
      description:
        "Connect your banks and systems of record. Accountables automatically matches transactions and reconciles accounts in real-time, eliminating tedious month-end crunch.",
      visual: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Bank Statement</div>
              <div className="text-sm font-medium">$2,450.00</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Internal Record</div>
              <div className="text-sm font-medium">$2,450.00</div>
            </div>
          </div>
          <div className="text-center">
            <Badge className="gradient-accent text-accent-foreground">✓ Matched Automatically</Badge>
          </div>
        </div>
      ),
    },
    {
      icon: FileText,
      title: "Instant, Audit-Ready Reporting",
      description:
        "Generate P&L, Balance Sheets, and Cash Flow statements on demand. Drill down into any number and export a complete audit trail with one click.",
      visual: (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Revenue</span>
              <span className="font-bold">$125,450</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Expenses</span>
              <span className="font-bold">$89,230</span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="font-bold">Net Income</span>
              <span className="font-bold text-primary">$36,220</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              Export PDF
            </Badge>
            <Badge variant="outline" className="text-xs">
              Export CSV
            </Badge>
            <Badge variant="outline" className="text-xs">
              Audit Trail
            </Badge>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Your Finance Command Center</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to automate your financial operations and close your books with confidence
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                activeFeature === index ? "border-primary shadow-lg" : ""
              }`}
              onClick={() => setActiveFeature(index)}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                <div className="pt-4">{feature.visual}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
