import './style/app.css';
import logo from "./assets/logo.png";
import servicsesImage from "./assets/services section image.png";
import Mission_VisionImage from "./assets/Mission_&_Vision  image.png";
import earthVid from "./assets/ss.mp4";
import earthVidRev from "./assets/earth2t.mp4";
import LandingVid from "./assets/landingBackground.mp4";
import ServicesVid from "./assets/servicesVid.mp4";
import { useEffect, useRef, useState } from 'react';
import { AiChat } from './components/AiChat';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MainContextProvider, useMainContext } from './components/MainContext';

export type Lang = 'en' | 'ar';

export interface AiChatTranslations {
  header: string;
  inputPlaceholder: string;
  typingMessages: string[];
  thankYouMessage: string;
}

export interface Translations {
  [key: string]: {
    about: string;
    services: string;
    main: string;
    mainVision: string;
    contact: string;
    landingTitle: string;
    landingText: string;
    explore: string;
    servicesTitle: string;
    missionVision: string;
    servicesList: string[];
    aiChat: {
      header: string;
      inputPlaceholder: string;
      typingMessages: string[];
      thankYouMessage: string;
    }
  };
}

const translations: Translations = {
  en: {
    about: "About Us",
    services: "Services",
    main: "Main Screen",
    mainVision: "Mission & Vision",
    contact: "Contact Us",
    landingTitle: "Leading Digital Marketing Agency in KSA",
    landingText:
      "We help businesses thrive online. Study projects and analyze businesses needs. Building ID and themes. Combining marketing strategies to maximize your ROI.",
    explore: "EXPLORE SERVICES",
    servicesTitle: "SERVICES",
    missionVision: "Mission & Vision",
    servicesList: [
      "Building ID",
      "Designing logo",
      "Studying Projects",
      "Analyzing problems",
      "Technical solutions",
      "Web Services",
      "Hosting Websites",
    ],
    aiChat: {
      header: "Ai Bot",
      inputPlaceholder: "Type what you need...",
      typingMessages: ["Just a second", "Hold on", "One moment"],
      thankYouMessage: "Thank you for choosing Fordzain, we will contact you soon, God willing.",
    },
  },
  ar: {
    about: "من نحن",
    services: "الخدمات",
    main: "الصفحة الرئيسية",
    mainVision: "رؤيتنا",
    contact: "تواصل معنا",
    landingTitle: "وكالة التسويق الرقمي الرائدة في السعودية",
    landingText:
      "نساعد الشركات على النجاح عبر الإنترنت. دراسة المشاريع وتحليل احتياجات الأعمال. بناء الهوية والتصاميم. الجمع بين الاستراتيجيات التسويقية لتعظيم العائد.",
    explore: "استكشف الخدمات",
    servicesTitle: "الخدمات",
    missionVision: "الرؤية والرسالة",
    servicesList: [
      "بناء الهوية",
      "تصميم الشعار",
      "دراسة المشاريع",
      "تحليل المشكلات",
      "حلول تقنية",
      "خدمات الويب",
      "استضافة المواقع",
    ],
    aiChat: {
      header: "عميل فوردزاين",
      inputPlaceholder: "أكتب وش تحتاج؟ ...",
      typingMessages: ["ثواني بس", "خلك معي", "لحظه بس"],
      thankYouMessage: "نشكرك على إختيار فوردزاين راح نتواصل معاك في اقرب وقت إن شاء الله",
    },
  },
};

interface HeaderProps {
  lang: Lang;
  toggleLang: () => void;
}

function Header({ lang, toggleLang }: HeaderProps) {
  const {setOpen, open} = useMainContext();
  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  const closeHeaderPhone = () => {

      setMenuOpen(false);
    
  };
  return (
    <header className={menuOpen ? 'open' : ''} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <img src={logo} alt="logo" />

      <button className="menu-toggle hide" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul>
        <li onClick={closeHeaderPhone}><a href="#main">{t.main}</a></li>
         <li onClick={closeHeaderPhone}><a href="#services">{t.services}</a></li>
         <li onClick={closeHeaderPhone}><a href="#mainVision">{t.mainVision}</a></li>        
        
        <button className="hide" onClick={() => {setOpen(!open); closeHeaderPhone();}}>{t.contact}</button>
      </ul>

      <button className="show" onClick={() => {setOpen(!open); closeHeaderPhone()}}>{t.contact}</button>
      <button onClick={toggleLang} className="lang-btn">
        {lang === 'en' ? 'العربية' : 'English'}
      </button>
    </header>
  );
}

