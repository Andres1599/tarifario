export interface MaterialesTienda {
    id?: number;
    dimension?: string;
    url_imagen?: string;
    cantidad?: number;
    precio?: number;
    fk_id_material?: number;
    fk_id_tienda?: number;
    fk_id_moneda?: number;
}