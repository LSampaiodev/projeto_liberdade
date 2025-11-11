/**
 * Landing Page - Casa Recomeço
 *
 * Página principal da landing page para casa de reabilitação
 * Estrutura HTML5 semântica com todas as seções obrigatórias
 *
 * Seções incluídas:
 * 1. Cabeçalho (Header) - Logo e menu de navegação
 * 2. Seção de Destaque (Hero) - Imagem/vídeo com mensagem principal
 * 3. Sobre a ONG - História, missão, visão e valores
 * 4. Projetos e Ações - Principais projetos realizados
 * 5. Impacto Social - Indicadores e resultados alcançados
 * 6. Galeria - Imagens de eventos e campanhas
 * 7. Como Ajudar - Doações, voluntariado e parcerias
 * 8. Contato - Formulário e redes sociais
 * 9. Rodapé (Footer) - Direitos autorais e dados institucionais
 */

"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Leaf, Users, Award, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Eye } from "lucide-react"
import { useToast } from "../hooks/use-toast";

export default function LandingPage() {
  const { toast } = useToast();

  // Estado para controlar o menu mobile (aberto/fechado)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Estado para controlar o filtro da galeria
  const [galleryFilter, setGalleryFilter] = useState("todos")

  // Estado para controlar a imagem de preview
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  /**
   * Função para scroll suave até uma seção
   * @param sectionId - ID da seção de destino
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false) // Fecha o menu mobile após clicar
    }
  }

  /**
   * Função para lidar com o envio do formulário de contato
   * @param e - Evento do formulário
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget; // Referência ao formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Obrigado por entrar em contato. Responderemos em breve.",
          status: "success",
        });
        form.reset(); // Reseta o formulário após o envio
      } else {
        toast({
          title: "Erro ao enviar!",
          description: "Não foi possível enviar sua mensagem. Tente novamente.",
          status: "failure",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao enviar!",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        status: "error",
      });
    }
  };

  /**
   * Função para abrir o preview de uma imagem
   * @param imageUrl - URL da imagem a ser visualizada
   */
  const openPreview = (imageUrl: string) => {
    setPreviewImage(imageUrl)
  }

  /**
   * Função para fechar o preview de uma imagem
   */
  const closePreview = () => {
    setPreviewImage(null)
  }

  return (
    <>
      {/* ========================================
          CABEÇALHO (HEADER)
          Contém logo e menu de navegação responsivo
          Tag semântica: <header>
      ======================================== */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo da ONG */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Projeto Liberdade</span>
            </div>

            {/* Menu Desktop - visível apenas em telas médias e grandes */}
            <ul className="hidden md:flex items-center gap-8">
              <li>
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("sobre")}
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projetos")}
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Projetos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("impacto")}
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Impacto
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("galeria")}
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Galeria
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ajudar")}
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Como Ajudar
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>

            {/* Botão do Menu Mobile - visível apenas em telas pequenas */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-emerald-600"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Mobile - dropdown que aparece quando mobileMenuOpen é true */}
          {mobileMenuOpen && (
            <ul className="md:hidden mt-4 space-y-2 pb-4">
              <li>
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("sobre")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg"
                >
                  Sobre
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projetos")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg"
                >
                  Projetos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("impacto")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg"
                >
                  Impacto
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("galeria")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg"
                >
                  Galeria
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("ajudar")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg"
                >
                  Como Ajudar
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="block w-full text-left px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg"
                >
                  Contato
                </button>
              </li>
            </ul>
          )}
        </nav>
      </header>

      {/* ========================================
          CONTEÚDO PRINCIPAL (MAIN)
          Tag semântica: <main>
      ======================================== */}
      <main>
        {/* ========================================
            SEÇÃO DE DESTAQUE (HERO)
            Imagem de fundo com mensagem principal
            Tag semântica: <section>
        ======================================== */}
        <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20">
          {/* Imagem de fundo com overlay escuro para melhor legibilidade do texto */}
          <div className="absolute inset-0 z-0">
            <img src="/centro_de_reabilitacao.jpg" alt="Casa de Reabilitação" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          </div>

          {/* Conteúdo do Hero - centralizado sobre a imagem */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Transformando Vidas, Construindo Futuros
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-pretty">
              Um lugar de acolhimento, recuperação e esperança para quem busca recomeçar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("ajudar")}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Faça uma Doação
              </button>
              <button
                onClick={() => scrollToSection("sobre")}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors border border-white/30"
              >
                Conheça Nossa História
              </button>
            </div>
          </div>
        </section>

        {/* ========================================
            SOBRE A ONG
            História, missão, visão e valores
            Tag semântica: <section>
        ======================================== */}
        <section id="sobre" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Título da seção */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sobre o Projeto Liberdade</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Há mais de 28 anos transformando vidas através do acolhimento, tratamento e reinserção social
              </p>
            </div>

            {/* Grid com história e cards de missão/visão/valores */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* História da ONG */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa História</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A Comunidade Terapêutica Projeto Liberdade, foi constituída em 15 de janeiro de 1997. A diretriz do trabalho consiste em atuar conforme normas básicas das comunidades terapêuticas, que
                  em suas várias definições é um ambiente estruturado no qual os indivíduos com transtornos
                  decorrentes do uso e abuso de substâncias psicoativas, residem, provisoriamente, para alcançar a
                  reabilitação, visando a garantia de direitos, a convivência comunitária e o fortalecimento dos
                  vínculosfamiliares.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">

                  Tem como objetivo oferecer tratamento terapêutico para pessoas com transtornos de-
                  correntes do uso abusivo de substâncias psicoativas (dependência química) assim como o
                  enfrentamento e a busca de alternativas para solucionar os conflitos vinculados a esse abuso,
                  propondo uma  abordagem de autoajuda, e oferecendo qualidade de vida aos usuários dos serviços,
                  com atendimento personalizado em pequenos grupos, em ambiente estruturado, por meio de
                  internação voluntária com período de 180 dias (desintoxicação, conscientização, prevenção a
                  recaída e ressocialização).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Começamos com uma pequena casa que acolhia 10 pessoas. Hoje, somos referência nacional em tratamento e
                  recuperação, com instalações e uma equipe multidisciplinar dedicada.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Ao longo desses anos, já ajudamos mais de 2.500 pessoas a reconstruírem suas vidas, reencontrarem suas
                  famílias e retornarem à sociedade com dignidade e propósito.
                </p>
              </div>

              {/* Imagem ilustrativa */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/jardim_principal.jpg"
                  alt="Instalações do Projeto Liberdade"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Cards de Missão, Visão e Valores */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card: Missão */}
              <article className="bg-emerald-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Promover a recuperação integral de pessoas em situação de vulnerabilidade, oferecendo tratamento
                  humanizado, acolhimento e ferramentas para a reinserção social.
                </p>
              </article>

              {/* Card: Visão */}
              <article className="bg-teal-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ser referência nacional em tratamento e recuperação, reconhecida pela excelência no cuidado e pelos
                  resultados transformadores na vida das pessoas.
                </p>
              </article>

              {/* Card: Valores */}
              <article className="bg-cyan-50 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
                <ul className="text-gray-700 leading-relaxed space-y-2">
                  <li>• Respeito à dignidade humana</li>
                  <li>• Acolhimento sem julgamentos</li>
                  <li>• Compromisso com resultados</li>
                  <li>• Trabalho em equipe</li>
                  <li>• Transparência e ética</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================
            PROJETOS E AÇÕES
            Descrição dos principais projetos
            Tag semântica: <section>
        ======================================== */}
        <section id="projetos" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Título da seção */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Projetos e Ações</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conheça os programas que transformam vidas e constroem futuros
              </p>
            </div>

            {/* Grid de projetos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Projeto 1: Acolhimento Integral */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="/casa.jpg" alt="Acolhimento Integral" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Acolhimento Integral</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Programa residencial com acompanhamento 24h, oferecendo moradia, alimentação, cuidados médicos e
                    psicológicos em ambiente seguro e acolhedor.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <span>Em andamento</span>
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </article>

              {/* Projeto 2: Terapia Ocupacional */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="/terapia.png" alt="Terapia Ocupacional" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Terapia Ocupacional</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Oficinas de artesanato, jardinagem, culinária e outras atividades que promovem autoestima,
                    desenvolvimento de habilidades e preparação para o mercado de trabalho.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <span>Em andamento</span>
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </article>

              {/* Projeto 3: Reinserção Familiar */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="/reinsecao_familiar.jpg" alt="Reinserção Familiar" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Reinserção Familiar</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Programa de terapia familiar, mediação de conflitos e preparação para o retorno ao convívio
                    familiar, fortalecendo vínculos e promovendo reconciliação.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <span>Em andamento</span>
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </article>

              {/* Projeto 4: Capacitação Profissional */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="/treinamentos.jpg"
                  alt="Capacitação Profissional"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Capacitação Profissional</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Cursos profissionalizantes em parceria com empresas e instituições de ensino, preparando os
                    residentes para o mercado de trabalho e autonomia financeira.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <span>Em andamento</span>
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </article>

              {/* Projeto 5: Acompanhamento Pós-Alta */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="/acompanhamento.png"
                  alt="Acompanhamento Pós-Alta"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Acompanhamento Pós-Alta</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Suporte contínuo após a conclusão do tratamento, com grupos de apoio, consultas periódicas e
                    assistência na manutenção da recuperação.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <span>Em andamento</span>
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </article>

              {/* Projeto 6: Prevenção Comunitária */}
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src="/prevencoes.jpg"
                  alt="Prevenção Comunitária"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Prevenção Comunitária</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Palestras e workshops em escolas, empresas e comunidades sobre prevenção, conscientização e combate
                    ao estigma relacionado à dependência química.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <span>Em andamento</span>
                    <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================
            IMPACTO SOCIAL
            Indicadores e resultados alcançados
            Tag semântica: <section>
        ======================================== */}
        <section id="impacto" className="py-20 bg-emerald-600 text-white">
          <div className="container mx-auto px-4">
            {/* Título da seção */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Nosso Impacto</h2>
              <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                Números que representam vidas transformadas e futuros reconstruídos
              </p>
            </div>

            {/* Grid de estatísticas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Estatística 1 */}
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">2.500+</div>
                <div className="text-xl text-emerald-100">Vidas Transformadas</div>
              </div>

              {/* Estatística 2 */}
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">78%</div>
                <div className="text-xl text-emerald-100">Taxa de Recuperação</div>
              </div>

              {/* Estatística 3 */}
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">28</div>
                <div className="text-xl text-emerald-100">Anos de Atuação</div>
              </div>

              {/* Estatística 4 */}
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">120</div>
                <div className="text-xl text-emerald-100">Vagas Disponíveis</div>
              </div>
            </div>

            {/* Depoimentos */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Depoimento 1 */}
              <article className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <p className="text-lg leading-relaxed mb-4 italic">
                  "1 ano de sobriedade! Não foi fácil, mas com o alicerce em Cristo, a ajuda do Projeto Liberdade, 
                  da Igreja Presbiteriana Livre e os 12 Passos de A.A., 
                  venci as lutas e desconfianças. Hoje, escolho vencer e abraçar as novas oportunidades. 
                  APENAS MAIS UM dia sóbrio e vitorioso."
                </p>
                <div className="font-semibold">— Charlles De Abreu Wesley, ex-residente</div>
              </article>

              {/* Depoimento 2 */}
              <article className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <p className="text-lg leading-relaxed mb-4 italic">
                  "Recuperei meu filho graças ao trabalho dedicado da equipe. O programa de reinserção familiar foi
                  fundamental para reconstruirmos nossa relação."
                </p>
                <div className="font-semibold">— Maria Santos, familiar</div>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================
            GALERIA
            Imagens de eventos, campanhas e ações
            Tag semântica: <section>
        ======================================== */}
        <section id="galeria" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Título da seção */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Galeria</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Momentos que marcam nossa jornada de transformação
              </p>

              {/* Filtros da galeria */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setGalleryFilter("todos")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${galleryFilter === "todos"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setGalleryFilter("instalacoes")}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${galleryFilter === "instalacoes"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Instalações
                </button>
              </div>
            </div>

            {/* Grid de imagens da galeria */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Imagem 1 - Instalações */}
              {(galleryFilter === "todos" || galleryFilter === "instalacoes") && (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                  <img
                    src="/rua.jpg"
                    alt="Sala de convivência"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => openPreview("/rua.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    aria-label="Preview image"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}
              {/* Imagem 2 - Instalações */}
              {(galleryFilter === "todos" || galleryFilter === "instalacoes") && (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                  <img
                    src="/campo.jpg"
                    alt="Sessão de terapia em grupo"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => openPreview("/campo.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    aria-label="Preview image"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}

              {/* Imagem 3 - Instalações */}
              {(galleryFilter === "todos" || galleryFilter === "instalacoes") && (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                  <img
                    src="/local_alimentacao.jpg"
                    alt="Instalações modernas"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => openPreview("/local_alimentacao.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    aria-label="Preview image"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}

              {/* Imagem 4 - Instalações */}
              {(galleryFilter === "todos" || galleryFilter === "instalacoes") && (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                  <img
                    src="/jardim.jpg"
                    alt="Doações de suprimentos"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => openPreview("/jardim.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    aria-label="Preview image"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}

              {/* Imagem 6 - Instalações */}
              {(galleryFilter === "todos" || galleryFilter === "instalacoes") && (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                  <img
                    src="/jardim_entrada.jpg"
                    alt="Jardim terapêutico"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => openPreview("/jardim_entrada.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    aria-label="Preview image"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}

              {/* Imagem 7 - Instalações */}
              {(galleryFilter === "todos" || galleryFilter === "todos") && (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                  <img
                    src="/doacoes.jpg"
                    alt="Doacões de suprimentos"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => openPreview("/doacoes.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    aria-label="Preview image"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}

              {/* Imagem 1 - Instalações */}
              {(galleryFilter === "todos" || galleryFilter === "instalacoes") && (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                  <img
                    src="/rua.jpg"
                    alt="Sala de convivência"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => openPreview("/rua.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    aria-label="Preview image"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}
              {/* Imagem 9 - Instalações */}
              {(galleryFilter === "todos" || galleryFilter === "instalacoes") && (
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
                  <img
                    src="/igreja.jpg"
                    alt="igreja próxima à casa de reabilitação"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => openPreview("/igreja.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    aria-label="Preview image"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================
            COMO AJUDAR
            Instruções para doações, voluntariado e parcerias
            Tag semântica: <section>
        ======================================== */}
        <section id="ajudar" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Título da seção */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Como Ajudar</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sua contribuição transforma vidas. Escolha a melhor forma de apoiar nossa causa
              </p>
            </div>

            {/* Grid de formas de ajudar */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card: Doações */}
              <article className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Faça uma Doação</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Contribuições financeiras nos ajudam a manter nossas atividades, melhorar instalações e ampliar o
                  atendimento.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="text-sm text-gray-600">
                    <strong>PIX:</strong> doacoes@casarecomeço.org.br
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Banco:</strong> 001 - Banco do Brasil
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Agência:</strong> 1234-5
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Conta:</strong> 12345-6
                  </div>
                </div>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Doar Agora
                </button>
              </article>

              {/* Card: Voluntariado */}
              <article className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Seja Voluntário</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Compartilhe seu tempo e conhecimento. Precisamos de profissionais de diversas áreas para apoiar nossos
                  projetos.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-700">
                  <div>• Profissionais da saúde</div>
                  <div>• Educadores e instrutores</div>
                  <div>• Psicólogos e terapeutas</div>
                  <div>• Assistentes sociais</div>
                  <div>• Profissionais de RH</div>
                </div>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Quero Ser Voluntário
                </button>
              </article>

              {/* Card: Parcerias */}
              <article className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Parcerias</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Empresas e instituições podem apoiar através de patrocínios, doações de materiais ou programas de
                  capacitação.
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-700">
                  <div>• Patrocínio de projetos</div>
                  <div>• Doação de materiais</div>
                  <div>• Programas de capacitação</div>
                  <div>• Oportunidades de emprego</div>
                  <div>• Responsabilidade social</div>
                </div>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                >
                  Seja Parceiro
                </button>
              </article>
            </div>
          </div>
        </section>

        {/* ========================================
            CONTATO
            Formulário simples e links para redes sociais
            Tag semântica: <section>
        ======================================== */}
        <section id="contato" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Título da seção */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Entre em Contato</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Estamos prontos para atender você. Envie sua mensagem ou entre em contato pelos nossos canais
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Formulário de contato */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo: Nome */}
                  <div>
                    <label htmlFor="nome" className="block text-sm font-semibold text-gray-900 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
                      placeholder="Seu nome"
                    />
                  </div>

                  {/* Campo: Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  {/* Campo: Telefone */}
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  {/* Campo: Assunto */}
                  <div>
                    <label htmlFor="assunto" className="block text-sm font-semibold text-gray-900 mb-2">
                      Assunto *
                    </label>
                    <select
                      id="assunto"
                      name="assunto"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="informacoes">Informações Gerais</option>
                      <option value="doacao">Doação</option>
                      <option value="voluntariado">Voluntariado</option>
                      <option value="parceria">Parceria</option>
                      <option value="internacao">Internação</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  {/* Campo: Mensagem */}
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-900 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    ></textarea>
                  </div>

                  {/* Botão de envio */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>

              {/* Informações de contato e redes sociais */}
              <div>
                {/* Informações de contato */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
                      <p className="text-gray-700">(19) 99955-1041</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                      <p className="text-gray-700">projeto.liberdade@oul.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
                      <p className="text-gray-700">
                        Av. Nelson Rubini , 360
                        <br />
                        Nova Veneza,
                        <br />
                        Paulínia - SP, 13140-000
                      </p>
                    </div>
                  </div>
                </div>

                {/* Redes sociais */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Siga-nos nas Redes Sociais</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                {/* Horário de atendimento */}
                <div className="mt-8 p-6 bg-emerald-50 rounded-2xl">
                  <h3 className="font-semibold text-gray-900 mb-3">Horário de Atendimento</h3>
                  <p className="text-gray-700">
                    Segunda a Sexta: 8h às 18h
                    <br />
                    Sábado: 9h às 13h
                    <br />
                    Emergências: 24h por dia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal for image preview */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            aria-label="Close preview"
          >
            ✕
          </button>
        </div>
      )}

      {/* ========================================
          RODAPÉ (FOOTER)
          Informações de direitos autorais e dados institucionais
          Tag semântica: <footer>
      ======================================== */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Coluna 1: Logo e descrição */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Projeto Liberdade </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transformando vidas através do acolhimento, tratamento e reinserção social desde 2009.
              </p>
            </div>

            {/* Coluna 2: Links rápidos */}
            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("sobre")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("projetos")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Projetos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("impacto")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Nosso Impacto
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("galeria")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Galeria
                  </button>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Como ajudar */}
            <div>
              <h3 className="font-semibold mb-4">Como Ajudar</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection("ajudar")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Fazer Doação
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("ajudar")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Ser Voluntário
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("ajudar")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Parcerias
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contato")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>

            {/* Coluna 4: Dados institucionais */}
            <div>
              <h3 className="font-semibold mb-4">Dados Institucionais</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>CNPJ: 02.710.198/00001-22</li>
                <li>Utilidade Pública Municipal</li>
                <li>Certificado CEBAS</li>
                <li>Registro CNAS: 123456</li>
              </ul>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-sm text-gray-400">© 2025 Casa Recomeço. Todos os direitos reservados.</p>

              {/* Links legais */}
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
