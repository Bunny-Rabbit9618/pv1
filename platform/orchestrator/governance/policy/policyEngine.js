import {
  calculateRisk
} from '../risk/riskEngine.js';

export function evaluatePolicy(
  payload
) {
  const risk =
    calculateRisk(payload);

  if (
    risk.level === 'high'
  ) {
    return {
      allowed: false,
      approvalRequired: true,
      risk
    };
  }

  return {
    allowed: true,
    approvalRequired: false,
    risk
  };
}
