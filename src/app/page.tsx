"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import OrchidBackground from "@/components/OrchidBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolicyForm from "@/components/PolicyForm";
import PolicyResults from "@/components/PolicyResults";
import { Shield, Sparkles, Lock, FileCheck, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  organizationName: string;
  industry: string;
  complianceFrameworks: string[];
  securityLevel: string;
  employeeCount: string;
  dataTypes: string[];
  existingPolicies: boolean;
  specificRequirements: string;
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [generatedPolicy, setGeneratedPolicy] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { toast } = useToast();

  const handleGenerate = useCallback(async (data: FormData) => {
    setIsGenerating(true);
    setFormData(data);

    try {
      // Generate policy with AI
      const aiResponse = await fetch("/api/generate-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!aiResponse.ok) {
        throw new Error("Failed to generate policy");
      }

      const aiData = await aiResponse.json();
      const policy = aiData.policy;

      // Save to database
      const dbResponse = await fetch("/api/policies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          generatedPolicy: policy,
        }),
      });

      if (!dbResponse.ok) {
        throw new Error("Failed to save policy");
      }

      const savedPolicy = await dbResponse.json();

      // Create history entry
      await fetch(`/api/policies/${savedPolicy.id}/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "created",
        }),
      });

      setGeneratedPolicy(policy);
      
      toast({
        title: "Policy Generated!",
        description: "Your cybersecurity policy has been created successfully.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate policy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  const handleSaveEdit = useCallback(async (editedPolicy: string) => {
    if (!formData) return;

    try {
      // Find the most recent policy for this organization
      const response = await fetch("/api/policies");
      const policies = await response.json();
      const policy = policies[0]; // Most recent

      if (policy) {
        // Update the policy
        await fetch(`/api/policies/${policy.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            generatedPolicy: editedPolicy,
          }),
        });

        // Create history entry
        await fetch(`/api/policies/${policy.id}/history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "edited",
            modifiedContent: editedPolicy,
          }),
        });

        setGeneratedPolicy(editedPolicy);
        
        toast({
          title: "Policy Updated!",
          description: "Your changes have been saved.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  }, [formData, toast]);

  const handleStartNew = useCallback(() => {
    setGeneratedPolicy(null);
    setShowForm(true);
  }, []);

  return (
    <>
      <OrchidBackground />
      <Navbar />
      
      <main className="relative min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {!showForm && !generatedPolicy ? (
            // Hero Section
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto"
            >
              {/* Hero Content */}
              <div className="text-center mb-16">
                <div className="inline-block mb-6">
                  <Shield className="w-20 h-20 text-primary" />
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="text-gradient">AI-Powered</span>
                  <br />
                  Cybersecurity Policies
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Generate comprehensive, compliant security policies tailored to your organization in minutes
                </p>

                <Button
                  size="lg"
                  onClick={() => setShowForm(true)}
                  className="gradient-orchid text-lg px-8 py-6 gap-3"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate Your Policy
                </Button>
              </div>

              {/* Features Grid */}
              <div id="features" className="grid md:grid-cols-3 gap-6 mb-16 scroll-mt-24">
                {[
                  {
                    icon: Zap,
                    title: "Lightning Fast",
                    description: "Generate comprehensive policies in minutes, not weeks",
                  },
                  {
                    icon: Lock,
                    title: "Compliance Ready",
                    description: "HIPAA, SOC2, PCI-DSS, GDPR, and more frameworks supported",
                  },
                  {
                    icon: FileCheck,
                    title: "Customizable",
                    description: "Edit, download, and adapt policies to your specific needs",
                  },
                ].map((feature) => (
                  <Card key={feature.title} className="glassmorphism border-primary/20 h-full hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <feature.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Stats */}
              <div className="glassmorphism rounded-xl p-8 border-primary/20">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                    { value: "10+", label: "Compliance Frameworks" },
                    { value: "50+", label: "Security Controls" },
                    { value: "100%", label: "Customizable" },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <div className="text-4xl md:text-5xl font-bold text-gradient">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Section */}
              <div id="pricing" className="mt-16 scroll-mt-24">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">
                    <span className="text-gradient">Simple, Transparent Pricing</span>
                  </h3>
                  <p className="text-xl text-muted-foreground">
                    Get started with AI-powered policy generation today
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Starter",
                      price: "Free",
                      description: "Perfect for trying out our platform",
                      features: ["5 policy generations", "Basic templates", "PDF export", "Email support"],
                    },
                    {
                      name: "Professional",
                      price: "$49/mo",
                      description: "For growing organizations",
                      features: ["Unlimited policies", "All compliance frameworks", "Advanced customization", "Priority support", "Team collaboration"],
                      featured: true,
                    },
                    {
                      name: "Enterprise",
                      price: "Custom",
                      description: "For large organizations",
                      features: ["Everything in Pro", "Custom frameworks", "Dedicated support", "API access", "SLA guarantee"],
                    },
                  ].map((plan) => (
                    <Card key={plan.name} className={`glassmorphism h-full ${plan.featured ? 'border-primary/60 shadow-lg shadow-primary/20' : 'border-primary/20'}`}>
                      <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="text-3xl font-bold text-gradient mt-4">
                          {plan.price}
                        </div>
                        <CardDescription className="text-base mt-2">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <FileCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className={`w-full mt-6 ${plan.featured ? 'gradient-orchid' : ''}`}
                          variant={plan.featured ? 'default' : 'outline'}
                          onClick={() => setShowForm(true)}
                        >
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
                  <Globe className="w-6 h-6 text-primary" />
                  Trusted Across Industries
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Healthcare", "Finance", "Technology", "Retail", "Education", "Manufacturing"].map(
                    (industry) => (
                      <div
                        key={industry}
                        className="px-6 py-3 rounded-full glassmorphism border border-primary/20 text-sm font-medium"
                      >
                        {industry}
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ) : showForm && !generatedPolicy ? (
            // Form Section
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-gradient">Create Your Policy</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Answer a few questions to generate your custom cybersecurity policy
                </p>
              </motion.div>

              <PolicyForm onGenerate={handleGenerate} isGenerating={isGenerating} />
            </div>
          ) : (
            // Results Section
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-bold text-gradient"
                >
                  Your Policy is Ready!
                </motion.h2>
                <Button
                  onClick={handleStartNew}
                  variant="outline"
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Create New Policy
                </Button>
              </div>

              {generatedPolicy && formData && (
                <PolicyResults
                  policy={generatedPolicy}
                  organizationName={formData.organizationName}
                  onSave={handleSaveEdit}
                />
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}