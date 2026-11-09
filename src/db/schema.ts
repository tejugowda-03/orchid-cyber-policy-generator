import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const policyGeneration = sqliteTable('policy_generation', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  organizationName: text('organization_name').notNull(),
  industry: text('industry').notNull(),
  complianceFrameworks: text('compliance_frameworks', { mode: 'json' }).notNull(),
  securityLevel: text('security_level').notNull(),
  employeeCount: text('employee_count').notNull(),
  dataTypes: text('data_types', { mode: 'json' }).notNull(),
  existingPolicies: integer('existing_policies', { mode: 'boolean' }).notNull(),
  specificRequirements: text('specific_requirements'),
  generatedPolicy: text('generated_policy').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const policyHistory = sqliteTable('policy_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  policyId: integer('policy_id').notNull().references(() => policyGeneration.id),
  action: text('action').notNull(),
  modifiedContent: text('modified_content'),
  createdAt: text('created_at').notNull(),
});