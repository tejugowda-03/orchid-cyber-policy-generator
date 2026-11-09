"use client";

import Link from "next/link";
import { Shield, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openExternalLink = (url: string) => {
    // Check if we're in an iframe
    const isInIframe = window.self !== window.top;
    
    if (isInIframe) {
      // Post message to parent to open link
      window.parent.postMessage(
        { type: "OPEN_EXTERNAL_URL", data: { url } },
        "*"
      );
    } else {
      // Open directly if not in iframe
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <footer className="relative mt-20 border-t border-border/50 glassmorphism">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-gradient">CyberPolicy AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered cybersecurity policy generation for modern organizations.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection("features")}
                  className="hover:text-primary transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("pricing")}
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <Link href="/history" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <button
                onClick={() => openExternalLink("https://github.com")}
                className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </button>
              <button
                onClick={() => openExternalLink("https://twitter.com")}
                className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => openExternalLink("https://linkedin.com")}
                className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CyberPolicy AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}