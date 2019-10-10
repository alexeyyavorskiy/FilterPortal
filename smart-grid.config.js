var smartgrid = require('smart-grid');
var settings = {
  outputStyle: 'scss', /* less || scss || sass || styl */
  columns: 12, /* number of grid columns */
  offset: '30px', /* gutter width px || % */
  container: {
    maxWidth: '1200px', /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {

    xl: {
      'width': '1366px', /* -> @media (max-width: 1100px) */
      'fields': '30px' /* side fields */
    },
    lg: {
      'width': '1200px',
      'fields': '30px'
    },
    md: {
      'width': '992px',
      'fields': '15px'
    },
    sm: {
      'width': '768px',
      'fields': '15px'
    },
    xs: {
      'width': '544px',
      'fields': '15px'
    }
    /*
     We can create any quantity of break points.

     some_name: {
     some_width: 'Npx',
     some_offset: 'N(px|%)'
     }
     */
  }
};

smartgrid('./src/app', settings);
