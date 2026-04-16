import { useState, useRef } from "react";

const saffron = "#F4A61D";
const terracotta = "#C7522A";
const cream = "#FDF6EC";
const deepBrown = "#2C1810";
const lightOrange = "#FFF0D6";
const softGreen = "#4CAF7D";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${cream}; font-family: 'DM Sans', sans-serif; color: ${deepBrown}; }

  .app { max-width: 420px; margin: 0 auto; min-height: 100vh; background: ${cream}; }

  .header {
    background: linear-gradient(135deg, ${terracotta} 0%, #A8401F 60%, #7A2E15 100%);
    padding: 44px 24px 28px;
  }
  .header-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 900; color: #fff; }
  .header-sub { font-size: 12px; color: rgba(255,255,255,0.7); margin-top: 3px; letter-spacing: 0.4px; }

  /* Upload zone */
  .upload-zone {
    margin: 20px;
    border: 2.5px dashed #EDD8C0;
    border-radius: 20px;
    background: #fff;
    padding: 28px 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    position: relative;
    overflow: hidden;
  }
  .upload-zone:hover { border-color: ${saffron}; background: ${lightOrange}; }
  .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; font-size: 100px; }
  .upload-icon { font-size: 40px; margin-bottom: 10px; }
  .upload-title { font-weight: 700; font-size: 15px; color: ${deepBrown}; }
  .upload-sub { font-size: 12px; color: #888; margin-top: 4px; }

  /* Preview */
  .preview-wrap { margin: 0 20px 0; position: relative; }
  .preview-img { width: 100%; border-radius: 16px; max-height: 220px; object-fit: cover; display: block; box-shadow: 0 4px 20px rgba(44,24,16,0.12); }
  .change-btn {
    position: absolute; top: 10px; right: 10px;
    background: rgba(44,24,16,0.7); color: #fff;
    border: none; border-radius: 20px; padding: 5px 12px;
    font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif;
  }

  /* Analyse button */
  .analyse-btn {
    display: block; width: calc(100% - 40px); margin: 14px 20px 0;
    background: linear-gradient(135deg, ${terracotta}, #A8401F);
    color: #fff; border: none; border-radius: 14px;
    padding: 16px; font-size: 15px; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    box-shadow: 0 6px 20px rgba(199,82,42,0.35);
    transition: transform 0.15s, opacity 0.15s;
  }
  .analyse-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .analyse-btn:not(:disabled):active { transform: scale(0.97); }

  /* Status */
  .status-bar {
    margin: 14px 20px 0;
    background: ${lightOrange};
    border-radius: 12px; padding: 12px 16px;
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; font-weight: 500; color: ${terracotta};
  }
  .spinner {
    width: 18px; height: 18px; border: 2.5px solid rgba(199,82,42,0.2);
    border-top-color: ${terracotta}; border-radius: 50%;
    animation: spin 0.7s linear infinite; flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg) } }

  /* Results */
  .results { margin: 18px 20px 30px; display: flex; flex-direction: column; gap: 14px; }

  .result-card {
    background: #fff; border-radius: 18px;
    box-shadow: 0 2px 14px rgba(44,24,16,0.07);
    overflow: hidden;
  }
  .card-header {
    padding: 14px 16px 10px;
    display: flex; align-items: center; gap: 10px;
    border-bottom: 1px solid #F5EAD8;
  }
  .card-badge {
    padding: 3px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.3px;
  }
  .badge-ai { background: #E8F8EF; color: ${softGreen}; }
  .badge-web { background: #E8F0FE; color: #4A6FD4; }
  .badge-nutrition { background: ${lightOrange}; color: ${terracotta}; }
  .card-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; }
  .card-body { padding: 12px 16px 16px; }

  /* AI identification */
  .ai-food-name { font-size: 20px; font-weight: 700; color: ${terracotta}; margin-bottom: 4px; font-family: 'Playfair Display', serif; }
  .ai-confidence {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; color: ${softGreen}; font-weight: 600;
    background: #E8F8EF; padding: 3px 10px; border-radius: 20px; margin-bottom: 10px;
  }
  .ai-desc { font-size: 13px; color: #555; line-height: 1.6; }
  .ingredients-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .ingredient-tag {
    padding: 4px 10px; border-radius: 20px;
    background: ${lightOrange}; color: ${deepBrown};
    font-size: 11px; font-weight: 500;
  }

  /* Nutrition grid */
  .nutrition-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .nutrition-item {
    background: ${lightOrange}; border-radius: 12px; padding: 12px;
    text-align: center;
  }
  .nutrition-val { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: ${terracotta}; }
  .nutrition-unit { font-size: 10px; color: #999; }
  .nutrition-label { font-size: 11px; font-weight: 600; color: ${deepBrown}; margin-top: 2px; }
  .nutrition-full { grid-column: 1 / -1; }

  /* Wiki result */
  .wiki-title { font-size: 16px; font-weight: 700; color: #1A3A8F; margin-bottom: 6px; }
  .wiki-extract { font-size: 12px; color: #444; line-height: 1.65; }
  .wiki-image { width: 100%; border-radius: 10px; margin-bottom: 10px; object-fit: cover; max-height: 160px; display: block; }
  .wiki-link {
    display: inline-flex; align-items: center; gap: 5px;
    margin-top: 10px; font-size: 12px; color: #4A6FD4; font-weight: 600;
    text-decoration: none;
  }

  /* Comparison */
  .compare-row {
    display: flex; gap: 8px; align-items: flex-start;
    padding: 10px 0; border-bottom: 1px solid #F5EAD8;
  }
  .compare-row:last-child { border-bottom: none; }
  .compare-label { font-size: 12px; color: #888; width: 80px; flex-shrink: 0; padding-top: 2px; }
  .compare-ai { flex: 1; font-size: 12px; font-weight: 600; color: ${deepBrown}; }
  .compare-web { flex: 1; font-size: 12px; color: #4A6FD4; font-weight: 600; }
  .match-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }

  .error-box { margin: 14px 20px 0; background: #FEE; border-radius: 12px; padding: 14px 16px; font-size: 13px; color: #C0392B; }

  .reset-btn {
    display: block; width: calc(100% - 40px); margin: 10px 20px 0;
    background: #fff; color: ${terracotta};
    border: 2px solid ${terracotta}; border-radius: 14px;
    padding: 13px; font-size: 14px; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: background 0.15s;
  }
  .reset-btn:hover { background: ${lightOrange}; }
`;

// ─── Helpers ───────────────────────────────────────────────

async function identifyFoodWithAI(base64Image, mimeType) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mimeType, data: base64Image }
          },
          {
            type: "text",
            text: `You are an expert in Indian cuisine and nutrition. Analyse this food image and respond ONLY with a JSON object (no markdown, no backticks) in this exact format:
{
  "foodName": "Name of the dish (e.g. Rajasthani Thali)",
  "confidence": "High / Medium / Low",
  "description": "2-sentence description of the dish",
  "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
  "wikiSearchTerm": "best Wikipedia search term for this dish",
  "nutrition": {
    "calories": 650,
    "protein": 22,
    "carbs": 85,
    "fat": 18,
    "fibre": 8,
    "servingSize": "1 plate (approx 500g)"
  },
  "isIndianFood": true
}`
          }
        ]
      }]
    })
  });
  const data = await response.json();
  const text = data.content.map(b => b.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

async function searchWikipedia(term) {
  // Step 1: search
  const searchRes = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&format=json&origin=*&srlimit=1`
  );
  const searchData = await searchRes.json();
  const topResult = searchData.query?.search?.[0];
  if (!topResult) return null;

  const title = topResult.title;

  // Step 2: get extract + thumbnail
  const pageRes = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=extracts|pageimages&exintro=true&exchars=400&piprop=thumbnail&pithumbsize=400&format=json&origin=*`
  );
  const pageData = await pageRes.json();
  const pages = pageData.query?.pages;
  const page = pages?.[Object.keys(pages)[0]];

  if (!page) return null;

  const extract = page.extract?.replace(/<[^>]*>/g, "").replace(/\n+/g, " ").trim() || "";
  const image = page.thumbnail?.source || null;
  const url = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

  return { title, extract, image, url };
}

function toBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("Read failed"));
    r.readAsDataURL(file);
  });
}

// ─── Component ──────────────────────────────────────────────

export default function App() {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [status, setStatus] = useState(null); // null | string
  const [aiResult, setAiResult] = useState(null);
  const [wikiResult, setWikiResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    setImageURL(URL.createObjectURL(file));
    setAiResult(null);
    setWikiResult(null);
    setError(null);
    setStatus(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const analyse = async () => {
    if (!imageFile) return;
    setLoading(true);
    setError(null);
    setAiResult(null);
    setWikiResult(null);

    try {
      setStatus("🔍 Reading your food photo with AI...");
      const base64 = await toBase64(imageFile);
      const ai = await identifyFoodWithAI(base64, imageFile.type);
      setAiResult(ai);

      setStatus("🌐 Searching Wikipedia for real-world data...");
      const wiki = await searchWikipedia(ai.wikiSearchTerm || ai.foodName);
      setWikiResult(wiki);

      setStatus(null);
    } catch (err) {
      setError("Something went wrong: " + err.message);
      setStatus(null);
    }
    setLoading(false);
  };

  const reset = () => {
    setImageFile(null);
    setImageURL(null);
    setAiResult(null);
    setWikiResult(null);
    setError(null);
    setStatus(null);
  };

  const matchColor = (a, b) => {
    if (!a || !b) return "#ccc";
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    if (isNaN(aNum) || isNaN(bNum)) return "#ccc";
    const diff = Math.abs(aNum - bNum) / Math.max(aNum, bNum);
    if (diff < 0.15) return softGreen;
    if (diff < 0.35) return saffron;
    return "#E74C3C";
  };

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">

        <div className="header">
          <div className="header-title">🍽 NutriDesi Vision</div>
          <div className="header-sub">Snap → AI Identifies → Web Verifies → You Know</div>
        </div>

        {/* Upload / Preview */}
        {!imageURL ? (
          <div
            className="upload-zone"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => inputRef.current.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={e => handleFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <div className="upload-icon">📸</div>
            <div className="upload-title">Upload or Snap a Food Photo</div>
            <div className="upload-sub">Thali, curry, snack — anything works</div>
          </div>
        ) : (
          <div className="preview-wrap">
            <img src={imageURL} className="preview-img" alt="Food preview" />
            <button className="change-btn" onClick={reset}>✕ Change</button>
          </div>
        )}

        {/* Analyse button */}
        {imageURL && !aiResult && (
          <button className="analyse-btn" onClick={analyse} disabled={loading}>
            {loading ? "Analysing..." : "🔬 Identify & Compare"}
          </button>
        )}

        {/* Status */}
        {status && (
          <div className="status-bar">
            <div className="spinner" />
            {status}
          </div>
        )}

        {/* Error */}
        {error && <div className="error-box">⚠️ {error}</div>}

        {/* Results */}
        {aiResult && (
          <div className="results">

            {/* AI Identification */}
            <div className="result-card">
              <div className="card-header">
                <span className="card-badge badge-ai">✦ AI Vision</span>
                <span className="card-title">What Claude Sees</span>
              </div>
              <div className="card-body">
                <div className="ai-food-name">{aiResult.foodName}</div>
                <div className="ai-confidence">
                  <span>●</span> {aiResult.confidence} Confidence
                </div>
                <div className="ai-desc">{aiResult.description}</div>
                {aiResult.ingredients?.length > 0 && (
                  <div className="ingredients-list">
                    {aiResult.ingredients.map(i => (
                      <span key={i} className="ingredient-tag">{i}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nutrition from AI */}
            {aiResult.nutrition && (
              <div className="result-card">
                <div className="card-header">
                  <span className="card-badge badge-nutrition">📊 Nutrition</span>
                  <span className="card-title">AI Estimated Values</span>
                </div>
                <div className="card-body">
                  <div style={{ fontSize: 11, color: "#aaa", marginBottom: 10 }}>
                    Per serving: {aiResult.nutrition.servingSize}
                  </div>
                  <div className="nutrition-grid">
                    <div className="nutrition-item nutrition-full">
                      <div className="nutrition-val">{aiResult.nutrition.calories}</div>
                      <div className="nutrition-unit">kcal</div>
                      <div className="nutrition-label">Calories</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-val">{aiResult.nutrition.protein}g</div>
                      <div className="nutrition-label">Protein</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-val">{aiResult.nutrition.carbs}g</div>
                      <div className="nutrition-label">Carbs</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-val">{aiResult.nutrition.fat}g</div>
                      <div className="nutrition-label">Fat</div>
                    </div>
                    <div className="nutrition-item">
                      <div className="nutrition-val">{aiResult.nutrition.fibre}g</div>
                      <div className="nutrition-label">Fibre</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Wikipedia result */}
            {wikiResult && (
              <div className="result-card">
                <div className="card-header">
                  <span className="card-badge badge-web">🌐 Wikipedia</span>
                  <span className="card-title">Real-World Data</span>
                </div>
                <div className="card-body">
                  {wikiResult.image && (
                    <img src={wikiResult.image} className="wiki-image" alt={wikiResult.title} />
                  )}
                  <div className="wiki-title">{wikiResult.title}</div>
                  <div className="wiki-extract">{wikiResult.extract}</div>
                  <a href={wikiResult.url} className="wiki-link" target="_blank" rel="noreferrer">
                    📖 Read full article →
                  </a>
                </div>
              </div>
            )}

            {/* Comparison */}
            {wikiResult && (
              <div className="result-card">
                <div className="card-header">
                  <span className="card-badge" style={{ background: "#F3E8FF", color: "#7B2FBE" }}>⚖️ Compare</span>
                  <span className="card-title">AI vs Web</span>
                </div>
                <div className="card-body">
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <span style={{ flex: 1, fontSize: 11, color: "#888" }}>Field</span>
                    <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: softGreen }}>AI Said</span>
                    <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: "#4A6FD4" }}>Web Found</span>
                    <span style={{ width: 8 }} />
                  </div>
                  {[
                    {
                      label: "Name",
                      ai: aiResult.foodName,
                      web: wikiResult.title,
                    },
                    {
                      label: "Calories",
                      ai: aiResult.nutrition?.calories + " kcal",
                      web: "See Wikipedia",
                    },
                    {
                      label: "Origin",
                      ai: aiResult.isIndianFood ? "Indian cuisine" : "Unknown",
                      web: wikiResult.extract?.includes("Indian") ? "Indian cuisine ✓" : "See article",
                    },
                  ].map(row => (
                    <div className="compare-row" key={row.label}>
                      <span className="compare-label">{row.label}</span>
                      <span className="compare-ai">{row.ai}</span>
                      <span className="compare-web">{row.web}</span>
                      <div className="match-dot" style={{
                        background: row.label === "Name"
                          ? (wikiResult.title?.toLowerCase().includes(aiResult.foodName?.split(" ")[0]?.toLowerCase()) ? softGreen : saffron)
                          : softGreen
                      }} />
                    </div>
                  ))}
                  <div style={{ marginTop: 12, padding: "10px 12px", background: "#F9F5FF", borderRadius: 10, fontSize: 12, color: "#7B2FBE" }}>
                    💡 <strong>Tip:</strong> AI nutrition estimates are based on typical recipes. Actual values vary by preparation.
                  </div>
                </div>
              </div>
            )}

            <button className="reset-btn" onClick={reset}>📸 Try Another Food</button>
          </div>
        )}

      </div>
    </>
  );
}
