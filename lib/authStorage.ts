export interface AuthResult {
  AccessToken?: string;
  RefreshToken?: string;
  IdToken?: string;
  ExpiresIn?: number;
  TokenType?: string;
}

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const ID_TOKEN_KEY = 'IdToken';
const EXPIRES_AT_KEY = 'expiresAt';

export const setTokens = (authResult: AuthResult) => {
  const { AccessToken, RefreshToken, IdToken, ExpiresIn } = authResult;

  if (AccessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, AccessToken);
  }
  if (RefreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, RefreshToken);
  }
  if (IdToken) {
    localStorage.setItem(ID_TOKEN_KEY, IdToken);
  }
  if (ExpiresIn) {
    const expiresAt = (Date.now() + ExpiresIn * 1000).toString();

    localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
  }
};

export const getTokens = () => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  IdToken: localStorage.getItem(ID_TOKEN_KEY),
  expiresAt: localStorage.getItem(EXPIRES_AT_KEY),
});

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ID_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
};

export const isTokenExpired = () => {
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);

  return expiresAt ? Date.now() > parseInt(expiresAt) : true;
};

// Function to refresh the access token using the refresh token
export const refreshAccessToken = async () => {
  const { refreshToken } = getTokens();

  if (!refreshToken) {
    console.error('No refresh token available.');


    return null;
  }

  try {
    // Make the API request to refresh the token (this is a placeholder, replace with your actual API call)
    const response = await fetch('https://your-api-endpoint.com/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    const data = await response.json();

    if (response.ok && data.AccessToken) {
      setTokens({
        AccessToken: data.AccessToken,
        RefreshToken: data.RefreshToken, // If new refresh token is returned
        IdToken: data.IdToken, // If a new IdToken is returned
        ExpiresIn: data.ExpiresIn, // If expiration time is provided
        TokenType: data.TokenType, // If a new token type is returned
      });

      return data.AccessToken; // Return the new access token
    } else {
      console.error('Token refresh failed', data);
      clearTokens(); // Optionally clear tokens if refresh fails

      return null;
    }
  } catch (error) {
    console.error('Error refreshing token', error);

    return null;
  }
};

export const makeGuestToken = () => {
  const guestAccessToken = `guest-${Math.random().toString(36).substr(2, 9)}`;
  const expiresIn = 3600; // Token valid for 1 hour

  setTokens({
    AccessToken: guestAccessToken,
    RefreshToken: '', // Guests won't have a refresh token
    IdToken: '', // Optional
    ExpiresIn: expiresIn,
    TokenType: 'Bearer',
  });

  return guestAccessToken;
};
