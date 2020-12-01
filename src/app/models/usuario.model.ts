export interface Usuarios {
    id?: number;
    nombre?: string;
    apellido?: string;
    correo?: string;
    password?: string;
    estado?: boolean;
    fk_id_tipo_usuario?: number;
}