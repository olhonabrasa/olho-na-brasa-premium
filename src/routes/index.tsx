import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  Clock3,
  ExternalLink,
  Factory,
  FileDown,
  Hammer,
  Image as ImageIcon,
  Play,
  Ruler,
  Search,
  ShieldCheck,
  Star,
  Truck,
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Kit Premium para Churrasqueira | Inox 304 Sob Medida | Olho na Brasa",
      },
      {
        name: "description",
        content:
          "Grelha e kit completo em inox 304 para sua churrasqueira. Sob medida, direto da fábrica, com 15 anos de garantia. Frete grátis Sul e Sudeste.",
      },
      {
        property: "og:title",
        content: "Kit Premium para Churrasqueira | Inox 304 Sob Medida | Olho na Brasa",
      },
      {
        property: "og:description",
        content:
          "Grelha e kit completo em inox 304 para sua churrasqueira. Sob medida, direto da fábrica, com 15 anos de garantia. Frete grátis Sul e Sudeste.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: afterProjectAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kit Premium para Churrasqueira | Olho na Brasa" },
      {
        name: "twitter:description",
        content:
          "Projeto sob medida em inox 304, feito direto da fábrica com 15 anos de garantia.",
      },
      { name: "twitter:image", content: afterProjectAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

type ModalStage = "stage" | "measurements" | "contact" | "path" | "cold" | "email-sent";
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
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
};

type TrustCard = {
  image: string;
  title: string;
  description: string;
};

