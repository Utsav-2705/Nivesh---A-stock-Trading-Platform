import React from "react";
import {
  FaChartLine,
  FaWallet,
  FaFlask,
  FaChartPie,
  FaTrophy,
  FaBookOpen,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaChartLine size={45} className="text-primary mb-3" />,
      title: "Real Market Data",
      desc: "Trade using live market prices and realistic conditions.",
    },
    {
      icon: <FaWallet size={45} className="text-success mb-3" />,
      title: "Virtual Capital",
      desc: "Start with ₹1,00,000 virtual funds and trade risk-free.",
    },
    {
      icon: <FaFlask size={45} className="text-warning mb-3" />,
      title: "Strategy Testing",
      desc: "Experiment with trading and investment strategies.",
    },
    {
      icon: <FaChartPie size={45} className="text-info mb-3" />,
      title: "Portfolio Analytics",
      desc: "Track profits, losses and portfolio performance.",
    },
    {
      icon: <FaTrophy size={45} className="text-warning mb-3" />,
      title: "Leaderboards",
      desc: "Compete with other traders and improve your skills.",
    },
    {
      icon: <FaBookOpen size={45} className="text-primary mb-3" />,
      title: "Learn Before Investing",
      desc: "Gain experience before entering the real market.",
    },
  ];

  return (
    <section className="container py-5">
      <h2 className="text-center mb-5">
        Why Use Paper Trading?
      </h2>

      <div className="row g-4">
        {features.map((item, index) => (
          <div key={index} className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              {item.icon}

              <h4>{item.title}</h4>

              <p className="text-muted">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;