// app/share/page.js
'use client'
import { useSearchParams } from 'next/navigation'
import { decodeShareUrl } from '@/lib/share'
import { Suspense } from 'react'

const PASTEL_CARDS = [
  '#FFE0EC','#FFE8D4','#FFF8D4','#D4F8E4','#D4EEFF','#EDD4FF',
  '#D4FFF4','#FFD4F8','#F4FFD4','#D4D4FF',
]

function ShareContent() {
  const params  = useSearchParams()
  const encoded = params.get('d') || ''
  const names   = decodeShareUrl(encoded)

  if (!names.length) return (
    <div style={{textAlign:'center',padding:60,fontFamily:"'Fredoka One',sans-serif",color:'#e07aaa',fontSize:20}}>
      Liste introuvable 😢
    </div>
  )

  return (
    <div style={{minHeight:'100vh',
      background:'linear-gradient(160deg,#fff5f9 0%,#f0f8ff 40%,#f5fff0 100%)',
      padding:'40px 20px',fontFamily:"'Georgia',serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');`}</style>
      <div style={{maxWidth:520,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:48,marginBottom:8}}>👶</div>
          <h1 style={{fontFamily:"'Fredoka One',sans-serif",fontSize:28,
            background:'linear-gradient(135deg,#ff85a1,#ffb347,#85d4ff)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:0}}>
            Liste de prénoms partagée
          </h1>
          <p style={{fontFamily:"'Nunito',sans-serif",color:'#b48fd4',fontSize:14,fontWeight:700,marginTop:8}}>
            ✨ {names.length} prénoms sélectionnés avec amour
          </p>
        </div>

        <div style={{background:'white',borderRadius:28,border:'3px solid #e8d4ff',padding:'24px 20px',
          boxShadow:'0 12px 40px rgba(180,140,255,0.15)'}}>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {names.map((item,i)=>(
              <div key={i} style={{padding:'16px 18px',borderRadius:16,
                background:`${PASTEL_CARDS[i%PASTEL_CARDS.length]}55`,
                border:`2px solid ${PASTEL_CARDS[i%PASTEL_CARDS.length]}`}}>
                <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                  <span style={{fontFamily:"'Fredoka One',sans-serif",fontSize:20,color:'#444'}}>{item.prenom}</span>
                  {item.origine && (
                    <span style={{padding:'2px 8px',borderRadius:50,background:'rgba(255,255,255,0.9)',
                      border:'1.5px solid rgba(0,0,0,0.08)',
                      fontFamily:"'Nunito',sans-serif",fontSize:11,fontWeight:700,color:'#999'}}>
                      {item.origine}
                    </span>
                  )}
                </div>
                {item.signification && (
                  <p style={{margin:'6px 0 0',fontFamily:"'Nunito',sans-serif",
                    fontSize:13,fontWeight:600,color:'#9a7ab8',fontStyle:'italic'}}>
                    💫 {item.signification}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:'center',marginTop:24}}>
          <a href="/" style={{display:'inline-block',padding:'14px 32px',borderRadius:20,
            background:'linear-gradient(135deg,#ff85a1,#ffb347)',color:'white',
            fontFamily:"'Fredoka One',sans-serif",fontSize:16,textDecoration:'none',
            boxShadow:'0 8px 24px rgba(255,133,161,0.4)'}}>
            ✨ Créer ma propre liste
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SharePage() {
  return <Suspense><ShareContent/></Suspense>
}
