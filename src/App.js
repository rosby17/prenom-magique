import { useState } from "react";

const LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const MAX_LETTERS = [3,4,5,6,7,8,9,10,11,12];

const THEMES = [
  { val: "", label: "Toutes thématiques", emoji: "✨" },
  { val: "bibliques", label: "Prénoms bibliques", emoji: "📖" },
  { val: "floraux", label: "Prénoms floraux", emoji: "🌸" },
  { val: "geeks", label: "Prénoms geeks", emoji: "🎮" },
  { val: "gourmands", label: "Prénoms gourmands", emoji: "🍰" },
  { val: "minéraux", label: "Prénoms minéraux", emoji: "💎" },
  { val: "mythologiques", label: "Prénoms mythologiques", emoji: "⚡" },
  { val: "BCBG", label: "Prénoms BCBG", emoji: "🎩" },
  { val: "composés", label: "Prénoms composés", emoji: "➕" },
  { val: "de la mer", label: "Prénoms de la mer", emoji: "🌊" },
  { val: "de séries TV", label: "Prénoms de séries TV", emoji: "📺" },
  { val: "rétro", label: "Prénoms Rétro", emoji: "🕰️" },
  { val: "rock'n'roll", label: "Prénoms rock'n'roll", emoji: "🎸" },
  { val: "royaux", label: "Prénoms rois et reines", emoji: "👑" },
];

const ORIGINS = [
  { val: "", label: "Toutes origines", emoji: "🌍" },
  { val: "américains", label: "Prénoms américains", emoji: "🇺🇸" },
  { val: "asiatiques", label: "Prénoms asiatiques", emoji: "🏯" },
  { val: "basques", label: "Prénoms basques", emoji: "🏔️" },
  { val: "corses", label: "Prénoms corses", emoji: "🏝️" },
  { val: "germaniques", label: "Prénoms germaniques", emoji: "🦅" },
  { val: "celtiques", label: "Prénoms celtiques", emoji: "🍀" },
  { val: "latins", label: "Prénoms latins", emoji: "🏛️" },
  { val: "médiévaux", label: "Prénoms médiévaux", emoji: "🏰" },
  { val: "nordiques", label: "Prénoms nordiques", emoji: "❄️" },
  { val: "orientaux", label: "Prénoms orientaux", emoji: "🌙" },
  { val: "provençaux", label: "Prénoms provençaux", emoji: "🌻" },
];

const PASTEL_CARDS = [
  "#FFE0EC","#FFE8D4","#FFF8D4","#D4F8E4","#D4EEFF",
  "#EDD4FF","#D4FFF4","#FFD4F8","#F4FFD4","#D4D4FF"
];

