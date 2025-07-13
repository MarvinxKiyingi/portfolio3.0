// Test script that simulates Sanity webhook payload
const testSanityWebhook = async () => {
  try {
    // This is the typical payload Sanity sends when content changes
    const sanityPayload = {
      _id: 'test-document-id',
      _type: 'home',
      _rev: 'test-revision',
      _updatedAt: new Date().toISOString(),
      operation: 'update',
    };

    const response = await fetch(
      'https://www.marvinkiyingi.com/api/revalidate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanityPayload),
      }
    );

    const result = await response.json();
    console.log('✅ Production webhook test result:', result);
  } catch (error) {
    console.error('❌ Error testing production webhook:', error);
  }
};

testSanityWebhook();
