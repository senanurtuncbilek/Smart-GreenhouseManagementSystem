import { Request, Response } from 'express';
import AutomationRule from '../models/AutomationRule';

export const createAutomationRule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      greenhouseId,
      name,
      conditions,
      actions,
      priority,
      activeHours,
      isActive = true,
    } = req.body;

    
    if (!greenhouseId || !name || !conditions || !actions) {
      res.status(400).json({
        error:
          'Eksik alanlar var. greenhouseId, name, conditions ve actions zorunludur.',
      });
      return;
    }

    if (!Array.isArray(conditions) || !Array.isArray(actions)) {
      res
        .status(400)
        .json({ error: 'conditions ve actions array olmalıdır.' });
      return;
    }

    const rule = await AutomationRule.create({
      greenhouseId,
      name,
      conditions,
      actions,
      priority,
      activeHours,
      isActive,
    });

    res.status(201).json({ message: 'Automation rule created', rule });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRules = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { greenhouseId } = req.params;

  try {
    const rules = await AutomationRule.findAll({
      where: { greenhouseId },
      order: [['priority', 'ASC']],
    });

    res.status(200).json(rules);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
