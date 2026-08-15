import {
  Globe,
  Receipt,
  BookOpenText,
  Smartphone,
  Search,
  Rocket,
  Users,
  Briefcase,
  Target,
  Palette,
  Calculator,
  Megaphone,
  Code2,
  Monitor,
  TrendingUp,
  PenLine,
  Languages,
  Mic,
  MessagesSquare,
  Wrench,
  PenTool,
  Tag,
  Clapperboard,
  Box,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

// Mapa de slug de categoría -> ícono. Reemplaza los emojis por un set de
// íconos consistente (mismo grosor de línea, mismo estilo) en vez de
// depender del renderizado de emoji del sistema operativo (que varía y
// se ve poco profesional, tipo WhatsApp).
const ICONOS: Record<string, LucideIcon> = {
  "asistente-virtual": ListChecks,
  "diseno-web": Globe,
  impuestos: Receipt,
  "teneduria-libros": BookOpenText,
  "marketing-redes": Smartphone,
  seo: Search,
  "apps-moviles": Rocket,
  "consultoria-rrhh": Users,
  "consultoria-empresarial": Briefcase,
  coaching: Target,
  "diseno-grafico": Palette,
  contabilidad: Calculator,
  "agencias-marketing": Megaphone,
  "desarrollo-web": Code2,
  "desarrollo-software": Monitor,
  "publicidad-digital": TrendingUp,
  copywriting: PenLine,
  traduccion: Languages,
  transcripcion: Mic,
  "clases-idiomas": MessagesSquare,
  "soporte-tecnico": Wrench,
  "diseno-logos": PenTool,
  branding: Tag,
  animacion: Clapperboard,
  "modelado-3d": Box,
};

export default function CategoryIcon({
  slug,
  className = "w-5 h-5",
}: {
  slug: string;
  className?: string;
}) {
  const Icon = ICONOS[slug] ?? Briefcase;
  return <Icon className={className} strokeWidth={1.75} />;
}
