import { createParamDecorator } from '@nestjs/common';

export const Timezone = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  const timezone = req.headers['x-user-timezone'];

  try {
    // Validasi timezone valid
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return timezone;
  } catch {
    return 'UTC';
  }
});
