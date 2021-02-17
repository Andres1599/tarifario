import { ArrendamientoMateriales } from "./arrendamiento.material.model";
import { Estados } from "./estado.model";
import { Monedas } from "./moneda.model";
import { Proveedores } from "./proveedor.model";
import { Tiendas } from "./tienda.model";
import { Usuarios } from "./usuario.model";

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
    fk_id_tienda?: number;
    arrendamientos_materiales?: ArrendamientoMateriales[];
    estado?: Estados;
    moneda?: Monedas;
    proveedore?: Proveedores;
    usuario?: Usuarios;
    tienda?: Tiendas;
}