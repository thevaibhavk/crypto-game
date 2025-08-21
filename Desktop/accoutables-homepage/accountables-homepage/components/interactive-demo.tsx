"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, CheckCircle } from "lucide-react"

export function InteractiveDemo() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)

  const messyTransactions = [
    { id: 1, desc: "AMZ Mktp US*1234567", amount: "$89.99", status: "unprocessed" },
    { id: 2, desc: "SQ *PIZZACO", amount: "$45.00", status: "unprocessed" },
    { id: 3, desc: "GOOGLE *WORKSPACE", amount: "$12.00", status: "unprocessed" },
    { id: 4, desc: "STRIPE TRANSFER", amount: "$2,450.00", status: "unprocessed" },
    { id: 5, desc: "UNKNOWN VENDOR XYZ", amount: "$156.78", status: "unprocessed" },
  ]

  const processedTransactions = [
    {
      id: 1,
      desc: "Amazon Marketplace",
      amount: "$89.99",
      category: "Office Supplies",
      confidence: "99.2%",
      status: "processed",
    },
    {
      id: 2,
      desc: "Square *PizzaCo",
      amount: "$45.00",
      category: "Meals & Entertainment",
      confidence: "98.7%",
      status: "processed",
    },
    {
      id: 3,
      desc: "Google Workspace",
      amount: "$12.00",
      category: "Software Subscriptions",
      confidence: "99.9%",
      status: "processed",
    },
    {
      id: 4,
      desc: "Stripe Transfer",
      amount: "$2,450.00",
      category: "Revenue",
      confidence: "99.8%",
      status: "processed",
    },
    {
      id: 5,
      desc: "Unknown Vendor XYZ",
      amount: "$156.78",
      category: "Needs Review",
      confidence: "45.1%",
      status: "review",
    },
  ]

  const handleRunDemo = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsProcessed(true)
    }, 2000)
  }

  const handleReset = () => {
    setIsProcessed(false)
    setIsProcessing(false)
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">See the AI in Action</h2>
          <p className="text-xl text-muted-foreground mb-8">
            No signup required. Watch Accountables transform messy transaction data in real-time.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-foreground">
                {!isProcessed ? "Raw Transaction Data" : "AI-Processed Results"}
              </h3>

              {!isProcessed ? (
                <Button
                  onClick={handleRunDemo}
                  disabled={isProcessing}
                  className="gradient-primary text-white border-0"
                >
                  {isProcessing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Run Accountables AI
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleReset} variant="outline">
                  Reset Demo
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {(!isProcessed ? messyTransactions : processedTransactions).map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`p-4 rounded-lg border transition-all duration-500 ${
                    isProcessing ? "animate-pulse" : ""
                  } ${
                    isProcessed
                      ? transaction.status === "review"
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-green-50 border-green-200"
                      : "bg-muted border-border"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{transaction.desc}</span>
                        <span className="text-muted-foreground">{transaction.amount}</span>
                      </div>

                      {isProcessed && "category" in transaction && (
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={transaction.status === "review" ? "outline" : "default"}
                            className={
                              transaction.status === "review"
                                ? "border-yellow-500 text-yellow-700"
                                : "gradient-primary text-white"
                            }
                          >
                            {transaction.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{transaction.confidence} confidence</span>
                          {transaction.status === "processed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isProcessed && (
              <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">Processing Complete!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  4 out of 5 transactions automatically classified with high confidence. 1 transaction flagged for
                  review due to low confidence score.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}
