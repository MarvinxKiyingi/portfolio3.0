import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request for debugging
    console.log('🔔 Webhook received:', new Date().toISOString());

    // Verify the request is from Sanity (you can add more security checks)
    const body = await request.json();
    console.log('📦 Webhook body:', JSON.stringify(body, null, 2));

    // Revalidate with specific document type targeting
    const documentType = body._type;

    // Revalidate based on what changed
    if (documentType === 'home') {
      revalidatePath('/', 'page');
    } else if (documentType === 'work') {
      revalidatePath('/', 'page'); // Projects are on home page
    } else if (documentType === 'agencyWork') {
      revalidatePath('/', 'page'); // Agency work is on home page
    } else if (documentType === 'navbarMenu') {
      revalidatePath('/', 'layout'); // Navbar affects layout
    } else {
      // Fallback: revalidate everything
      revalidatePath('/', 'page');
      revalidatePath('/', 'layout');
    }

    console.log(`✅ Revalidated for document type: ${documentType}`);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      documentType: documentType,
    });
  } catch (err) {
    console.error('❌ Error in revalidation:', err);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
