import { useState, useRef, useEffect } from "react";

const DESTINATIONS = [
  {
    id: 1,
    name: "Bali, Indonésie",
    tag: "Paradis tropical",
    emoji: "🌴",
    price: "À partir de 899€",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    desc: "Temples ancestraux, rizières en terrasses et plages de rêve.",
  },
  {
    id: 2,
    name: "Kyoto, Japon",
    tag: "Culture & Zen",
    emoji: "⛩️",
    price: "À partir de 1 200€",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    desc: "Jardins Zen, cerisiers en fleurs et gastronomie raffinée.",
  },
  {
    id: 3,
    name: "Patagonie, Argentine",
    tag: "Aventure extrême",
    emoji: "🏔️",
    price: "À partir de 1 590€",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    desc: "Glaciers millénaires, condors et horizons sans limite.",
  },
  {
    id: 4,
    name: "Marrakech, Maroc",
    tag: "Couleurs & Saveurs",
    emoji: "🕌",
    price: "À partir de 549€",
    img: "https://images.unsplash.com/photo-1539020140153-e479b8f22986?w=800&q=80",
    desc: "Souks envoûtants, palais ocre et nuits étoilées au désert.",
  },
  {
    id: 5,
    name: "Islande",
    tag: "Aurores boréales",
    emoji: "🌌",
    price: "À partir de 1 050€",
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    desc: "Volcans actifs, geysers et ciel électrique en hiver.",
  },
  {
    id: 6,
    name: "Cappadoce, Turquie",
    tag: "Féérique & Unique",
    emoji: "🎈",
    price: "À partir de 720€",
    img: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80",
    desc: "Vol en montgolfière au lever du soleil sur des paysages lunaires.",
  },
];

const PLANS = [
  {
    name: "Découverte",
    price: "Gratuit",
    sub: "Pour toujours",
    color: "#a8a29e",
    features: ["5 messages IA / jour", "Accès démo chatbot", "Galerie destinations", "Quiz personnalisé"],
    cta: "Commencer gratuitement",
    highlight: false,
  },
  {
    name: "Explorer",
    price: "9,90€",
    sub: "/ mois",
    color: "#d4a853",
    features: ["Messages IA illimités", "Comparateur vols & hôtels", "Itinéraires personnalisés", "Alertes prix", "Support prioritaire"],
    cta: "Essai 7 jours gratuit",
    highlight: true,
  },
  {
    name: "Nomad",
    price: "24,90€",
    sub: "/ mois",
    color: "#7c9e87",
    features: ["Tout Explorer +", "Conciergerie 24/7", "IA multi-destinations", "Réservation intégrée", "Visa & assurance guidés"],
    cta: "Choisir Nomad",
    highlight: false,
  },
];

const QUIZ_QUESTIONS = [
  {
    q: "Quel type de voyage vous fait rêver ?",
    options: ["Plage & Détente", "Aventure & Nature", "Culture & Histoire", "Gastronomie & Luxe"],
  },
  {
    q: "Votre budget par personne ?",
    options: ["< 800€", "800–1500€", "1500–3000€", "> 3000€"],
  },
  {
    q: "Durée idéale ?",
    options: ["Week-end (2-3j)", "1 semaine", "2 semaines", "+ 1 mois"],
  },
  {
    q: "Vous voyagez ?",
    options: ["En solo", "En couple", "En famille", "Entre amis"],
  },
];

const RECO_MAP = {
  "0-0": DESTINATIONS[0], "0-1": DESTINATIONS[2], "0-2": DESTINATIONS[1], "0-3": DESTINATIONS[3],
  "1-0": DESTINATIONS[3], "1-1": DESTINATIONS[4], "1-2": DESTINATIONS[5], "1-3": DESTINATIONS[1],
  "2-0": DESTINATIONS[0], "2-1": DESTINATIONS[4], "2-2": DESTINATIONS[2], "2-3": DESTINATIONS[3],
  "3-0": DESTINATIONS[1], "3-1": DESTINATIONS[0], "3-2": DESTINATIONS[5], "3-3": DESTINATIONS[2],
};

function getRecommendation(answers) {
  const key = `${answers[0]}-${answers[1]}`;
  return RECO_MAP[key] || DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
}

export default function App() {
  const [page, setPage] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour ! 🌍 Je suis Aria, votre assistante voyage IA. Dites-moi où vous rêvez d'aller, je trouve les meilleures offres de vols, hôtels et locations pour vous !" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const MAX_FREE = 5;

  async function sendMessage() {
    if (!input.trim()) return;
    if (!isPremium && msgCount >= MAX_FREE) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "🔒 Vous avez atteint la limite de 5 messages gratuits. Passez à **Explorer** pour des conversations illimitées avec votre IA voyage personnelle !"
      }]);
      return;
    }

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setMsgCount(c => c + 1);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Tu es Aria, une assistante IA spécialisée dans le voyage de qualité. Tu aides les utilisateurs à trouver les meilleures destinations, vols, hôtels, locations Airbnb, activités et offres voyage.
          
