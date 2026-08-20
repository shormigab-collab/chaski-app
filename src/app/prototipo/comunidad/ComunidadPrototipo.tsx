"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Send, Info, Sparkles, ArrowLeft } from "lucide-react";

type Comentario = { id: string; autor: string; texto: string };

type Post = {
  id: string;
  autor: string;
  titulo: string;
  inicial: string;
  banda: string; // clases de degradado para el avatar
  tiempo: string;
  contenido: string;
  tarjeta?: { titulo: string; meta: string; banda: string };
  likes: number;
  meGusta: boolean;
  comentarios: Comentario[];
  comentariosAbiertos: boolean;
};

const BANDAS = [
  "from-brand-400 to-brand-600",
  "from-coral-400 to-coral-600",
  "from-gold-400 to-coral-500",
  "from-brand-400 to-coral-500",
];

const POSTS_INICIALES: Post[] = [
  {
    id: "1",
    autor: "María José G.",
    titulo: "Estratega de Contenido · Bogotá",
    inicial: "M",
    banda: BANDAS[0],
    tiempo: "3 h",
    contenido:
      "Acabo de publicar un artículo sobre cómo crear una estrategia de contenido que conecte de verdad con tu audiencia. ¡Me encantaría saber qué opinan!",
    tarjeta: { titulo: "Estrategia de contenido que genera resultados", meta: "8 min de lectura", banda: BANDAS[0] },
    likes: 24,
    meGusta: false,
    comentarios: [
      { id: "c1", autor: "Julián R.", texto: "Excelente, justo lo que necesitaba leer hoy." },
      { id: "c2", autor: "Cami T.", texto: "¿Tienes plantilla para esto? 👀" },
    ],
    comentariosAbiertos: false,
  },
  {
    id: "2",
    autor: "Andrés F.",
    titulo: "Desarrollador Web · Medellín",
    inicial: "A",
    banda: BANDAS[1],
    tiempo: "6 h",
    contenido:
      "Terminé de migrar el e-commerce de un cliente a Next.js — la velocidad de carga bajó de 4.2s a 0.9s. Si tienes una tienda lenta, hablemos.",
    likes: 41,
    meGusta: false,
    comentarios: [{ id: "c3", autor: "Valentina R.", texto: "Impresionante esa mejora 🔥" }],
    comentariosAbiertos: false,
  },
  {
    id: "3",
    autor: "Sofía L.",
    titulo: "Diseñadora de Marca · Ciudad de México",
    inicial: "S",
    banda: BANDAS[2],
    tiempo: "1 d",
    contenido:
      "Nuevo proyecto de branding para una marca de café en lanzamiento 🌱☕ Les comparto una vista del sistema de identidad que armamos.",
    tarjeta: { titulo: "Identidad visual — Café Origen", meta: "Proyecto de branding", banda: BANDAS[2] },
    likes: 58,
    meGusta: false,
    comentarios: [],
    comentariosAbiertos: false,
  },
];

