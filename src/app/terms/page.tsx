import { FileText, Scale, AlertCircle, Ban, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrchidBackground from "@/components/OrchidBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <>
      <OrchidBackground />
      <Navbar />
      
      <main className="relative min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Terms of Service</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: December 4, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardContent className="pt-6 text-muted-foreground space-y-4">
              <p>
                Welcome to CyberPolicy AI. By accessing or using our service, you agree to be 
                bound by these Terms of Service. Please read them carefully.
              </p>
            </CardContent>
          </Card>

          {/* Acceptance */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                By creating an account or using CyberPolicy AI, you acknowledge that you have 
                read, understood, and agree to be bound by these Terms of Service and our Privacy 
                Policy. If you do not agree to these terms, please do not use our service.
              </p>
            </CardContent>
          </Card>

          {/* Use of Service */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Use of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Permitted Use</h3>
                <p>You may use CyberPolicy AI to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Generate cybersecurity policies for legitimate business purposes</li>
                  <li>Customize and download generated policies</li>
                  <li>Store and manage your policy history</li>
                  <li>Access compliance framework templates</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Account Responsibility</h3>
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Providing accurate and complete information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Ban className="w-6 h-6 text-primary" />
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p className="mb-4">You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Reverse engineer, decompile, or disassemble the platform</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Use automated means to access the service without permission</li>
                <li>Resell or redistribute generated policies as your own service</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Our IP</h3>
                <p>
                  The CyberPolicy AI platform, including all software, design, text, graphics, 
                  and other content, is owned by us and protected by intellectual property laws. 
                  You may not copy, modify, or distribute our platform without permission.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Your Content</h3>
                <p>
                  You retain ownership of the information you provide and the policies you 
                  generate. By using our service, you grant us a limited license to use your 
                  content to provide and improve our services.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Generated Policies</h3>
                <p>
                  Policies generated by our AI are provided for your use. However, you are 
                  responsible for reviewing, customizing, and ensuring they meet your specific 
                  legal and compliance requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                CyberPolicy AI is provided "as is" without warranties of any kind, either 
                express or implied. We do not guarantee that:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>The service will be uninterrupted or error-free</li>
                <li>Generated policies will meet all your legal requirements</li>
                <li>The service will be compatible with all systems</li>
                <li>All errors will be corrected</li>
              </ul>
              <p className="mt-4">
                <strong>Important:</strong> Generated policies are AI-assisted templates. You 
                should consult with legal and compliance professionals before implementing any 
                policy in your organization.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                To the maximum extent permitted by law, CyberPolicy AI shall not be liable for 
                any indirect, incidental, special, consequential, or punitive damages arising 
                from your use of the service.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Termination</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                We reserve the right to suspend or terminate your account at any time for 
                violation of these Terms of Service. You may also terminate your account at 
                any time by contacting us.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                We may update these Terms of Service from time to time. We will notify you of 
                any material changes by posting the new terms on this page and updating the 
                "Last updated" date.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4 font-medium text-foreground">
                legal@cyberpolicyai.com
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
