import React, { useState, useEffect } from "react";
import stocks from "../../data/stocks";

function PaperTrading() {
 const [balance, setBalance] = useState(
  Number(localStorage.getItem("balance")) || 100000
);

const [portfolio, setPortfolio] = useState(
  JSON.parse(localStorage.getItem("portfolio")) || []
);
 const [quantities, setQuantities] = useState({});
const [invested, setInvested] = useState(
  Number(localStorage.getItem("invested")) || 0
);

  const handleQtyChange = (symbol, value) => {
    setQuantities({
      ...quantities,
      [symbol]: value,
    });
  };

  const handleBuy = (stock) => {
    const qty = parseInt(quantities[stock.symbol]) || 0;

    if (qty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    const totalCost = stock.price * qty;

    if (totalCost > balance) {
      alert("Insufficient Balance");
      return;
    }
 
 
    setBalance(balance - totalCost);
    setInvested(invested + totalCost);

    setPortfolio([
      ...portfolio,
      {
        symbol: stock.symbol,
        qty,
        price: stock.price,
      },
    ]);

    alert(
      `${qty} shares of ${stock.symbol} purchased successfully`
    );
  };
  const handleSell = (index) => {
  const stock = portfolio[index];

  const refund = stock.qty * stock.price;

  setBalance(balance + refund);
  setInvested(invested - refund);

  const updatedPortfolio = [...portfolio];
  updatedPortfolio.splice(index, 1);

  setPortfolio(updatedPortfolio);
};
useEffect(() => {
  localStorage.setItem("balance", balance);
}, [balance]);

useEffect(() => {
  localStorage.setItem(
    "portfolio",
    JSON.stringify(portfolio)
  );
}, [portfolio]);

useEffect(() => {
  localStorage.setItem("invested", invested);
}, [invested]);

  
 return (
  <div style={{ minHeight: "100vh", background: "#090e1a", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#e2e8f0" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      /* ── SCROLLBAR ── */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #111827; }
      ::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }

      /* ── NAVBAR ── */
      .t-nav {
        position: sticky; top: 0; z-index: 100;
        background: rgba(9,14,26,0.92);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(255,255,255,0.06);
        padding: 0 24px;
        height: 62px;
        display: flex; align-items: center; justify-content: space-between;
      }
      .t-logo { font-size: 18px; font-weight: 800; color: #f1f5f9; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px; }
      .t-logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; animation: pulseDot 2s infinite; }
      @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
      .t-search {
        flex: 1; max-width: 320px; margin: 0 32px;
        background: #111827; border: 1px solid rgba(255,255,255,0.08);
        border-radius: 10px; padding: 8px 14px;
        display: flex; align-items: center; gap: 8px;
        transition: border-color .2s;
      }
      .t-search:focus-within { border-color: rgba(99,179,237,.4); }
      .t-search input { background: transparent; border: none; outline: none; color: #e2e8f0; font-size: 13px; font-family: inherit; width: 100%; }
      .t-search input::placeholder { color: #6b7280; }
      .t-nav-right { display: flex; align-items: center; gap: 12px; }
      .t-bal-chip { background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.25); color: #34d399; border-radius: 8px; padding: 6px 14px; font-size: 13px; font-weight: 600; font-family: 'DM Mono',monospace; }
      .t-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); display:flex;align-items:center;justify-content:center; font-size:13px;font-weight:700;color:white; cursor:pointer; }
      .t-notif { width: 34px; height: 34px; border-radius: 9px; background: #111827; border: 1px solid rgba(255,255,255,.08); display:flex;align-items:center;justify-content:center; cursor:pointer; position:relative; transition: border-color .2s; }
      .t-notif:hover { border-color: rgba(255,255,255,.2); }
      .t-notif-dot { position:absolute;top:6px;right:6px;width:6px;height:6px;border-radius:50%;background:#f59e0b;border:1.5px solid #090e1a; }

      /* ── SUMMARY CARDS ── */
      .s-card { border-radius: 18px; padding: 24px 22px; border: 1px solid rgba(255,255,255,0.06); position:relative; overflow:hidden; transition: transform .2s, box-shadow .2s; cursor:default; }
      .s-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,.5); }
      .s-card-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; opacity: .6; margin-bottom: 10px; }
      .s-card-val { font-family: 'DM Mono',monospace; font-size: 26px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 8px; }
      .s-card-sub { font-size: 12px; display:flex;align-items:center;gap:4px; }
      .pill-up { background:rgba(16,185,129,.15);color:#34d399;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:600; }
      .pill-dn { background:rgba(239,68,68,.15);color:#f87171;border-radius:6px;padding:2px 8px;font-size:11px;font-weight:600; }

      /* ── SECTION HEADING ── */
      .sec-hd { font-size: 15px; font-weight: 700; color: #f1f5f9; letter-spacing: -.2px; margin-bottom: 18px; display:flex;align-items:center;justify-content:space-between; }
      .sec-hd-link { font-size: 12px; font-weight: 500; color: #6b7280; cursor:pointer; transition:color .2s; }
      .sec-hd-link:hover { color: #93c5fd; }

      /* ── PANEL ── */
      .t-panel { background: #0f1623; border: 1px solid rgba(255,255,255,.07); border-radius: 20px; padding: 24px; }

      /* ── WATCHLIST TABLE ── */
      .wl-table { width:100%;border-collapse:collapse; }
      .wl-table thead th { font-size:10px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:#6b7280;padding:0 10px 12px; text-align:left; }
      .wl-table thead th:last-child,.wl-table tbody td:last-child { text-align:right; }
      .wl-table thead th:nth-child(3),.wl-table tbody td:nth-child(3) { text-align:right; }
      .wl-table thead th:nth-child(4),.wl-table tbody td:nth-child(4) { text-align:right; }
      .wl-tr { border-top:1px solid rgba(255,255,255,.04); transition: background .15s; cursor:pointer; }
      .wl-tr:hover { background: rgba(255,255,255,.03); }
      .wl-tr td { padding: 13px 10px; font-size: 13px; }
      .wl-sym { font-weight:700;color:#f1f5f9;font-size:13px; }
      .wl-name { font-size:11px;color:#6b7280;margin-top:2px; }
      .wl-price { font-family:'DM Mono',monospace;font-weight:600;color:#e2e8f0; }
      .wl-up { color:#34d399;font-size:12px;font-weight:600;font-family:'DM Mono',monospace; }
      .wl-dn { color:#f87171;font-size:12px;font-weight:600;font-family:'DM Mono',monospace; }
      .wl-vol { color:#9ca3af;font-size:12px;font-family:'DM Mono',monospace; }
      .wl-btns { display:flex;gap:6px;justify-content:flex-end; }
      .btn-buy-sm { background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.25);color:#34d399;border-radius:7px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s; }
      .btn-buy-sm:hover { background:rgba(16,185,129,.25);border-color:rgba(16,185,129,.5); }
      .btn-sell-sm { background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#f87171;border-radius:7px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s; }
      .btn-sell-sm:hover { background:rgba(239,68,68,.2);border-color:rgba(239,68,68,.45); }

      /* ── TRADING PANEL ── */
      .trade-tabs { display:flex;gap:4px;background:#0a0f1e;border-radius:10px;padding:4px;margin-bottom:20px; }
      .t-tab { flex:1;padding:9px;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer;text-align:center;transition:all .2s;border:none; }
      .t-tab-buy { background:linear-gradient(135deg,#059669,#10b981);color:white; }
      .t-tab-sell { background:transparent;color:#6b7280; }
      .t-tab-sell:hover { color:#f87171; }
      .trade-label { font-size:11px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;color:#6b7280;margin-bottom:7px; }
      .trade-input { width:100%;background:#0a0f1e;border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e2e8f0;padding:11px 14px;font-size:14px;font-family:inherit;outline:none;transition:border-color .2s;margin-bottom:14px; }
      .trade-input:focus { border-color:rgba(99,179,237,.45); }
      .trade-select { width:100%;background:#0a0f1e;border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e2e8f0;padding:11px 14px;font-size:13px;font-family:inherit;outline:none;margin-bottom:14px;cursor:pointer; }
      .trade-summary { background:#0a0f1e;border-radius:10px;padding:14px;margin-bottom:16px; }
      .trade-row { display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:12px; }
      .trade-row:last-child { margin-bottom:0;padding-top:8px;border-top:1px solid rgba(255,255,255,.06); }
      .trade-row-key { color:#6b7280; }
      .trade-row-val { color:#e2e8f0;font-family:'DM Mono',monospace;font-weight:500; }
      .btn-buy-full { width:100%;padding:13px;border-radius:12px;background:linear-gradient(135deg,#059669,#10b981);color:white;font-size:14px;font-weight:700;border:none;cursor:pointer;letter-spacing:.3px;transition:all .2s; }
      .btn-buy-full:hover { transform:translateY(-1px);box-shadow:0 8px 25px rgba(16,185,129,.35); }

      /* ── PORTFOLIO ── */
      .hold-row { padding:14px 0;border-bottom:1px solid rgba(255,255,255,.05); }
      .hold-row:last-child { border-bottom:none; }
      .hold-sym { font-weight:700;color:#f1f5f9;font-size:14px; }
      .hold-name { font-size:11px;color:#6b7280; }
      .hold-qty { font-size:12px;color:#9ca3af; }
      .hold-cur { font-family:'DM Mono',monospace;font-size:14px;font-weight:600;color:#f1f5f9; }
      .hold-pl-up { font-family:'DM Mono',monospace;font-size:12px;color:#34d399;font-weight:600; }
      .hold-pl-dn { font-family:'DM Mono',monospace;font-size:12px;color:#f87171;font-weight:600; }
      .hold-bar { height:3px;border-radius:2px;background:rgba(255,255,255,.08);margin-top:8px;overflow:hidden; }
      .hold-bar-fill { height:100%;border-radius:2px;transition:width .5s ease; }

      /* ── CHART PLACEHOLDER ── */
      .chart-box { background: #0a0f1e; border-radius: 14px; padding: 20px; position:relative;overflow:hidden; }
      .chart-grid-line { position:absolute;left:0;right:0;border-top:1px dashed rgba(255,255,255,.05); }
      .chart-area { position:relative;height:120px;overflow:hidden; }
      .chart-label { font-size:10px;color:#4b5563;margin-top:8px;display:flex;justify-content:space-between; }
      .chart-type-tabs { display:flex;gap:6px;margin-bottom:16px; }
      .ct-tab { padding:4px 12px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s; }
      .ct-tab-active { background:rgba(99,179,237,.15);color:#93c5fd;border:1px solid rgba(99,179,237,.25); }
      .ct-tab-inactive { background:transparent;color:#6b7280;border:1px solid transparent; }

      /* ── TRANSACTIONS ── */
      .tx-row { display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.05); }
      .tx-row:last-child { border-bottom:none; }
      .tx-icon { width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0; }
      .tx-icon-buy { background:rgba(16,185,129,.12); }
      .tx-icon-sell { background:rgba(239,68,68,.12); }
      .tx-sym { font-weight:700;color:#f1f5f9;font-size:13px; }
      .tx-detail { font-size:11px;color:#6b7280;margin-top:2px; }
      .tx-amt-up { font-family:'DM Mono',monospace;font-size:13px;font-weight:600;color:#34d399; }
      .tx-amt-dn { font-family:'DM Mono',monospace;font-size:13px;font-weight:600;color:#f87171; }
      .tx-date { font-size:11px;color:#4b5563;margin-top:2px;text-align:right; }
      .tx-badge-buy { background:rgba(16,185,129,.1);color:#34d399;border-radius:5px;padding:2px 7px;font-size:10px;font-weight:700; }
      .tx-badge-sell { background:rgba(239,68,68,.1);color:#f87171;border-radius:5px;padding:2px 7px;font-size:10px;font-weight:700; }

      /* ── FOOTER ── */
      .t-footer { background:#0a0f1e;border-top:1px solid rgba(255,255,255,.06);padding:20px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-top:40px; }
      .t-footer-brand { font-size:14px;font-weight:700;color:#f1f5f9; }
      .t-footer-links { display:flex;gap:20px; }
      .t-footer-link { font-size:12px;color:#6b7280;cursor:pointer;transition:color .2s; }
      .t-footer-link:hover { color:#93c5fd; }
      .t-footer-note { font-size:11px;color:#374151; }

      @media (max-width: 768px) {
        .t-search { display:none; }
        .t-nav { padding:0 16px; }
        .t-panel { padding:18px 14px; }
        .s-card-val { font-size:20px; }
      }
    `}</style>

    {/* ── NAVBAR ── */}
    <nav className="t-nav">
      <div className="t-logo">
        <div className="t-logo-dot" />
        Nivesh
        <span style={{ fontSize: 11, fontWeight: 500, color: "#6b7280", marginLeft: 4 }}>PRO</span>
      </div>
      <div className="t-search">
        <svg width="14" height="14" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input placeholder="Search stocks, ETFs, indices..." />
      </div>
      <div className="t-nav-right">
        <div className="t-bal-chip">₹1,00,000</div>
        <div className="t-notif">
          <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <div className="t-notif-dot" />
        </div>
        <div className="t-avatar">RK</div>
      </div>
    </nav>

    {/* ── MAIN BODY ── */}
    <div className="container-fluid" style={{ maxWidth: 1440, padding: "28px 20px" }}>

      {/* ── HERO SUMMARY CARDS ── */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="s-card" style={{ background: "linear-gradient(135deg,#0d2818,#0a1f14)", borderColor: "rgba(16,185,129,.15)" }}>
            <div className="s-card-label" style={{ color: "#34d399" }}>Total Balance</div>
            <div className="s-card-val" style={{ color: "#f1f5f9" }}>₹1,12,480</div>
            <div className="s-card-sub"><span className="pill-up">+12.48%</span><span style={{ color: "#6b7280", fontSize: 11 }}>all time</span></div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="s-card" style={{ background: "linear-gradient(135deg,#0d2818,#0a1f14)", borderColor: "rgba(16,185,129,.15)" }}>
            <div className="s-card-label" style={{ color: "#34d399" }}>Net Profit / Loss</div>
            <div className="s-card-val" style={{ color: "#34d399" }}>+₹12,480</div>
            <div className="s-card-sub"><span className="pill-up">+₹840</span><span style={{ color: "#6b7280", fontSize: 11 }}>today</span></div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="s-card" style={{ background: "linear-gradient(135deg,#1a1040,#130d35)", borderColor: "rgba(139,92,246,.15)" }}>
            <div className="s-card-label" style={{ color: "#a78bfa" }}>Invested Amount</div>
            <div className="s-card-val" style={{ color: "#f1f5f9" }}>₹87,520</div>
            <div className="s-card-sub"><span style={{ color: "#6b7280", fontSize: 11 }}>across 6 holdings</span></div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="s-card" style={{ background: "linear-gradient(135deg,#2a1010,#1e0d0d)", borderColor: "rgba(239,68,68,.15)" }}>
            <div className="s-card-label" style={{ color: "#f87171" }}>Today's Change</div>
            <div className="s-card-val" style={{ color: "#f87171" }}>-₹320</div>
            <div className="s-card-sub"><span className="pill-dn">-0.28%</span><span style={{ color: "#6b7280", fontSize: 11 }}>vs yesterday</span></div>
          </div>
        </div>
      </div>

      {/* ── MAIN 3-COLUMN LAYOUT ── */}
      <div className="row g-4">

        {/* ── LEFT: WATCHLIST + CHART ── */}
        <div className="col-12 col-xl-5">

          {/* Watchlist */}
          <div className="t-panel mb-4">
            <div className="sec-hd">
              Market Watchlist
              <span className="sec-hd-link">Edit list →</span>
            </div>
            <table className="wl-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>LTP</th>
                  <th>Chg %</th>
                  <th>Volume</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sym: "RELIANCE", name: "Reliance Ind.", price: "2,847.50", chg: "+1.24%", vol: "4.2M", up: true },
                  { sym: "TCS", name: "Tata Consultancy", price: "3,921.80", chg: "+0.87%", vol: "2.1M", up: true },
                  { sym: "HDFCBANK", name: "HDFC Bank", price: "1,654.35", chg: "-0.43%", vol: "6.7M", up: false },
                  { sym: "INFY", name: "Infosys Ltd.", price: "1,478.60", chg: "+2.31%", vol: "3.4M", up: true },
                  { sym: "WIPRO", name: "Wipro Ltd.", price: "512.40", chg: "-1.09%", vol: "5.1M", up: false },
                  { sym: "BAJFINANCE", name: "Bajaj Finance", price: "7,234.00", chg: "+0.52%", vol: "1.8M", up: true },
                ].map((s) => (
                  <tr className="wl-tr" key={s.sym}>
                    <td>
                      <div className="wl-sym">{s.sym}</div>
                      <div className="wl-name">{s.name}</div>
                    </td>
                    <td><span className="wl-price">₹{s.price}</span></td>
                    <td><span className={s.up ? "wl-up" : "wl-dn"}>{s.chg}</span></td>
                    <td><span className="wl-vol">{s.vol}</span></td>
                    <td>
                      <div className="wl-btns">
                        <button className="btn-buy-sm">B</button>
                        <button className="btn-sell-sm">S</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart Placeholder */}
          <div className="t-panel">
            <div className="sec-hd">
              RELIANCE · NSE
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 20, fontWeight: 700, fontFamily: "'DM Mono',monospace", color: "#f1f5f9" }}>₹2,847.50</span>
                <span className="pill-up">+1.24%</span>
              </div>
            </div>
            <div className="chart-type-tabs">
              {["1D","1W","1M","3M","1Y"].map((t, i) => (
                <span key={t} className={`ct-tab ${i === 0 ? "ct-tab-active" : "ct-tab-inactive"}`}>{t}</span>
              ))}
            </div>
            <div className="chart-box">
              <div className="chart-area">
                <div className="chart-grid-line" style={{ top: "25%" }} />
                <div className="chart-grid-line" style={{ top: "50%" }} />
                <div className="chart-grid-line" style={{ top: "75%" }} />
                <svg width="100%" height="120" viewBox="0 0 600 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,90 C30,85 60,70 90,72 C120,74 150,50 180,45 C210,40 240,60 270,55 C300,50 330,30 360,28 C390,26 420,40 450,35 C480,30 510,20 540,18 C560,16 580,22 600,20 L600,120 L0,120 Z" fill="url(#chartGrad)" />
                  <path d="M0,90 C30,85 60,70 90,72 C120,74 150,50 180,45 C210,40 240,60 270,55 C300,50 330,30 360,28 C390,26 420,40 450,35 C480,30 510,20 540,18 C560,16 580,22 600,20" fill="none" stroke="#10b981" strokeWidth="2" />
                  <circle cx="600" cy="20" r="4" fill="#10b981" />
                </svg>
              </div>
              <div className="chart-label">
                {["9:15","10:30","11:45","1:00","2:15","3:30"].map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* ── MIDDLE: TRADING PANEL + TRANSACTIONS ── */}
        <div className="col-12 col-md-6 col-xl-4">

          {/* Trading Panel */}
          <div className="t-panel mb-4">
            <div className="sec-hd" style={{ marginBottom: 14 }}>Place Order</div>
            <div className="trade-tabs">
              <button className="t-tab t-tab-buy">Buy</button>
              <button className="t-tab t-tab-sell" style={{ background: "transparent", color: "#6b7280", border: "none" }}>Sell</button>
            </div>
            <div>
              <div className="trade-label">Stock</div>
              <select className="trade-select">
                <option>RELIANCE · NSE</option>
                <option>TCS · NSE</option>
                <option>HDFCBANK · NSE</option>
                <option>INFY · NSE</option>
                <option>WIPRO · NSE</option>
              </select>
            </div>
            <div>
              <div className="trade-label">Order Type</div>
              <select className="trade-select">
                <option>Market Order</option>
                <option>Limit Order</option>
                <option>Stop Loss</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div className="trade-label">Quantity</div>
                <input className="trade-input" type="number" defaultValue="10" min="1" placeholder="Qty" />
              </div>
              <div>
                <div className="trade-label">Price (₹)</div>
                <input className="trade-input" type="number" defaultValue="2847.50" placeholder="Price" />
              </div>
            </div>
            <div className="trade-summary">
              <div className="trade-row">
                <span className="trade-row-key">Market Price</span>
                <span className="trade-row-val">₹2,847.50</span>
              </div>
              <div className="trade-row">
                <span className="trade-row-key">Quantity</span>
                <span className="trade-row-val">10 shares</span>
              </div>
              <div className="trade-row">
                <span className="trade-row-key">Brokerage</span>
                <span className="trade-row-val">₹0.00</span>
              </div>
              <div className="trade-row">
                <span className="trade-row-key" style={{ fontWeight: 700, color: "#e2e8f0" }}>Total Value</span>
                <span className="trade-row-val" style={{ color: "#34d399", fontWeight: 700 }}>₹28,475.00</span>
              </div>
            </div>
            <button className="btn-buy-full">Place Buy Order 🚀</button>
            <div style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "#4b5563" }}>Paper trading — no real money involved</div>
          </div>

          {/* Recent Transactions */}
          <div className="t-panel">
            <div className="sec-hd">Recent Transactions<span className="sec-hd-link">View all →</span></div>
            {[
              { type: "buy", sym: "TCS", detail: "5 shares @ ₹3,921.80", amt: "₹19,609", date: "Today, 2:14 PM" },
              { type: "sell", sym: "WIPRO", detail: "20 shares @ ₹521.00", amt: "₹10,420", date: "Today, 11:32 AM" },
              { type: "buy", sym: "INFY", detail: "8 shares @ ₹1,478.60", amt: "₹11,829", date: "Yesterday" },
              { type: "sell", sym: "HDFCBANK", detail: "3 shares @ ₹1,670.00", amt: "₹5,010", date: "Jun 28" },
              { type: "buy", sym: "RELIANCE", detail: "12 shares @ ₹2,810.00", amt: "₹33,720", date: "Jun 27" },
            ].map((tx, i) => (
              <div className="tx-row" key={i}>
                <div className={`tx-icon ${tx.type === "buy" ? "tx-icon-buy" : "tx-icon-sell"}`}>
                  {tx.type === "buy"
                    ? <svg width="16" height="16" fill="none" stroke="#34d399" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                    : <svg width="16" height="16" fill="none" stroke="#f87171" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="tx-sym">{tx.sym}</span>
                    <span className={tx.type === "buy" ? "tx-badge-buy" : "tx-badge-sell"}>{tx.type.toUpperCase()}</span>
                  </div>
                  <div className="tx-detail">{tx.detail}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div className={tx.type === "buy" ? "tx-amt-dn" : "tx-amt-up"}>
                    {tx.type === "buy" ? "-" : "+"}{tx.amt}
                  </div>
                  <div className="tx-date">{tx.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: PORTFOLIO ── */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="t-panel" style={{ minHeight: 600 }}>
            <div className="sec-hd">
              Portfolio
              <span className="sec-hd-link">6 holdings</span>
            </div>

            {/* Overall P&L Summary */}
            <div style={{ background: "#0a0f1e", borderRadius: 12, padding: "14px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#6b7280", marginBottom: 5 }}>Current Value</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 600, color: "#f1f5f9" }}>₹87,520</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#6b7280", marginBottom: 5 }}>Total P&L</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, fontWeight: 600, color: "#34d399" }}>+₹12,480</div>
              </div>
            </div>

            {[
              { sym: "RELIANCE", name: "Reliance Ind.", qty: 12, avg: 2810, cur: 2847.5, pct: 74, up: true },
              { sym: "TCS", name: "Tata Consultancy", qty: 5, avg: 3900, cur: 3921.8, pct: 62, up: true },
              { sym: "INFY", name: "Infosys Ltd.", qty: 8, avg: 1500, cur: 1478.6, pct: 52, up: false },
              { sym: "BAJFINANCE", name: "Bajaj Finance", qty: 2, avg: 7000, cur: 7234, pct: 88, up: true },
              { sym: "WIPRO", name: "Wipro Ltd.", qty: 15, avg: 540, cur: 512.4, pct: 32, up: false },
              { sym: "HDFCBANK", name: "HDFC Bank", qty: 10, avg: 1680, cur: 1654.35, pct: 45, up: false },
            ].map((h) => {
              const invested = h.qty * h.avg;
              const current = h.qty * h.cur;
              const pl = current - invested;
              const plPct = ((pl / invested) * 100).toFixed(2);
              return (
                <div className="hold-row" key={h.sym}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="hold-sym">{h.sym}</div>
                      <div className="hold-name">{h.name}</div>
                      <div className="hold-qty" style={{ marginTop: 3 }}>{h.qty} shares · Avg ₹{h.avg.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="hold-cur">₹{h.cur.toLocaleString()}</div>
                      <div className={h.up ? "hold-pl-up" : "hold-pl-dn"}>
                        {h.up ? "+" : ""}{pl.toFixed(0)} ({plPct}%)
                      </div>
                    </div>
                  </div>
                  <div className="hold-bar">
                    <div className="hold-bar-fill" style={{ width: `${h.pct}%`, background: h.up ? "linear-gradient(90deg,#059669,#10b981)" : "linear-gradient(90deg,#dc2626,#ef4444)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>

    {/* ── FOOTER ── */}
    <div className="t-footer">
      <div>
        <div className="t-footer-brand">📈 Nivesh Paper Trading</div>
        <div className="t-footer-note" style={{ marginTop: 4 }}>All data is simulated. No real money involved.</div>
      </div>
      <div className="t-footer-links">
        {["Help", "Terms", "Privacy", "About"].map(l => <span className="t-footer-link" key={l}>{l}</span>)}
      </div>
      <div className="t-footer-note">© 2026 Nivesh. Paper Trading Platform.</div>
    </div>

  </div>
);
}

export default PaperTrading;