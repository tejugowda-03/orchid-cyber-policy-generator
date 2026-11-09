import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { policyGeneration } from '@/db/schema';
import { eq, like, or, and, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const industry = searchParams.get('industry');
    const securityLevel = searchParams.get('securityLevel');

    let query = db.select().from(policyGeneration);

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(policyGeneration.organizationName, `%${search}%`),
          like(policyGeneration.industry, `%${search}%`)
        )
      );
    }

    if (industry) {
      conditions.push(eq(policyGeneration.industry, industry));
    }

    if (securityLevel) {
      conditions.push(eq(policyGeneration.securityLevel, securityLevel));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(policyGeneration.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
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
      generatedPolicy
    } = body;

    if (
      !organizationName ||
      !industry ||
      !complianceFrameworks ||
      !securityLevel ||
      !employeeCount ||
      !dataTypes ||
      typeof existingPolicies !== 'boolean' ||
      !generatedPolicy
    ) {
      return NextResponse.json(
        {
          error: 'Missing required fields: organizationName, industry, complianceFrameworks, securityLevel, employeeCount, dataTypes, existingPolicies, generatedPolicy',
          code: 'MISSING_REQUIRED_FIELDS'
        },
        { status: 400 }
      );
    }

    const validSecurityLevels = ['basic', 'intermediate', 'advanced'];
    if (!validSecurityLevels.includes(securityLevel)) {
      return NextResponse.json(
        {
          error: 'Invalid securityLevel. Must be one of: basic, intermediate, advanced',
          code: 'INVALID_SECURITY_LEVEL'
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(complianceFrameworks)) {
      return NextResponse.json(
        {
          error: 'complianceFrameworks must be an array',
          code: 'INVALID_COMPLIANCE_FRAMEWORKS'
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(dataTypes)) {
      return NextResponse.json(
        {
          error: 'dataTypes must be an array',
          code: 'INVALID_DATA_TYPES'
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const newPolicy = await db
      .insert(policyGeneration)
      .values({
        organizationName: organizationName.trim(),
        industry: industry.trim(),
        complianceFrameworks: JSON.stringify(complianceFrameworks),
        securityLevel,
        employeeCount: employeeCount.trim(),
        dataTypes: JSON.stringify(dataTypes),
        existingPolicies,
        specificRequirements: specificRequirements ? specificRequirements.trim() : null,
        generatedPolicy: generatedPolicy.trim(),
        createdAt: now,
        updatedAt: now
      })
      .returning();

    return NextResponse.json(newPolicy[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}