var Reflect = require('reflect');

var ast = Reflect.parse('function foo() { console.log("hi"); }');

console.log(Reflect.stringify(ast, '  '));
