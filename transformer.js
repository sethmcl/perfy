var esmorph = require('esmorph');



module.exports.instrument = function(code, id) {
  var trace = esmorph.Tracer.FunctionEntranceAndExit(genTraceSig);
  id = id || 'noid';

  function genTraceSig(params) {
    params.file = id;
    return 'perfy.mark(' + JSON.stringify(params) + ');';
  }

  return trace(code);
}
