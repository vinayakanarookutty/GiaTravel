import { useState, useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;700&display=swap');

*,
*::before,
*::after{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

:root{
  --sky:#38BDF8;
  --sky2:#0EA5E9;
  --sky3:#0284C7;
  --white:#fff;
  --mist:#f7fbff;
  --ink:#081421;
  --soft:#53739d;
  --border:rgba(56,189,248,.15);
  --glass:rgba(255,255,255,.12);
  --shadow:0 20px 80px rgba(2,132,199,.12);
}

html{
  scroll-behavior:smooth;
}

body{
  font-family:'DM Sans',sans-serif;
  background:white;
  color:var(--ink);
  overflow-x:hidden;
}

/* ================= CURSOR ================= */

.cursor{
  position:fixed;
  width:10px;
  height:10px;
  border-radius:50%;
  background:var(--sky2);
  pointer-events:none;
  z-index:9999;
  transform:translate(-50%,-50%);
  mix-blend-mode:multiply;
}

.cursor-ring{
  position:fixed;
  width:36px;
  height:36px;
  border:1px solid rgba(14,165,233,.4);
  border-radius:50%;
  pointer-events:none;
  z-index:9998;
  transform:translate(-50%,-50%);
}

/* ================= NAV ================= */

.nav{
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:200;
  padding:1.3rem 5rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  transition:.4s;
}

.nav.solid{
  background:rgba(255,255,255,.88);
  backdrop-filter:blur(18px);
  border-bottom:1px solid var(--border);
}

.logo{
  font-family:'Playfair Display',serif;
  font-size:1.7rem;
  font-weight:700;
  text-decoration:none;
  background:linear-gradient(135deg,var(--sky),var(--sky3));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.logo span{
  font-style:italic;
}

.nav-links{
  display:flex;
  gap:2.5rem;
}

.nav-links a{
  text-decoration:none;
  color:var(--soft);
  font-size:.82rem;
  letter-spacing:.08em;
  position:relative;
}

.nav-links a::after{
  content:'';
  position:absolute;
  left:0;
  bottom:-4px;
  width:100%;
  height:1.5px;
  background:var(--sky2);
  transform:scaleX(0);
  transition:.3s;
}

.nav-links a:hover::after{
  transform:scaleX(1);
}

.nav-btn{
  border:none;
  padding:1rem 2rem;
  border-radius:999px;
  color:white;
  cursor:pointer;
  font-size:.8rem;
  letter-spacing:.08em;
  background:linear-gradient(135deg,var(--sky),var(--sky3));
  box-shadow:0 12px 30px rgba(14,165,233,.28);
  transition:.35s;
}

.nav-btn:hover{
  transform:translateY(-3px);
}

/* ================= HERO ================= */

.hero{
  min-height:100vh;
  position:relative;
  overflow:hidden;
  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;
  flex-direction:column;
  padding:9rem 2rem 5rem;
  background:
    radial-gradient(circle at top right,rgba(56,189,248,.18),transparent 30%),
    radial-gradient(circle at bottom left,rgba(56,189,248,.12),transparent 30%),
    linear-gradient(160deg,#f0fbff 0%,white 45%,#eef9ff 100%);
}

.hero-video{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  object-fit:cover;
  opacity:.12;
}

.hero-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(to bottom,rgba(255,255,255,.15),rgba(255,255,255,.75));
}

.hero-content{
  position:relative;
  z-index:5;
}

.hero-tag{
  display:inline-flex;
  gap:.5rem;
  align-items:center;
  padding:.55rem 1.3rem;
  border-radius:999px;
  border:1px solid rgba(14,165,233,.2);
  background:rgba(14,165,233,.08);
  color:var(--sky3);
  font-size:.72rem;
  letter-spacing:.12em;
  text-transform:uppercase;
  margin-bottom:2rem;
}

.hero-tag-dot{
  width:7px;
  height:7px;
  border-radius:50%;
  background:var(--sky2);
}

.hero-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(3.5rem,8vw,8rem);
  line-height:1;
  margin-bottom:1.5rem;
}

.hero-title span{
  background:linear-gradient(135deg,var(--sky),var(--sky3));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  font-style:italic;
}

.hero-sub{
  max-width:720px;
  margin:auto;
  line-height:2;
  color:var(--soft);
  font-size:1rem;
}

.hero-actions{
  margin-top:2.5rem;
  display:flex;
  gap:1rem;
  justify-content:center;
  flex-wrap:wrap;
}

.btn-primary{
  padding:1.15rem 2.6rem;
  border:none;
  border-radius:999px;
  color:white;
  background:linear-gradient(135deg,var(--sky),var(--sky3));
  cursor:pointer;
  font-size:.82rem;
  letter-spacing:.08em;
  box-shadow:0 12px 35px rgba(14,165,233,.3);
  transition:.35s;
}

.btn-primary:hover{
  transform:translateY(-4px);
}

.btn-secondary{
  padding:1.1rem 2.4rem;
  border-radius:999px;
  border:1px solid rgba(14,165,233,.2);
  background:white;
  color:var(--sky3);
  cursor:pointer;
  font-size:.82rem;
}

.hero-stats{
  margin-top:5rem;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1rem;
  max-width:950px;
}

.stat-card{
  background:rgba(255,255,255,.7);
  backdrop-filter:blur(16px);
  border:1px solid var(--border);
  border-radius:22px;
  padding:2rem;
  box-shadow:var(--shadow);
}

.stat-num{
  font-family:'Playfair Display',serif;
  font-size:2.2rem;
  font-weight:700;
  background:linear-gradient(135deg,var(--sky),var(--sky3));
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.stat-label{
  margin-top:.4rem;
  font-size:.72rem;
  letter-spacing:.1em;
  color:var(--soft);
  text-transform:uppercase;
}

/* ================= LUXURY IMAGE SECTION ================= */

.luxury-banner{
  position:relative;
  height:90vh;
  overflow:hidden;
}

.luxury-banner img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.luxury-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(to bottom,rgba(0,0,0,.15),rgba(0,0,0,.62));
  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;
  padding:2rem;
}

.luxury-content{
  max-width:850px;
}

.luxury-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(3rem,7vw,6rem);
  line-height:1.05;
  color:white;
  margin-bottom:1.5rem;
}

.luxury-text{
  color:rgba(255,255,255,.82);
  line-height:2;
}

/* ================= SECTIONS ================= */

.section{
  padding:7rem 5rem;
}

.eyebrow{
  color:var(--sky2);
  font-size:.72rem;
  letter-spacing:.2em;
  text-transform:uppercase;
  margin-bottom:1rem;
}

.section-title{
  font-family:'Playfair Display',serif;
  font-size:clamp(2.5rem,4vw,4rem);
  line-height:1.15;
}

.section-title em{
  color:var(--sky2);
  font-style:italic;
}

.section-text{
  color:var(--soft);
  margin-top:1rem;
  line-height:2;
  max-width:650px;
}

/* ================= SERVICES ================= */

.services-grid{
  margin-top:4rem;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.5rem;
}

.card{
  background:white;
  border-radius:28px;
  padding:2.4rem;
  border:1px solid var(--border);
  transition:.4s;
  overflow:hidden;
  position:relative;
  box-shadow:0 8px 30px rgba(2,132,199,.06);
}

.card:hover{
  transform:translateY(-8px);
  box-shadow:0 30px 80px rgba(14,165,233,.14);
}

.card::before{
  content:'';
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:4px;
  background:linear-gradient(90deg,var(--sky),var(--sky3));
}

.service-icon{
  width:65px;
  height:65px;
  border-radius:18px;
  display:flex;
  justify-content:center;
  align-items:center;
  background:linear-gradient(135deg,#dff5ff,#f4fbff);
  font-size:1.8rem;
  margin-bottom:1.5rem;
}

.card-title{
  font-family:'Playfair Display',serif;
  font-size:1.35rem;
  margin-bottom:.8rem;
}

.card-text{
  color:var(--soft);
  line-height:1.9;
  font-size:.9rem;
}

/* ================= GALLERY ================= */

.gallery-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.5rem;
  margin-top:4rem;
}

.gallery-card{
  height:540px;
  border-radius:30px;
  overflow:hidden;
  position:relative;
  cursor:pointer;
}

.gallery-card img{
  width:100%;
  height:100%;
  object-fit:cover;
  transition:1s;
}

.gallery-card:hover img{
  transform:scale(1.12);
}

.gallery-overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(to top,rgba(0,0,0,.75),rgba(0,0,0,.05));
  display:flex;
  justify-content:flex-end;
  flex-direction:column;
  padding:2rem;
}

