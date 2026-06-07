 

import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const generalContext = useContext(GeneralContext);

    
  const [isVisible, setIsVisible] = useState(false);       // mount animation
  const [isLoading, setIsLoading] = useState(false);        // buy-button loading
  const [qtyError, setQtyError] = useState("");             // inline validation
  const [priceError, setPriceError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);    // success flash
  const prevOrderValue = useRef(0);

  // Animate in on first render
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  
  const qty   = parseFloat(stockQuantity) || 0;
  const price = parseFloat(stockPrice)    || 0;
  const orderValue   = qty * price;
  const brokerage    = orderValue > 0 ? Math.min(20, orderValue * 0.0003) : 0;
  const totalCost    = orderValue + brokerage;
  const marginReq    = 140.65;                 // original hardcoded value kept
  const availFunds   = 5000;                   // mock available funds (UI demo)
  const remaining    = availFunds - marginReq;
  const marginPct    = Math.min(100, (marginReq / availFunds) * 100);

    
  const validateQty = (val) => {
    if (!val || val <= 0) { setQtyError("Qty must be ≥ 1"); return false; }
    if (val > 10000)      { setQtyError("Max 10,000 shares"); return false; }
    setQtyError("");
    return true;
  };
  const validatePrice = (val) => {
    if (val < 0)  { setPriceError("Price cannot be negative"); return false; }
    setPriceError("");
    return true;
  };

    
  const incrementQty = () => {
    const next = qty + 1;
    setStockQuantity(next);
    validateQty(next);
  };
  const decrementQty = () => {
    const next = Math.max(1, qty - 1);
    setStockQuantity(next);
    validateQty(next);
  };

    
  const handleBuyClick = () => {
    const validQty   = validateQty(qty);
    const validPrice = validatePrice(price);
    if (!validQty || !validPrice) return;

    setIsLoading(true);

    
    axios.post("https://nivesh-a-stock-trading-platform.onrender.com/newOrder", {
      name: uid,
      qty:  stockQuantity,
      price: stockPrice,
      mode: "BUY",
    }).then(() => {
      setOrderPlaced(true);
      setTimeout(() => {
        setIsLoading(false);
        generalContext.closeBuyWindow();   
      }, 900);
    }).catch(() => {
      setIsLoading(false);
      generalContext.closeBuyWindow();     
    });
  };

  const handleCancelClick = () => {
   
    setIsVisible(false);
    setTimeout(() => generalContext.closeBuyWindow(), 280);    
  };

     
  const fmt = (n) =>
    n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  //   Market status mock    
  const now   = new Date();
  const hours = now.getHours();
  const isMarketOpen = hours >= 9 && hours < 16;

  return (
    <>
      {/*  Backdrop overlay  */}
     {/* <div
        className={`baw-backdrop ${isVisible ? "baw-backdrop--visible" : ""}`}
        onClick={handleCancelClick}
        aria-hidden="true"
      />*/}

      {/*   Main modal window   */}
      <div
        className={`baw-window ${isVisible ? "baw-window--visible" : ""} ${
          orderPlaced ? "baw-window--success" : ""
        }`}
        id="buy-window"
        role="dialog"
        aria-modal="true"
        aria-label={`Buy order for ${uid}`}
      >

        {/*   HEADER   */}
        <div className="baw-header">
          <div className="baw-header__left">
            <span className="baw-ticker">{uid}</span>
            <span className="baw-badge baw-badge--buy">BUY</span>
            {/* Market status indicator   */}
            <span className={`baw-market-status ${isMarketOpen ? "baw-market-status--open" : "baw-market-status--closed"}`}>
              <span className="baw-market-status__dot" />
              {isMarketOpen ? "Market Open" : "Market Closed"}
            </span>
          </div>
          <button
            className="baw-close-btn"
            onClick={handleCancelClick}
            aria-label="Close order window"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/*   DIVIDER   */}
        <div className="baw-divider" />

        {/*   ORDER FORM   */}
        <div className="baw-form">

          {/* Quantity field   */}
          <div className={`baw-field ${qtyError ? "baw-field--error" : ""}`}>
            <label className="baw-label" htmlFor="qty">Quantity</label>
            <div className="baw-input-row">
              <button
                className="baw-stepper baw-stepper--minus"
                onClick={decrementQty}
                aria-label="Decrease quantity"
                type="button"
              >−</button>
              <input
                className="baw-input baw-input--center"
                type="number"
                name="qty"
                id="qty"
                min="1"
                max="10000"
                onChange={(e) => {
                  setStockQuantity(e.target.value);
                  validateQty(e.target.value);
                }}
                value={stockQuantity}
              />
              <button
                className="baw-stepper baw-stepper--plus"
                onClick={incrementQty}
                aria-label="Increase quantity"
                type="button"
              >+</button>
            </div>
            {qtyError && <span className="baw-error-msg">{qtyError}</span>}
          </div>

          {/* Price field  */}
          <div className={`baw-field ${priceError ? "baw-field--error" : ""}`}>
            <label className="baw-label" htmlFor="price">Price (₹)</label>
            <div className="baw-input-row">
              <span className="baw-currency-icon">₹</span>
              <input
                className="baw-input baw-input--price"
                type="number"
                name="price"
                id="price"
                step="0.05"
                placeholder="0.00"
                onChange={(e) => {
                  setStockPrice(e.target.value);
                  validatePrice(e.target.value);
                }}
                value={stockPrice}
              />
            </div>
            {priceError && <span className="baw-error-msg">{priceError}</span>}
          </div>
        </div>

        {/*  ORDER SUMMARY   */}
        <div className="baw-summary">
          <p className="baw-summary__title">Order Summary</p>
          <div className="baw-summary__grid">
            <span>Quantity × Price</span>
            <span>{qty} × ₹{fmt(price)}</span>

            <span>Est. Order Value</span>
            <span className="baw-summary__value">₹{fmt(orderValue)}</span>

            <span>Brokerage</span>
            <span>₹{fmt(brokerage)}</span>

            <div className="baw-summary__sep" />
            <div className="baw-summary__sep" />

            <span className="baw-summary__total-label">Total Cost</span>
            <span className="baw-summary__total">₹{fmt(totalCost)}</span>
          </div>
        </div>

        {/* MARGIN CARD */}
        <div className="baw-margin">
          <div className="baw-margin__row">
            <span className="baw-margin__label">Required Margin</span>
            <span className="baw-margin__value">₹{fmt(marginReq)}</span>
          </div>
          <div className="baw-margin__row">
            <span className="baw-margin__label">Available Funds</span>
            <span className="baw-margin__value baw-margin__value--avail">₹{fmt(availFunds)}</span>
          </div>
          <div className="baw-margin__row">
            <span className="baw-margin__label">After Trade</span>
            <span className={`baw-margin__value ${remaining < 0 ? "baw-margin__value--danger" : ""}`}>
              ₹{fmt(remaining)}
            </span>
          </div>
          {/*  Progress bar */}
          <div className="baw-progress">
            <div className="baw-progress__track">
              <div
                className="baw-progress__fill"
                style={{ width: `${marginPct}%` }}
              />
            </div>
            <span className="baw-progress__pct">{marginPct.toFixed(1)}% used</span>
          </div>
        </div>

        {/*   ACTION BUTTONS   */}
        <div className="baw-actions">
          {/* Buy button   */}
          <Link
            className={`baw-btn baw-btn--buy ${isLoading ? "baw-btn--loading" : ""} ${orderPlaced ? "baw-btn--done" : ""}`}
            onClick={handleBuyClick}
            aria-disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="baw-spinner" />
                Placing…
              </>
            ) : orderPlaced ? (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8L6.5 12.5L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Order Placed!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Buy {uid}
              </>
            )}
          </Link>

          {/* Cancel button */}
          <Link
            to=""
            className="baw-btn baw-btn--cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </Link>
        </div>

      </div>
    </>
  );
};

export default BuyActionWindow;