Ton style : chaleureux, expert, enthousiaste, concis. Tu donnes des recommandations concrètes avec des fourchettes de prix réalistes.
Tu peux parler de : vols (compagnies low-cost vs premium), hôtels (boutique, chaînes, note Booking/TripAdvisor), locations (Airbnb, Vrbo), activités locales, itinéraires, meilleure période pour voyager, visa, assurances, conseils pratiques.
Si on te demande une destination précise, donne toujours : meilleure période, budget estimé, top 3 hôtels ou quartiers, activité incontournable.
Réponds en français, de façon structurée avec des emojis discrets.`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || "Désolée, une erreur s'est produite. Réessayez !";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "❌ Connexion impossible. Vérifiez votre connexion et réessayez." }]);
    }
    setLoading(false);
  }

  function handleQuizAnswer(optIndex) {
    const newAnswers = [...quizAnswers, optIndex];
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizAnswers(newAnswers);
      setQuizStep(s => s + 1);
    } else {
      setQuizResult(getRecommendation(newAnswers));
      setQuizAnswers(newAnswers);
      setQuizStep(QUIZ_QUESTIONS.length);
    }
  }

  function resetQuiz() {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizResult(null);
  }

  const navItems = [
    { id: "home", label: "Accueil" },
    { id: "destinations", label: "Destinations" },
    { id: "quiz", label: "Quiz" },
    { id: "pricing", label: "Abonnements" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0c0a09", color: "#f5f0eb", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1410; }
        ::-webkit-scrollbar-thumb { background: #d4a853; border-radius: 3px; }
        .nav-link { cursor: pointer; color: #a8a29e; transition: color 0.3s; font-family: 'DM Sans', sans-serif; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase; background: none; border: none; }
        .nav-link:hover, .nav-link.active { color: #d4a853; }
        .card { background: #1a1410; border: 1px solid #2a2218; border-radius: 16px; overflow: hidden; transition: transform 0.3s, border-color 0.3s; }
        .card:hover { transform: translateY(-6px); border-color: #d4a853; }
        .btn-gold { background: linear-gradient(135deg, #d4a853, #b8860b); color: #0c0a09; border: none; padding: 12px 28px; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; transition: opacity 0.2s, transform 0.2s; font-size: 14px; letter-spacing: 0.05em; }
        .btn-gold:hover { opacity: 0.9; transform: scale(1.02); }
        .btn-outline { background: transparent; color: #d4a853; border: 1px solid #d4a853; padding: 12px 28px; border-radius: 8px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .btn-outline:hover { background: #d4a853; color: #0c0a09; }
        .fade-in { animation: fadeIn 0.8s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .shine { background: linear-gradient(90deg, #d4a853, #f0c87a, #d4a853); background-size: 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shine 3s linear infinite; }
        @keyframes shine { 0% { background-position: 0% } 100% { background-position: 200% } }
        .chat-msg { animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0.4); } 50% { box-shadow: 0 0 0 10px rgba(212,168,83,0); } }
        input:focus { outline: none; }
        .tag { display: inline-block; background: rgba(212,168,83,0.15); color: #d4a853; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-family: 'DM Sans', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
        .quiz-opt { background: #1a1410; border: 1px solid #2a2218; border-radius: 10px; padding: 14px 18px; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; color: #c8c0b8; text-align: left; width: 100%; font-size: 15px; }
        .quiz-opt:hover { border-color: #d4a853; color: #d4a853; background: rgba(212,168,83,0.05); }
        .plan-card { border-radius: 20px; padding: 32px; transition: transform 0.3s; }
        .plan-card:hover { transform: translateY(-4px); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(12,10,9,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2a2218", padding: "0 4%" }}>
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>✈️</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#f5f0eb" }}>Voyageur<span style={{ color: "#d4a853" }}>IA</span></span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {navItems.map(n => (
              <button key={n.id} className={`nav-link ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>{n.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {!isPremium ? (
              <button className="btn-gold" style={{ padding: "8px 20px", fontSize: 13 }} onClick={() => { setPage("pricing"); }}>Essai gratuit</button>
            ) : (
              <span style={{ color: "#d4a853", fontFamily: "'DM Sans'", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>⭐ Explorer actif</span>
            )}
          </div>
        </div>
      </nav>

      {/* PAGES */}
      <div style={{ paddingTop: 64 }}>
        {page === "home" && <HomePage setPage={setPage} setChatOpen={setChatOpen} heroVisible={heroVisible} />}
        {page === "destinations" && <DestinationsPage setPage={setPage} setChatOpen={setChatOpen} />}
        {page === "quiz" && <QuizPage quizStep={quizStep} quizAnswers={quizAnswers} quizResult={quizResult} handleQuizAnswer={handleQuizAnswer} resetQuiz={resetQuiz} setChatOpen={setChatOpen} />}
        {page === "pricing" && <PricingPage setIsPremium={setIsPremium} isPremium={isPremium} />}
      </div>

      {/* CHAT WIDGET */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 200 }}>
        {!chatOpen && (
          <button className="pulse" onClick={() => setChatOpen(true)} style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #d4a853, #b8860b)", border: "none", cursor: "pointer", fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(212,168,83,0.4)" }}>
            🌍
          </button>
        )}
        {chatOpen && (
          <div style={{ width: 380, height: 520, background: "#14110e", border: "1px solid #2a2218", borderRadius: 20, display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", overflow: "hidden" }}>
            {/* Chat header */}
            <div style={{ background: "linear-gradient(135deg, #1a1410, #201810)", padding: "16px 20px", borderBottom: "1px solid #2a2218", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #d4a853, #b8860b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✈️</div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display'", fontSize: 15, color: "#f5f0eb" }}>Aria</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#7c9e87" }}>● En ligne — IA Voyage</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {!isPremium && <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#a8a29e" }}>{Math.max(0, MAX_FREE - msgCount)}/{MAX_FREE} msg</span>}
                <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: "#a8a29e", cursor: "pointer", fontSize: 18 }}>✕</button>
              </div>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((m, i) => (
                <div key={i} className="chat-msg" style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{
                    maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: m.role === "user" ? "linear-gradient(135deg, #d4a853, #b8860b)" : "#1e1a16",
                    color: m.role === "user" ? "#0c0a09" : "#d4cfc8",
                    fontFamily: "'DM Sans'", fontSize: 13.5, lineHeight: 1.5,
                    border: m.role === "assistant" ? "1px solid #2a2218" : "none",
                    whiteSpace: "pre-wrap"
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#1e1a16", borderRadius: 12, width: "fit-content", border: "1px solid #2a2218" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4a853", animation: `pulse ${0.6 + i * 0.2}s infinite` }} />
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {/* Input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #2a2218", display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Où voulez-vous voyager ?"
                style={{ flex: 1, background: "#1e1a16", border: "1px solid #2a2218", borderRadius: 10, padding: "10px 14px", color: "#f5f0eb", fontFamily: "'DM Sans'", fontSize: 13.5 }}
              />
              <button onClick={sendMessage} disabled={loading} style={{ background: "linear-gradient(135deg, #d4a853, #b8860b)", border: "none", borderRadius: 10, width: 42, cursor: "pointer", fontSize: 18, opacity: loading ? 0.6 : 1 }}>→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePage({ setPage, setChatOpen, heroVisible }) {
  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80') center/cover", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(212,168,83,0.08) 0%, rgba(12,10,9,0.95) 70%)" }} />
        <div style={{ position: "relative", width: "100%", padding: "0 4%", opacity: heroVisible ? 1 : 0, transition: "opacity 1s ease, transform 1s ease", transform: heroVisible ? "translateY(0)" : "translateY(30px)" }}>
          <div className="tag">Assistante IA Voyage · Nouvelle génération</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7vw, 90px)", lineHeight: 1.05, marginBottom: 24, maxWidth: 700 }}>
            Votre prochain voyage,<br /><span className="shine">sublimé par l'IA</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#a8a29e", maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
            Des hôtels d'exception aux vols les moins chers, Aria trouve les meilleures offres et construit votre itinéraire parfait.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setChatOpen(true)} style={{ fontSize: 15, padding: "14px 32px" }}>
              💬 Parler à Aria gratuitement
            </button>
            <button className="btn-outline" onClick={() => setPage("destinations")}>
              Explorer les destinations →
            </button>
          </div>
          <div style={{ marginTop: 60, display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[["10k+", "Voyageurs satisfaits"], ["150+", "Destinations couvertes"], ["24/7", "Assistance IA"], ["4.9★", "Note moyenne"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 28, color: "#d4a853" }}>{num}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#6b6460", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 4%", width: "100%" }}>
        <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 36, textAlign: "center", marginBottom: 12 }}>Comment ça marche</h2>
        <p style={{ textAlign: "center", color: "#6b6460", fontFamily: "'DM Sans'", marginBottom: 48 }}>Trois étapes pour le voyage de vos rêves</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {[["01", "Décrivez votre voyage", "Dites à Aria vos envies, budget, dates et préférences.", "🗣️"],
            ["02", "L'IA cherche pour vous", "Elle compare des milliers d'offres de vols, hôtels et locations en temps réel.", "🔍"],
            ["03", "Réservez en confiance", "Accédez aux meilleures offres sélectionnées et personnalisées.", "✅"]].map(([num, title, desc, icon]) => (
            <div key={num} style={{ background: "#111009", border: "1px solid #2a2218", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Playfair Display'", fontSize: 48, color: "#1e1a14", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 20, marginBottom: 10, color: "#f5f0eb" }}>{title}</h3>
              <p style={{ fontFamily: "'DM Sans'", color: "#6b6460", lineHeight: 1.6, fontSize: 14 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP DESTINATIONS PREVIEW */}
      <section style={{ padding: "0 4% 80px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 32 }}>Destinations populaires</h2>
          <button className="btn-outline" onClick={() => setPage("destinations")} style={{ padding: "8px 20px", fontSize: 13 }}>Voir toutes →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {DESTINATIONS.slice(0, 3).map(d => <DestCard key={d.id} d={d} />)}
        </div>
      </section>
    </div>
  );
}

function DestCard({ d }) {
  return (
    <div className="card" style={{ cursor: "default" }}>
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,10,9,0.8) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: 14, left: 14 }}>
          <div className="tag">{d.tag}</div>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 20, color: "#fff", marginTop: 4 }}>{d.emoji} {d.name}</div>
        </div>
      </div>
      <div style={{ padding: "16px 20px 20px" }}>
        <p style={{ fontFamily: "'DM Sans'", color: "#6b6460", fontSize: 13.5, lineHeight: 1.6, marginBottom: 14 }}>{d.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Playfair Display'", color: "#d4a853", fontSize: 16 }}>{d.price}</span>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#4a4440" }}>vol + hôtel</span>
        </div>
      </div>
    </div>
  );
}

function DestinationsPage({ setChatOpen }) {
  const [filter, setFilter] = useState("Tous");
  const filters = ["Tous", "Plage", "Aventure", "Culture", "Nature"];
  return (
    <div style={{ width: "100%", padding: "60px 4%" }}>
      <div style={{ marginBottom: 48 }}>
        <div className="tag">Catalogue</div>
        <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 48, marginBottom: 12 }}>Nos destinations</h1>
        <p style={{ fontFamily: "'DM Sans'", color: "#6b6460", fontSize: 16 }}>Demandez à Aria de planifier l'une de ces destinations pour vous.</p>
        <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? "#d4a853" : "transparent", color: filter === f ? "#0c0a09" : "#a8a29e", border: "1px solid", borderColor: filter === f ? "#d4a853" : "#2a2218", borderRadius: 20, padding: "6px 18px", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 13, transition: "all 0.2s" }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
        {DESTINATIONS.map(d => <DestCard key={d.id} d={d} />)}
      </div>
      <div style={{ marginTop: 60, background: "linear-gradient(135deg, #1a1410, #14110d)", border: "1px solid #d4a853", borderRadius: 20, padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>✈️</div>
        <h3 style={{ fontFamily: "'Playfair Display'", fontSize: 26, marginBottom: 10 }}>Vous ne trouvez pas votre destination ?</h3>
        <p style={{ fontFamily: "'DM Sans'", color: "#6b6460", marginBottom: 24 }}>Aria peut planifier n'importe quelle destination dans le monde.</p>
        <button className="btn-gold" onClick={() => setChatOpen(true)}>Demander à Aria →</button>
      </div>
    </div>
  );
}

function QuizPage({ quizStep, quizAnswers, quizResult, handleQuizAnswer, resetQuiz, setChatOpen }) {
  const progress = (quizStep / QUIZ_QUESTIONS.length) * 100;
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 5%" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="tag">Personnalisation</div>
        <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 42, marginBottom: 12 }}>Votre voyage idéal</h1>
        <p style={{ fontFamily: "'DM Sans'", color: "#6b6460" }}>Répondez à 4 questions, l'IA vous recommande la destination parfaite.</p>
      </div>

      {quizStep < QUIZ_QUESTIONS.length && !quizResult && (
        <div className="fade-in">
          <div style={{ background: "#1a1410", borderRadius: 8, height: 6, marginBottom: 32, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #d4a853, #f0c87a)", borderRadius: 8, transition: "width 0.4s" }} />
          </div>
          <div style={{ fontFamily: "'DM Sans'", color: "#6b6460", fontSize: 13, marginBottom: 8 }}>Question {quizStep + 1} / {QUIZ_QUESTIONS.length}</div>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, marginBottom: 28, lineHeight: 1.3 }}>{QUIZ_QUESTIONS[quizStep].q}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
              <button key={i} className="quiz-opt" onClick={() => handleQuizAnswer(i)}>{opt}</button>
            ))}
          </div>
        </div>
      )}

      {quizResult && (
        <div className="fade-in" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>{quizResult.emoji}</div>
          <div className="tag" style={{ marginBottom: 8 }}>Votre destination idéale</div>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 36, marginBottom: 8 }}>{quizResult.name}</h2>
          <p style={{ fontFamily: "'DM Sans'", color: "#6b6460", marginBottom: 24, fontSize: 15 }}>{quizResult.desc}</p>
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 28 }}>
            <img src={quizResult.img} alt={quizResult.name} style={{ width: "100%", height: 240, objectFit: "cover" }} />
          </div>
          <div style={{ background: "#1a1410", border: "1px solid #2a2218", borderRadius: 12, padding: "16px 20px", marginBottom: 28, textAlign: "left" }}>
            <div style={{ fontFamily: "'DM Sans'", color: "#6b6460", fontSize: 13, marginBottom: 4 }}>Offre personnalisée</div>
            <div style={{ fontFamily: "'Playfair Display'", color: "#d4a853", fontSize: 22 }}>{quizResult.price}</div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button className="btn-gold" onClick={() => setChatOpen(true)}>Planifier avec Aria 🗺️</button>
            <button className="btn-outline" onClick={resetQuiz}>Recommencer</button>
          </div>
        </div>
      )}
    </div>
  );
}

