export const likePost = async (postId: string, authToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/like`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to like post');
  }

  return response.json();
};

export const getLikes = async (postId: string, authToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/likes`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch likes');
  }

  return response.json();
};

export const createPost = async (formData: FormData, authToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};
