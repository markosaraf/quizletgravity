// MODULE: ./app/j/ads/utils/AdEventEmitter.ts
// pos: 40074
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{T:()=>n,Z:()=>o});let n=function(e){return e[e.AdIsViewable=0]="AdIsViewable",e[e.AdLoaded=1]="AdLoaded",e[e.WinningEvent=2]="WinningEvent",e[e.EmptyAdReceived=3]="EmptyAdReceived",e[e.NativeAdReceived=4]="NativeAdReceived",e}({});class o{constructor(){this._listeners={},this.on=(e,t,s)=>{this._listeners[e+t]=s},this.off=(e,t)=>{delete this._listeners[e+t]},this.emit=(e,t,s)=>{this._listeners[e+t]&&this._listeners[e+t](s)}}}}
});
