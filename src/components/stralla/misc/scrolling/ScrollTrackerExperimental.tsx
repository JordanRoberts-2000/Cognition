import ReactDOM from "react-dom"

const ScrollTrackerExperimental = () => {
  return ReactDOM.createPortal((
    <div className="h-2 z-[9999] top-0 w-full fixed">
        <div className="h-full bg-blue-600 scrollTrack"></div>
    </div>
  )
  ,document.body)
}

export default ScrollTrackerExperimental
// ===========================================
// *** Notes ***
// ===========================================
// Include top-[x] in sticky header
// Experimental until css timeline has more support
// Uses transform instead of width as its more
// performant, body must use x-overflow: clip
// ===========================================
// *** CSS ***
// ===========================================
// #root{
//     overflow-x: clip;
// }
// @keyframes scrollTracking {
//     from{
//         transform: translateX(-100%);
//     }
//     to{
//         transform: translateX(0);
//     }
// }
//
// .scrollTrack{
//     animation: scrollTracking linear both;
//     animation-timeline: scroll();
// }
// ===========================================