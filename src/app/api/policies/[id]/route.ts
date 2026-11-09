import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { policyGeneration, policyHistory } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    const policy = await db.select()
      .from(policyGeneration)
      .where(eq(policyGeneration.id, parseInt(id)))
      .limit(1);

    if (policy.length === 0) {
      return NextResponse.json(
        { 
          error: 'Policy not found',
          code: 'POLICY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(policy[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

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

    if (securityLevel && !['basic', 'intermediate', 'advanced'].includes(securityLevel)) {
      return NextResponse.json(
        { 
          error: 'Invalid security level. Must be "basic", "intermediate", or "advanced"',
          code: 'INVALID_SECURITY_LEVEL'
        },
        { status: 400 }
      );
    }

    const existingPolicy = await db.select()
      .from(policyGeneration)
      .where(eq(policyGeneration.id, parseInt(id)))
      .limit(1);

    if (existingPolicy.length === 0) {
      return NextResponse.json(
        { 
          error: 'Policy not found',
          code: 'POLICY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    if (organizationName !== undefined) updates.organizationName = organizationName;
    if (industry !== undefined) updates.industry = industry;
    if (complianceFrameworks !== undefined) updates.complianceFrameworks = JSON.stringify(complianceFrameworks);
    if (securityLevel !== undefined) updates.securityLevel = securityLevel;
    if (employeeCount !== undefined) updates.employeeCount = employeeCount;
    if (dataTypes !== undefined) updates.dataTypes = JSON.stringify(dataTypes);
    if (existingPolicies !== undefined) updates.existingPolicies = existingPolicies ? 1 : 0;
    if (specificRequirements !== undefined) updates.specificRequirements = specificRequirements;
    if (generatedPolicy !== undefined) updates.generatedPolicy = generatedPolicy;

    const updated = await db.update(policyGeneration)
      .set(updates)
      .where(eq(policyGeneration.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { 
          error: 'Policy not found',
          code: 'POLICY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    const existingPolicy = await db.select()
      .from(policyGeneration)
      .where(eq(policyGeneration.id, parseInt(id)))
      .limit(1);

    if (existingPolicy.length === 0) {
      return NextResponse.json(
        { 
          error: 'Policy not found',
          code: 'POLICY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // First delete all related history records to avoid foreign key constraint
    await db.delete(policyHistory)
      .where(eq(policyHistory.policyId, parseInt(id)));

    // Then delete the policy itself
    const deleted = await db.delete(policyGeneration)
      .where(eq(policyGeneration.id, parseInt(id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { 
          error: 'Policy not found',
          code: 'POLICY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Policy deleted successfully',
        id: deleted[0].id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}