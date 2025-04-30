import AutomationRule from '../models/AutomationRule';

export const checkAutomationRules = async (sensor: any) => {
  const rules = await AutomationRule.findAll({
    where: {
      greenhouseId: sensor.greenhouseId,
      isActive: true
    }
  });

  rules.forEach((rule) => {
    const condition = rule.condition;
    const { type, operator, value } = condition;

    if (type !== sensor.type) return;

    const sensorValue = sensor.value;
    let isTriggered = false;

    switch (operator) {
      case '>': isTriggered = sensorValue > value; break;
      case '<': isTriggered = sensorValue < value; break;
      case '=': isTriggered = sensorValue === value; break;
      case '>=': isTriggered = sensorValue >= value; break;
      case '<=': isTriggered = sensorValue <= value; break;
    }

    if (isTriggered) {
      console.log(`⚠️ [AUTOMATION TRIGGERED] ${rule.name}: ${rule.action.message}`);
    }
  });
};
