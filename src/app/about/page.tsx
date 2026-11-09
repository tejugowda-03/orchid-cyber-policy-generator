import { Shield, Target, Users, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrchidBackground from "@/components/OrchidBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      <OrchidBackground />
      <Navbar />
      
      <main className="relative min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">About CyberPolicy AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering organizations with AI-powered cybersecurity policy generation
            </p>
          </div>

          {/* Mission */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                At CyberPolicy AI, we believe that every organization deserves access to 
                comprehensive, compliant cybersecurity policies without the traditional 
                barriers of time, cost, and complexity.
              </p>
              <p>
                Our mission is to democratize cybersecurity compliance by leveraging 
                artificial intelligence to generate tailored policies that meet industry 
                standards and regulatory requirements in minutes, not weeks.
              </p>
            </CardContent>
          </Card>

          {/* What We Do */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                What We Do
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                CyberPolicy AI is an advanced platform that combines artificial intelligence 
                with deep cybersecurity expertise to generate customized security policies 
                for organizations of all sizes.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Generate comprehensive security policies in minutes</li>
                <li>Support for 10+ compliance frameworks (HIPAA, SOC2, PCI-DSS, GDPR, and more)</li>
                <li>Customizable templates tailored to your industry and requirements</li>
                <li>Easy editing, exporting, and version control</li>
                <li>Continuous updates to reflect the latest security standards</li>
              </ul>
            </CardContent>
          </Card>

          {/* Our Values */}
          <Card className="glassmorphism border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Security First",
                    description: "We prioritize the security and privacy of your data above all else.",
                  },
                  {
                    title: "Innovation",
                    description: "We continuously improve our AI to deliver the best results.",
                  },
                  {
                    title: "Accessibility",
                    description: "We make enterprise-grade security accessible to all organizations.",
                  },
                  {
                    title: "Compliance",
                    description: "We stay current with evolving regulations and standards.",
                  },
                ].map((value) => (
                  <div key={value.title} className="space-y-2">
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="glassmorphism border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Our team consists of cybersecurity experts, AI engineers, and compliance 
                specialists who are passionate about making security accessible. Together, 
                we bring decades of combined experience in information security, regulatory 
                compliance, and machine learning to deliver a platform that truly understands 
                your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
