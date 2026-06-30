import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
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
  X,
} from "lucide-react";
import iconFabrica from "@/assets/icon-fabrica.webp.asset.json";
import iconGarantia from "@/assets/icon-garantia.webp.asset.json";
import iconParcelamento from "@/assets/icon-parcelamento.webp.asset.json";
import iconFrete from "@/assets/icon-frete.webp.asset.json";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import beforeProjectAsset from "@/assets/olho-na-brasa-antes-1.jpg.asset.json";
import afterProjectAsset from "@/assets/olho-na-brasa-depois-1.jpg.asset.json";
import processCutAsset from "@/assets/processo-corte-inox.jpg.asset.json";
import processWeldAsset from "@/assets/processo-solda-especializada.jpg.asset.json";
import processPolishAsset from "@/assets/processo-polimento.png.asset.json";
import processAssemblyAsset from "@/assets/processo-montagem.jpg.asset.json";
import processInspectionAsset from "@/assets/processo-inspecao-qualidade.jpg.asset.json";
import processPackagingAsset from "@/assets/processo-embalagem-segura.png.asset.json";
import measurementGuideAsset from "@/assets/guia-medidas.png.asset.json";
import videoAsset from "@/assets/video-cinematografico.mp4.asset.json";
import fabricaVideo from "@/assets/fabrica.mp4.asset.json";
import rodrigoSuporte from "@/assets/rodrigo-suporte.png.asset.json";
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
import card4Antes from "@/assets/card4-antes.jpg.asset.json";
import card4Depois from "@/assets/card4-depois.jpg.asset.json";
import card5Antes from "@/assets/card5-antes.png.asset.json";
import card5Depois from "@/assets/card5-depois.jpg.asset.json";
import videoCliente1 from "@/assets/video-cliente-1.mp4.asset.json";
import videoCliente2 from "@/assets/video-cliente-2.mp4.asset.json";
import videoCliente3 from "@/assets/video-cliente-3.mp4.asset.json";
import videoCliente4 from "@/assets/video-cliente-4.mp4.asset.json";
import videoCliente5 from "@/assets/video-cliente-5.mp4.asset.json";
import { Play } from "lucide-react";

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

type ModalStage = "stage" | "measurements" | "contact" | "path" | "cold";
type ProjectMoment = "obra" | "pronta" | "planejando" | null;
type MeasurementState = "unknown" | "yes" | "no";

