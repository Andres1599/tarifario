export interface Arrendamientos {
    id?: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    fecha?: Date;
    total?: number;
    fk_id_estado?: number;
    fk_id_usuario?: number;
    fk_id_proveedor?: number;
    fk_id_moneda?: number;
}