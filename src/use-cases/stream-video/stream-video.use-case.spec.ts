import { StreamVideoUseCase } from './stream-video.use-case.ts';
import { Readable } from 'stream';

describe('StreamVideoUseCase', () => {
  const buffer = Buffer.from('mock video');
  const storage = { get: jest.fn() };
  const cache = { get: jest.fn() };

  const useCase = new StreamVideoUseCase(storage, cache);

  beforeEach(() => jest.clearAllMocks());

  it('stream from cache', async () => {
    cache.get.mockResolvedValue({
      buffer,
      mimetype: 'video/mp4',
      size: buffer.length,
    });
  });
  const result = await useCase.execute({ filename: 'video.mp4' });

  expect(result.statusCode).toBe(200);
  expect(result.stream).toBeInstanceOf(Readable);
});
