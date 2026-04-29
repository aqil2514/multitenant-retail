/** * Menampung nilai dasar yang valid dalam JSON
 */
export type Primitive = string | number | boolean | null | undefined;

/**
 * Menampung struktur objek atau array yang isinya adalah Primitive.
 * Tipe ini bersifat rekursif.
 */
export type JsonValue = Primitive | { [key: string]: JsonValue } | JsonValue[];

/**
 * Versi spesifik untuk objek (Record)
 */
export type JsonObject = Record<string, JsonValue>;
