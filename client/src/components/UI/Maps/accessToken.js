import dotenv from "dotenv";
import ReactMapboxGl from "react-mapbox-gl";
dotenv.config({
   path: "../../../config/config.env",
});
export const MapBoxToken = ReactMapboxGl({
   accessToken:
      "pk.eyJ1IjoiYXJ1bmtwMTEyMiIsImEiOiJja2NyYjU5YzMwOHM3MzBvZTJzdDAwcHV0In0.QIXyccHR_ZX9umVzA2XUUQ",
});