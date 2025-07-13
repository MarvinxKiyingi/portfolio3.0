import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request for debugging
    console.log('🔔 Webhook received:', new Date().toISOString());

    // Verify the request is from Sanity (you can add more security checks)
    const body = await request.json();
    console.log('📦 Webhook body:', JSON.stringify(body, null, 2));

    // Revalidate all relevant paths
    revalidatePath('/');
    revalidatePath('/about');
    console.log('✅ Revalidated paths: /, /about');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('❌ Error in revalidation:', err);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
