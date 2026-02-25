import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GRID_POINTS, STATION_CELLS } from "../../api/openMeteo";
import { getQuality } from "../../utils/quality";

/* Approximate real-world coordinates for each named location.
   CAMS data comes from a regular grid, but we display markers at the
   actual geographic position to make the map intuitive. */
const DISPLAY_COORDS = {
  "Matfors":      [62.350, 17.033],
  "Sidsjön N":    [62.380, 17.276],
  "Nacksta":      [62.391, 17.271],
  "Skönsmon":     [62.379, 17.342],
  "Alnö N":       [62.430, 17.460],
  "Granlo":       [62.403, 17.263],
  "Sidsjön":      [62.373, 17.276],
  "Norr":         [62.394, 17.303],
  "Haga":         [62.404, 17.330],
  "Alnö":         [62.411, 17.470],
  "Bergsåker":    [62.417, 17.223],
  "Väster":       [62.395, 17.280],
  "Centrum":      [62.391, 17.307],
  "Södermalm":    [62.384, 17.303],
  "Kusten":       [62.377, 17.354],
  "Bosvedjan":    [62.413, 17.328],
  "Skönsberg":    [62.400, 17.344],
  "Söder":        [62.380, 17.307],
  "Kvissleby N":  [62.300, 17.375],
  "Vindhem":      [62.354, 17.426],
  "Stockvik":     [62.343, 17.363],
  "Tunadal":      [62.415, 17.378],
  "Njurunda":     [62.257, 17.374],
  "Kvissleby":    [62.294, 17.375],
  "Björkön":      [62.234, 17.544],
};

const allCoords = Object.values(DISPLAY_COORDS);
const BOUNDS = L.latLngBounds(allCoords.map(([lat, lon]) => [lat, lon]));

const stationByKey = {};
for (const s of STATION_CELLS) {
  stationByKey[`${s.row},${s.col}`] = s;
}

function stationIcon(color) {
  return L.divIcon({
    className: "station-marker",
    html: `<div class="station-marker-inner" style="background:${color}"><div class="station-marker-pulse"></div></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    map.fitBounds(BOUNDS, { padding: [30, 30] });
    const timer = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(BOUNDS, { padding: [30, 30] });
    }, 600);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

export default function SpatialGrid({ grid }) {
  const [pollutant, setPollutant] = useState("pm10");

  if (!grid) return null;

  return (
    <div className="spatial-section ai d5">
      <h2 className="st">Satellitvy — Sundsvallsområdet</h2>
      <p className="ss">CAMS-modelldata (11 km upplösning) visar luftkvaliteten i hela regionen</p>
      <div className="spatial-toggle">
        {["pm10", "no2"].map(p => (
          <button
            key={p}
            className={`cb ${pollutant === p ? "on" : ""}`}
            onClick={() => setPollutant(p)}
          >
            {p === "pm10" ? "PM10" : "NO₂"}
          </button>
        ))}
      </div>
      <div className="spatial-map">
        <MapContainer
          center={[62.35, 17.30]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <FitBounds />
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          />
          {GRID_POINTS.map(({ row, col, label }) => {
            const cell = grid[row]?.[col];
            if (!cell) return null;
            const coords = DISPLAY_COORDS[label];
            if (!coords) return null;
            const val = pollutant === "pm10" ? cell.pm10 : cell.no2;
            const q = getQuality(val);
            const station = stationByKey[`${row},${col}`];

            const popup = (
              <Popup className="spatial-leaflet-popup">
                <strong>{station ? station.name : label}</strong>
                {station && <span className="spatial-popup-badge">Mätstation</span>}
                <div>PM10: {cell.pm10 != null ? cell.pm10.toFixed(1) : "—"} µg/m³</div>
                <div>NO₂: {cell.no2 != null ? cell.no2.toFixed(1) : "—"} µg/m³</div>
                <div>AQI: {cell.aqi != null ? Math.round(cell.aqi) : "—"}</div>
                <div style={{ color: q.color, fontWeight: 700, marginTop: 2 }}>{q.face} {q.label}</div>
              </Popup>
            );

            if (station) {
              return (
                <Marker
                  key={`${row}-${col}`}
                  position={coords}
                  icon={stationIcon(q.color)}
                >
                  {popup}
                </Marker>
              );
            }

            return (
              <CircleMarker
                key={`${row}-${col}`}
                center={coords}
                radius={10}
                pathOptions={{
                  fillColor: q.color,
                  fillOpacity: 0.6,
                  color: q.color,
                  weight: 1,
                  opacity: 0.3,
                }}
              >
                {popup}
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
