

assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'rotate(30deg)',
  to: 'rotate(330deg)'
}, [
  {at: -1, is: 'rotate(-270deg)'},
  {at: 0, is: 'rotate(30deg)'},
  {at: 0.25, is: 'rotate(105deg)'},
  {at: 0.75, is: 'rotate(255deg)'},
  {at: 1, is: 'rotate(330deg)'},
  {at: 2, is: 'rotate(630deg)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'rotateX(0deg)',
  to: 'rotateX(700deg)'
}, [
  {at: -1, is: 'rotateX(-700deg)'},
  {at: 0, is: 'rotateX(0deg)'},
  {at: 0.25, is: 'rotateX(175deg)'},
  {at: 0.75, is: 'rotateX(525deg)'},
  {at: 1, is: 'rotateX(700deg)'},
  {at: 2, is: 'rotateX(1400deg)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'rotateY(0deg)',
  to: 'rotateY(800deg)'
}, [
  {at: -1, is: 'rotateY(-800deg)'},
  {at: 0, is: 'rotateY(0deg)'},
  {at: 0.25, is: 'rotateY(200deg)'},
  {at: 0.75, is: 'rotateY(600deg)'},
  {at: 1, is: 'rotateY(800deg)'},
  {at: 2, is: 'rotateY(1600deg)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'rotateZ(0deg)',
  to: 'rotateZ(900deg)'
}, [
  {at: -1, is: 'rotateZ(-900deg)'},
  {at: 0, is: 'rotateZ(0deg)'},
  {at: 0.25, is: 'rotateZ(225deg)'},
  {at: 0.75, is: 'rotateZ(675deg)'},
  {at: 1, is: 'rotateZ(900deg)'},
  {at: 2, is: 'rotateZ(1800deg)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'rotate3d(7, 8, 9, 100deg)',
  to: 'rotate3d(7, 8, 9, 260deg)'
}, [
  {at: -1, is: 'rotate3d(7, 8, 9, -60deg)'},
  {at: 0, is: 'rotate3d(7, 8, 9, 100deg)'},
  {at: 0.25, is: 'rotate3d(7, 8, 9, 140deg)'},
  {at: 0.75, is: 'rotate3d(7, 8, 9, 220deg)'},
  {at: 1, is: 'rotate3d(7, 8, 9, 260deg)'},
  {at: 2, is: 'rotate3d(7, 8, 9, 420deg)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'none',
  to: 'rotate(90deg)'
}, [
  {at: -1, is: 'rotate(-90deg)'},
  {at: 0, is: 'none'},
  {at: 0.25, is: 'rotate(22.5deg)'},
  {at: 0.75, is: 'rotate(67.5deg)'},
  {at: 1, is: 'rotate(90deg)'},
  {at: 2, is: 'rotate(180deg)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'rotate(90deg)',
  to: 'none'
}, [
  {at: -1, is: 'rotate(180deg)'},
  {at: 0, is: 'rotate(90deg)'},
  {at: 0.25, is: 'rotate(67.5deg)'},
  {at: 0.75, is: 'rotate(22.5deg)'},
  {at: 1, is: 'none'},
  {at: 2, is: 'rotate(-90deg)'},
]);
assertInterpolation({
  property: 'transform',
  prefixedProperty: ['-webkit-transform'],
  from: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
  to: 'rotateX(700deg) rotateY(800deg) rotateZ(900deg)'
}, [
  {at: -1, is: 'rotateX(-700deg) rotateY(-800deg) rotateZ(-900deg)'},
  {at: 0, is: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'},
  {at: 0.25, is: 'rotateX(175deg) rotateY(200deg) rotateZ(225deg)'},
  {at: 0.75, is: 'rotateX(525deg) rotateY(600deg) rotateZ(675deg)'},
  {at: 1, is: 'rotateX(700deg) rotateY(800deg) rotateZ(900deg)'},
  {at: 2, is: 'rotateX(1400deg) rotateY(1600deg) rotateZ(1800deg)'},
]);
