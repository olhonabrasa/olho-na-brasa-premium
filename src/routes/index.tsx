import React, { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Hammer,
  Image as ImageIcon,
  Maximize2,
  Search,
  ShoppingCart,
  Star,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PhotoUpload } from "@/components/PhotoUpload";
import { WhatsappChatSimulado } from "@/components/WhatsappChatSimulado";
import { sendLeadToDataCrazy } from "@/lib/sendLead";
import { cn } from "@/lib/utils";
import beforeProjectAsset from "@/assets/olho-na-brasa-antes-1.jpg.asset.json";
import afterProjectAsset from "@/assets/olho-na-brasa-depois-1.jpg.asset.json";
import processCutAsset from "@/assets/processo-corte-inox.jpg.asset.json";
import processWeldAsset from "@/assets/processo-solda-especializada.jpg.asset.json";
import processPolishAsset from "@/assets/processo-polimento.png.asset.json";
import processAssemblyAsset from "@/assets/processo-montagem.jpg.asset.json";
import processInspectionAsset from "@/assets/processo-inspecao-qualidade.jpg.asset.json";
import processPackagingAsset from "@/assets/processo-embalagem-segura.png.asset.json";
import videoHeadlineAsset from "@/assets/video-headline.mp4.asset.json";
import fabricaVideo from "@/assets/fabrica.mp4.asset.json";
import kitCompletoAsset from "@/assets/kit-completo.png.asset.json";
import suporteSuspensoAsset from "@/assets/suporte-suspenso.png.asset.json";


import card1Antes from "@/assets/card1-antes.jpg.asset.json";
import card1Depois from "@/assets/card1-depois.jpg.asset.json";
import card2Antes from "@/assets/card2-antes.jpg.asset.json";
import card2Depois from "@/assets/card2-depois.jpg.asset.json";
import card3Antes from "@/assets/card3-antes.jpg.asset.json";
import card3Depois from "@/assets/card3-depois.jpg.asset.json";
import projeto1 from "@/assets/projeto-instalado-1.jpg.asset.json";
import projeto2 from "@/assets/projeto-instalado-2.jpg.asset.json";
import projeto3 from "@/assets/projeto-instalado-3.jpg.asset.json";
import projeto4 from "@/assets/projeto-instalado-4.png.asset.json";
import projeto5 from "@/assets/projeto-instalado-5.jpg.asset.json";
import projeto6 from "@/assets/projeto-instalado-6.jpg.asset.json";
import rodrigoMedidasVideo from "@/assets/rodrigo-medidas.mp4.asset.json";
import logoOlhoNaBrasa from "@/assets/logo-olho-na-brasa.png.asset.json";
import card5Antes from "@/assets/card5-antes.png.asset.json";
import card5Depois from "@/assets/card5-depois.jpg.asset.json";
import antesNovo from "@/assets/antes-novo.jpeg.asset.json";
import depoisNovo from "@/assets/depois-novo.png.asset.json";
import kitRevestimento4 from "@/assets/kit-revestimento-4.png.asset.json";
import videoCliente1 from "@/assets/video-cliente-1.mp4.asset.json";
import videoCliente2 from "@/assets/video-cliente-2.mp4.asset.json";
import videoCliente3 from "@/assets/video-cliente-3.mp4.asset.json";
import videoCliente4 from "@/assets/video-cliente-4.mp4.asset.json";
import videoCliente5 from "@/assets/video-cliente-5.mp4.asset.json";
import posterCliente1 from "@/assets/poster-cliente-1.jpg.asset.json";
import posterCliente2 from "@/assets/poster-cliente-2.jpg.asset.json";
import posterCliente3 from "@/assets/poster-cliente-3.jpg.asset.json";
import posterCliente4 from "@/assets/poster-cliente-4.jpg.asset.json";
import posterCliente5 from "@/assets/poster-cliente-5.jpg.asset.json";
import { Play } from "lucide-react";

