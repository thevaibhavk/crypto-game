import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Shield, Lock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy and CTAs */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The Autonomous
                <br />
                <span className="text-primary">Month-End</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Accountables is the AI-native finance platform that automates transaction classification, account
                reconciliation, and reporting — so you can close with 100% confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary text-white border-0 text-lg px-8 py-4">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
                Book a Demo
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Visual */}
          <div className="relative">
            <div className="relative z-10">
              <Card className="p-6 glassmorphism border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Live Transaction Feed</h3>
                    <Badge variant="secondary" className="gradient-accent text-accent-foreground">
                      AI Processing
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {[
                      { desc: "AMZ Mktp US*1234567", status: "AI Classified", confidence: "98.2%" },
                      { desc: "Stripe *PizzaCorp", status: "Needs Review", confidence: "76.4%" },
                      { desc: "Google Workspace", status: "Approved", confidence: "99.8%" },
                    ].map((transaction, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-foreground">{transaction.desc}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={transaction.status === "Approved" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {transaction.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{transaction.confidence}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">98.2%</div>
                      <div className="text-xs text-muted-foreground">Classification Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">85%</div>
                      <div className="text-xs text-muted-foreground">Faster Close Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-chart-3">70%</div>
                      <div className="text-xs text-muted-foreground">Less Manual Work</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-full"></div>
          </div>
        </div>

        {/* Social Proof Strip */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-8">Trusted by finance teams at high-growth companies</p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            {["TechCorp", "GrowthCo", "ScaleUp", "InnovateLtd", "FutureInc", "NextGen"].map((company) => (
              <div key={company} className="text-lg font-semibold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
