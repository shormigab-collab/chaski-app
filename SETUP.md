# chaski — Guía de lanzamiento paso a paso

Este proyecto es un marketplace de servicios (como Bark) con sistema de créditos,
pensado para Latinoamérica. Sigue estos pasos en orden. No necesitas saber programar
para completarlos — son en su mayoría clics en páginas web.

## 0. Qué tienes en este momento

Tienes el código fuente completo de la aplicación (registro, login, publicar
solicitudes, explorar y desbloquear contactos con créditos, compra de créditos vía
Mercado Pago, panel de administración). Lo que falta son las "llaves" de los
servicios donde va a vivir: hosting, base de datos, pagos y dominio.

## 1. Instala las herramientas base (una sola vez)

1. Instala Node.js (versión 20 o superior) desde https://nodejs.org
2. Instala Visual Studio Code (opcional pero recomendado) desde https://code.visualstudio.com
3. Crea una cuenta gratis en GitHub: https://github.com/signup

## 2. Prueba la app en tu computadora

1. Descomprime este proyecto en una carpeta.
2. Abre una terminal dentro de esa carpeta y ejecuta:
   ```
   npm install
   cp .env.example .env
   npx prisma db push
   npm run seed
   npm run dev
   ```
3. Abre http://localhost:3000 en tu navegador. Ya deberías ver la página funcionando
   con categorías de ejemplo.
4. Con el correo y contraseña que se imprimieron en la terminal al correr `npm run seed`
   puedes entrar como administrador en /login.

Si `npm install` o `npm run dev` muestran un error, cópialo y compártemelo — lo
resolvemos juntos aunque no sepas programar.

## 3. Sube el código a GitHub

1. Crea un repositorio nuevo (privado) en https://github.com/new
2. Sigue las instrucciones que GitHub te muestra para "push an existing repository"
   (son 3-4 comandos de terminal que GitHub te da copiados y listos para pegar).

## 4. Crea la base de datos real (Postgres)

SQLite (lo que usas en tu computadora) no funciona en producción. Usa una de estas
opciones gratuitas:

- **Supabase** (recomendado): https://supabase.com → crea un proyecto → Settings →
  Database → copia el "Connection string" (modo "Transaction pooler").
- **Neon**: https://neon.tech → crea un proyecto → copia el "Connection string".

Guarda esa URL, la necesitas en el paso 6.

## 5. Crea tu cuenta de Mercado Pago para desarrolladores

1. Entra a https://www.mercadopago.com/developers/panel
2. Crea una aplicación nueva.
3. Copia el "Access Token" y la "Public Key" (usa primero las de **prueba/test**
   para verificar que todo funciona antes de activar las de producción).

## 6. Despliega en Vercel (gratis)

1. Crea cuenta en https://vercel.com usando tu cuenta de GitHub.
2. Haz clic en "Add New Project" e importa el repositorio que subiste en el paso 3.
3. En "Environment Variables" agrega:
   - `DATABASE_URL` → la URL de Postgres del paso 4 (cambia también en
     `prisma/schema.prisma` el `provider` de `"sqlite"` a `"postgresql"` antes de
     subir el código, o pídeme que lo haga por ti)
   - `JWT_SECRET` → cualquier texto largo y aleatorio
   - `MERCADOPAGO_ACCESS_TOKEN` → el del paso 5
   - `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY` → el del paso 5
   - `NEXT_PUBLIC_BASE_URL` → la URL que te va a asignar Vercel (puedes
     actualizarla después de que despliegue una vez)
4. Haz clic en "Deploy". Vercel instala todo y compila el proyecto automáticamente
   (esto es lo que yo no pude hacer en mi entorno de trabajo, por eso es clave
   este paso).
5. Cuando termine, entra al link que te da Vercel para inicializar la base de
   datos con las categorías: en tu computadora, con el `.env` apuntando a la
   base de datos de producción, corre `npx prisma db push && npm run seed`.

## 7. Conecta tu dominio propio

1. Compra un dominio (ej. en Namecheap, GoDaddy o Google Domains) — para
   Latinoamérica evita marcas registradas y busca algo corto memorable.
2. En Vercel: Project → Settings → Domains → agrega tu dominio y sigue las
   instrucciones para apuntar los DNS (Vercel te da los registros exactos que
   debes copiar a tu proveedor de dominio).

## 8. Activa Mercado Pago en modo real

Cuando ya probaste todo el flujo de compra de créditos con las credenciales de
**prueba**, reemplaza `MERCADOPAGO_ACCESS_TOKEN` y la llave pública por las de
**producción** en Vercel (Settings → Environment Variables) y vuelve a desplegar.

## Qué sigue después de esto

- Moderar manualmente los primeros perfiles de proveedores (verifícalos a mano
  al inicio, antes de automatizarlo).
- Conseguir tus primeros 20-30 proveedores en 2-3 categorías antes de abrir
  al público — sin oferta no hay demanda que se quede.
- Pedirme ajustes al código en cualquier momento: agregar reseñas visibles,
  notificaciones por WhatsApp/email, más categorías, etc.
