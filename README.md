# Projeto Casa de Reabilitação

Este é um projeto desenvolvido em **React** utilizando **HTML semântico** e **CSS** para criar uma landing page para uma casa de reabilitação. O objetivo é fornecer informações sobre a organização, seus projetos, impacto social e formas de ajudar.

## 📂 Estrutura do Projeto

Abaixo está uma visão geral da estrutura do projeto:

```
app/
  layout.tsx       # Layout principal da aplicação
  page.tsx         # Página principal (Landing Page)
  globals.css      # Estilos globais
components/
  ui/              # Componentes reutilizáveis (botões, cards, etc.)
  theme-provider.tsx
hooks/
  use-toast.ts     # Hook para notificações
lib/
  utils.ts         # Funções utilitárias
pages/
  api/
    send-email.ts  # API para envio de e-mails
public/            # Arquivos estáticos (imagens, etc.)
```

## 🚀 Funcionalidades

- **Landing Page**: Estrutura semântica com seções como "Sobre", "Projetos", "Impacto Social", "Galeria", "Contato" e "Como Ajudar".
- **Formulário de Contato**: Permite o envio de mensagens para o e-mail `projeto.liberdade@oul.com.br`.
- **Galeria de Imagens**: Exibe imagens com opção de visualização em tela cheia.
- **Notificações**: Feedback visual para ações do usuário (ex.: envio de formulário).

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface.
- **HTML5 e CSS3**: Para estrutura e estilização.
- **Tailwind CSS**: Framework utilitário para estilização.
- **Nodemailer**: Envio de e-mails via API.
- **Next.js**: Framework para renderização e roteamento.

## 🖥️ Como Configurar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env.local` na raiz do projeto e adicione as credenciais SMTP para envio de e-mails:
   ```env
   SMTP_HOST=smtp.oul.com.br
   SMTP_PORT=587
   SMTP_USER=projeto.liberdade@oul.com.br
   SMTP_PASS=sua-senha
   ```

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acesse o projeto no navegador**:
   Abra [http://localhost:3000](http://localhost:3000).

## 🧪 Como Testar

- **Testar o Formulário de Contato**:
  1. Preencha os campos obrigatórios.
  2. Clique em "Enviar Mensagem".
  3. Verifique se o e-mail foi enviado e se a notificação aparece.

- **Testar a Galeria**:
  1. Navegue até a seção "Galeria".
  2. Clique no ícone de "olho" para visualizar imagens em tela cheia.

## 📸 Imagens
As imagens utilizadas estão localizadas na pasta `public/`.

## 📝 Licença
Este projeto é apenas para fins educacionais e não possui uma licença específica.

---

Feito com ❤️ para transformar vidas!