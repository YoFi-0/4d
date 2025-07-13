import './style/app.css';
import logo from "./assets/logo.png";
import servicsesImage from "./assets/services section image.png";
import Mission_VisionImage from "./assets/Mission_&_Vision  image.png";
import { useState } from 'react';

type Lang = 'en' | 'ar';

interface Translations {
  [key: string]: {
    about: string;
    services: string;
    main: string;
    gallery: string;
    contact: string;
    landingTitle: string;
    landingText: string;
    explore: string;
    servicesTitle: string;
    missionVision: string;
    servicesList: string[];
  };
}

const translations: Translations = {
  en: {
    about: "About Us",
    services: "Services",
    main: "Main Screen",
    gallery: "Gallery",
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
  },
  ar: {
    about: "من نحن",
    services: "الخدمات",
    main: "الصفحة الرئيسية",
    gallery: "المعرض",
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
  },
};

interface HeaderProps {
  lang: Lang;
  toggleLang: () => void;
}

function Header({ lang, toggleLang }: HeaderProps) {
  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={menuOpen ? 'open' : ''} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <img src={logo} alt="logo" />

      <button className="menu-toggle hide" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul>
        <li><a href="#">{t.about}</a></li>
        <li><a href="#">{t.services}</a></li>
        <li><a href="#">{t.main}</a></li>
        <li><a href="#">{t.gallery}</a></li>
        <button className="hide">{t.contact}</button>
      </ul>

      <button className="show">{t.contact}</button>
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

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="info">
        <h1>{t.landingTitle}</h1>
        <p>{t.landingText}</p>
        <button>{t.explore}</button>
      </div>
      <div className="world">
        <div className="animation"></div>
      </div>
    </main>
  );
}

function Services({ lang }: SectionProps) {
  const t = translations[lang];

  return (
    <section className="services" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="animation"></div>
      <div className="image">
        <img src={servicsesImage} alt="services" />
      </div>
      <div className="info">
        <h1>{t.servicesTitle}</h1>
        <ul>
          {t.servicesList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Mission_Vision({ lang }: SectionProps) {
  const t = translations[lang];

  return (
    <section className="mission_vision" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="info">
        <h1>{t.missionVision}</h1>
        <ul>
          {t.servicesList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="image">
        <img src={Mission_VisionImage} alt="mission_vision" />
      </div>
    </section>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <>
      <div>
        <div className="backgroundAnimation"></div>
        <Header lang={lang} toggleLang={toggleLang} />
        <Landing lang={lang} />
      </div>
      <Services lang={lang} />
      <Mission_Vision lang={lang} />
    </>
  );
}

export default App;
