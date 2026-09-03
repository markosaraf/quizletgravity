// MODULE: ./app/j/ads_core/utils/logToConsole.ts
// pos: 41332
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Ev:()=>a,Xq:()=>d,co:()=>c,ut:()=>l,yN:()=>i});let n=[],o=!1;const r=e=>{var t;const s=["%c "+(e.src?"QADS ["+e.src+"]":"QADS")+": %c "+e.message+" %c "+e.timeElapsed+"ms","background: blue; color: #bada55","color: #6758db","color: #cc5555"];e.extraInfo&&Object.keys(e.extraInfo).length>0&&s.push(e.extraInfo),null==(t=window)||t.console.log.apply(window.console,s)},i=()=>{o=!0},a=()=>{o=!1},l=()=>{"undefined"!=typeof window&&n.forEach((e=>r(e)))},d=(e,t,s)=>{var i;const a={message:e,timeElapsed:Math.round(null==(i=window)||null==(i=i.performance)?void 0:i.now())||0,src:t,extraInfo:s};var l;o&&r(a),l=a,n.push(l),n.length>256&&(n=n.splice(-256))},c=function(e,t){void 0===e&&(e=100),void 0===t&&(t=[]);const s=e<0?100:e;return n.filter((e=>-1===t.indexOf(e.src||""))).slice(-s)}}
});
