@{%
const { TOKEN_CONFIG } = require('./constants/parser');
const lexer = require("moo").compile(TOKEN_CONFIG);
const parser = require('./parser');
%}

@lexer lexer
@builtin "whitespace.ne"

program ->
  LINE ( LINE ):* {% parser.program %}

LINE -> _ action ";" ( _ %NL ):* {% parser.line %}

#actions
action -> assign | printScope

object -> "{" _ objectEntry (_ "," _ objectEntry):* _ "}" {% parser.base.object %}

objectEntry ->
    %spread variable {% parser.base.objectEntry('spread-object') %}
  | pair {% parser.base.objectEntry('pair') %}

pair ->
  label _ ":" _ value {% parser.base.pair('regular') %} |
  "[" variable "]" _ ":" _ value {% parser.base.pair('variableKey') %}
  
map -> variable ("?"):* "[" value "]" {% parser.map %}
printScope -> %printScope {% parser.printScope %}
assign -> variable _ "=" _ value {% parser.assign %}

value ->
    map {% parser.value %}
  | variable {% parser.value %}
  | object {% parser.value %}
  | newObject {% parser.value %}

# Base values

variable -> label ("." label):* {% parser.base.variable %}

newObject -> %newObject {% parser.base.newObject %}
label -> %word {% parser.base.label %}