import { Response } from 'express';
import Sensor from '../models/Sensor';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { io } from '../index';
import { checkAutomationRules } from '../services/automation.service';



export const createSensor = async (req: AuthenticatedRequest, res: Response): Promise<void>  => {
  const { greenhouseId, type, value, unit } = req.body;

  try {
    
    if (type === 'temperature' && (value < -30 || value > 60)) {
      res.status(400).json({ error: 'Geçersiz sıcaklık değeri.' });
    }

    if (type === 'humidity' && (value < 0 || value > 100)) {
      res.status(400).json({ error: 'Geçersiz nem değeri.' });
    }

    const sensor = await Sensor.create({
      greenhouseId,
      type,
      value,
      unit,
      timestamp: new Date(),
      status: 'active',
    });

    await checkAutomationRules(sensor);
    
    io.emit('sensor-data', sensor.toJSON());

    res.status(201).json({ message: 'Sensor created', sensor });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getGreenhouseSensors = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { greenhouseId } = req.params;

  try {
    const sensors = await Sensor.findAll({
      where: { greenhouseId },
      order: [['timestamp', 'DESC']],
    });

    res.status(200).json(sensors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
