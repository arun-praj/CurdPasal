import React from "react";
import Icon from "./icons8-marker-48.png";
import { Layer, Feature } from "react-mapbox-gl";
import { MapBoxToken } from "./accessToken";
const Map = MapBoxToken;

class MapWithIcons extends React.Component {
   state = {
      points: [this.props.points],
      zoom: [10],
      center: [85.37371285550103, 27.69922316239628],
      ourShop: [
         [85.37371285550103, 27.69922316239628],
         [85.37371285550103, 27.69922316239628],
      ],
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
      const style = "mapbox://styles/mapbox/streets-v9";
      return (
         <Map
            // eslint-disable-next-line
            style={style}
            zoom={zoom}
            center={center}
            containerStyle={{ height: "50vh", width: "100%" }}
            onClick={this.handleClick}>
            <Layer
               type="symbol"
               id="points"
               layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
               images={images}>
               <Feature coordinates={points} />
            </Layer>
         </Map>
      );
   }
}
export default MapWithIcons;
