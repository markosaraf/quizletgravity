// MODULE: ./app/j/ads/utils/isVideoAd.ts
// pos: 40572
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>o});s("./node_modules/core-js/modules/es.array.iterator.js"),s("./node_modules/core-js/modules/web.dom-collections.iterator.js"),s("./node_modules/core-js/modules/es.array.includes.js");var n=s("./app/j/ads/sizes/video.ts");const o=e=>{var t;let s=!1;if(e.size instanceof Array){const[t,o]=e.size;s=Object.values(n.x).some((e=>e instanceof Array&&t===e[0]&&o===e[1]))}const o=null!=(t=null==e.slot.getHtml?void 0:e.slot.getHtml())?t:"",r=o.includes("NativeAd-vertical-video"),i=o.includes("NativeAd-vertical-video-fullscreen"),a=o.includes("NativeAd-video")||s&&o.includes("video");return{isVideo:a,isVertical:r,isVerticalFullScreen:i,isVideoWithContent:a&&o.includes("NativeAd-content")}}}
});
