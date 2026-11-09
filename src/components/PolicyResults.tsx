"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Edit, Save, X, FileText, Check } from "lucide-react";
import { jsPDF } from "jspdf";

interface PolicyResultsProps {
  policy: string;
  organizationName: string;
  onSave: (policy: string) => void;
}

export default function PolicyResults({ policy, organizationName, onSave }: PolicyResultsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPolicy, setEditedPolicy] = useState(policy);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(isEditing ? editedPolicy : policy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`Cybersecurity Policy - ${organizationName}`, margin, yPosition);
    yPosition += 15;

    // Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 10;

    // Content
    const content = isEditing ? editedPolicy : policy;
    const lines = doc.splitTextToSize(content, maxWidth);
    
    doc.setFontSize(11);
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });

    doc.save(`${organizationName.replace(/\s+/g, "_")}_Cybersecurity_Policy.pdf`);
  };

  const handleSave = () => {
    onSave(editedPolicy);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPolicy(policy);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto"
    >
      <Card className="glassmorphism border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <span className="text-gradient">Generated Policy</span>
              </CardTitle>
              <CardDescription className="text-base">
                Cybersecurity Policy for {organizationName}
              </CardDescription>
            </div>
            
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadPDF}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="gap-2 gradient-orchid"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {isEditing ? (
            <Textarea
              value={editedPolicy}
              onChange={(e) => setEditedPolicy(e.target.value)}
              className="min-h-[600px] font-mono text-sm"
            />
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap font-mono text-sm bg-secondary/30 rounded-lg p-6 border border-border">
                {policy}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
