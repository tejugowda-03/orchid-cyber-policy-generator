import { Shield, Lock, Eye, Database, FileCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrchidBackground from "@/components/OrchidBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <>
      <OrchidBackground />
      <Navbar />
      
      <main className="relative min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Privacy Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: December 4, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardContent className="pt-6 text-muted-foreground space-y-4">
              <p>
                At CyberPolicy AI, we take your privacy seriously. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information 
                when you use our service.
              </p>
            </CardContent>
          </Card>

          {/* Information Collection */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Database className="w-6 h-6 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <p>
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Organization name and industry</li>
                  <li>Contact information (email address)</li>
                  <li>Compliance and security requirements</li>
                  <li>Policy customization preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                <p>
                  We automatically collect certain information about your use of our service:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Log data and analytics</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Generate customized cybersecurity policies</li>
                <li>Provide, maintain, and improve our services</li>
                <li>Communicate with you about your account and our services</li>
                <li>Analyze usage patterns and optimize user experience</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                We implement appropriate technical and organizational measures to protect 
                your personal information against unauthorized access, alteration, disclosure, 
                or destruction.
              </p>
              <p>
                Our security measures include:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure infrastructure and hosting</li>
                <li>Employee training on data protection</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                We do not sell your personal information. We may share your information only in 
                the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                If you have questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <p className="mt-4 font-medium text-foreground">
                privacy@cyberpolicyai.com
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
