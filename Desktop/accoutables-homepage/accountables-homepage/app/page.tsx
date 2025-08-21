import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { FeaturesSection } from "@/components/features-section"
import { InteractiveDemo } from "@/components/interactive-demo"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SecurityIntegrationsSection } from "@/components/security-integrations-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTASection } from "@/components/final-cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <InteractiveDemo />
        <TestimonialsSection />
        <SecurityIntegrationsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
    </div>
  )
}
