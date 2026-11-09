import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { policyHistory } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

const VALID_ACTIONS = ['created', 'edited', 'downloaded'];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid policy ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    const policyId = parseInt(id);

    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Query history entries for the policy
    const historyEntries = await db
      .select()
      .from(policyHistory)
      .where(eq(policyHistory.policyId, policyId))
      .orderBy(desc(policyHistory.createdAt))
      .limit(limit)
      .offset(offset);

    if (historyEntries.length === 0) {
      return NextResponse.json(
        { 
          error: 'No history found for this policy',
          code: 'NO_HISTORY_FOUND'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(historyEntries, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid policy ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    const policyId = parseInt(id);

    // Parse request body
    const body = await request.json();
    const { action, modifiedContent } = body;

    // Validate required fields
    if (!action) {
      return NextResponse.json(
        { 
          error: 'Action is required',
          code: 'MISSING_REQUIRED_FIELD'
        },
        { status: 400 }
      );
    }

    // Validate action type
    if (!VALID_ACTIONS.includes(action.toLowerCase())) {
      return NextResponse.json(
        { 
          error: `Invalid action. Must be one of: ${VALID_ACTIONS.join(', ')}`,
          code: 'INVALID_ACTION'
        },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData: {
      policyId: number;
      action: string;
      modifiedContent?: string;
      createdAt: string;
    } = {
      policyId,
      action: action.toLowerCase(),
      createdAt: new Date().toISOString()
    };

    if (modifiedContent !== undefined && modifiedContent !== null) {
      insertData.modifiedContent = modifiedContent;
    }

    // Insert new history entry
    const newHistoryEntry = await db
      .insert(policyHistory)
      .values(insertData)
      .returning();

    return NextResponse.json(newHistoryEntry[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}