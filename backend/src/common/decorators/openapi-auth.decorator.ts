import { ApiBearerAuth } from '@nestjs/swagger';

export const SwaggerAuthDecorator = ApiBearerAuth('JWT-auth');
