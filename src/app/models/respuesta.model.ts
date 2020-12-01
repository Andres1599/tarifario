export interface Respuesta<T> {
    ok: boolean;
    message: string;
    error: any;
    data: T
};
