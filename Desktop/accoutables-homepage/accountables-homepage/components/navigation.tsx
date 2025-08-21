"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm">
        <span className="font-medium">New: Direct NetSuite Integration is now live →</span>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Image src="/accountables-logo.png" alt="Accountables logo" width={200} height={28} priority />
              {/* <span className="text-2xl font-bold text-foreground">Accountables</span> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#product" className="text-muted-foreground hover:text-foreground transition-colors">
                  Product Tour
                </a>
                <a href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                  Solutions
                </a>
                <a href="#integrations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Integrations
                </a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
                <a href="#resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </a>
              </div>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="gradient-primary text-white border-0">
                Start Your Free Trial
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#product" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Product Tour
              </a>
              <a href="#solutions" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Solutions
              </a>
              <a href="#integrations" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Integrations
              </a>
              <a href="#pricing" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Pricing
              </a>
              <a href="#resources" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Resources
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="ghost" size="sm" className="w-full">
                  Sign In
                </Button>
                <Button size="sm" className="w-full gradient-primary text-white border-0">
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