// 🔒 Appel sécurisé via la serverless function Vercel
async function callAPI(filters) {
  const { sexe, startLetter, maxLetters, theme, origin } = filters;
  const sexeLabel = sexe === "fille" ? "des filles" : sexe === "garcon" ? "des garçons" : "mixtes (filles et garçons)";

  let constraints = [];
  if (startLetter) constraints.push(`commençant par la lettre "${startLetter}"`);
  if (maxLetters) constraints.push(`d'au maximum ${maxLetters} lettres`);
  if (theme) constraints.push(`dans la thématique "${theme}"`);
  if (origin) constraints.push(`d'origine ${origin}`);

  const constraintStr = constraints.length > 0
    ? `Contraintes supplémentaires : ${constraints.join(", ")}.`
    : "";

  const prompt = `Tu es un expert passionné en prénoms, étymologie et onomastique française.

Ta mission : proposer exactement 10 prénoms ${sexeLabel} de grande qualité, beaux, élégants et porteurs de sens.
${constraintStr}

CRITÈRES DE QUALITÉ OBLIGATOIRES :
- Prénoms beaux phonétiquement, agréables à prononcer
- Variété : mélange de prénoms classiques intemporels, modernes tendance et originaux rares
- Évite absolument les prénoms trop banals (pas de Lucas, Emma, Léa, Hugo, Nathan, Chloé)
- Privilégie des prénoms avec une vraie histoire et une belle symbolique

Pour chaque prénom, fournis OBLIGATOIREMENT ces 5 champs :
1. "prenom" : le prénom avec la bonne capitalisation
2. "origine" : l'origine précise (ex: "Latin", "Grec ancien", "Hébreux biblique", "Celtique irlandais", "Norse viking", "Arabe classique")
3. "signification" : explication riche et poétique en 2-3 phrases complètes. Inclus le sens étymologique profond, la symbolique, les qualités associées à ce prénom et pourquoi il est beau pour un enfant.
4. "popularite" : exactement l'une de ces valeurs : "Classique intemporel", "Tendance montante", "Rare et original", "Vintage qui revient", "Moderne"
5. "celebres" : 1 ou 2 personnages célèbres ou fictifs portant ce prénom (ex: "Cléopâtre, reine d'Égypte · Léonard de Vinci")

Réponds UNIQUEMENT en JSON valide, sans markdown ni backticks, sans aucun texte avant ou après :
[{"prenom":"Nom","origine":"Origine précise","signification":"Explication riche 2-3 phrases","popularite":"Tendance","celebres":"Personnage célèbre"},...]`;

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  const text = data.text || "";
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

const FLOATIES = [
  {e:"⭐",x:4,y:6,s:20,d:0},{e:"🌙",x:89,y:4,s:26,d:0.6},
  {e:"☁️",x:14,y:16,s:30,d:1.1},{e:"🌈",x:81,y:18,s:24,d:0.8},
  {e:"✨",x:93,y:42,s:16,d:1.6},{e:"🎀",x:2,y:52,s:22,d:0.3},
  {e:"🌸",x:76,y:63,s:20,d:1.3},{e:"🌟",x:8,y:74,s:24,d:0.9},
  {e:"☁️",x:86,y:79,s:28,d:1.9},{e:"🦋",x:48,y:92,s:20,d:0.5},
  {e:"⭐",x:38,y:4,s:14,d:2.1},{e:"🎈",x:62,y:10,s:22,d:1.0},
];

function Floaties() {
  return <>{FLOATIES.map((f,i)=>(
    <div key={i} style={{
      position:"fixed",left:f.x+"%",top:f.y+"%",fontSize:f.s,
      pointerEvents:"none",userSelect:"none",opacity:0.45,zIndex:0,
      animation:`floatAnim ${3+(i%3)}s ease-in-out ${f.d}s infinite`
    }}>{f.e}</div>
  ))}</>;
}

function LoadingDots() {
  return <span style={{display:"inline-flex",gap:5,alignItems:"center"}}>
    {[0,1,2].map(i=>(
      <span key={i} style={{
        width:8,height:8,borderRadius:"50%",background:"white",display:"inline-block",
        animation:`bounceDot 0.9s ease-in-out ${i*0.15}s infinite`
      }}/>
    ))}
  </span>;
}

function SelectDropdown({ value, onChange, options }) {
  return (
    <div style={{position:"relative"}}>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{
        width:"100%",padding:"12px 40px 12px 16px",
        background:value?"#fff5fa":"white",
        border:value?"2.5px solid #ff85a1":"2.5px solid #f0daea",
        borderRadius:14,fontSize:14,
        color:value?"#444":"#aaa",
        outline:"none",cursor:"pointer",
        appearance:"none",WebkitAppearance:"none",
        fontFamily:"'Nunito',Georgia,sans-serif",fontWeight:600,
        transition:"all 0.2s",boxSizing:"border-box"
      }}>
        {options.map(opt=>(
          <option key={opt.val} value={opt.val}>
            {opt.emoji?`${opt.emoji}  ${opt.label}`:opt.label}
          </option>
        ))}
      </select>
      <span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"#bbb",pointerEvents:"none"}}>▼</span>
    </div>
  );
}

