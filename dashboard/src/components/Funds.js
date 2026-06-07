 
 import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .funds-root {
    background: #081b33;
    min-height: 100vh;
    font-family: 'Space Grotesk', sans-serif;
    color: #e2eaf4;
    padding: 28px 32px 48px;
    background-image:
      radial-gradient(ellipse 80% 40% at 20% -10%, rgba(0, 149, 255, 0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 30% at 80% 100%, rgba(0, 212, 120, 0.04) 0%, transparent 60%);
  }

  /* ── Page Header ── */
  .funds-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .funds-header-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .funds-header-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #0095ff22, #0095ff11);
    border: 1px solid #0095ff33;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .funds-header-icon svg {
    width: 20px;
    height: 20px;
    color: #0095ff;
  }

  .funds-title {
    font-size: 22px;
    font-weight: 600;
    color: #e2eaf4;
    letter-spacing: -0.3px;
  }

  .funds-subtitle {
    font-size: 12px;
    color: #5a7a9a;
    margin-top: 2px;
    font-weight: 400;
  }

  .live-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #0d2a14;
    border: 1px solid #1a4d2033;
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 500;
    color: #00d478;
    letter-spacing: 0.5px;
    font-family: 'JetBrains Mono', monospace;
  }

  .live-dot {
    width: 6px;
    height: 6px;
    background: #00d478;
    border-radius: 50%;
    animation: pulse-green 2s ease-in-out infinite;
  }

  @keyframes pulse-green {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }

  /* ── Balance Hero Card ── */
  .balance-card {
    background: linear-gradient(135deg, #0d2340 0%, #0a1e35 50%, #081829 100%);
    border: 1px solid #1a3a5c;
    border-radius: 16px;
    padding: 28px 32px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease;
  }

  .balance-card::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -60px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(0, 149, 255, 0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .balance-card::after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 30%;
    width: 300px;
    height: 100px;
    background: radial-gradient(ellipse, rgba(0, 212, 120, 0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  .balance-card:hover {
    border-color: #0095ff44;
  }

  .balance-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }

  .balance-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #5a7a9a;
    font-weight: 500;
    margin-bottom: 8px;
    font-family: 'JetBrains Mono', monospace;
  }

  .balance-amount {
    font-size: 42px;
    font-weight: 600;
    color: #e2eaf4;
    letter-spacing: -1.5px;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1;
  }

  .balance-amount .currency {
    font-size: 24px;
    color: #7a9ab8;
    font-weight: 400;
    margin-right: 4px;
    vertical-align: middle;
    font-family: 'Space Grotesk', sans-serif;
  }

  .balance-change {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #00d478;
    background: rgba(0, 212, 120, 0.08);
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid rgba(0, 212, 120, 0.15);
  }

  .balance-actions {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 22px;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    letter-spacing: 0.2px;
    position: relative;
    overflow: hidden;
  }

  .btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background 0.2s ease;
  }

  .btn:hover::after {
    background: rgba(255,255,255,0.06);
  }

  .btn:active {
    transform: scale(0.97);
  }

  .btn-add {
    background: linear-gradient(135deg, #00b85c, #00963c);
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(0, 184, 92, 0.25);
  }

  .btn-add:hover {
    box-shadow: 0 6px 22px rgba(0, 184, 92, 0.4);
    transform: translateY(-1px);
  }

  .btn-withdraw {
    background: linear-gradient(135deg, #e84040, #c02020);
    color: #ffffff;
    box-shadow: 0 4px 16px rgba(232, 64, 64, 0.25);
  }

  .btn-withdraw:hover {
    box-shadow: 0 6px 22px rgba(232, 64, 64, 0.4);
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: rgba(255,255,255,0.04);
    border: 1px solid #1e3d5e;
    color: #7a9ab8;
  }

  .btn-secondary:hover {
    border-color: #0095ff55;
    color: #e2eaf4;
  }

  /* ── Balance Divider Stats ── */
  .balance-stats {
    display: flex;
    gap: 0;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #0f2a42;
  }

  .balance-stat {
    flex: 1;
    padding: 0 20px;
    border-right: 1px solid #0f2a42;
  }

  .balance-stat:first-child {
    padding-left: 0;
  }

  .balance-stat:last-child {
    border-right: none;
  }

  .balance-stat-label {
    font-size: 11px;
    color: #4a6a87;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 4px;
  }

  .balance-stat-value {
    font-size: 14px;
    font-weight: 600;
    color: #b0cce6;
    font-family: 'JetBrains Mono', monospace;
  }

  /* ── Two-Card Grid ── */
  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  @media (max-width: 720px) {
    .cards-grid {
      grid-template-columns: 1fr;
    }
    .balance-top {
      flex-direction: column;
    }
    .balance-amount {
      font-size: 34px;
    }
    .funds-root {
      padding: 20px 16px 40px;
    }
    .balance-stats {
      flex-wrap: wrap;
      gap: 16px;
    }
    .balance-stat {
      flex: 0 0 calc(50% - 8px);
      border-right: none;
      padding: 0;
    }
  }

  .info-card {
    background: #0a1e35;
    border: 1px solid #112d47;
    border-radius: 14px;
    padding: 22px 24px;
    transition: border-color 0.3s ease, transform 0.2s ease;
  }

  .info-card:hover {
    border-color: #1a4a70;
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .card-title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .card-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-icon-blue {
    background: rgba(0, 149, 255, 0.1);
    border: 1px solid rgba(0, 149, 255, 0.2);
    color: #0095ff;
  }

  .card-icon-green {
    background: rgba(0, 212, 120, 0.1);
    border: 1px solid rgba(0, 212, 120, 0.2);
    color: #00d478;
  }

  .card-title {
    font-size: 13px;
    font-weight: 600;
    color: #a8c4de;
    letter-spacing: 0.2px;
  }

  .card-badge {
    font-size: 10px;
    font-family: 'JetBrains Mono', monospace;
    background: rgba(0,149,255,0.08);
    color: #0095ff;
    border: 1px solid rgba(0,149,255,0.15);
    padding: 2px 8px;
    border-radius: 20px;
    letter-spacing: 0.5px;
  }

  .card-badge-green {
    background: rgba(0, 212, 120, 0.08);
    color: #00d478;
    border-color: rgba(0, 212, 120, 0.15);
  }

  /* ── Fund Detail Rows ── */
  .detail-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 0;
    border-bottom: 1px solid #0d2235;
    transition: background 0.15s ease;
  }

  .detail-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .detail-row:hover .detail-value {
    color: #e2eaf4;
  }

  .detail-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .detail-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .detail-dot-blue { background: #0095ff; }
  .detail-dot-yellow { background: #f5a623; }
  .detail-dot-gray { background: #3d607d; }
  .detail-dot-teal { background: #00c4b4; }
  .detail-dot-green { background: #00d478; }
  .detail-dot-emerald { background: #10e07a; }
  .detail-dot-red { background: #e84040; }

  .detail-label {
    font-size: 12px;
    color: #4e7090;
    font-weight: 400;
  }

  .detail-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: #b0cce6;
    transition: color 0.15s ease;
  }

  /* ── P&L Value ── */
  .value-positive {
    color: #00d478 !important;
  }

  .value-negative {
    color: #e84040 !important;
  }

  .pnl-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 20px;
    font-family: 'JetBrains Mono', monospace;
    margin-left: 6px;
  }

  .pnl-badge-positive {
    background: rgba(0, 212, 120, 0.1);
    color: #00d478;
    border: 1px solid rgba(0, 212, 120, 0.15);
  }

  /* ── Transactions Card ── */
  .transactions-card {
    background: #0a1e35;
    border: 1px solid #112d47;
    border-radius: 14px;
    padding: 22px 24px;
  }

  .txn-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 4px;
  }

  .txn-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 0;
    border-bottom: 1px solid #0d2235;
    transition: all 0.2s ease;
    border-radius: 4px;
    cursor: pointer;
  }

  .txn-row:last-child {
    border-bottom: none;
  }

  .txn-row:hover {
    padding-left: 6px;
    padding-right: 6px;
    background: rgba(255,255,255,0.02);
    border-radius: 8px;
    border-color: transparent;
  }

  .txn-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .txn-icon-deposit {
    background: rgba(0, 212, 120, 0.08);
    border: 1px solid rgba(0, 212, 120, 0.15);
    color: #00d478;
  }

  .txn-icon-withdraw {
    background: rgba(232, 64, 64, 0.08);
    border: 1px solid rgba(232, 64, 64, 0.15);
    color: #e84040;
  }

  .txn-meta {
    flex: 1;
  }

  .txn-name {
    font-size: 13px;
    font-weight: 500;
    color: #c8dff0;
    margin-bottom: 2px;
  }

  .txn-date {
    font-size: 11px;
    color: #3d607d;
    font-family: 'JetBrains Mono', monospace;
  }

  .txn-amount {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    text-align: right;
  }

  .txn-amount-deposit { color: #00d478; }
  .txn-amount-withdraw { color: #e84040; }

  .txn-status {
    font-size: 10px;
    padding: 2px 7px;
    border-radius: 20px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  .txn-status-success {
    background: rgba(0, 212, 120, 0.08);
    color: #00d478;
    border: 1px solid rgba(0, 212, 120, 0.15);
  }

  .view-all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 16px;
    padding: 10px;
    border-radius: 8px;
    background: transparent;
    border: 1px solid #142d46;
    color: #3d6f96;
    font-size: 12px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    letter-spacing: 0.3px;
  }

  .view-all-btn:hover {
    border-color: #0095ff44;
    color: #0095ff;
    background: rgba(0, 149, 255, 0.04);
  }

  /* ── Notification Toast ── */
  .toast {
    position: fixed;
    bottom: 28px;
    right: 28px;
    background: #0d2340;
    border: 1px solid #1a4a70;
    border-radius: 12px;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    font-weight: 500;
    color: #e2eaf4;
    z-index: 1000;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    animation: slide-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    max-width: 320px;
  }

  @keyframes slide-in {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  .toast-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ── Progress Bar ── */
  .margin-usage {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid #0d2235;
  }

  .margin-label-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
  }

  .margin-label-text {
    font-size: 11px;
    color: #3d607d;
    font-family: 'JetBrains Mono', monospace;
  }

  .margin-bar-track {
    height: 4px;
    background: #0d2235;
    border-radius: 20px;
    overflow: hidden;
  }

  .margin-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #0095ff, #00c4b4);
    border-radius: 20px;
    transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

// ── Icons as inline SVG components ──
const IconWallet = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 7v13a2 2 0 0 0 2 2h14v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconMinus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconTrending = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconArrowDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
);

const IconArrowUp = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconPortfolio = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

//   Data  
const TRANSACTIONS = [
  { id: 1, type: "deposit",  label: "Fund Deposit",    sub: "NEFT Transfer",        amount: "₹10,000", date: "Today, 09:14 AM",    status: "Completed" },
  { id: 2, type: "withdraw", label: "Fund Withdrawal", sub: "Bank Transfer",         amount: "₹2,000",  date: "Yesterday, 03:45 PM", status: "Completed" },
  { id: 3, type: "deposit",  label: "Fund Deposit",    sub: "UPI · HDFC Bank",       amount: "₹5,000",  date: "31 May, 11:02 AM",   status: "Completed" },
];

const FUND_DETAILS = [
  { dot: "detail-dot-blue",   label: "Available Cash",   value: "₹18,000" },
  { dot: "detail-dot-yellow", label: "Used Margin",      value: "₹5,000"  },
  { dot: "detail-dot-gray",   label: "Opening Balance",  value: "₹20,000" },
  { dot: "detail-dot-teal",   label: "Collateral",       value: "₹2,450"  },
];

const PORTFOLIO_DETAILS = [
  { dot: "detail-dot-gray",    label: "Investment Value", value: "₹75,000",  highlight: false },
  { dot: "detail-dot-blue",    label: "Current Value",    value: "₹82,500",  highlight: false },
  { dot: "detail-dot-green",   label: "Profit & Loss",    value: "+₹7,500",  highlight: true  },
  { dot: "detail-dot-emerald", label: "Day's Return",     value: "+₹320",    highlight: true  },
];

// ── Main Component ──
export default function FundsPage() {
  const [toast, setToast] = useState(null);

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="funds-root">

        {/* Header */}
        <div className="funds-header">
          <div className="funds-header-left">
            <div className="funds-header-icon">
              <IconWallet />
            </div>
            <div>
              <div className="funds-title">Funds</div>
              <div className="funds-subtitle">Account · DMAT002938</div>
            </div>
          </div>
          <div className="live-badge">
            <div className="live-dot" />
            MARKET OPEN
          </div>
        </div>

        {/* Balance Hero Card */}
        <div className="balance-card">
          <div className="balance-top">
            <div>
              <div className="balance-label">Available Balance</div>
              <div className="balance-amount">
                <span className="currency">₹</span>25,450
              </div>
              <div style={{ marginTop: 10 }}>
                <span className="balance-change">
                  <IconArrowUp size={12} /> +₹320 today
                </span>
              </div>
            </div>
            <div className="balance-actions">
              <button
                className="btn btn-add"
                onClick={() => showToast("Add Funds flow initiated", "#00d478")}
              >
                <span style={{ width: 14, height: 14, display: 'inline-flex' }}><IconPlus /></span>
                Add Funds
              </button>
              <button
                className="btn btn-withdraw"
                onClick={() => showToast("Withdraw Funds flow initiated", "#e84040")}
              >
                <span style={{ width: 14, height: 14, display: 'inline-flex' }}><IconMinus /></span>
                Withdraw
              </button>
              <button className="btn btn-secondary">
                <span style={{ width: 13, height: 13, display: 'inline-flex' }}><IconRefresh /></span>
                Refresh
              </button>
            </div>
          </div>

          <div className="balance-stats">
            <div className="balance-stat">
              <div className="balance-stat-label">Equity</div>
              <div className="balance-stat-value">₹18,000</div>
            </div>
            <div className="balance-stat">
              <div className="balance-stat-label">Commodity</div>
              <div className="balance-stat-value">₹4,000</div>
            </div>
            <div className="balance-stat">
              <div className="balance-stat-label">Currency</div>
              <div className="balance-stat-value">₹3,450</div>
            </div>
            <div className="balance-stat">
              <div className="balance-stat-label">F&O</div>
              <div className="balance-stat-value">₹0</div>
            </div>
          </div>
        </div>

        {/* Two cards side by side */}
        <div className="cards-grid">

          {/* Fund Details */}
          <div className="info-card">
            <div className="card-header">
              <div className="card-title-wrap">
                <div className="card-icon card-icon-blue" style={{ width: 32, height: 32 }}>
                  <span style={{ width: 16, height: 16, display: 'inline-flex', color: '#0095ff' }}>
                    <IconWallet />
                  </span>
                </div>
                <div className="card-title">Fund Details</div>
              </div>
              <span className="card-badge">EQUITY</span>
            </div>

            {FUND_DETAILS.map((row) => (
              <div className="detail-row" key={row.label}>
                <div className="detail-left">
                  <div className={`detail-dot ${row.dot}`} />
                  <span className="detail-label">{row.label}</span>
                </div>
                <span className="detail-value">{row.value}</span>
              </div>
            ))}

            <div className="margin-usage">
              <div className="margin-label-row">
                <span className="margin-label-text">MARGIN USED</span>
                <span className="margin-label-text">27.8%</span>
              </div>
              <div className="margin-bar-track">
                <div className="margin-bar-fill" style={{ width: '27.8%' }} />
              </div>
            </div>
          </div>

          {/* Portfolio Summary */}
          <div className="info-card">
            <div className="card-header">
              <div className="card-title-wrap">
                <div className="card-icon card-icon-green" style={{ width: 32, height: 32 }}>
                  <span style={{ width: 16, height: 16, display: 'inline-flex', color: '#00d478' }}>
                    <IconTrending />
                  </span>
                </div>
                <div className="card-title">Portfolio Summary</div>
              </div>
              <span className="card-badge card-badge-green">+10%</span>
            </div>

            {PORTFOLIO_DETAILS.map((row) => (
              <div className="detail-row" key={row.label}>
                <div className="detail-left">
                  <div className={`detail-dot ${row.dot}`} />
                  <span className="detail-label">{row.label}</span>
                </div>
                <span className={`detail-value ${row.highlight ? 'value-positive' : ''}`}>
                  {row.value}
                  {row.highlight && row.label === "Profit & Loss" && (
                    <span className="pnl-badge pnl-badge-positive">+10%</span>
                  )}
                </span>
              </div>
            ))}

            <div className="margin-usage">
              <div className="margin-label-row">
                <span className="margin-label-text">PORTFOLIO GAIN</span>
                <span className="margin-label-text" style={{ color: '#00d478' }}>+10.0%</span>
              </div>
              <div className="margin-bar-track">
                <div className="margin-bar-fill" style={{ width: '72%', background: 'linear-gradient(90deg, #00b85c, #00d478)' }} />
              </div>
            </div>
          </div>

        </div>

        {/* Recent Transactions */}
        <div className="transactions-card">
          <div className="card-header">
            <div className="card-title-wrap">
              <div className="card-icon card-icon-blue" style={{ width: 32, height: 32 }}>
                <span style={{ width: 16, height: 16, display: 'inline-flex', color: '#0095ff' }}>
                  <IconClock />
                </span>
              </div>
              <div className="card-title">Recent Transactions</div>
            </div>
            <span className="card-badge">LAST 30 DAYS</span>
          </div>

          <div className="txn-list">
            {TRANSACTIONS.map((txn) => (
              <div className="txn-row" key={txn.id}>
                <div className={`txn-icon ${txn.type === 'deposit' ? 'txn-icon-deposit' : 'txn-icon-withdraw'}`}>
                  <span style={{ width: 16, height: 16, display: 'inline-flex' }}>
                    {txn.type === 'deposit' ? <IconArrowDown /> : <IconArrowUp />}
                  </span>
                </div>
                <div className="txn-meta">
                  <div className="txn-name">{txn.label}</div>
                  <div className="txn-date">{txn.sub} · {txn.date}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span className={`txn-amount ${txn.type === 'deposit' ? 'txn-amount-deposit' : 'txn-amount-withdraw'}`}>
                    {txn.type === 'deposit' ? '+' : '-'}{txn.amount}
                  </span>
                  <span className="txn-status txn-status-success">{txn.status}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="view-all-btn">
            View All Transactions <IconChevronRight />
          </button>
        </div>

        {/* Toast notification */}
        {toast && (
          <div className="toast">
            <div
              className="toast-icon"
              style={{
                background: `${toast.color}15`,
                border: `1px solid ${toast.color}30`,
                color: toast.color
              }}
            >
              <span style={{ width: 14, height: 14, display: 'inline-flex' }}>
                {toast.color === '#00d478' ? <IconPlus /> : <IconMinus />}
              </span>
            </div>
            <span style={{ fontSize: 13, color: '#c8dff0' }}>{toast.msg}</span>
          </div>
        )}

      </div>
    </>
  );
}
