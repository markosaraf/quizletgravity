// MODULE: ./app/j/components/UIPopover.tsx
// pos: 140801
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>l});var n=s("./node_modules/classnames/index.js"),o=s.n(n),r=s("./app/j/components/UIBaseOverlay.tsx"),i=s("./node_modules/react/index.js"),a=s("./node_modules/react/jsx-runtime.js");class l extends i.PureComponent{render(){const{extraClassNames:e,...t}=this.props;return(0,a.jsx)(r.Z,{baseClassName:"UIPopover",extraClassNames:o()({"UIPopover--mediumShadow":"medium"===this.props.shadow,"UIPopover--slightlyRounded":"slightly-rounded"===this.props.variant,"UIPopover--rounded":"rounded"===this.props.variant,"UIPopover--noArrow":!this.props.arrow,"UIPopover--tall":"tall"===this.props.spacing},e),...t})}}l.defaultProps={arrow:!0,shadow:"regular",spacing:"regular",variant:"none"}}
});
