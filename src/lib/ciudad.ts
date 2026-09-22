// El campo "ciudad" de cada proveedor es texto libre (lo escribe la
// persona al crear su perfil), no viene de una lista fija. Para poder
// armar URLs limpias como /profesionales/desarrollo-web/bogota, esto
// convierte cualquier texto de ciudad en un "slug" (minusculas, sin
// tildes, con guiones) de forma consistente en todo el proyecto.
export function slugificarCiudad(ciudad: string): string {
  return ciudad
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
