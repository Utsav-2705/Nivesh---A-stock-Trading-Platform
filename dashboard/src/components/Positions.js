/*import React from "react";

import { positions } from "../data/data";

const Positions = () => {
  return (
    <>
      <h3 className="title" style={{color: "#94a3b8"}}>Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
           <thead> 
          <tr style={{color: "#94a3b8"}}>
            <th style={{color: "#94a3b8"}}>Product</th>
            <th style={{color: "#94a3b8"}}>Instrument</th>
            <th style={{color: "#94a3b8"}}>Qty.</th>
            <th style={{color: "#94a3b8"}}>Avg.</th>
            <th style={{color: "#94a3b8"}}>LTP</th>
            <th style={{color: "#94a3b8"}}>P&L</th>
            <th style={{color: "#94a3b8"}}>Chg.</th>
          </tr>
          </thead>
          
          {positions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass} style={{color: "#94a3b8"}}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
*/



import React, { useState, useMemo } from "react";
import { positions } from "../data/data";
import "./Positions.css";

// GET Initials for avatar 
const getInitials = (name = "") => name.replace(/[^A-Z]/g, "").slice(0, 3) || name.slice(0, 3).toUpperCase();

// Format currency in Indian style  
const fmtINR = (n) =>
  Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Current time string 
  //new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
// Current time string
const getTime = () =>
  new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
// Product badge variant 
const getProductClass = (product = "") => {
  const p = product.toUpperCase();
  if (p === "MIS")  return "mis";
  if (p === "CNC")  return "cnc";
  if (p === "NRML") return "nrml";
  return "default";
};

//   Skeleton row while loading  
const SkeletonRow = () => (
  <tr>
    {[80, 110, 55, 75, 75, 85, 65].map((w, i) => (
      <td key={i} style={{ padding: "14px 15px" }}>
        <div className="pos-skeleton-cell" style={{ width: w }} />
      </td>
    ))}
  </tr>
);


