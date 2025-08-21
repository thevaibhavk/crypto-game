import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small finance teams getting started",
      features: ["Up to 1,000 transactions/month", "AI-powered classification", "Basic reporting", "Email support"],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Growth",
      price: "$299",
      period: "/month",
      description: "For growing companies with complex needs",
      features: [
        "Up to 10,000 transactions/month",
        "Advanced reconciliation",
        "Custom reporting",
        "Priority support",
        "API access",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with specific requirements",
      features: [
        "Unlimited transactions",
        "Custom integrations",
        "Dedicated success manager",
        "SLA guarantee",
        "Advanced security features",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">A plan for every stage of growth</h2>
          <p className="text-xl text-muted-foreground">
            Start free, scale as you grow. No hidden fees or surprise charges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`p-8 relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-white">
                  Most Popular
                </Badge>
              )}

              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "gradient-primary text-white border-0" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="gradient-primary text-white border-0">
            View Full Pricing & Features
          </Button>
        </div>
      </div>
    </section>
  )
}
