export function calculateRisk(
  payload
) {
  let score = 0;

  const highRiskEvents = [
    'payment.refund',
    'crew.removed',
    'invoice.deleted',
    'workflow.override',
    'manual.dispatch'
  ];

  if (
    highRiskEvents.includes(
      payload.type
    )
  ) {
    score += 75;
  }

  if (
    payload.priority ===
    'high'
  ) {
    score += 15;
  }

  if (
    payload.manual === true
  ) {
    score += 10;
  }

  return {
    score,

    level:
      score >= 70
        ? 'high'
        : score >= 40
        ? 'medium'
        : 'low'
  };
}
