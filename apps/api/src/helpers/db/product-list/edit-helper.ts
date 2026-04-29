import { ProductListDto } from 'src/app/products/products-list/pl.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

export async function editProductList(
  prisma: PrismaService,
  storeId: string,
  productId: string,
  body: ProductListDto,
  file: Express.Multer.File,
) {
  const image = body.image
    ? body.image
    : file
      ? `http://localhost:3001/uploads/${file.filename}`
      : null;

  await prisma.product.update({
    where: {
      storeId,
      id: productId,
    },
    data: {
      name: body.name,
      sku: body.sku,
      description: body.description,
      image,

      stock: body.stock,
      minStock: body.minStock,

      categoryId: body.categoryId,
      unitId: body.unit,

      updatedAt: new Date().toISOString(),
    },
  });
}
