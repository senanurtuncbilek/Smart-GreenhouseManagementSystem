import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
config();


import healthRoute from './routes/health.route';
import infoRoute from './routes/info.route';
import authRoute from './routes/auth.route';
import protectedRoute from './routes/protected.route';
import greenhouseRoute from './routes/greenhouse.route';
import sensorRoute from './routes/sensor.route';
import sequelize from './config/sequelize';
import automationRoute from './routes/automation.route';

const app = express();
const httpServer = createServer(app); // express app'i http'e bağlıyoruz
const io = new Server(httpServer, {
  cors: {
    origin: '*', // frontend başka porttaysa izin verir
    methods: ['GET', 'POST']
  }
});

const PORT = 3000;
app.use(express.json());


sequelize.authenticate()
  .then(() => console.log('Database connection successful!'))
  .catch((err) => console.error('Database connection failed:', err));

sequelize.sync({ alter: true })
  .then(() => console.log(" Models synchronized with database!"))
  .catch((err) => console.error(" Model sync error:", err));


app.use('/api', healthRoute);
app.use('/api', infoRoute);
app.use('/api/auth', authRoute);
app.use('/api/protected', protectedRoute);
app.use('/api/greenhouse', greenhouseRoute);
app.use('/api/sensor', sensorRoute);
app.use('/api/automation', automationRoute);


io.on('connection', (socket) => {
  console.log('Kullanıcı bağlandı:', socket.id);

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
  });
});


export { io };


httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
