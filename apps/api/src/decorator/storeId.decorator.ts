import { createParamDecorator } from '@nestjs/common';

export const StoreId = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();

  return req.storeId;
});
