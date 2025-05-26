interface UploadVideoDTO {
  filename: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

interface StreamVideoInput {
  filename: string;
  range?: string;
}
interface StreamVideoOutput {
  stream: NodeJS.ReadableStream;
  headers: Record<string, string | number>;
  statusCode: number;
}

interface VideoCache {
  buffer: Buffer;
  mimetype: string;
  size: number;
}
export { UploadVideoDTO, StreamVideoInput, StreamVideoOutput, VideoCache };
