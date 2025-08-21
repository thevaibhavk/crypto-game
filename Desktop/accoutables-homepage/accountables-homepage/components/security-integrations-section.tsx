import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Users } from "lucide-react"

export function SecurityIntegrationsSection() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "SOC 2 Type II",
      description: "Independently audited security controls",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your data is encrypted in transit and at rest",
    },
    {
      icon: Eye,
      title: "SSO/SAML",
      description: "Single sign-on with your existing identity provider",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Granular permissions for your team members",
    },
  ]

  const integrations = [
    "QuickBooks",
    "Xero",
    "NetSuite",
    "Plaid",
    "Stripe",
    "Slack",
    "Google Drive",
    "Microsoft 365",
    "Salesforce",
    "HubSpot",
    "Shopify",
    "Square",
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Enterprise-Grade Security. Seamless Integration.</h2>
          <p className="text-xl text-muted-foreground">
            Your data is protected with bank-level security while connecting to your entire tech stack
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Security Section */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Your data is your most critical asset</h3>
                <p className="text-muted-foreground">We protect it with industry-leading security measures</p>
              </div>

              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="outline">GDPR Compliant</Badge>
                <Badge variant="outline">CCPA Compliant</Badge>
                <Badge variant="outline">Regular Pen Testing</Badge>
              </div>
            </div>
          </Card>

          {/* Integrations Section */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Connect your entire stack</h3>
                <p className="text-muted-foreground">Seamless integrations with the tools you already use</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {integrations.map((integration, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted rounded-lg text-center text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
                  >
                    {integration}
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Don't see your tool? We're constantly adding new integrations.
                </p>
                <Badge variant="outline" className="gradient-accent text-accent-foreground border-0">
                  Request Integration
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
