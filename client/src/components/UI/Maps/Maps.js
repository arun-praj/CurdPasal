import React, { useState, Component } from "react";
import ReactMapGl, { Marker } from "react-map-gl";

const Map = (props) => {
   const [viewport, setViewport] = useState({
      latitude: 27.67522,
      longitude: 85.440061,
      zoom: 10,
      width: "100vw",
      height: "50vh",
   });

   const _onClickMap = (e) => {
      console.log(e.lngLat);
      setViewport((prevState) => {
         return {
            ...prevState,
            latitude: e.lngLat[0],
            longitude: e.lngLat[1],
         };
      });
   };

   return (
      <div>
         <ReactMapGl
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYXJ1bmtwMTEyMiIsImEiOiJja2NyYjU5YzMwOHM3MzBvZTJzdDAwcHV0In0.QIXyccHR_ZX9umVzA2XUUQ"
            mapStyle="mapbox://styles/arunkp1122/ckcrbwp1d0pix1inzj5fvxy3e"
            onViewportChange={(viewport) => {
               setViewport(viewport);
            }}
            onClick={_onClickMap}>
            Here map
         </ReactMapGl>
      </div>
   );
};
export default Map;

// // src/DisplayMapClass.js
// import React from "react";
// import HPlatform, { HMap, HMapPolyLine } from "react-here-map";

// // import { HEREMap, Marker, Circle } from "react-here-maps";

// const Map = (props) => {
//    const points = [
//       { lat: 52.5309825, lng: 13.3845921 },
//       { lat: 52.5311923, lng: 13.3853495 },
//    ];
//    return (
//       <HPlatform
//          app_id="f99QtS0P4zb2THazzN25"
//          app_code="JZJi7aGHxGzHLDZ2ski7"
//          apikey={"FgWKblpHXPfu-qnI8CXpyMTXtWRij_HCcmQz_gXYoi0"}
//          useCIT
//          useHTTPS
//          includeUI
//          includePlaces>
//          <HMap
//             style={{
//                height: "400px",
//                width: "800px",
//             }}
//             mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 }, zoom: 10 }}>
//             <HMapPolyLine points={points} />
//          </HMap>
//       </HPlatform>
//    );
// };
// {
//    /* <HEREMap
//          appId="JZJi7aGHxGzHLDZ2ski7"
//          appCode="YJSEaRgg3fMNRLZBXUaHRtX2nJRk4JGP-QdQBLu_Ajs"
//          center={{ lat: 10.998666, lng: -63.79841 }}
//          zoom={12}>
//          <Marker
//             lat={10.998666}
//             lng={-63.79841}
//             draggable
//             onDragEnd={(e) => {
//                console.log(e);
//             }}
//          />
//          <Circle radius={20} lat={10.998666} lng={-63.79841} />
//       </HEREMap> */
// }

// export default Map;
