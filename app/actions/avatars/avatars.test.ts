import { getAllAvatars } from './avatars';

const mockFetch = jest.fn();

global.fetch = mockFetch as any;

const mockAvatars = [
  { id: 1, name: 'Avatar1' },
  { id: 2, name: 'Avatar2' },
];
const mockAvatarsResponse = { body: { avatars: mockAvatars } };

describe('getAllAvatars', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns avatars data on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockAvatarsResponse,
    });
    const result = await getAllAvatars();

    expect(result).toEqual(mockAvatars);
    expect(mockFetch).toHaveBeenCalled();
  });

  it('throws on fetch error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(getAllAvatars()).rejects.toThrow('HTTP error! status: 404');
  });
});