declare global {
  // eslint-disable-next-line no-var
  var fbq: ((...args: unknown[]) => void) | undefined;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kit Premium para Churrasqueira | Inox 304 Sob Medida | Olho na Brasa" },
      {
        name: "description",
        content:
          "Grelha e kit completo em inox 304 para sua churrasqueira. Sob medida, direto da fábrica, com 15 anos de garantia. Frete grátis Sul e Sudeste.",
      },
      { property: "og:title", content: "Kit Premium para Churrasqueira | Inox 304 Sob Medida | Olho na Brasa" },
      {
        property: "og:description",
        content:
          "Grelha e kit completo em inox 304 para sua churrasqueira. Sob medida, direto da fábrica, com 15 anos de garantia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: afterProjectAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kit Premium para Churrasqueira | Olho na Brasa" },
      {
        name: "twitter:description",
        content: "Projeto sob medida em inox 304, direto da fábrica com 15 anos de garantia.",
      },
      { name: "twitter:image", content: afterProjectAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

type ModalStage = "stage" | "projectType" | "photo" | "contact" | "path";
type ProjectMoment = "obra" | "pronta" | null;
type ProjectType = "kit" | "suporte" | null;

const projectMomentLabels: Record<NonNullable<ProjectMoment>, string> = {
  obra: "Estou construindo ou reformando minha churrasqueira",
  pronta: "Já tenho a churrasqueira pronta, só falta o kit",
};

type ContactForm = {
  name: string;
  whatsapp: string;
  city: string;
  state: string;
  email: string;
  photoUrl: string;
};


type RevealProps = {
  id?: string;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  children: ReactNode;
  style?: React.CSSProperties;
  glow?: boolean;
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

type ProcessStep = { number: string; title: string; description: string; image: string; alt: string };
type GalleryItem = { title: string; location: string; image?: string; alt: string; featured?: boolean };
type BeforeAfterPair = {
  before: string;
  after: string;
  title: string;
  subtitle: string;
  beforeAlt: string;
  afterAlt: string;
};

const WHATSAPP_URL = "https://wa.me/554740420956";
const SITE_URL = "https://www.olhonabrasa.com.br";
const KITS_URL = "https://www.olhonabrasa.com.br/kits-premium/";
const INSTAGRAM_URL = "https://www.instagram.com/olhonabrasa/";

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Corte do Inox",
    description: "Chapas de Inox 304 cortadas com precisão milimétrica.",
    image: processCutAsset.url,
    alt: "Corte preciso de peças em inox 304 com faíscas na fábrica",
  },
  {
    number: "02",
    title: "Solda especializada",
    description: "Solda TIG por profissionais certificados. Acabamento limpo e resistente.",
    image: processWeldAsset.url,
    alt: "Solda especializada em estrutura de inox",
  },
  {
    number: "03",
    title: "Polimento",
    description: "Acabamento escovado premium. Brilho que dura anos sem desbotar.",
    image: processPolishAsset.url,
    alt: "Polimento do inox com acabamento premium",
  },
  {
    number: "04",
    title: "Montagem",
    description: "Cada peça é montada e testada manualmente antes da embalagem.",
    image: processAssemblyAsset.url,
    alt: "Montagem manual de estrutura em inox",
  },
  {
    number: "05",
    title: "Inspeção de qualidade",
    description: "Verificação final de medidas, acabamento e resistência.",
    image: processInspectionAsset.url,
    alt: "Equipe conferindo qualidade final do kit",
  },
  {
    number: "06",
    title: "Embalagem segura",
    description: "Embalagem reforçada para transporte. Seu kit chega intacto.",
    image: processPackagingAsset.url,
    alt: "Kit embalado com proteção reforçada",
  },
];

const beforeAfterPairs: BeforeAfterPair[] = [
  {
    before: antesNovo.url,
    after: depoisNovo.url,
    title: "Churrasqueira em granito, renovada com Kit Premium",
    subtitle: "Saiu o ferro velho enferrujado, entrou suporte suspenso e grelhas em inox 304 espelhado.",
    beforeAlt: "Churrasqueira em granito com grelhas e suportes enferrujados",
    afterAlt: "Mesma churrasqueira com Kit Premium Olho na Brasa em inox 304 instalado",
  },
  {
    before: card5Antes.url,
    after: card5Depois.url,
    title: "Churrasqueira de tijolo refratário, transformada com inox 304",
    subtitle: "Saiu o ferro enferrujado, entrou suporte suspenso premium com acabamento espelhado.",
    beforeAlt: "Churrasqueira de tijolo refratário com grelhas antigas enferrujadas",
    afterAlt: "Mesma churrasqueira com suporte suspenso Olho na Brasa em inox 304",
  },
  {
    before: card1Antes.url,
    after: card1Depois.url,
    title: "Churrasqueira de alvenaria, com Kit Premium instalado",
    subtitle: "Encaixe perfeito, acabamento espelhado e a percepção premium que só o inox 304 entrega.",
    beforeAlt: "Churrasqueira de alvenaria sem equipamento antes da instalação",
    afterAlt: "Churrasqueira com Kit Premium Olho na Brasa instalado",
  },
  {
    before: card2Antes.url,
    after: card2Depois.url,
    title: "Churrasqueira enferrujada, renovada com grelhas em inox",
    subtitle: "Saiu o ferro velho, entrou inox 304 alimentício com 15 anos de garantia.",
    beforeAlt: "Churrasqueira antiga com grelhas enferrujadas",
    afterAlt: "Mesma churrasqueira com grelhas novas em inox 304",
  },
  {
    before: card3Antes.url,
    after: card3Depois.url,
    title: "Churrasqueira de obra, equipada com suporte suspenso",
    subtitle: "Direto da obra para o padrão gourmet. Tudo sob medida.",
    beforeAlt: "Churrasqueira de obra crua, sem grelhas nem acessórios",
    afterAlt: "Kit completo Olho na Brasa com suporte suspenso instalado",
  },
];

const galleryItems: GalleryItem[] = [
  {
    title: "Acabamento espelhado",
    location: "Revestimento em pedra natural",
    image: kitRevestimento4.url,
    alt: "Kit Olho na Brasa instalado em churrasqueira com revestimento em pedra natural",
    featured: true,
  },
  {
    title: "Kit Premium em ação",
    location: "Carnes na brasa com suporte suspenso",
    image: projeto1.url,
    alt: "Kit premium em inox 304 com carnes assando",
    featured: true,
  },
  {
    title: "Acabamento espelhado",
    location: "Churrasqueira em mármore",
    image: projeto2.url,
    alt: "Kit Olho na Brasa instalado em churrasqueira com moldura em mármore",
  },
  {
    title: "Encaixe perfeito",
    location: "Churrasqueira em tijolo aparente",
    image: projeto3.url,
    alt: "Kit premium em inox instalado em churrasqueira de tijolo",
  },
  {
    title: "Projeto em pedra natural",
    location: "Área gourmet rústica",
    image: projeto4.url,
    alt: "Kit instalado em churrasqueira com revestimento em pedra natural",
  },
  {
    title: "Área gourmet contemporânea",
    location: "Bancada em granito",
    image: projeto5.url,
    alt: "Kit premium em área gourmet contemporânea",
  },
  {
    title: "Nicho premium",
    location: "Projeto residencial",
    image: projeto6.url,
    alt: "Kit instalado em nicho de churrasqueira residencial premium",
  },
];

const faqItems = [
  {
    question: "Como sei se o Kit vai caber na minha churrasqueira?",
    answer:
      "Todos os nossos kits são fabricados sob medida. Você informa as medidas internas da sua churrasqueira (largura e comprimento) e nós fabricamos no tamanho exato. Temos um vídeo com o Rodrigo, dono da fábrica, ensinando como tirar as medidas corretamente.",
  },
  {
    question: "O inox 304 realmente não enferruja?",
    answer:
      "O Inox 304 é o mesmo aço utilizado em equipamentos hospitalares e na indústria alimentícia. Ele resiste a maresia, chuva e uso intenso. Com o cuidado básico, vai durar décadas sem ferrugem, por isso garantimos por 15 anos.",
  },
  {
    question: "Quanto tempo demora a entrega?",
    answer:
      "Como cada kit é fabricado sob medida, o prazo de produção varia. Após a confirmação do pagamento, nosso time informa o prazo atualizado. Frete grátis para Sul e Sudeste.",
  },
  {
    question: "E se eu errar a medida?",
    answer:
      "Nosso time confere as medidas junto com você antes de iniciar a fabricação. Enviamos imagem e vídeo explicando exatamente onde medir.",
  },
  { question: "Posso parcelar?", answer: "Sim! Em até 10x sem juros no cartão. Também temos 5% de desconto no PIX." },
  {
    question: "Como funciona a garantia de 15 anos?",
    answer: "A garantia cobre defeitos de fabricação e falhas de material por 15 anos a partir da data de entrega.",
  },
  {
    question: "Vocês fazem instalação?",
    answer:
      "Sim! Para clientes da Grande Florianópolis e litoral catarinense, oferecemos serviço de instalação com equipe própria.",
  },
  {
    question: "O Kit Premium inclui o quê?",
    answer:
      "Grelha Uruguaia Premium (quadro 6mm, varões 5mm), Grelha de Descanso, Suporte Suspenso e Espetos Duplos de brinde. Tudo em Inox 304 alimentício, sob medida.",
  },
];

const benefits = [
  "Inox 304 alimentício",
  "Sob medida",
  "15 anos de garantia",
  "Frete grátis Sul/Sudeste",
  "★★★★★ 100.000+ churrasqueiras entregues",
  "Acabamento premium",
];

type ClientVideo = { src: string; name: string; caption: string; poster: string };
const clientVideos: ClientVideo[] = [
  {
    src: videoCliente1.url,
    poster: posterCliente1.url,
    name: "Cliente Olho na Brasa",
    caption: "Kit Premium instalado",
  },
  {
    src: videoCliente2.url,
    poster: posterCliente2.url,
    name: "Cliente Olho na Brasa",
    caption: "Reação ao receber o kit",
  },
  {
    src: videoCliente3.url,
    poster: posterCliente3.url,
    name: "Cliente Olho na Brasa",
    caption: "Acabamento em inox 304",
  },
  { src: videoCliente4.url, poster: posterCliente4.url, name: "Cliente Olho na Brasa", caption: "Encaixe sob medida" },
  { src: videoCliente5.url, poster: posterCliente5.url, name: "Cliente Olho na Brasa", caption: "Primeiro churrasco" },
];

function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [modalStage, setModalStage] = useState<ModalStage>("stage");
  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [projectMomentLabel, setProjectMomentLabel] = useState("");
  const [headerVisible, setHeaderVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    title?: string;
    subtitle?: string;
  } | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    whatsapp: "",
    city: "",
    state: "",
    email: "",
    photoUrl: "",
  });

  const schemaMarkup = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          name: "Olho na Brasa",
          image: afterProjectAsset.url,
          telephone: "+55 47 4042-0956",
          url: SITE_URL,
          address: { "@type": "PostalAddress", addressRegion: "SC", addressCountry: "BR" },
          sameAs: [SITE_URL, INSTAGRAM_URL],
          description: "Fábrica de grelhas e acessórios premium em inox 304 sob medida para churrasqueiras.",
        },
        {
          "@type": "Product",
          name: "Kit Premium para Churrasqueira Olho na Brasa",
          brand: { "@type": "Brand", name: "Olho na Brasa" },
          image: [afterProjectAsset.url, beforeProjectAsset.url],
          description: "Kit premium em inox 304 alimentício, sob medida, com 15 anos de garantia.",
          url: KITS_URL,
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    const onScroll = () => setHeaderVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen || chatOpen || lightboxImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen, chatOpen, lightboxImage]);

  const openConsultiveModal = () => {
    setChatOpen(false);
    setModalOpen(true);
    setModalStage("stage");
    setProjectType(null);
    setProjectMomentLabel("");
  };

  const closeConsultiveModal = () => {
    setModalOpen(false);
    setModalStage("stage");
    setProjectType(null);
    setProjectMomentLabel("");
  };

  const openChatSimulado = () => {
    setModalOpen(false);
    setChatOpen(true);
  };

  const formattedWhatsapp = formatWhatsapp(contactForm.whatsapp);

  const cityState = contactForm.state
    ? `${contactForm.city}/${contactForm.state.toUpperCase()}`
    : contactForm.city;

  const specialistMessage = buildWhatsappMessage({
    intro: "Olá! Quero montar meu Kit Premium.",
    form: contactForm,
    projectType,
  });

  const measurementHelpMessage = buildWhatsappMessage({
    intro: "Olá! Quero montar meu Kit Premium, mas preciso de ajuda para definir as medidas da minha churrasqueira.",
    form: contactForm,
    projectType,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      <div className="bg-background text-foreground">
        <StickyHeader visible={headerVisible} />


        <main>
          <HeroSection onOpenModal={openConsultiveModal} />
          <Divider />
          <DifferentialsSection />
          <Divider />
          <BeforeAfterSection onOpenModal={openConsultiveModal} onOpenLightbox={(img) => setLightboxImage(img)} />
          <Divider />
          <ProcessSection onOpenModal={openConsultiveModal} />
          <Divider />
          <GallerySection
            onOpenLightbox={(item) =>
              setLightboxImage({ src: item.image ?? "", alt: item.alt, title: item.title, subtitle: item.location })
            }
            onOpenModal={openConsultiveModal}
          />
          <Divider />
          <ClientVideosSection onOpenModal={openConsultiveModal} />
          <Divider />
          <WhoItsForSection onOpenModal={openConsultiveModal} />
          <Divider />
          <GoogleReviewsSection onOpenModal={openConsultiveModal} />
          <Divider />
          <FaqSection onOpenModal={openConsultiveModal} />
          <Divider />
          <FinalCtaSection onOpenModal={openConsultiveModal} />
        </main>

        <Footer />
        <FloatingWhatsappButton onOpenChat={openChatSimulado} />
      </div>

      <ConsultiveModal
        open={modalOpen}
        stage={modalStage}
        projectType={projectType}
        estagio={projectMomentLabel}
        form={contactForm}
        formattedWhatsapp={formattedWhatsapp}
        cityState={cityState}
        onClose={closeConsultiveModal}
        onMomentSelect={(moment) => {
          setProjectMomentLabel(projectMomentLabels[moment]);
          setModalStage("projectType");
        }}
        onProjectTypeSelect={(type) => {
          setProjectType(type);
          setModalStage("photo");
        }}
        onContinuePhoto={() => setModalStage("contact")}
        onContinueContact={() => setModalStage("path")}
        onChangeField={(field, value) => setContactForm((current) => ({ ...current, [field]: value }))}
        specialistMessage={specialistMessage}
        measurementHelpMessage={measurementHelpMessage}
      />

      <WhatsappChatSimulado
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onSwitchToForm={openConsultiveModal}
      />

      {lightboxImage ? <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> : null}
    </>
  );
}


