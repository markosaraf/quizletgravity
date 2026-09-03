// MODULE: ./app/j/utils/promiseFinally.ts
// pos: 314935
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>n});s("./node_modules/core-js/modules/es.promise.js");function n(e,t){return Promise.resolve(e).then((()=>Promise.resolve(t()).then((()=>e)))).catch((e=>Promise.resolve(t()).then((()=>Promise.reject(e)))))}}
});
