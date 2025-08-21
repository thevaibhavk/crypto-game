import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How accurate is the AI classification?",
      answer:
        "Our AI achieves 98%+ accuracy on transaction classification. The system learns from your specific business patterns and improves over time. For transactions with lower confidence scores, we flag them for human review to maintain accuracy.",
    },
    {
      question: "How long does onboarding take?",
      answer:
        "Most customers are up and running within 24-48 hours. Our team handles the technical setup while you connect your accounts. We provide dedicated onboarding support to ensure a smooth transition.",
    },
    {
      question: "How do you ensure my financial data is secure?",
      answer:
        "We use bank-level security with SOC 2 Type II compliance, end-to-end encryption, and regular security audits. Your data is encrypted both in transit and at rest, and we never store your banking credentials.",
    },
    {
      question: "Does Accountables replace my existing ERP/accounting software?",
      answer:
        "No, Accountables integrates with your existing systems like QuickBooks, Xero, or NetSuite. We enhance your current workflow by automating the manual tasks while keeping your established processes intact.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide email support for all plans, priority support for Growth customers, and dedicated success managers for Enterprise clients. Our team includes CPAs and finance professionals who understand your challenges.",
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about Accountables</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-background border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
