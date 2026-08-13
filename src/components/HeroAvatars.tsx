const AVATARES = [
  { img: "https://i.pravatar.cc/160?img=12", top: "6%", left: "5%", size: 84, delay: "0s", rotate: "-6deg", ring: "ring-coral-400" },
  { img: "https://i.pravatar.cc/160?img=32", top: "60%", left: "2%", size: 66, delay: "1.2s", rotate: "4deg", ring: "ring-brand-300" },
  { img: "https://i.pravatar.cc/160?img=47", top: "10%", left: "88%", size: 72, delay: "0.6s", rotate: "5deg", ring: "ring-gold-400" },
  { img: "https://i.pravatar.cc/160?img=5", top: "64%", left: "90%", size: 92, delay: "1.8s", rotate: "-4deg", ring: "ring-coral-400" },
];

export default function HeroAvatars() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      {AVATARES.map((a, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{ top: a.top, left: a.left, animationDelay: a.delay, transform: `rotate(${a.rotate})` }}
        >
          <img
            src={a.img}
            alt=""
            width={a.size}
            height={a.size}
            className={`rounded-3xl border-[5px] border-white shadow-xl shadow-black/15 object-cover ring-2 ${a.ring}`}
            style={{ width: a.size, height: a.size }}
          />
        </div>
      ))}
      {/* insignia de calificación flotante */}
      <div
        className="absolute animate-float bg-white rounded-2xl shadow-xl shadow-black/15 px-4 py-2.5 flex items-center gap-2"
        style={{ top: "36%", left: "87%", animationDelay: "0.3s" }}
      >
        <span className="text-gold-500 text-base">★★★★★</span>
        <span className="text-sm font-bold text-ink/80">4.9/5</span>
      </div>
    </div>
  );
}
