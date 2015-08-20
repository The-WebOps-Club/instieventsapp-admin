
assertInterpolation({
  property: 'border-image-width',
  from: '0px',
  to: '20px'
}, [
  {at: -0.3, is:   '0px'}, // CSS border-image-width can't be negative.
  {at: 0,    is:   '0px'},
  {at: 0.3,  is:   '6px'},
  {at: 0.6,  is:  '12px'},
  {at: 1,    is:  '20px'},
  {at: 1.5,  is:  '30px'},
  {at: 5,    is: '100px'},
  {at: 10,   is: '200px'}
]);
assertInterpolation({
  property: 'border-image-width',
  from: '0%',
  to: '20%'
}, [
  {at: -0.3, is:   '0%'}, // CSS border-image-width can't be negative.
  {at: 0,    is:   '0%'},
  {at: 0.3,  is:   '6%'},
  {at: 0.6,  is:  '12%'},
  {at: 1,    is:  '20%'},
  {at: 1.5,  is:  '30%'},
  {at: 5,    is: '100%'},
  {at: 10,   is: '200%'}
]);
assertInterpolation({
  property: 'border-image-width',
  from: '0',
  to: '20'
}, [
  {at: -0.3, is:   '0'}, // CSS border-image-width can't be negative.
  {at: 0,    is:   '0'},
  {at: 0.3,  is:   '6'},
  {at: 0.6,  is:  '12'},
  {at: 1,    is:  '20'},
  {at: 1.5,  is:  '30'},
  {at: 5,    is: '100'},
  {at: 10,   is: '200'}
]);
assertInterpolation({
  property: 'border-image-width',
  from: '10px 20% 30 40px',
  to: '80px 70% 60 50px'
}, [
  {at: -0.3, is:   '0px   5%  21  37px'}, // CSS border-image-width can't be negative.
  {at: 0,    is:  '10px  20%  30  40px'},
  {at: 0.3,  is:  '31px  35%  39  43px'},
  {at: 0.6,  is:  '52px  50%  48  46px'},
  {at: 1,    is:  '80px  70%  60  50px'},
  {at: 1.5,  is: '115px  95%  75  55px'},
  {at: 5,    is: '360px 270% 180  90px'},
  {at: 10,   is: '710px 520% 330 140px'}
]);
assertInterpolation({
  property: 'border-image-width',
  from: '10%',
  to: '20px'
}, [
  // Percentages are relative to the size of the border image area, which is 120px.
  {at: -0.3, is: 'calc(13% + -6px)'}, // Should be parsed as 16px - 6px = 10px
  {at: 0,    is: '10%'},              // Should be parsed as 12px
  {at: 0.3,  is: 'calc(7% + 6px)'},   // Should be parsed as 8px + 6px = 14px
  {at: 0.6,  is: 'calc(4% + 12px)'},  // Should be parsed as 5px + 12px = 17px
  {at: 1,    is: '20px'},
  {at: 1.5,  is: 'calc(-5% + 30px)'}, // Should be parsed as -6px + 30px = 24px
]);
assertInterpolation({
  property: 'border-image-width',
  from: '10px',
  to: '20%'
}, [
  // Percentages are relative to the size of the border image area, which is 120px.
  {at: -0.3, is: 'calc(13px + -6%)'}, // Should be parsed as 13px - 7px = 6px
  {at: 0,    is: '10px'},
  {at: 0.3,  is: 'calc(7px + 6%)'},   // Should be parsed as 7px + 7px = 14px
  {at: 0.6,  is: 'calc(4px + 12%)'},  // Should be parsed as 4px + 14px = 18px
  {at: 1,    is: '20%'},              // Should be parsed as 24px
  {at: 1.5,  is: 'calc(-5px + 30%)'}, // Should be parsed as -5px + 36px = 31px
]);

assertInterpolation({
  property: 'border-image-width',
  from: '10px',
  to: '20'
}, [
  {at: -0.3, is: '10px'},
  {at: 0,    is: '10px'},
  {at: 0.3,  is: '10px'},
  {at: 0.6,  is: '20'},
  {at: 1,    is: '20'},
  {at: 1.5,  is: '20'},
]);
assertInterpolation({
  property: 'border-image-width',
  from: '10',
  to: '20px'
}, [
  {at: -0.3, is: '10'},
  {at: 0,    is: '10'},
  {at: 0.3,  is: '10'},
  {at: 0.6,  is: '20px'},
  {at: 1,    is: '20px'},
  {at: 1.5,  is: '20px'},
]);
assertInterpolation({
  property: 'border-image-width',
  from: '10%',
  to: '20'
}, [
  {at: -0.3, is: '10%'},
  {at: 0,    is: '10%'},
  {at: 0.3,  is: '10%'},
  {at: 0.6,  is: '20'},
  {at: 1,    is: '20'},
  {at: 1.5,  is: '20'},
]);
assertInterpolation({
  property: 'border-image-width',
  from: '10',
  to: '20%'
}, [
  {at: -0.3, is: '10'},
  {at: 0,    is: '10'},
  {at: 0.3,  is: '10'},
  {at: 0.6,  is: '20%'},
  {at: 1,    is: '20%'},
  {at: 1.5,  is: '20%'},
]);
