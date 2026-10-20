// Limitador simple por IP en memoria. En Vercel cada instancia tiene su
// propia memoria, asi que no es perfecto, pero frena el abuso casual
// (por ejemplo un bot que llama al chat de IA cientos de veces).
const registros = new Map<string, number[]>();

export function limitarPorIp(clave: string, max: number, ventanaMs: number): boolean {
  const ahora = Date.now();
  const recientes = (registros.get(clave) ?? []).filter((t) => ahora - t < ventanaMs);
  if (recientes.length >= max) {
    registros.set(clave, recientes);
    return false; // excedio el limite
  }
  recientes.push(ahora);
  registros.set(clave, recientes);
  if (registros.size > 5000) {
    // limpieza para que el mapa no crezca sin fin
    registros.forEach((v, k) => {
      if (v.every((t) => ahora - t >= ventanaMs)) registros.delete(k);
    });
  }
  return true;
}
