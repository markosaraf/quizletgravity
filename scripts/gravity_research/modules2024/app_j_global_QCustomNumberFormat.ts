// MODULE: ./app/j/global/QCustomNumberFormat.ts
// pos: 158517
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>n});const n={customFormat:{number:{}},addCustomFormat(e,t){return this.customFormat.number[e]=t,this.customFormat},secondsWithTenth(){return this.addCustomFormat("secondsWithTenth",{minimumIntegerDigits:2,minimumFractionDigits:1,maximumFractionDigits:1})},decimal(e,t,s){return void 0===s&&(s="decimal"),this.addCustomFormat(s,{minimumFractionDigits:e,maximumFractionDigits:t})}}}
});
