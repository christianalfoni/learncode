function setLoadingAssignment(input, state, output) {
  state.set(['course', 'currentAssignmentStatus', 'isLoading'], true);
  output({
    runAssigment: true
  });
}

export default setLoadingAssignment;