type ContactForm = {
  name: string;
  whatsapp: string;
  city: string;
  width: string;
  depth: string;
  height: string;
  email: string;
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

type TrustCard = { image: string; title: string; description: string };
type ProcessStep = { number: string; title: string; description: string; image: string; alt: string };
type GalleryItem = { title: string; location: string; image?: string; alt: string; featured?: boolean };
type Testimonial = { quote: string; author: string; accent?: boolean };
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
const GUIA_PDF_URL = "/guia-olho-na-brasa.pdf";

const trustCards: TrustCard[] = [
  { image: iconFabrica.url, title: "Direto da fábrica", description: "Sem intermediário, preço justo" },
  { image: iconGarantia.url, title: "15 anos de garantia", description: "Confiança na qualidade que fabricamos" },
  {
    image: iconParcelamento.url,
    title: "ATÉ 10X S/ JUROS no cartão e 5% Off no Pix",
    description: "Feito nas medidas exatas da sua churrasqueira e seu bolso",
  },
  { image: iconFrete.url, title: "Frete grátis Sul/Sudeste", description: "Envio seguro para todo Brasil" },
];

const processSteps: ProcessStep[] = [
  { number: "01", title: "Corte do Inox", description: "Chapas de Inox 304 cortadas com precisão milimétrica.", image: processCutAsset.url, alt: "Corte preciso de peças em inox 304 com faíscas na fábrica" },
  { number: "02", title: "Solda especializada", description: "Solda TIG por profissionais certificados. Acabamento limpo e resistente.", image: processWeldAsset.url, alt: "Solda especializada em estrutura de inox" },
  { number: "03", title: "Polimento", description: "Acabamento escovado premium. Brilho que dura anos sem desbotar.", image: processPolishAsset.url, alt: "Polimento do inox com acabamento premium" },
  { number: "04", title: "Montagem", description: "Cada peça é montada e testada manualmente antes da embalagem.", image: processAssemblyAsset.url, alt: "Montagem manual de estrutura em inox" },
  { number: "05", title: "Inspeção de qualidade", description: "Verificação final de medidas, acabamento e resistência.", image: processInspectionAsset.url, alt: "Equipe conferindo qualidade final do kit" },
  { number: "06", title: "Embalagem segura", description: "Embalagem reforçada para transporte. Seu kit chega intacto.", image: processPackagingAsset.url, alt: "Kit embalado com proteção reforçada" },
];

const beforeAfterPairs: BeforeAfterPair[] = [
  {
    before: card4Antes.url,
    after: card4Depois.url,
    title: "Nicho em mármore, equipado com Kit Premium completo",
    subtitle: "Suporte suspenso, grelhas e espetos sob medida no nicho de mármore calacatta.",
    beforeAlt: "Nicho de churrasqueira em mármore antes da instalação do kit",
    afterAlt: "Mesmo nicho com Kit Premium Olho na Brasa instalado em inox 304",
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
  { title: "Kit Premium em ação", location: "Carnes na brasa com suporte suspenso", image: projeto1.url, alt: "Kit premium em inox 304 com carnes assando", featured: true },
  { title: "Acabamento espelhado", location: "Churrasqueira em mármore", image: projeto2.url, alt: "Kit Olho na Brasa instalado em churrasqueira com moldura em mármore" },
  { title: "Encaixe perfeito", location: "Churrasqueira em tijolo aparente", image: projeto3.url, alt: "Kit premium em inox instalado em churrasqueira de tijolo", featured: true },
  { title: "Projeto em pedra natural", location: "Área gourmet rústica", image: projeto4.url, alt: "Kit instalado em churrasqueira com revestimento em pedra natural" },
  { title: "Área gourmet contemporânea", location: "Bancada em granito", image: projeto5.url, alt: "Kit premium em área gourmet contemporânea" },
  { title: "Nicho premium", location: "Projeto residencial", image: projeto6.url, alt: "Kit instalado em nicho de churrasqueira residencial premium" },
];

const testimonials: Testimonial[] = [
  { quote: "É outra coisa! Exatamente como na foto, gostamos muito! Para quem assim como eu ficou em dúvida, o cabo realmente não esquenta!", author: "Rian — 06/04/2024" },
  { quote: "Obrigado por produzirem com o cabo para dentro, ficou perfeita na minha churrasqueira!", author: "Valmir — 11/03/2024" },
  { quote: "Comprei o Kit Inteiro e ficou perfeito aqui na churrasqueira. Suporte Espeto em Aço Inox impecável.", author: "Otávio — 19/01/2024" },
  { quote: "Sou churrasqueiro profissional e faço churrasco nas chácaras de meus clientes. Sempre tive o problema de depender da estrutura do cliente. Mas agora que comprei essa churrasqueira, facilitou muito meu trabalho e o churrasco fica muito melhor! Se você quer uma churrasqueira realmente boa e móvel, essa é a única opção que conheço no mercado.", author: "Wesley — 12/01/2024" },
  { quote: "O produto chegou antes do esperado, a qualidade é surpreendente. O valor foi 1/3 do orçamento que fiz aqui na região e a qualidade é a mesma. Estou indicando para todo mundo!", author: "Anderson — 10/01/2024" },
  { quote: "Supera as expectativas.", author: "Ricardo Gölzer — 02/05/2023" },
  { quote: "Produto de excelente qualidade, recomendo!", author: "Vanderlei Knopf — 16/01/2023" },
  { quote: "Confiamos tanto na qualidade que oferecemos 15 anos de garantia. Os produtos são feitos com qualidade máxima!", author: "Olho na Brasa", accent: true },
];

const faqItems = [
  { question: "Como sei se o Kit vai caber na minha churrasqueira?", answer: "Todos os nossos kits são fabricados sob medida. Você informa as medidas internas da sua churrasqueira (largura e comprimento) e nós fabricamos no tamanho exato. Temos um vídeo com o Rodrigo, dono da fábrica, ensinando como tirar as medidas corretamente." },
  { question: "O inox 304 realmente não enferruja?", answer: "O Inox 304 é o mesmo aço utilizado em equipamentos hospitalares e na indústria alimentícia. Ele resiste a maresia, chuva e uso intenso. Com o cuidado básico, vai durar décadas sem ferrugem, por isso garantimos por 15 anos." },
  { question: "Quanto tempo demora a entrega?", answer: "Como cada kit é fabricado sob medida, o prazo de produção varia. Após a confirmação do pagamento, nosso time informa o prazo atualizado. Frete grátis para Sul e Sudeste." },
  { question: "E se eu errar a medida?", answer: "Nosso time confere as medidas junto com você antes de iniciar a fabricação. Enviamos imagem e vídeo explicando exatamente onde medir." },
  { question: "Posso parcelar?", answer: "Sim! Em até 10x sem juros no cartão. Também temos 5% de desconto no PIX." },
  { question: "Como funciona a garantia de 15 anos?", answer: "A garantia cobre defeitos de fabricação e falhas de material por 15 anos a partir da data de entrega." },
  { question: "Vocês fazem instalação?", answer: "Sim! Para clientes da Grande Florianópolis e litoral catarinense, oferecemos serviço de instalação com equipe própria." },
  { question: "O Kit Premium inclui o quê?", answer: "Grelha Uruguaia Premium (quadro 6mm, varões 5mm), Grelha de Descanso, Suporte Suspenso e Espetos Duplos de brinde. Tudo em Inox 304 alimentício, sob medida." },
];

const benefits = [
  "Inox 304 alimentício",
  "Sob medida",
  "15 anos de garantia",
  "Frete grátis Sul/Sudeste",
  "★★★★★ 100.000+ churrasqueiras entregues",
  "Acabamento premium",
];

type ClientVideo = { src: string; name: string; caption: string };
const clientVideos: ClientVideo[] = [
  { src: videoCliente1.url, name: "Cliente Olho na Brasa", caption: "Kit Premium instalado" },
  { src: videoCliente2.url, name: "Cliente Olho na Brasa", caption: "Reação ao receber o kit" },
  { src: videoCliente3.url, name: "Cliente Olho na Brasa", caption: "Acabamento em inox 304" },
  { src: videoCliente4.url, name: "Cliente Olho na Brasa", caption: "Encaixe sob medida" },
  { src: videoCliente5.url, name: "Cliente Olho na Brasa", caption: "Primeiro churrasco" },
];

function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState<ModalStage>("stage");
  const [measurementState, setMeasurementState] = useState<MeasurementState>("unknown");
  const [showMeasurementsForm, setShowMeasurementsForm] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title?: string; subtitle?: string } | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "", whatsapp: "", city: "", width: "", depth: "", height: "", email: "",
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
    document.body.style.overflow = modalOpen || lightboxImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, lightboxImage]);

  const openConsultiveModal = () => {
    setModalOpen(true);
    setModalStage("stage");
    setMeasurementState("unknown");
    setShowMeasurementsForm(false);
  };

  const closeConsultiveModal = () => {
    setModalOpen(false);
    setModalStage("stage");
    setMeasurementState("unknown");
    setShowMeasurementsForm(false);
  };

  const formattedWhatsapp = formatWhatsapp(contactForm.whatsapp);

  const specialistMessage = buildWhatsappMessage({
    intro: "Olá! Quero montar meu Kit Premium.",
    form: contactForm,
    includeMeasurements: Boolean(contactForm.width || contactForm.depth || contactForm.height),
  });

  const measurementHelpMessage = buildWhatsappMessage({
    intro: "Olá! Quero montar meu Kit Premium, mas preciso de ajuda para definir as medidas da minha churrasqueira.",
    form: contactForm,
    includeMeasurements: false,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      <div className="bg-background text-foreground">
        <StickyHeader visible={headerVisible} onOpenModal={openConsultiveModal} />

        <main>
          <HeroSection onOpenModal={openConsultiveModal} />
          <Divider />
          <VideoSection onOpenModal={openConsultiveModal} />
          <Divider />
          <TrustBand />
          <Divider />
          <BeforeAfterSection onOpenModal={openConsultiveModal} onOpenLightbox={(img) => setLightboxImage(img)} />
          <Divider />
          <ProcessSection onOpenModal={openConsultiveModal} />
          <Divider />
          <GallerySection onOpenLightbox={(item) => setLightboxImage({ src: item.image ?? "", alt: item.alt, title: item.title, subtitle: item.location })} onOpenModal={openConsultiveModal} />
          <Divider />
          <TestimonialsSection onOpenModal={openConsultiveModal} />
          <Divider />
          <ClientVideosSection onOpenModal={openConsultiveModal} />
          <Divider />
          <WhoItsForSection onOpenModal={openConsultiveModal} />
          <Divider />
          <FaqSection onOpenModal={openConsultiveModal} />
          <Divider />
          <FinalCtaSection onOpenModal={openConsultiveModal} />
        </main>

        <Footer />
        <FloatingWhatsappButton onOpenModal={openConsultiveModal} />
      </div>

      <ConsultiveModal
        open={modalOpen}
        stage={modalStage}
        measurementState={measurementState}
        showMeasurementsForm={showMeasurementsForm}
        form={contactForm}
        formattedWhatsapp={formattedWhatsapp}
        onClose={closeConsultiveModal}
        onMomentSelect={(moment) => {
          if (moment === "planejando") setModalStage("cold");
          else setModalStage("measurements");
        }}
        onMeasurementStateChange={(state) => {
          setMeasurementState(state);
          setShowMeasurementsForm(state === "yes");
        }}
        onShowMeasurementForm={() => {
          setMeasurementState("yes");
          setShowMeasurementsForm(true);
        }}
        onContinueMeasurements={() => setModalStage("contact")}
        onContinueContact={() => setModalStage("path")}
        onChangeField={(field, value) => setContactForm((current) => ({ ...current, [field]: value }))}
        specialistMessage={specialistMessage}
        measurementHelpMessage={measurementHelpMessage}
      />

      {lightboxImage ? <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> : null}
    </>
  );
}

