import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { Curso, EstadoCurso } from './entities/curso.entity';

@Injectable()
export class CursosService {
  private cursos: Curso[] = [
    {
      id: '1',
      titulo: 'Curso de Vue.js',
      descripcion: 'Aprende Vue.js desde cero, un framework potente para la creación de interfaces interactivas.',
      instructorId: 'instructor-01',
      categoria: 'Tecnología',
      duracion: 40,
      precio: 100,
      capacidad: 20,
      inscritos: 0,
      estado: EstadoCurso.PUBLICADO,
      fechaInicio: new Date('2025-01-01'),
    },
    {
      id: '2',
      titulo: 'Curso de React',
      descripcion: 'Curso completo para dominar React y sus herramientas principales.',
      instructorId: 'instructor-02',
      categoria: 'Tecnología',
      duracion: 50,
      precio: 120,
      capacidad: 25,
      inscritos: 0,
      estado: EstadoCurso.EN_CURSO,
      fechaInicio: new Date('2025-02-01'),
    },
    {
      id: '3',
      titulo: 'Introducción al Marketing Digital',
      descripcion: 'Conoce los fundamentos del marketing digital para aplicar en tu negocio.',
      instructorId: 'instructor-03',
      categoria: 'Marketing',
      duracion: 30,
      precio: 80,
      capacidad: 15,
      inscritos: 0,
      estado: EstadoCurso.BORRADOR,
      fechaInicio: new Date('2025-03-01'),
    },
    {
      id: '4',
      titulo: 'Curso de Python para Principiantes',
      descripcion: 'Una guía paso a paso para aprender Python y sus aplicaciones.',
      instructorId: 'instructor-04',
      categoria: 'Tecnología',
      duracion: 60,
      precio: 150,
      capacidad: 30,
      inscritos: 0,
      estado: EstadoCurso.PUBLICADO,
      fechaInicio: new Date('2025-04-01'),
    },
    {
      id: '5',
      titulo: 'Curso de Gestión de Proyectos',
      descripcion: 'Aprende las mejores prácticas en gestión de proyectos con ejemplos reales.',
      instructorId: 'instructor-05',
      categoria: 'Negocios',
      duracion: 35,
      precio: 110,
      capacidad: 20,
      inscritos: 0,
      estado: EstadoCurso.FINALIZADO,
      fechaInicio: new Date('2025-05-01'),
    },
    {
      id: '6',
      titulo: 'Curso de Desarrollo Web Full Stack',
      descripcion: 'Un curso completo para convertirte en un desarrollador Full Stack.',
      instructorId: 'instructor-06',
      categoria: 'Tecnología',
      duracion: 70,
      precio: 200,
      capacidad: 40,
      inscritos: 0,
      estado: EstadoCurso.PUBLICADO,
      fechaInicio: new Date('2025-06-01'),
    },
    {
      id: '7',
      titulo: 'Curso de Finanzas Personales',
      descripcion: 'Domina las finanzas personales y aprende a gestionar tu dinero de manera eficiente.',
      instructorId: 'instructor-07',
      categoria: 'Finanzas',
      duracion: 25,
      precio: 90,
      capacidad: 15,
      inscritos: 0,
      estado: EstadoCurso.BORRADOR,
      fechaInicio: new Date('2025-07-01'),
    },
    {
      id: '8',
      titulo: 'Curso de Diseño Gráfico con Photoshop',
      descripcion: 'Curso completo para aprender a usar Photoshop en el diseño gráfico profesional.',
      instructorId: 'instructor-08',
      categoria: 'Diseño',
      duracion: 45,
      precio: 130,
      capacidad: 25,
      inscritos: 0,
      estado: EstadoCurso.EN_CURSO,
      fechaInicio: new Date('2025-08-01'),
    },
    {
      id: '9',
      titulo: 'Curso de Liderazgo y Gestión de Equipos',
      descripcion: 'Aprende a liderar y gestionar equipos de trabajo de manera eficaz.',
      instructorId: 'instructor-09',
      categoria: 'Negocios',
      duracion: 50,
      precio: 140,
      capacidad: 30,
      inscritos: 0,
      estado: EstadoCurso.FINALIZADO,
      fechaInicio: new Date('2025-09-01'),
    },
    {
      id: '10',
      titulo: 'Curso de Inteligencia Artificial',
      descripcion: 'Conoce los conceptos fundamentales de la inteligencia artificial y cómo aplicarlos.',
      instructorId: 'instructor-10',
      categoria: 'Tecnología',
      duracion: 60,
      precio: 160,
      capacidad: 35,
      inscritos: 0,
      estado: EstadoCurso.PUBLICADO,
      fechaInicio: new Date('2025-10-01'),
    },
  ];

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

  crearCurso(data: Omit<Curso, 'inscritos'>): Curso {
    if (!data.titulo || data.titulo.length < 5) throw new BadRequestException('Título inválido');
    if (!data.descripcion || data.descripcion.length < 20) throw new BadRequestException('Descripción inválida');
    if (!data.instructorId) throw new BadRequestException('Instructor requerido');
    if (!data.categoria) throw new BadRequestException('Categoría requerida');
    if (data.duracion < 1) throw new BadRequestException('Duración inválida');
    if (data.precio < 0) throw new BadRequestException('Precio inválido');
    if (data.capacidad < 5) throw new BadRequestException('Capacidad mínima de 5');

    // Asignación del id manualmente
    const nuevo: Curso = {
      ...data,
      id: data.id, // El ID es proporcionado por el usuario
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
