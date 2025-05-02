import { Response } from "express";
import Sensor from "../models/Sensor";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { io } from "../index";
import { checkAutomationRules } from "../services/automation.service";
import redis from "../config/redis";

export const createSensor = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { greenhouseId, zoneId, type, value, unit } = req.body;

  try {
    if (type === "temperature" && (value < -30 || value > 60)) {
      res.status(400).json({ error: "Geçersiz sıcaklık değeri." });
      return;
    }

    if (type === "humidity" && (value < 0 || value > 100)) {
      res.status(400).json({ error: "Geçersiz nem değeri." });
      return;
    }

    // Sensör verisini oluştur
    const sensor = await Sensor.create({
      greenhouseId,
      zoneId,
      type,
      value,
      unit,
      timestamp: new Date(),
      status: "active",
    });

    // Redis'e yaz
    await redis.setex(
      `sensor:last:${greenhouseId}`,
      300,
      JSON.stringify(sensor.toJSON())
    );

    // Otomasyon kontrolü ve yayını
    await checkAutomationRules(sensor);
    io.emit("sensor-data", sensor.toJSON());

    res.status(201).json({ message: "Sensor created", sensor });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getGreenhouseSensors = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { greenhouseId } = req.params;
  const { zoneId } = req.query;

  try {
    const whereClause: any = { greenhouseId };
    if (zoneId) whereClause.zoneId = zoneId;

    const sensors = await Sensor.findAll({
      where: { greenhouseId },
      order: [["timestamp", "DESC"]],
    });

    res.status(200).json(sensors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLastSensorFromCache = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { greenhouseId } = req.params;

  try {
    const cached = await redis.get(`sensor:last:${greenhouseId}`);
    if (!cached) {
      res.status(404).json({ message: "Redis üzerinde veri bulunamadı." });
      return;
    }

    const sensor = JSON.parse(cached);
    res.status(200).json(sensor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
