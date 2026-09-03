// MODULE: ./app/j/utils/appendOptionalTrackingParams.ts
// pos: 312243
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>a});s("./node_modules/core-js/modules/es.array.iterator.js"),s("./node_modules/core-js/modules/web.dom-collections.iterator.js"),s("./node_modules/core-js/modules/web.url.js"),s("./node_modules/core-js/modules/web.url-search-params.js");var n=s("./app/j/global/Quizlet.ts"),o=s("./app/j/utils/UserAgentHelper.ts");const r=()=>!(0,o.mj)(),i={funnelUUID:r,src:()=>(0,o.mj)()&&n.Z.shouldIncludeCrawlSource,utm_campaign:r,utm_content:r,utm_medium:r,utm_source:r,utm_term:r};const a=function(e,t){const s=new URL(e,window.location.origin);if(0!==Object.keys(t).length)for(const n in t)t[n]&&i[n]&&i[n]()&&s.searchParams.append(n,t[n]);return s.toString()}}
});
