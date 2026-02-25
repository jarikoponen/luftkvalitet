import { STATIONS } from "../../api/airQuality";

export default function StationSelector({ station, setStation }) {
  return (
    <div className="station-sel ai d1">
      <div className="station-label">📍 Mätstation</div>
      <div className="station-btns">
        {STATIONS.map(s => (
          <button
            key={s.id}
            className={`cb ${station === s.id ? "on" : ""}`}
            onClick={() => setStation(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="station-info">
        {STATIONS.find(s => s.id === station)?.pollutants.join(" · ")}
      </div>
    </div>
  );
}
