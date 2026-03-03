import useWeather from "../../hooks/useWeather";
import UpdatedAt from "../ui/UpdatedAt";
import InfoTooltip from "../ui/InfoTooltip";

export default function WeatherCard() {
  const { weather, loading, error } = useWeather();

  if (loading) return null;
  if (error && !weather) return null;

  return (
    <div className="g wcard ai d1">
      <InfoTooltip
        title="Väderdata"
        description="Temperatur, vindstyrka och luftfuktighet från närmaste SMHI-station (Sundsvall-Timrå flygplats). Uppdateras var 10:e minut."
        source="SMHI — Öppna data"
      />
      <div className="wcard-title">Väder just nu</div>
      <div className="wcard-row">
        {weather.temperature != null && (
          <div className="wcard-item">
            <span className="wcard-icon">🌡️</span>
            <span className="wcard-val">{weather.temperature.toFixed(1)}°C</span>
            <span className="wcard-label">Temperatur</span>
          </div>
        )}
        {weather.wind != null && (
          <div className="wcard-item">
            <span className="wcard-icon">💨</span>
            <span className="wcard-val">{weather.wind.toFixed(1)} m/s</span>
            <span className="wcard-label">Vind</span>
          </div>
        )}
        {weather.humidity != null && (
          <div className="wcard-item">
            <span className="wcard-icon">💧</span>
            <span className="wcard-val">{weather.humidity.toFixed(0)}%</span>
            <span className="wcard-label">Luftfuktighet</span>
          </div>
        )}
      </div>
      {weather.inversionRisk && (
        <div className="wcard-warn">
          ⚠️ <strong>Inversionsrisk</strong> — Kyla och vindstilla kan ge förhöjda halter
        </div>
      )}
      <UpdatedAt date={weather.lastUpdated} />
    </div>
  );
}
