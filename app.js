var Reflect = require('reflect'),
    fs      = require('fs');

var ast,
    sourceFile,
    source,
    sourceLines,
    output;

sourceFile = process.argv[2];
source = fs.readFileSync(sourceFile).toString();
sourceLines = source.split('\n');
ast = Reflect.parse(source);


//output = Reflect.stringify(ast);
output = '';

console.log(output);
visit(ast.body);
//console.log(Reflect.stringify(ast, '  '));
//

function visit(node) {
  var pre, post, charStart, charEnd, mods = [];

  if(!node) {
    return;
  }

  if(Array.isArray(node)) {
    node.forEach(function(child) { visit(child); });
  } else {
    if(node.type === 'ExpressionStatement') {
      //var pre = sourceLines.splice(0, node.loc.start.line);
      charStart = node.range[0];
      charEnd = node.range[1] + 1;
      code = source.substring(charStart, charEnd);
      mods.push({

      
      console.log('===================');

      console.log(charStart, charEnd);

      console.log( source.substring(node.range[0], node.range[1] + 1 ));
      //console.log( node.range[0], node.range[1]);
      //console.log(output[node.range[0]]);
      //printLines(sourceLines, node.loc.start.line, node.loc.end.line);
    }

    visit(node.body);
  }
}

function printLines(src, start, end) {
  var i;

  console.log(start, end);
  for( i = start; i <= end; i++ ) {
    console.log(src[i-1]);
  }
}


