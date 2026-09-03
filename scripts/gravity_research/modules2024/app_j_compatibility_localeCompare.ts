// MODULE: ./app/j/compatibility/localeCompare.ts
// pos: 56889
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Y:()=>n,Z:()=>o});const n=function(){try{"foo".localeCompare("bar","i")}catch(e){return"RangeError"===e.name}return!1}();function o(e,t,s){return n?e.localeCompare(t,[s,"en-US"],{numeric:!0}):e.localeCompare(t)}}
});