.gallery-title{
  color:white;
  font-family:'Playfair Display',serif;
  font-size:2rem;
  margin-bottom:.6rem;
}

.gallery-desc{
  color:rgba(255,255,255,.82);
  line-height:1.9;
}

/* ================= EDITORIAL ================= */

.editorial{
  display:grid;
  grid-template-columns:1fr 1fr;
  min-height:700px;
}

.editorial img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.editorial-content{
  padding:5rem;
  display:flex;
  justify-content:center;
  flex-direction:column;
  background:white;
}

.editorial-title{
  font-family:'Playfair Display',serif;
  font-size:3.5rem;
  line-height:1.15;
  margin-bottom:1.5rem;
}

.editorial-text{
  line-height:2;
  color:var(--soft);
}

/* ================= TESTIMONIALS ================= */

.testimonials{
  background:#f8fcff;
}

.test-grid{
  margin-top:4rem;
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1.5rem;
}

.test-card{
  background:white;
  border-radius:28px;
  padding:2.5rem;
  border:1px solid var(--border);
}

.test-stars{
  color:var(--sky2);
  margin-bottom:1rem;
}

.test-text{
  line-height:2;
  color:var(--soft);
  font-style:italic;
}

.test-author{
  margin-top:1.5rem;
  font-weight:700;
}

