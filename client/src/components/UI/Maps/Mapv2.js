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
               // eslint-disable-next-line
               style='mapbox://styles/mapbox/streets-v9'
               layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
               images={images}
               containerStyle={{
                  height: "50vh",
                  width: "100vw",
               }}>
               <Layer
                  type='symbol'
                  id='marker'
                  layout={{ "icon-image": "myImage", "icon-allow-overlap": true }}
                  images={images}>
                  {StoreDate.features.map((el) => (
                     <Feature
                        key={el.properties.STORE_ID}
                        id={el.properties.STORE_ID}
                        coordinates={el.geometry.coordinates}
                     />
                  ))}
               </Layer>
            </Map>
         </Fragment>
      );
   }
}
export default Mapv2;
