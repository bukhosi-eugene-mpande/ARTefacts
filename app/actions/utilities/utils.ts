export function decodeJWT(token: string): { sub: string } {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = Buffer.from(base64, 'base64').toString('utf-8');

    return JSON.parse(payload);
  } catch {
    throw new Error('Invalid JWT token');
  }
}
