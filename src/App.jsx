import { useState } from "react";
import "./styles/global.css";

import PageBackground from "./components/layout/PageBackground";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroStatus from "./components/dashboard/HeroStatus";

import TimeSeriesChart from "./components/charts/TimeSeriesChart";

import Heatmap from "./components/charts/Heatmap";
import Legend from "./components/ui/Legend";
import CausesSection from "./components/education/CausesSection";
import TipsSection from "./components/education/TipsSection";
import FactCallout from "./components/education/FactCallout";
import StationSelector from "./components/dashboard/StationSelector";
import WeatherCard from "./components/dashboard/WeatherCard";
import ExportButton from "./components/ui/ExportButton";
import SpatialGrid from "./components/satellite/SpatialGrid";
import ForecastChart from "./components/satellite/ForecastChart";

import useAirQuality from "./hooks/useAirQuality";
import useOpenMeteo from "./hooks/useOpenMeteo";
import { DEFAULT_STATION } from "./api/airQuality";

export default function App() {
  const [selType, setSelType] = useState("both");
  const [timeRange, setTimeRange] = useState("24h");
  const [station, setStation] = useState(DEFAULT_STATION);
  const [tab, setTab] = useState("data");

  const { data, chartData, latest, hourlyAvg, trends, heatmapData, loading, isDemo } = useAirQuality(timeRange, station);
  const { gridSnapshot, forecastData, comparisonPoint, fetchedAt: meteoFetchedAt } = useOpenMeteo();

  if (loading) {
    return (
      <div className="app">
        <PageBackground />
        <div className="ldw">
          <div className="lds" />
          <div style={{ fontSize: 16, color: "#6ee7b7" }}>Hämtar luftdata från Sundsvall...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <PageBackground />
      <div className="container">
        <Header />

        <div className="tabs ai d1">
          <button className={`tab ${tab === "data" ? "tab-on" : ""}`} onClick={() => setTab("data")}>
            Luftkvalitet
          </button>
          <button className={`tab ${tab === "learn" ? "tab-on" : ""}`} onClick={() => setTab("learn")}>
            Lär dig mer
          </button>
        </div>

        {tab === "data" && (
          <div className="content-backdrop">
            <StationSelector station={station} setStation={setStation} />

            {isDemo && (
              <div className="demo ai d1">
                ℹ️ Visar <strong>simulerad data</strong> — API:et kunde inte nås just nu.
              </div>
            )}

            <div className="hero-weather-row ai d1">
              <HeroStatus latest={latest} />
              <WeatherCard />
            </div>

            <FactCallout
              emoji="💡"
              title="Visste du?"
              text="Dubbdäck river upp partiklar från vägbanan — det är en av de största orsakerna till höga PM10-nivåer i Sundsvall under vintern och våren. Att byta till friktionsdäck tidigt på säsongen gör stor skillnad!"
              bgColor="rgba(209,250,229,0.95)"
              borderColor="rgba(110,231,183,0.3)"
              titleColor="#065f46"
              textColor="#047857"
              action={<button className="fact-link" onClick={() => setTab("learn")}>Lär dig mer →</button>}
            />

            <TimeSeriesChart
              chartData={chartData}
              selType={selType}
              setSelType={setSelType}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              lastUpdated={latest.lastUpdated}
            />

            <div className="export-row ai d4">
              <ExportButton data={data} station={station} timeRange={timeRange} />
            </div>

            <Heatmap heatmapData={heatmapData} timeRange={timeRange} />

            <Legend />
          </div>
        )}

        {tab === "data" && (
          <div className="content-backdrop content-backdrop-satellite">
            <SpatialGrid grid={gridSnapshot} fetchedAt={meteoFetchedAt} />
            <ForecastChart forecastData={forecastData} fetchedAt={meteoFetchedAt} />
          </div>
        )}

        {tab === "learn" && (
          <div className="content-backdrop">
            <CausesSection />

            <FactCallout
              emoji="🏔️"
              title="Sundsvall och inversionen"
              text="Sundsvall ligger i en dalgång vid kusten. Under kalla, vindstilla vinterdagar kan en s.k. temperaturinversion uppstå — kall luft fastnar nere i dalen medan varm luft lägger sig som ett lock ovanför. Föroreningar kan då inte spridas och halterna stiger snabbt."
              bgColor="rgba(219,234,254,0.95)"
              borderColor="rgba(125,211,252,0.3)"
              titleColor="#1e40af"
              textColor="#1d4ed8"
            />

            <TipsSection />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
