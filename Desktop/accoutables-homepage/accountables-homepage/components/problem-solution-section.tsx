"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, FileSpreadsheet, Zap, Shield, BarChart3 } from "lucide-react"

export function ProblemSolutionSection() {
  const [activePanel, setActivePanel] = useState<"problem" | "solution">("problem")

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">From Chaos to Clarity</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your month-end from a stressful scramble into a confident, automated process
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Toggle Buttons */}
          <div className="lg:col-span-2 flex justify-center mb-8">
            <div className="bg-background rounded-lg p-1 border border-border">
              <Button
                variant={activePanel === "problem" ? "default" : "ghost"}
                onClick={() => setActivePanel("problem")}
                className="px-8"
              >
                The Problem
              </Button>
              <Button
                variant={activePanel === "solution" ? "default" : "ghost"}
                onClick={() => setActivePanel("solution")}
                className="px-8"
              >
                The Solution
              </Button>
            </div>
          </div>

          {/* Problem Panel */}
          {activePanel === "problem" && (
            <div className="lg:col-span-2 animate-in fade-in duration-300">
              <Card className="p-8 border-destructive/20 bg-destructive/5">
                <div className="text-center mb-8">
                  <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Stop drowning in manual work</h3>
                  <p className="text-muted-foreground">
                    Finance teams waste countless hours on repetitive tasks that should be automated
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: FileSpreadsheet,
                      title: "Endless CSV exports & VLOOKUPs",
                      description: "Hours spent manually categorizing transactions in spreadsheets",
                    },
                    {
                      icon: AlertCircle,
                      title: "Inconsistent GL coding",
                      description: "Different team members code similar transactions differently",
                    },
                    {
                      icon: Shield,
                      title: "Painful audit preparations",
                      description: "Scrambling to find supporting documentation and create audit trails",
                    },
                    {
                      icon: BarChart3,
                      title: "Delayed, unreliable reports",
                      description: "Waiting days for financial reports that may contain errors",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <item.icon className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Solution Panel */}
          {activePanel === "solution" && (
            <div className="lg:col-span-2 animate-in fade-in duration-300">
              <Card className="p-8 border-primary/20 bg-primary/5">
                <div className="text-center mb-8">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Achieve continuous, automated accounting</h3>
                  <p className="text-muted-foreground">
                    Let AI handle the repetitive work while you focus on strategic finance decisions
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Zap,
                      title: "Real-time, AI-powered classification",
                      description: "Transactions are automatically categorized as they happen with 98%+ accuracy",
                    },
                    {
                      icon: CheckCircle,
                      title: "Consistent, rule-based coding",
                      description:
                        "AI learns your coding patterns and applies them consistently across all transactions",
                    },
                    {
                      icon: Shield,
                      title: "One-click audit trail",
                      description: "Complete documentation and supporting evidence available instantly",
                    },
                    {
                      icon: BarChart3,
                      title: "Instant, accurate financials",
                      description: "Real-time financial reports that update automatically as transactions flow in",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <item.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