type FeatureItem = {
  title: string;
  description: string;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

type GalleryItem = {
  title: string;
  location: string;
  image?: string;
  alt: string;
  featured?: boolean;
};

type Testimonial = {
  quote: string;
  author: string;
  accent?: boolean;
};

const WHATSAPP_URL = "https://wa.me/554740420956";
const SITE_URL = "https://www.olhonabrasa.com.br";
const KITS_URL = "https://www.olhonabrasa.com.br/kits-premium/";
const INSTAGRAM_URL = "https://www.instagram.com/olhonabrasa/";

const trustCards: TrustCard[] = [
  {
    image: iconFabrica.url,
    title: "Direto da fábrica",
    description: "Sem intermediário, preço justo",
  },
  {
    image: iconGarantia.url,
    title: "15 anos de garantia",
    description: "Confiança na qualidade que fabricamos",
  },
  {
    image: iconParcelamento.url,
    title: "ATÉ 10X S/ JUROS no cartão e 5% Off no Pix",
    description: "Feito nas medidas exatas da sua churrasqueira e seu bolso",
  },
  {
    image: iconFrete.url,
    title: "Frete grátis Sul/Sudeste",
    description: "Envio seguro para todo Brasil",
  },
];

const differentials: FeatureItem[] = [
  {
    title: "Fabricação própria",
    description:
      "Cada kit é fabricado na nossa fábrica em Santa Catarina. Sem terceirização, sem intermediário, com controle total de qualidade.",
  },
  {
    title: "Inox 304 alimentício",
    description:
      "O mesmo aço usado em equipamentos hospitalares. Não enferruja, não contamina a carne, resiste a maresia e intempéries.",
  },
  {
    title: "Sob medida para sua churrasqueira",
    description:
      "Cada projeto é construído nas medidas exatas que você informar. Encaixe perfeito, sem gambiarras e sem adaptações.",
  },
  {
    title: "Garantia real de 15 anos",
    description:
      "Uma das maiores garantias do mercado brasileiro. Garantimos porque controlamos cada etapa da fabricação.",
  },
  {
    title: "Suporte suspenso exclusivo",
    description:
      "Mais ergonomia e praticidade. Libera espaço dentro da churrasqueira e facilita a limpeza após o churrasco.",
  },
  {
    title: "Estrutura reforçada, quadro 6mm, varões 5mm",
    description:
      "Aguenta o peso de carnes pesadas e uso intenso sem deformar. Feito para durar décadas, não meses.",
  },
  {
    title: "Instalação especializada",
    description:
      "Para clientes da Grande Florianópolis e litoral de SC, enviamos equipe para instalar na sua churrasqueira.",
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Corte do Inox",
    description: "Chapas de Inox 304 cortadas com precisão milimétrica.",
    image: processCutAsset.url,
    alt: "Corte preciso de peças em inox 304 com faíscas na fábrica da Olho na Brasa",
  },
  {
    number: "02",
    title: "Solda especializada",
    description: "Solda TIG por profissionais certificados. Acabamento limpo e resistente.",
    image: processWeldAsset.url,
    alt: "Solda especializada em estrutura de inox da Olho na Brasa",
  },
  {
    number: "03",
    title: "Polimento",
    description: "Acabamento escovado premium. Brilho que dura anos sem desbotar.",
    image: processPolishAsset.url,
    alt: "Polimento do inox com acabamento premium e brilho intenso",
  },
  {
    number: "04",
    title: "Montagem",
    description: "Cada peça é montada e testada manualmente antes da embalagem.",
    image: processAssemblyAsset.url,
    alt: "Montagem manual de estrutura em inox Olho na Brasa",
  },
  {
    number: "05",
    title: "Inspeção de qualidade",
    description: "Verificação final de medidas, acabamento e resistência.",
    image: processInspectionAsset.url,
    alt: "Equipe conferindo qualidade final do kit premium Olho na Brasa",
  },
  {
    number: "06",
    title: "Embalagem segura",
    description: "Embalagem reforçada para transporte. Seu kit chega intacto.",
    image: processPackagingAsset.url,
    alt: "Kit Olho na Brasa embalado com proteção reforçada para transporte",
  },
];

const galleryItems: GalleryItem[] = [
  {
    title: "Kit Premium em ação",
    location: "Carnes na brasa com suporte suspenso",
    image: projeto1.url,
    alt: "Kit premium em inox 304 instalado em churrasqueira com carnes assando",
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
    alt: "Kit premium em inox instalado em churrasqueira de tijolo aparente",
    featured: true,
  },
  {
    title: "Projeto em pedra natural",
    location: "Área gourmet rústica",
    image: projeto4.url,
    alt: "Kit Olho na Brasa instalado em churrasqueira com revestimento em pedra natural",
  },
  {
    title: "Área gourmet contemporânea",
    location: "Bancada em granito",
    image: projeto5.url,
    alt: "Kit premium instalado em churrasqueira de bancada de área gourmet contemporânea",
  },
  {
    title: "Nicho premium",
    location: "Projeto residencial",
    image: projeto6.url,
    alt: "Kit Olho na Brasa instalado em nicho de churrasqueira residencial premium",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Supera as expectativas. É outra coisa! Exatamente como na foto, gostamos muito! Para quem ficou em dúvida como eu, o cabo realmente não esquenta!",
    author: "Cliente verificado",
  },
  {
    quote:
      "O produto chegou antes do esperado, a qualidade é surpreendente. O valor foi 1/3 do orçamento que fiz aqui na região e a qualidade é a mesma. Estou indicando para todo mundo!",
    author: "Cliente verificado",
  },
  {
    quote:
      "Sou churrasqueiro profissional. Sempre tive o problema de depender da estrutura do cliente. Essa churrasqueira facilitou muito meu trabalho e o churrasco fica muito melhor!",
    author: "Churrasqueiro profissional",
  },
  {
    quote:
      "Confiamos tanto na qualidade que oferecemos 15 anos de garantia. Os produtos são feitos com qualidade máxima!",
    author: "Olho na Brasa",
    accent: true,
  },
];

const faqItems = [
  {
    question: "Como sei se o Kit vai caber na minha churrasqueira?",
    answer:
      "Todos os nossos kits são fabricados sob medida. Você informa as medidas internas da sua churrasqueira (largura e comprimento) e nós fabricamos no tamanho exato. Temos um vídeo com o Rodrigo, dono da fábrica, ensinando como tirar as medidas corretamente. Se tiver dúvida, nossos especialistas ajudam pelo WhatsApp.",
  },
  {
    question: "O inox 304 realmente não enferruja?",
    answer:
      "O Inox 304 é o mesmo aço utilizado em equipamentos hospitalares e na indústria alimentícia. Ele resiste a maresia, chuva e uso intenso. Com o cuidado básico recomendado, seus acessórios vão durar décadas sem sinais de ferrugem — por isso garantimos por 15 anos.",
  },
  {
    question: "Quanto tempo demora a entrega?",
    answer:
      "Como cada kit é fabricado sob medida, o prazo de produção varia de acordo com a demanda. Após a confirmação do pagamento, nosso time informa o prazo atualizado. O frete é grátis para Sul e Sudeste, e enviamos para todo o Brasil com embalagem reforçada.",
  },
  {
    question: "E se eu errar a medida?",
    answer:
      "Nosso time de atendimento confere as medidas junto com você antes de iniciar a fabricação. Enviamos imagem e vídeo explicando exatamente onde medir. Se ainda assim tiver dúvida, nosso especialista orienta por vídeo chamada ou WhatsApp.",
  },
  {
    question: "Posso parcelar?",
    answer:
      "Sim! Oferecemos parcelamento em até 5x sem juros no cartão de crédito. Também temos 5% de desconto no PIX e condições especiais para pagamento à vista.",
  },
  {
    question: "Como funciona a garantia de 15 anos?",
    answer:
      "A garantia cobre defeitos de fabricação e falhas de material por 15 anos a partir da data de entrega. Confiamos tanto na qualidade do que fabricamos que oferecemos uma das maiores garantias do mercado brasileiro.",
  },
  {
    question: "Vocês fazem instalação?",
    answer:
      "Sim! Para clientes da Grande Florianópolis e litoral catarinense (Itapema, Itajaí, Balneário Camboriú, São José), oferecemos serviço de instalação com equipe própria. Para outras regiões, enviamos um guia completo de instalação — é simples e qualquer pessoa consegue instalar.",
  },
  {
    question: "O Kit Premium inclui o quê?",
    answer:
      "O Kit Premium inclui: Grelha Uruguaia Premium (quadro 6mm, varões 5mm), Grelha de Descanso, Suporte Suspenso e Espetos Duplos de brinde. Tudo em Inox 304 alimentício, fabricado sob medida para a sua churrasqueira.",
  },
];

const benefits = [
  "Inox 304 alimentício",
  "Sob medida",
  "15 anos de garantia",
  "Frete grátis Sul/Sudeste",
];


function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState<ModalStage>("stage");
  const [measurementState, setMeasurementState] = useState<MeasurementState>("unknown");
  const [showMeasurementsForm, setShowMeasurementsForm] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    whatsapp: "",
    city: "",
    width: "",
    depth: "",
    height: "",
    email: "",
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
          address: {
            "@type": "PostalAddress",
            addressRegion: "SC",
            addressCountry: "BR",
          },
          sameAs: [SITE_URL, INSTAGRAM_URL],
          description:
            "Fábrica de grelhas e acessórios premium em inox 304 sob medida para churrasqueiras.",
        },
        {
          "@type": "Product",
          name: "Kit Premium para Churrasqueira Olho na Brasa",
          brand: {
            "@type": "Brand",
            name: "Olho na Brasa",
          },
          image: [afterProjectAsset.url, beforeProjectAsset.url],
          description:
            "Kit premium em inox 304 alimentício, fabricado sob medida para churrasqueiras com 15 anos de garantia.",
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
    return () => {
      document.body.style.overflow = "";
    };
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

        <main className="snap-y snap-mandatory md:snap-none">
          <HeroSection onOpenModal={openConsultiveModal} />
          <VideoSection videoOpen={videoOpen} onPlay={() => setVideoOpen(true)} onOpenModal={openConsultiveModal} />
          <TrustBand />
          <DifferentialsSection onOpenModal={openConsultiveModal} />
          <BeforeAfterSection onOpenModal={openConsultiveModal} />
          <ProcessSection onOpenModal={openConsultiveModal} />
          <GallerySection onOpenLightbox={setLightboxImage} onOpenModal={openConsultiveModal} />
          <TestimonialsSection onOpenModal={openConsultiveModal} />
          <WhoItsForSection onOpenModal={openConsultiveModal} />
          <FaqSection onOpenModal={openConsultiveModal} />
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
          if (moment === "planejando") {
            setModalStage("cold");
          } else {
            setModalStage("measurements");
          }
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
        onColdGuideSubmit={() => setModalStage("email-sent")}
      />

      {lightboxImage ? (
        <Lightbox item={lightboxImage} onClose={() => setLightboxImage(null)} />
      ) : null}
    </>
  );
}

