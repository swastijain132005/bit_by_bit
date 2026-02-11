// break geometry into small segments
export const segmentRoute = (coordinates, step = 15) => {
  if (!coordinates || coordinates.length === 0) return [];

  const segments = [];
  for (let i = 0; i < coordinates.length; i += step) {
    segments.push({
      lat: coordinates[i][1],
      lng: coordinates[i][0],
    });
  }
  return segments;
};

// MOCK safety fetch (replace later with backend)
export const fetchSafetyScore = async () => {
  return Math.floor(Math.random() * 3) + 2; // 2–4
};

export const createRankedRoutes = async (osrmRoutes) => {
  // ✅ SAFETY CHECK
  if (!osrmRoutes || osrmRoutes.length === 0) {
    throw new Error("No OSRM routes available");
  }

  const base = osrmRoutes[0];

  // ✅ SAFETY CHECK
  if (!base.geometry || !base.geometry.coordinates) {
    throw new Error("Invalid OSRM geometry");
  }

  const segments = segmentRoute(base.geometry.coordinates);

  // ✅ FALLBACK (very important)
  if (segments.length === 0) {
    return [
      {
        id: "balanced",
        label: "Balanced",
        color: "blue",
        safety: 3,
        duration: base.duration,
        distance: base.distance,
      },
    ];
  }

  // faster + cleaner
  const scores = await Promise.all(
    segments.map(() => fetchSafetyScore())
  );

  const avgSafety =
    scores.reduce((a, b) => a + b, 0) / scores.length;

  return [
    {
      id: "safe",
      label: "Safest",
      color: "green",
      safety: Math.min(5, avgSafety + 0.6),
      duration: base.duration + 120,
      distance: base.distance,
    },
    {
      id: "balanced",
      label: "Balanced",
      color: "blue",
      safety: avgSafety,
      duration: base.duration,
      distance: base.distance,
    },
    {
      id: "fast",
      label: "Fastest",
      color: "orange",
      safety: Math.max(1, avgSafety - 0.7),
      duration: Math.max(60, base.duration - 90),
      distance: base.distance,
    },
  ];
};
