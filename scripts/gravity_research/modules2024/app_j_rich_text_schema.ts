// MODULE: ./app/j/rich_text/schema.ts
// pos: 266416
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>l,c:()=>d});var n=s("./node_modules/prosemirror-model/dist/index.js"),o=s("./app/j/rich_text/marks.ts"),r=s("./app/j/rich_text/constants.ts");const i={content:r.P8.BLOCK,group:r.oG.BLOCK},a={paragraph:{content:r.P8.INLINE,group:r.oG.BLOCK,parseDOM:[{tag:r.Kg.PARAGRAPH}],toDOM:()=>[r.Kg.PARAGRAPH,0]},doc:i,text:{group:r.oG.INLINE}},l=new n.Schema({marks:o.Z,nodes:a}),d=new n.Schema({marks:{},nodes:a})}
});
