import AutomationRule from '../models/AutomationRule';
import { io } from '../index';

function isWithinActiveHours(activeHours?: { start: string, end: string }): boolean {
  if (!activeHours) return true;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [startH, startM] = activeHours.start.split(':').map(Number);
  const [endH, endM] = activeHours.end.split(':').map(Number);
  const start = startH * 60 + startM;
  const end = endH * 60 + endM;

  return currentMinutes >= start && currentMinutes <= end;
}

export const checkAutomationRules = async (sensor: any) => {
  const rules = await AutomationRule.findAll({
    where: {
      greenhouseId: sensor.greenhouseId,
      isActive: true
    }
  });

  rules.forEach((rule) => {
    // Güvenlik kontrolü: conditions ve actions geçerli mi?
    if (!Array.isArray(rule.conditions) || !Array.isArray(rule.actions)) return;

    // Saat aralığı kontrolü
    if (!isWithinActiveHours(rule.activeHours)) return;

    const triggered = rule.conditions.every((condition: any) => {
      if (condition.sensor !== sensor.type) return true;
      switch (condition.operator) {
        case '>': return sensor.value > condition.value;
        case '<': return sensor.value < condition.value;
        case '=': return sensor.value === condition.value;
        case '>=': return sensor.value >= condition.value;
        case '<=': return sensor.value <= condition.value;
        default: return false;
      }
    });

    if (triggered) {
      rule.actions.forEach((action: any) => {
        console.log(`⚠️ [AUTOMATION TRIGGERED] ${rule.name}: ${action.device} → ${action.action}`);

        io.emit('automation-alert', {
          ruleName: rule.name,
          message: `${action.device} → ${action.action}`,
          timestamp: new Date(),
          greenhouseId: sensor.greenhouseId
        });
      });
    }
  });
};
