'use strict';

const myFunction = require('./image_processing');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

exports.get = function(event, context, callback) {

  var output = benchmarking();

  var result = {
    statusCode: 200,
    body: output,
    headers: {'content-type': 'text/html'}
  };

  callback(null, result);
};

function benchmarking() {
  
  suite.add(`Processing the image`, function() {
    myFunction.image_processing()
  })
  .on('cycle', function(event){
    console.log(String(event.target))
})
.on('complete', function() {
    console.log('Fastest is' + this.filter('fastest').map('name'))
})
.run({ 'async': false}); 

return `Image processing completed successfully !`
}