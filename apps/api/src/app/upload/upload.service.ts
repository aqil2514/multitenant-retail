import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getImageUrl(file: Express.Multer.File): string {
    return `/uploads/${file.filename}`;
  }
}
