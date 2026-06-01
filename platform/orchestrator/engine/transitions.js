import {
  loadWorkflowDefinition
} from '../registry/workflowRegistry.js';

import {
  validateContract
} from '../registry/contracts/contractEngine.js';

export async function validateTransition(
  workflowType,
  currentState,
  nextState
) {
  const definition =
    await loadWorkflowDefinition(
      workflowType
    );

  return validateContract(
    definition,
    currentState,
    nextState
  );
}
