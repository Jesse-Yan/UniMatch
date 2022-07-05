import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./Map.module.css";

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: props.latitude,
    longitude: props.longitude,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoiamFja3ktaGhoIiwiYSI6ImNrY2lud3ZrYzBicHEzMW5wb3ZkbGhpYTYifQ.8n_1wdhWYfN-iM_0y7GYeA"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Marker
        latitude={props.latitude}
        longitude={props.longitude}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <h3 className={classes.Name}>{props.name}</h3>
      </Marker>
    </ReactMapGL>
  );
};

export default Map;
