const print = console.log.bind(console);
module.exports = {
  nicePrint: a => print(JSON.stringify(a, null, 2)),
  print,
};
