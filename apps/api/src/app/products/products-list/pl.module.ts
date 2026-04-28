import { Module } from '@nestjs/common';
import { ProductListController } from './pl.controller';
import { ProductListService } from './pl.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, cb) {
          const storeSlug = req.params.slug;

          const unique = `${storeSlug.toString()}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [ProductListController],
  providers: [ProductListService],
})
export class ProductListModule {}
