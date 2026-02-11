export const fetchOSRMRoutes = async (from, to) => {
  const url = `https://router.project-osrm.org/route/v1/foot/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson&alternatives=true`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.code !== "Ok") {
    throw new Error("OSRM route fetch failed");
  }

  return data.routes; // array of routes
};
