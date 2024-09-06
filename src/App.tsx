import { Layer, Map as ReactMap, Source } from "react-map-gl/maplibre";
import chroma from "chroma-js";

import { mapStyles } from "./mapStyles";

import "maplibre-gl/dist/maplibre-gl.css";
import { StyleSpecification } from "maplibre-gl";

export const App = () => {
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          gradient: 10,
        },
        geometry: {
          type: "Point",
          coordinates: [0, 0],
        },
      },
      {
        type: "Feature",
        properties: {
          gradient: 70,
        },
        geometry: { type: "Point", coordinates: [0, -0.01] },
      },
      {
        type: "Feature",
        properties: {
          gradient: 90,
        },
        geometry: { type: "Point", coordinates: [0, -0.02] },
      },
      {
        type: "Feature",
        properties: {
          gradient: 150,
        },
        geometry: { type: "Point", coordinates: [0, -0.03] },
      },
    ],
  };

  const scale = chroma.scale(["#008000", "#FFFF00", "#ff0000", "#000"]);

  return (
    <>
      <div>
        <h3>Chroma interpolated colors:</h3>
        {geojson.features.map((feature, index) => (
          <div
            key={index}
            style={{
              width: 30,
              height: 30,
              backgroundColor: scale(feature.properties.gradient / 200).hex(),
            }}
          >
            <span style={{ marginLeft: 40 }}>
              {scale(feature.properties.gradient / 200).hex()}
            </span>
          </div>
        ))}
      </div>

      <h3>MapLibre interpolated colors:</h3>
      <ReactMap
        initialViewState={{
          longitude: 0.03,
          latitude: -0.02,
          zoom: 12,
        }}
        style={{ width: 400, height: 300 }}
        mapStyle={mapStyles as StyleSpecification}
      >
        <Source id="geojson" type="geojson" data={geojson} generateId={true}>
          <Layer
            id="text"
            type="symbol"
            layout={{
              "text-allow-overlap": true,
              "text-field": ["get", "gradient"],
              "text-size": 12,
              "text-offset": [3, 0],
            }}
            paint={{
              "text-color": "#000",
            }}
          />
          <Layer
            id="point"
            type="circle"
            paint={{
              "circle-radius": 10,
              "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "gradient"],
                0,
                "#008000", // green
                50,
                "#FFFF00", // yellow
                100,
                "#ff0000", // red
                200,
                "#000", // black
              ],
            }}
          />
        </Source>
      </ReactMap>
    </>
  );
};