function Divider() {
  return <hr className="section-divider" aria-hidden="true" />;
}

function StickyHeader({ visible }: { visible: boolean }) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-14 border-b border-white/5 backdrop-blur-xl transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
      style={{ background: "rgb(10 10 10 / 0.9)" }}
    >
      <div className="mx-auto flex h-full max-w-(--container-max) items-center justify-center gap-3 px-5">
        <a href="#top" aria-label="Olho na Brasa — Início" className="flex items-center gap-2">
          <img src={logoOlhoNaBrasa.url} alt="Olho na Brasa" className="h-8 w-auto md:h-9" />
        </a>
      </div>
    </header>
  );
}


/* ===================== HERO ===================== */
function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-background pt-16 pb-8 md:pt-24 md:pb-16">
      <div className="relative z-[3] mx-auto w-full max-w-(--container-max) px-5">
        {/* Vídeo cinematográfico em loop — autoplay muted, com ativação de som */}
        <HeroVideo videoSrc={videoHeadlineAsset.url} />

        {/* Headline abaixo do vídeo */}
        <h1
          className="mt-8 font-display text-foreground"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 7.5vw, 3.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          O Kit de Churrasqueira <span style={{ color: "#FF6B00" }}>mais Vendido do Brasil!</span>
        </h1>

        <p
          className="text-secondary-foreground"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.95rem, 3.5vw, 1.35rem)",
            lineHeight: 1.4,
            letterSpacing: "0.02em",
            color: "#B0B0B0",
            marginTop: "12px",
          }}
        >
          O Kit Suporte Suspenso da <span style={{ color: "#FFFFFF", fontWeight: 600 }}>Olho na Brasa</span>
        </p>

        <BenefitsMarquee />

      </div>
    </section>
  );
}

