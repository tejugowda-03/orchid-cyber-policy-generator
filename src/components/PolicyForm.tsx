"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles, Shield, Building2, FileText } from "lucide-react";

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

interface PolicyFormProps {
  onGenerate: (data: FormData) => void;
  isGenerating: boolean;
}

const industries = [
  "Healthcare",
  "Finance",
  "Technology",
  "Retail",
  "Education",
  "Manufacturing",
  "Government",
  "Legal",
  "Other",
];

const complianceOptions = [
  "HIPAA",
  "HITECH",
  "SOC2",
  "PCI-DSS",
  "GDPR",
  "GLBA",
  "FERPA",
  "ISO27001",
  "NIST CSF",
  "CCPA",
];

const dataTypeOptions = [
  "Patient Health Records",
  "Payment Card Data",
  "Personal Identifiable Information",
  "Financial Records",
  "Student Records",
  "Intellectual Property",
  "Transaction Data",
  "Application Logs",
  "IoT Sensor Data",
  "Research Data",
];

const employeeRanges = [
  "1-10",
  "11-50",
  "51-100",
  "101-500",
  "501-1000",
  "1001-5000",
  "5000+",
];

export default function PolicyForm({ onGenerate, isGenerating }: PolicyFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    industry: "",
    complianceFrameworks: [],
    securityLevel: "",
    employeeCount: "",
    dataTypes: [],
    existingPolicies: false,
    specificRequirements: "",
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onGenerate(formData);
  };

  const toggleCompliance = (framework: string) => {
    setFormData((prev) => ({
      ...prev,
      complianceFrameworks: prev.complianceFrameworks.includes(framework)
        ? prev.complianceFrameworks.filter((f) => f !== framework)
        : [...prev.complianceFrameworks, framework],
    }));
  };

  const toggleDataType = (dataType: string) => {
    setFormData((prev) => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(dataType)
        ? prev.dataTypes.filter((t) => t !== dataType)
        : [...prev.dataTypes, dataType],
    }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.organizationName && formData.industry && formData.employeeCount;
      case 2:
        return formData.complianceFrameworks.length > 0;
      case 3:
        return formData.securityLevel && formData.dataTypes.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Steps */}
      <div className="glassmorphism rounded-xl p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Organization Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="orgName">Organization Name *</Label>
                  <Input
                    id="orgName"
                    placeholder="Enter your organization name"
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({ ...formData, organizationName: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="employees">Employee Count *</Label>
                  <Select
                    value={formData.employeeCount}
                    onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select employee range" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range} employees
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Compliance Requirements</h2>
              </div>

              <div>
                <Label className="mb-4 block">
                  Select all compliance frameworks that apply *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {complianceOptions.map((framework) => (
                    <div
                      key={framework}
                      className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => toggleCompliance(framework)}
                    >
                      <Checkbox
                        id={framework}
                        checked={formData.complianceFrameworks.includes(framework)}
                        onCheckedChange={() => toggleCompliance(framework)}
                      />
                      <label htmlFor={framework} className="cursor-pointer flex-1">
                        {framework}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Security Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="securityLevel">Security Level *</Label>
                  <Select
                    value={formData.securityLevel}
                    onValueChange={(value) =>
                      setFormData({ ...formData, securityLevel: value })
                    }
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select security level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic - Essential security controls</SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate - Enhanced security measures
                      </SelectItem>
                      <SelectItem value="advanced">
                        Advanced - Comprehensive security program
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-4 block">Data Types Handled *</Label>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                    {dataTypeOptions.map((dataType) => (
                      <div
                        key={dataType}
                        className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                        onClick={() => toggleDataType(dataType)}
                      >
                        <Checkbox
                          id={dataType}
                          checked={formData.dataTypes.includes(dataType)}
                          onCheckedChange={() => toggleDataType(dataType)}
                        />
                        <label htmlFor={dataType} className="cursor-pointer flex-1 text-sm">
                          {dataType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Additional Details</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-border">
                  <Checkbox
                    id="existing"
                    checked={formData.existingPolicies}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, existingPolicies: checked as boolean })
                    }
                  />
                  <label htmlFor="existing" className="cursor-pointer">
                    We have existing security policies that need updating
                  </label>
                </div>

                <div>
                  <Label htmlFor="requirements">Specific Requirements (Optional)</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Any specific security concerns or requirements you'd like addressed in the policy..."
                    value={formData.specificRequirements}
                    onChange={(e) =>
                      setFormData({ ...formData, specificRequirements: e.target.value })
                    }
                    className="mt-1.5 min-h-32"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1 || isGenerating}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {step < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || isGenerating}
              className="gap-2 gradient-orchid"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isGenerating}
              className="gap-2 gradient-orchid"
            >
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Policy
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
