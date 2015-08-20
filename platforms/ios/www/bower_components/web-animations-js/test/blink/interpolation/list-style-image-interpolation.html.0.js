
// None to image
var from = 'none';
var to = 'url(../resources/stripes-20.png)';
assertInterpolation({
  property: 'list-style-image',
  from: from,
  to: to
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: from},
  {at: 0.6, is: to},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Image to image
from = 'url(../resources/green-20.png)';
to = 'url(../resources/stripes-20.png)';
assertInterpolation({
  property: 'list-style-image',
  from: from,
  to: to
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.3)'},
  {at: 0.6, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.6)'},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Image to gradient
to = 'linear-gradient(45deg, blue, orange)';
assertInterpolation({
  property: 'list-style-image',
  from: from,
  to: to
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.3)'},
  {at: 0.6, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.6)'},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);

// Gradient to gradient
from = 'linear-gradient(-45deg, red, yellow)';
assertInterpolation({
  property: 'list-style-image',
  from: from,
  to: to
}, [
  {at: -0.3, is: from},
  {at: 0, is: from},
  {at: 0.3, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.3)'},
  {at: 0.6, is: '-webkit-cross-fade(' + from + ', ' + to + ', 0.6)'},
  {at: 1, is: to},
  {at: 1.5, is: to},
]);
