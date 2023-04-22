import {
  DatabaseObjectExistsException,
  DatabaseObjectNotFoundException,
  InvalidFieldNameException,
  NonUniqueFieldNameException,
  ReadOnlyException,
  ServerException,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(ServerException)
export class MikroOrmExceptionHandler implements ExceptionFilter {
  logger = new Logger(MikroOrmExceptionHandler.name);

  catch(e: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(e);

    if (e instanceof UniqueConstraintViolationException) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Constraint violation',
      });
    } else if (e instanceof DatabaseObjectExistsException) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Database object exists',
      });
    } else if (e instanceof DatabaseObjectNotFoundException) {
      return response.status(404).json({
        statusCode: 404,
        message: 'Database object not found',
      });
    } else if (e instanceof InvalidFieldNameException) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Invalid field name',
      });
    } else if (e instanceof NonUniqueFieldNameException) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Non unique field name',
      });
    } else if (e instanceof ReadOnlyException) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Read only',
      });
    } else {
      return response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
