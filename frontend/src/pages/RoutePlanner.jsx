import "./RoutePlanner.css";
import Navbar from "../components/Navbar";
import { MapPin, Navigation, Clock, Search } from "lucide-react";
import { useState } from "react";

export default function SafeRoutePlanner() {
  const [mode, setMode] = useState("now");

  // FROM
  const [fromText, setFromText] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [loadingFrom, setLoadingFrom] = useState(false);
  const [locLoading, setLocLoading] = useState(false);

  // TO
  const [toText, setToText] = useState("");
  const [destination, setDestination] = useState(null);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [loadingTo, setLoadingTo] = useState(false);

  /* ---------- AUTOCOMPLETE FETCH ---------- */
  const fetchSuggestions = async (query, setList, setLoading) => {
    if (!query || query.length < 3) {
      setList([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`
      );
      const data = await res.json();

      setList(
        data.map((item) => ({
          address: item.display_name,
          lat: item.lat,
          lng: item.lon,
        }))
      );
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  /* ---------- GPS DETECTION ---------- */
  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLocLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();

          setCurrentLocation({
            lat,
            lng,
            address: data.display_name,
          });
          setFromText(data.display_name);
        } catch {
          setFromText("Current location");
        }

        setLocLoading(false);
      },
      () => {
        alert("Location permission denied");
        setLocLoading(false);
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="planner-page">
        <div className="planner-left">
          <div className="planner-card">

            {/* ---------- FROM ---------- */}
            <div className="input-group">
              <MapPin className="icon teal" size={18} />

              <div className="destination-wrapper">
                <input
                  type="text"
                  placeholder="From where?"
                  value={fromText}
                  onChange={(e) => {
                    setFromText(e.target.value);
                    fetchSuggestions(
                      e.target.value,
                      setFromSuggestions,
                      setLoadingFrom
                    );
                  }}
                />

                {loadingFrom && <div className="loader">Searching…</div>}

                {fromSuggestions.length > 0 && (
                  <div className="suggestions-box">
                    {fromSuggestions.map((place, i) => (
                      <div
                        key={i}
                        className="suggestion-item"
                        onClick={() => {
                          setCurrentLocation(place);
                          setFromText(place.address);
                          setFromSuggestions([]);
                        }}
                      >
                        📍 {place.address}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Navigation
                size={18}
                className={`icon action ${locLoading ? "loading" : ""}`}
                onClick={detectCurrentLocation}
              />
            </div>

            {/* ---------- TO ---------- */}
            <div className="input-group">
              <MapPin className="icon red" size={18} />

              <div className="destination-wrapper">
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={toText}
                  onChange={(e) => {
                    setToText(e.target.value);
                    fetchSuggestions(
                      e.target.value,
                      setToSuggestions,
                      setLoadingTo
                    );
                  }}
                />

                {loadingTo && <div className="loader">Searching…</div>}

                {toSuggestions.length > 0 && (
                  <div className="suggestions-box">
                    {toSuggestions.map((place, i) => (
                      <div
                        key={i}
                        className="suggestion-item"
                        onClick={() => {
                          setDestination(place);
                          setToText(place.address);
                          setToSuggestions([]);
                        }}
                      >
                        📍 {place.address}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ---------- TIME MODE ---------- */}
            <div className="time-row">
              <button
                className={`time-btn ${mode === "now" ? "active" : ""}`}
                onClick={() => setMode("now")}
              >
                <Clock size={16} /> Leave now
              </button>

              <button
                className={`time-btn ${mode === "schedule" ? "active" : ""}`}
                onClick={() => setMode("schedule")}
              >
                <Clock size={16} /> Schedule
              </button>
            </div>

            {/* ---------- CTA ---------- */}
            <button className="find-btn">
              <Search size={18} />
              Find Safe Routes
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="planner-right">
          <div className="routes-empty">
            <div className="empty-icon">📍</div>
            <h3>Routes will appear here</h3>
            <p>
              Enter start and destination to view the safest routes based on
              real-time community insights.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
