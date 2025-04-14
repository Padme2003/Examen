import { Body, Controller, Get, Param, Patch, Post, Put, InternalServerErrorException, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { Curso, EstadoCurso } from './entities/curso.entity';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Get()
  async getAll() {
    try {
      const cursos = await this.cursosService.obtenerTodos();
      if (!cursos || cursos.length === 0) {
        throw new NotFoundException('No se encontraron cursos disponibles.');
      }
      return cursos.map(curso => 
        `ID: ${curso.id} | Título: ${curso.titulo} | Categoría: ${curso.categoria} | Estado: ${curso.estado} | Instructor: ${curso.instructorId}`
      ).join('\n');
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los cursos.');
    }
  }

  @Get('categoria/:categoria')
  async getByCategoria(@Param('categoria') categoria: string) {
    try {
      const cursos = await this.cursosService.filtrarPorCategoria(categoria);
      if (!cursos || cursos.length === 0) {
        throw new NotFoundException(`No se encontraron cursos para la categoría ${categoria}.`);
      }
      return cursos.map(curso => 
        `ID: ${curso.id} | Título: ${curso.titulo} | Categoría: ${curso.categoria} | Estado: ${curso.estado} | Instructor: ${curso.instructorId}`
      ).join('\n');
    } catch (error) {
      throw new InternalServerErrorException('Error al filtrar los cursos por categoría.');
    }
  }

  @Get('estado/:estado')
  async getByEstado(@Param('estado') estado: EstadoCurso) {
    try {
      const cursos = await this.cursosService.filtrarPorEstado(estado);
      if (!cursos || cursos.length === 0) {
        throw new NotFoundException(`No se encontraron cursos con el estado ${estado}.`);
      }
      return cursos.map(curso => 
        `ID: ${curso.id} | Título: ${curso.titulo} | Categoría: ${curso.categoria} | Estado: ${curso.estado} | Instructor: ${curso.instructorId}`
      ).join('\n');
    } catch (error) {
      throw new InternalServerErrorException('Error al filtrar los cursos por estado.');
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const curso = await this.cursosService.buscarPorId(id);
      if (!curso) {
        throw new NotFoundException(`No se encontró el curso con ID ${id}.`);
      }
      return `ID: ${curso.id} | Título: ${curso.titulo} | Categoría: ${curso.categoria} | Estado: ${curso.estado} | Instructor: ${curso.instructorId}`;
    } catch (error) {
      throw new InternalServerErrorException('Error inesperado al obtener el curso.');
    }
  }

  @Post()
  async create(@Body() data: Omit<Curso, 'inscritos'>) {
    try {
      if (!data.titulo || !data.categoria || !data.estado || !data.instructorId) {
        throw new BadRequestException('Faltan datos necesarios para crear el curso.');
      }
      return this.cursosService.crearCurso(data);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el curso.');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Curso>) {
    try {
      const cursoExistente = await this.cursosService.buscarPorId(id);
      if (!cursoExistente) {
        throw new NotFoundException(`No se encontró el curso con ID ${id} para actualizar.`);
      }
      return this.cursosService.actualizarCurso(id, data);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el curso.');
    }
  }

  @Patch(':id/estado')
  async changeStatus(@Param('id') id: string, @Body('estado') estado: EstadoCurso) {
    try {
      const cursoExistente = await this.cursosService.buscarPorId(id);
      if (!cursoExistente) {
        throw new NotFoundException(`No se encontró el curso con ID ${id} para cambiar el estado.`);
      }
      return this.cursosService.cambiarEstado(id, estado);
    } catch (error) {
      throw new InternalServerErrorException('Error al cambiar el estado del curso.');
    }
  }

  @Post(':id/inscripcion')
  async inscribir(@Param('id') id: string) {
    try {
      const curso = await this.cursosService.buscarPorId(id);
      if (!curso) {
        throw new NotFoundException(`No se encontró el curso con ID ${id} para la inscripción.`);
      }
      if (curso.inscritos >= curso.capacidad) {
        throw new ConflictException('No hay cupo disponible para inscribirse en este curso.');
      }
      return this.cursosService.inscribir(id);
    } catch (error) {
      throw new InternalServerErrorException('Error al inscribir al curso.');
    }
  }
}