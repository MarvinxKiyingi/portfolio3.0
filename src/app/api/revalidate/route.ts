import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request for debugging
    console.log('🔔 Webhook received:', new Date().toISOString());

    // Verify the authorization header for security
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.SANITY_WEBHOOK_SECRET;

    if (!expectedToken) {
      console.error('❌ SANITY_WEBHOOK_SECRET environment variable not set');
      return NextResponse.json(
        { message: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('❌ Missing or invalid authorization header');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (token !== expectedToken) {
      console.error('❌ Invalid webhook token');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the request is from Sanity
    const body = await request.json();
    console.log('📦 Webhook body:', JSON.stringify(body, null, 2));

    // Get document info for logging
    const documentType = body._type;
    const operation = body.operation; // 'create', 'update', 'delete'

    console.log(`📝 Document type: ${documentType}, Operation: ${operation}`);

    // Revalidate everything - no hardcoded checks needed
    // This ensures ANY change in Sanity triggers complete revalidation
    revalidatePath('/', 'page');
    revalidatePath('/', 'layout');

    console.log(`✅ Revalidated everything for document type: ${documentType}`);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      documentType: documentType,
      operation: operation,
    });
  } catch (err) {
    console.error('❌ Error in revalidation:', err);
    console.error('❌ Error in revalidation:', err);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
