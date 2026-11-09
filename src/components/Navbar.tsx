"use client";

import Link from "next/link";
import { Shield, History, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-colors" />
          </div>
          <span className="text-xl font-bold text-gradient">CyberPolicy AI</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/history" className="gap-2">
              <History className="w-4 h-4" />
              History
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
