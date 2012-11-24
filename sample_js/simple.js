function helloWorld() {
  var c;
  console.log('hi!');
  for(var i = 0; i < 10000000; i++) {
    c = i / 23;
  }

}

function goodbye() {
  console.log('bye!');
}

helloWorld();
goodbye();

goodbye(
  'test'
);
