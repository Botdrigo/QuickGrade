const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const port = 3000;

// Middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Servir el formulario HTML (si estás usando un archivo en tu servidor)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pruebita.html'));
});

// Configura el transportador de Nodemailer para enviar correos
const transporter = nodemailer.createTransport({
  service: 'gmail', // Usando Gmail como ejemplo
  auth: {
    user: 'adamvery007@gmail.com', // Tu correo de Gmail
    pass: 'dbsu bznl wbrb cjlm', // Tu contraseña de Gmail o un App Password (para seguridad)
  },
});

// Ruta para enviar el correo
app.post('/send-email', (req, res) => {
  const { message, email } = req.body;

  const mailOptions = {
    from: email,
    to: 'rfranzaepic@gmail.com', // Correo al que se enviará el mensaje
    subject: 'RECOMENDACION QUICKGRADE',
    text: `${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Hubo un problema al enviar el correo.');
    }
    console.log('Correo enviado: ' + info.response);
    res.send('Mensaje enviado con éxito');
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
