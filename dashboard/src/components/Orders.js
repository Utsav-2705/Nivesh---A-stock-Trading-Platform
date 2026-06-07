
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Orders.css";


const Icon = {
  Orders: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/>
      <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/>
    </svg>
  ),
  Buy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  ),
  Sell: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  ),
  Search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Filter: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  Export: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  TotalOrders: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Value: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Qty: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Avg: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Empty: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Live: () => (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" fill="currentColor"/>
    </svg>
  ),
  ChevronUp: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
};
 
 
function AnimatedNumber({ value, prefix = "", decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
 
  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    const from = 0;
    const to = Number(value) || 0;
 
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
 
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);
 
  return (
    <span>
      {prefix}
      {display.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
 
 
function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      {[40, 20, 30, 20].map((w, i) => (
        <td key={i}>
          <div className="skeleton-cell" style={{ width: `${w}%` }} />
        </td>
      ))}
    </tr>
  );
}
 
 
function exportToCSV(data) {
  const headers = ["Stock", "Qty", "Price (₹)", "Type"];
  const rows = data.map((o) => [o.name, o.qty, o.price, o.mode]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orders_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
  
const Orders = () => {
 
  const [orders, setOrders] = useState([]);
 
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");    // "all" | "buy" | "sell"
  const [sortKey, setSortKey] = useState(null);   // "name"|"qty"|"price"|"mode"
  const [sortDir, setSortDir] = useState("asc");
  const [refreshing, setRefreshing] = useState(false);
 
     
  useEffect(() => {
    fetchOrders();
  }, []);
 
    
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://nivesh-a-stock-trading-platform.onrender.com/orders"); // ← ORIGINAL API CALL
      setOrders(response.data);                                          // ← ORIGINAL SET
    } catch (error) {
      console.log(error);                                                // ← ORIGINAL ERROR LOG
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
 
   // Manual refresh 
  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };
 
  // sort toggle
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  
  const visible = orders
    .filter((o) => {
      const matchSearch = o.name?.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ||
        (filter === "buy"  && o.mode?.toLowerCase() === "buy") ||
        (filter === "sell" && o.mode?.toLowerCase() === "sell");
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      let av = a[sortKey], bv = b[sortKey];
      if (sortKey === "qty" || sortKey === "price") { av = +av; bv = +bv; }
      else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ?  1 : -1;
      return 0;
    });
 

  const buyOrders   = orders.filter((o) => o.mode?.toLowerCase() === "buy");
  const sellOrders  = orders.filter((o) => o.mode?.toLowerCase() === "sell");
  const totalValue  = orders.reduce((s, o) => s + (+o.price || 0) * (+o.qty || 0), 0);
  const totalQty    = orders.reduce((s, o) => s + (+o.qty  || 0), 0);
  const avgPrice    = orders.length ? orders.reduce((s, o) => s + (+o.price || 0), 0) / orders.length : 0;
  
  const SortIcon = ({ col }) =>
    sortKey === col
      ? sortDir === "asc" ? <Icon.ChevronUp /> : <Icon.ChevronDown />
      : <span className="sort-neutral">⇅</span>;
 
  
  return (
    <div className="ord-root">
 
      {/* ── Page Header ── */}
      <div className="ord-header">
        <div className="ord-header-left">
          <div className="ord-header-icon"><Icon.Orders /></div>
          <div>
            <h3 className="ord-title">My Orders</h3>
            <p className="ord-subtitle">Order book · live positions</p>
          </div>
        </div>
        <div className="ord-header-right">
          <span className="ord-live-badge"><Icon.Live /> LIVE</span>
          {/* refresh button */}
          <button
            className={`ord-btn ord-btn-ghost ${refreshing ? "spinning" : ""}`}
            onClick={handleRefresh}
            title="Refresh orders"
          >
            <Icon.Refresh /> Refresh
          </button>
          {/* export button */}
          <button
            className="ord-btn ord-btn-ghost"
            onClick={() => exportToCSV(visible)}
            title="Export visible orders as CSV"
          >
            <Icon.Export /> Export
          </button>
        </div>
      </div>
 
      {/* Summary stat cards */}
      <div className="ord-stats-grid">
        <div className="ord-stat-card">
          <div className="ord-stat-icon ord-stat-icon-blue"><Icon.TotalOrders /></div>
          <div className="ord-stat-body">
            <span className="ord-stat-label">Total Orders</span>
            <span className="ord-stat-value">
              <AnimatedNumber value={orders.length} />
            </span>
          </div>
        </div>
        <div className="ord-stat-card">
          <div className="ord-stat-icon ord-stat-icon-green"><Icon.Buy /></div>
          <div className="ord-stat-body">
            <span className="ord-stat-label">Buy Orders</span>
            <span className="ord-stat-value ord-stat-green">
              <AnimatedNumber value={buyOrders.length} />
            </span>
          </div>
        </div>
        <div className="ord-stat-card">
          <div className="ord-stat-icon ord-stat-icon-red"><Icon.Sell /></div>
          <div className="ord-stat-body">
            <span className="ord-stat-label">Sell Orders</span>
            <span className="ord-stat-value ord-stat-red">
              <AnimatedNumber value={sellOrders.length} />
            </span>
          </div>
        </div>
        <div className="ord-stat-card">
          <div className="ord-stat-icon ord-stat-icon-amber"><Icon.Value /></div>
          <div className="ord-stat-body">
            <span className="ord-stat-label">Total Value</span>
            <span className="ord-stat-value">
              <AnimatedNumber value={totalValue} prefix="₹" decimals={0} />
            </span>
          </div>
        </div>
      </div>
 
      {/*  Secondary stats bar  */}
      <div className="ord-secondary-stats">
        <div className="ord-sec-stat">
          <div className="ord-sec-icon"><Icon.Qty /></div>
          <div>
            <div className="ord-sec-label">Total Quantity</div>
            <div className="ord-sec-value">
              <AnimatedNumber value={totalQty} />
            </div>
          </div>
        </div>
        <div className="ord-sec-divider" />
        <div className="ord-sec-stat">
          <div className="ord-sec-icon"><Icon.Avg /></div>
          <div>
            <div className="ord-sec-label">Avg Order Price</div>
            <div className="ord-sec-value">
              <AnimatedNumber value={avgPrice} prefix="₹" decimals={2} />
            </div>
          </div>
        </div>
        <div className="ord-sec-divider" />
        <div className="ord-sec-stat">
          <div className="ord-sec-icon"><Icon.Value /></div>
          <div>
            <div className="ord-sec-label">Total Invested</div>
            <div className="ord-sec-value">
              <AnimatedNumber value={totalValue} prefix="₹" decimals={0} />
            </div>
          </div>
        </div>
      </div>
 
      
      <div className="ord-toolbar">
        <div className="ord-search-wrap">
          <span className="ord-search-icon"><Icon.Search /></span>
          <input
            className="ord-search"
            type="text"
            placeholder="Search by stock name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="ord-search-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>
        <div className="ord-filter-wrap">
          <span className="ord-filter-icon"><Icon.Filter /></span>
          <select
            className="ord-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="buy">Buy Orders</option>
            <option value="sell">Sell Orders</option>
          </select>
        </div>
        <span className="ord-result-count">
          {visible.length} result{visible.length !== 1 ? "s" : ""}
        </span>
      </div>
 
      {/* ── Table card ── */}
      <div className="ord-table-card">
        <div className="ord-table-scroll">
          <table className="ord-table">
            <thead>
              <tr>
                {[
                  { key: "name",  label: "Stock" },
                  { key: "qty",   label: "Qty"   },
                  { key: "price", label: "Price" },
                  { key: "mode",  label: "Type"  },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    className="ord-th sortable"
                    onClick={() => handleSort(key)}
                  >
                    {label} <SortIcon col={key} />
                  </th>
                ))}
              </tr>
            </thead>
 
            <tbody>
              {/* loading skeleton */}
              {loading &&
                Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
              }
 
              {/*  empty state */}
              {!loading && visible.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="ord-empty">
                      <div className="ord-empty-icon"><Icon.Empty /></div>
                      <p className="ord-empty-title">
                        {orders.length === 0 ? "No orders found" : "No matching orders"}
                      </p>
                      <p className="ord-empty-sub">
                        {orders.length === 0
                          ? "Your order book is empty. Place a trade to get started."
                          : "Try adjusting your search or filter."}
                      </p>
                      {orders.length === 0 && (
                        <button className="ord-btn ord-btn-primary" onClick={handleRefresh}>
                          <Icon.Refresh /> Retry
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
 
              
              {!loading &&
                visible.map((order, idx) => {
                  const isBuy  = order.mode?.toLowerCase() === "buy";
                  const isSell = order.mode?.toLowerCase() === "sell";
                  return (
                    <tr key={order._id} className={`ord-tr ${idx % 2 === 0 ? "ord-tr-even" : ""}`}>
                   

                      <td className="ord-td ord-td-name">
                        <div className="ord-stock-wrap">
                          <div className={`ord-stock-dot ${isBuy ? "dot-buy" : "dot-sell"}`} />
                          <span className="ord-stock-name">{order.name}</span>
                        </div>
                      </td>
 
                    
                      <td className="ord-td ord-td-mono">{order.qty}</td>
 
                       
                      <td className="ord-td ord-td-mono ord-td-price">
                        ₹{Number(order.price).toLocaleString("en-IN")}
                      </td>
 
                       
                      <td className="ord-td">
                        <span className={`ord-badge ${isBuy ? "badge-buy" : isSell ? "badge-sell" : "badge-other"}`}>
                          {isBuy  ? <Icon.Buy  /> : <Icon.Sell />}
                          {order.mode?.toUpperCase()}
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
  );
};
 
export default Orders;