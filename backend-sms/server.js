require('dotenv').config({ path: './backend-sms/.env' }); // 👈 atualize o caminho conforme necessário

console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN:", process.env.TWILIO_AUTH_TOKEN);

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

// Twilio config
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Endpoint para receber dados do formulário
app.post('/enviar-sms', async (req, res) => {
  const { nome, telefone, data, mensagem } = req.body;

  const texto = `🐾 Agendamento Petshop 🐶🐱\nNome: ${nome}\nTelefone: ${telefone}\nData: ${data}\nMensagem: ${mensagem}`;

  try {
    const sms = await client.messages.create({
      body: texto,
      from: process.env.TWILIO_PHONE_NUMBER=+13183296177,
      to: +5531993079970 // pode ser o número do cliente ou do petshop
    });

    res.status(200).json({ sucesso: true, sid: sms.sid });
  } catch (erro) {
    console.error('Erro ao enviar SMS:', erro.message);
    res.status(500).json({ sucesso: false, erro: erro.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
