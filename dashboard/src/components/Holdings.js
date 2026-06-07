import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import "./Holdings.css";


const getInitials = (name = "") =>
  name.slice(0, 3).toUpperCase();

const fmt = (n) =>
  Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

 
const getTime = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

 
const SkeletonRow = () => (
  <tr className="skeleton-row">
    {[140, 60, 90, 90, 100, 90, 80, 80].map((w, i) => (
      <td key={i}>
        <div className="skeleton-cell" style={{ width: w }} />
      </td>
    ))}
  </tr>
);

 
const Holdings = () => {
  
  const [allHoldings, setAllHoldings] = useState([]);

  
  const [loading, setLoading]       = useState(true);
  const [searchQ, setSearchQ]       = useState("");
  const [filterMode, setFilterMode] = useState("all");   // all | profit | loss
  const [sortKey, setSortKey]       = useState("name");  // name | curval | pnl | qty
  const [sortDir, setSortDir]       = useState("asc");
  const [lastUpdated, setLastUpdated] = useState(getTime());

   
  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setAllHoldings(res.data);
      setLoading(false);
      setLastUpdated(getTime());
    });
  }, []);
 
  const labels = allHoldings.map((subArray) => subArray["name"]);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

   
  const handleRefresh = () => {
    setLoading(true);
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setAllHoldings(res.data);
      setLoading(false);
      setLastUpdated(getTime());
    });
  };
 

  const handleExportCSV = () => {
    const headers = ["Instrument", "Qty", "Avg Cost", "LTP", "Cur. Value", "P&L", "Net Chg", "Day Chg"];
    const rows = allHoldings.map((stock) => {
      const curValue = stock.price * stock.qty;
      const pnl = curValue - stock.avg * stock.qty;
      return [stock.name, stock.qty, stock.avg.toFixed(2), stock.price.toFixed(2),
              curValue.toFixed(2), pnl.toFixed(2), stock.net, stock.day];
    });
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "holdings.csv"; a.click();
    URL.revokeObjectURL(url);
  };
 
  const summary = useMemo(() => {
    let totalInvest = 0, totalCur = 0;
    allHoldings.forEach((stock) => {
      totalInvest += stock.avg   * stock.qty;
      totalCur    += stock.price * stock.qty;
    });
    const totalPnl     = totalCur - totalInvest;
    const pnlPct       = totalInvest > 0 ? (totalPnl / totalInvest) * 100 : 0;
    const isProfit     = totalPnl >= 0;
    return { totalInvest, totalCur, totalPnl, pnlPct, isProfit };
  }, [allHoldings]);

  
  const insights = useMemo(() => {
    if (!allHoldings.length) return null;
    const enriched = allHoldings.map((stock) => ({
      ...stock,
      curValue : stock.price * stock.qty,
      pnl      : stock.price * stock.qty - stock.avg * stock.qty,
    }));
    const best    = [...enriched].sort((a, b) => b.pnl - a.pnl)[0];
    const worst   = [...enriched].sort((a, b) => a.pnl - b.pnl)[0];
    const largest = [...enriched].sort((a, b) => b.curValue - a.curValue)[0];
    return { best, worst, largest };
  }, [allHoldings]);

   
  // Duplicated for seamless scroll loop
  const tickerItems = useMemo(() => {
    const base = allHoldings.map((s) => ({
      symbol : s.name,
      price  : s.price.toFixed(2),
      change : s.day,
      isLoss : s.isLoss,
    }));
    return [...base, ...base]; // duplicate for infinite scroll
  }, [allHoldings]);
 
  const displayedHoldings = useMemo(() => {
    let list = allHoldings.map((stock) => ({
      ...stock,
      curValue : stock.price * stock.qty,
      pnl      : stock.price * stock.qty - stock.avg * stock.qty,
      isProfit : stock.price * stock.qty - stock.avg * stock.qty >= 0,
    }));

    // Search filter
    if (searchQ.trim()) {
      list = list.filter((s) =>
        s.name.toLowerCase().includes(searchQ.toLowerCase())
      );
    }

    // P/L filter
    if (filterMode === "profit") list = list.filter((s) => s.isProfit);
    if (filterMode === "loss")   list = list.filter((s) => !s.isProfit);

    // Sort
    list.sort((a, b) => {
      let va, vb;
      if (sortKey === "name")   { va = a.name;     vb = b.name;     }
      if (sortKey === "curval") { va = a.curValue;  vb = b.curValue; }
      if (sortKey === "pnl")    { va = a.pnl;       vb = b.pnl;      }
      if (sortKey === "qty")    { va = a.qty;        vb = b.qty;      }
      if (sortDir === "asc")  return va > vb ? 1 : -1;
      else                    return va < vb ? 1 : -1;
    });

    return list;
  }, [allHoldings, searchQ, filterMode, sortKey, sortDir]);

  //  Toggle sort column  
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sortIcon = (key) =>
    sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

  
  return (
    <div className="holdings-root">

     
      {tickerItems.length > 0 && (
        <div className="ticker-strip">
          <div className="ticker-inner">
            {tickerItems.map((item, i) => (
              <span className="ticker-item" key={i}>
                <span className="ticker-symbol">{item.symbol}</span>
                <span className="ticker-price">₹{item.price}</span>
                <span className={`ticker-change ${item.isLoss ? "loss" : "profit"}`}>
                  {item.isLoss ? "▼" : "▲"} {item.change}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/*  
          1. PORTFOLIO HEADER
        */}
      <div className="portfolio-header">
        <div className="header-left">
          <div className="portfolio-logo">📈</div>
          <div>
            <div className="portfolio-title">Portfolio Holdings</div>
            {/*   live holdings count in subtitle */}
            <div className="portfolio-subtitle">
              {allHoldings.length} INSTRUMENTS · EQUITY
            </div>
          </div>
        </div>

        <div className="header-right">
          {/*  LIVE market status badge */}
          <div className="live-badge">
            <span className="live-dot" />
            LIVE
          </div>
          <div className="last-updated">Updated {lastUpdated}</div>

          {/*  action buttons */}
          <div className="header-actions">
            <button className="btn-icon refresh-btn" onClick={handleRefresh} title="Refresh">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
              </svg>
              Refresh
            </button>
            
            {/*   Export to CSV */}
            <button className="btn-icon export-btn" onClick={handleExportCSV} title="Export CSV">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      {/*  
          2. SUMMARY CARDS
         */}
      <div className="summary-section">
        <div className="summary-grid">

          {/* Total Investment */}
          <div className="summary-card card-invest">
            <span className="card-icon">💼</span>
            <div className="card-label">Total Investment</div>
            <div className="card-value neutral">₹29,875.<span style={{fontSize:"14px",opacity:.7}}>55</span></div>
            <div className="card-sub">Avg. cost basis</div>
          </div>

          {/* Current Value  */}
          <div className="summary-card card-current">
            <span className="card-icon">💰</span>
            <div className="card-label">Current Value</div>
            <div className="card-value neutral">₹31,428.<span style={{fontSize:"14px",opacity:.7}}>95</span></div>
            <div className="card-sub">Market valuation</div>
          </div>

          {/* P&L */}
          <div className="summary-card card-pnl">
            <span className="card-icon">📊</span>
            <div className="card-label">Total P&amp;L</div>
            <div className="card-value profit">₹1,553.40</div>
            <div className="card-badge profit">▲ +5.20%</div>
          </div>

          {/*  Live P&L from fetched data */}
          <div className="summary-card card-day">
            <span className="card-icon">⚡</span>
            <div className="card-label">Live P&amp;L</div>
            <div className={`card-value ${summary.isProfit ? "profit" : "loss"}`}>
              {summary.isProfit ? "+" : ""}₹{fmt(summary.totalPnl)}
            </div>
            <div className={`card-badge ${summary.isProfit ? "profit" : "loss"}`}>
              {summary.isProfit ? "▲" : "▼"} {summary.pnlPct.toFixed(2)}%
            </div>
          </div>

          {/*  Holdings count card */}
          <div className="summary-card card-count">
            <span className="card-icon">🗂</span>
            <div className="card-label">Holdings</div>
            <div className="card-value neutral">{allHoldings.length}</div>
            <div className="card-sub">Active instruments</div>
          </div>

        </div>
      </div>

      {/*  
          3. SEARCH & FILTER BAR 
       */}
      <div className="controls-section">
        {/* Search */}
        <div className="search-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search instrument…"
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
          />
        </div>

        {/* P/L Filter */}
        <select
          className="filter-select"
          value={filterMode}
          onChange={(e) => setFilterMode(e.target.value)}
        >
          <option value="all">All Holdings</option>
          <option value="profit">Profit Only</option>
          <option value="loss">Loss Only</option>
        </select>

        {/* Sort */}
        <select
          className="sort-select"
          value={sortKey}
          onChange={(e) => { setSortKey(e.target.value); setSortDir("asc"); }}
        >
          <option value="name">Sort: Name</option>
          <option value="curval">Sort: Cur. Value</option>
          <option value="pnl">Sort: P&amp;L</option>
          <option value="qty">Sort: Quantity</option>
        </select>

        {/* Live count pill */}
        <div className="holdings-count-pill">
          {displayedHoldings.length} / {allHoldings.length} shown
        </div>
      </div>

      {/*  
          4. PREMIUM HOLDINGS TABLE
          
       */}
      <div className="table-section">
        <div className="table-container">
          <div className="holdings-table-wrapper">
            <table className="holdings-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")}>
                    Instrument <span className="th-sort-icon">{sortIcon("name")}</span>
                  </th>
                  <th onClick={() => handleSort("qty")}>
                    Qty. <span className="th-sort-icon">{sortIcon("qty")}</span>
                  </th>
                  <th>Avg. Cost</th>
                  <th>LTP</th>
                  <th onClick={() => handleSort("curval")}>
                    Cur. Val <span className="th-sort-icon">{sortIcon("curval")}</span>
                  </th>
                  <th onClick={() => handleSort("pnl")}>
                    P&amp;L <span className="th-sort-icon">{sortIcon("pnl")}</span>
                  </th>
                  <th>Net Chg.</th>
                  <th>Day Chg.</th>
                </tr>
              </thead>

              <tbody>
                {/* Loading skeleton */}
                {loading && [1,2,3,4,5].map((i) => <SkeletonRow key={i} />)}

                {/* Empty state */}
                {!loading && displayedHoldings.length === 0 && (
                  <tr>
                    <td colSpan={8}>
                      <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <div>No holdings match your search</div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* DATA ROWS   */}
                {!loading && displayedHoldings.map((stock, index) => {
                 
                  const curValue = stock.price * stock.qty;
                  const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                  const profClass = isProfit ? "profit" : "loss";
                  const dayClass  = stock.isLoss ? "loss" : "profit";

                  return (
                    <tr key={index}>
                      {/* Instrument */}
                      <td>
                        <div className="stock-name-cell">
                          <div className="stock-avatar">{getInitials(stock.name)}</div>
                          <span className="stock-name-text">{stock.name}</span>
                        </div>
                      </td>

                      <td className="qty-cell">{stock.qty}</td>

                      
                      <td className="price-cell">₹{stock.avg.toFixed(2)}</td>
                      <td className="price-cell">₹{stock.price.toFixed(2)}</td>
                      <td className="price-cell">₹{curValue.toFixed(2)}</td>

                       
                      <td>
                        <span className={`pnl-badge ${profClass}`}>
                          {isProfit ? "▲" : "▼"} ₹{(curValue - stock.avg * stock.qty).toFixed(2)}
                        </span>
                      </td>

                      
                      <td>
                        <span className={`pnl-badge ${profClass}`}>{stock.net}</span>
                      </td>
                      <td>
                        <span className={`pnl-badge ${dayClass}`}>{stock.day}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/*  
          5. PORTFOLIO INSIGHTS — NEW section
        */}
      {!loading && insights && (
        <div className="insights-section">
          <div className="section-heading">Portfolio Insights</div>
          <div className="insights-grid">

            <div className="insight-card best">
              <div className="insight-tag">🏆 Best Performer</div>
              <div className="insight-name">{insights.best.name}</div>
              <div className="insight-value" style={{color:"var(--accent-green)"}}>
                +₹{insights.best.pnl.toFixed(2)}
              </div>
            </div>

            <div className="insight-card worst">
              <div className="insight-tag">📉 Worst Performer</div>
              <div className="insight-name">{insights.worst.name}</div>
              <div className="insight-value" style={{color:"var(--accent-red)"}}>
                ₹{insights.worst.pnl.toFixed(2)}
              </div>
            </div>

            <div className="insight-card largest">
              <div className="insight-tag">💎 Largest Holding</div>
              <div className="insight-name">{insights.largest.name}</div>
              <div className="insight-value" style={{color:"var(--accent-cyan)"}}>
                ₹{fmt(insights.largest.curValue)}
              </div>
            </div>

            <div className="insight-card total">
              <div className="insight-tag">📦 Portfolio Value</div>
              <div className="insight-name">Live Market Val.</div>
              <div className="insight-value" style={{color:"var(--accent-purple)"}}>
                ₹{fmt(summary.totalCur)}
              </div>
            </div>

          </div>
        </div>
      )}

      {/*  
          6. ENHANCED GRAPH SECTION
           
       */}
      <div className="graph-section">
        <div className="graph-wrapper">
          <div className="graph-header">
            <div>
              <div className="graph-title">Stock Price Distribution</div>
              <div className="graph-subtitle">Last traded price across all holdings</div>
            </div>
            
            <div className="graph-stats">
              <div className="graph-stat">
                <div className="graph-stat-label">Invested</div>
                <div className="graph-stat-value">₹29,875.55</div>
              </div>
              <div className="graph-stat">
                <div className="graph-stat-label">Current</div>
                <div className="graph-stat-value">₹31,428.95</div>
              </div>
              <div className="graph-stat">
                <div className="graph-stat-label">Returns</div>
                <div className="graph-stat-value profit">+5.20%</div>
              </div>
            </div>
          </div>

          <div className="graph-body">
             
            <VerticalGraph data={data} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Holdings;