/* ===================== BENEFITS MARQUEE ===================== */
function BenefitsMarquee() {
  // Duplica a lista para criar loop infinito sem corte
  const items = [...benefits, ...benefits];
  return (
    <div className="marquee-mask mt-6 -mx-5 overflow-hidden md:mx-0">
      <div className="marquee-track flex gap-3 py-1">
        {items.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-black/55 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-md md:text-sm"
          >
            <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===================== ANTES/DEPOIS ===================== */
function BeforeAfterSection({
  onOpenModal,
  onOpenLightbox,
}: {
  onOpenModal: () => void;
  onOpenLightbox: (img: { src: string; alt: string; title?: string; subtitle?: string }) => void;
}) {
  return (
    <RevealSection className="section-alt section-glow">
      <SectionHeading
        eyebrow="TRANSFORMAÇÃO REAL"
        title="Veja o que um Kit Olho na Brasa faz pela sua churrasqueira."
        description="Mais de 100.000 churrasqueiras transformadas em todo o Brasil."
        centered
      />

      <div
        className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {beforeAfterPairs.map((pair) => (
          <article
            key={pair.title}
            className="min-w-[85%] snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:min-w-0"
          >
            <div className="grid grid-cols-2">
              <ExpandableImage
                src={pair.before}
                alt={pair.beforeAlt}
                label="ANTES"
                labelClass="bg-black/70 text-foreground"
                onExpand={() =>
                  onOpenLightbox({ src: pair.before, alt: pair.beforeAlt, title: pair.title, subtitle: "Antes" })
                }
              />
              <ExpandableImage
                src={pair.after}
                alt={pair.afterAlt}
                label="DEPOIS"
                labelClass="bg-primary text-primary-foreground"
                onExpand={() =>
                  onOpenLightbox({ src: pair.after, alt: pair.afterAlt, title: pair.title, subtitle: "Depois" })
                }
              />
            </div>
            <div className="space-y-2 p-5">
              <h3 className="text-base font-semibold text-foreground">{pair.title}</h3>
              <p className="text-sm leading-6 text-secondary-foreground">{pair.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
      
    </RevealSection>
  );
}

function ExpandableImage({
  src,
  alt,
  label,
  labelClass,
  onExpand,
}: {
  src: string;
  alt: string;
  label: string;
  labelClass: string;
  onExpand: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onExpand}
      className="group relative block h-full min-h-[280px] overflow-hidden border-r border-border last:border-r-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Ampliar imagem: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <span
        className={cn(
          "absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] backdrop-blur",
          labelClass,
        )}
      >
        {label}
      </span>
      <span className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-foreground backdrop-blur transition-colors group-hover:bg-black/80">
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}

/* ===================== PROCESSO / FÁBRICA ===================== */
function ProcessSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark section-glow">
      <SectionHeading
        eyebrow="POR DENTRO DA FÁBRICA"
        title="Cada kit passa por dezenas de etapas antes de chegar na sua casa."
      />

      <div className="mx-auto mb-8 flex max-w-(--container-max) flex-col items-center px-5">
        <div className="glass-panel w-full max-w-[360px] overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-[9/16] overflow-hidden bg-black">
            <AutoPauseVideo
              className="h-full w-full object-cover"
              src={fabricaVideo.url}
              poster={processCutAsset.url}
            />
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-secondary-foreground">
          Acompanhe o processo completo de fabricação do seu Kit Premium.
        </p>
      </div>

      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 xl:grid-cols-6 md:overflow-visible">
        {processSteps.map((step) => (
          <article
            key={step.number}
            className="group min-w-[80%] snap-start rounded-2xl border border-border bg-card p-4 shadow-soft md:min-w-0"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                {step.number}
              </span>
              <div className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-background/40">
              <img
                src={step.image}
                alt={step.alt}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-secondary-foreground">{step.description}</p>
          </article>
        ))}
      </div>
      <BlockCta label="QUERO UM KIT DESSES" onClick={onOpenModal} />
    </RevealSection>
  );
}

/* ===================== GALERIA ===================== */
function GallerySection({
  onOpenLightbox,
  onOpenModal,
}: {
  onOpenLightbox: (item: GalleryItem) => void;
  onOpenModal: () => void;
}) {
  return (
    <RevealSection className="section-alt section-glow">
      <SectionHeading eyebrow="PROJETOS ENTREGUES" title="Galeria de churrasqueiras transformadas." centered />

      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
        {galleryItems.map((item) => (
          <button
            key={`${item.title}-${item.location}`}
            type="button"
            onClick={() => onOpenLightbox(item)}
            className={cn(
              "group relative min-w-[85%] snap-start overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-w-0",
              item.featured ? "md:col-span-2" : "",
            )}
          >
            <div
              className="absolute inset-0 z-10 bg-linear-to-t from-background via-background/20 to-transparent opacity-90"
              aria-hidden="true"
            />
            {item.image ? (
              <img
                src={item.image}
                alt={item.alt}
                className={cn(
                  "w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
                  item.featured ? "aspect-[4/3]" : "aspect-square",
                )}
                loading="lazy"
              />
            ) : (
              <div className="grid aspect-square place-items-center bg-card-hover text-muted-foreground">
                <ImageIcon className="h-8 w-8" aria-hidden="true" />
              </div>
            )}
            <span className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-foreground backdrop-blur">
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="absolute inset-x-0 bottom-0 z-20 p-4">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-secondary-foreground">{item.location}</p>
            </div>
          </button>
        ))}
      </div>
      <BlockCta label="COMEÇAR MEU PROJETO" onClick={onOpenModal} />
    </RevealSection>
  );
}

/* ===================== VÍDEOS DE CLIENTES ===================== */
function ClientVideosSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-alt section-glow">
      <SectionHeading eyebrow="CLIENTES REAIS" title="Veja a reação de quem recebeu o Kit Olho na Brasa." centered />
      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5">
        {clientVideos.map((video, idx) => (
          <ClientVideoCard key={video.src} video={video} index={idx} />
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl px-5 text-center text-sm text-secondary-foreground md:text-base">
        Mais de 100.000 kits entregues em todo o Brasil.
      </p>
      <BlockCta label="QUERO RECEBER O MEU" onClick={onOpenModal} />
    </RevealSection>
  );
}

function ClientVideoCard({ video, index }: { video: ClientVideo; index: number }) {
  const [playing, setPlaying] = useState(false);
  const cardRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Promove preload de "none" para "metadata" quando o card entra na viewport
  React.useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const v = entry.target.querySelector("video");
            if (v) v.preload = "metadata";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Pausa o vídeo quando sai da viewport
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            v.pause();
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className="client-video-card group min-w-[70%] snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:min-w-0"
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          controls={playing}
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing ? (
          <button
            type="button"
            onClick={() => {
              const v = videoRef.current;
              if (v) {
                v.preload = "metadata";
                v.play()
                  .then(() => setPlaying(true))
                  .catch(() => {});
              }
            }}
            aria-label={`Reproduzir vídeo do cliente ${index + 1}`}
            className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-colors hover:from-black/70"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-black shadow-fire transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
          </button>
        ) : null}
      </div>
      <div className="space-y-1 p-4">
        <p className="text-sm font-semibold text-foreground">{video.name}</p>
        <p className="text-xs text-secondary-foreground md:text-sm">{video.caption}</p>
      </div>
    </article>
  );
}

/* ===================== AUTO-PAUSE VIDEO (pausa quando sai da viewport) ===================== */
function AutoPauseVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const toggleMute = () => {
    const el = ref.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
    if (!next) el.play().catch(() => {});
  };
  return (
    <>
      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        loop
        muted={muted}
        playsInline
        preload="metadata"
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
        className="absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {muted ? (
          <VolumeX className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Volume2 className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </>
  );
}

/* ===================== PARA QUEM É ===================== */
function WhoItsForSection({ onOpenModal }: { onOpenModal: () => void }) {
  const forYou = [
    "Está construindo ou reformando a área gourmet",
    "Quer equipamento profissional dentro de casa",
    "Valoriza inox que dura décadas, não meses",
    "Recebe família e amigos e leva o churrasco a sério",
  ];
  const notForYou = [
    "Procura o mais barato sem se importar com qualidade",
    "Quer solução descartável de supermercado",
    "Não liga se enferruja em 6 meses",
  ];

  return (
    <RevealSection className="section-alt relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.25), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-(--container-max) px-5 text-center">
        <p className="section-label inline-flex justify-center">FEITO PARA QUEM LEVA A SÉRIO</p>
        <h2
          className="mt-3 font-display font-semibold leading-[1.05] text-balance text-foreground"
          style={{ fontSize: "clamp(1.6rem, 5.5vw, 2.75rem)" }}
        >
          Não é pra qualquer um.<br />
          <span style={{ color: "#FF6B00" }}>É pra quem entende de churrasco.</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-(--container-max) gap-6 px-5 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.14em] text-emerald-400">É PRA VOCÊ SE:</p>
          <ul className="space-y-3">
            {forYou.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-6 text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.14em] text-red-400/80">NÃO É PRA VOCÊ SE:</p>
          <ul className="space-y-3">
            {notForYou.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-400/80">
                  <X className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-6 text-secondary-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-(--container-max) px-5">
        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/8 bg-black/40 px-4 py-6 backdrop-blur-md">
          {[
            { n: "100.000+", l: "clientes atendidos" },
            { n: "15 anos", l: "de garantia" },
            { n: "Inox 304", l: "alimentício" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p
                className="font-display font-bold leading-none"
                style={{ color: "#FF6B00", fontSize: "clamp(1.25rem, 5vw, 2.25rem)" }}
              >
                {s.n}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-wider text-secondary-foreground md:text-xs">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BlockCta label="QUERO RECEBER O MEU" onClick={onOpenModal} />
    </RevealSection>
  );
}

function DifferentialsSection() {
  const items = [
    { t: "Não enferruja", d: "Inox 304 alimentício" },
    { t: "Sob medida", d: "Fabricado no seu tamanho" },
    { t: "Prazo de entrega", d: "Rápido e confiável" },
    { t: "Fábrica própria", d: "Direto do fabricante" },
    { t: "+7 anos de mercado", d: "Referência em SC" },
    { t: "Tempo de produção", d: "Otimizado por etapa" },
    { t: "Qualidade garantida", d: "15 anos de garantia" },
    { t: "Melhor pós-venda", d: "Suporte real do time" },
  ];
  return (
    <RevealSection className="section-dark">
      <div className="mx-auto grid max-w-(--container-max) grid-cols-2 gap-3 px-5 md:grid-cols-4">
        {items.map((i) => (
          <div
            key={i.t}
            className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center backdrop-blur-sm"
          >
            <span
              className="grid h-11 w-11 place-items-center rounded-full"
              style={{ background: "rgba(255,107,0,0.15)", color: "#FF6B00" }}
            >
              <Check className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-semibold text-foreground">{i.t}</p>
            <p className="mt-1 text-xs text-secondary-foreground">{i.d}</p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

/* ===================== AVALIAÇÕES NO GOOGLE ===================== */
const googleReviews = [
  {
    quote: "Excelente atendimento, material de primeira qualidade e ótimo acabamento. Entrega no prazo! Recomendo.",
    author: "Sérgio Saturnino",
  },
  {
    quote:
      "Produto de excelente qualidade, com um pré e pós venda excelentes. Entregam o que prometem. Customizam seu pedido e orientam com segurança na retirada das medidas e como fazer sua instalação. Empresa diferenciada.",
    author: "Luiz Carlos Crab",
  },
  {
    quote:
      "Adquiri o suporte suspenso para espetos e uma grelha de descanso. Atendimento na compra personalizado e ágil, informei as medidas da minha churrasqueira e logo recebi o link com os valores. Recebi em casa muito antes do prazo. Estou muito satisfeito. Excelente pós venda. Sensacional.",
    author: "Cliente Google",
  },
  {
    quote:
      "O atendimento foi excelente, a loja é muito completa, estou satisfeita com os acessórios, são muito resistentes e lindos!",
    author: "Valéria Orsatto",
  },
  {
    quote:
      "Ótimos produtos, facilitando o manuseio na hora de fazer o churrasco. A instalação também fácil de fazer, deixando a churrasqueira funcional e com uma quantidade menor de utensílios para suporte de grelhas e espetos.",
    author: "Celso Oliveira",
  },
  {
    quote: "Produto de extrema qualidade. Superou as expectativas.",
    author: "Diego Macedo",
  },
  {
    quote:
      "Produto de altíssima qualidade, atendimento excepcional, recomendo fortemente. Melhorou muito meus momentos de lazer na minha casa com esses acessórios para a churrasqueira.",
    author: "Cliente Google",
  },
];

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 9.5c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.37 18.27 9.5 24 9.5z"
      />
    </svg>
  );
}

function GoogleReviewsSection({ onOpenModal }: { onOpenModal: () => void }) {
  const mapsUrl =
    "https://www.google.com/maps/place/Olho+na+Brasa/@-27.1016701,-48.6187495,738m/data=!3m1!1e3!4m8!3m7!1s0x94d8b100c4230f17:0x899b6cbbbfaceb99!8m2!3d-27.1016701!4d-48.6161746!9m1!1b1!16s%2Fg%2F11rzr1kln5?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D";
  return (
    <RevealSection className="section-alt section-glow">
      <SectionHeading eyebrow="AVALIAÇÕES NO GOOGLE" title="O que nossos clientes dizem no Google" centered />

      <div className="mx-auto mb-10 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 px-6 py-6 text-center shadow-soft">
        <div className="flex items-center gap-2">
          <GoogleLogo className="h-6 w-6" />
          <span className="text-lg font-semibold text-foreground">Google</span>
        </div>
        <div className="text-[32px] font-bold leading-none text-foreground">4.7</div>
        <div className="flex items-center gap-0.5" aria-label="4.7 de 5 estrelas">
          {[0, 1, 2, 3].map((i) => (
            <Star key={i} className="h-5 w-5 fill-current" style={{ color: "#FFB800" }} aria-hidden="true" />
          ))}
          <div className="relative h-5 w-5">
            <Star className="absolute inset-0 h-5 w-5" style={{ color: "#FFB800" }} aria-hidden="true" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: "70%" }}>
              <Star className="h-5 w-5 fill-current" style={{ color: "#FFB800" }} aria-hidden="true" />
            </div>
          </div>
        </div>
        <p className="text-sm" style={{ color: "#888" }}>
          41 avaliações
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Ver todas no Google Maps →
        </a>
      </div>

      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
        {googleReviews.map((review, idx) => (
          <article
            key={idx}
            className="min-w-[85%] snap-start rounded-xl bg-white p-6 md:min-w-0"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <GoogleLogo className="h-5 w-5" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" style={{ color: "#FFB800" }} aria-hidden="true" />
                ))}
              </div>
            </div>
            <blockquote className="text-sm leading-[1.6]" style={{ color: "#333" }}>
              “{review.quote}”
            </blockquote>
            <div className="mt-5 flex items-center gap-3 border-t border-neutral-200 pt-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold" style={{ color: "#222" }}>
                  {review.author}
                </p>
                <p className="text-xs" style={{ color: "#888" }}>
                  Avaliação do Google
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <BlockCta label="QUERO MEU PROJETO" onClick={onOpenModal} />
    </RevealSection>
  );
}

function FaqSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark">
      <SectionHeading title="Dúvidas frequentes" centered />
      <div className="mx-auto max-w-4xl px-5">
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-5 py-2 shadow-soft">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="py-5 text-base font-semibold text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-7 text-secondary-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <BlockCta label="AINDA TEM DÚVIDA? FALE CONOSCO" onClick={onOpenModal} />
    </RevealSection>
  );
}

/* ===================== CTA FINAL ===================== */
function FinalCtaSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-cta">
      <section className="mx-auto max-w-4xl px-5 text-center">
        <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-card px-6 py-10 shadow-fire md:px-10 md:py-14">
          <div
            className="absolute inset-x-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/18 blur-3xl"
            aria-hidden="true"
          />
          <h2
            className="relative font-display font-semibold leading-[1.04] text-balance text-foreground"
            style={{ fontSize: "clamp(1.6rem,6vw,3rem)" }}
          >
            Sua churrasqueira merece um upgrade de verdade.
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-base leading-7 text-secondary-foreground md:text-lg">
            Projeto sob medida, inox 304 alimentício, garantia de 15 anos.
          </p>
          <BlockCta label="QUERO MEU PROJETO AGORA" onClick={onOpenModal} />
          <p className="relative mt-5 text-sm leading-6 text-muted-foreground">
            Fábrica própria em SC &nbsp;•&nbsp; 15 anos de garantia &nbsp;•&nbsp; Sob medida
          </p>
        </div>
      </section>
    </RevealSection>
  );
}

function Footer() {
  return (
    <footer className="bg-footer pb-28 pt-12 text-center md:pb-12">
      <div className="mx-auto max-w-(--container-max) px-5">
        <img src={logoOlhoNaBrasa.url} alt="Olho na Brasa" className="mx-auto h-12 w-auto" />
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-secondary-foreground">
          Olho na Brasa, fábrica de grelhas e acessórios premium em inox 304. Santa Catarina, Brasil.
        </p>
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground">
          <a href={SITE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
            Site
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
            Instagram
          </a>
          <a
            href={buildWhatsappHref("Olá! Vim pela landing page e quero saber mais sobre o Kit Premium.")}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            WhatsApp
          </a>
        </nav>
        <div className="mt-6 space-y-1 text-sm text-muted-foreground">
          <p>Instagram: @olhonabrasa</p>
          <p>WhatsApp: (47) 4042-0956</p>
          <p>Site: www.olhonabrasa.com.br</p>
        </div>
        <div className="mt-8 space-y-1 text-xs text-muted-foreground">
          <p>OLHO NA BRASA LTDA — CNPJ: 43.062.681/0001-25</p>
          <p>© 2026 Olho na Brasa. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsappButton({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpenChat}
      aria-label="Abrir chat WhatsApp"
      className="whatsapp-pulse fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground transition-transform duration-300 hover:scale-110"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M19.11 17.23c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.33-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.28s.98 2.65 1.11 2.84c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.44 1.55.56.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.27.22-.62.22-1.15.16-1.27-.07-.11-.25-.18-.52-.32Z" />
        <path d="M16.02 3.2c-7.07 0-12.8 5.71-12.8 12.76 0 2.25.59 4.44 1.7 6.37L3 29l6.86-1.79a12.83 12.83 0 0 0 6.16 1.57h.01c7.07 0 12.8-5.71 12.8-12.77S23.1 3.2 16.02 3.2Zm0 23.46h-.01a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-4.07 1.06 1.09-3.96-.25-.41a10.62 10.62 0 0 1-1.64-5.62c0-5.89 4.82-10.68 10.73-10.68 2.87 0 5.56 1.11 7.58 3.13a10.58 10.58 0 0 1 3.15 7.55c0 5.9-4.82 10.69-10.74 10.69Z" />
      </svg>
    </button>
  );
}

function BlockCta({ label, onClick, fullWidth }: { label: string; onClick: () => void; fullWidth?: boolean }) {
  return (
    <div className={cn("mx-auto mt-8 flex max-w-(--container-max) justify-center px-5", fullWidth ? "px-0" : "")}>
      <Button
        size="lg"
        onClick={onClick}
        className={cn(
          "min-h-14 rounded-xl bg-primary px-4 text-[13px] font-bold uppercase tracking-[0.03em] text-primary-foreground shadow-fire transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong sm:px-6 sm:text-sm sm:tracking-[0.05em]",
          fullWidth ? "w-full" : "w-full max-w-md md:w-auto md:min-w-[320px]",
        )}
      >
        {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

/* ===================== MODAL CONSULTIVO ===================== */
function ConsultiveModal({
  open,
  stage,
  projectType,
  estagio,
  form,
  formattedWhatsapp,
  cityState,
  onClose,
  onMomentSelect,
  onProjectTypeSelect,
  onContinuePhoto,
  onContinueContact,
  onChangeField,
  specialistMessage,
  measurementHelpMessage,
}: {
  open: boolean;
  stage: ModalStage;
  projectType: ProjectType;
  estagio: string;
  form: ContactForm;
  formattedWhatsapp: string;
  cityState: string;
  onClose: () => void;
  onMomentSelect: (moment: NonNullable<ProjectMoment>) => void;
  onProjectTypeSelect: (type: NonNullable<ProjectType>) => void;
  onContinuePhoto: () => void;
  onContinueContact: () => void;
  onChangeField: (field: keyof ContactForm, value: string) => void;
  specialistMessage: string;
  measurementHelpMessage: string;
}) {
  if (!open) return null;

  void cityState;
  const canContinueContact = Boolean(
    form.name.trim() && form.whatsapp.trim() && form.city.trim() && form.state.trim(),
  );

  const handleFinalAction = async (url: string) => {
    await sendLeadToDataCrazy(
      {
        nome: form.name,
        whatsapp: form.whatsapp,
        email: form.email,
        cidade: form.city,
        estado: form.state.toUpperCase(),
        estagio: estagio || "",
        tipoProjeto: projectType ? projectTypeLabels[projectType] : "",
        fotoUrl: form.photoUrl,
      },
      "formulario",
    );
    window.open(url, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 p-0 md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultive-modal-title"
    >
      <div className="relative max-h-[95svh] w-full overflow-hidden rounded-t-[28px] border border-border-strong bg-card shadow-fire md:max-h-[90svh] md:max-w-[520px] md:rounded-[28px]">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id="consultive-modal-title" className="text-lg font-semibold text-foreground">
            Vamos montar seu projeto 🔥
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-colors hover:bg-card-hover"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[calc(95svh-72px)] space-y-5 overflow-y-auto px-5 py-5 md:max-h-[calc(90svh-72px)]">
          {stage === "stage" ? (
            <div className="space-y-3">
              <OptionButton
                icon={<Hammer className="h-5 w-5" />}
                title="Estou construindo ou reformando minha churrasqueira"
                description="Fluxo ideal para quem quer projetar certo desde o início"
                onClick={() => onMomentSelect("obra")}
              />
              <OptionButton
                icon={<CheckCircle2 className="h-5 w-5" />}
                title="Já tenho a churrasqueira pronta, só falta o kit"
                description="Vamos confirmar medidas e direcionar para o especialista"
                onClick={() => onMomentSelect("pronta")}
              />
            </div>
          ) : null}

          {stage === "projectType" ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Que tipo de projeto você procura?</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">
                  Escolha a opção mais próxima — o especialista refina com você no WhatsApp.
                </p>
              </div>
              <div className="grid gap-3">
                <ProjectTypeCard
                  active={projectType === "kit"}
                  image={kitCompletoAsset.url}
                  title="Kit completo (grelha + suporte suspenso + espetos)"
                  subtitle="Nosso kit mais vendido"
                  onClick={() => onProjectTypeSelect("kit")}
                />
                <ProjectTypeCard
                  active={projectType === "suporte"}
                  image={suporteSuspensoAsset.url}
                  title="Só o Suporte Suspenso com uma grelha ou espeto separado"
                  subtitle="Ideal para complementar o que você já tem"
                  onClick={() => onProjectTypeSelect("suporte")}
                />
              </div>
            </div>
          ) : null}

          {stage === "photo" ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Para agilizar seu atendimento, consegue enviar uma foto da sua churrasqueira?
                </h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">
                  A foto é opcional, mas ajuda muito o especialista a entender seu projeto.
                </p>
              </div>
              <PhotoUpload onPhotoUploaded={(url) => onChangeField("photoUrl", url)} />
              <Button
                type="button"
                size="lg"
                className="min-h-13 w-full rounded-xl bg-primary text-sm font-bold tracking-[0.08em] text-primary-foreground hover:bg-primary-strong"
                onClick={onContinuePhoto}
              >
                CONTINUAR <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : null}

          {stage === "contact" ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Quase lá! Como podemos te chamar?</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">
                  Assim já deixamos seu atendimento mais ágil no WhatsApp.
                </p>
              </div>
              <div className="grid gap-4">
                <LabelField label="Nome">
                  <input
                    value={form.name}
                    onChange={(e) => onChangeField("name", e.target.value)}
                    className="field-base"
                  />
                </LabelField>
                <LabelField label="WhatsApp">
                  <input
                    value={formattedWhatsapp}
                    onChange={(e) => onChangeField("whatsapp", e.target.value)}
                    inputMode="tel"
                    className="field-base"
                  />
                </LabelField>
                <LabelField label="E-mail (opcional)">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => onChangeField("email", e.target.value)}
                    className="field-base"
                    placeholder="seu@email.com"
                  />
                </LabelField>
                <div className="grid grid-cols-[1fr_100px] gap-3">
                  <LabelField label="Cidade">
                    <input
                      value={form.city}
                      onChange={(e) => onChangeField("city", e.target.value)}
                      className="field-base"
                    />
                  </LabelField>
                  <LabelField label="Estado">
                    <input
                      value={form.state}
                      onChange={(e) => onChangeField("state", e.target.value.toUpperCase().slice(0, 2))}
                      maxLength={2}
                      placeholder="UF"
                      className="field-base uppercase"
                    />
                  </LabelField>
                </div>
              </div>
              <Button
                type="button"
                size="lg"
                disabled={!canContinueContact}
                className="min-h-13 w-full rounded-xl bg-primary text-sm font-bold tracking-[0.08em] text-primary-foreground hover:bg-primary-strong disabled:bg-primary/35"
                onClick={onContinueContact}
              >
                CONTINUAR <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : null}

          {stage === "path" ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Tudo certo! Como prefere seguir?</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">
                  Escolha o caminho mais confortável para você agora.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleFinalAction(specialistMessage)}
                className="block w-full rounded-2xl border-2 border-primary bg-primary/10 p-4 text-left shadow-soft transition-colors hover:bg-primary/15"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground">
                    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M19.11 17.23c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.33-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.28s.98 2.65 1.11 2.84c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.44 1.55.56.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.27.22-.62.22-1.15.16-1.27-.07-.11-.25-.18-.52-.32Z" />
                      <path d="M16.02 3.2c-7.07 0-12.8 5.71-12.8 12.76 0 2.25.59 4.44 1.7 6.37L3 29l6.86-1.79a12.83 12.83 0 0 0 6.16 1.57h.01c7.07 0 12.8-5.71 12.8-12.77S23.1 3.2 16.02 3.2Zm0 23.46h-.01a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-4.07 1.06 1.09-3.96-.25-.41a10.62 10.62 0 0 1-1.64-5.62c0-5.89 4.82-10.68 10.73-10.68 2.87 0 5.56 1.11 7.58 3.13a10.58 10.58 0 0 1 3.15 7.55c0 5.9-4.82 10.69-10.74 10.69Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">Falar agora com um especialista</p>
                    <p className="mt-1 text-sm leading-6 text-secondary-foreground">Resposta em minutos no WhatsApp</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleFinalAction(SITE_URL)}
                className="block w-full rounded-2xl border border-border bg-background/50 p-4 text-left transition-colors hover:bg-card-hover"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card-hover text-primary">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">Comprar direto no site</p>
                    <p className="mt-1 text-sm leading-6 text-secondary-foreground">
                      Veja os kits, escolha o tamanho e finalize sua compra
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleFinalAction(measurementHelpMessage)}
                className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary hover:text-primary-strong"
              >
                Ainda preciso de ajuda com as medidas <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}


function Lightbox({
  image,
  onClose,
}: {
  image: { src: string; alt: string; title?: string; subtitle?: string };
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-foreground backdrop-blur"
        aria-label="Fechar"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {image.src ? (
          <img src={image.src} alt={image.alt} className="mx-auto max-h-[85svh] w-auto rounded-xl object-contain" />
        ) : null}
        {image.title ? (
          <div className="mt-4 px-2 text-center">
            <p className="text-base font-semibold text-foreground">{image.title}</p>
            {image.subtitle ? <p className="mt-1 text-sm text-secondary-foreground">{image.subtitle}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RevealSection({ id, className, as = "section", children, style }: RevealProps) {
  const generatedId = useId().replace(/:/g, "");
  const [visible, setVisible] = useState(false);
  const Component = as;
  const elementId = id ?? `section-${generatedId}`;

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [elementId]);

  return (
    <Component
      id={elementId}
      style={style}
      className={cn("scroll-mt-20 px-0 py-14 md:py-20", visible ? "fade-visible" : "fade-hidden", className)}
    >
      {children}
    </Component>
  );
}

function SectionHeading({ eyebrow, title, description, centered }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto mb-8 max-w-(--container-max) px-5", centered ? "text-center" : "")}>
      {eyebrow ? (
        <p
          className={cn("section-label", centered ? "justify-center" : "")}
          style={centered ? { display: "inline-flex" } : undefined}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="mt-2 max-w-3xl font-display font-semibold leading-[1.05] text-balance text-foreground md:max-w-4xl"
        style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary-foreground md:text-base">{description}</p>
      ) : null}
    </div>
  );
}

function OptionButton({
  icon,
  title,
  description,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-16 w-full items-start gap-3 rounded-2xl border border-border bg-background/50 px-4 py-4 text-left transition-colors hover:bg-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-secondary-foreground">{description}</span>
      </span>
    </button>
  );
}

function ProjectTypeCard({
  active,
  title,
  subtitle,
  image,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  image?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full overflow-hidden rounded-2xl border text-left transition-colors",
        active ? "border-primary bg-primary/10" : "border-border bg-background/50 hover:bg-card-hover",
      )}
    >
      {image ? (
        <div className="aspect-[16/10] w-full overflow-hidden bg-black/40">
          <img src={image} alt={title} className="h-full w-full object-contain" loading="lazy" />
        </div>
      ) : null}
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-foreground md:text-base">{title}</p>
        <p className="mt-1 text-xs leading-5 text-secondary-foreground md:text-sm">{subtitle}</p>
      </div>
    </button>
  );
}


function LabelField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-foreground">
      <span>{label}</span>
      {children}
    </label>
  );
}

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const ddd = digits.slice(0, 2);
  const first = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
  const last = digits.length > 6 ? digits.slice(digits.length > 10 ? 7 : 6) : "";
  if (!ddd) return digits;
  if (!first) return `(${ddd}`;
  if (!last) return `(${ddd}) ${first}`;
  return `(${ddd}) ${first}-${last}`;
}

function buildWhatsappHref(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

const projectTypeLabels: Record<NonNullable<ProjectType>, string> = {
  kit: "Kit completo (grelha + suporte suspenso + espetos)",
  suporte: "Suporte Suspenso com grelha ou espeto",
};

function buildWhatsappMessage({
  intro,
  form,
  projectType,
}: {
  intro: string;
  form: ContactForm;
  projectType?: ProjectType;
}) {
  const lines = [intro, ""];
  if (form.name) lines.push(`Nome: ${form.name}`);
  const cityStr = form.state ? `${form.city}/${form.state.toUpperCase()}` : form.city;
  if (cityStr) lines.push(`Cidade: ${cityStr}`);
  if (projectType) lines.push(`Tipo de projeto: ${projectTypeLabels[projectType]}`);
  if (form.photoUrl) lines.push("", `Foto da churrasqueira: ${form.photoUrl}`);
  lines.push("", "Vim pela landing page.");
  return buildWhatsappHref(lines.join("\n"));
}

