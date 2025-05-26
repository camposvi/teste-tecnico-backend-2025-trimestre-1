import { beforeEach } from 'node:test';
import { UploadVideoUseCase } from './upload-video.use-case';

describe('UploadVideoUseCase', () => {
  const storage = { save: jest.fn() };
  const cache = { set: jest.fn() };
  const useCase = new UploadVideoUseCase(storage, cache);

  const mockVideo = {
    filename: 'test.mp4',
    mimetype: 'video/mp4',
    size: 5 * 1024 * 1024,
    buffer: Buffer.from('data'),
  };

  beforeEach(() => jest.clearAllMocks());

  it('should upload and cache a video', async () => {
    await useCase.execute(mockVideo);

    expect(cache.set).toHaveBeenCalled();
    expect(storage.save).toHaveBeenCalled();
  });

  it('should throw if mimetype is invalid', async () => {
    await expect(
      useCase.execute({ ...mockVideo, mimetype: 'image/png' }),
    ).rejects.toThrow('Invalid file type');
  });

  it('should throw if file exceeds 10MB', async () => {
    await expect(
      useCase.execute({ ...mockVideo, size: 11 * 1024 * 1024 }),
    ).rejects.toThrow('File size exceeds 10MB');
  });
});
