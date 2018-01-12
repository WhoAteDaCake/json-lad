// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

const { TOKEN_CONFIG } = require('./constants/parser');
const lexer = require("moo").compile(TOKEN_CONFIG);
const parser = require('./parser');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "program$ebnf$1", "symbols": []},
    {"name": "program$ebnf$1$subexpression$1", "symbols": ["LINE"]},
    {"name": "program$ebnf$1", "symbols": ["program$ebnf$1", "program$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "program", "symbols": ["LINE", "program$ebnf$1"], "postprocess": parser.program},
    {"name": "LINE$ebnf$1", "symbols": []},
    {"name": "LINE$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "LINE$ebnf$1", "symbols": ["LINE$ebnf$1", "LINE$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "LINE", "symbols": ["_", "action", {"literal":";"}, "LINE$ebnf$1"], "postprocess": parser.line},
    {"name": "action", "symbols": ["assign"]},
    {"name": "action", "symbols": ["printScope"]},
    {"name": "object$ebnf$1", "symbols": []},
    {"name": "object$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "pair"]},
    {"name": "object$ebnf$1", "symbols": ["object$ebnf$1", "object$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "object", "symbols": [{"literal":"{"}, "_", "pair", "object$ebnf$1", "_", {"literal":"}"}], "postprocess": parser.base.object},
    {"name": "pair", "symbols": ["label", "_", {"literal":":"}, "_", "value"], "postprocess": parser.base.pair('regular')},
    {"name": "pair", "symbols": [{"literal":"["}, "variable", {"literal":"]"}, "_", {"literal":":"}, "_", "value"], "postprocess": parser.base.pair('variableKey')},
    {"name": "map$ebnf$1", "symbols": []},
    {"name": "map$ebnf$1$subexpression$1", "symbols": [{"literal":"?"}]},
    {"name": "map$ebnf$1", "symbols": ["map$ebnf$1", "map$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "map", "symbols": ["variable", "map$ebnf$1", {"literal":"["}, "value", {"literal":"]"}], "postprocess": parser.map},
    {"name": "printScope", "symbols": [(lexer.has("printScope") ? {type: "printScope"} : printScope)], "postprocess": parser.printScope},
    {"name": "assign", "symbols": ["variable", "_", {"literal":"="}, "_", "value"], "postprocess": parser.assign},
    {"name": "value", "symbols": ["map"], "postprocess": parser.value},
    {"name": "value", "symbols": ["variable"], "postprocess": parser.value},
    {"name": "value", "symbols": ["object"], "postprocess": parser.value},
    {"name": "value", "symbols": ["newObject"], "postprocess": parser.value},
    {"name": "variable$ebnf$1", "symbols": []},
    {"name": "variable$ebnf$1$subexpression$1", "symbols": [{"literal":"."}, "label"]},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1", "variable$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable", "symbols": ["label", "variable$ebnf$1"], "postprocess": parser.base.variable},
    {"name": "newObject", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject)], "postprocess": parser.base.newObject},
    {"name": "label", "symbols": [(lexer.has("word") ? {type: "word"} : word)], "postprocess": parser.base.label}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