function Divider() {
  return <hr className="section-divider" aria-hidden="true" />;
}

function StickyHeader({ visible, onOpenModal }: { visible: boolean; onOpenModal: () => void }) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 h-14 border-b border-white/5 backdrop-blur-xl transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
      style={{ background: "rgb(10 10 10 / 0.9)" }}
    >
      <div className="mx-auto flex h-full max-w-(--container-max) items-center justify-between gap-3 px-5">
        <a href="#top" aria-label="Olho na Brasa — Início" className="flex items-center gap-2">
          <img src={logoOlhoNaBrasa.url} alt="Olho na Brasa" className="h-8 w-auto md:h-9" />
        </a>
        <button
          type="button"
          onClick={onOpenModal}
          className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-xs font-bold tracking-wide text-primary-foreground transition-colors hover:bg-primary-strong"
        >
          QUERO MEU PROJETO
        </button>
      </div>
    </header>
  );
}

/* ===================== HERO ===================== */
function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-background"
    >
      {/* Imagem do Rodrigo full-screen */}
      <img
        src={rodrigoSuporte.url}
        alt="Rodrigo, fundador da Olho na Brasa, segurando o Kit Suporte Suspenso em inox"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[center_20%] md:object-[center_25%]"
        loading="eager"
      />

      {/* Gradiente para legibilidade do texto */}
      <div className="hero-gradient z-[1]" aria-hidden="true" />

      {/* Conteúdo na parte inferior */}
      <div className="relative z-[3] mx-auto w-full max-w-(--container-max) px-5 pb-10 pt-32 md:pb-16">
        <h1 className="max-w-2xl font-display font-semibold leading-[1.05] text-balance text-foreground"
            style={{ fontSize: "clamp(1.75rem, 7vw, 3.5rem)" }}>
          Sua churrasqueira merece um upgrade de verdade.
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-6 text-secondary-foreground md:text-base">
          Kit Premium em Inox 304, feito sob medida. Direto da fábrica, com garantia de 15 anos.
        </p>

        <BenefitsMarquee />

        <div className="mt-7 max-w-md">
          <BlockCta label="QUERO MEU PROJETO" onClick={onOpenModal} fullWidth />
          <p className="mt-3 text-center text-xs text-muted-foreground md:text-sm">
            Fale com um especialista ou compre direto no site
          </p>
        </div>
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



