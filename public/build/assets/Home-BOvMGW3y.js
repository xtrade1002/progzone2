import{u as _,j as e,H as y,r as x}from"./app-CKbNX6-b.js";import{u as k,L as j,l as z}from"./Layout-Cdt1j-L9.js";import"./react-CjZsb-BP.js";const v=[{title:"Webdesign",text:"Egyedi, modern és reszponzív design, ami kiemel a versenytársak közül.",icon:"M5 6h14v9H5z M9 19h6 M12 15v4 M15 4l5-2-2 5-8 8H8v-2l7-9z"},{title:"Webshop készítés",text:"Professzionális webshop WooCommerce vagy egyedi megoldásokkal.",icon:"M6 6h15l-2 8H8L6 3H3 M9 20h.01 M18 20h.01"},{title:"Webfejlesztés",text:"HTML, CSS, JavaScript, PHP és Laravel alapú fejlesztések.",icon:"M8 8 4 12l4 4 M16 8l4 4-4 4 M14 5l-4 14"},{title:"SEO & Marketing",text:"Keresőoptimalizálás és online marketing a jobb helyezésekért.",icon:"M12 3c3.2 1.2 5.2 3.5 6 7-3.5.8-5.8 2.8-7 6-3.2-1.2-5.2-3.5-6-7 3.5-.8 5.8-2.8 7-6z"},{title:"Online Marketing",text:"Célzott kampányok, Google Ads, Facebook és Instagram hirdetések.",icon:"M4 12h4l9-5v10l-9-5H4z M18 9c1.5 1.5 1.5 4.5 0 6"},{title:"Támogatás & Karbantartás",text:"Folyamatos támogatás, frissítések és biztonsági karbantartás.",icon:"M5 13a7 7 0 0 1 14 0v4a2 2 0 0 1-2 2h-2v-6h4 M5 13h4v6H7a2 2 0 0 1-2-2z"}],N=({path:i})=>e.jsx("svg",{className:"h-12 w-12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:i.split(" M").map((a,p)=>e.jsx("path",{d:p===0?a:`M${a}`},p))}),u=v.map(i=>i.icon),M=({words:i})=>{const a=x.useMemo(()=>i.filter(l=>typeof l=="string"&&l.trim().length>0),[i]),[p,b]=x.useState(0),[o,r]=x.useState(0),[s,g]=x.useState(!1);if(x.useEffect(()=>{if(a.length===0)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){r(Array.from(a[0]).length);return}const f=Array.from(a[p]).length,m=!s&&o===f,d=s&&o===0,n=m?1250:d?260:s?46:78,w=window.setTimeout(()=>{if(m){g(!0);return}if(d){g(!1),b(t=>(t+1)%a.length);return}r(t=>t+(s?-1:1))},n);return()=>window.clearTimeout(w)},[s,o,a,p]),a.length===0)return null;const h=Array.from(a[p]).slice(0,o).join("");return e.jsxs("div",{className:"pz-home-typewriter","aria-live":"polite",children:[e.jsx("span",{className:"pz-home-typewriter__prompt","aria-hidden":"true",children:">"}),e.jsx("span",{className:"pz-home-typewriter__text",children:h}),e.jsx("span",{className:"pz-home-typewriter__cursor","aria-hidden":"true"})]})};function C(){const{locale:i,trans:a,t:p}=k(),{props:b}=_(),o=b?.localizedRoutes,r=a?.home??{},s=Array.isArray(r.paragraphs)?r.paragraphs:[],g=Array.isArray(r.typewriter)?r.typewriter:["Webshop készítés","Weboldal készítés","Online marketing","Egyedi fejlesztés"],h=r.hero_title??{},l=r.hero_actions??{},f=Array.isArray(r.chips)?r.chips:["Modern design","Gyors betÃ¶ltÃ©s","MobilbarÃ¡t"],m=(Array.isArray(r.service_items)&&r.service_items.length>0?r.service_items:v).map((t,c)=>({...t,icon:u[c]??u[0]})),d=r.services_title??{},n=r.why??{},w=Array.isArray(n.items)?n.items:["Egyedi, igÃ©nyre szabott megoldÃ¡sok","Gyors Ã©s megbÃ­zhatÃ³ munkavÃ©gzÃ©s","Korrekt Ã¡rak, rejtett kÃ¶ltsÃ©gek nÃ©lkÃ¼l","TÃ¶bb Ã©ves tapasztalat","Teljes kÃ¶rÅ± Ã¼gyfÃ©ltÃ¡mogatÃ¡s"];return e.jsxs(j,{children:[e.jsx(y,{title:r.meta_title??p("menu.home","Home")}),e.jsx("style",{children:`
        :root {
          --pz-pink: #ff007a;
          --pz-cyan: #00f7ff;
          --pz-dark: #050812;
        }

        body {
          background: #050812;
        }

        .pz-home-page {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 78% 10%, rgba(255, 0, 122, 0.22), transparent 28%),
            radial-gradient(circle at 18% 46%, rgba(0, 247, 255, 0.16), transparent 34%),
            linear-gradient(180deg, #030611 0%, #050812 45%, #030611 100%);
          color: white;
        }

        .pz-home-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 247, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 122, 0.04) 1px, transparent 1px);
          background-size: 58px 58px;
          opacity: 0.65;
          pointer-events: none;
        }

        .pz-home-hero {
          position: relative;
          overflow: hidden;
          min-height: 760px;
          border-bottom: 1px solid rgba(255, 0, 122, 0.5);
        }

        .pz-home-hero__inner,
        .pz-home-section {
          position: relative;
          z-index: 5;
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .pz-home-hero__inner {
          min-height: 760px;
          display: grid;
          grid-template-columns: 1fr 0.95fr;
          align-items: center;
          gap: 48px;
          padding: 70px 0 110px;
        }

        .pz-neon-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 21px;
          border: 1px solid var(--pz-pink);
          border-radius: 999px;
          color: #fff;
          background: rgba(255, 0, 122, 0.08);
          box-shadow: 0 0 16px rgba(255, 0, 122, 0.75), inset 0 0 16px rgba(255, 0, 122, 0.16);
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.04em;
        }

        .pz-home-hero__title {
          margin-top: 28px;
          color: #fff;
          font-size: clamp(48px, 6.6vw, 88px);
          line-height: 0.98;
          font-weight: 1000;
          letter-spacing: -0.065em;
        }

        .pz-home-hero__title span {
          display: block;
        }

        .pz-home-hero__title strong,
        .pz-pink {
          color: var(--pz-pink);
          text-shadow: 0 0 18px rgba(255, 0, 122, 0.9), 0 0 44px rgba(255, 0, 122, 0.42);
        }

        .pz-home-typewriter {
          margin-top: 28px;
          width: min(680px, 100%);
          min-height: 70px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 24px;
          border-radius: 18px;
          border: 1px solid rgba(0, 247, 255, 0.9);
          background: linear-gradient(90deg, rgba(255, 0, 122, 0.18), rgba(0, 247, 255, 0.04)), rgba(3, 8, 18, 0.82);
          box-shadow: 0 0 22px rgba(0, 247, 255, 0.35), inset 0 0 22px rgba(255, 0, 122, 0.08);
          color: var(--pz-cyan);
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 1000;
          text-shadow: 0 0 16px rgba(0, 247, 255, 0.82);
          backdrop-filter: blur(14px);
        }

        .pz-home-typewriter__prompt {
          color: var(--pz-pink);
        }

        .pz-home-typewriter__cursor {
          width: 3px;
          height: 34px;
          background: var(--pz-cyan);
          box-shadow: 0 0 16px rgba(0, 247, 255, 1);
          animation: pzBlink 0.9s steps(2, start) infinite;
        }

        @keyframes pzBlink {
          50% { opacity: 0; }
        }

        .pz-home-hero__lead {
          margin-top: 24px;
          max-width: 620px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 21px;
          line-height: 1.55;
          font-weight: 700;
        }

        .pz-home-hero__actions,
        .pz-home-hero__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
        }

        .pz-home-hero__actions {
          margin-top: 38px;
        }

        .pz-home-hero__chips {
          margin-top: 34px;
        }

        .pz-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 58px;
          padding: 0 30px;
          border-radius: 16px;
          background: linear-gradient(135deg, #ff1689, #ff007a);
          color: #fff;
          font-weight: 1000;
          text-transform: uppercase;
          box-shadow: 0 0 20px rgba(255, 0, 122, 0.78), 0 0 48px rgba(255, 0, 122, 0.32);
          transition: 0.25s ease;
        }

        .pz-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 26px rgba(255, 0, 122, 1), 0 0 64px rgba(255, 0, 122, 0.48);
        }

        .pz-button-secondary {
          background: rgba(0, 247, 255, 0.05);
          border: 1px solid rgba(0, 247, 255, 0.9);
          color: var(--pz-cyan);
          box-shadow: 0 0 18px rgba(0, 247, 255, 0.45), inset 0 0 20px rgba(0, 247, 255, 0.08);
        }

        .pz-home-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          background: rgba(8, 12, 26, 0.78);
          backdrop-filter: blur(14px);
          font-size: 14px;
          font-weight: 800;
        }

        .pz-home-chip__icon {
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          color: var(--pz-pink);
          border: 1px solid var(--pz-pink);
          box-shadow: 0 0 14px rgba(255, 0, 122, 0.7);
        }

        .pz-home-chip__icon.is-cyan {
          color: var(--pz-cyan);
          border-color: var(--pz-cyan);
          box-shadow: 0 0 14px rgba(0, 247, 255, 0.7);
        }

        .pz-home-hero__visual {
          position: relative;
          min-height: 610px;
          display: grid;
          place-items: center;
        }

        .pz-hero-geometry {
          position: absolute;
          width: 118%;
          max-width: 680px;
          right: -9%;
          top: 0;
          bottom: 0;
          margin: auto 0;
          overflow: visible;
          filter: drop-shadow(0 0 12px rgba(255, 0, 122, 1)) drop-shadow(0 0 28px rgba(0, 247, 255, 0.55));
        }

        .pz-hero-geometry__stroke {
          fill: none;
          stroke-width: 6;
          stroke-linejoin: round;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
        }

        .pz-hero-geometry__stroke--pink {
          stroke: var(--pz-pink);
        }

        .pz-hero-geometry__stroke--cyan {
          stroke: var(--pz-cyan);
        }

        .pz-home-portrait-frame {
          position: relative;
          z-index: 3;
          width: min(430px, 88vw);
          height: 610px;
          overflow: hidden;
          border-radius: 30px;
          border: 1px solid rgba(255, 0, 122, 0.65);
          background: rgba(0, 0, 0, 0.45);
          box-shadow: 0 0 30px rgba(255, 0, 122, 0.6), 0 0 56px rgba(0, 247, 255, 0.22);
          transform: perspective(900px) rotateY(-5deg);
        }

        .pz-home-hero__portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .pz-hero-light-trails,
        .pz-hero-waves,
        .pz-services-light {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .pz-hero-light-trails {
          z-index: 2;
          opacity: 0.75;
        }

        .pz-hero-waves {
          top: auto;
          bottom: -2px;
          z-index: 4;
          height: 190px;
        }

        .pz-neon-path,
        .pz-neon-wave {
          fill: none;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
        }

        .pz-neon-path {
          stroke-width: 2.8;
        }

        .pz-neon-wave {
          stroke-width: 3;
        }

        .pz-cyan-stroke {
          stroke: var(--pz-cyan);
          filter: drop-shadow(0 0 8px rgba(0, 247, 255, 1)) drop-shadow(0 0 20px rgba(0, 247, 255, 0.75));
        }

        .pz-pink-stroke {
          stroke: var(--pz-pink);
          filter: drop-shadow(0 0 8px rgba(255, 0, 122, 1)) drop-shadow(0 0 20px rgba(255, 0, 122, 0.75));
        }

        .pz-services {
          position: relative;
          overflow: hidden;
          padding: 82px 0 88px;
        }

        .pz-services-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }

        .pz-service-card {
          position: relative;
          min-height: 300px;
          padding: 26px 18px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background:
            radial-gradient(circle at 50% 0%, rgba(255, 0, 122, 0.20), transparent 40%),
            linear-gradient(180deg, rgba(11, 18, 34, 0.92), rgba(5, 8, 18, 0.95));
          border: 1px solid rgba(255, 0, 122, 0.58);
          box-shadow: 0 0 20px rgba(255, 0, 122, 0.38), inset 0 0 28px rgba(255, 255, 255, 0.035);
          transition: 0.25s ease;
        }

        .pz-service-card:nth-child(even) {
          border-color: rgba(0, 247, 255, 0.62);
          box-shadow: 0 0 20px rgba(0, 247, 255, 0.36), inset 0 0 28px rgba(255, 255, 255, 0.035);
        }

        .pz-service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 30px rgba(255, 0, 122, 0.55), 0 0 34px rgba(0, 247, 255, 0.25);
        }

        .pz-service-card__icon {
          display: grid;
          place-items: center;
          width: 74px;
          height: 74px;
          margin: 0 auto;
          color: var(--pz-pink);
          filter: drop-shadow(0 0 14px rgba(255, 0, 122, 0.9));
        }

        .pz-service-card:nth-child(even) .pz-service-card__icon {
          color: var(--pz-cyan);
          filter: drop-shadow(0 0 14px rgba(0, 247, 255, 0.9));
        }

        .pz-service-card h3 {
          margin-top: 16px;
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          line-height: 1.1;
          font-weight: 1000;
        }

        .pz-service-card p {
          margin-top: 14px;
          margin-bottom: 24px;
          color: rgba(255,255,255,.82);
          font-size: 14px;
          line-height: 1.55;
        }

        .pz-card-button {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border: 1px solid currentColor;
          border-radius: 999px;
          padding: 9px 18px;
          color: var(--pz-pink);
          font-size: 13px;
          font-weight: 1000;
          text-transform: uppercase;
          box-shadow: 0 0 14px rgba(255, 0, 122, 0.45);
        }

        .pz-service-card:nth-child(even) .pz-card-button {
          color: var(--pz-cyan);
          box-shadow: 0 0 14px rgba(0, 247, 255, 0.45);
        }

        .pz-why {
          position: relative;
          margin-top: 34px;
          display: grid;
          grid-template-columns: minmax(300px, 0.78fr) minmax(560px, 1.42fr);
          gap: 36px;
          align-items: center;
          min-height: 430px;
          overflow: hidden;
          isolation: isolate;
        }

        .pz-why::before {
          content: "";
          position: absolute;
          inset: 8% -6% -2% 38%;
          z-index: -1;
          background:
            radial-gradient(circle at 62% 42%, rgba(255, 0, 122, 0.28), transparent 30%),
            radial-gradient(circle at 80% 68%, rgba(0, 247, 255, 0.22), transparent 32%),
            linear-gradient(125deg, transparent, rgba(0, 247, 255, 0.08), rgba(255, 0, 122, 0.10));
          filter: blur(22px);
        }

        .pz-why h2 {
          margin-top: 12px;
          font-size: clamp(34px, 4vw, 52px);
          line-height: 1;
          font-weight: 1000;
          letter-spacing: -0.045em;
        }

        .pz-check-list {
          margin-top: 26px;
          display: grid;
          gap: 14px;
        }

        .pz-check-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,.9);
          font-size: 17px;
          font-weight: 700;
        }

        .pz-check {
          display: grid;
          place-items: center;
          width: 25px;
          height: 25px;
          border-radius: 999px;
          border: 2px solid var(--pz-pink);
          color: var(--pz-pink);
          box-shadow: 0 0 14px rgba(255, 0, 122, .8);
          flex: 0 0 auto;
        }

        .pz-devices {
          position: relative;
          min-height: 430px;
          justify-self: end;
          width: min(100%, 760px);
          filter:
            drop-shadow(0 0 22px rgba(255, 0, 122, 0.46))
            drop-shadow(0 0 34px rgba(0, 247, 255, 0.26));
        }

        .pz-glow-floor {
          position: absolute;
          left: 5%;
          right: -6%;
          bottom: 12px;
          height: 76px;
          background:
            radial-gradient(ellipse at 48% 44%, rgba(255, 0, 122, 0.78), transparent 58%),
            radial-gradient(ellipse at 75% 40%, rgba(0, 247, 255, 0.62), transparent 54%),
            linear-gradient(90deg, transparent, rgba(255,0,122,.65), rgba(0,247,255,.55), transparent);
          filter: blur(20px);
          opacity: .95;
        }

        .pz-neon-tube {
          position: absolute;
          left: 7%;
          bottom: 42px;
          width: 13px;
          height: 390px;
          border-radius: 999px;
          background: linear-gradient(180deg, #fff, var(--pz-pink) 18%, #ff007a 84%, #fff);
          box-shadow:
            0 0 12px rgba(255,255,255,.85),
            0 0 24px rgba(255,0,122,1),
            0 0 58px rgba(255,0,122,.9),
            0 0 96px rgba(255,0,122,.48);
          transform: rotate(17deg);
        }

        .pz-neon-tube.cyan {
          left: auto;
          right: 1%;
          background: linear-gradient(180deg, #fff, var(--pz-cyan) 18%, #00f7ff 84%, #fff);
          box-shadow:
            0 0 12px rgba(255,255,255,.8),
            0 0 24px rgba(0,247,255,1),
            0 0 60px rgba(0,247,255,.88),
            0 0 100px rgba(0,247,255,.45);
          transform: rotate(17deg);
        }

        .pz-laptop {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: left top;
          filter: drop-shadow(0 18px 36px rgba(0,0,0,.58))
            drop-shadow(0 0 22px rgba(255,0,122,.62))
            drop-shadow(0 0 38px rgba(0,247,255,.18));
          z-index: 2;
        }

        .pz-laptop-frame {
          position: absolute;
          inset: 0;
          box-shadow:
            inset 0 0 24px rgba(255,255,255,.055);
          pointer-events: none;
        }

        .pz-laptop-frame::after {
          content: "";
          position: absolute;
          left: 10%;
          right: -6%;
          bottom: 3px;
          height: 58px;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at 48% 44%, rgba(255, 0, 122, 0.44), transparent 60%),
            radial-gradient(ellipse at 75% 40%, rgba(0, 247, 255, 0.28), transparent 56%);
          filter: blur(18px);
        }

        @media (max-width: 1100px) {
          .pz-services-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .pz-why {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          .pz-home-hero__inner {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .pz-home-hero__lead,
          .pz-home-typewriter,
          .pz-home-hero__actions,
          .pz-home-hero__chips {
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
          }

          .pz-home-portrait-frame {
            height: 520px;
            transform: none;
          }
        }

        @media (max-width: 760px) {
          .pz-services-grid {
            grid-template-columns: 1fr;
          }

          .pz-devices {
            min-height: clamp(230px, 62vw, 310px);
            margin-top: 18px;
            overflow: hidden;
          }

          .pz-laptop {
            left: 0;
            top: 0;
            width: 118%;
            max-width: none;
            transform: translateX(-6%) translateY(0) scale(1);
          }

        }

        @media (max-width: 640px) {
          .pz-page,
          .pz-home-page,
          .pz-home-hero,
          .pz-home-hero__inner {
            max-width: 100%;
            overflow-x: hidden;
          }

          .pz-home-hero {
            min-height: auto;
          }

          .pz-home-hero__inner {
            width: min(100% - 32px, 1180px);
            min-height: auto;
            gap: 26px;
            padding: 34px 0 58px;
          }

          .pz-home-hero__inner > div {
            min-width: 0;
          }

          .pz-home-hero__title {
            max-width: 100%;
            font-size: 30px;
            line-height: 1.05;
            letter-spacing: 0;
            overflow-wrap: anywhere;
            word-break: break-word;
            text-wrap: balance;
          }

          .pz-home-hero__title span,
          .pz-home-hero__title strong {
            max-width: 100%;
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          .pz-home-hero__title strong {
            display: block;
          }

          .pz-home-typewriter {
            width: 100%;
            max-width: 300px;
            min-height: 56px;
            gap: 9px;
            padding: 0 14px;
            border-radius: 14px;
            font-size: 20px;
            box-sizing: border-box;
          }

          .pz-home-typewriter__cursor {
            height: 26px;
          }

          .pz-home-hero__lead {
            margin-top: 20px;
            max-width: 300px;
            font-size: 17px;
            line-height: 1.45;
            overflow-wrap: anywhere;
            word-break: break-word;
          }

          .pz-home-hero__actions {
            width: 100%;
            max-width: 300px;
            flex-direction: column;
            gap: 12px;
            margin-top: 28px;
          }

          .pz-button {
            width: 100%;
            min-height: 56px;
            padding: 0 16px;
            border-radius: 14px;
            font-size: 14px;
            line-height: 1.15;
            text-align: center;
            white-space: normal;
          }

          .pz-home-hero__chips {
            width: 100%;
            max-width: 300px;
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 26px;
          }

          .pz-home-chip {
            width: 100%;
            min-width: 0;
            justify-content: flex-start;
            padding: 11px 13px;
            border-radius: 12px;
            font-size: 13px;
            box-sizing: border-box;
          }

          .pz-home-chip__icon {
            width: 24px;
            height: 24px;
            flex: 0 0 auto;
          }

          .pz-home-hero__visual {
            position: relative;
            min-height: 330px;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
          }

          .pz-home-portrait-frame {
            position: relative;
            left: auto;
            right: auto;
            bottom: auto;
            width: min(78vw, 280px);
            height: 330px;
            margin: 0 auto;
            transform: none;
          }

          .pz-home-hero__portrait {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center bottom;
          }
        }

        @media (max-width: 380px) {
          .pz-home-hero__inner {
            width: min(100% - 24px, 1180px);
            padding-top: 26px;
          }

          .pz-neon-badge {
            padding: 8px 16px;
            font-size: 11px;
          }

          .pz-home-hero__title {
            margin-top: 20px;
            font-size: 27px;
          }

          .pz-home-typewriter {
            min-height: 52px;
            font-size: 18px;
          }

          .pz-home-hero__lead {
            font-size: 16px;
          }
        }
      `}),e.jsxs("main",{className:"pz-home-page",children:[e.jsxs("section",{className:"pz-home-hero",children:[e.jsxs("svg",{className:"pz-hero-light-trails",viewBox:"0 0 1440 660",preserveAspectRatio:"none","aria-hidden":"true",children:[e.jsx("path",{className:"pz-neon-path pz-cyan-stroke",d:"M-80 470 C 160 350, 290 415, 440 280 S 760 80, 1010 205 S 1260 420, 1520 285"}),e.jsx("path",{className:"pz-neon-path pz-pink-stroke",d:"M-60 565 C 170 480, 320 535, 505 382 S 790 190, 1010 302 S 1270 532, 1510 405"})]}),e.jsxs("svg",{className:"pz-hero-waves",viewBox:"0 0 1440 180",preserveAspectRatio:"none","aria-hidden":"true",children:[e.jsx("path",{className:"pz-neon-wave pz-cyan-stroke",d:"M-20 118 C 145 64, 280 164, 440 110 S 760 62, 920 106 S 1220 156, 1460 70"}),e.jsx("path",{className:"pz-neon-wave pz-pink-stroke",d:"M-20 145 C 190 88, 315 142, 505 124 S 790 164, 1010 96 S 1250 64, 1460 132"})]}),e.jsxs("div",{className:"pz-home-hero__inner",children:[e.jsxs("div",{children:[e.jsx("span",{className:"pz-neon-badge",children:"Progzone"}),e.jsxs("h1",{className:"pz-home-hero__title",children:[e.jsx("span",{children:h.line1??"Weboldalkészítés"}),e.jsxs("span",{children:[h.line2_prefix??"és"," ",e.jsx("strong",{children:h.line2_highlight??"Online Megoldások"})]})]}),e.jsx(M,{words:g}),e.jsx("p",{className:"pz-home-hero__lead",children:s[0]??"Professzionális weboldal, webshop, webdesign és online marketing egy helyen."}),e.jsxs("div",{className:"pz-home-hero__actions",children:[e.jsxs("a",{href:z("quote",i,o),className:"pz-button",children:[l.quote??"Ingyenes árajánlat"," ",e.jsx("span",{"aria-hidden":"true",children:"→"})]}),e.jsxs("a",{href:z("contact",i,o),className:"pz-button pz-button-secondary",children:[l.contact??"Kapcsolat"," ",e.jsx("span",{"aria-hidden":"true",children:"→"})]})]}),e.jsx("div",{className:"pz-home-hero__chips",children:f.map((t,c)=>e.jsxs("div",{className:"pz-home-chip",children:[e.jsx("span",{className:c===1?"pz-home-chip__icon is-cyan":"pz-home-chip__icon",children:c===0?"↗":c===1?"◌":"▯"}),e.jsx("span",{children:t})]},t))})]}),e.jsxs("div",{className:"pz-home-hero__visual","aria-hidden":"true",children:[e.jsxs("svg",{className:"pz-hero-geometry",viewBox:"0 0 520 620",children:[e.jsx("path",{className:"pz-hero-geometry__stroke pz-hero-geometry__stroke--cyan",d:"M142 42 L492 156 L292 508 L406 566 L186 590 L260 452 L114 348 L238 232 Z"}),e.jsx("path",{className:"pz-hero-geometry__stroke pz-hero-geometry__stroke--pink",d:"M88 82 L456 188 L218 548 L70 392 L172 284 L72 216 Z"})]}),e.jsx("div",{className:"pz-home-portrait-frame",children:e.jsx("img",{src:"/img/me.png",alt:"",width:"1123",height:"1401",loading:"eager",decoding:"async",fetchPriority:"high",className:"pz-home-hero__portrait"})})]})]})]}),e.jsxs("section",{className:"pz-services",children:[e.jsxs("svg",{className:"pz-services-light",viewBox:"0 0 1440 760",preserveAspectRatio:"none","aria-hidden":"true",children:[e.jsx("path",{className:"pz-neon-path pz-pink-stroke",d:"M-80 690 C 190 610, 340 680, 530 535 S 860 315, 1090 390 S 1270 560, 1510 430"}),e.jsx("path",{className:"pz-neon-path pz-cyan-stroke",d:"M-60 560 C 180 430, 390 520, 590 330 S 930 135, 1170 230 S 1320 390, 1510 300"})]}),e.jsxs("div",{className:"pz-home-section",children:[e.jsxs("div",{className:"text-center mb-10",children:[e.jsxs("h2",{className:"text-4xl sm:text-5xl font-black tracking-[-0.04em]",children:[d.prefix??"Miben tudok"," ",e.jsx("span",{className:"pz-pink",children:d.highlight??"Neked segíteni?"})]}),e.jsx("span",{className:"mx-auto mt-5 block h-1 w-24 rounded-full bg-gradient-to-r from-[#ff007a] to-[#00f7ff] shadow-[0_0_18px_rgba(255,0,122,.8)]"})]}),e.jsx("div",{className:"pz-services-grid",children:m.map(t=>e.jsxs("article",{className:"pz-service-card",children:[e.jsx("div",{className:"pz-service-card__icon",children:e.jsx(N,{path:t.icon})}),e.jsx("h3",{children:t.title}),e.jsx("p",{children:t.text}),e.jsxs("a",{href:z("services",i,o),className:"pz-card-button",children:[r.details_label??"Részletek"," ",e.jsx("span",{children:"→"})]})]},t.title))}),e.jsxs("div",{className:"pz-why",children:[e.jsxs("div",{className:"pz-why-content",children:[e.jsx("span",{className:"pz-neon-badge",children:"Progzone"}),e.jsxs("h2",{children:[n.title_prefix??"Miért válassz"," ",e.jsx("span",{className:"pz-pink",children:n.title_highlight??"Engem?"})]}),e.jsx("ul",{className:"pz-check-list",children:w.map(t=>e.jsxs("li",{children:[e.jsx("span",{className:"pz-check",children:"✓"}),e.jsx("span",{children:t})]},t))}),e.jsxs("a",{href:z("quote",i,o),className:"pz-button pz-button-secondary mt-7",children:[n.cta??"Árajánlatkérés"," ",e.jsx("span",{children:"→"})]})]}),e.jsxs("div",{className:"pz-devices","aria-hidden":"true",children:[e.jsx("div",{className:"pz-neon-tube"}),e.jsx("div",{className:"pz-neon-tube cyan"}),e.jsx("div",{className:"pz-glow-floor"}),e.jsx("img",{src:"/img/laptop.png",alt:"",width:"1858",height:"846",loading:"lazy",decoding:"async",className:"pz-laptop"})]})]})]})]})]})]})}export{C as default};
