// MODULE: ./app/j/trophies/TrophiesActionCreators.ts
// pos: 289591
(function (module, exports, require) {
e,t,s)=>{"use strict";s.d(t,{Z:()=>r});var n=s("./app/j/dispatchers/AppDispatcher.ts"),o=s("./app/j/trophies/constants/TrophiesConstants.ts");const r={enterLoadingState(){n.Z.viewAction(o.Z.actions.ENTER_LOADING_STATE)},exitLoadingState(){n.Z.viewAction(o.Z.actions.EXIT_LOADING_STATE)},closeModal(){n.Z.viewAction(o.Z.actions.CLOSE_MODAL)},openModeCompletionModal(){n.Z.viewAction(o.Z.actions.OPEN_MODE_COMPLETION_MODAL)},openModalForSessionWithPotentialRank(e){let{potentialRank:t,session:s}=e;n.Z.viewAction(o.Z.actions.OPEN_MODAL_WITH_POTENTIAL_RANK,{potentialRank:t,session:s})},openModalWithTrophies(e){n.Z.viewAction(o.Z.actions.OPEN_MODAL_WITH_TROPHIES,{trophies:e})}}}
});
