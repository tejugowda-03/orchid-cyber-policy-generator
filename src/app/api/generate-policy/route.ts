import { NextRequest, NextResponse } from 'next/server';

// Template-based policy generator - no API key needed
function generatePolicyFromTemplate(data: {
  organizationName: string;
  industry: string;
  complianceFrameworks: string[];
  securityLevel: string;
  employeeCount: string;
  dataTypes: string[];
  existingPolicies: boolean;
  specificRequirements: string;
}): string {
  const {
    organizationName,
    industry,
    complianceFrameworks,
    securityLevel,
    employeeCount,
    dataTypes,
    existingPolicies,
    specificRequirements,
  } = data;

  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate compliance-specific requirements
  const complianceRequirements = complianceFrameworks.map(framework => {
    const requirements: Record<string, string> = {
      'ISO 27001': 'ISO/IEC 27001 information security management system standards including risk assessment, asset management, and continuous improvement processes',
      'GDPR': 'General Data Protection Regulation (GDPR) requirements including data subject rights, privacy by design, breach notification within 72 hours, and lawful basis for processing',
      'SOC 2': 'SOC 2 Trust Services Criteria focusing on security, availability, processing integrity, confidentiality, and privacy controls',
      'HIPAA': 'Health Insurance Portability and Accountability Act (HIPAA) compliance including PHI protection, administrative safeguards, physical safeguards, technical safeguards, and breach notification',
      'PCI DSS': 'Payment Card Industry Data Security Standard (PCI DSS) requirements for protecting cardholder data, maintaining secure networks, implementing strong access controls, and regular monitoring',
      'NIST': 'NIST Cybersecurity Framework including Identify, Protect, Detect, Respond, and Recover functions with risk-based approach',
      'CCPA': 'California Consumer Privacy Act (CCPA) compliance including consumer rights, data inventory, privacy notices, and opt-out mechanisms',
      'FedRAMP': 'Federal Risk and Authorization Management Program (FedRAMP) standards for cloud service providers serving U.S. government agencies',
      'FISMA': 'Federal Information Security Management Act (FISMA) requirements including categorization, security controls, continuous monitoring, and authorization',
      'CMMC': 'Cybersecurity Maturity Model Certification (CMMC) requirements for protecting Controlled Unclassified Information (CUI) in the defense industrial base',
    };
    return requirements[framework] || `${framework} compliance standards and requirements`;
  }).join('; ');

  // Industry-specific considerations
  const industryConsiderations: Record<string, string> = {
    'Healthcare': 'patient data protection, HIPAA compliance, electronic health records security, medical device security, telehealth security',
    'Finance': 'financial data protection, transaction security, fraud prevention, regulatory compliance, customer identity verification',
    'Technology': 'intellectual property protection, software development security, cloud infrastructure security, API security, DevSecOps practices',
    'Retail': 'point-of-sale security, payment card data protection, e-commerce security, supply chain security, customer data privacy',
    'Education': 'student data privacy, FERPA compliance, learning management system security, research data protection, campus network security',
    'Manufacturing': 'operational technology security, industrial control systems, supply chain security, intellectual property protection, IoT device security',
    'Government': 'classified information handling, public sector compliance, citizen data protection, critical infrastructure security',
    'Legal': 'attorney-client privilege protection, case management system security, document retention, conflict of interest management',
  };

  const industryFocus = industryConsiderations[industry] || 'industry-specific security controls and data protection measures';

  // Security level complexity
  const complexityLevel: Record<string, { controls: string; monitoring: string; training: string }> = {
    'Basic': {
      controls: 'fundamental security controls including password policies, basic access controls, and essential network security',
      monitoring: 'basic monitoring of security events and manual review of security logs',
      training: 'annual security awareness training for all employees',
    },
    'Intermediate': {
      controls: 'comprehensive security controls including multi-factor authentication, role-based access control, encryption, network segmentation, and regular vulnerability assessments',
      monitoring: 'automated security monitoring with SIEM integration, real-time alerting, and quarterly security reviews',
      training: 'mandatory quarterly security training with role-specific modules and phishing simulations',
    },
    'Advanced': {
      controls: 'enterprise-grade security controls including zero-trust architecture, advanced threat protection, security orchestration, automated response, continuous security validation, and red team exercises',
      monitoring: 'advanced threat detection with AI/ML-powered analytics, 24/7 SOC operations, continuous monitoring, and real-time threat intelligence integration',
      training: 'monthly security training with advanced threat awareness, incident response drills, and specialized training for security-sensitive roles',
    },
  };

  const securityConfig = complexityLevel[securityLevel] || complexityLevel['Intermediate'];

  // Data type handling
  const dataProtection = dataTypes.map(type => {
    const protections: Record<string, string> = {
      'PII': 'Personal Identifiable Information (PII) requiring encryption at rest and in transit, access logging, data minimization, and secure disposal',
      'Financial': 'Financial data requiring PCI DSS compliance, secure payment processing, fraud detection, and transaction monitoring',
      'Health': 'Protected Health Information (PHI) requiring HIPAA compliance, secure messaging, access controls, and audit trails',
      'Intellectual Property': 'Intellectual property requiring confidentiality agreements, DLP controls, secure collaboration tools, and classification labels',
      'Confidential Business Data': 'Confidential business data requiring classification, access restrictions, encryption, and need-to-know access',
      'Customer Data': 'Customer data requiring privacy controls, consent management, data subject rights, and breach notification procedures',
    };
    return protections[type] || `${type} requiring appropriate security controls and access restrictions`;
  }).join('; ');

  return `# CYBERSECURITY POLICY DOCUMENT

**${organizationName}**

**Effective Date:** ${date}

**Document Version:** 1.0

**Classification:** Internal Use Only

---

## EXECUTIVE SUMMARY

This Cybersecurity Policy establishes the framework for protecting ${organizationName}'s information assets, technology infrastructure, and sensitive data. As a ${industry} organization with approximately ${employeeCount} employees, we are committed to maintaining the highest standards of information security and protecting the confidentiality, integrity, and availability of our systems and data.

This policy has been developed to comply with ${complianceFrameworks.join(', ')} requirements and addresses the specific security needs of the ${industry} industry. The policy applies to all employees, contractors, vendors, and third parties who access ${organizationName}'s systems or data.

**Key Security Objectives:**
- Protect sensitive data including ${dataTypes.join(', ')}
- Maintain compliance with ${complianceFrameworks.join(', ')}
- Implement ${securityLevel.toLowerCase()} security controls appropriate to our risk profile
- Establish clear security responsibilities and accountability
- Enable secure business operations while managing cyber risk

${existingPolicies ? '**Note:** This policy supersedes and integrates existing security policies into a comprehensive framework.' : '**Note:** This policy establishes our initial comprehensive security framework.'}

${specificRequirements ? `\n**Specific Requirements Addressed:** ${specificRequirements}\n` : ''}

---

## 1. PURPOSE AND SCOPE

### 1.1 Purpose

The purpose of this Cybersecurity Policy is to:

- Establish security standards and controls to protect ${organizationName}'s information assets
- Define roles and responsibilities for information security
- Ensure compliance with applicable regulations including ${complianceRequirements}
- Provide guidance for secure technology use and data handling
- Enable detection, response, and recovery from security incidents
- Support business continuity and operational resilience

### 1.2 Scope

This policy applies to:

- **Personnel:** All employees, contractors, temporary staff, interns, and volunteers
- **Systems:** All information systems, networks, devices, and infrastructure owned, leased, or managed by ${organizationName}
- **Data:** All data owned, processed, stored, or transmitted by ${organizationName}, including ${dataTypes.join(', ')}
- **Locations:** All ${organizationName} facilities, remote work locations, and cloud environments
- **Third Parties:** All vendors, partners, and service providers with access to ${organizationName} systems or data

### 1.3 Policy Governance

- **Policy Owner:** Chief Information Security Officer (CISO) or designated security officer
- **Review Frequency:** Annual review or as required by regulatory changes
- **Approval Authority:** Executive Management and Board of Directors
- **Compliance:** Mandatory for all personnel and third parties

---

## 2. INFORMATION SECURITY GOVERNANCE

### 2.1 Security Organization

${organizationName} maintains a security governance structure appropriate for an organization with ${employeeCount} employees:

**Security Leadership:**
- Chief Information Security Officer (CISO) or Security Manager responsible for overall security program
- Security steering committee including executive representation
- Designated security champions within each department

**Roles and Responsibilities:**
- **Executive Management:** Overall accountability for security program, resource allocation, and risk acceptance
- **CISO/Security Team:** Security strategy, policy development, security operations, incident response, compliance
- **IT Department:** Technical security controls, system administration, vulnerability management, security patching
- **Department Managers:** Department-level security compliance, user access reviews, security awareness
- **All Employees:** Compliance with security policies, reporting security incidents, protecting credentials

### 2.2 Security Risk Management

${organizationName} implements a comprehensive risk management program:

- **Risk Assessments:** Conducted annually and when significant changes occur to identify, analyze, and prioritize information security risks
- **Risk Treatment:** Documented risk treatment plans with options to mitigate, transfer, accept, or avoid risks based on business impact
- **Third-Party Risk:** Vendor security assessments, contractual security requirements, and ongoing monitoring
- **Risk Monitoring:** Continuous tracking of risk indicators and regular reporting to management
- **Risk Tolerance:** Defined risk appetite aligned with business objectives and regulatory requirements

### 2.3 Compliance Requirements

${organizationName} maintains compliance with:

${complianceFrameworks.map(framework => `- **${framework}:** ${complianceRequirements.includes(framework) ? complianceRequirements.substring(complianceRequirements.indexOf(framework), complianceRequirements.indexOf(framework) + 200) : 'Applicable security and compliance requirements'}`).join('\n')}

**Compliance Activities:**
- Regular compliance assessments and gap analyses
- Internal audits and control testing
- External audits and certifications as required
- Compliance reporting and documentation
- Remediation tracking and validation

---

## 3. ACCESS CONTROL POLICY

### 3.1 User Access Management

${securityConfig.controls.includes('multi-factor') ? '**Multi-Factor Authentication (MFA):** Required for all user accounts accessing ${organizationName} systems, particularly for remote access, administrative privileges, and access to sensitive data.' : '**Authentication:** Strong password requirements enforced for all user accounts.'}

**Access Provisioning:**
- Access granted based on principle of least privilege and business need-to-know
- Formal access request and approval process with manager authorization
- New hire access provisioning within secure onboarding process
- Timely access revocation upon termination or role change (within 24 hours)
- Regular access reviews conducted quarterly to validate continued need

**Account Management:**
- Unique user accounts for all individuals (no shared accounts)
- Strong password requirements: minimum 12 characters, complexity requirements, 90-day expiration
- Account lockout after 5 failed login attempts
- Session timeout after 15 minutes of inactivity for sensitive systems
- Administrative accounts used only for administrative functions (separate from regular accounts)

### 3.2 Privileged Access Management

Elevated privileges require additional controls:

- **Administrative Access:** Limited to authorized personnel with documented business justification
- **Privileged Account Management:** Separate privileged accounts, enhanced monitoring, privileged access management (PAM) solution for ${securityLevel !== 'Basic' ? 'credential vaulting and session recording' : 'credential management'}
- **Elevated Access Reviews:** Monthly review of all privileged access
- **Emergency Access:** Break-glass procedures with full audit logging

### 3.3 Remote Access Security

Secure remote access controls for ${organizationName}'s distributed workforce:

- ${securityConfig.controls.includes('multi-factor') ? 'Multi-factor authentication mandatory for all remote access' : 'Strong authentication required for remote access'}
- VPN required for access to internal resources
- Remote access limited to approved devices meeting security requirements
- Remote access session logging and monitoring
- Automatic session termination after inactivity

### 3.4 Physical Access Control

Physical security controls appropriate for ${industry} operations:

- Badge-based access control system for facilities
- Visitor management with sign-in procedures and escort requirements
- Restricted areas for sensitive systems and data with enhanced access controls
- Security cameras and monitoring in critical areas
- Regular access reviews and badge deactivation upon termination

---

## 4. DATA CLASSIFICATION AND HANDLING

### 4.1 Data Classification

${organizationName} classifies data into the following categories:

**Public:** Information approved for public release with no confidentiality requirements

**Internal Use:** Business information for internal use only, not approved for external release

**Confidential:** Sensitive business information, ${dataTypes.join(', ')}, requiring protection from unauthorized access

**Restricted:** Highly sensitive information with strict access controls and regulatory requirements (${dataProtection})

### 4.2 Data Handling Requirements

**Confidential and Restricted Data:**

- **Storage:** ${securityConfig.controls.includes('encryption') ? 'Encrypted storage (AES-256 or equivalent) for data at rest' : 'Secure storage with appropriate access controls'}
- **Transmission:** Encrypted transmission (TLS 1.2+) for data in transit
- **Access:** Need-to-know access only with documented authorization
- **Labeling:** Clear classification labels on documents and electronic files
- **Retention:** Data retention schedules aligned with legal and business requirements
- **Disposal:** Secure disposal methods (shredding for physical, secure erasure for electronic)

### 4.3 Industry-Specific Data Protection

As a ${industry} organization, ${organizationName} implements additional controls for ${industryFocus}:

- Data minimization: Collect and retain only necessary data
- Privacy by design: Build privacy into systems and processes
- Consent management: Documented consent for data collection and processing where required
- Data subject rights: Processes for handling access, correction, deletion requests
- Cross-border transfers: Compliance with data localization and transfer requirements

### 4.4 Data Loss Prevention

Measures to prevent unauthorized data disclosure:

- Data Loss Prevention (DLP) ${securityConfig.controls.includes('advanced') ? 'solution with automated policy enforcement and blocking' : 'controls including email filtering and removable media restrictions'}
- Endpoint protection to prevent unauthorized data transfers
- Email security controls including encryption for sensitive data
- Removable media controls and encryption
- Cloud storage policy: Only approved cloud services with security review

---

## 5. NETWORK SECURITY

### 5.1 Network Architecture

${organizationName} implements ${securityLevel.toLowerCase()}-level network security controls:

- **Network Segmentation:** ${securityConfig.controls.includes('network segmentation') ? 'Logical separation of network zones based on trust levels and data sensitivity' : 'Separation of guest networks from production networks'}
- **Firewall Protection:** Next-generation firewalls at network perimeter and between security zones
- **Intrusion Prevention:** ${securityConfig.controls.includes('advanced') ? 'Advanced threat protection with IPS, malware sandboxing, and threat intelligence feeds' : 'Intrusion detection and prevention systems (IDS/IPS)'}
- **Network Access Control:** ${securityConfig.controls.includes('zero-trust') ? 'Zero-trust network access with continuous verification' : '802.1X authentication for wired and wireless networks'}
- **Wireless Security:** WPA3 encryption, separate guest network, regular security assessments

### 5.2 Security Monitoring

${securityConfig.monitoring}:

- Security Information and Event Management (SIEM) for log aggregation and correlation
- ${securityConfig.controls.includes('24/7 SOC') ? 'Security Operations Center (SOC) with 24/7 monitoring and incident response' : 'Security event monitoring during business hours'}
- Network traffic analysis and anomaly detection
- Security alerts with defined response procedures
- Log retention: 12 months online, 7 years archived

### 5.3 Vulnerability Management

Proactive security vulnerability identification and remediation:

- **Vulnerability Scanning:** ${securityConfig.controls.includes('continuous') ? 'Continuous automated vulnerability scanning of all systems' : 'Weekly vulnerability scans of internet-facing systems, monthly for internal systems'}
- **Patch Management:** Critical patches within 7 days, high-risk within 30 days, regular patch cycles for normal updates
- **Penetration Testing:** ${securityConfig.controls.includes('red team') ? 'Annual penetration testing including red team exercises' : securityLevel === 'Basic' ? 'Annual external penetration testing' : 'Quarterly external and annual internal penetration testing'}
- **Remediation Tracking:** Vulnerability remediation tracked in centralized system with defined SLAs

### 5.4 Secure Configuration

System hardening and secure configuration standards:

- CIS Benchmarks or equivalent security baselines for all systems
- Default passwords changed before production deployment
- Unnecessary services and ports disabled
- Security configuration validation before production
- Regular configuration compliance scanning

---

## 6. INCIDENT RESPONSE AND MANAGEMENT

### 6.1 Incident Response Program

${organizationName} maintains a comprehensive incident response capability:

**Incident Response Team:**
- CISO or Security Manager (Incident Commander)
- IT representatives
- Legal and compliance representatives
- Public relations/communications representative
- Business unit representatives as needed

**Incident Severity Levels:**
- **Critical:** Significant business impact, data breach, ransomware, system compromise
- **High:** Moderate business impact, suspected security compromise, policy violations
- **Medium:** Limited impact, potential security issues requiring investigation
- **Low:** Informational events, policy clarifications

### 6.2 Incident Response Procedures

**Detection and Reporting:**
- 24/7 incident reporting channels: security email, phone hotline
- All employees required to report suspected security incidents immediately
- Automated detection through security monitoring tools
- No retaliation for good-faith security reports

**Incident Response Process:**

1. **Identification:** Initial assessment, severity classification, incident commander assigned
2. **Containment:** Immediate actions to limit impact (isolate systems, disable accounts, block threats)
3. **Investigation:** Evidence collection, root cause analysis, scope determination
4. **Eradication:** Remove threats, patch vulnerabilities, validate remediation
5. **Recovery:** Restore systems, validate functionality, enhance monitoring
6. **Lessons Learned:** Post-incident review, documentation, process improvements

**Breach Notification:**
- Compliance with applicable breach notification laws (${complianceFrameworks.includes('GDPR') ? 'GDPR 72-hour notification requirement, ' : ''}${complianceFrameworks.includes('HIPAA') ? 'HIPAA breach notification requirements, ' : ''}state data breach laws)
- Notification procedures for affected individuals, regulators, law enforcement
- Communication plan coordinated with legal, compliance, and public relations

### 6.3 Evidence Handling

Forensically sound evidence collection and handling:

- Chain of custody documentation
- Forensic imaging of affected systems
- Log preservation and analysis
- Evidence stored securely with restricted access
- Coordination with law enforcement when applicable

---

## 7. BUSINESS CONTINUITY AND DISASTER RECOVERY

### 7.1 Business Continuity Planning

${organizationName} maintains business continuity capabilities to ensure operational resilience:

**Business Impact Analysis:**
- Critical business functions identified with Recovery Time Objectives (RTOs) and Recovery Point Objectives (RPOs)
- ${industry} industry-specific requirements addressed in continuity planning
- Dependencies and single points of failure documented
- Regular reassessment of business priorities

**Continuity Strategies:**
- Redundant systems for critical functions
- Alternate work locations for essential personnel
- ${securityConfig.controls.includes('Advanced') ? 'Geographically diverse data centers with real-time replication' : 'Offsite backups and recovery procedures'}
- Communication plans for staff, customers, vendors during disruptions
- Regular testing and exercises (tabletop, functional, full-scale)

### 7.2 Data Backup and Recovery

Comprehensive backup program to protect ${organizationName}'s data:

**Backup Strategy:**
- Daily incremental backups of all critical systems and data
- Weekly full backups
- ${securityConfig.controls.includes('Advanced') ? 'Continuous replication for mission-critical systems' : 'Regular backup schedules for production systems'}
- Offsite backup storage in geographically separate location or cloud
- Backup encryption (at rest and in transit)
- Backup integrity testing and restoration validation monthly

**Recovery Procedures:**
- Documented recovery procedures for all critical systems
- RTO: ${securityLevel === 'Basic' ? '72 hours' : securityLevel === 'Intermediate' ? '24 hours' : '4 hours'} for critical systems
- RPO: ${securityLevel === 'Basic' ? '24 hours' : securityLevel === 'Intermediate' ? '8 hours' : '1 hour'} maximum data loss
- Regular recovery testing to validate procedures
- Disaster recovery site for critical infrastructure

### 7.3 Resilience Testing

Regular testing to validate continuity and recovery capabilities:

- Annual business continuity exercises
- Quarterly backup restoration tests
- Incident response tabletop exercises
- ${securityConfig.controls.includes('Advanced') ? 'Simulated ransomware recovery exercises' : 'Documented recovery procedures'}
- Testing results documented with improvement actions

---

## 8. COMPLIANCE AND AUDIT

### 8.1 Compliance Program

${organizationName} maintains ongoing compliance with ${complianceFrameworks.join(', ')}:

**Compliance Activities:**
- Regulatory requirement tracking and updates
- Gap assessments and remediation planning
- Control implementation and validation
- Compliance documentation and evidence collection
- Internal audit program with independent review
- External audits and certifications as required
- Management reporting on compliance status

**Specific Compliance Requirements:**

${complianceFrameworks.map(f => {
  const specific: Record<string, string[]> = {
    'ISO 27001': ['Annual risk assessments', 'Statement of Applicability maintenance', 'Management review meetings', 'Internal audits', 'External certification audit'],
    'GDPR': ['Data protection impact assessments', 'Privacy notices', 'Data subject rights procedures', 'Consent management', 'Breach notification within 72 hours'],
    'HIPAA': ['Risk analyses', 'Workforce training', 'Business associate agreements', 'Breach notification', 'Audit controls'],
    'SOC 2': ['Control design and operating effectiveness', 'Continuous monitoring', 'Annual Type 2 audit', 'Management assertion'],
    'PCI DSS': ['Quarterly vulnerability scans', 'Annual penetration test', 'Security awareness training', 'Cardholder data encryption', 'Quarterly compliance reporting'],
  };
  return specific[f] ? `**${f} Requirements:**\n${specific[f].map(r => `  - ${r}`).join('\n')}` : `**${f}:** Applicable compliance requirements documented and tracked`;
}).join('\n\n')}

### 8.2 Security Audits

Regular security audits to validate control effectiveness:

- Internal security audits: ${securityLevel === 'Basic' ? 'Annually' : securityLevel === 'Intermediate' ? 'Semi-annually' : 'Quarterly'}
- External security audits: ${securityLevel === 'Basic' ? 'Every 2 years' : 'Annually'}
- Compliance audits as required by regulations
- Audit findings tracked with remediation timelines
- Management review of audit results

### 8.3 Security Metrics and Reporting

Key performance indicators (KPIs) and reporting:

**Security Metrics:**
- Security incident count and time to resolution
- Vulnerability management metrics (open vulnerabilities, patch compliance)
- Access review completion rates
- Training completion rates
- Backup success rates
- Compliance status

**Reporting:**
- Monthly security dashboard to management
- Quarterly board reporting on security program
- Annual security program review
- Incident reports as required

---

## 9. EMPLOYEE RESPONSIBILITIES AND TRAINING

### 9.1 Security Awareness Training

${securityConfig.training}:

**Training Requirements:**
- New hire security orientation within first week
- ${securityLevel === 'Basic' ? 'Annual refresher training' : securityLevel === 'Intermediate' ? 'Quarterly security training updates' : 'Monthly security awareness communications'}
- ${securityConfig.training.includes('phishing') ? 'Monthly phishing simulation exercises with targeted training for click rates above 10%' : 'Periodic phishing awareness training'}
- Role-specific training for IT staff, developers, managers
- Specialized training for security incident responders
- ${complianceFrameworks.includes('HIPAA') ? 'HIPAA privacy and security training' : ''}${complianceFrameworks.includes('PCI DSS') ? 'PCI DSS awareness training for relevant staff' : ''}

**Training Topics:**
- Password security and credential protection
- Phishing and social engineering recognition
- Data classification and handling
- Incident reporting procedures
- Physical security awareness
- Mobile device security
- Remote work security
- ${industry}-specific security risks

### 9.2 Acceptable Use Policy

Acceptable use standards for ${organizationName} technology resources:

**Authorized Use:**
- Business purposes and reasonable personal use
- Compliance with all security policies and procedures
- No expectation of privacy on company systems
- Company reserves right to monitor all system use

**Prohibited Activities:**
- Unauthorized access to systems or data
- Malware installation or security tool circumvention
- Illegal activities or copyright infringement
- Harassment or inappropriate content
- Unauthorized data disclosure or removal
- Personal commercial activities
- Excessive personal use impacting business

**Consequences:**
- Policy violations subject to disciplinary action up to and including termination
- Legal action for serious violations
- Reporting to law enforcement where applicable

### 9.3 Mobile Device and BYOD Security

Secure use of mobile devices and bring-your-own-device (BYOD):

- Mobile device management (MDM) solution for company-owned devices
- BYOD policy: ${securityLevel === 'Basic' ? 'Company email access requires basic security (passcode, encryption)' : 'Containerized work data on personal devices with MDM enrollment'}
- Device encryption mandatory for all devices accessing company data
- Remote wipe capability for lost or stolen devices
- Security app and OS updates required
- Public Wi-Fi: VPN required for accessing company resources

---

## 10. THIRD-PARTY AND VENDOR MANAGEMENT

### 10.1 Vendor Security Requirements

Third-party risk management program:

**Vendor Assessment:**
- Security risk assessments for all vendors with system access or data exposure
- ${securityLevel === 'Advanced' ? 'Detailed security questionnaires and independent security reviews' : 'Security questionnaires appropriate to risk level'}
- Review of vendor compliance certifications (SOC 2, ISO 27001, etc.)
- Ongoing vendor security monitoring and periodic reassessments
- Vendor security incident notification requirements

**Contractual Requirements:**
- Information security and privacy requirements in all vendor contracts
- Right to audit vendor security controls
- Data protection and confidentiality obligations
- Incident notification requirements
- Indemnification for security breaches
- Data return and destruction upon contract termination

### 10.2 Third-Party Access Control

Secure third-party access management:

- Documented business justification for third-party access
- Least privilege access based on business need
- Separate third-party access accounts with enhanced monitoring
- Multi-factor authentication for remote vendor access
- Regular access reviews and prompt deactivation
- Third-party acknowledgment of security policies

### 10.3 Cloud Service Providers

Security requirements for cloud services:

- Cloud services must undergo security review and approval before use
- Only approved cloud providers with appropriate certifications
- Data residency and sovereignty requirements documented
- Shared responsibility model clearly defined
- Cloud security posture management and configuration monitoring
- Regular review of cloud access and permissions

---

## 11. PHYSICAL SECURITY

### 11.1 Facility Security

Physical security controls for ${organizationName} facilities:

**Access Control:**
- Badge-based access control systems at all facilities
- Visitor management with sign-in, badge issuance, and escort requirements
- Access logs maintained and reviewed
- Restricted access areas for sensitive systems (server rooms, network closets)
- After-hours access logging and monitoring

**Environmental Controls:**
- Fire suppression systems in data centers and server rooms
- Environmental monitoring (temperature, humidity, water detection)
- Uninterruptible power supply (UPS) for critical systems
- Backup generator for extended outages
- Regular testing of environmental systems

**Workstation Security:**
- Screen privacy filters for sensitive data
- Clean desk policy for confidential information
- Cable locks for portable devices in offices
- Automatic screen lock after inactivity
- Secure disposal bins for confidential documents

### 11.2 Equipment Security

Protection of IT equipment and assets:

- Asset inventory and tracking system
- Asset tags on all company equipment
- Secure storage for spare equipment and backup media
- Proper disposal procedures with data sanitization
- Return procedures for equipment upon termination
- Personal equipment separation from company assets

---

## 12. SECURITY DEVELOPMENT AND OPERATIONS

### 12.1 Secure Software Development

Security integrated into software development lifecycle:

- Secure coding standards and training for developers
- Code review requirements including security review
- ${securityConfig.controls.includes('DevSecOps') ? 'Automated security testing in CI/CD pipeline (SAST, DAST, SCA)' : 'Security testing before production deployment'}
- Vulnerability management for third-party libraries and dependencies
- Separation of development, testing, and production environments
- Change management process with security approval

### 12.2 Security Operations

Ongoing security operations and maintenance:

**System Hardening:**
- Security baselines for all system types
- Secure configuration validation
- Regular security configuration audits
- Deviation approval and documentation process

**Maintenance Activities:**
- Scheduled maintenance windows with change control
- Security patch testing and deployment
- Performance monitoring and capacity planning
- Regular security health checks

---

## 13. POLICY ENFORCEMENT AND COMPLIANCE

### 13.1 Policy Violations

Enforcement of security policy compliance:

**Violation Categories:**
- **Unintentional:** Accidental policy violations due to lack of awareness (coaching and additional training)
- **Negligence:** Reckless disregard for security policies (written warning, potential disciplinary action)
- **Willful:** Intentional policy violations (disciplinary action up to and including termination)
- **Criminal:** Violations involving illegal activity (termination and law enforcement referral)

**Investigation Process:**
- Fair and consistent investigation of all reported violations
- Documentation of findings and actions taken
- Privacy considerations balanced with security needs
- Appeal process available

### 13.2 Policy Exceptions

Formal exception process for legitimate business needs:

- Written exception request with business justification
- Risk assessment of proposed exception
- Compensating controls to mitigate risk
- Management approval at appropriate level
- Time-limited exceptions with renewal process
- Exception tracking and regular review

---

## 14. POLICY REVIEW AND UPDATES

### 14.1 Policy Maintenance

Regular policy review and update process:

**Review Schedule:**
- Annual comprehensive policy review
- Review triggered by significant business changes, security incidents, or regulatory updates
- Stakeholder input solicited during review process
- Board approval for major policy changes

**Version Control:**
- Policy version history maintained
- Changes documented in revision log
- Stakeholders notified of policy updates
- Training provided on significant changes

### 14.2 Related Documents

This policy is supported by the following documents:

- Information Security Standards and Procedures
- Incident Response Plan
- Business Continuity Plan
- Disaster Recovery Plan
- Access Control Procedures
- Data Classification Guide
- Vendor Management Procedures
- Acceptable Use Policy
- Remote Access Policy
- Change Management Procedures

---

## 15. POLICY ACKNOWLEDGMENT

All employees must acknowledge receipt and understanding of this policy:

- Initial acknowledgment upon hire or policy implementation
- Annual re-acknowledgment
- Acknowledgment after policy updates
- Acknowledgment tracked in HR system

**Employee Acknowledgment Statement:**

"I acknowledge that I have received, read, and understand the ${organizationName} Cybersecurity Policy. I agree to comply with all provisions of this policy and understand that violations may result in disciplinary action up to and including termination. I understand that ${organizationName} reserves the right to modify this policy at any time and will notify me of any changes."

---

## APPENDIX A: GLOSSARY

**Key Terms:**

- **Confidentiality:** Protection of information from unauthorized disclosure
- **Integrity:** Assurance that information is accurate and unmodified
- **Availability:** Ensuring authorized access to information and systems when needed
- **Authentication:** Verification of user identity
- **Authorization:** Granting appropriate access rights
- **Encryption:** Transforming data into unreadable format for protection
- **Malware:** Malicious software including viruses, ransomware, trojans
- **Phishing:** Social engineering attacks via email to steal credentials or information
- **Security Incident:** Event that compromises security of systems or data
- **Vulnerability:** Weakness that could be exploited by a threat
- **Patch:** Software update to fix vulnerabilities or bugs
- **Firewall:** Network security device that monitors and controls traffic
- **MFA/2FA:** Multi-factor or two-factor authentication requiring multiple verification methods

---

## APPENDIX B: CONTACT INFORMATION

**Security Contacts:**

- **Information Security Team:** security@${organizationName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
- **Security Incident Hotline:** Report security incidents immediately
- **IT Help Desk:** For technical security questions and support
- **Privacy Officer:** For privacy and data protection questions
- **Compliance Officer:** For regulatory compliance questions

**Emergency Contacts:**
- After-hours security incidents: Follow incident response procedures
- Physical security emergencies: Contact facility security and emergency services

---

## APPENDIX C: COMPLIANCE MAPPING

This policy addresses requirements from:

${complianceFrameworks.map(f => `**${f}:** Specific control mappings maintained in compliance documentation`).join('\n')}

Detailed control mappings, evidence collection, and compliance documentation maintained by the Information Security and Compliance teams.

---

**Document Control:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | ${date} | ${organizationName} Security Team | Initial policy creation |

**Approval:**

This policy has been reviewed and approved by:

- Chief Information Security Officer (CISO)
- Chief Information Officer (CIO)
- Legal and Compliance
- Executive Management

**Next Review Date:** ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

---

*This document is confidential and proprietary to ${organizationName}. Unauthorized distribution is prohibited.*

*Generated by ${organizationName} Cybersecurity Policy Generator - ${date}*`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      organizationName,
      industry,
      complianceFrameworks,
      securityLevel,
      employeeCount,
      dataTypes,
      existingPolicies,
      specificRequirements,
    } = body;

    if (!organizationName || !industry || !complianceFrameworks || !securityLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate policy using template system
    const generatedPolicy = generatePolicyFromTemplate({
      organizationName,
      industry,
      complianceFrameworks,
      securityLevel,
      employeeCount,
      dataTypes,
      existingPolicies,
      specificRequirements,
    });

    return NextResponse.json(
      {
        policy: generatedPolicy,
        message: 'Policy generated successfully using template system',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Policy Generation Error:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate policy: ' + error.message },
      { status: 500 }
    );
  }
}