import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Reemplazo de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
//const app: express.Application = express();

// Habilitar CORS
app.use(cors());
app.use(express.json());

/*const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://simulador-udg.vercel.app' // La URL del frontend en producción
    : 'http://localhost:5173', // El frontend en desarrollo
};*/

//app.use(cors(corsOptions));

// Habilitar CORS para permitir solicitudes desde el frontend en el puerto 5173
/*app.use(cors({
  origin: 'http://localhost:5173', // Permitir solo solicitudes desde el frontend
}));*/

// Middleware para procesar datos del formulario
app.use(bodyParser.json());

// Ruta para manejar la solicitud POST y guardar datos en un archivo .txt
app.post("/save-data", (req, res) => {
  const { customer, representative, phone, email, street_address, city, state, country, zip_code } = req.body;

  // Ruta de la carpeta donde se guardará el archivo
  const folderPath = path.join(__dirname, "files");
  const filePath = path.join(folderPath, "datos.txt");

  // Crear la carpeta si no existe
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Contenido del archivo  
  const fileContent = `Customer: ${customer}\nRepresentative: ${representative}\nPhone: ${phone}\nEmail: ${email}\nStreet_address: ${street_address}\nCity: ${city}\nState: ${state}\nCountry: ${country}\nZip_code: ${zip_code}\n\n`;

  // Guardar datos en el archivo
  fs.appendFileSync(filePath, fileContent, "utf8");

  // Responder al cliente
  res.json({ message: "¡Datos guardados correctamente!" });
});


// Ruta para obtener los datos desde el archivo
app.get('/api/customers', (req, res) => {
  console.log(req.body);
  console.log('Endpoint /api/customers fue llamado');
  const filePath = path.join(__dirname, 'files', 'datos.txt');  // Ruta al archivo
  fs.readFile(filePath, 'utf8', (err, data: string) => {
    if (err) {
      return res.status(500).send('Error al leer el archivo');
    }
    const customers = parseCustomers(data);  // Procesar solo los nombres de los clientes
    console.log('Clientes procesados:', customers);
    res.json(customers);  // Enviar solo los nombres de los clientes
  });
});

interface Customer {
  id: string;
  representante?: string;
  phone?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
}

const parseCustomers = (data: string): Customer[] => {
  const lines = data.split('\n');
  const customers: Customer[] = [];


  //let currentCustomer = null;
  let currentCustomer: Customer | null = null;


  lines.forEach((line: string) => {
    const [key, value] = line.split(':').map((item: string) => item.trim());

    if (key === 'Customer' && value) {
      if (currentCustomer) {
        customers.push(currentCustomer);  // Si hay un cliente en proceso, lo agregamos a la lista
      }
      currentCustomer = { id: value };  // Comenzamos un nuevo cliente
    } else if (currentCustomer) {
      currentCustomer[key.toLowerCase() as keyof Customer] = value;  // Asignamos la propiedad al cliente actual
    }
  });

  if (currentCustomer) {
    customers.push(currentCustomer);  // Agregamos el último cliente si es necesario
  }

  return customers;
};




//Bloque para gestionar numero de cotizacion
const filePathCo= path.join(__dirname, 'files', 'numbers.txt');

// Función para generar un número aleatorio
function generateRandomNumber(): number {
  return Math.floor(100000 + Math.random() * 900000); // Número de 6 dígitos
}

// Función para verificar si un número ya existe en el archivo
function isNumberInFile(number: number): boolean {
  try {
    const fileContent = fs.existsSync(filePathCo) ? fs.readFileSync(filePathCo, 'utf-8') : '';
    const numbers = fileContent.split('\n').filter(Boolean);
    return numbers.includes(number.toString());
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return false;
  }
}

// Endpoint para generar y guardar el número
app.post('/generate-quote-number', (_, res) => {
  let quoteNumber: number;

  // Intentar generar un número único
  do {
    quoteNumber = generateRandomNumber();
  } while (isNumberInFile(quoteNumber));

  // Guardar el número en el archivo
  try {
    fs.appendFileSync(filePathCo, `${quoteNumber}\n`);
    res.json({ quoteNumber });
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
    res.status(500).json({ error: 'No se pudo guardar el número generado.' });
  }
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
