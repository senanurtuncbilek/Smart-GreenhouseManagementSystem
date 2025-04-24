import { Response, RequestHandler } from 'express';
import Greenhouse from '../models/Greenhouse';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const createGreenhouse = async (req: AuthenticatedRequest, res: Response) => {
  const { name, location, temperatureThreshold, humidityThreshold, autoIrrigationEnabled } = req.body;

  try {
    const greenhouse = await Greenhouse.create({
      name,
      location,
      temperatureThreshold,
      humidityThreshold,
      autoIrrigationEnabled,
      userId: req.user?.id,
    });

    res.status(201).json({ message: 'Greenhouse created', greenhouse });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserGreenhouses = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const greenhouses = await Greenhouse.findAll({ where: { userId: req.user?.id } });
    res.status(200).json(greenhouses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const updateGreenhouse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, location, temperatureThreshold, humidityThreshold, autoIrrigationEnabled } = req.body;
  
    try {
      const greenhouse = await Greenhouse.findOne({ where: { id, userId: req.user?.id } });
  
      if (!greenhouse) {
        res.status(404).json({ error: 'Greenhouse not found or access denied' });
        return;
      }
  
      greenhouse.name = name ?? greenhouse.name;
      greenhouse.location = location ?? greenhouse.location;
      greenhouse.temperatureThreshold = temperatureThreshold ?? greenhouse.temperatureThreshold;
      greenhouse.humidityThreshold = humidityThreshold ?? greenhouse.humidityThreshold;
      greenhouse.autoIrrigationEnabled = autoIrrigationEnabled ?? greenhouse.autoIrrigationEnabled;
  
      await greenhouse.save();
  
      res.status(200).json({ message: 'Greenhouse updated', greenhouse });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  


  export const deleteGreenhouse = async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const userId = req.user?.id;
  
    try {
      const deletedCount = await Greenhouse.destroy({
        where: { id, userId },
      });
  
      if (deletedCount === 0) {
        res.status(404).json({ error: 'Greenhouse not found or access denied' });
        return;
      }
  
      res.status(200).json({ message: 'Greenhouse deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  