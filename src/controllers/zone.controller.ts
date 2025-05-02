import { Request, Response } from 'express';
import Zone from '../models/Zone';

export const createZone = async (req: Request, res: Response) => {
  const { name, description, greenhouseId } = req.body;

  try {
    const zone = await Zone.create({ name, description, greenhouseId });
    res.status(201).json({ message: 'Zone created', zone });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getZonesByGreenhouse = async (req: Request, res: Response) => {
  const { greenhouseId } = req.params;

  try {
    const zones = await Zone.findAll({ where: { greenhouseId } });
    res.status(200).json(zones);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
