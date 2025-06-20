import { getAllQuestions } from './questions';

const mockFetch = jest.fn();

global.fetch = mockFetch as any;

const mockQuestions = { questions: [{ id: 1, text: 'What is AI?' }] };

describe('getAllQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns questions data on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuestions,
    });
    const result = await getAllQuestions();

    expect(result).toEqual(mockQuestions);
    expect(mockFetch).toHaveBeenCalled();
  });

  it('throws on fetch error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(getAllQuestions()).rejects.toThrow('HTTP error! status: 500');
  });
});
