import * as userModule from './user';

import { decodeJWT as mockDecodeJWT } from '@/app/actions/utilities/utils';

jest.mock('@/app/actions/utilities/utils', () => ({
  decodeJWT: jest.fn(),
}));

const mockFetch = jest.fn();

global.fetch = mockFetch as any;

const mockJwt = 'mock.jwt.token';
const mockUserId = 'user-123';
const mockUser = { id: mockUserId, name: 'Test User' };

describe('user actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockDecodeJWT as jest.Mock).mockReturnValue({ sub: mockUserId });
  });

  describe('getUserDetails', () => {
    it('returns user data on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await userModule.getUserDetails(mockJwt);

      expect(result).toEqual(mockUser);
      expect(mockFetch).toHaveBeenCalled();
    });

    it('throws on fetch error', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
      await expect(userModule.getUserDetails(mockJwt)).rejects.toThrow(
        'HTTP error! status: 404'
      );
    });
  });

  describe('deleteUser', () => {
    it('returns true on success', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
      const result = await userModule.deleteUser(mockJwt);

      expect(result).toBe(true);
    });

    it('returns false and logs error on failure', async () => {
      const errorJson = { message: 'fail' };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => errorJson,
      });
      const result = await userModule.deleteUser(mockJwt);

      expect(result).toBe(false);
    });
  });

  describe('editName', () => {
    it('returns true on success', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
      const result = await userModule.editName(mockJwt, 'New Name');

      expect(result).toBe(true);
    });

    it('returns false and logs error on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'fail' }),
      });
      const result = await userModule.editName(mockJwt, 'New Name');

      expect(result).toBe(false);
    });
  });

  describe('updateAvatar', () => {
    it('returns user data on success', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) // updateAvatar call
        .mockResolvedValueOnce({ ok: true, json: async () => mockUser }); // getUserDetails call

      const result = await userModule.updateAvatar(mockJwt, 'avatar-key');

      expect(result).toEqual(mockUser);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('throws on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'fail' }),
      });
      await expect(
        userModule.updateAvatar(mockJwt, 'avatar-key')
      ).rejects.toThrow();
    });
  });
});
