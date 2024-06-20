export async function signup(body) {
  console.log(body);

  try {
    const response = await fetch('http://localhost:3000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}