const Positions = () => {

  //  UI state 
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState("all");   // all | profit | loss
  const [sortKey,    setSortKey]    = useState("name");  // name | qty | pnl | price
  const [sortDir,    setSortDir]    = useState("asc");
  const [loading,    setLoading]    = useState(false);
  const [timestamp]                 = useState(getTime());

  //  Enrich positions with ORIGINAL calculations 
  
  const enriched = useMemo(() =>
    positions.map((stock) => {
      const curValue  = stock.price * stock.qty;                   // ORIGINAL
      const isProfit  = curValue - stock.avg * stock.qty >= 0.0;   // ORIGINAL
      const profClass = isProfit ? "profit" : "loss";              // ORIGINAL
      const dayClass  = stock.isLoss ? "loss" : "profit";          // ORIGINAL
      const pnl       = curValue - stock.avg * stock.qty;          // derived from original
      const exposure  = stock.price * stock.qty;                   // for insights
      return { ...stock, curValue, isProfit, profClass, dayClass, pnl, exposure };
    }),
  []);

  //    Summary calculations  
  const summary = useMemo(() => {
    const totalPositions = enriched.length;
    const totalExposure  = enriched.reduce((a, s) => a + s.exposure, 0);
    const totalPnl       = enriched.reduce((a, s) => a + s.pnl, 0);
    const winners        = enriched.filter((s) => s.isProfit);
    const losers         = enriched.filter((s) => !s.isProfit);
    const winRate        = totalPositions > 0 ? (winners.length / totalPositions) * 100 : 0;
    return { totalPositions, totalExposure, totalPnl, winners, losers, winRate,
             isOverallProfit: totalPnl >= 0 };
  }, [enriched]);

  //  Insights 
  const insights = useMemo(() => {
    if (!enriched.length) return null;
    const best    = [...enriched].sort((a, b) => b.pnl - a.pnl)[0];
    const worst   = [...enriched].sort((a, b) => a.pnl - b.pnl)[0];
    const highQty = [...enriched].sort((a, b) => b.qty - a.qty)[0];
    const highExp = [...enriched].sort((a, b) => b.exposure - a.exposure)[0];
    return { best, worst, highQty, highExp };
  }, [enriched]);

  //  Filtered + sorted list 
  const displayed = useMemo(() => {
    let list = [...enriched];

    if (search.trim())
      list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

    if (filter === "profit") list = list.filter((s) => s.isProfit);
    if (filter === "loss")   list = list.filter((s) => !s.isProfit);

    list.sort((a, b) => {
      const map = { name: "name", qty: "qty", pnl: "pnl", price: "price" };
      const k = map[sortKey] || "name";
      const va = a[k], vb = b[k];
      return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

    return list;
  }, [enriched, search, filter, sortKey, sortDir]);

  //  Sort column toggle  
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };
  const si = (key) => sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

  //  Export to CSV 
  const handleExport = () => {
    const headers = ["Product", "Instrument", "Qty", "Avg", "LTP", "Cur.Value", "P&L", "Day Chg"];
    const rows = enriched.map((s) =>
      [s.product, s.name, s.qty, s.avg.toFixed(2), s.price.toFixed(2),
       s.curValue.toFixed(2), s.pnl.toFixed(2), s.day]
    );
    const csv  = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "positions.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  //  Simulated refresh 
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  };

    return (
    <div className="pos-root">

      {/*HEADER*/}
      <div className="pos-header">
        <div className="pos-header-left">
          <div className="pos-logo">📊</div>
          <div>
            <div className="pos-title">Open Positions</div>
            {/* live count in subtitle */}
           <div className="pos-subtitle">
              {positions.length} POSITIONS · INTRADAY / DELIVERY
            </div>
          </div>
        </div>

        <div className="pos-header-right">
          {/* LIVE status indicator */}
          <div className="pos-live-badge">
            <span className="pos-live-dot" />
            LIVE
          </div>

          <span className="pos-timestamp">Updated {timestamp}</span>

          {/*  Action buttons */}
          <button className="pos-btn refresh" onClick={handleRefresh} title="Refresh">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            Refresh
          </button>

          {/* CSV export */}
          <button className="pos-btn export" onClick={handleExport} title="Export CSV">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        </div>
      </div>

     {/*SUMMARY CARDS*/}
      <div className="pos-summary">
        <div className="pos-summary-grid">

          {/* Total positions */}
          <div className="pos-card c-amber">
            <span className="pos-card-icon">📋</span>
            <div className="pos-card-label">Total Positions</div>
            <div className="pos-card-value amber">{summary.totalPositions}</div>
            <div className="pos-card-sub">Active instruments</div>
          </div>

          {/* Total exposure */}
          <div className="pos-card c-blue">
            <span className="pos-card-icon">💼</span>
            <div className="pos-card-label">Total Exposure</div>
            <div className="pos-card-value amber">₹{fmtINR(summary.totalExposure)}</div>
            <div className="pos-card-sub">Market value</div>
          </div>

          {/* Unrealised P&L  */}
          <div className="pos-card c-profit">
            <span className="pos-card-icon">📈</span>
            <div className="pos-card-label">Unrealised P&amp;L</div>
            <div className={`pos-card-value ${summary.isOverallProfit ? "profit" : "loss"}`}>
              {summary.isOverallProfit ? "+" : ""}₹{fmtINR(summary.totalPnl)}
            </div>
            <div className={`pos-badge ${summary.isOverallProfit ? "profit" : "loss"}`}>
              {summary.isOverallProfit ? "▲" : "▼"} All positions
            </div>
          </div>

          {/* Today's P&L */}
          <div className="pos-card c-loss">
            <span className="pos-card-icon">⚡</span>
            <div className="pos-card-label">Today's P&amp;L</div>
            <div className={`pos-card-value ${summary.isOverallProfit ? "profit" : "loss"}`}>
              {summary.isOverallProfit ? "+" : ""}₹{fmtINR(summary.totalPnl)}
            </div>
            <div className="pos-card-sub">MTM basis</div>
          </div>

          {/* Winners */}
          <div className="pos-card c-win">
            <span className="pos-card-icon">✅</span>
            <div className="pos-card-label">Winning</div>
            <div className="pos-card-value profit">{summary.winners.length}</div>
            <div className="pos-card-sub">
              {summary.winRate.toFixed(0)}% win rate
            </div>
          </div>

          {/* Losers */}
          <div className="pos-card c-losing">
            <span className="pos-card-icon">❌</span>
            <div className="pos-card-label">Losing</div>
            <div className="pos-card-value loss">{summary.losers.length}</div>
            <div className="pos-card-sub">
              {(100 - summary.winRate).toFixed(0)}% loss rate
            </div>
          </div>

        </div>
      </div>

      {/* 
          3. SEARCH & FILTER
 */}
      <div className="pos-controls">

        {/* Search input */}
        <div className="pos-search-wrap">
          <svg className="pos-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="pos-search"
            type="text"
            placeholder="Search instrument…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter */}
        <select className="pos-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Positions</option>
          <option value="profit">Profitable</option>
          <option value="loss">Loss Making</option>
        </select>

        {/* Sort */}
        <select
          className="pos-select"
          value={sortKey}
          onChange={(e) => { setSortKey(e.target.value); setSortDir("asc"); }}
        >
          <option value="name">Sort: Instrument</option>
          <option value="qty">Sort: Quantity</option>
          <option value="pnl">Sort: P&amp;L</option>
          <option value="price">Sort: Price</option>
        </select>

        {/* Count pill */}
        <div className="pos-count-pill">
          {displayed.length} / {positions.length} shown
        </div>
      </div>

      {/*  
          4. POSITIONS TABLE
          */}
      <div className="pos-table-section">
        <div className="pos-table-container">
          <div className="pos-table-scroll">
            <table className="pos-table">
              <thead>
                <tr>
                  {/* Sortable headers */}
                  <th>Product</th>
                  <th onClick={() => handleSort("name")}>
                    Instrument <span className="pos-sort-icon">{si("name")}</span>
                  </th>
                  <th onClick={() => handleSort("qty")}>
                    Qty. <span className="pos-sort-icon">{si("qty")}</span>
                  </th>
                  <th>Avg.</th>
                  <th onClick={() => handleSort("price")}>
                    LTP <span className="pos-sort-icon">{si("price")}</span>
                  </th>
                  <th onClick={() => handleSort("pnl")}>
                    P&amp;L <span className="pos-sort-icon">{si("pnl")}</span>
                  </th>
                  <th>Day Chg.</th>
                </tr>
              </thead>

              <tbody>
                {/*  Loading skeleton */}
                {loading && [1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}

                {/* Empty state */}
                {!loading && displayed.length === 0 && (
                  <tr>
                    <td colSpan={7}>
                      <div className="pos-empty">
                        <div className="pos-empty-icon">📭</div>
                        <div>No positions match your search</div>
                      </div>
                    </td>
                  </tr>
                )}
 
                {!loading && displayed.map((stock, index) => {
                  
                  const curValue  = stock.price * stock.qty;
                  const isProfit  = curValue - stock.avg * stock.qty >= 0.0;
                  const profClass = isProfit ? "profit" : "loss";
                  const dayClass  = stock.isLoss ? "loss" : "profit";

                  return (
                    <tr key={index}>
                      {/* Product type  */}
                      <td>
                        <span className={`pos-product-badge ${getProductClass(stock.product)}`}>
                          {stock.product}
                        </span>
                      </td>

                      {/* Instrument   */}
                      <td>
                        <div className="pos-instrument-cell">
                          <div className="pos-avatar">{getInitials(stock.name)}</div>
                          <span className="pos-instrument-name">{stock.name}</span>
                        </div>
                      </td>

                      {/* Qty   */}
                      <td className="pos-qty-cell">{stock.qty}</td>

                      {/* Avg  */}
                      <td className="pos-price-cell">₹{stock.avg.toFixed(2)}</td>

                      {/* LTP   */}
                      <td className="pos-price-cell">₹{stock.price.toFixed(2)}</td>

                      {/* P&L   */}
                      <td>
                        <span className={`pos-pnl-chip ${profClass}`}>
                          {isProfit ? "▲" : "▼"} ₹{(curValue - stock.avg * stock.qty).toFixed(2)}
                        </span>
                      </td>

                      {/* Day change   */}
                      <td>
                        <span className={`pos-pnl-chip ${dayClass}`}>
                          {stock.day}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      {!loading && insights && (
        <div className="pos-insights">
          <div className="pos-section-label">Position Insights</div>
          <div className="pos-insights-grid">

            <div className="pos-insight-card best">
              <div className="pos-insight-tag">🏆 Best Position</div>
              <div className="pos-insight-name">{insights.best.name}</div>
              <div className="pos-insight-val" style={{ color: "var(--pos-green)" }}>
                +₹{insights.best.pnl.toFixed(2)}
              </div>
            </div>

            <div className="pos-insight-card worst">
              <div className="pos-insight-tag">📉 Worst Position</div>
              <div className="pos-insight-name">{insights.worst.name}</div>
              <div className="pos-insight-val" style={{ color: "var(--pos-red)" }}>
                ₹{insights.worst.pnl.toFixed(2)}
              </div>
            </div>

            <div className="pos-insight-card qty">
              <div className="pos-insight-tag">📦 Highest Qty</div>
              <div className="pos-insight-name">{insights.highQty.name}</div>
              <div className="pos-insight-val" style={{ color: "var(--pos-amber)" }}>
                {insights.highQty.qty} units
              </div>
            </div>

            <div className="pos-insight-card exp">
              <div className="pos-insight-tag">💎 Largest Exposure</div>
              <div className="pos-insight-name">{insights.highExp.name}</div>
              <div className="pos-insight-val" style={{ color: "var(--pos-blue)" }}>
                ₹{fmtINR(insights.highExp.exposure)}
              </div>
            </div>

          </div>
        </div>
      )}

       
      {!loading && (
        <div className="pos-analytics">
          <div className="pos-section-label">Performance Analytics</div>
          <div className="pos-analytics-grid">

            {/* Win rate with bar */}
            <div className="pos-stat-card">
              <div className="pos-stat-header">
                <div className="pos-stat-title">Win Rate</div>
                <span className="pos-stat-icon">🎯</span>
              </div>
              <div className={`pos-stat-value ${summary.winRate >= 50 ? "profit" : "loss"}`}>
                {summary.winRate.toFixed(1)}%
              </div>
              <div className="pos-win-bar-track">
                <div
                  className="pos-win-bar-fill"
                  style={{ width: `${summary.winRate}%` }}
                />
              </div>
              <div className="pos-win-bar-labels">
                <span>{summary.winners.length} winning</span>
                <span>{summary.losers.length} losing</span>
              </div>
            </div>

            {/* Total exposure card */}
            <div className="pos-stat-card">
              <div className="pos-stat-header">
                <div className="pos-stat-title">Exposure</div>
                <span className="pos-stat-icon">💰</span>
              </div>
              <div className="pos-stat-value amber">
                ₹{(summary.totalExposure / 1000).toFixed(1)}k
              </div>
              <div className="pos-stat-sub">Total market exposure</div>
            </div>

            {/* Avg P&L per position */}
            <div className="pos-stat-card">
              <div className="pos-stat-header">
                <div className="pos-stat-title">Avg P&amp;L / Position</div>
                <span className="pos-stat-icon">📊</span>
              </div>
              <div className={`pos-stat-value ${summary.isOverallProfit ? "profit" : "loss"}`}>
                ₹{summary.totalPositions > 0
                  ? fmtINR(summary.totalPnl / summary.totalPositions)
                  : "0.00"}
              </div>
              <div className="pos-stat-sub">Across all positions</div>
            </div>

            {/* Profit vs Loss volume */}
            <div className="pos-stat-card">
              <div className="pos-stat-header">
                <div className="pos-stat-title">P / L Ratio</div>
                <span className="pos-stat-icon">⚖️</span>
              </div>
              <div className="pos-stat-value amber">
                {summary.losers.length > 0
                  ? (summary.winners.length / summary.losers.length).toFixed(2)
                  : "∞"}
              </div>
              <div className="pos-stat-sub">
                {summary.winners.length}W · {summary.losers.length}L
              </div>
            </div>

          </div>
        </div>
     )}

    </div>
   
)};

export default Positions;
