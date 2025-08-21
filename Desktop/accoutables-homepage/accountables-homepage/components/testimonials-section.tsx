import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Accountables took our close from 10 days to 2. It's the first thing our auditors ask for.",
      name: "Sarah Chen",
      title: "CFO",
      company: "TechScale Inc",
      metric: "90% Time Saved",
      avatar: "/professional-woman-diverse.png",
    },
    {
      quote: "The AI classification is incredibly accurate. We've reduced manual coding errors by 95%.",
      name: "Michael Rodriguez",
      title: "Controller",
      company: "GrowthCorp",
      metric: "95% Error Reduction",
      avatar: "/professional-man.png",
    },
    {
      quote: "Finally, a finance tool that actually saves time instead of creating more work.",
      name: "Emily Johnson",
      title: "VP Finance",
      company: "InnovateLtd",
      metric: "3-Day Close",
      avatar: "/professional-woman-executive.png",
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Built for the Modern Finance Stack</h2>
          <p className="text-xl text-muted-foreground">
            See how finance teams are transforming their operations with Accountables
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-lg text-foreground leading-relaxed">"{testimonial.quote}"</blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>

                <Badge className="gradient-accent text-accent-foreground">{testimonial.metric}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
