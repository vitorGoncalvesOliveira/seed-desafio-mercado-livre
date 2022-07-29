import { Injectable } from '@nestjs/common';

interface imageResponse {
  name: string;
  url: string;
}

@Injectable()
export class UploadFile {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private uploadFile(name: string): string {
    return `https://teste/${name}`;
  }

  async sendFile(name): Promise<imageResponse> {
    return {
      name: name,
      url: this.uploadFile(name),
    };
  }
}
