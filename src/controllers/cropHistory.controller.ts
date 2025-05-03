import { Request, Response } from 'express';
import CropHistory from '../models/CropHistory';

export const createCropHistory = async (req: Request, res: Response) => {
  const { cropName, plantedAt, harvestedAt, greenhouseId } = req.body;

  try {
    const newCrop = await CropHistory.create({
      cropName,
      plantedAt: new Date(plantedAt),
      harvestedAt: harvestedAt ? new Date(harvestedAt) : null,
      greenhouseId,
    });

    res.status(201).json({ message: 'Crop history created', crop: newCrop });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCropHistoryByGreenhouse = async (req: Request, res: Response) => {
  const { greenhouseId } = req.params;

  try {
    const history = await CropHistory.findAll({ where: { greenhouseId } });
    res.status(200).json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