function StickyHeader({ visible, onOpenModal }: { visible: boolean; onOpenModal: () => void }) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-header/95 backdrop-blur-xl transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto flex h-15 max-w-(--container-max) items-center justify-between gap-4 px-5 md:h-18">
        <a href="#top" className="font-display text-sm font-semibold tracking-[0.2em] text-foreground md:text-base">
          OLHO NA BRASA
        </a>
        <Button variant="outline" className="min-h-11 border-border-strong bg-card/70 px-4 text-xs font-semibold tracking-[0.08em] text-foreground hover:bg-card-hover md:text-sm" onClick={onOpenModal}>
          QUERO MEU PROJETO
        </Button>
      </div>
    </header>
  );
}

function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection id="top" className="section-dark hero-shell pt-0 md:pt-0">
      <section className="mx-auto grid min-h-screen max-w-(--container-max) items-stretch md:min-h-[100svh] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:px-5 md:py-30">
        <div className="order-2 flex flex-col justify-end px-5 pb-10 pt-8 md:order-1 md:px-0 md:pb-0 md:pt-16">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-strong bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-soft backdrop-blur-xl">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
            <span>★★★★★ 100.000+ churrasqueiras entregues</span>
          </div>

          <h1 className="mt-6 max-w-xl font-display text-[clamp(2rem,8vw,4.4rem)] leading-[0.96] font-semibold text-balance text-foreground">
            Sua churrasqueira merece um upgrade de verdade.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-secondary-foreground md:text-lg">
            Kit Premium em Inox 304, feito sob medida pra sua churrasqueira. Direto da fábrica, com garantia de 15 anos.
          </p>

          <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex min-h-11 min-w-[210px] snap-start items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-foreground backdrop-blur"
              >
                <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:max-w-sm">
            <Button
              size="lg"
              className="min-h-13 w-full rounded-[var(--button-radius)] bg-primary px-6 text-sm font-bold tracking-[0.08em] text-primary-foreground shadow-fire transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
              onClick={onOpenModal}
            >
              QUERO MEU PROJETO <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <p className="text-sm text-muted-foreground">Fale com um especialista ou compre direto no site</p>
          </div>
        </div>

        <div className="relative order-1 min-h-[62svh] overflow-hidden md:order-2 md:min-h-[720px] md:rounded-[calc(var(--card-radius)+8px)] md:border md:border-border-strong">
          <div className="hero-placeholder absolute inset-0" aria-hidden="true" />
          <div className="hero-smoke absolute inset-x-0 bottom-0 h-3/4" aria-hidden="true" />
          <img
            src={rodrigoSuporte.url}
            alt="Rodrigo, dono da Olho na Brasa, segurando o Kit Suporte Suspenso em inox"
            className="absolute inset-0 z-[1] h-full w-full object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            loading="eager"
          />
          <div className="absolute inset-0 z-[2] bg-linear-to-t from-background via-background/45 to-transparent md:hidden" aria-hidden="true" />
          <div className="absolute right-5 top-5 z-10 rounded-full border border-border-strong bg-card/85 px-4 py-2 text-right text-xs font-semibold text-foreground shadow-soft backdrop-blur-xl md:right-6 md:top-6">
            15 anos de garantia real
          </div>
          <div className="absolute left-5 bottom-5 z-10 rounded-full border border-border-strong bg-card/85 px-4 py-2 text-xs font-semibold text-foreground shadow-soft backdrop-blur-xl md:left-6 md:bottom-6">
            Rodrigo · fundador da Olho na Brasa
          </div>
        </div>
      </section>
    </RevealSection>
  );
}

