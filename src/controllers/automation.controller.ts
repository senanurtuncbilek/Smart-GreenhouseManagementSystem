import { Request, Response } from 'express';
import AutomationRule from '../models/AutomationRule';

export const createAutomationRule = async (req: Request, res: Response) => {
  try {
    const rule = await AutomationRule.create(req.body);
    res.status(201).json({ message: 'Automation rule created', rule });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRules = async (req: Request, res: Response) => {
  const { greenhouseId } = req.params;

  try {
    const rules = await AutomationRule.findAll({ where: { greenhouseId } });
    res.status(200).json(rules);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
