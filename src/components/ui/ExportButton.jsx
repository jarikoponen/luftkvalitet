import { exportCSV } from "../../utils/export";

export default function ExportButton({ data, station, timeRange }) {
  return (
    <button
      className="export-btn"
      onClick={() => exportCSV(data, station, timeRange)}
      disabled={!data.length}
      title="Ladda ner data som CSV"
    >
      📥 Exportera CSV
    </button>
  );
}
