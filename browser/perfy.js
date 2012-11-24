(function(window) {

  function Perfy() {
    this.marks = {};

  }

  Perfy.prototype.mark = function(data) {
    var now = Date.now(),
        key = JSON.stringify(data),
        value = this.marks[key];

    if(typeof value === 'undefined') {
      this.marks[key] = { type: 'start', time: now };
    } else if(typeof value === 'object') {
      this.marks[key] = now - value.time;
    } else {
      //throw Error('Cannot re-define mark ' + key);
    }
  }

  window.perfy = new Perfy();
})(window);

