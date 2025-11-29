// SubscriptionPage.jsx
import React from "react";
import "../SubscriptionPage.css";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "Free",
    badge: "Current plan",
    desc: "Perfect to explore NutriWell basics.",
    color: "mint",
    features: ["Daily dashboard", "Water & habit tracker", "Basic nutrition goals"],
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    badge: "Most popular",
    desc: "Advanced insights for serious progress.",
    color: "peach",
    featured: true,
    features: ["Smart recommendations", "Advanced analytics", "Priority support"],
  },
  {
    name: "Coach",
    price: "$19",
    period: "per month",
    badge: "For teams",
    desc: "Designed for nutritionists & coaches.",
    color: "lilac",
    features: ["Multiple clients", "Shared dashboards", "Exportable reports"],
  },
];

export default function SubscriptionPage() {
  return (
    <div className="subs-page-bg">
      <div className="subs-page-shell">
        <header className="subs-header-row">
          <div>
            <h1 className="subs-title">Choose your NutriWell plan</h1>
            <p className="subs-subtitle">
              Upgrade when you are ready. Your data stays in sync across all plans.
            </p>
          </div>
          <button className="subs-toggle">
            Monthly
            <span className="subs-toggle-pill">Yearly -20%</span>
          </button>
        </header>

        <div className="subs-card-grid">
          {plans.map(plan => (
            <article
              key={plan.name}
              className={`subs-card subs-${plan.color} ${plan.featured ? "subs-featured" : ""}`}
            >
              <div className="subs-card-header">
                <span className="subs-plan-name">{plan.name}</span>
                {plan.badge && <span className="subs-badge">{plan.badge}</span>}
              </div>

              <div className="subs-price-row">
                <span className="subs-price">{plan.price}</span>
                {plan.period && <span className="subs-period">/{plan.period}</span>}
              </div>

              <p className="subs-desc">{plan.desc}</p>

              <ul className="subs-feature-list">
                {plan.features.map(f => (
                  <li key={f} className="subs-feature-item">
                    <span className="subs-dot" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="subs-cta-btn">
                {plan.price === "$0" ? "Continue with free" : "Upgrade to " + plan.name}
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
