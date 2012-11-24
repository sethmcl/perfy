var esmorph = require('esmorph'),
    fs      = require('fs');

var sourceFile,
    source,
    trace = esmorph.Tracer.FunctionEntranceAndExit('perfy.mark');

sourceFile = process.argv[2];
source = fs.readFileSync(sourceFile).toString();

console.log( trace(source) );
