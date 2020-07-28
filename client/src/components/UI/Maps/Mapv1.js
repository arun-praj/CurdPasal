import React from "react";
import Icon from "./icons8-marker-48.png";
import ReactMapboxGl, { Layer, Feature, ZoomControl } from "react-mapbox-gl";

const Map = ReactMapboxGl({
   accessToken:
      "pk.eyJ1IjoiYXJ1bmtwMTEyMiIsImEiOiJja2NyYjU5YzMwOHM3MzBvZTJzdDAwcHV0In0.QIXyccHR_ZX9umVzA2XUUQ",
});
class MapWithIcons extends React.Component {
   state = {
      points: [this.props.points],
      zoom: [15],
      center: [85.440061, 27.67522],
   };
   sendDataToParent = () => {
      let { points } = this.state;
      this.props.sendData(points);
   };
   handleClick = (map, ev) => {
      const { lng, lat } = ev.lngLat;
      var { points } = this.state;
      points = [lng, lat];
      const zoom = [map.transform.tileZoom + map.transform.zoomFraction];
      this.setState({
         points,
         zoom,
         center: map.getCenter(),
      });
      this.sendDataToParent();
      console.log(points);
   };

   render() {
      const { points, zoom, center } = this.state;
      const image = new Image(30, 30);
      image.src = Icon;
      const images = ["myImage", image];
      return (
         <Map
            style="mapbox://styles/mapbox/streets-v9"
            zoom={zoom}
            center={center}
            containerStyle={{ height: "50vh", width: "100%" }}
            onClick={this.handleClick}>
            <Layer
               type="symbol"
               id="points"
               layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
               images={images}>
               {<Feature coordinates={points} />}

               {/* {points.map((point, i) => (
                  <Feature key={i} coordinates={point} />
               ))} */}
            </Layer>
         </Map>
      );
   }
}
export default MapWithIcons;

// const Map = ReactMapboxGl({
//    accessToken:
//       "pk.eyJ1IjoiYXJ1bmtwMTEyMiIsImEiOiJja2NyYjU5YzMwOHM3MzBvZTJzdDAwcHV0In0.QIXyccHR_ZX9umVzA2XUUQ",
// });
// class MapWithIcons extends React.Component {
//    state = {
//       points: [
//          [85.440061, 27.67522],
//          //  [-87.6309729, 41.76716449],
//          //  [-87.63097366, 41.76668286],
//          //  [-87.63095643, 41.76619789],
//          //  [-87.63095245, 41.76578],
//          //  [-87.63094033, 41.76561825],
//       ],
//       zoom: [15],
//       center: [85.440061, 27.67522],
//    };
//    handleClick = (map, ev) => {
//       const { lng, lat } = ev.lngLat;
//       var { points } = this.state;
//       points = [...points, [lng, lat]];
//       const zoom = [map.transform.tileZoom + map.transform.zoomFraction];
//       this.setState({
//          points,
//          zoom,
//          center: map.getCenter(),
//       });
//    };
//    render() {
//       const { points, zoom, center } = this.state;
//       const image = new Image(20, 30);
//       image.src = Icon;
//       const images = ["myImage", image];
//       return (
//          <Map
//             style="mapbox://styles/mapbox/streets-v9"
//             zoom={zoom}
//             center={center}
//             containerStyle={{ height: "500px", width: "100vh" }}
//             onClick={this.handleClick}>
//             <Layer
//                type="symbol"
//                id="points"
//                layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
//                images={images}>
//                {points.map((point, i) => (
//                   <Feature key={i} coordinates={point} />
//                ))}
//             </Layer>
//          </Map>
//       );
//    }
// }
// export default MapWithIcons;
