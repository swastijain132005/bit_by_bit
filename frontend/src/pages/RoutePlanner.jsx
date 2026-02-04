import "./RoutePlanner.css";
import Navbar from "../components/Navbar";
import { MapPin, Navigation, Clock, Search } from "lucide-react";
import { useState } from "react";

export default function SafeRoutePlanner() {
  const [mode, setMode] = useState("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  return (
    <>
      <Navbar />

      <div className="planner-page">
        {/* LEFT COLUMN */}
        <div className="planner-left">
          <div className="planner-card">
            {/* FROM */}
            <div className="input-group">
              <MapPin className="icon teal" size={18} />
              <input type="text" value="Current location" disabled />
              <Navigation className="icon action" size={18} />
            </div>

            {/* TO */}
            <div className="input-group">
              <MapPin className="icon red" size={18} />
              <input type="text" placeholder="Where do you want to go?" />
            </div>

            {/* TIME MODE */}
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

            {/* SCHEDULE */}
            {mode === "schedule" && (
              <div className="schedule-row">
                <div className="schedule-input">
                  <input type="date" />
                  <span className="schedule-icon">📅</span>
                </div>

                <div className="schedule-input">
                  <input type="time" />
                  <span className="schedule-icon">⏰</span>
                </div>
              </div>
            )}

            {/* CTA */}
            <button className="find-btn">
              <Search size={18} />
              Find Safe Routes
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="planner-right">
          <div className="routes-empty">
            <div className="empty-icon">📍</div>
            <h3>Routes will appear here</h3>
            <p>
              Enter your destination and we’ll show you the safest routes using
              real-time community insights.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
