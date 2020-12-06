import { MaterialesTienda } from "./material.tienda.model";

export interface ArrendamientoMateriales {
    id?: number;
    observacion?: string;
    cantidad?: number;
    precio?: number;
    fk_id_material_tienda?: number;
    fk_id_arrendamiento?: number;
    materiales_tienda?: MaterialesTienda;
};
