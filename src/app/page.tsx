import Link from "next/link";
import { ArrowRight, Brain, Users, MapPin, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-bg/85 backdrop-blur-xl border-b border-border">
        <span className="font-serif text-xl text-accent">JUNTO</span>
        <span className="text-xs text-text-dim tracking-wider">
          Denver, CO · 2026
        </span>
      </nav>

      {/* Hero */}
      <section className="flex flex-col justify-center min-h-screen px-6 pt-20">
        <div className="max-w-2xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-dim border border-accent-border rounded-full text-xs font-medium tracking-wider uppercase text-accent mb-8">
            <Sparkles size={14} />
            Pre-MVP · Invitación privada
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl sm:text-7xl leading-[1.05] mb-4">
            JUNTO
            <br />
            <em className="text-accent italic">
              The Remote
              <br />
              Social Layer
            </em>
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-text-dim italic mb-6">
            Reconectando personas en un mundo que las aísla
          </p>

          <p className="text-text-dim text-base sm:text-lg max-w-xl leading-relaxed mb-10">
            JUNTO conecta trabajadores remotos con personas compatibles para
            trabajar juntos desde cafés, bibliotecas o cualquier espacio
            compartido. No scrolleás perfiles — la app te recomienda personas
            que realmente van a hacer tu día mejor.
          </p>

          {/* CTA */}
          <Link
            href="/home"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Empezar
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Features preview */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto w-full grid gap-4">
          <FeatureCard
            icon={<Brain size={20} className="text-accent" />}
            iconBg="bg-accent-dim"
            title="Tu cerebro necesita compañía"
            description="Las interacciones cara a cara generan 9x más conexión cerebral que Zoom. JUNTO te devuelve lo que la pantalla te quitó."
          />
          <FeatureCard
            icon={<Users size={20} className="text-teal" />}
            iconBg="bg-teal-dim"
            title="La app recomienda, vos elegís"
            description="Sin swipe, sin galería de fotos. 3-5 personas curadas con una explicación de por qué van a conectar."
          />
          <FeatureCard
            icon={<MapPin size={20} className="text-coral" />}
            iconBg="bg-coral-dim"
            title="Tu ciudad como ecosistema"
            description="Descubrí cafés, bibliotecas y espacios donde otros trabajan. Denver deja de ser donde dormís y se convierte en tu red."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border">
        <p className="text-center text-xs text-text-muted">
          JUNTO · Pre-MVP · Denver, Colorado · 2026
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-surface border border-border rounded-2xl hover:-translate-y-0.5 transition-transform">
      <div
        className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <p className="text-sm text-text-dim leading-relaxed">{description}</p>
    </div>
  );
}
