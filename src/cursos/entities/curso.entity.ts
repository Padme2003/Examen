export enum EstadoCurso {
    BORRADOR = 'borrador',
    PUBLICADO = 'publicado',
    EN_CURSO = 'en_curso',
    FINALIZADO = 'finalizado',
  }
  
  export class Curso {
    id: string;
    titulo: string;
    descripcion: string;
    instructorId: string;
    categoria: string;
    duracion: number;
    precio: number;
    capacidad: number;
    inscritos: number;
    estado: EstadoCurso;
    fechaInicio: Date;
}
  