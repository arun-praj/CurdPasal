import ReactMapboxGl from "react-mapbox-gl";

export const MapBoxToken = ReactMapboxGl({
   accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});
