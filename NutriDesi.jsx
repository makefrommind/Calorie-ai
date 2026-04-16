import { useState, useEffect } from "react";

const saffron = "#F4A61D";
const terracotta = "#C7522A";
const cream = "#FDF6EC";
const deepBrown = "#2C1810";
const softGreen = "#4CAF7D";
const lightOrange = "#FFF0D6";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${cream};
    font-family: 'DM Sans', sans-serif;
    color: ${deepBrown};
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    max-width: 420px;
    margin: 0 auto;
    min-height: 100vh;
    background: ${cream};
    position: relative;
    overflow: hidden;
  }

  /* ─── HEADER ─── */
  .header {
    background: linear-gradient(135deg, ${terracotta} 0%, #A8401F 60%, #7A2E15 100%);
    padding: 48px 24px 32px;
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(244,166,29,0.18);
  }
  .header::after {
    content: '';
    position: absolute;
    bottom: -30px; left: 20px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
  }
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .greeting {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .user-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-top: 2px;
  }
  .avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(244,166,29,0.3);
    border: 2px solid ${saffron};
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }

  /* ─── CALORIE RING ─── */
  .calorie-ring-wrap {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    z-index: 1;
  }
  .ring-svg { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.25)); }
  .ring-center {
    position: absolute;
    left: 0; top: 0;
    width: 110px; height: 110px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .ring-cal {
    font-family: 'Playfair Display', serif;
    font-size: 26px; font-weight: 900;
    color: #fff; line-height: 1;
  }
  .ring-label {
    font-size: 10px; color: rgba(255,255,255,0.7);
    letter-spacing: 0.5px; text-transform: uppercase;
  }
  .ring-wrap { position: relative; width: 110px; height: 110px; flex-shrink: 0; }

  .macros-mini {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .macro-row {
    display: flex; align-items: center; gap: 8px;
  }
  .macro-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  }
  .macro-name { font-size: 12px; color: rgba(255,255,255,0.75); flex: 1; }
  .macro-bar-bg {
    flex: 2;
    height: 4px; border-radius: 2px;
    background: rgba(255,255,255,0.15);
    overflow: hidden;
  }
  .macro-bar-fill {
    height: 100%; border-radius: 2px;
    transition: width 1s ease;
  }
  .macro-val { font-size: 11px; font-weight: 600; color: #fff; min-width: 36px; text-align: right; }

  /* ─── SNAP BUTTON ─── */
  .snap-section {
    padding: 0 20px;
    margin-top: -20px;
    position: relative;
    z-index: 10;
  }
  .snap-btn {
    width: 100%;
    background: linear-gradient(135deg, ${saffron}, #E8920A);
    border: none; border-radius: 18px;
    padding: 18px 24px;
    display: flex; align-items: center; gap: 14px;
    cursor: pointer;
    box-shadow: 0 8px 28px rgba(244,166,29,0.45);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .snap-btn:active { transform: scale(0.97); box-shadow: 0 4px 14px rgba(244,166,29,0.3); }
  .snap-icon-wrap {
    width: 48px; height: 48px; border-radius: 14px;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
  }
  .snap-text { text-align: left; }
  .snap-title {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700; font-size: 16px; color: #fff;
  }
  .snap-sub {
    font-size: 12px; color: rgba(255,255,255,0.8); margin-top: 1px;
  }
  .snap-arrow { margin-left: auto; color: rgba(255,255,255,0.7); font-size: 18px; }

  /* ─── SECTION ─── */
  .section { padding: 20px 20px 0; }
  .section-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 14px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700; color: ${deepBrown};
  }
  .section-link {
    font-size: 12px; color: ${terracotta}; font-weight: 600; cursor: pointer;
    text-decoration: none;
  }

  /* ─── MEAL CARDS ─── */
  .meal-cards { display: flex; flex-direction: column; gap: 10px; }
  .meal-card {
    background: #fff;
    border-radius: 16px;
    padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: 0 2px 12px rgba(44,24,16,0.06);
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .meal-card:active { transform: scale(0.98); }
  .meal-emoji { font-size: 28px; width: 46px; height: 46px;
    border-radius: 12px; background: ${lightOrange};
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .meal-info { flex: 1; }
  .meal-name { font-weight: 600; font-size: 14px; color: ${deepBrown}; }
  .meal-detail { font-size: 12px; color: #888; margin-top: 2px; }
  .meal-kcal {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 700; color: ${terracotta};
  }
  .meal-kcal span { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 400; color: #aaa; }

  /* ─── QUICK ADD CHIPS ─── */
  .chips { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
  .chips::-webkit-scrollbar { display: none; }
  .chip {
    flex-shrink: 0;
    padding: 8px 14px; border-radius: 30px;
    background: #fff; border: 1.5px solid #EDD8C0;
    font-size: 12px; font-weight: 500; color: ${deepBrown};
    cursor: pointer; white-space: nowrap;
    transition: background 0.15s, border-color 0.15s;
  }
  .chip:hover, .chip.active { background: ${lightOrange}; border-color: ${saffron}; }

  /* ─── WATER TRACKER ─── */
  .water-card {
    background: linear-gradient(135deg, #E8F4FD, #D0E8F8);
    border-radius: 16px; padding: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .water-icon { font-size: 28px; }
  .water-info { flex: 1; }
  .water-title { font-weight: 600; font-size: 14px; color: #1A5276; }
  .water-sub { font-size: 12px; color: #5D8AA8; margin-top: 2px; }
  .water-glasses { display: flex; gap: 4px; margin-top: 8px; }
  .glass {
    width: 20px; height: 26px; border-radius: 4px;
    border: 2px solid #5D8AA8;
    background: transparent; cursor: pointer;
    transition: background 0.2s;
    position: relative; overflow: hidden;
  }
  .glass.filled { background: #3498DB; border-color: #2980B9; }
  .glass.filled::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 100%; background: rgba(255,255,255,0.2);
  }

  /* ─── INSIGHT CARD ─── */
  .insight-card {
    background: linear-gradient(135deg, #FFF8EC, ${lightOrange});
    border: 1.5px solid #EDD8C0;
    border-radius: 16px; padding: 16px;
    display: flex; gap: 12px; align-items: flex-start;
  }
  .insight-icon { font-size: 22px; margin-top: 2px; }
  .insight-title { font-weight: 600; font-size: 14px; color: ${deepBrown}; margin-bottom: 4px; }
  .insight-text { font-size: 12px; color: #666; line-height: 1.5; }
  .insight-badge {
    display: inline-block; margin-top: 6px;
    padding: 3px 10px; border-radius: 20px;
    background: ${saffron}; color: #fff;
    font-size: 11px; font-weight: 600;
  }

  /* ─── BOTTOM NAV ─── */
  .bottom-nav {
    position: sticky; bottom: 0;
    background: #fff;
    border-top: 1px solid #F0E0CC;
    display: flex; padding: 10px 0 16px;
    box-shadow: 0 -4px 20px rgba(44,24,16,0.08);
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; gap: 4px; cursor: pointer;
    padding: 4px 0;
  }
  .nav-icon { font-size: 20px; }
  .nav-label { font-size: 10px; font-weight: 500; color: #bbb; letter-spacing: 0.3px; }
  .nav-item.active .nav-label { color: ${terracotta}; }
  .nav-item.active .nav-icon { filter: none; }

  /* ─── MODAL OVERLAY ─── */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(44,24,16,0.55);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex; align-items: flex-end;
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  .modal-sheet {
    width: 100%; max-width: 420px; margin: 0 auto;
    background: #fff; border-radius: 24px 24px 0 0;
    padding: 20px 24px 36px;
    animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
  .modal-handle {
    width: 36px; height: 4px; border-radius: 2px;
    background: #E0D0C0; margin: 0 auto 20px;
  }
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700; margin-bottom: 4px;
  }
  .modal-sub { font-size: 13px; color: #888; margin-bottom: 20px; }
  .food-result {
    background: ${lightOrange};
    border-radius: 16px; padding: 16px;
    display: flex; gap: 14px; align-items: center;
    margin-bottom: 16px;
  }
  .food-result-emoji { font-size: 40px; }
  .food-result-name { font-weight: 700; font-size: 16px; color: ${deepBrown}; }
  .food-result-detail { font-size: 13px; color: #666; margin-top: 2px; }
  .macro-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
  .macro-pill {
    padding: 4px 10px; border-radius: 20px;
    font-size: 12px; font-weight: 600;
  }
  .portion-row {
    display: flex; gap: 8px; margin-bottom: 16px;
  }
  .portion-btn {
    flex: 1; padding: 10px; border-radius: 12px;
    border: 2px solid #EDD8C0; background: #fff;
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: all 0.15s;
  }
  .portion-btn.selected { border-color: ${saffron}; background: ${lightOrange}; color: ${terracotta}; font-weight: 700; }
  .add-meal-btn {
    width: 100%; padding: 16px; border: none;
    background: linear-gradient(135deg, ${terracotta}, #A8401F);
    color: #fff; border-radius: 16px;
    font-size: 16px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.3px;
    box-shadow: 0 6px 20px rgba(199,82,42,0.4);
    transition: transform 0.15s;
  }
  .add-meal-btn:active { transform: scale(0.97); }

  .scanning-wrap {
    display: flex; flex-direction: column; align-items: center;
    padding: 20px 0 10px;
  }
  .scan-anim {
    width: 120px; height: 120px;
    border-radius: 50%;
    background: ${lightOrange};
    display: flex; align-items: center; justify-content: center;
    font-size: 50px; margin-bottom: 16px;
    position: relative;
  }
  .scan-anim::after {
    content: '';
    position: absolute; inset: -6px;
    border-radius: 50%;
    border: 3px dashed ${saffron};
    animation: spin 3s linear infinite;
  }
  @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
  .scan-text { font-size: 15px; color: #888; }
  .scan-text strong { color: ${terracotta}; }

  .pb { padding-bottom: 12px; }
`;

const MEALS = [
  { emoji: "🍛", name: "Dal Tadka + 2 Rotis", detail: "Lunch · Homemade", kcal: 420, protein: 18, carbs: 58, fat: 9 },
  { emoji: "🥣", name: "Poha with Groundnuts", detail: "Breakfast · Homemade", kcal: 285, protein: 7, carbs: 44, fat: 8 },
  { emoji: "☕", name: "Masala Chai + Biscuit", detail: "Morning · Tea-time", kcal: 95, protein: 3, carbs: 14, fat: 3 },
];

const SNAP_FOODS = [
  { emoji: "🍛", name: "Butter Chicken (1 bowl)", detail: "250g · Restaurant-style", kcal: 380, protein: 32, carbs: 14, fat: 22 },
  { emoji: "🥗", name: "Sprouts Chaat", detail: "200g · Street-style", kcal: 180, protein: 12, carbs: 28, fat: 3 },
  { emoji: "🫓", name: "2 Whole Wheat Rotis", detail: "60g · Homemade", kcal: 150, protein: 5, carbs: 30, fat: 2 },
];

const QUICK_FOODS = ["Chapati", "Rice (1 cup)", "Sambar", "Curd", "Paneer", "Dosa", "Idli", "Rajma"];

function CalorieRing({ consumed, goal }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(consumed / goal, 1);
  const dash = pct * circ;

  return (
    <div className="ring-wrap">
      <svg className="ring-svg" width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
        <circle
          cx="55" cy="55" r={r} fill="none"
          stroke={saffron} strokeWidth="9"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <div className="ring-center">
        <div className="ring-cal">{consumed}</div>
        <div className="ring-label">of {goal}</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>kcal eaten</div>
      </div>
    </div>
  );
}

function MacroBar({ label, color, val, max }) {
  return (
    <div className="macro-row">
      <div className="macro-dot" style={{ background: color }} />
      <span className="macro-name">{label}</span>
      <div className="macro-bar-bg">
        <div className="macro-bar-fill" style={{ width: `${Math.min(val/max,1)*100}%`, background: color }} />
      </div>
      <span className="macro-val">{val}g</span>
    </div>
  );
}

export default function App() {
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [activeNav, setActiveNav] = useState(0);
  const [modal, setModal] = useState(null); // null | 'scan' | 'result' | 'added'
  const [scanStep, setScanStep] = useState(0); // 0=camera, 1=scanning, 2=result
  const [selectedFood, setSelectedFood] = useState(null);
  const [portion, setPortion] = useState("1");
  const [meals, setMeals] = useState(MEALS);
  const [activeChip, setActiveChip] = useState(null);

  const totalKcal = meals.reduce((s, m) => s + m.kcal, 0);
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = meals.reduce((s, m) => s + m.carbs, 0);
  const totalFat = meals.reduce((s, m) => s + m.fat, 0);

  const openSnap = () => {
    setScanStep(0);
    setSelectedFood(null);
    setModal("scan");
    // auto-advance to scanning after 600ms
    setTimeout(() => {
      setScanStep(1);
      setTimeout(() => {
        const food = SNAP_FOODS[Math.floor(Math.random() * SNAP_FOODS.length)];
        setSelectedFood(food);
        setScanStep(2);
      }, 1800);
    }, 600);
  };

  const addFood = () => {
    if (!selectedFood) return;
    const mult = portion === "0.5" ? 0.5 : portion === "1" ? 1 : portion === "1.5" ? 1.5 : 2;
    const newMeal = {
      ...selectedFood,
      name: selectedFood.name,
      detail: `Just added · ${portion === "0.5" ? "Half" : portion === "1" ? "1" : portion === "1.5" ? "1.5" : "2"} serving`,
      kcal: Math.round(selectedFood.kcal * mult),
      protein: Math.round(selectedFood.protein * mult),
      carbs: Math.round(selectedFood.carbs * mult),
      fat: Math.round(selectedFood.fat * mult),
    };
    setMeals(prev => [newMeal, ...prev]);
    setModal(null);
  };

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">

        {/* HEADER */}
        <div className="header">
          <div className="header-top">
            <div>
              <div className="greeting">Namaste 🙏</div>
              <div className="user-name">Priya</div>
            </div>
            <div className="avatar">🧘</div>
          </div>
          <div className="calorie-ring-wrap">
            <CalorieRing consumed={totalKcal} goal={1800} />
            <div className="macros-mini">
              <MacroBar label="Protein" color="#4CAF7D" val={totalProtein} max={80} />
              <MacroBar label="Carbs" color={saffron} val={totalCarbs} max={220} />
              <MacroBar label="Fat" color="#E07B54" val={totalFat} max={60} />
              <div style={{ marginTop: 4, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                {1800 - totalKcal} kcal remaining today
              </div>
            </div>
          </div>
        </div>

        {/* SNAP BUTTON */}
        <div className="snap-section">
          <button className="snap-btn" onClick={openSnap}>
            <div className="snap-icon-wrap">📸</div>
            <div className="snap-text">
              <div className="snap-title">Snap Your Food</div>
              <div className="snap-sub">Photo se track karo instantly</div>
            </div>
            <div className="snap-arrow">›</div>
          </button>
        </div>

        {/* QUICK ADD */}
        <div className="section">
          <div className="section-header">
            <div className="section-title">Quick Add</div>
          </div>
          <div className="chips">
            {QUICK_FOODS.map(f => (
              <div
                key={f}
                className={`chip ${activeChip === f ? "active" : ""}`}
                onClick={() => setActiveChip(activeChip === f ? null : f)}
              >
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* TODAY'S MEALS */}
        <div className="section" style={{ marginTop: 8 }}>
          <div className="section-header">
            <div className="section-title">Aaj ka Khana</div>
            <span className="section-link">+ Add meal</span>
          </div>
          <div className="meal-cards">
            {meals.map((m, i) => (
              <div className="meal-card" key={i}>
                <div className="meal-emoji">{m.emoji}</div>
                <div className="meal-info">
                  <div className="meal-name">{m.name}</div>
                  <div className="meal-detail">{m.detail} · P:{m.protein}g C:{m.carbs}g F:{m.fat}g</div>
                </div>
                <div className="meal-kcal">{m.kcal}<br /><span>kcal</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* WATER */}
        <div className="section" style={{ marginTop: 8 }}>
          <div className="section-title" style={{ marginBottom: 12 }}>Paani Tracker 💧</div>
          <div className="water-card">
            <div className="water-icon">🚰</div>
            <div className="water-info">
              <div className="water-title">{waterGlasses} of 8 glasses</div>
              <div className="water-sub">Tap to add a glass</div>
              <div className="water-glasses">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`glass ${i < waterGlasses ? "filled" : ""}`}
                    onClick={() => setWaterGlasses(i < waterGlasses ? i : i + 1)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INSIGHT */}
        <div className="section" style={{ marginTop: 8, marginBottom: 24 }}>
          <div className="section-title" style={{ marginBottom: 12 }}>Nutrition Insight ✨</div>
          <div className="insight-card">
            <div className="insight-icon">🌿</div>
            <div>
              <div className="insight-title">Protein kam hai aaj</div>
              <div className="insight-text">
                You've had {totalProtein}g protein so far. A cup of moong dal or 100g paneer would help you reach your 80g daily goal.
              </div>
              <div className="insight-badge">+ Add Protein</div>
            </div>
          </div>
        </div>

        <div className="pb" />

        {/* BOTTOM NAV */}
        <div className="bottom-nav">
          {[
            { icon: "🏠", label: "Home" },
            { icon: "📊", label: "Progress" },
            { icon: "🔍", label: "Explore" },
            { icon: "👤", label: "Profile" },
          ].map((n, i) => (
            <div key={i} className={`nav-item ${activeNav === i ? "active" : ""}`} onClick={() => setActiveNav(i)}>
              <div className="nav-icon">{n.icon}</div>
              <div className="nav-label" style={{ color: activeNav === i ? terracotta : "#bbb" }}>{n.label}</div>
            </div>
          ))}
        </div>

        {/* SCAN MODAL */}
        {modal === "scan" && (
          <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
            <div className="modal-sheet" style={{ maxWidth: 420, width: "100%" }}>
              <div className="modal-handle" />

              {scanStep < 2 && (
                <div className="scanning-wrap">
                  <div className="scan-anim">{scanStep === 0 ? "📷" : "🔍"}</div>
                  <div className="modal-title" style={{ textAlign: "center" }}>
                    {scanStep === 0 ? "Camera se Snap Karo" : "Analysing..."}
                  </div>
                  <div className="scan-text" style={{ textAlign: "center", marginTop: 8 }}>
                    {scanStep === 0
                      ? "Point your camera at your plate"
                      : <><strong>AI</strong> recognising your desi food</>}
                  </div>
                </div>
              )}

              {scanStep === 2 && selectedFood && (
                <>
                  <div className="modal-title">Food Mila! 🎉</div>
                  <div className="modal-sub">Confirm your portion size</div>

                  <div className="food-result">
                    <div className="food-result-emoji">{selectedFood.emoji}</div>
                    <div>
                      <div className="food-result-name">{selectedFood.name}</div>
                      <div className="food-result-detail">{selectedFood.detail}</div>
                      <div className="macro-pills">
                        <span className="macro-pill" style={{ background: "#E8F8EF", color: softGreen }}>P {selectedFood.protein}g</span>
                        <span className="macro-pill" style={{ background: lightOrange, color: terracotta }}>C {selectedFood.carbs}g</span>
                        <span className="macro-pill" style={{ background: "#FEF0E7", color: "#C0652B" }}>F {selectedFood.fat}g</span>
                        <span className="macro-pill" style={{ background: "#FFF5E0", color: "#B8860B" }}>{selectedFood.kcal} kcal</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: deepBrown }}>Kitna khaya?</div>
                  <div className="portion-row">
                    {["0.5", "1", "1.5", "2"].map(p => (
                      <button
                        key={p}
                        className={`portion-btn ${portion === p ? "selected" : ""}`}
                        onClick={() => setPortion(p)}
                      >
                        {p === "0.5" ? "½" : p === "1.5" ? "1½" : p}x
                      </button>
                    ))}
                  </div>

                  <button className="add-meal-btn" onClick={addFood}>
                    Log {Math.round(selectedFood.kcal * (parseFloat(portion)))} kcal → Add to Diary
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
