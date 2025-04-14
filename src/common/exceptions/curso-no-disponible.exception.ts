import { HttpException, HttpStatus } from '@nestjs/common';

export class CursoInscripcionException extends HttpException {
  constructor() {
    super('Error personalizado al inscribir al curso', HttpStatus.CONFLICT);
  }
}
