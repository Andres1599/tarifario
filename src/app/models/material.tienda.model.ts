import { Materiales } from "./material.model";
import { Monedas } from "./moneda.model";
import { Tiendas } from "./tienda.model";

export interface MaterialesTienda {
    id?: number;
    dimension?: string;
    url_imagen?: string;
    cantidad?: number;
    precio?: number;
    fk_id_material?: number;
    fk_id_tienda?: number;
    fk_id_moneda?: number;
    materiale?: Materiales;
    moneda?: Monedas;
    tienda?: Tiendas;
}