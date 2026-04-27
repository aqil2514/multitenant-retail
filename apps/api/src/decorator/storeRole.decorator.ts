import { createParamDecorator } from '@nestjs/common';

export const StoreRole = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();

  return req.storeRole;
});