/* ===================== VÍDEO ===================== */
function VideoSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark section-glow">
      <SectionHeading
        eyebrow="VEJA O KIT EM AÇÃO"
        title="Engenharia que você vê. Qualidade que você sente."
        description="Cada detalhe é pensado para durar décadas e transformar seu churrasco."
      />
      <div className="mx-auto max-w-(--container-max) px-5">
        <div className="glass-panel overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-video overflow-hidden bg-black">
            <video
              className="h-full w-full object-contain"
              src={videoAsset.url}
              controls
              autoPlay
              loop
              muted
              playsInline
              poster={afterProjectAsset.url}
            />
          </div>
        </div>
      </div>
      <BlockCta label="MONTAR MEU KIT" onClick={onOpenModal} />
    </RevealSection>
  );
}

/* ===================== TRUST ===================== */
function TrustBand() {
  return (
    <RevealSection className="section-alt">
      <div className="mx-auto grid max-w-(--container-max) gap-3 px-5 md:grid-cols-4">
        {trustCards.map((card) => (
          <article
            key={card.title}
            className="group rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-center transition-all duration-300 hover:border-primary/25 hover:bg-white/[0.05]"
          >
            <img src={card.image} alt="" aria-hidden="true" className="mx-auto mb-3 h-12 w-12 object-contain" loading="lazy" />
            <h3 className="text-sm font-bold leading-tight text-foreground">{card.title}</h3>
            <p className="mt-2 text-xs leading-5 text-secondary-foreground md:text-sm">{card.description}</p>
          </article>
        ))}
      </div>
    </RevealSection>
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
                onExpand={() => onOpenLightbox({ src: pair.before, alt: pair.beforeAlt, title: pair.title, subtitle: "Antes" })}
              />
              <ExpandableImage
                src={pair.after}
                alt={pair.afterAlt}
                label="DEPOIS"
                labelClass="bg-primary text-primary-foreground"
                onExpand={() => onOpenLightbox({ src: pair.after, alt: pair.afterAlt, title: pair.title, subtitle: "Depois" })}
              />
            </div>
            <div className="space-y-2 p-5">
              <h3 className="text-base font-semibold text-foreground">{pair.title}</h3>
              <p className="text-sm leading-6 text-secondary-foreground">{pair.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
      <BlockCta label="TRANSFORMAR MINHA CHURRASQUEIRA" onClick={onOpenModal} />
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
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
      <span className={cn("absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] backdrop-blur", labelClass)}>
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

      <div className="mx-auto mb-8 max-w-(--container-max) px-5">
        <div className="glass-panel overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-video overflow-hidden bg-black">
            <video
              className="h-full w-full object-cover"
              src={fabricaVideo.url}
              controls
              autoPlay
              loop
              muted
              playsInline
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
          <article key={step.number} className="group min-w-[80%] snap-start rounded-2xl border border-border bg-card p-4 shadow-soft md:min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                {step.number}
              </span>
              <div className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-background/40">
              <img src={step.image} alt={step.alt} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" />
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
            <div className="absolute inset-0 z-10 bg-linear-to-t from-background via-background/20 to-transparent opacity-90" aria-hidden="true" />
            {item.image ? (
              <img
                src={item.image}
                alt={item.alt}
                className={cn("w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]", item.featured ? "aspect-[4/3]" : "aspect-square")}
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

/* ===================== AVALIAÇÕES ===================== */
function TestimonialsSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark section-glow">
      <SectionHeading eyebrow="CLIENTES QUE LEVAM O CHURRASCO A SÉRIO" title="Quem instala percebe a diferença no primeiro uso." centered />

      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible">
        {testimonials.map((item) => (
          <article
            key={item.quote}
            className={cn(
              "min-w-[85%] snap-start rounded-2xl p-6 shadow-soft md:min-w-0",
              item.accent ? "border-2 border-primary/40 bg-primary/8" : "bg-white",
            )}
          >
            <div className="mb-3 flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <blockquote className={cn("text-sm leading-6", item.accent ? "text-foreground italic" : "text-neutral-800")}>
              “{item.quote}”
            </blockquote>
            <div className="mt-4 flex items-center justify-between">
              <p className={cn("text-sm font-semibold", item.accent ? "text-foreground" : "text-neutral-900")}>
                {item.author}
              </p>
              {!item.accent ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <Check className="h-3 w-3" /> Compra verificada
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <BlockCta label="FAZER COMO ESSES CLIENTES" onClick={onOpenModal} />
    </RevealSection>
  );
}

/* ===================== VÍDEOS DE CLIENTES ===================== */
function ClientVideosSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-alt section-glow">
      <SectionHeading
        eyebrow="CLIENTES REAIS"
        title="Veja a reação de quem recebeu o Kit Olho na Brasa."
        centered
      />
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
  return (
    <article className="group min-w-[70%] snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:min-w-0">
      <div className="relative aspect-[9/16] overflow-hidden bg-black">
        <video
          src={video.src}
          controls={playing}
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing ? (
          <button
            type="button"
            onClick={(e) => {
              const v = e.currentTarget.parentElement?.querySelector("video");
              if (v) { v.play(); setPlaying(true); }
            }}
            aria-label={`Reproduzir vídeo do cliente ${index + 1}`}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/45"
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

/* ===================== PARA QUEM É ===================== */
function WhoItsForSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-alt">
      <SectionHeading title="O Kit Olho na Brasa é para quem leva o churrasco a sério." centered />

      <div className="mx-auto grid max-w-(--container-max) gap-5 px-5 md:grid-cols-2">
        <article className="rounded-2xl border border-success/25 bg-card p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-foreground">Para quem é</h3>
          <ul className="mt-5 space-y-4">
            {[
              "Está construindo ou reformando a churrasqueira",
              "Quer equipamento profissional para uso residencial",
              "Valoriza durabilidade e não quer trocar em 2 anos",
              "Leva o churrasco a sério e recebe família e amigos",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-secondary-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-danger/20 bg-card p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-foreground">Não é para quem</h3>
          <ul className="mt-5 space-y-4">
            {[
              "Procura o preço mais baixo do mercado",
              "Quer churrasqueira descartável",
              "Não se importa com qualidade do material",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-secondary-foreground">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
      <BlockCta label="SIM, QUERO O MEU" onClick={onOpenModal} />
    </RevealSection>
  );
}

/* ===================== FAQ ===================== */
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
              <AccordionContent className="pb-5 text-sm leading-7 text-secondary-foreground">{item.answer}</AccordionContent>
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
          <div className="absolute inset-x-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" aria-hidden="true" />
          <h2 className="relative font-display font-semibold leading-[1.04] text-balance text-foreground"
              style={{ fontSize: "clamp(1.6rem,6vw,3rem)" }}>
            Sua churrasqueira merece um upgrade de verdade.
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-base leading-7 text-secondary-foreground md:text-lg">
            Projeto sob medida, inox 304 alimentício, garantia de 15 anos.
          </p>
          <BlockCta label="QUERO MEU PROJETO AGORA" onClick={onOpenModal} />
          <p className="relative mt-5 text-sm leading-6 text-muted-foreground">
            🔥 Fábrica própria em SC &nbsp;•&nbsp; 🛡️ 15 anos de garantia &nbsp;•&nbsp; 📐 Sob medida
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
          <a href={SITE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">Site</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">Instagram</a>
          <a href={buildWhatsappHref("Olá! Vim pela landing page e quero saber mais sobre o Kit Premium.")} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">WhatsApp</a>
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

function FloatingWhatsappButton({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpenModal}
      aria-label="Iniciar projeto, abrir formulário"
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
          "min-h-14 rounded-xl bg-primary px-8 text-sm font-bold uppercase tracking-[0.05em] text-primary-foreground shadow-fire transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong",
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
  measurementState,
  showMeasurementsForm,
  form,
  formattedWhatsapp,
  onClose,
  onMomentSelect,
  onMeasurementStateChange,
  onShowMeasurementForm,
  onContinueMeasurements,
  onContinueContact,
  onChangeField,
  specialistMessage,
  measurementHelpMessage,
}: {
  open: boolean;
  stage: ModalStage;
  measurementState: MeasurementState;
  showMeasurementsForm: boolean;
  form: ContactForm;
  formattedWhatsapp: string;
  onClose: () => void;
  onMomentSelect: (moment: ProjectMoment) => void;
  onMeasurementStateChange: (state: MeasurementState) => void;
  onShowMeasurementForm: () => void;
  onContinueMeasurements: () => void;
  onContinueContact: () => void;
  onChangeField: (field: keyof ContactForm, value: string) => void;
  specialistMessage: string;
  measurementHelpMessage: string;
}) {
  if (!open) return null;

  const canContinueMeasurements = showMeasurementsForm
    ? Boolean(form.width.trim() && form.depth.trim())
    : measurementState === "no";
  const canContinueContact = Boolean(form.name.trim() && form.whatsapp.trim() && form.city.trim() && form.email.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 p-0 md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="consultive-modal-title">
      <div className="relative max-h-[95svh] w-full overflow-hidden rounded-t-[28px] border border-border-strong bg-card shadow-fire md:max-h-[90svh] md:max-w-[500px] md:rounded-[28px]">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">PROJETO CONSULTIVO</p>
            <h2 id="consultive-modal-title" className="mt-1 text-lg font-semibold text-foreground">
              Vamos montar seu projeto 🔥
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar modal" className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-colors hover:bg-card-hover">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[calc(95svh-88px)] space-y-5 overflow-y-auto px-5 py-5 md:max-h-[calc(90svh-88px)]">
          {stage === "stage" ? (
            <div className="space-y-3">
              <p className="text-sm leading-6 text-secondary-foreground">Em que momento você está?</p>
              <OptionButton icon={<Hammer className="h-5 w-5" />} title="Estou construindo ou reformando minha churrasqueira" description="Fluxo ideal para quem quer projetar certo desde o início" onClick={() => onMomentSelect("obra")} />
              <OptionButton icon={<CheckCircle2 className="h-5 w-5" />} title="Já tenho a churrasqueira pronta, só falta o kit" description="Vamos confirmar medidas e direcionar para o especialista" onClick={() => onMomentSelect("pronta")} />
              <OptionButton icon={<Search className="h-5 w-5" />} title="Ainda estou planejando" description="Veja kits, preços e baixe o guia de medidas" onClick={() => onMomentSelect("planejando")} />
            </div>
          ) : null}

          {stage === "measurements" ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Você já tem as medidas da sua churrasqueira?</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">Se já tiver, seguimos para um projeto mais preciso. Se ainda não, te mostramos exatamente como medir.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => onMeasurementStateChange("yes")} className={cn("min-h-14 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-colors", measurementState === "yes" ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background/50 text-secondary-foreground hover:bg-card-hover")}>
                  SIM, já tenho as medidas
                </button>
                <button type="button" onClick={() => onMeasurementStateChange("no")} className={cn("min-h-14 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-colors", measurementState === "no" ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background/50 text-secondary-foreground hover:bg-card-hover")}>
                  NÃO, ainda preciso medir
                </button>
              </div>

              {showMeasurementsForm ? (
                <div className="space-y-4 rounded-2xl border border-border bg-background/50 p-4">
                  <div className="grid gap-3">
                    <LabelField label="Largura interna (cm)">
                      <input type="number" inputMode="numeric" min="0" value={form.width} onChange={(e) => onChangeField("width", e.target.value)} className="field-base" />
                    </LabelField>
                    <LabelField label="Comprimento interno (cm)">
                      <input type="number" inputMode="numeric" min="0" value={form.depth} onChange={(e) => onChangeField("depth", e.target.value)} className="field-base" />
                    </LabelField>
                    <LabelField label="Altura interna (cm) — opcional">
                      <input type="number" inputMode="numeric" min="0" value={form.height} onChange={(e) => onChangeField("height", e.target.value)} className="field-base" />
                    </LabelField>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border bg-black">
                    <video src={rodrigoMedidasVideo.url} controls playsInline poster={measurementGuideAsset.url} className="aspect-video w-full object-contain" />
                  </div>
                  <p className="text-sm leading-6 text-secondary-foreground">Meça por dentro da churrasqueira, de parede a parede. No vídeo, o Rodrigo mostra o passo a passo.</p>
                </div>
              ) : null}

              {measurementState === "no" ? (
                <div className="space-y-4 rounded-2xl border border-border bg-background/50 p-4">
                  <div className="overflow-hidden rounded-xl border border-border bg-black">
                    <video src={rodrigoMedidasVideo.url} controls playsInline poster={measurementGuideAsset.url} className="aspect-video w-full object-contain" />
                  </div>
                  <div className="grid gap-3">
                    <Button type="button" variant="outline" className="min-h-12 justify-between border-border bg-card hover:bg-card-hover" onClick={onShowMeasurementForm}>
                      Já entendi, vou medir agora <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" className="min-h-12 justify-between border-border bg-card hover:bg-card-hover" onClick={onContinueMeasurements}>
                      Posso medir depois, quero falar com especialista <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : null}

              <Button type="button" size="lg" disabled={!canContinueMeasurements} className="min-h-13 w-full rounded-xl bg-primary text-sm font-bold tracking-[0.08em] text-primary-foreground hover:bg-primary-strong disabled:bg-primary/35" onClick={onContinueMeasurements}>
                CONTINUAR <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : null}

          {stage === "contact" ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Quase lá! Como podemos te chamar?</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">Assim já deixamos seu atendimento mais ágil no WhatsApp.</p>
              </div>
              <div className="grid gap-4">
                <LabelField label="Nome"><input value={form.name} onChange={(e) => onChangeField("name", e.target.value)} className="field-base" /></LabelField>
                <LabelField label="WhatsApp"><input value={formattedWhatsapp} onChange={(e) => onChangeField("whatsapp", e.target.value)} inputMode="tel" className="field-base" /></LabelField>
                <LabelField label="Cidade / Estado"><input value={form.city} onChange={(e) => onChangeField("city", e.target.value)} className="field-base" /></LabelField>
                <LabelField label="E-mail"><input type="email" value={form.email} onChange={(e) => onChangeField("email", e.target.value)} className="field-base" placeholder="voce@email.com" /></LabelField>
              </div>
              <Button type="button" size="lg" disabled={!canContinueContact} className="min-h-13 w-full rounded-xl bg-primary text-sm font-bold tracking-[0.08em] text-primary-foreground hover:bg-primary-strong disabled:bg-primary/35" onClick={onContinueContact}>
                CONTINUAR <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : null}

          {stage === "path" ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Tudo certo! Como prefere seguir?</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">Escolha o caminho mais confortável para você agora.</p>
              </div>

              {/* Card 1 — destaque WhatsApp */}
              <a href={specialistMessage} target="_blank" rel="noreferrer" className="block rounded-2xl border-2 border-primary bg-primary/10 p-4 shadow-soft transition-colors hover:bg-primary/15">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground">
                    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M19.11 17.23c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.33-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.28s.98 2.65 1.11 2.84c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.44 1.55.56.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.27.22-.62.22-1.15.16-1.27-.07-.11-.25-.18-.52-.32Z" /><path d="M16.02 3.2c-7.07 0-12.8 5.71-12.8 12.76 0 2.25.59 4.44 1.7 6.37L3 29l6.86-1.79a12.83 12.83 0 0 0 6.16 1.57h.01c7.07 0 12.8-5.71 12.8-12.77S23.1 3.2 16.02 3.2Zm0 23.46h-.01a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-4.07 1.06 1.09-3.96-.25-.41a10.62 10.62 0 0 1-1.64-5.62c0-5.89 4.82-10.68 10.73-10.68 2.87 0 5.56 1.11 7.58 3.13a10.58 10.58 0 0 1 3.15 7.55c0 5.9-4.82 10.69-10.74 10.69Z" /></svg>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">Falar agora com um especialista</p>
                    <p className="mt-1 text-sm leading-6 text-secondary-foreground">Resposta em minutos no WhatsApp</p>
                  </div>
                </div>
              </a>

              {/* Card 2 — Comprar direto no site */}
              <a href={SITE_URL} target="_blank" rel="noreferrer" className="block rounded-2xl border border-border bg-background/50 p-4 transition-colors hover:bg-card-hover">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card-hover text-primary">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">Comprar direto no site</p>
                    <p className="mt-1 text-sm leading-6 text-secondary-foreground">Veja os kits, escolha o tamanho e finalize sua compra</p>
                  </div>
                </div>
              </a>

              <a href={measurementHelpMessage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-primary hover:text-primary-strong">
                Ainda preciso de ajuda com as medidas <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : null}

          {stage === "cold" ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sem problema! Enquanto planeja, conheça nossos kits.</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">Veja os modelos, tamanhos e preços disponíveis no nosso site.</p>
              </div>

              <a href={KITS_URL} target="_blank" rel="noreferrer" className="block rounded-2xl border border-border bg-background/50 p-4 transition-colors hover:bg-card-hover">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-base font-semibold text-foreground">Ver kits e preços no site</p>
                    <p className="mt-1 text-sm text-secondary-foreground">Abrir catálogo oficial em nova aba</p>
                  </div>
                </div>
              </a>

              <a href={GUIA_PDF_URL} download className="block rounded-2xl border border-border bg-background/50 p-4 transition-colors hover:bg-card-hover">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-base font-semibold text-foreground">Baixar guia gratuito de medidas</p>
                    <p className="mt-1 text-sm text-secondary-foreground">PDF com tudo que você precisa saber antes de comprar.</p>
                  </div>
                </div>
              </a>

              <p className="text-sm leading-6 text-muted-foreground">Quando estiver pronto, volte e fale com nosso especialista.</p>
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4" role="dialog" aria-modal="true" onClick={onClose}>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-foreground backdrop-blur" aria-label="Fechar">
        <X className="h-5 w-5" />
      </button>
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {image.src ? <img src={image.src} alt={image.alt} className="mx-auto max-h-[85svh] w-auto rounded-xl object-contain" /> : null}
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
    <Component id={elementId} style={style} className={cn("scroll-mt-20 px-0 py-14 md:py-20", visible ? "fade-visible" : "fade-hidden", className)}>
      {children}
    </Component>
  );
}

function SectionHeading({ eyebrow, title, description, centered }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto mb-8 max-w-(--container-max) px-5", centered ? "text-center" : "")}>
      {eyebrow ? (
        <p className={cn("section-label", centered ? "justify-center" : "")} style={centered ? { display: "inline-flex" } : undefined}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 max-w-3xl font-display font-semibold leading-[1.05] text-balance text-foreground md:max-w-4xl"
          style={{ fontSize: "clamp(1.5rem, 5vw, 2.75rem)" }}>
        {title}
      </h2>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary-foreground md:text-base">{description}</p> : null}
    </div>
  );
}

function OptionButton({ icon, title, description, onClick }: { icon: ReactNode; title: string; description: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-16 w-full items-start gap-3 rounded-2xl border border-border bg-background/50 px-4 py-4 text-left transition-colors hover:bg-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-secondary-foreground">{description}</span>
      </span>
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

function buildWhatsappMessage({ intro, form, includeMeasurements }: { intro: string; form: ContactForm; includeMeasurements: boolean }) {
  const lines = [intro, ""];
  if (form.name) lines.push(`Nome: ${form.name}`);
  if (form.city) lines.push(`Cidade: ${form.city}`);
  if (includeMeasurements) {
    const measurementParts = [form.width, form.depth].filter(Boolean);
    const combined = measurementParts.length ? `${measurementParts.join("x")}cm` : "Não informadas";
    lines.push(`Medidas: ${combined}${form.height ? ` | Altura: ${form.height}cm` : ""}`);
  }
  lines.push("", "Vim pela landing page.");
  return buildWhatsappHref(lines.join("\n"));
}