function PricingPage({ setIsPremium, isPremium }) {
  const [activated, setActivated] = useState(null);
  function activate(plan) {
    setActivated(plan);
    if (plan !== "Découverte") setIsPremium(true);
  }
  return (
    <div style={{ width: "100%", padding: "60px 4%" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div className="tag">Abonnements</div>
        <h1 style={{ fontFamily: "'Playfair Display'", fontSize: 48, marginBottom: 12 }}>Voyagez sans limites</h1>
        <p style={{ fontFamily: "'DM Sans'", color: "#6b6460", fontSize: 16 }}>Commencez gratuitement, passez Premium quand vous voulez.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {PLANS.map(plan => (
          <div key={plan.name} className="plan-card" style={{ background: plan.highlight ? "linear-gradient(135deg, #1e1810, #2a2015)" : "#111009", border: `2px solid ${plan.highlight ? plan.color : "#2a2218"}`, position: "relative" }}>
            {plan.highlight && (
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#d4a853", color: "#0c0a09", padding: "4px 16px", borderRadius: 20, fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>⭐ Plus populaire</div>
            )}
            <div style={{ fontFamily: "'DM Sans'", color: plan.color, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{plan.name}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: "'Playfair Display'", fontSize: 42, color: "#f5f0eb" }}>{plan.price}</span>
              <span style={{ fontFamily: "'DM Sans'", color: "#6b6460", fontSize: 14 }}>{plan.sub}</span>
            </div>
            <div style={{ borderTop: "1px solid #2a2218", marginTop: 20, paddingTop: 20, marginBottom: 24 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontFamily: "'DM Sans'", fontSize: 14, color: "#c8c0b8" }}>
                  <span style={{ color: plan.color, fontSize: 16 }}>✓</span> {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => activate(plan.name)}
              style={{ width: "100%", padding: "13px", borderRadius: 10, border: `1px solid ${plan.color}`, background: activated === plan.name ? plan.color : (plan.highlight ? plan.color : "transparent"), color: activated === plan.name ? "#0c0a09" : (plan.highlight ? "#0c0a09" : plan.color), fontFamily: "'DM Sans'", fontSize: 14, cursor: "pointer", transition: "all 0.2s", fontWeight: 500 }}
            >
              {activated === plan.name ? "✓ Activé !" : plan.cta}
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 60, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {[["🔒", "Paiement sécurisé", "SSL 256-bit, données protégées"], ["↩️", "Annulation libre", "Sans engagement, résiliez à tout moment"], ["🌍", "Support multilingue", "Assistance en 12 langues"], ["⚡", "IA temps réel", "Réponses instantanées 24h/24"]].map(([icon, title, desc]) => (
          <div key={title} style={{ background: "#111009", border: "1px solid #2a2218", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontFamily: "'Playfair Display'", fontSize: 15, marginBottom: 4 }}>{title}</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#6b6460" }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}