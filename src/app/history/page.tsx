"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import OrchidBackground from "@/components/OrchidBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  History, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  Building2,
  Shield,
  Eye,
  Trash2,
  AlertCircle,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

interface Policy {
  id: number;
  organizationName: string;
  industry: string;
  complianceFrameworks: string[];
  securityLevel: string;
  employeeCount: string;
  dataTypes: string[];
  existingPolicies: boolean;
  specificRequirements: string | null;
  generatedPolicy: string;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [securityFilter, setSecurityFilter] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState<number | null>(null);
  const { toast } = useToast();

  // Initial fetch only
  useEffect(() => {
    fetchPolicies();
  }, []);

  // Client-side filtering for better performance
  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const matchesSearch = !searchTerm || 
        policy.organizationName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = !industryFilter || 
        industryFilter === "all" || 
        policy.industry === industryFilter;
      
      const matchesSecurity = !securityFilter || 
        securityFilter === "all" || 
        policy.securityLevel === securityFilter;

      return matchesSearch && matchesIndustry && matchesSecurity;
    });
  }, [policies, searchTerm, industryFilter, securityFilter]);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/policies");
      if (!response.ok) throw new Error("Failed to fetch policies");

      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to load policy history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (policy: Policy) => {
    setSelectedPolicy(policy);
    setViewDialogOpen(true);
  };

  const handleDownloadPDF = (policy: Policy) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(`Cybersecurity Policy - ${policy.organizationName}`, margin, yPosition);
      yPosition += 15;

      // Date
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date(policy.createdAt).toLocaleDateString()}`, margin, yPosition);
      yPosition += 10;

      // Content
      const lines = doc.splitTextToSize(policy.generatedPolicy, maxWidth);
      
      doc.setFontSize(11);
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 7;
      });

      doc.save(`${policy.organizationName.replace(/\s+/g, "_")}_Policy_${policy.id}.pdf`);

      // Log download action
      fetch(`/api/policies/${policy.id}/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "downloaded" }),
      }).catch(err => console.error("Failed to log download:", err));

      toast({
        title: "Downloaded",
        description: "Policy has been downloaded as PDF",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: number) => {
    setPolicyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!policyToDelete) return;

    try {
      const response = await fetch(`/api/policies/${policyToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete policy");

      setPolicies(policies.filter((p) => p.id !== policyToDelete));
      
      toast({
        title: "Deleted",
        description: "Policy has been deleted successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to delete policy",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPolicyToDelete(null);
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case "basic":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <>
      <OrchidBackground />
      <Navbar />

      <main className="relative min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <History className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-gradient">
                Policy History
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              View, manage, and download your generated cybersecurity policies
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="glassmorphism rounded-xl p-6 mb-8"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <SelectValue placeholder="All Industries" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={securityFilter} onValueChange={setSecurityFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <SelectValue placeholder="All Security Levels" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Security Levels</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Policies List */}
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="glassmorphism">
                  <CardHeader>
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-96" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPolicies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glassmorphism rounded-xl p-12 text-center"
            >
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No Policies Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || industryFilter || securityFilter
                  ? "Try adjusting your filters"
                  : "Generate your first policy to get started"}
              </p>
              <Button asChild className="gradient-orchid">
                <a href="/">Generate Policy</a>
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredPolicies.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
                >
                  <Card className="glassmorphism border-primary/20 hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <FileText className="w-6 h-6 text-primary" />
                            <CardTitle className="text-2xl">{policy.organizationName}</CardTitle>
                          </div>
                          <CardDescription className="text-base">
                            {policy.industry} • {policy.employeeCount} employees
                          </CardDescription>
                        </div>
                        
                        <Badge
                          variant="outline"
                          className={`${getSecurityLevelColor(policy.securityLevel)} capitalize`}
                        >
                          {policy.securityLevel}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(policy.complianceFrameworks) 
                            ? policy.complianceFrameworks.map((framework) => (
                                <Badge key={framework} variant="secondary" className="text-xs">
                                  {framework}
                                </Badge>
                              ))
                            : typeof policy.complianceFrameworks === 'string' && 
                              JSON.parse(policy.complianceFrameworks).map((framework: string) => (
                                <Badge key={framework} variant="secondary" className="text-xs">
                                  {framework}
                                </Badge>
                              ))
                          }
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Created: {new Date(policy.createdAt).toLocaleDateString()}
                          </div>
                          {policy.updatedAt !== policy.createdAt && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Updated: {new Date(policy.updatedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPDF(policy)}
                            className="gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(policy)}
                            className="gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(policy.id)}
                            className="gap-2 ml-auto text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto glassmorphism">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              {selectedPolicy?.organizationName} - Cybersecurity Policy
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedPolicy && (
                <div className="flex flex-wrap gap-4 mt-2">
                  <span>{selectedPolicy.industry}</span>
                  <span>•</span>
                  <span>{selectedPolicy.employeeCount} employees</span>
                  <span>•</span>
                  <span className="capitalize">{selectedPolicy.securityLevel} Security</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPolicy && (
            <div className="space-y-6 mt-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Compliance Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(selectedPolicy.complianceFrameworks) 
                    ? selectedPolicy.complianceFrameworks 
                    : JSON.parse(selectedPolicy.complianceFrameworks as string)
                  ).map((framework: string) => (
                    <Badge key={framework} variant="secondary">
                      {framework}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedPolicy.dataTypes && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">Data Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selectedPolicy.dataTypes) 
                      ? selectedPolicy.dataTypes 
                      : JSON.parse(selectedPolicy.dataTypes as string)
                    ).map((type: string) => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Policy Document</h3>
                <div className="bg-muted/30 rounded-lg p-6 whitespace-pre-wrap text-sm leading-relaxed border border-border">
                  {selectedPolicy.generatedPolicy}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button
                  onClick={() => handleDownloadPDF(selectedPolicy)}
                  className="gap-2 gradient-orchid"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setViewDialogOpen(false)}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="glassmorphism">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              Delete Policy
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this policy? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}