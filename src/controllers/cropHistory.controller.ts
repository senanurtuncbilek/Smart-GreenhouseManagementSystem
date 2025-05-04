import { Request, Response } from 'express';
import CropHistory from '../models/CropHistory';
import { Op } from 'sequelize'; 
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';

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


export const getCropHistoryReport = async (req: Request, res: Response): Promise<void> => {
  const { greenhouseId } = req.params;
  const { start, end } = req.query;

  if (!start || !end) {
    res.status(400).json({ error: 'Start and end dates are required.' });
    return;
  }

  try {
    const history = await CropHistory.findAll({
      where: {
        greenhouseId,
        plantedAt: { [Op.gte]: new Date(start as string) },
        harvestedAt: { [Op.lte]: new Date(end as string) },
      },
    });

    res.status(200).json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



export const exportCropHistoryAsPDF = async (req: Request, res: Response) => {
  const { greenhouseId } = req.params;
  const { start, end } = req.query;

  if (!start || !end) {
    res.status(400).json({ error: 'Start and end dates are required.' });
    return;
  }

  try {
    const history = await CropHistory.findAll({
      where: {
        greenhouseId,
        plantedAt: { [Op.gte]: new Date(start as string) },
        harvestedAt: { [Op.lte]: new Date(end as string) },
      },
    });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=crop_history.pdf');

    doc.pipe(res);

    doc.fontSize(18).text('Crop History Report', { align: 'center' });
    doc.moveDown();

    history.forEach((crop, index) => {
      doc.fontSize(12).text(`${index + 1}. Crop: ${crop.cropName}`);
      doc.text(`   Planted: ${new Date(crop.plantedAt).toLocaleDateString()}`);
      doc.text(`   Harvested: ${crop.harvestedAt ? new Date(crop.harvestedAt).toLocaleDateString() : '---'}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};




export const exportCropHistoryExcel = async (req: Request, res: Response) => {
  const { greenhouseId } = req.params;
  const { start, end } = req.query;

  try {
    const history = await CropHistory.findAll({
      where: {
        greenhouseId,
        plantedAt: { [Op.gte]: new Date(start as string) },
        harvestedAt: { [Op.lte]: new Date(end as string) }
      }
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Crop History');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Crop Name', key: 'cropName', width: 25 },
      { header: 'Planted At', key: 'plantedAt', width: 20 },
      { header: 'Harvested At', key: 'harvestedAt', width: 20 },
    ];

    history.forEach((crop) => {
      sheet.addRow({
        id: crop.id,
        cropName: crop.cropName,
        plantedAt: crop.plantedAt.toISOString().split('T')[0],
        harvestedAt: crop.harvestedAt?.toISOString().split('T')[0] || '',
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=crop_history.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};