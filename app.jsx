import React, { useState, useEffect, useCallback } from 'react';
import {
  Briefcase,
  Layers,
  Home,
  Map,
  Mail,
  Phone,
  BookOpen,
  Zap,
  CheckCircle,
  Calendar,
  Dot,
  Feather,
  Download, // Import the Download icon
} from 'lucide-react';

// --- CONFIGURATION DATA ---
const NAV_ITEMS = [
  { id: 'intro', label: 'About Me', icon: Home },
  { id: 'work', label: 'Experience & Skills', icon: Briefcase },
  { id: 'visa', label: 'Work Rights', icon: Layers },
];

const CONTACT_INFO = {
  email: 'igespineda@gmail.com',
  phone: '+61 409 033 652',
  location: 'Homebush, NSW 2140',
};

// Data migrated from the previous HTML structure
const WORK_EXPERIENCE = [
  {
    title: 'Product Manager',
    company: 'BarBooks Australia (Legal SaaS)',
    date: 'Jul 2022 – Present',
    highlights: [
      'Own end-to-end product lifecycle for legal fintech SaaS serving **2,000+ users** across 7 chambers',
      'Lead product discovery using **Jira Discovery**, define BRDs/PRDs via **Jira & Confluence**',
      'Act as Product Owner and Scrum Master, running agile ceremonies and ensuring delivery velocity',
      'Key Projects: Invoicing & Reporting, Outlook Calendar Integration, Dynamics 365 Integration, MS SSO & 2FA, GoodData Analytics',
    ],
  },
  {
    title: 'Business Product Lead – Shopee Ads',
    company: 'Shopee Philippines (eCommerce Platform)',
    date: 'Nov 2020 – Jul 2022',
    highlights: [
      'Country lead for Shopee Ads across Marketplace, Mall/Brand, and Cross-border segments',
      'Collaborated with Singapore regional PMs to execute product launches, A/B tests, and UATs',
      'Spearheaded go-to-market programs that **doubled ad revenue YOY**',
      'Built product usage dashboards, managed 18-person paid ads team, and optimized operations',
      'Led program management initiatives using product and user data to design programs that improved ads adoption and revenue',
    ],
  },
];

const ADDITIONAL_EXPERIENCE = [
  { title: 'Business Development Officer', company: 'PAL Express (Airline)', date: 'Apr 2018 – May 2020' },
  { title: 'Business Development', company: 'Guide to the Philippines (Travel Platform)', date: 'Jan 2019 – Apr 2020' },
  { title: 'Project Development Specialist', company: 'Filinvest Land Inc.', date: 'Aug 2015 – Feb 2018' },
];

const TECH_EXPERTISE = [
  { name: 'Jira Ecosystem', desc: 'Jira, JSM, Jira Discovery, Confluence, JQL' },
  { name: 'Design & Prototyping', desc: 'Figma, Zeplin, Miro' },
  { name: 'AI Tools', desc: 'Claude, Gemini, CursorAI, ChatGPT' },
  { name: 'Data & Analytics', desc: 'SQL, Excel, GoodData, BI Dashboards' },
  { name: 'Agile Methods', desc: 'Scrum, Kanban, Product Delivery' },
  { name: 'Integrations', desc: 'Outlook, Dynamics 365, MS SSO, 2FA' },
  { name: 'Product Discovery', desc: 'User Research, Customer Interviews, UAT' },
  { name: 'Growth & Strategy', desc: 'Roadmapping, A/B Testing, KPI Tracking' },
];

const EDUCATION = [
  { title: 'Bachelor of Science, Economics', company: 'University of the Philippines, Diliman', date: '2011-2015' },
];

const CERTIFICATIONS = [
  'AI for Product Management – Pendo.io (Mar 2025)',
  'SQL: From Zero to Hero – Udemy (Mar 2025)',
];

// --- UTILITY COMPONENTS ---

// Helper function for smooth scrolling
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    // Scroll with an offset if needed, or just standard smooth scroll
    const y = element.getBoundingClientRect().top + window.scrollY - 70; // 70px offset for fixed nav
    window.scrollTo({ top: y, behavior: 'smooth' });
    // Update URL hash without causing a page reload
    window.history.pushState(null, '', `#${id}`);
  }
};

const Nav = ({ activeSection, setActiveSection }) => (
  <nav className="bg-white p-4 shadow-xl sticky top-0 z-20 border-b border-gray-100/50">
    <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
      <a 
        href="#intro" 
        onClick={(e) => { e.preventDefault(); scrollToSection('intro'); }} 
        className="text-xl font-bold text-gray-800 tracking-wide hover:text-gray-900 transition-colors"
      >
        Ida Espineda
      </a>
      <div className="flex space-x-2 sm:space-x-4">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
                setActiveSection(id);
                scrollToSection(id);
            }}
            className={`flex items-center space-x-1 p-2 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base
              ${activeSection === id 
                ? 'bg-purple-100 text-purple-800 shadow-md transform scale-105' // Use soft purple accent
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full'
              }`
            }
          >
            <Icon size={18} className="hidden sm:block" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  </nav>
);