function Tag({ color, children }) {
  return (
    <span style={{
      padding:"4px 12px",borderRadius:50,
      background:`${color}22`,border:`1.5px solid ${color}88`,
      fontFamily:"'Nunito',Georgia,sans-serif",fontSize:12,
      fontWeight:700,color:color,display:"inline-flex",alignItems:"center",gap:4
    }}>{children}</span>
  );
}

export default function App() {
  const [sexe, setSexe] = useState("");
  const [startLetter, setStartLetter] = useState("");
  const [maxLetters, setMaxLetters] = useState("");
  const [theme, setTheme] = useState("");
  const [origin, setOrigin] = useState("");
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");
  const [expandedName, setExpandedName] = useState(null);
  const [confetti, setConfetti] = useState([]);

  const spawnConfetti = () => {
    const pieces = Array.from({length:20},(_,i)=>({
      id:Date.now()+i,x:Math.random()*100,
      color:PASTEL_CARDS[Math.floor(Math.random()*PASTEL_CARDS.length)],
      delay:Math.random()*0.7,size:Math.random()*10+6,
    }));
    setConfetti(pieces);
    setTimeout(()=>setConfetti([]),2800);
  };

  const generate = async () => {
    if (!sexe) return;
    setLoading(true); setGenerated(false); setError(""); setNames([]); setExpandedName(null);
    try {
      const result = await callAPI({ sexe, startLetter, maxLetters, theme, origin });
      setNames(result); setGenerated(true); spawnConfetti();
    } catch(e) {
      setError("Oups ! Une petite erreur s'est glissée. Réessaie ! 🙈");
    } finally { setLoading(false); }
  };

  const toggleFav = (name) => setFavorites(prev=>
    prev.includes(name)?prev.filter(n=>n!==name):[...prev,name]
  );

  const resetFilters = () => { setStartLetter(""); setMaxLetters(""); setTheme(""); setOrigin(""); };
  const hasFilters = startLetter || maxLetters || theme || origin;

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#fff5f9 0%,#f0f8ff 40%,#f5fff0 70%,#fffdf0 100%)",
      fontFamily:"'Georgia','Times New Roman',serif",
      position:"relative",overflow:"hidden",
      padding:"28px 16px 80px",
    }}>
      <Floaties/>
      {confetti.map(c=>(
        <div key={c.id} style={{
          position:"fixed",left:c.x+"%",top:"-20px",
          width:c.size,height:c.size,background:c.color,
          borderRadius:Math.random()>0.5?"50%":"3px",
          animation:`confettiFall 2.4s ease-in ${c.delay}s forwards`,
          zIndex:999,pointerEvents:"none",
        }}/>
      ))}

      <style>{`
        @keyframes floatAnim{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-14px) rotate(3deg)}}
        @keyframes bounceDot{0%,80%,100%{transform:scale(0.8) translateY(0)}40%{transform:scale(1.1) translateY(-8px)}}
        @keyframes pop{0%{transform:scale(0.75);opacity:0}70%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
        @keyframes slideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes confettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes heartPop{0%,100%{transform:scale(1)}30%{transform:scale(1.4)}60%{transform:scale(0.9)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .name-card:hover{transform:translateY(-2px) scale(1.01)!important;box-shadow:0 8px 24px rgba(0,0,0,0.08)!important;}
        .gen-btn:hover:not(:disabled){transform:translateY(-4px) scale(1.01)!important;box-shadow:0 14px 40px rgba(255,133,161,0.5)!important;}
        .gen-btn:active:not(:disabled){transform:scale(0.98)!important;}
        .letter-btn:hover{background:#ffe0ec!important;border-color:#ff85a1!important;transform:scale(1.1);}
        .reset-btn:hover{background:#fff0f5!important;}
      `}</style>

      <div style={{maxWidth:600,margin:"0 auto",position:"relative",zIndex:1}}>

        {/* HEADER */}
        <div style={{textAlign:"center",marginBottom:28,animation:"pop 0.55s ease"}}>
          <div style={{
            display:"inline-block",background:"white",borderRadius:60,
            padding:"16px 32px 12px",
            boxShadow:"0 8px 32px rgba(255,180,200,0.3),0 3px 0 #ffd0e0",
            border:"3px solid rgba(255,200,220,0.5)",marginBottom:10
          }}>
            <div style={{fontSize:46,marginBottom:4}}>👶</div>
            <h1 style={{
              margin:0,
              fontFamily:"'Fredoka One','Georgia',sans-serif",
              fontSize:"clamp(22px,5vw,34px)",letterSpacing:"0.03em",
              background:"linear-gradient(135deg,#ff85a1,#ffb347,#85d4ff)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1
            }}>Générateur de Prénoms</h1>
          </div>
          <p style={{
            fontFamily:"'Nunito',Georgia,sans-serif",
            color:"#b48fd4",fontSize:14,fontWeight:700,margin:0
          }}>✨ Découvrez le prénom idéal pour votre enfant !</p>
        </div>

        {/* FORM */}
        <div style={{
          background:"white",borderRadius:32,border:"3px solid #ffe0ec",
          padding:"28px 24px",marginBottom:20,
          boxShadow:"0 12px 48px rgba(255,150,180,0.15),0 4px 0 #ffd0e4",
          animation:"slideIn 0.5s ease 0.1s both",position:"relative",overflow:"hidden"
        }}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:6,background:"linear-gradient(90deg,#ff85a1,#ffb347,#ffe066,#85d4ff,#c385ff)"}}/>

          {/* Sexe */}
          <div style={{marginBottom:24}}>
            <label style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:16,color:"#e07aaa",marginBottom:12}}>
              <span style={{fontSize:20}}>🍼</span> Je cherche un prénom pour...
            </label>
            <div style={{display:"flex",gap:10}}>
              {[
                {val:"fille",label:"Fille",emoji:"👧",grad:"linear-gradient(135deg,#ff85a1,#ffb3c6)",shadow:"rgba(255,133,161,0.45)",border:"#ff85a1"},
                {val:"garcon",label:"Garçon",emoji:"👦",grad:"linear-gradient(135deg,#5bc0f8,#85d4ff)",shadow:"rgba(91,192,248,0.45)",border:"#5bc0f8"},
                {val:"mixte",label:"Mixte",emoji:"🌈",grad:"linear-gradient(135deg,#a78bfa,#c385ff)",shadow:"rgba(167,139,250,0.45)",border:"#a78bfa"},
              ].map(opt=>(
                <button key={opt.val} onClick={()=>setSexe(opt.val)} style={{
                  flex:1,padding:"14px 8px",borderRadius:18,
                  border:sexe===opt.val?`3px solid ${opt.border}`:"3px solid #f0e0ea",
                  background:sexe===opt.val?opt.grad:"#fafafa",
                  color:sexe===opt.val?"white":"#bbb",
                  cursor:"pointer",transition:"all 0.22s",
                  fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:14,
                  boxShadow:sexe===opt.val?`0 6px 20px ${opt.shadow}`:"none",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:5
                }}>
                  <span style={{fontSize:28}}>{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Letter */}
          <div style={{marginBottom:22}}>
            <label style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:15,color:"#e07aaa",marginBottom:10}}>
              <span style={{fontSize:18}}>🔤</span> Commençant par
              <span style={{fontFamily:"'Nunito',Georgia,sans-serif",fontSize:12,fontWeight:600,color:"#bbb"}}>(optionnel)</span>
            </label>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,padding:"14px",background:"#fafafa",borderRadius:16,border:"2px solid #f0e0ea"}}>
              {LETTERS.map(l=>(
                <button key={l} className="letter-btn" onClick={()=>setStartLetter(startLetter===l?"":l)} style={{
                  width:30,height:30,borderRadius:8,border:"none",cursor:"pointer",
                  background:startLetter===l?"#ff85a1":"white",
                  color:startLetter===l?"white":"#888",
                  fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:13,
                  transition:"all 0.15s",
                  boxShadow:startLetter===l?"0 3px 10px rgba(255,133,161,0.4)":"0 1px 3px rgba(0,0,0,0.08)",
                  fontWeight:700
                }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Max letters */}
          <div style={{marginBottom:22}}>
            <label style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:15,color:"#e07aaa",marginBottom:10}}>
              <span style={{fontSize:18}}>🔢</span> Nombre de lettres max
              <span style={{fontFamily:"'Nunito',Georgia,sans-serif",fontSize:12,fontWeight:600,color:"#bbb"}}>(optionnel)</span>
            </label>
            <SelectDropdown value={maxLetters} onChange={setMaxLetters}
              options={[{val:"",label:"Pas de limite",emoji:"♾️"},...MAX_LETTERS.map(n=>({val:String(n),label:`${n} lettres max`,emoji:n<=5?"🐣":n<=8?"🌱":"🌳"}))]}
            />
          </div>

          {/* Theme */}
          <div style={{marginBottom:22}}>
            <label style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:15,color:"#e07aaa",marginBottom:10}}>
              <span style={{fontSize:18}}>🎨</span> Thématique
              <span style={{fontFamily:"'Nunito',Georgia,sans-serif",fontSize:12,fontWeight:600,color:"#bbb"}}>(optionnel)</span>
            </label>
            <SelectDropdown value={theme} onChange={setTheme} options={THEMES}/>
          </div>

          {/* Origin */}
          <div style={{marginBottom:28}}>
            <label style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:15,color:"#e07aaa",marginBottom:10}}>
              <span style={{fontSize:18}}>🌍</span> Origine
              <span style={{fontFamily:"'Nunito',Georgia,sans-serif",fontSize:12,fontWeight:600,color:"#bbb"}}>(optionnel)</span>
            </label>
            <SelectDropdown value={origin} onChange={setOrigin} options={ORIGINS}/>
          </div>

          {/* Active filters */}
          {hasFilters && (
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:18,padding:"12px 14px",background:"#fff8fe",borderRadius:14,border:"2px dashed #f0d0ec"}}>
              <span style={{fontFamily:"'Nunito',Georgia,sans-serif",fontSize:12,fontWeight:700,color:"#c385ff",marginRight:4}}>Filtres actifs :</span>
              {startLetter && <Tag color="#ff85a1">Lettre {startLetter}</Tag>}
              {maxLetters && <Tag color="#ffb347">Max {maxLetters} lettres</Tag>}
              {theme && <Tag color="#85d4ff">{THEMES.find(t=>t.val===theme)?.emoji} {theme}</Tag>}
              {origin && <Tag color="#a78bfa">{ORIGINS.find(o=>o.val===origin)?.emoji} {origin}</Tag>}
              <button className="reset-btn" onClick={resetFilters} style={{
                marginLeft:"auto",padding:"3px 10px",borderRadius:8,
                border:"1.5px solid #ffd0e4",background:"white",
                color:"#e07aaa",fontSize:11,cursor:"pointer",
                fontFamily:"'Nunito',Georgia,sans-serif",fontWeight:700,transition:"all 0.15s"
              }}>✕ Réinitialiser</button>
            </div>
          )}

          {/* CTA */}
          <button className="gen-btn" onClick={generate} disabled={!sexe||loading} style={{
            width:"100%",padding:"18px",borderRadius:20,border:"none",
            background:sexe&&!loading?"linear-gradient(135deg,#ff85a1 0%,#ffb347 60%,#ff85a1 100%)":"#f5e0ea",
            color:sexe&&!loading?"white":"#cca0b8",
            fontSize:17,fontFamily:"'Fredoka One',Georgia,sans-serif",
            cursor:sexe&&!loading?"pointer":"not-allowed",
            transition:"all 0.3s ease",
            boxShadow:sexe&&!loading?"0 8px 28px rgba(255,133,161,0.45),0 3px 0 #e06080":"none",
            letterSpacing:"0.04em"
          }}>
            {loading
              ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12}}><LoadingDots/><span>La magie opère...</span></span>
              : <span>🌟 Générer les prénoms !</span>
            }
          </button>

          {error && (
            <div style={{marginTop:14,padding:"12px 16px",borderRadius:14,background:"#fff0f0",border:"2px solid #ffb3b3",color:"#e05050",fontSize:14,textAlign:"center",fontFamily:"'Nunito',Georgia,sans-serif",fontWeight:600}}>
              {error}
            </div>
          )}
        </div>

        {/* RESULTS */}
        {generated && names.length > 0 && (
          <div style={{animation:"slideIn 0.4s ease"}}>
            <div style={{background:"white",borderRadius:32,border:"3px solid #e8d4ff",padding:"26px 22px",boxShadow:"0 12px 40px rgba(180,140,255,0.15),0 4px 0 #d8c0ff",marginBottom:16}}>
              <div style={{textAlign:"center",marginBottom:22}}>
                <span style={{fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:18,color:"#c385ff",background:"#f5eeff",padding:"9px 24px",borderRadius:50,border:"2px solid #e8d4ff",display:"inline-block"}}>
                  🎀 {names.length} prénoms trouvés 🎀
                </span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {names.map((item,i)=>{
                  const cardColor=PASTEL_CARDS[i%PASTEL_CARDS.length];
                  const isFav=favorites.includes(item.prenom);
                  const isOpen=expandedName===item.prenom;
                  return (
                  <div key={item.prenom} className="name-card"
  onClick={()=>setExpandedName(isOpen?null:item.prenom)}
  style={{
    padding:"18px 20px", borderRadius:20, cursor:"pointer",
    background:isFav?"linear-gradient(135deg,#fff0f5,#f5f0ff)":`${cardColor}44`,
    border:isFav?"2.5px solid #ff85a1":`2.5px solid ${cardColor}`,
    transition:"all 0.2s ease",
    animation:`slideIn 0.4s ease ${i*0.06}s both`,
    boxShadow:isFav?"0 4px 16px rgba(255,133,161,0.2)":"none"
  }}
>
  {/* Header */}
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <div style={{flex:1}}>
      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:6}}>
        <span style={{fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:22,color:"#444"}}>
          {item.prenom}
        </span>
        {item.popularite && (
          <span style={{
            padding:"3px 10px", borderRadius:50, fontSize:10, fontWeight:800,
            fontFamily:"'Nunito',Georgia,sans-serif",
            background: item.popularite==="Rare et original"?"#f0e8ff":
                        item.popularite==="Tendance montante"?"#e8fff0":
                        item.popularite==="Vintage qui revient"?"#fff8e8":
                        item.popularite==="Moderne"?"#e8f4ff":"#f5f5f5",
            color: item.popularite==="Rare et original"?"#9b59b6":
                   item.popularite==="Tendance montante"?"#27ae60":
                   item.popularite==="Vintage qui revient"?"#e67e22":
                   item.popularite==="Moderne"?"#2980b9":"#888",
            border: item.popularite==="Rare et original"?"1.5px solid #c385ff":
                    item.popularite==="Tendance montante"?"1.5px solid #5bc0f8":
                    item.popularite==="Vintage qui revient"?"1.5px solid #ffb347":
                    item.popularite==="Moderne"?"1.5px solid #85d4ff":"1.5px solid #ddd",
          }}>
            {item.popularite==="Rare et original" ? "💎 Rare" :
             item.popularite==="Tendance montante" ? "📈 Tendance" :
             item.popularite==="Vintage qui revient" ? "🕰️ Vintage" :
             item.popularite==="Moderne" ? "✨ Moderne" : "⭐ Classique"}
          </span>
        )}
        {item.origine && (
          <span style={{padding:"3px 10px",borderRadius:50,background:"rgba(255,255,255,0.85)",border:"1.5px solid rgba(0,0,0,0.07)",fontFamily:"'Nunito',Georgia,sans-serif",fontSize:10,fontWeight:700,color:"#aaa"}}>
            🌍 {item.origine}
          </span>
        )}
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:10,marginLeft:10}}>
      <span style={{fontSize:10,color:"#ccc"}}>{isOpen?"▲":"▼"}</span>
      <button onClick={e=>{e.stopPropagation();toggleFav(item.prenom);}} style={{
        background:"none",border:"none",cursor:"pointer",fontSize:22,
        padding:"2px 3px",lineHeight:1,color:isFav?"#ff85a1":"#ddd",
        transition:"all 0.2s",animation:isFav?"heartPop 0.5s ease":"none"
      }}>{isFav?"💗":"🤍"}</button>
    </div>
  </div>

  {/* Détails au clic */}
  {isOpen && (
    <div style={{marginTop:12,animation:"fadeIn 0.3s ease"}}>
      <div style={{background:"rgba(255,255,255,0.75)",borderRadius:14,padding:"12px 14px",marginBottom:8}}>
        <div style={{fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:11,color:"#c385ff",marginBottom:6,letterSpacing:"0.06em"}}>
          ✨ SIGNIFICATION & ÉTYMOLOGIE
        </div>
        <p style={{margin:0,fontFamily:"'Nunito',Georgia,sans-serif",fontSize:13,fontWeight:600,color:"#666",lineHeight:1.7}}>
          {item.signification}
        </p>
      </div>
      {item.celebres && (
        <div style={{background:"rgba(255,255,255,0.75)",borderRadius:14,padding:"12px 14px"}}>
          <div style={{fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:11,color:"#ffb347",marginBottom:6,letterSpacing:"0.06em"}}>
            ⭐ PERSONNAGES CÉLÈBRES
          </div>
          <p style={{margin:0,fontFamily:"'Nunito',Georgia,sans-serif",fontSize:13,fontWeight:600,color:"#666",lineHeight:1.6}}>
            {item.celebres}
          </p>
        </div>
      )}
    </div>
  )}
</div>
                  );
                })}
              </div>
            </div>

            {favorites.length > 0 && (
              <div style={{background:"white",borderRadius:24,border:"3px solid #ffd0e4",padding:"20px 22px",boxShadow:"0 6px 24px rgba(255,180,200,0.2)",marginBottom:14,animation:"pop 0.3s ease"}}>
                <p style={{fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:16,color:"#ff85a1",margin:"0 0 14px",display:"flex",alignItems:"center",gap:8}}>
                  💗 Mes prénoms chouchous ({favorites.length})
                </p>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {favorites.map(name=>(
                    <span key={name} style={{padding:"8px 20px",borderRadius:50,background:"linear-gradient(135deg,#ffe0ec,#f5e0ff)",border:"2px solid #ffc0d8",fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:16,color:"#c06090"}}>{name}</span>
                  ))}
                </div>
              </div>
            )}

            <button onClick={generate} style={{
              width:"100%",padding:"15px",borderRadius:18,
              border:"2.5px dashed #c8a8e0",background:"white",color:"#c385ff",
              fontFamily:"'Fredoka One',Georgia,sans-serif",fontSize:16,cursor:"pointer",
              transition:"all 0.2s",letterSpacing:"0.03em"
            }}
              onMouseOver={e=>{e.currentTarget.style.background="#f8f0ff";e.currentTarget.style.borderColor="#a878d0";}}
              onMouseOut={e=>{e.currentTarget.style.background="white";e.currentTarget.style.borderColor="#c8a8e0";}}
            >🔄 Encore d'autres prénoms !</button>
          </div>
        )}

        <p style={{textAlign:"center",marginTop:44,fontFamily:"'Nunito',Georgia,sans-serif",fontWeight:700,fontSize:11,color:"#ddc0ee",letterSpacing:"0.08em"}}>
          PRÉNOM MAGIQUE ✨ PROPULSÉ PAR CLIVERS CREATIVE LTD
        </p>
      </div>
    </div>
  );
}
