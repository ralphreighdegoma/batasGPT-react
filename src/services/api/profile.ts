export const getProfile = async (hashId: string, authToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${hashId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
};

export const updateProfile = async (hashId: string, formData: FormData, authToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${hashId}`, {
    method: 'PUT',
    body: formData,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
};
