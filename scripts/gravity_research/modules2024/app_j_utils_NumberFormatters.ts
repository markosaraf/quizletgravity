// MODULE: ./app/j/utils/NumberFormatters.ts
// pos: 305258
(function (module, exports, require) {
e,t,s)=>{"use strict";function n(e){const t="undefined"!=typeof window?s("./app/j/i18n/LocalizationConstants.ts").Bj:"en-US";return new Intl.NumberFormat(t,e)}s.d(t,{Sr:()=>c,nr:()=>u,rl:()=>d,uf:()=>a});const o={};let r=null,i=null;function a(e){return null===r&&(r=n()),r.format(e)}function l(e,t){void 0===t&&(t=0);const s=function(e){return o[e]||(o[e]=n({maximumFractionDigits:e})),o[e]}(t);return s.format(e)}function d(e){return null===i&&(i=n({style:"percent"})),i.format(e)}function c(e,t){return void 0===t&&(t=0),d(l(e,t)/100)}function u(e,t){return Math.abs(e)/Math.abs(t||1)*100}}
});
