import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    // Configurar o transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou outro serviço de e-mail
      auth: {
        user: 'lukasoliveiraoficial55@gmail.com', // Substitua pelo seu e-mail
        pass: 'jjaz byml wygs fbqg', // Substitua pela sua senha ou app password
      },
    });

    try {
      // Enviar o e-mail
      await transporter.sendMail({
        from: email,
        to: 'projeto.liberdade@oul.com.br',
        subject: `Novo contato: ${assunto}`,
        text: `
          Nome: ${nome}
          E-mail: ${email}
          Telefone: ${telefone}
          Mensagem: ${mensagem}
        `,
      });

      res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}