export default function ComunidadPrototipo() {
  const [posts, setPosts] = useState<Post[]>(POSTS_INICIALES);
  const [nuevoPost, setNuevoPost] = useState("");
  const [comentarioBorrador, setComentarioBorrador] = useState<Record<string, string>>({});

  function toggleLike(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, meGusta: !p.meGusta, likes: p.likes + (p.meGusta ? -1 : 1) } : p))
    );
  }

  function toggleComentarios(id: string) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, comentariosAbiertos: !p.comentariosAbiertos } : p)));
  }

  function publicarComentario(id: string) {
    const texto = (comentarioBorrador[id] || "").trim();
    if (!texto) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, comentarios: [...p.comentarios, { id: `c-${Date.now()}`, autor: "Tú", texto }] }
          : p
      )
    );
    setComentarioBorrador((prev) => ({ ...prev, [id]: "" }));
  }

  function publicarPost() {
    const texto = nuevoPost.trim();
    if (!texto) return;
    const nuevo: Post = {
      id: `p-${Date.now()}`,
      autor: "Tú",
      titulo: "Tu perfil profesional",
      inicial: "T",
      banda: BANDAS[3],
      tiempo: "justo ahora",
      contenido: texto,
      likes: 0,
      meGusta: false,
      comentarios: [],
      comentariosAbiertos: false,
    };
    setPosts((prev) => [nuevo, ...prev]);
    setNuevoPost("");
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-4">
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver a chaski
        </Link>

        <div className="flex items-start gap-2.5 bg-brand-50 border border-brand-100 rounded-2xl px-4 py-3.5 mb-6">
          <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <p className="text-xs text-brand-700 leading-relaxed">
            <span className="font-bold">Prototipo de prueba.</span> Nada de lo que hagas aquí se guarda — al
            recargar la página, todo vuelve a su estado inicial. Es solo para explorar cómo se sentiría una
            &ldquo;Comunidad&rdquo; dentro de chaski.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-brand-600 bg-white border border-brand-100 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            COMUNIDAD
          </span>
        </div>

        {/* Composer */}
        <div className="bg-white border border-black/5 rounded-2xl p-4 mb-5">
          <div className="flex gap-3">
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-coral-500 text-white flex items-center justify-center font-bold shrink-0">
              T
            </span>
            <div className="flex-1">
              <textarea
                value={nuevoPost}
                onChange={(e) => setNuevoPost(e.target.value)}
                placeholder="Comparte una novedad, un proyecto terminado o un consejo..."
                rows={2}
                className="w-full text-sm border border-black/10 rounded-xl px-3.5 py-2.5 outline-none focus:border-brand-500 transition-colors resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={publicarPost}
                  disabled={!nuevoPost.trim()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-black/5 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.banda} text-white flex items-center justify-center font-bold shrink-0`}
                >
                  {post.inicial}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-ink text-sm truncate">{post.autor}</p>
                  <p className="text-xs text-ink/45 truncate">
                    {post.titulo} · {post.tiempo}
                  </p>
                </div>
              </div>

              <p className="text-ink/80 text-sm leading-relaxed mb-3">{post.contenido}</p>

              {post.tarjeta && (
                <div className="flex items-center gap-3 border border-black/10 rounded-xl p-3 mb-3">
                  <span
                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${post.tarjeta.banda} shrink-0`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{post.tarjeta.titulo}</p>
                    <p className="text-xs text-ink/45">{post.tarjeta.meta}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    post.meGusta ? "text-coral-600" : "text-ink/50 hover:text-coral-600"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.meGusta ? "fill-coral-500 text-coral-500" : ""}`} strokeWidth={1.75} />
                  {post.likes}
                </button>
                <button
                  type="button"
                  onClick={() => toggleComentarios(post.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/50 hover:text-brand-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                  {post.comentarios.length}
                </button>
                {post.autor !== "Tú" && (
                  <Link
                    href="/registro/cliente"
                    className="ml-auto text-xs font-semibold bg-brand-50 text-brand-600 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors"
                  >
                    Solicitar sus servicios
                  </Link>
                )}
              </div>

              {post.comentariosAbiertos && (
                <div className="mt-4 pt-4 border-t border-black/5 space-y-3">
                  {post.comentarios.map((c) => (
                    <div key={c.id} className="flex gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-lavender text-brand-600 flex items-center justify-center text-xs font-bold shrink-0">
                        {c.autor.charAt(0)}
                      </span>
                      <div className="bg-lavender/60 rounded-xl px-3 py-2 text-xs">
                        <span className="font-semibold text-ink">{c.autor}</span>{" "}
                        <span className="text-ink/70">{c.texto}</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      value={comentarioBorrador[post.id] || ""}
                      onChange={(e) => setComentarioBorrador((prev) => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && publicarComentario(post.id)}
                      placeholder="Escribe un comentario..."
                      className="flex-1 text-xs border border-black/10 rounded-lg px-3 py-2 outline-none focus:border-brand-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => publicarComentario(post.id)}
                      className="text-xs font-semibold text-brand-600 px-3 hover:text-brand-700"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-ink/35">— fin del feed de prueba —</p>
        </div>
      </div>
    </div>
  );
}
