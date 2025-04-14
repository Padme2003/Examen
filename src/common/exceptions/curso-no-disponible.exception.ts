import { HttpException, HttpStatus } from '@nestjs/common';

export class CursoProhibidoException extends HttpException {
  constructor() {
    super('Acceso prohibido a este curso', HttpStatus.FORBIDDEN);
  }
}