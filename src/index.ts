import express from 'express';
import healthRoute from './routes/health.route';
import infoRoute from './routes/info.route';
import sequelize from './config/sequelize';
import authRoute from './routes/auth.route';
import protectedRoute from './routes/protected.route';
import greenhouseRoute from './routes/greenhouse.route';
import sensorRoute from './routes/sensor.route';




import { config } from 'dotenv';
config();


const app = express();
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






app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
