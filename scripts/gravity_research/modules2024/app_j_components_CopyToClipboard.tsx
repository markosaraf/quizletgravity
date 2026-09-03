// MODULE: ./app/j/components/CopyToClipboard.tsx
// pos: 57173
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var n=s("./app/j/assembly/toasts/index.ts"),o=s("./app/j/i18n/useTranslation.ts"),r=(s("./node_modules/react/index.js"),s("./node_modules/react-copy-to-clipboard/lib/index.js")),i=s.n(r),a=s("./node_modules/react/jsx-runtime.js");function l(e){let{children:t,fallbackMessage:s,includeDismiss:r=!1,notificationMessage:l,notifyOnCopy:d=!1,onCopy:c,text:u}=e;const{t:p}=(0,o.ZP)();return(0,a.jsx)(i(),{onCopy:function(){d&&(0,n.fz)({text:l||p("global.copy_to_clipboard.notification_message"),customToastId:(0,n.$G)("copyToClipboard"),includeDismiss:r}),c&&c()},options:{message:s||p("global.copy_to_clipboard.fallback_message"),debug:!1},text:u,children:t})}}
});
