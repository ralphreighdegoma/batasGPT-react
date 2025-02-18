export const createComment = async (comment: string, postId: string, authToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
    method: 'POST',
    body: JSON.stringify({ comment, postId }),
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to submit comment');
  }

  return response.json();
};

export const getComments = async (postId: string, authToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  return response.json();
}; 