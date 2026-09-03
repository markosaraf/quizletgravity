// MODULE: ./app/j/utils/StudyPageVisibilityTracker.ts
// pos: 311763
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>o});var n=s("./app/j/config/enums.ts");class o{constructor(e){this.handleVisible=()=>{this.logFn(n.WVJ.ENTER)},this.handleHidden=()=>{this.logFn(n.WVJ.EXIT)},this.logFn=e,"visible"===document.visibilityState&&this.handleVisible(),document.addEventListener("visibilitychange",(()=>{switch(document.visibilityState){case"hidden":this.handleHidden();break;case"visible":this.handleVisible()}}),!0)}}}
});
