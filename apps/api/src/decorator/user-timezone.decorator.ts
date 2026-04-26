import { createParamDecorator } from '@nestjs/common';

export const UserTimezone = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req['x-user-timezone'];
});
