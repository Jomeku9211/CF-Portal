import { API_BASE_URL } from '../../../src/modules/shared/services/config';

describe('API - Super Admin Auto Commenting', () => {
  beforeEach(() => jest.resetAllMocks());

  test('fetch today count endpoint responds (mocked)', async () => {
    const mockResponse = { count: 12 };
    const fetchSpy = jest.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const res = await fetch('/api/airtable-count?viewId=viwjzxpzCC24wtkfc');
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data).toEqual(mockResponse);
    expect(fetchSpy).toHaveBeenCalled();
  });
});


