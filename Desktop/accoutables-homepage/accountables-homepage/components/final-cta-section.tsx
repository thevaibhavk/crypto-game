import { Button } from "@/components/ui/button"

export function FinalCTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-foreground">Ready to automate your month-end?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get audit-ready financials in days, not weeks. Start your free trial today and see why finance teams love
              Accountables.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary text-white border-0 text-lg px-8 py-4">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent">
              Book a Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <span>✓ No credit card required</span>
            <span>✓ 14-day free trial</span>
            <span>✓ Setup in 24 hours</span>
          </div>
        </div>
      </div>
    </section>
  )
}
