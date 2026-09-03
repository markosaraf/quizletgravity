// MODULE: ./app/j/models/helpers/extractModelsAndIncludedAssociationsFromFirstResponse.ts
// pos: 261829
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>r});var n=s("./node_modules/invariant/browser.js"),o=s.n(n);function r(e,t,s){o()(t.body&&Array.isArray(t.body.responses),"Invalid data param in extractModelsAndIncludedAssociationsFromFirstResponse");const{models:n}=t.body.responses[0];return s.forEach((t=>{const s=n[t.model],o=t.isRelated;!function(e,t,s,n){t.forEach((t=>{e.forEach((e=>{n(e,t)&&(e[s]=t)}))}))}(n[e],s,t.model,o)})),n[e]}}
});
