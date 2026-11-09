import { db } from '@/db';
import { policyGeneration } from '@/db/schema';

async function main() {
    const samplePolicies = [
        {
            organizationName: 'MedCare Health Systems',
            industry: 'Healthcare',
            complianceFrameworks: JSON.stringify(['HIPAA', 'HITECH']),
            securityLevel: 'advanced',
            employeeCount: '500-1000',
            dataTypes: JSON.stringify(['Patient Health Records', 'Personal Identifiable Information', 'Payment Card Data']),
            existingPolicies: true,
            specificRequirements: 'Need to address telemedicine security and mobile device management for healthcare workers',
            generatedPolicy: '# Comprehensive Cybersecurity Policy for MedCare Health Systems\n\n## 1. Purpose and Scope\nThis policy establishes security standards for protecting electronic Protected Health Information (ePHI) in compliance with HIPAA and HITECH Act requirements...\n\n## 2. Access Control\n- Multi-factor authentication required for all systems accessing ePHI\n- Role-based access control (RBAC) implementation\n- Regular access reviews quarterly\n\n## 3. Data Encryption\n- AES-256 encryption for data at rest\n- TLS 1.3 for data in transit\n- End-to-end encryption for telemedicine communications\n\n## 4. Incident Response\n- Breach notification within 60 days as per HIPAA\n- Dedicated incident response team\n- Regular tabletop exercises\n\n## 5. Mobile Device Security\n- MDM solution required for all devices accessing ePHI\n- Remote wipe capability\n- Encrypted storage mandatory',
            createdAt: new Date('2024-01-15T10:30:00.000Z').toISOString(),
            updatedAt: new Date('2024-01-15T10:30:00.000Z').toISOString(),
        },
        {
            organizationName: 'SecureBank Financial',
            industry: 'Finance',
            complianceFrameworks: JSON.stringify(['SOC2', 'PCI-DSS', 'GLBA']),
            securityLevel: 'advanced',
            employeeCount: '1000-5000',
            dataTypes: JSON.stringify(['Financial Records', 'Payment Card Data', 'Personal Identifiable Information', 'Transaction Data']),
            existingPolicies: true,
            specificRequirements: 'Focus on API security, third-party vendor management, and real-time fraud detection',
            generatedPolicy: '# Cybersecurity Policy - SecureBank Financial\n\n## 1. Executive Summary\nThis comprehensive security policy addresses SOC2 Type II, PCI-DSS v4.0, and GLBA compliance requirements for financial services operations...\n\n## 2. Network Security\n- Network segmentation with DMZ architecture\n- Next-generation firewall with IPS/IDS\n- Zero-trust network architecture\n\n## 3. Payment Card Security\n- PCI-DSS Level 1 compliance maintained\n- Tokenization of card data\n- P2PE for card-present transactions\n\n## 4. Third-Party Risk Management\n- Annual vendor security assessments\n- Contractual security requirements\n- Continuous monitoring of vendor access\n\n## 5. API Security\n- OAuth 2.0 and JWT authentication\n- Rate limiting and throttling\n- API gateway with WAF protection',
            createdAt: new Date('2024-01-18T14:20:00.000Z').toISOString(),
            updatedAt: new Date('2024-01-20T09:15:00.000Z').toISOString(),
        },
        {
            organizationName: 'InnovateTech Solutions',
            industry: 'Technology',
            complianceFrameworks: JSON.stringify(['SOC2']),
            securityLevel: 'intermediate',
            employeeCount: '50-100',
            dataTypes: JSON.stringify(['Customer Data', 'Application Logs', 'Business Intelligence']),
            existingPolicies: false,
            specificRequirements: 'Cloud-native architecture on AWS, need DevSecOps integration',
            generatedPolicy: '# InnovateTech Solutions - Information Security Policy\n\n## 1. Introduction\nThis policy establishes baseline security controls for our cloud-native SaaS platform in pursuit of SOC2 Type II certification...\n\n## 2. Cloud Security\n- AWS Well-Architected Framework compliance\n- Infrastructure as Code (Terraform) with security scanning\n- CloudTrail logging enabled for all accounts\n\n## 3. Application Security\n- SAST/DAST in CI/CD pipeline\n- Container image scanning\n- Dependency vulnerability management\n\n## 4. Access Management\n- SSO with MFA for all employees\n- Principle of least privilege\n- Just-in-time access for production systems\n\n## 5. Data Protection\n- Encryption at rest using AWS KMS\n- TLS 1.3 for all communications\n- Regular automated backups with encryption',
            createdAt: new Date('2024-01-22T11:45:00.000Z').toISOString(),
            updatedAt: new Date('2024-01-22T11:45:00.000Z').toISOString(),
        },
        {
            organizationName: 'GlobalRetail Corp',
            industry: 'Retail',
            complianceFrameworks: JSON.stringify(['PCI-DSS']),
            securityLevel: 'intermediate',
            employeeCount: '5000-10000',
            dataTypes: JSON.stringify(['Payment Card Data', 'Customer Information', 'Inventory Data']),
            existingPolicies: true,
            specificRequirements: 'Multi-location retail with e-commerce platform, need point-of-sale security guidelines',
            generatedPolicy: '# GlobalRetail Corp - Cybersecurity and PCI-DSS Compliance Policy\n\n## 1. Scope\nThis policy covers all systems that store, process, or transmit cardholder data across 200+ retail locations and our e-commerce platform...\n\n## 2. Cardholder Data Environment\n- Network segmentation isolating POS systems\n- Quarterly vulnerability scanning\n- Annual penetration testing\n\n## 3. Point-of-Sale Security\n- EMV chip card readers at all locations\n- Point-to-point encryption (P2PE)\n- Tamper-evident seals on payment terminals\n\n## 4. E-Commerce Security\n- Payment gateway integration (no card storage)\n- Web application firewall (WAF)\n- Regular security updates and patching\n\n## 5. Employee Training\n- Annual PCI awareness training\n- Social engineering awareness\n- Incident reporting procedures',
            createdAt: new Date('2024-02-01T08:30:00.000Z').toISOString(),
            updatedAt: new Date('2024-02-03T16:20:00.000Z').toISOString(),
        },
        {
            organizationName: 'State University',
            industry: 'Education',
            complianceFrameworks: JSON.stringify(['FERPA']),
            securityLevel: 'basic',
            employeeCount: '1000-5000',
            dataTypes: JSON.stringify(['Student Records', 'Research Data', 'Personal Identifiable Information']),
            existingPolicies: false,
            specificRequirements: 'Need to protect student educational records and research data, support BYOD environment',
            generatedPolicy: '# State University - Information Security Policy\n\n## 1. Purpose\nProtect student educational records in compliance with FERPA while supporting an open academic environment...\n\n## 2. Data Classification\n- Public: General university information\n- Internal: Business operations data\n- Confidential: Student records (FERPA protected)\n- Restricted: Research data with contractual obligations\n\n## 3. Access Control\n- Single sign-on for university systems\n- MFA for administrative access\n- Annual access recertification\n\n## 4. BYOD Security\n- VPN required for network access\n- Antivirus/antimalware required\n- Acceptable use policy acknowledgment\n\n## 5. Research Data Protection\n- Data encryption for sensitive research\n- Secure file sharing solutions\n- Export control compliance for international research',
            createdAt: new Date('2024-02-05T13:10:00.000Z').toISOString(),
            updatedAt: new Date('2024-02-05T13:10:00.000Z').toISOString(),
        },
        {
            organizationName: 'CityHealth Medical Group',
            industry: 'Healthcare',
            complianceFrameworks: JSON.stringify(['HIPAA', 'GDPR']),
            securityLevel: 'advanced',
            employeeCount: '100-500',
            dataTypes: JSON.stringify(['Patient Health Records', 'Personal Identifiable Information', 'Genetic Data']),
            existingPolicies: true,
            specificRequirements: 'International patients requiring GDPR compliance, genetic testing data protection',
            generatedPolicy: '# CityHealth Medical Group - Healthcare Information Security Policy\n\n## 1. Regulatory Compliance\nThis policy addresses HIPAA Privacy and Security Rules and GDPR requirements for international patient data...\n\n## 2. Patient Data Protection\n- Encryption of ePHI using AES-256\n- Audit logging for all ePHI access\n- Data minimization principles (GDPR)\n\n## 3. Genetic Data Security\n- Enhanced access controls for genetic information\n- Explicit consent management\n- Separate storage with additional encryption\n\n## 4. International Data Transfers\n- Standard Contractual Clauses for EU patients\n- Data Processing Agreements with vendors\n- Right to erasure procedures\n\n## 5. Breach Response\n- HIPAA breach notification (60 days)\n- GDPR breach notification (72 hours)\n- Patient notification procedures',
            createdAt: new Date('2024-02-10T09:25:00.000Z').toISOString(),
            updatedAt: new Date('2024-02-12T14:30:00.000Z').toISOString(),
        },
        {
            organizationName: 'CloudSoft Technologies',
            industry: 'Technology',
            complianceFrameworks: JSON.stringify(['SOC2', 'ISO27001', 'GDPR']),
            securityLevel: 'advanced',
            employeeCount: '100-500',
            dataTypes: JSON.stringify(['Customer Data', 'Application Data', 'Personal Identifiable Information', 'Business Intelligence']),
            existingPolicies: true,
            specificRequirements: 'Multi-tenant SaaS platform, need data residency controls and customer security requirements',
            generatedPolicy: '# CloudSoft Technologies - Enterprise Security Policy\n\n## 1. Overview\nComprehensive security program aligned with SOC2 Type II, ISO 27001, and GDPR for our multi-tenant SaaS platform...\n\n## 2. Multi-Tenant Security\n- Logical data separation per tenant\n- Customer-managed encryption keys (CMEK)\n- Tenant isolation testing\n\n## 3. Data Residency\n- Regional data centers (US, EU, APAC)\n- Customer choice of data location\n- No cross-border transfers without consent\n\n## 4. Security Operations\n- 24/7 SOC monitoring\n- SIEM with automated alerting\n- Quarterly red team exercises\n\n## 5. Compliance Management\n- Annual ISO 27001 audits\n- SOC2 Type II reports\n- GDPR DPO and privacy by design\n\n## 6. Customer Security Controls\n- SSO/SAML integration\n- Customer audit logs\n- API security tokens with rotation',
            createdAt: new Date('2024-02-14T10:00:00.000Z').toISOString(),
            updatedAt: new Date('2024-02-15T11:45:00.000Z').toISOString(),
        },
        {
            organizationName: 'Industrial Manufacturing Inc',
            industry: 'Manufacturing',
            complianceFrameworks: JSON.stringify(['NIST CSF']),
            securityLevel: 'intermediate',
            employeeCount: '500-1000',
            dataTypes: JSON.stringify(['Intellectual Property', 'Supply Chain Data', 'Employee Records', 'IoT Sensor Data']),
            existingPolicies: false,
            specificRequirements: 'Need OT/IT security convergence, protect manufacturing systems and intellectual property',
            generatedPolicy: '# Industrial Manufacturing Inc - Cybersecurity Framework Policy\n\n## 1. Framework Alignment\nSecurity controls based on NIST Cybersecurity Framework addressing IT and OT environments...\n\n## 2. OT/IT Convergence\n- Network segmentation between IT and OT networks\n- Purdue Model implementation\n- Secure remote access for OT systems\n\n## 3. Intellectual Property Protection\n- Data Loss Prevention (DLP) solution\n- Classification and labeling of sensitive documents\n- Restricted access to design files and trade secrets\n\n## 4. Supply Chain Security\n- Vendor security assessments\n- Secure B2B communication channels\n- Third-party access monitoring\n\n## 5. IoT and ICS Security\n- Asset inventory of all connected devices\n- Network anomaly detection\n- Patch management for industrial systems\n\n## 6. Incident Response\n- Separate IR procedures for IT and OT incidents\n- Coordination with industrial control system vendors\n- Business continuity planning for production systems',
            createdAt: new Date('2024-02-18T15:30:00.000Z').toISOString(),
            updatedAt: new Date('2024-02-18T15:30:00.000Z').toISOString(),
        },
    ];

    await db.insert(policyGeneration).values(samplePolicies);
    
    console.log('✅ Policy generation seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});