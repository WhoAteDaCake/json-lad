function calledWithAction(action, spy) {
  return (
    spy.getCalls().filter(call => call.args[0].action === action).length !== 0
  );
}

module.exports = {
  calledWithAction,
};