const SectionHeading = ({ title, icon: Icon, className = '' }) => (
    <h2 className={`text-4xl font-extrabold mb-8 text-gray-900 flex items-center ${className}`}>
        <Icon size={32} className="mr-3 text-purple-500" />
        {title}
    </h2>
);

const ExperienceItem = ({ title, company, date, highlights }) => (
  <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px]">
    <div className="flex justify-between items-start mb-3 flex-wrap">
      <div>
        <h4 className="text-xl font-bold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 font-medium mt-1">{company}</p>
      </div>
      <p className="text-xs text-gray-500 font-semibold mt-1 sm:mt-0 bg-yellow-100 px-3 py-1 rounded-full">{date}</p>
    </div>
    {highlights && (
      <ul className="list-none pl-0 mt-3 space-y-2">
        {highlights.map((item, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <Dot className="text-purple-500 mr-2 flex-shrink-0 mt-1" size={20} />
            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

// --- SECTION COMPONENTS ---

const IntroSection = ({ setActiveSection }) => (
  <div id="intro" className="p-6 md:p-12 pt-24 mb-32 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-12 md:space-y-0 md:space-x-16">
      
      {/* Profile Photo - Playful Card Style */}
      <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 order-1 md:order-2 p-4 bg-teal-100/50 rounded-3xl shadow-2xl border-2 border-teal-300">
        <img 
          src="Ida Photo.jpg" 
          alt="Ma. Ida G. Espineda Profile" 
          className="w-full h-full object-cover rounded-full shadow-lg transform transition-transform hover:scale-[1.03]"
        />
      </div>
      
      {/* Intro Text and CTAs (UPDATED) */}
      <div className="max-w-xl flex-1 order-2 md:order-1">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 mb-6 tracking-tighter leading-tight">
          Hi. I'm Ida! 
          <span className="block text-purple-600 font-medium text-5xl md:text-6xl mt-2">
            Product and Project Manager.
          </span>
        </h1>
        
        {/* Professional Summary text inserted here (FIXED BOLD TAG) */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium leading-relaxed">
          I'm a seasoned <strong>Product and Project Manager</strong> with over 7 years of hands-on experience in building and scaling SaaS, e-commerce, and digital platforms. I love diving deep into user needs, mapping out clear product roadmaps, and leading dynamic teams through the entire agile delivery cycle. My goal is always to deliver impactful features that drive adoption, growth, and real business value!
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            {/* CTA 1 (Smaller) */}
            <button
                onClick={() => {
                    setActiveSection('work');
                    scrollToSection('work');
                }}
                // Reduced padding and font size for smaller button
                className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300 transform hover:scale-[1.02] border-b-2 border-gray-900 hover:border-purple-800 text-base"
            >
                View Work & Skills →
            </button>
            
            {/* Download Resume Button (Smaller) */}
            <a
                href="#" // Placeholder for actual resume PDF file
                download="Ida_Espineda_Resume.pdf"
                // Reduced padding and font size for smaller button
                className="flex items-center justify-center space-x-2 px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-[1.02] border-b-2 border-yellow-500 hover:border-yellow-600 text-base"
            >
                <Download size={18} />
                <span>Download Resume</span>
            </a>
        </div>
      </div>
    </div>
    
    {/* Professional Summary CARD REMOVED */}
  </div>
);

const WorkSection = () => (
  <div id="work" className="space-y-20 p-6 md:p-12 pt-16 max-w-6xl mx-auto">
    
    {/* Key Experience */}
    <div>
        <SectionHeading title="Key Experience" icon={Briefcase} />
        <div className="grid grid-cols-1 gap-8">
            {WORK_EXPERIENCE.map((job, index) => (
                <ExperienceItem key={index} {...job} />
            ))}
        </div>
    </div>

    {/* Technical Expertise Grid */}
    <div>
        <SectionHeading title="Software & Technical Expertise" icon={Zap} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TECH_EXPERTISE.map((tech, index) => (
            <div 
                key={index} 
                className="p-4 bg-teal-50 border border-teal-200 rounded-xl shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
                <h4 className="font-semibold text-gray-800">{tech.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{tech.desc}</p>
            </div>
            ))}
        </div>
    </div>

    {/* Education & Certifications */}
    <div>
        <SectionHeading title="Education & Certifications" icon={BookOpen} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 border-b pb-2 border-gray-100">Education</h4>
            {EDUCATION.map((edu, index) => (
                <div key={index} className="p-3 border-l-4 border-purple-400 bg-gray-50 rounded">
                <p className="font-semibold text-gray-800">{edu.title}</p>
                <p className="text-sm text-gray-600">{edu.company}</p>
                <p className="text-xs text-gray-500">{edu.date}</p>
                </div>
            ))}
            </div>

            <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 border-b pb-2 border-gray-100">Certifications</h4>
            <ul className="list-none pl-0 mt-3 space-y-3">
                {CERTIFICATIONS.map((cert, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700 p-2 bg-purple-50 rounded-lg">
                    <CheckCircle size={16} className="text-purple-600 mr-2 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: cert.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </li>
                ))}
            </ul>
            </div>
        </div>
    </div>
    
    {/* Additional Experience */}
    <div>
        <SectionHeading title="Additional Experience" icon={Layers} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADDITIONAL_EXPERIENCE.map((job, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:border-purple-400 transition-colors duration-200">
                <h4 className="font-semibold text-gray-800">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company}</p>
                <p className="text-xs text-gray-500 mt-1">{job.date}</p>
            </div>
            ))}
        </div>
    </div>
  </div>
);

const VisaSection = () => (
  <div id="visa" className="p-6 md:p-12 pt-16 max-w-6xl mx-auto mb-20">
    <SectionHeading title="Australian Work Authorization" icon={Map} />
    
    <div className="p-6 md:p-10 rounded-3xl shadow-2xl border-t-8 border-teal-500 bg-white">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Status Card */}
        <div className="md:col-span-1 p-6 bg-teal-50 border-2 border-teal-300 rounded-xl shadow-inner flex flex-col items-center justify-center min-h-[150px]">
          <CheckCircle size={40} className="text-teal-700 mb-3" />
          <p className="text-xl font-bold text-teal-900 text-center">
            Full Working Rights
          </p>
          <span className="text-sm text-teal-600 font-medium mt-1">
            No Sponsorship Transfer Required
          </span>
        </div>
        
        {/* Timeline Start Text */}
        <div className="md:col-span-2 flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
          <Zap size={20} className="text-gray-600 mr-3" />
          <p className="text-gray-700 font-medium">
            Timeline details confirming continuous employment eligibility.
          </p>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pt-4 pl-8">
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 left-3 w-1 bg-teal-200 rounded-full" />
        
        {/* Timeline Items */}
        {[
          { icon: Map, label: 'Current Status', date: 'Immediate', desc: '482 Visa with immediate 6-month open work capacity upon resignation.' },
          { icon: Calendar, label: 'May 2026', date: 'Milestone', desc: "Automatic transition to Bridging Visa A (Partner's 186 PR application)." },
          { icon: CheckCircle, label: 'Employment Ensured', date: 'Outcome', desc: 'Continuous employment eligibility confirmed for long-term roles.' },
        ].map((item, index) => (
          <div key={index} className="mb-8 flex items-start relative">
            {/* Timeline Dot/Icon */}
            <div className="absolute left-0 top-0 h-full flex items-start justify-center w-6 z-10">
              <div className="p-1 bg-white rounded-full shadow-md border-2 border-teal-300">
                <item.icon size={16} className="text-teal-500" />
              </div>
            </div>

            {/* Content */}
            <div className="ml-8 p-4 bg-white border border-teal-100 rounded-xl shadow-sm flex-1 hover:shadow-lg transition-shadow duration-200">
              <p className="text-sm font-bold text-gray-800 flex justify-between items-center">
                {item.label}
                <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">{item.date}</span>
              </p>
              <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const Footer = () => (
  <footer className="bg-gray-900 text-white p-6 mt-16">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
      <div className="text-sm font-light mb-4 sm:mb-0">
        &copy; {new Date().getFullYear()} Ma. Ida G. Espineda.
      </div>
      <div className="flex space-x-6 text-sm">
        <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center hover:text-yellow-400 transition-colors">
          <Mail size={16} className="mr-1" /> {CONTACT_INFO.email}
        </a>
        <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center hover:text-yellow-400 transition-colors">
          <Phone size={16} className="mr-1" /> {CONTACT_INFO.phone}
        </a>
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');

  // Logic to determine the currently visible section based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Center of viewport determines visibility
      threshold: 0,
    };

    const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(e => e);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 font-inter antialiased">
      <Nav activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="mx-auto">
        <IntroSection setActiveSection={setActiveSection} />
        
        {/* Work Section (Experience, Skills, Education) */}
        <div className="pb-12">
          <WorkSection />
        </div>
        
        {/* Visa Section */}
        <div className="pb-12">
          <VisaSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
