export function validateContract(
  definition,
  currentState,
  nextState
) {
  const transitions =
    definition.definition.transitions;

  const allowed =
    transitions[currentState] || [];

  return allowed.includes(
    nextState
  );
}
