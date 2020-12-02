import { TipoMateriales } from "./tipo.material.model";

export interface Materiales {
    id?: number;
    material?: string;
    fk_id_tipo_material?: number;
    tipo_materiale?: TipoMateriales;
}