/* ================= BOOKING ================= */

.booking{
  background:linear-gradient(135deg,var(--sky2),var(--sky3));
  padding:7rem 5rem;
  color:white;
}

.booking-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:4rem;
}

.form{
  background:white;
  border-radius:28px;
  padding:2.5rem;
  color:black;
}

.form-group{
  margin-bottom:1rem;
}

.form-control{
  width:100%;
  padding:1rem;
  border-radius:14px;
  border:1px solid rgba(14,165,233,.15);
  background:#f7fbff;
  outline:none;
}

.form-submit{
  width:100%;
  padding:1rem;
  border:none;
  border-radius:14px;
  background:linear-gradient(135deg,var(--sky),var(--sky3));
  color:white;
  cursor:pointer;
  margin-top:1rem;
}

/* ================= FOOTER ================= */

.footer{
  background:#07111d;
  color:white;
  padding:5rem;
}

.footer-grid{
  display:grid;
  grid-template-columns:2fr 1fr 1fr 1fr;
  gap:3rem;
}

.footer-logo{
  font-family:'Playfair Display',serif;
  font-size:2rem;
  margin-bottom:1rem;
  background:linear-gradient(135deg,var(--sky),#7dd3fc);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.footer-text{
  color:rgba(255,255,255,.45);
  line-height:2;
}

.footer h4{
  margin-bottom:1rem;
}

.footer ul{
  list-style:none;
}

.footer li{
  margin-bottom:.7rem;
  color:rgba(255,255,255,.55);
}

.footer-bottom{
  border-top:1px solid rgba(255,255,255,.08);
  margin-top:4rem;
  padding-top:2rem;
  color:rgba(255,255,255,.4);
  font-size:.8rem;
}

/* ================= RESPONSIVE ================= */

@media(max-width:980px){

  .nav{
    padding:1rem 1.2rem;
  }

  .nav-links{
    display:none;
  }

  .section,
  .booking,
  .footer{
    padding:5rem 1.5rem;
  }

  .services-grid,
  .gallery-grid,
  .test-grid,
  .booking-grid,
  .editorial,
  .footer-grid,
  .hero-stats{
    grid-template-columns:1fr;
  }

  .editorial-content{
    padding:3rem 1.5rem;
  }

  .gallery-card{
    height:420px;
  }
}
`;

const SERVICES = [
  {
    icon:"✈️",
    title:"Flight Bookings",
    desc:"Luxury and budget flights with exclusive fares worldwide."
  },
  {
    icon:"🛳️",
    title:"Cruise Experiences",
    desc:"Luxury cruise experiences with premium cabin packages."
  },
  {
    icon:"🏝️",
    title:"Holiday Packages",
    desc:"Curated all-inclusive vacations for unforgettable escapes."
  },
  {
    icon:"🏨",
    title:"Hotel Reservations",
    desc:"Premium hotels and resorts with exclusive member pricing."
  },
  {
    icon:"📋",
    title:"Visa Assistance",
    desc:"Fast and stress-free visa support for international travel."
  },
  {
    icon:"🛡️",
    title:"Travel Insurance",
    desc:"Comprehensive protection for secure and worry-free journeys."
  }
];

const DESTINATIONS = [
  {
    image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    title:"Maldives Escape",
    desc:"Private villas and turquoise waters."
  },
  {
    image:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop",
    title:"Paris Elegance",
    desc:"Luxury stays and romantic experiences."
  },
  {
    image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    title:"Santorini Luxury",
    desc:"Mediterranean sunsets and iconic cliffside suites."
  }
];

const TESTIMONIALS = [
  {
    text:"GIA Travel planned our honeymoon perfectly. Every detail felt luxurious.",
    author:"Sarah & James"
  },
  {
    text:"Professional service and excellent pricing. Highly recommended.",
    author:"Mr Harrington"
  },
  {
    text:"The best travel agency experience we've ever had.",
    author:"Mrs Patel"
  }
];

export default function App(){

  const [scrolled,setScrolled] = useState(false);

  const [cursor,setCursor] = useState({x:0,y:0});
  const [ring,setRing] = useState({x:0,y:0});

  const ringRef = useRef({x:0,y:0});

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll",onScroll);
    return ()=> window.removeEventListener("scroll",onScroll);
  },[]);

  useEffect(()=>{

    const move = (e)=>{

      setCursor({
        x:e.clientX,
        y:e.clientY
      });

      ringRef.current.x += (e.clientX - ringRef.current.x) * 0.12;
      ringRef.current.y += (e.clientY - ringRef.current.y) * 0.12;

      setRing({
        x:ringRef.current.x,
        y:ringRef.current.y
      });
    };

    window.addEventListener("mousemove",move);

    return ()=> window.removeEventListener("mousemove",move);

  },[]);

  return(
    <>
      <style>{css}</style>

      <div className="cursor" style={{left:cursor.x,top:cursor.y}} />
      <div className="cursor-ring" style={{left:ring.x,top:ring.y}} />

      {/* NAV */}

      <nav className={`nav ${scrolled ? "solid" : ""}`}>
        <div className="logo">
          GIA <span>Travel</span>
        </div>

        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#destinations">Destinations</a>
          <a href="#reviews">Reviews</a>
          <a href="#book">Book</a>
        </div>

        <button
          className="nav-btn"
          onClick={()=>{
            document.getElementById("book").scrollIntoView({
              behavior:"smooth"
            });
          }}
        >
          Book Now →
        </button>
      </nav>

      {/* HERO */}

      <section className="hero">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >
          <source
            src="https://res.cloudinary.com/dlpym1qdy/video/upload/v1766402327/8087659-uhd_4096_2160_24fps_dzgqtx.mp4"
            type="video/mp4"
          />
        </video>

        <div className="hero-overlay" />

        <div className="hero-content">

          <div className="hero-tag">
            <div className="hero-tag-dot" />
            ABTA Member • ATOL Protected • Luxury Experiences
          </div>

          <h1 className="hero-title">
            Travel The World <br />
            In <span>Elegance</span>
          </h1>

          <p className="hero-sub">
            Bespoke luxury journeys, premium flight bookings,
            world-class cruises, and unforgettable curated travel experiences.
          </p>

          <div className="hero-actions">
            <button className="btn-primary">
              Start Your Journey
            </button>

            <button className="btn-secondary">
              Explore Packages
            </button>
          </div>

          <div className="hero-stats">

            {[
              ["100k+","Happy Clients"],
              ["15+","Years Experience"],
              ["1200+","Destinations"],
              ["100%","Luxury Support"]
            ].map(([n,l],i)=>(
              <div className="stat-card" key={i}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* LUXURY SECTION */}

      <section className="luxury-banner">

        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1800&auto=format&fit=crop"
          alt=""
        />

        <div className="luxury-overlay">

          <div className="luxury-content">

            <div className="hero-tag">
              Premium Travel Experiences
            </div>

            <h2 className="luxury-title">
              Curated Luxury <br />
              Journeys
            </h2>

            <p className="luxury-text">
              Experience private villas, luxury cruises,
              first-class flights, and unforgettable moments
              tailored exclusively for you.
            </p>

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="section" id="services">

        <div className="eyebrow">
          Our Services
        </div>

        <h2 className="section-title">
          Complete <em>Luxury Travel</em> Solutions
        </h2>

        <p className="section-text">
          From exclusive flights and premium cruises to bespoke holiday experiences,
          GIA Travel delivers world-class service for every traveller.
        </p>

        <div className="services-grid">

          {SERVICES.map((s,i)=>(
            <div className="card" key={i}>

              <div className="service-icon">
                {s.icon}
              </div>

              <div className="card-title">
                {s.title}
              </div>

              <div className="card-text">
                {s.desc}
              </div>

            </div>
          ))}

        </div>

      </section>

      {/* DESTINATIONS */}

      <section className="section" id="destinations">

        <div style={{textAlign:"center"}}>

          <div className="eyebrow">
            Signature Destinations
          </div>

          <h2 className="section-title">
            Explore The <em>Extraordinary</em>
          </h2>

        </div>

        <div className="gallery-grid">

          {DESTINATIONS.map((d,i)=>(
            <div className="gallery-card" key={i}>

              <img src={d.image} alt={d.title} />

              <div className="gallery-overlay">

                <div className="gallery-title">
                  {d.title}
                </div>

                <div className="gallery-desc">
                  {d.desc}
                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* EDITORIAL */}

      <section className="editorial">

        <div>
          <img
            src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop"
            alt=""
          />
        </div>

        <div className="editorial-content">

          <div className="eyebrow">
            Luxury Redefined
          </div>

          <h2 className="editorial-title">
            Every Journey Should Feel Exceptional
          </h2>

          <p className="editorial-text">
            We create unforgettable experiences with meticulous attention
            to detail, ensuring elegance, comfort, and seamless travel
            for every client.
          </p>

          <div style={{marginTop:"2rem"}}>
            <button className="btn-primary">
              Discover More →
            </button>
          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="section testimonials" id="reviews">

        <div style={{textAlign:"center"}}>

          <div className="eyebrow">
            Client Stories
          </div>

          <h2 className="section-title">
            Loved By <em>Travellers</em>
          </h2>

        </div>

        <div className="test-grid">

          {TESTIMONIALS.map((t,i)=>(
            <div className="test-card" key={i}>

              <div className="test-stars">
                ★★★★★
              </div>

              <div className="test-text">
                "{t.text}"
              </div>

              <div className="test-author">
                {t.author}
              </div>

            </div>
          ))}

        </div>

      </section>

      {/* BOOKING */}

      <section className="booking" id="book">

        <div className="booking-grid">

          <div>

            <div className="eyebrow" style={{color:"white"}}>
              Book Your Journey
            </div>

            <h2
              className="section-title"
              style={{
                color:"white",
                marginBottom:"1rem"
              }}
            >
              Let's Create <em style={{color:"#dff7ff"}}>Your Dream Escape</em>
            </h2>

            <p
              style={{
                color:"rgba(255,255,255,.75)",
                lineHeight:2
              }}
            >
              Fill in your travel preferences and one of our luxury
              travel specialists will contact you shortly.
            </p>

          </div>

          <div className="form">

            <div className="form-group">
              <input
                className="form-control"
                placeholder="First Name"
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Last Name"
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group">
              <select className="form-control">
                <option>Select Service</option>
                <option>Flight Booking</option>
                <option>Cruise Booking</option>
                <option>Holiday Package</option>
                <option>Hotel Booking</option>
              </select>
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Travel Details"
              />
            </div>

            <button className="form-submit">
              Send Enquiry ✈
            </button>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-grid">

          <div>

            <div className="footer-logo">
              GIA Travel
            </div>

            <div className="footer-text">
              Bespoke luxury travel experiences with premium service,
              exclusive fares, and world-class destinations.
            </div>

          </div>

          <div>
            <h4>Services</h4>

            <ul>
              <li>Flights</li>
              <li>Cruises</li>
              <li>Hotels</li>
              <li>Visa Support</li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>

            <ul>
              <li>About</li>
              <li>Privacy</li>
              <li>Terms</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>

            <ul>
              <li>+44 121 288 2244</li>
              <li>+91 9526 761 047</li>
              <li>contactus@giatravel.co.uk</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          © 2026 GIA Travel — Luxury Travel Experiences Worldwide
        </div>

      </footer>

    </>
  );
}