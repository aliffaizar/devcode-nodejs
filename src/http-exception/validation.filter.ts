import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationFilter<T extends BadRequestException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const res = exception.getResponse();
    response.status(exception.getStatus()).json({
      status: 'Bad Request',
      message: res['message'][0],
      data: {},
    });
  }
}
