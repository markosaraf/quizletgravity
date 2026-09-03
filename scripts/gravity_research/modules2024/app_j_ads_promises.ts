// MODULE: ./app/j/ads/promises.ts
// pos: 37961
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{L:()=>o});s("./node_modules/core-js/modules/es.promise.js");var n=s("./app/j/global/QuizletGlobalObject.ts");function o(){return new Promise(((e,t)=>{QWait("Quizlet.Ads",(()=>{const s=(0,n.Y)();s.QAdManager?e(s.QAdManager):t(new Error("Missing Quizlet.Ads after QWaiting it in promiseAdManager"))}))}))}}
});
