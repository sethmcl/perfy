var esprima = require('esprima'),
    esmorph = require('./lib/esmorph'),
    fs = require('fs');

var sourceFile = process.argv[2],
    source = fs.readFileSync(sourceFile).toString();

var tracer = esmorph.Tracer.FunctionEntrance('howdy');

console.log(tracer(source));


//console.log(esmorph);
