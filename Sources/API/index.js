//archivo principal de la aplicacion
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const swaggerUi = require("swagger-ui-express");

const meetings = require('./src/Components/Meetings/network');
const errors = require('./src/NetworkResponses/errors');

const app = express();
const port = process.env.API_PORT || 3500;

//antibloqueo de cors
app.use(cors());

//recibe Content-Type JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/meetings', meetings);
app.use(express.static(process.env.IMAGE_PATH)); //comparto la carpeta de las imagenes
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); //linea para importar la documentacion de swagger
app.use(errors); //siempre debe ser el ultimo

app.listen(port, () => {
  console.log('API listening on port ' + port);
});