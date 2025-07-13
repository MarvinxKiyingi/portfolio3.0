// Simple test script for revalidation
const testRevalidation = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test: 'data' }),
    });

    const result = await response.json();
    console.log('Revalidation result:', result);
  } catch (error) {
    console.error('Error testing revalidation:', error);
  }
};

testRevalidation();
