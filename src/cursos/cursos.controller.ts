import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { Curso, EstadoCurso } from './entities/curso.entity';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  getAll() {
    const cursos = this.cursosService.obtenerTodos();
    const cursosTexto = cursos.map(curso => 
      `ID: ${curso.id} | Título: ${curso.titulo} | Categoría: ${curso.categoria} | Estado: ${curso.estado} | Instructor: ${curso.instructorId}`
    ).join('\n');
    return cursosTexto;
  }

  @Get('categoria/:categoria')
  getByCategoria(@Param('categoria') categoria: string) {
    const cursos = this.cursosService.filtrarPorCategoria(categoria);
    const cursosTexto = cursos.map(curso => 
      `ID: ${curso.id} | Título: ${curso.titulo} | Categoría: ${curso.categoria} | Estado: ${curso.estado} | Instructor: ${curso.instructorId}`
    ).join('\n');
    return cursosTexto;
  }

  @Get('estado/:estado')
  getByEstado(@Param('estado') estado: EstadoCurso) {
    const cursos = this.cursosService.filtrarPorEstado(estado);
    const cursosTexto = cursos.map(curso => 
      `ID: ${curso.id} | Título: ${curso.titulo} | Categoría: ${curso.categoria} | Estado: ${curso.estado} | Instructor: ${curso.instructorId}`
    ).join('\n');
    return cursosTexto;
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const curso = this.cursosService.buscarPorId(id);
    return `ID: ${curso.id} | Título: ${curso.titulo} | Categoría: ${curso.categoria} | Estado: ${curso.estado} | Instructor: ${curso.instructorId}`;
  }

  @Post()
  create(@Body() data: Omit<Curso, 'inscritos'>) {
    return this.cursosService.crearCurso(data); // Ahora el ID debe ser parte del cuerpo de la solicitud
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Curso>) {
    return this.cursosService.actualizarCurso(id, data);
  }

  @Patch(':id/estado')
  changeStatus(@Param('id') id: string, @Body('estado') estado: EstadoCurso) {
    return this.cursosService.cambiarEstado(id, estado);
  }

  @Post(':id/inscripcion')
  inscribir(@Param('id') id: string) {
    return this.cursosService.inscribir(id);
  }
}
