const BASE_URL = 'http://localhost:5174/api/auth';

export const signupUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Signup failed');
  }
  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
};

export const logoutUser = async (seconds = 0) => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ seconds }),
  });
  const data = await response.json();
  return data;
};

export const contactUs = async (userData) => {
  const response = await fetch(`${BASE_URL}/contactus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'contactus failed');
  }
  return data;
};

export const addGame = async (gameData) => {
  const response = await fetch('http://localhost:5174/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(gameData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to add game');
  }
  return data;
};

export const deleteGame = async (gameId) => {
  const response = await fetch(`http://localhost:5174/api/games/${gameId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to delete game');
  }
  return data;
};

export const postTweet = async (content, imageFile) => {
  const formData = new FormData();
  formData.append('content', content);
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch('http://localhost:5174/api/tweets', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to post tweet');
  }
  return data;
};

export const fetchTweets = async () => {
  const response = await fetch('http://localhost:5174/api/tweets', {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to fetch tweets');
  }
  return data;
};

export const deleteTweet = async (tweetId) => {
  const response = await fetch(`http://localhost:5174/api/tweets/${tweetId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to delete tweet');
  }
  return data;
};

export const sendHeartbeat = async (seconds = 10) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role === 'admin') {
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/heartbeat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ seconds }),
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return;
    }

    return await response.json();
  } catch (err) {
    console.error('Heartbeat error:', err);
  }
};