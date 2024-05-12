import express from 'express';
import userRoutes from './routes/user.routes.js';
import connectToMongoDB from './DB/connectToMondoDB.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin :[process.env.CLIENT_URL],
  credentials: true, // Autorise les cookies et les en-têtes d'authentification
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/user', userRoutes); // pour les routes liées aux utilisateurs



app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server lancé sur le port ${port}`);
});

