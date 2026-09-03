// MODULE: ./app/j/ads/components/studyModes/ContinueButton.tsx
// pos: 28032
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var n=s("./app/j/assembly/buttons/index.ts"),o=s("./app/j/hocs/keydownDecorator.tsx"),r=s("./app/j/i18n/useTranslation.ts"),i=s("./node_modules/react/index.js"),a=s("./node_modules/react/jsx-runtime.js");const l=(0,o.Z)()((e=>{let{keydownEvent:t,onClick:s,buttonSize:o,isFullWidth:l,disabled:d,altText:c}=e;(0,i.useEffect)((()=>{t&&s&&!d&&(t.preventDefault(),t.stopPropagation(),s())}),[s,t,d]);const{t:u}=(0,r.ZP)();return(0,a.jsx)(n.wI,{disabled:d,isFullWidth:l,onClick:s,size:o,text:c||u("study_ads_modal.continue")})}))}
});