interface SectionProps {
  lang: Lang;
}

function Landing({ lang }: SectionProps) {
  const t = translations[lang];
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
   useEffect(() => {
    AOS.init(); // animation duration in ms
  }, []);
  
  useEffect(() => {
    const video1 = video1Ref.current;
    const video2 = video2Ref.current;

    if (video1 && video2) {
      const playVideo1 = () => {
        video2.pause();
        video2.currentTime = 0;
        video2.style.opacity = '0';
        video1.style.opacity = '1';
        video1.play();
      };

      const playVideo2 = () => {
        video1.pause();
        video1.currentTime = 0;
        video1.style.opacity = '0';
        video2.style.opacity = '1';
        video2.play();
      };

      video1.addEventListener('ended', playVideo2);
      video2.addEventListener('ended', playVideo1);

      // Initial state
      video1.style.opacity = '1';
      video2.style.opacity = '0';
      video1.play();

      return () => {
        video1.removeEventListener('ended', playVideo2);
        video2.removeEventListener('ended', playVideo1);
      };
    }
  }, []);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="info">
        <h1 data-aos="fade-up">{t.landingTitle}</h1>
        <p data-aos="fade-down">{t.landingText}</p>
       <a href='#services'><button>{t.explore}</button></a>
      </div>
      <div data-aos="fade-right" className="world">
        <div className="animation relative w-[500px] h-[500px]">
          <video
            ref={video1Ref}
            width="500"
            height="500"
            muted
            autoPlay
            loop
            playsInline
            webkit-playsInline
            style={{ opacity: 0 }}
          >
            <source src={earthVid} type="video/mp4" />
          </video>
          <video
            ref={video2Ref}
            width="500"
            height="500"
            muted
            autoPlay
            loop
            playsInline
            webkit-playsInline
            style={{ opacity: 0 }}
          >
            <source src={earthVidRev} type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
  );
}

function Services({ lang }: SectionProps) {
  const t = translations[lang];
    
  useEffect(() => {
    AOS.init({duration: 1000}); // animation duration in ms
  }, []);

  return (
    <section className="services" id='services' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="animation">
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={ServicesVid} type="video/mp4" />
        </video>
      </div>
      <div data-aos="fade-left" className="image">
        <img src={servicsesImage}  alt="services" />
      </div>
      <div className="info">
        <h1>{t.servicesTitle}</h1>
        <ul>
          {t.servicesList.map((item, i) => (
            <li data-aos="zoom-out-right" key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Mission_Vision({ lang }: SectionProps) {
  const t = translations[lang];
  useEffect(() => {
    AOS.init(); // animation duration in ms
  }, []);
  
  return (
    <section className="mission_vision"  id='mainVision' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="info">
        <h1>{t.missionVision}</h1>
        <ul>
          {t.servicesList.map((item, i) => (
            <li data-aos="zoom-out-left" key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div data-aos="zoom-out-right" className="image">
        <img src={Mission_VisionImage} alt="mission_vision" />
      </div>
    </section>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  const [videoOpacity, setVideoOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef<number>(0);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const { duration, currentTime } = video;
      const timeLeft = duration - currentTime;

      if (timeLeft < 0.8 && videoOpacity !== 0) {
        setVideoOpacity(0);
      }

      if (currentTime < lastTimeRef.current && videoOpacity !== 1) {
        setVideoOpacity(1);
      }

      lastTimeRef.current = currentTime;
    }
  };

  const handleLoadedMetadata = () => {
    setVideoOpacity(1);
  };

  return (
    <MainContextProvider>
      <div id='main'>
        <div
          className="backgroundAnimation"
          style={{ opacity: videoOpacity, transition: 'opacity 0.8s ease-in-out' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            webkit-playsInline
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={LandingVid} type="video/mp4" />
          </video>
        </div>
        <Header lang={lang} toggleLang={toggleLang} />
        <Landing lang={lang} />
      </div>
      <Services lang={lang} />
      <Mission_Vision lang={lang} />
      <AiChat lang={lang} t={translations[lang].aiChat} />
    </MainContextProvider>
  );
}

export default App;
