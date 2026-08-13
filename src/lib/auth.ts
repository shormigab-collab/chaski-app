import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-cambia-esto";
const COOKIE_NAME = "sesion_token";

export type SessionPayload = {
  userId: string;
  role: "CLIENTE" | "PROVEEDOR" | "ADMIN";
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function crearToken(payload: SessionPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verificarToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function crearSesion(payload: SessionPayload) {
  const token = crearToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function cerrarSesion() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function obtenerSesion(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verificarToken(token);
}

export async function obtenerUsuarioActual() {
  const sesion = await obtenerSesion();
  if (!sesion) return null;
  const usuario = await prisma.user.findUnique({
    where: { id: sesion.userId },
    include: { proveedor: true },
  });
  if (!usuario) return null;
  // Prisma tipa "role" como string generico (no como union literal) porque
  // en el schema lo guardamos como String en vez de enum. Aqui lo tipamos
  // de vuelta para que el resto de la app lo use con seguridad de tipos.
  return { ...usuario, role: usuario.role as SessionPayload["role"] };
}
