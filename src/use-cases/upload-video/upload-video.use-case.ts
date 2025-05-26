import { UploadVideoDTO, VideoCache } from '../../types/video.types';

export class UploadVideoUseCase {
  constructor(
    private readonly storage: {
      save(filename: string, buffer: Buffer): Promise<void>;
    },
    private readonly cache: {
      set(key: string, value: VideoCache, ttl: number): Promise<void>;
    },
  ) {}

  async execute(input: UploadVideoDTO): Promise<void> {
    if (!input.mimetype.startsWith('video/')) {
      throw new Error('Invalid file type');
    }

    if (input.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB');
    }

    const cacheValue: VideoCache = {
      buffer: input.buffer,
      mimetype: input.mimetype,
      size: input.size,
    };

    await this.cache.set(input.filename, cacheValue, 60);
    await this.storage.save(input.filename, input.buffer);
  }
}
