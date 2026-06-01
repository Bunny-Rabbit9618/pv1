export class WorkflowState {
  constructor({
    workflowId,
    workflowType,
    currentState,
    lastEvent,
    version = 1,
    updatedAt = new Date().toISOString()
  }) {
    this.workflowId = workflowId;
    this.workflowType = workflowType;
    this.currentState = currentState;
    this.lastEvent = lastEvent;
    this.version = version;
    this.updatedAt = updatedAt;
  }
}
