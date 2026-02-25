# CLAUDE.md

## Projekt
Sundsvall Luftkvalitet — dataportal som visualiserar realtidsdata om luftkvalitet (PM10, PM25, NO2).

## Teknikstack
- React 18 + Vite
- Recharts (diagram)
- Ren CSS med variabler (kan utökas med Tailwind)
- Google Fonts: Fraunces + Bricolage Grotesque

## API
Bas-URL: `https://data.sundsvall.se/api/airquality/{filter}?station={stationId}`

### Endpoint
`GET /api/airquality/{filter}?station={stationId}`

**Filter:** `day`, `fourdays`, `week`, `month`, `year`

Svar:
```json
{
  "data": {
    "data": {
      "id": "urn:ngsi-ld:AirQualityObserved:888100",
      "location": { "type": "Point", "coordinates": [17.308968, 62.388618] },
      "pollutants": [
        { "name": "PM10", "values": [{ "value": 3.5, "observedAt": "2026-02-25T00:00:00Z" }] },
        { "name": "PM25", "values": [...] },
        { "name": "NO2", "values": [...] }
      ]
    }
  }
}
```

### Stationer
- `888100` — Sundsvall Centrum [17.31, 62.39] — PM10, PM25, NO2
- `1098100` — Bergsgatan [17.30, 62.39] — PM10, PM25 (ingen NO2)

### CORS
API:et har CORS men proxyas ändå för stabilitet.
1. **Dev:** Vite proxy i `vite.config.js` — `/api/*` → `https://data.sundsvall.se/api/*`
2. **Prod:** Enkel Express-proxy i `server/proxy.js`

## Gränsvärden (PM10 dygnsmedel µg/m³)
| Nivå         | Max  | Färg    |
|--------------|------|---------|
| Fantastiskt  | 20   | #34d399 |
| Bra          | 40   | #a3e635 |
| Okej         | 50   | #facc15 |
| Dåligt       | 100  | #fb923c |
| Riktigt dåligt | ∞  | #f87171 |

Miljökvalitetsnorm PM10: 50 µg/m³ (dygn)
Miljökvalitetsnorm NO2: 90 µg/m³ (timme)

## Designprinciper
- Mörk naturgrön bakgrund (#052e16) med ljusa glasmorfism-kort
- Illustrerad SVG-bakgrund med himmel, skog, cyklister, älg
- Riktat mot yngre målgrupp — pedagogiskt och inspirerande
- Emojis som luftkvalitetsindex-ansikten

## Konventioner
- Svenska i UI, engelska i kod
- Komponentnamn: PascalCase
- Hooks: useXxx
- Utility-funktioner: camelCase
- CSS: ren CSS med variabler
