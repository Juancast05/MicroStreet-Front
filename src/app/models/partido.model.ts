export interface Partido {
    id?: number;
    creadorCorreo?: string; 
    titulo: string;
    lugar: string;
    fechaHora: string;
    cuposDisponibles: number;
    descripcion: string;
}