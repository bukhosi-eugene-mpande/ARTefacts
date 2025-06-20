import * as pointsModule from './points';

import { decodeJWT as mockDecodeJWT } from '@/app/actions/utilities/utils';

jest.mock('@/app/actions/utilities/utils', () => ({
  decodeJWT: jest.fn(),
}));

const mockFetch = jest.fn();

global.fetch = mockFetch as any;

const mockJwt = 'mock.jwt.token';
const mockUserId = 'user-123';
const mockLeaderboard = { leaderboard: [{ id: mockUserId, points: 100 }] };
const mockPointsResponse = { success: true, points: 150 };

describe('points actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockDecodeJWT as jest.Mock).mockReturnValue({ sub: mockUserId });
  });

  describe('getLeaderboard', () => {
    it('returns leaderboard data on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockLeaderboard,
      });
      const result = await pointsModule.getLeaderboard(mockJwt);

      expect(result).toEqual(mockLeaderboard);
      expect(mockFetch).toHaveBeenCalled();
    });

    it('throws on fetch error', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
      await expect(pointsModule.getLeaderboard(mockJwt)).rejects.toThrow(
        'HTTP error! status: 500'
      );
    });
  });

  describe('getMe', () => {
    it('returns leaderboard data on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockLeaderboard,
      });
      const result = await pointsModule.getMe(mockJwt);

      expect(result).toEqual(mockLeaderboard);
      expect(mockFetch).toHaveBeenCalled();
    });

    it('throws on fetch error', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
      await expect(pointsModule.getMe(mockJwt)).rejects.toThrow(
        'HTTP error! status: 404'
      );
    });
  });

  describe('updatePoints', () => {
    it('returns points update response on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPointsResponse,
      });
      const result = await pointsModule.updatePoints(mockJwt, 50);

      expect(result).toEqual(mockPointsResponse);
      expect(mockFetch).toHaveBeenCalled();
    });

    it('throws on fetch error with message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ message: 'fail' }),
      });
      await expect(pointsModule.updatePoints(mockJwt, 50)).rejects.toThrow(
        'HTTP error! status: 400, message: fail'
      );
    });

    it('throws on fetch error with unknown message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({}),
      });
      await expect(pointsModule.updatePoints(mockJwt, 50)).rejects.toThrow(
        'HTTP error! status: 400, message: Unknown error'
      );
    });
  });
});
