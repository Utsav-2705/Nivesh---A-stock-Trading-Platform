/*import React, { useEffect, useState } from "react";
import axios from "axios";


const Summary = () => {
   const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002/verify",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          setUsername(data.user);
        } else {
          window.location.href =  "http://localhost:3000";
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyUser();
  }, []);
  return (
    <>
      <div className="username">
        <h6>Hi, {username}</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Summary.css";

 
const useCountUp = (target, duration = 1200, started = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, "")) || 0;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(+(numeric * ease).toFixed(2));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return value;
};
 
const fmt = (n) => {
  if (n >= 1000) return (n / 1000).toFixed(2) + "k";
  return n.toFixed(2);
};

 
const Skeleton = ({ w = "100%", h = "16px", r = "6px" }) => (
  <div className="skeleton" style={{ width: w, height: h, borderRadius: r }} />
);

 
const StatPill = ({ label, value, sub, accent }) => (
  <div className={`stat-pill ${accent}`}>
    <span className="stat-value">{value}</span>
    <span className="stat-label">{label}</span>
    {sub && <span className="stat-sub">{sub}</span>}
  </div>
);

 

const Summary = () => {
 
  const [username, setUsername] = useState("");

   
  const [loading, setLoading] = useState(true);
  const [countersReady, setCountersReady] = useState(false);
  const [marketOpen, setMarketOpen] = useState(false);
 
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3002/verify",
          {},
          { withCredentials: true }
        );

        if (data.status) {
          setUsername(data.user);
        } else {
         /* window.location.href = "http://localhost:3000";*/
        if (!window.location.href.includes("localhost:3000")) {
          window.location.href = "http://localhost:3000";
        }
       
       
       
        }
      } catch (error) {
        /*console.log(error);*/
        console.log("Verify failed:", error);
     
      }
    };

    verifyUser();
  }, []);
   
   
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setCountersReady(true), 200);
    }, 900);

    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const mins = h * 60 + m;
    // NSE: 9:15 AM – 3:30 PM IST (Mon–Fri)
    const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
    setMarketOpen(isWeekday && mins >= 555 && mins <= 930);

    return () => clearTimeout(timer);
  }, []);

  
  const marginAvail = useCountUp(3740, 1200, countersReady);
  const marginsUsed = useCountUp(0, 1200, countersReady);
  const openingBal = useCountUp(3740, 1200, countersReady);
  const pnl = useCountUp(1550, 1200, countersReady);
  const currentVal = useCountUp(31430, 1200, countersReady);
  const investment = useCountUp(29880, 1200, countersReady);

   
  const marginUsedPct = openingBal > 0 ? (marginsUsed / openingBal) * 100 : 0;
  const pnlPct = 5.2;
  const isProfit = pnl >= 0;
  const avatarLetter = username ? username[0].toUpperCase() : "?";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="dashboard">
      
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow--teal" aria-hidden="true" />
      <div className="bg-glow bg-glow--blue" aria-hidden="true" />

      <div className="dashboard-inner">

         
        <div className="card card--welcome">
          <div className="welcome-left">
            {/*  UI: Avatar */}
            <div className="avatar">
              {loading ? <Skeleton w="48px" h="48px" r="50%" /> : avatarLetter}
            </div>
            <div className="welcome-text">
              <p className="welcome-eyebrow">Welcome back</p>
              {/* username display */}
              {loading
                ? <Skeleton w="140px" h="26px" r="6px" />
                : <h2 className="welcome-name">{username || "Trader"}</h2>
              }
              <p className="welcome-date">{today}</p>
            </div>
          </div>

          {/*  Market status badge */}
          <div className={`market-badge ${marketOpen ? "market-badge--live" : "market-badge--closed"}`}>
            <span className="market-dot" />
            <span>{marketOpen ? "Market Live" : "Market Closed"}</span>
          </div>
        </div>

        {/*  
            Stats Row
         */}
        <div className="stats-row">
          <StatPill label="Portfolio Value"  value={loading ? "—" : `₹${fmt(currentVal)}`}   accent="accent-teal"   />
          <StatPill label="Today's P&L"      value={loading ? "—" : `+₹${fmt(pnl)}`}         accent="accent-green"  sub="+5.20%" />
          <StatPill label="Holdings"         value="13"                                         accent="accent-indigo" />
          <StatPill label="Available Margin" value={loading ? "—" : `₹${fmt(marginAvail)}`}  accent="accent-amber"  />
        </div>

        
        <div className="cards-row">
 
          <div className="card card--equity">
            <div className="card-header">
              {/* Icon */}
              <span className="card-icon card-icon--equity">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
              </span>
              <h3 className="card-title">Equity</h3>
              <span className="card-tag">NSE / BSE</span>
            </div>

            <div className="card-main">
              <div className="card-primary">
                {loading
                  ? <Skeleton w="100px" h="38px" r="8px" />
                  : <span className="big-number">₹{fmt(marginAvail)}</span>
                }
                <p className="big-label">Margin Available</p>
              </div>
            </div>
 
            <div className="margin-bar-wrap">
              <div className="margin-bar-labels">
                <span>Margin Used</span>
                <span>{marginUsedPct.toFixed(1)}%</span>
              </div>
              <div className="margin-bar-track">
                <div
                  className="margin-bar-fill"
                  style={{ width: `${Math.min(marginUsedPct, 100)}%` }}
                />
              </div>
            </div>

            <div className="card-detail-row">
              <div className="detail-item">
                <span className="detail-label">Margins Used</span>
               
                <span className="detail-value">
                  {loading ? <Skeleton w="40px" h="14px" /> : marginsUsed}
                </span>
              </div>
              <div className="detail-divider" />
              <div className="detail-item">
                <span className="detail-label">Opening Balance</span>
                
                <span className="detail-value">
                  {loading ? <Skeleton w="60px" h="14px" /> : `₹${fmt(openingBal)}`}
                </span>
              </div>
            </div>
          </div>

          {/*Holdings Card */}
          <div className="card card--holdings">
            <div className="card-header">
              {/* Icon */}
              <span className="card-icon card-icon--holdings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </span>
              {/* Holdings count */}
              <h3 className="card-title">Holdings <span className="holdings-count">(13)</span></h3>
              {/* P&L badge */}
              <span className={`pnl-badge ${isProfit ? "pnl-badge--profit" : "pnl-badge--loss"}`}>
                {isProfit ? "▲" : "▼"} {pnlPct}%
              </span>
            </div>

            <div className="card-main">
              <div className="card-primary">
                {loading
                  ? <Skeleton w="120px" h="38px" r="8px" />
                  : (
                    <span className={`big-number ${isProfit ? "profit-text" : "loss-text"}`}>
                      {isProfit ? "+" : "-"}₹{fmt(pnl)}
                    </span>
                  )
                }
                {/* P&L label */}
                <p className="big-label">Profit &amp; Loss</p>
              </div>
            </div>

            {/* Mini sparkline visual*/}
            <div className="sparkline-wrap" aria-hidden="true">
              <svg viewBox="0 0 120 36" preserveAspectRatio="none" className="sparkline">
                <defs>
                  <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00e5a0" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 28 C10 25 20 20 30 18 S50 10 60 12 S80 8 90 6 S110 4 120 2" stroke="#00e5a0" strokeWidth="2" fill="none" />
                <path d="M0 28 C10 25 20 20 30 18 S50 10 60 12 S80 8 90 6 S110 4 120 2 V36 H0 Z" fill="url(#spark-grad)" />
              </svg>
            </div>

            <div className="card-detail-row">
              <div className="detail-item">
                <span className="detail-label">Current Value</span>
                {/*current value */}
                <span className="detail-value">
                  {loading ? <Skeleton w="60px" h="14px" /> : `₹${fmt(currentVal)}`}
                </span>
              </div>
              <div className="detail-divider" />
              <div className="detail-item">
                <span className="detail-label">Investment</span>
                {/*investment value */}
                <span className="detail-value">
                  {loading ? <Skeleton w="60px" h="14px" /> : `₹${fmt(investment)}`}
                </span>
              </div>
            </div>
          </div>

        </div>
        {/* END cards-row */}

        {/*Footer bar */}
        <div className="dash-footer">
          <span>Powered by</span>
          <span className="footer-brand">Nivesh</span>
          <span className="footer-sep">·</span>
          <span>NSE &amp; BSE data is 15 min delayed</span>
        </div>

      </div>
      {/* END dashboard-inner */}
    </div>
  );
};

export default Summary;