function VideoSection({ videoOpen: _videoOpen, onPlay: _onPlay, onOpenModal }: { videoOpen: boolean; onPlay: () => void; onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark border-t border-border/40">
      <SectionHeading
        eyebrow="VEJA O KIT EM AÇÃO"
        title="Engenharia que você vê. Qualidade que você sente."
        description="Cada detalhe é pensado para durar décadas e transformar seu churrasco."
      />

      <div className="mx-auto max-w-(--container-max) px-5">
        <div className="glass-panel overflow-hidden rounded-[calc(var(--card-radius)+2px)] border border-border">
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
            >
              Seu navegador não suporta vídeo HTML5.
            </video>
          </div>
        </div>
      </div>
      <SectionCta label="MONTAR MEU KIT" onClick={onOpenModal} />
    </RevealSection>
  );
}

function TrustBand() {
  return (
    <RevealSection className="section-alt border-y border-border/40">
      <div className="mx-auto grid max-w-(--container-max) gap-4 px-5 md:grid-cols-4">
        {trustCards.map((card) => (
          <article key={card.title} className="glass-panel flex min-h-[150px] items-center gap-4 rounded-[var(--card-radius)] border border-border bg-card/85 p-5">
            <img
              src={card.image}
              alt=""
              aria-hidden="true"
              className="h-14 w-14 shrink-0 object-contain"
              loading="lazy"
            />
            <div>
              <h2 className="text-base font-semibold text-foreground">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-secondary-foreground">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

function DifferentialsSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark">
      <div className="mx-auto grid max-w-(--container-max) gap-4 px-5 md:grid-cols-2">
        {differentials.map((item) => (
          <article key={item.title} className="rounded-[var(--card-radius)] border border-border bg-card p-5 shadow-soft transition-colors duration-300 hover:bg-card-hover">
            <div className="grid grid-cols-[4px_minmax(0,1fr)] gap-4">
              <span className="rounded-full bg-primary" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">{item.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <SectionCta label="FALAR COM ESPECIALISTA" onClick={onOpenModal} />
    </RevealSection>
  );
}

function BeforeAfterSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-alt border-y border-border/40">
      <SectionHeading
        eyebrow="TRANSFORMAÇÃO REAL"
        title="Veja o que um Kit Olho na Brasa faz pela sua churrasqueira."
        description="Mais de 100.000 churrasqueiras transformadas em todo o Brasil."
        centered
      />

      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
        {[
          {
            before: card1Antes.url,
            after: card1Depois.url,
            title: "Churrasqueira de alvenaria, Com Kit Premium instalado",
            beforeAlt: "Churrasqueira de alvenaria sem equipamento antes da instalação",
            afterAlt: "Churrasqueira com Kit Premium Olho na Brasa instalado",
          },
          {
            before: card2Antes.url,
            after: card2Depois.url,
            title: "Churrasqueira antiga e enferrujada, Grelhas novas em inox",
            beforeAlt: "Churrasqueira antiga com grelhas enferrujadas",
            afterAlt: "Mesma churrasqueira com grelhas novas em inox 304 Olho na Brasa",
          },
          {
            before: card3Antes.url,
            after: card3Depois.url,
            title: "Churrasqueira de obra crua, Kit completo com suporte suspenso",
            beforeAlt: "Churrasqueira de obra crua, sem grelhas nem acessórios",
            afterAlt: "Kit completo Olho na Brasa com suporte suspenso instalado",
          },
        ].map((pair) => (
          <article key={pair.title} className="min-w-[88%] snap-start overflow-hidden rounded-[calc(var(--card-radius)+2px)] border border-border bg-card shadow-soft md:min-w-0">
            <div className="grid grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden border-r border-border">
                <img
                  src={pair.before}
                  alt={pair.beforeAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-foreground backdrop-blur">
                  ANTES
                </span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={pair.after}
                  alt={pair.afterAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary-foreground">
                  DEPOIS
                </span>
              </div>
            </div>
            <div className="space-y-2 p-5">
              <h3 className="text-base font-semibold text-foreground">{pair.title}</h3>
              <p className="text-sm leading-6 text-secondary-foreground">Encaixe perfeito, acabamento espelhado e a percepção premium que só o inox 304 entrega.</p>
            </div>
          </article>
        ))}
      </div>
      <SectionCta label="TRANSFORMAR MINHA CHURRASQUEIRA" onClick={onOpenModal} />
    </RevealSection>
  );
}

function ProcessSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark">
      <SectionHeading
        eyebrow="POR DENTRO DA FÁBRICA"
        title="Cada kit passa por dezenas de etapas antes de chegar na sua casa."
      />

      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 xl:grid-cols-6 md:overflow-visible">
        {processSteps.map((step) => (
          <article key={step.number} className="group min-w-[82%] snap-start rounded-[calc(var(--card-radius)+2px)] border border-border bg-card p-4 shadow-soft md:min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
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
      <SectionCta label="QUERO UM KIT DESSES" onClick={onOpenModal} />
    </RevealSection>
  );
}

function GallerySection({ onOpenLightbox, onOpenModal }: { onOpenLightbox: (item: GalleryItem) => void; onOpenModal: () => void }) {
  return (
    <RevealSection className="section-alt border-y border-border/40">
      <SectionHeading
        eyebrow="PROJETOS ENTREGUES"
        title="Galeria de churrasqueiras transformadas."
        centered
      />

      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
        {galleryItems.map((item) => (
          <button
            key={`${item.title}-${item.location}`}
            type="button"
            onClick={() => onOpenLightbox(item)}
            className={cn(
              "group relative min-w-[88%] snap-start overflow-hidden rounded-[calc(var(--card-radius)+2px)] border border-border bg-card text-left shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-w-0",
              item.featured ? "md:col-span-2 md:row-span-1" : "",
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
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-secondary-foreground">{item.location}</p>
              </div>
              <span className="rounded-full border border-border-strong bg-card/80 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-foreground backdrop-blur">
                AMPLIAR
              </span>
            </div>
          </button>
        ))}
      </div>
      <SectionCta label="COMEÇAR MEU PROJETO" onClick={onOpenModal} />
    </RevealSection>
  );
}

function TestimonialsSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark">
      <SectionHeading eyebrow="CLIENTES QUE LEVAM O CHURRASCO A SÉRIO" title="Quem instala percebe a diferença no primeiro uso." centered />

      <div className="mx-auto flex max-w-(--container-max) snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible">
        {testimonials.map((item) => (
          <article
            key={item.quote}
            className={cn(
              "min-w-[88%] snap-start rounded-[calc(var(--card-radius)+2px)] border bg-card p-5 shadow-soft md:min-w-0",
              item.accent ? "border-primary/40 bg-primary/8" : "border-border",
            )}
          >
            <div className="mb-4 flex gap-1 text-star">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="text-sm leading-6 text-foreground/92 italic">“{item.quote}”</blockquote>
            <p className="mt-4 text-sm font-medium text-secondary-foreground">— {item.author}</p>
            <div className="mt-5 flex min-h-11 items-center gap-3 rounded-xl border border-dashed border-border-strong/70 px-4 py-3 text-xs text-muted-foreground">
              <CirclePlay className="h-4 w-4 text-primary" aria-hidden="true" />
              Espaço preparado para depoimento em vídeo
            </div>
          </article>
        ))}
      </div>
      <SectionCta label="FAZER COMO ESSES CLIENTES" onClick={onOpenModal} />
    </RevealSection>
  );
}

function WhoItsForSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-alt border-y border-border/40">
      <SectionHeading title="O Kit Olho na Brasa é para quem leva o churrasco a sério." centered />

      <div className="mx-auto grid max-w-(--container-max) gap-5 px-5 md:grid-cols-2">
        <article className="rounded-[calc(var(--card-radius)+2px)] border border-success/25 bg-card p-6 shadow-soft">
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

        <article className="rounded-[calc(var(--card-radius)+2px)] border border-danger/20 bg-card p-6 shadow-soft">
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
      <SectionCta label="SIM, QUERO O MEU" onClick={onOpenModal} />
    </RevealSection>
  );
}

function FaqSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-dark">
      <SectionHeading title="Dúvidas frequentes" centered />

      <div className="mx-auto max-w-4xl px-5">
        <Accordion type="single" collapsible className="rounded-[calc(var(--card-radius)+2px)] border border-border bg-card px-5 py-2 shadow-soft">
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
      <SectionCta label="AINDA TEM DÚVIDA? FALE CONOSCO" onClick={onOpenModal} />
    </RevealSection>
  );
}

function FinalCtaSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <RevealSection className="section-cta border-t border-border/50">
      <section className="mx-auto max-w-4xl px-5 text-center">
        <div className="relative overflow-hidden rounded-[calc(var(--card-radius)+8px)] border border-border-strong bg-card px-6 py-10 shadow-fire md:px-10 md:py-14">
          <div className="absolute inset-x-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/18 blur-3xl" aria-hidden="true" />
          <h2 className="relative font-display text-[clamp(1.8rem,6vw,3.4rem)] font-semibold leading-[1.02] text-balance text-foreground">
            Sua churrasqueira merece um upgrade de verdade.
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-base leading-7 text-secondary-foreground md:text-lg">
            Projeto sob medida, inox 304 alimentício, garantia de 15 anos. Fale com um especialista agora.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Button
              size="lg"
              className="min-h-13 w-full max-w-sm rounded-[var(--button-radius)] bg-primary px-6 text-sm font-bold tracking-[0.08em] text-primary-foreground shadow-fire transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
              onClick={onOpenModal}
            >
              QUERO MEU PROJETO AGORA <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="relative mt-5 text-sm leading-6 text-muted-foreground">
            🔥 Fábrica própria em SC &nbsp; • &nbsp; 🛡️ 15 anos de garantia &nbsp; • &nbsp; 📐 Sob medida
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
        <p className="font-display text-lg font-semibold tracking-[0.2em] text-foreground">OLHO NA BRASA</p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-secondary-foreground">
          Olho na Brasa — Fábrica de grelhas e acessórios premium em inox 304. Santa Catarina, Brasil.
        </p>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-foreground">
          <a href={SITE_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
            Site
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
            Instagram
          </a>
          <a href={buildWhatsappHref("Olá! Vim pela landing page e quero saber mais sobre o Kit Premium.")} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
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

function FloatingWhatsappButton({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpenModal}
      aria-label="Iniciar projeto, abrir formulário"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[0_18px_48px_rgba(37,211,102,0.38)] transition-transform duration-300 hover:scale-105 md:h-16 md:w-16"
    >
      <span className="whatsapp-pulse absolute inset-0 rounded-full bg-whatsapp/30" aria-hidden="true" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-current" aria-hidden="true">
        <path d="M19.11 17.23c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.33-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.28s.98 2.65 1.11 2.84c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.44 1.55.56.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.27.22-.62.22-1.15.16-1.27-.07-.11-.25-.18-.52-.32Z" />
        <path d="M16.02 3.2c-7.07 0-12.8 5.71-12.8 12.76 0 2.25.59 4.44 1.7 6.37L3 29l6.86-1.79a12.83 12.83 0 0 0 6.16 1.57h.01c7.07 0 12.8-5.71 12.8-12.77S23.1 3.2 16.02 3.2Zm0 23.46h-.01a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-4.07 1.06 1.09-3.96-.25-.41a10.62 10.62 0 0 1-1.64-5.62c0-5.89 4.82-10.68 10.73-10.68 2.87 0 5.56 1.11 7.58 3.13a10.58 10.58 0 0 1 3.15 7.55c0 5.9-4.82 10.69-10.74 10.69Z" />
      </svg>
    </button>
  );
}

function SectionCta({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="mx-auto mt-10 flex max-w-(--container-max) justify-center px-5">
      <Button
        size="lg"
        onClick={onClick}
        className="min-h-13 w-full max-w-md rounded-[var(--button-radius)] bg-primary px-6 text-sm font-bold tracking-[0.08em] text-primary-foreground shadow-fire transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary-strong md:w-auto md:min-w-[320px]"
      >
        {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

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
  onColdGuideSubmit,
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
  onColdGuideSubmit: () => void;
}) {
  if (!open) return null;

  const canContinueMeasurements = showMeasurementsForm
    ? Boolean(form.width.trim() && form.depth.trim())
    : measurementState === "no";
  const canContinueContact = Boolean(form.name.trim() && form.whatsapp.trim() && form.city.trim());
  const canSendGuide = Boolean(form.email.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="consultive-modal-title">
      <div className="relative max-h-[95svh] w-full overflow-hidden rounded-t-[28px] border border-border-strong bg-card shadow-fire md:max-h-[90svh] md:max-w-[500px] md:rounded-[28px]">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">PROJETO CONSULTIVO</p>
            <h2 id="consultive-modal-title" className="mt-1 text-lg font-semibold text-foreground">
              Vamos montar seu projeto 🔥
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition-colors hover:bg-card-hover"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[calc(95svh-88px)] space-y-5 overflow-y-auto px-5 py-5 md:max-h-[calc(90svh-88px)]">
          {stage === "stage" ? (
            <div className="space-y-4">
              <p className="text-sm leading-6 text-secondary-foreground">Em que momento você está?</p>
              <OptionButton icon={<Hammer className="h-5 w-5" aria-hidden="true" />} title="Estou construindo ou reformando minha churrasqueira" description="Fluxo ideal para quem quer projetar certo desde o início" onClick={() => onMomentSelect("obra")} />
              <OptionButton icon={<CheckCircle2 className="h-5 w-5" aria-hidden="true" />} title="Já tenho a churrasqueira pronta, só falta o kit" description="Vamos confirmar medidas e direcionar para o especialista" onClick={() => onMomentSelect("pronta")} />
              <OptionButton icon={<Search className="h-5 w-5" aria-hidden="true" />} title="Ainda estou planejando" description="Veja kits, preços e receba o guia de medidas" onClick={() => onMomentSelect("planejando")} />
            </div>
          ) : null}

          {stage === "measurements" ? (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Você já tem as medidas da sua churrasqueira?</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">Se já tiver, seguimos para um projeto mais preciso. Se ainda não, te mostramos exatamente como medir.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onMeasurementStateChange("yes")}
                  className={cn(
                    "min-h-14 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-colors",
                    measurementState === "yes" ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background/50 text-secondary-foreground hover:bg-card-hover",
                  )}
                >
                  SIM, já tenho as medidas
                </button>
                <button
                  type="button"
                  onClick={() => onMeasurementStateChange("no")}
                  className={cn(
                    "min-h-14 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-colors",
                    measurementState === "no" ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background/50 text-secondary-foreground hover:bg-card-hover",
                  )}
                >
                  NÃO, ainda preciso medir
                </button>
              </div>

              {showMeasurementsForm ? (
                <div className="space-y-4 rounded-[var(--card-radius)] border border-border bg-background/50 p-4">
                  <div className="grid gap-3">
                    <LabelField label="Largura interna (cm)">
                      <input type="number" inputMode="numeric" min="0" value={form.width} onChange={(event) => onChangeField("width", event.target.value)} className="field-base" />
                    </LabelField>
                    <LabelField label="Comprimento interno (cm)">
                      <input type="number" inputMode="numeric" min="0" value={form.depth} onChange={(event) => onChangeField("depth", event.target.value)} className="field-base" />
                    </LabelField>
                    <LabelField label="Altura interna (cm) — opcional">
                      <input type="number" inputMode="numeric" min="0" value={form.height} onChange={(event) => onChangeField("height", event.target.value)} className="field-base" />
                    </LabelField>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border bg-black">
                    <video
                      src={rodrigoMedidasVideo.url}
                      controls
                      playsInline
                      poster={measurementGuideAsset.url}
                      className="aspect-video w-full object-contain"
                    >
                      Vídeo do Rodrigo ensinando a medir.
                    </video>
                  </div>
                  <p className="text-sm leading-6 text-secondary-foreground">Meça por dentro da churrasqueira, de parede a parede. No vídeo, o Rodrigo mostra o passo a passo.</p>
                </div>
              ) : null}

              {measurementState === "no" ? (
                <div className="space-y-4 rounded-[var(--card-radius)] border border-border bg-background/50 p-4">
                  <div className="overflow-hidden rounded-xl border border-border bg-black">
                    <video
                      src={rodrigoMedidasVideo.url}
                      controls
                      playsInline
                      poster={measurementGuideAsset.url}
                      className="aspect-video w-full object-contain"
                    >
                      Vídeo do Rodrigo ensinando a medir.
                    </video>
                  </div>
                  <div className="rounded-xl border border-dashed border-border-strong bg-card px-4 py-4 text-sm leading-6 text-secondary-foreground">
                    <p className="font-semibold text-foreground">▶ Assista ao vídeo do Rodrigo ensinando a medir</p>
                    <p className="mt-1">Em 2 minutos você aprende a tirar as medidas certinhas.</p>
                  </div>
                  <div className="grid gap-3">
                    <Button type="button" variant="outline" className="min-h-12 justify-between border-border bg-card hover:bg-card-hover" onClick={onShowMeasurementForm}>
                      Já entendi, vou medir agora <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button type="button" variant="outline" className="min-h-12 justify-between border-border bg-card hover:bg-card-hover" onClick={onContinueMeasurements}>
                      Posso medir depois, quero falar com especialista <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ) : null}

              <Button type="button" size="lg" disabled={!canContinueMeasurements} className="min-h-13 w-full rounded-[var(--button-radius)] bg-primary text-sm font-bold tracking-[0.08em] text-primary-foreground hover:bg-primary-strong disabled:bg-primary/35" onClick={onContinueMeasurements}>
                CONTINUAR <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
                <LabelField label="Nome">
                  <input value={form.name} onChange={(event) => onChangeField("name", event.target.value)} className="field-base" />
                </LabelField>
                <LabelField label="WhatsApp">
                  <input value={formattedWhatsapp} onChange={(event) => onChangeField("whatsapp", event.target.value)} inputMode="tel" className="field-base" />
                </LabelField>
                <LabelField label="Cidade / Estado">
                  <input value={form.city} onChange={(event) => onChangeField("city", event.target.value)} className="field-base" />
                </LabelField>
              </div>
              <Button type="button" size="lg" disabled={!canContinueContact} className="min-h-13 w-full rounded-[var(--button-radius)] bg-primary text-sm font-bold tracking-[0.08em] text-primary-foreground hover:bg-primary-strong disabled:bg-primary/35" onClick={onContinueContact}>
                CONTINUAR <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          ) : null}

          {stage === "path" ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Tudo certo! Como prefere seguir?</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">Escolha o caminho mais confortável para você agora.</p>
              </div>

              <a href={specialistMessage} target="_blank" rel="noreferrer" className="block rounded-[calc(var(--card-radius)+2px)] border border-primary/45 bg-primary/10 p-4 shadow-soft transition-colors hover:bg-primary/15">
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

              <div className="rounded-[calc(var(--card-radius)+2px)] border border-border bg-background/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card-hover text-foreground">
                    <Clock3 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">Me chame depois, ainda estou decidindo</p>
                    <p className="mt-1 text-sm leading-6 text-secondary-foreground">Um especialista vai te chamar em até 24h.</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-border bg-card px-4 py-4 text-sm leading-6 text-secondary-foreground">
                  <p>
                    Perfeito, <span className="font-semibold text-foreground">{form.name || "cliente"}</span>! Nosso time vai te chamar no WhatsApp <span className="font-semibold text-foreground">{formattedWhatsapp || "informado"}</span> em até 24h. Fique de olho! 🔥
                  </p>
                </div>
                <Button type="button" variant="outline" className="mt-4 min-h-12 w-full border-border bg-card hover:bg-card-hover" onClick={onClose}>
                  Fechar
                </Button>
              </div>

              <a href={measurementHelpMessage} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-strong">
                Ainda preciso de ajuda com as medidas <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          ) : null}

          {stage === "cold" ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sem problema! Enquanto planeja, conheça nossos kits.</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">Veja os modelos, tamanhos e preços disponíveis no nosso site.</p>
              </div>

              <a href={KITS_URL} target="_blank" rel="noreferrer" className="block rounded-[calc(var(--card-radius)+2px)] border border-border bg-background/50 p-4 transition-colors hover:bg-card-hover">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-base font-semibold text-foreground">Ver kits e preços no site</p>
                    <p className="mt-1 text-sm text-secondary-foreground">Abrir catálogo oficial em nova aba</p>
                  </div>
                </div>
              </a>

              <div className="rounded-[calc(var(--card-radius)+2px)] border border-border bg-background/50 p-4">
                <div className="flex items-center gap-3">
                  <FileDown className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-base font-semibold text-foreground">Baixar guia gratuito de medidas</p>
                    <p className="mt-1 text-sm text-secondary-foreground">Receba no seu e-mail um PDF com tudo que você precisa saber antes de comprar.</p>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
                  <img src={measurementGuideAsset.url} alt="Guia gratuito de medidas da churrasqueira da Olho na Brasa" className="w-full object-cover" loading="lazy" />
                </div>

                <div className="mt-4 grid gap-3">
                  <LabelField label="E-mail">
                    <input type="email" value={form.email} onChange={(event) => onChangeField("email", event.target.value)} className="field-base" placeholder="voce@email.com" />
                  </LabelField>
                  <Button type="button" size="lg" disabled={!canSendGuide} className="min-h-13 w-full rounded-[var(--button-radius)] bg-primary text-sm font-bold tracking-[0.08em] text-primary-foreground hover:bg-primary-strong disabled:bg-primary/35" onClick={onColdGuideSubmit}>
                    ENVIAR GUIA
                  </Button>
                </div>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">Quando estiver pronto, volte aqui e fale com nosso especialista.</p>
            </div>
          ) : null}

          {stage === "email-sent" ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Guia enviado para {form.email}!</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground">Confira sua caixa de entrada. Quando estiver pronto, fale com nosso especialista 🔥</p>
              </div>
              <Button type="button" size="lg" className="min-h-13 w-full rounded-[var(--button-radius)] bg-primary text-sm font-bold tracking-[0.08em] text-primary-foreground hover:bg-primary-strong" onClick={onClose}>
                Fechar
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={`Visualização ampliada: ${item.title}`}>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground backdrop-blur" aria-label="Fechar imagem ampliada">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="w-full max-w-5xl overflow-hidden rounded-[24px] border border-white/10 bg-card shadow-fire">
        {item.image ? <img src={item.image} alt={item.alt} className="max-h-[80svh] w-full object-cover" /> : null}
        <div className="border-t border-border px-5 py-4">
          <p className="text-base font-semibold text-foreground">{item.title}</p>
          <p className="mt-1 text-sm text-secondary-foreground">{item.location}</p>
        </div>
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
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementId]);

  return (
    <Component id={elementId} style={style} className={cn("scroll-mt-24 snap-start px-0 py-20 md:py-28", visible ? "fade-visible" : "fade-hidden", className)}>
      {children}
    </Component>
  );
}

function SectionHeading({ eyebrow, title, description, centered }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto mb-10 max-w-(--container-max) px-5", centered ? "text-center" : "")}> 
      {eyebrow ? <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p> : null}
      <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.5rem,5vw,3rem)] leading-[1.04] font-semibold text-balance text-foreground md:max-w-4xl">
        {title}
      </h2>
      {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-secondary-foreground md:text-lg">{description}</p> : null}
    </div>
  );
}

function OptionButton({ icon, title, description, onClick }: { icon: ReactNode; title: string; description: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-16 w-full items-start gap-3 rounded-[calc(var(--card-radius)+2px)] border border-border bg-background/50 px-4 py-4 text-left transition-colors hover:bg-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
