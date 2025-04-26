import { Request, Response } from 'express';
import Sensor from '../models/Sensor';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const createSensor = async (req: AuthenticatedRequest, res: Response) => {
  const { greenhouseId, type, value } = req.body;

  try {
    const sensor = await Sensor.create({
      greenhouseId,
      type,
      value,
    });

    res.status(201).json({ message: 'Sensor created', sensor });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getGreenhouseSensors = async (req: AuthenticatedRequest, res: Response) => {
  const { greenhouseId } = req.params;

  try {
    const sensors = await Sensor.findAll({
      where: { greenhouseId },
    });

    res.status(200).json(sensors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
