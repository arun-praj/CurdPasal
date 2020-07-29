import React, { Component, Fragment } from "react";
import { Layer, Feature } from "react-mapbox-gl";

import Icon from "./113-512.webp";
import { MapBoxToken } from "./accessToken";
import * as StoreDate from "./Store_data.json";
const Map = MapBoxToken;

class Mapv2 extends Component {
   state = {
      zoom: [12],
      center: [85.38181979091183, 27.68366488536074],
   };
   render() {
      const { zoom, center } = this.state;
      const image = new Image(50, 50);

      image.src = Icon;
      const images = ["myImage", image];
      return (
         <Fragment>
            <Map
               zoom={zoom}
               center={center}
               style="mapbox://styles/mapbox/streets-v9"
               layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
               images={images}
               containerStyle={{
                  height: "50vh",
                  width: "100vw",
               }}>
               <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
                  images={images}>
                  {StoreDate.features.map((el) => (
                     <Feature id={el.properties.STORE_ID} coordinates={el.geometry.coordinates} />
                  ))}
                  {/* <Feature coordinates={[85.35948296024799, 27.69209332037316]} />
                  <Feature coordinates={[85.44021465132647, 27.67536081275729]} />
                  <Feature coordinates={[85.3290354570716, 27.67111722494333]} /> */}
               </Layer>
            </Map>
         </Fragment>
      );
   }
}
export default Mapv2;