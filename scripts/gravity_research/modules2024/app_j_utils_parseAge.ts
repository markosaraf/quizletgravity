// MODULE: ./app/j/utils/parseAge.ts
// pos: 314590
(function (module, exports, require) {
e,t,s)=>{"use strict";function n(e,t,s){const n=t-1;if(Number.isNaN(n)||Number.isNaN(e)||Number.isNaN(s)||-1===t||-1===e||-1===s)return 1/0;const o=new Date,r=new Date(e,n,s);let i=o.getFullYear()-r.getFullYear();const a=o.getMonth()-r.getMonth();return(a<0||0===a&&o.getDate()<r.getDate())&&i--,i}s.d(t,{Z:()=>n})}
});
