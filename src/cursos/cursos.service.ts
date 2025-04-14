import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { Curso, EstadoCurso } from './entities/curso.entity.js';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CursosService {
  private cursos: Curso[] = [];

  obtenerTodos(): Curso[] {
    return this.cursos;
  }

  filtrarPorCategoria(categoria: string): Curso[] {
    return this.cursos.filter(curso => curso.categoria === categoria);
  }

  filtrarPorEstado(estado: EstadoCurso): Curso[] {
    return this.cursos.filter(curso => curso.estado === estado);
  }

  buscarPorId(id: string): Curso {
    const curso = this.cursos.find(c => c.id === id);
    if (!curso) throw new NotFoundException(`Curso con id ${id} no encontrado.`);
    return curso;
  }

  crearCurso(data: Omit<Curso, 'id' | 'inscritos'>): Curso {
    if (!data.titulo || data.titulo.length < 5) throw new BadRequestException('Título inválido');
    if (!data.descripcion || data.descripcion.length < 20) throw new BadRequestException('Descripción inválida');
    if (!data.instructorId) throw new BadRequestException('Instructor requerido');
    if (!data.categoria) throw new BadRequestException('Categoría requerida');
    if (data.duracion < 1) throw new BadRequestException('Duración inválida');
    if (data.precio < 0) throw new BadRequestException('Precio inválido');
    if (data.capacidad < 5) throw new BadRequestException('Capacidad mínima de 5');

    const nuevo: Curso = {
      ...data,
      id: uuid(),
      inscritos: 0,
    };
    this.cursos.push(nuevo);
    return nuevo;
  }

  actualizarCurso(id: string, data: Partial<Curso>): Curso {
    const curso = this.buscarPorId(id);
    Object.assign(curso, data);
    return curso;
  }

  cambiarEstado(id: string, estado: EstadoCurso): Curso {
    const curso = this.buscarPorId(id);
    curso.estado = estado;
    return curso;
  }

  inscribir(id: string): Curso {
    const curso = this.buscarPorId(id);
    if (curso.inscritos >= curso.capacidad) throw new ConflictException('Curso sin cupos disponibles');
    curso.inscritos++;
    return curso;
  }
}