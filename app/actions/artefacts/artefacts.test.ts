import { getAllArtefacts, getArtefact } from './artefacts';

const mockFetch = jest.fn();

global.fetch = mockFetch as any;

const mockArtefactsData = { artefacts: [{ id: 1, name: 'Artefact1' }] };
const mockArtefactData = { id: 1, name: 'Artefact1' };

describe('getAllArtefacts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns artefacts data on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockArtefactsData,
    });
    const result = await getAllArtefacts(1, 10);

    expect(result).toEqual(mockArtefactsData);
    expect(mockFetch).toHaveBeenCalled();
  });

  it('throws on fetch error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(getAllArtefacts(1, 10)).rejects.toThrow(
      'HTTP error! status: 500'
    );
  });
});

describe('getArtefact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns artefact data on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockArtefactData,
    });
    const result = await getArtefact('1');

    expect(result).toEqual(mockArtefactData);
    expect(mockFetch).toHaveBeenCalled();
  });

  it('throws on fetch error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });
    await expect(getArtefact('1')).rejects.toThrow('HTTP error! status: 404');
  });
});
