// ── All site content lives here — edit without touching components ──

export const profile = {
  name:      'Farhan Akthar',
  firstName: 'Farhan',
  lastName:  'Akthar',
  roles:     ['AI Engineer', 'Full Stack Developer', 'ML Enthusiast', 'Problem Solver'],
  tagline:   'I build intelligent products and beautiful experiences that solve real-world problems.',
  location:  'Kolkata, India',
  locationCoords: { lat:  22.735801, lng: 88.456018},
  availability: 'Open to Remote · Internship · Full-time',
  email:     'fakthar930@gmail.com',
  photo:     '/assets/profile.png',           // TODO: replace with your photo
  resumeUrl: '/assets/CV.pdf',            // TODO: drop resume.pdf in /public/assets/
  social: {
    github:   'https://github.com/Farhan-07-00',
    linkedin: 'https://www.linkedin.com/in/farhan-akthar-167a31324/',
    twitter:  'https://x.com/FarhanA2651',
    email:    'mailto:fakthar930@gmail.com',
  },
}

// Greetings shown on welcome screen — no flags, text only
export const greetings = [
  { text: 'Hello'    },
  { text: 'Hola'     },
  { text: 'Bonjour'  },
  { text: 'Ciao'     },
  { text: 'こんにちは' },
  { text: 'नमस्ते'   },
  { text: 'مرحبًا'  },
  { text: 'Hallo'    },
  { text: 'Olá'      },
  { text: '你好'      },
  { text: '안녕하세요' },
]

export const aboutStats = [
  { label: 'Projects Completed', value: 12, suffix: '+' },
  { label: 'Certifications',     value: 9,  suffix: '+' },
  { label: 'Months Experience',  value: 14, suffix: ''  },
  { label: 'Technologies Used',  value: 22, suffix: '+' },
]

export const aboutBio = [
  "Passionate Full Stack Developer and AI enthusiast focused on building intelligent, scalable, and user-centric applications. Experienced in modern web technologies, machine learning, and REST APIs, with a strong commitment to writing clean, maintainable code and continuously expanding my technical expertise.",
  "I thrive in collaborative environments, leveraging my problem-solving skills and creativity to deliver innovative solutions. My goal is to contribute to impactful projects that enhance user experiences and drive technological advancement.",
]

export const education = [
  {
    degree:      'B.Tech in Computer Science & Engineering',
    institution: 'Adamas University, Kolkata',
    year:        '2022 — 2027 (currently pursuing)', 
    cgpa:        '7.14 CGPA',
  },
  {
    degree:      '10th standard (CBSE)',
    institution: " Kendriya Vidyalaya IIT , Kharagpur",
    year:        '2021',
    cgpa:        '81%',
  },
  {
    degree:      '12th standard (Science)',
    institution: "Kendriya Vidyalaya IIT , Kharagpur",
    year:        '2023',
    cgpa:        '72%',
  },
]

export const skills = {
  Programming: [
    { name:'Python',     level:90 },
    { name:'Java',       level:75 },
    { name:'JavaScript', level:88 },
    { name:'SQL',        level:80 },
    { name:'C',          level:70 },
  ],
  Frontend: [
    { name:'React',       level:90 },
    { name:'HTML',        level:95 },
    { name:'CSS',         level:88 },
    { name:'Tailwind CSS',level:92 },
  ],
  Backend: [
    { name:'Node.js',   level:82 },
    { name:'Express.js',level:80 },
    { name:'MongoDB',   level:78 },
  ],
  'AI / ML': [
    { name:'TensorFlow', level:78 },
    { name:'PyTorch',    level:80 },
    { name:'Scikit-learn',level:85 },
    { name:'OpenCV',     level:72 },
    { name:'NLP',        level:75 },
  ],
  Tools: [
    { name:'Git',    level:90 },
    { name:'GitHub', level:90 },
    { name:'Docker', level:70 },
    { name:'VS Code',level:95 },
    { name:'Postman',level:85 },
  ],
}

export const projects = [
  {
    title:       'AI Resume Analyzer',
    category:    'AI/ML',
    description: 'AI-powered resume and job description matcher that evaluates ATS compatibility, identifies skill gaps, and provides personalized improvement suggestions.',
    features:    [
      'AI-powered resume and job description matcher',
      'Evaluates ATS compatibility',
      'Identifies skill gaps',
      'Recommends personalized improvements',
    ],
    tech:   ['Python','streamlit','Flask','React'],
    github: 'https://github.com/Farhan-07-00/Jobsense-Ai',
    demo:   'https://jobsense-ai.streamlit.app/',
    image:  '/assets/jobsense.png',
  },
  {
    title:       'AI Background Remover',
    category:    'AI/ML',
    description: 'AI-powered web application that removes image backgrounds instantly with fast, accurate processing and high-quality transparent downloads',
    features:    [
      'U2-Net based segmentation pipeline',
      'Client-side preview before processing',
      'Batch export to transparent PNG',
    ],
    tech:   ['Python','PyTorch','FastAPI','React'],
    github: 'https://github.com/Farhan-07-00/ai-background-remover-express',
    demo:   'https://revbg.netlify.app/',
    image:  '/assets/bg.png',
  },
  {
    title:       'Weather Dashboard',
    category:    'Full Stack',
    description: 'Real-time weather dashboard featuring forecasts, air quality, interactive maps, and AI-powered weather insights in one place.',
    features:    [
      'Geolocation-based auto-detection',
      '7-day and hourly forecast views',
      'Animated weather condition backgrounds',
    ],
    tech:   ['React','OpenWeather API','Tailwind CSS'],
    github: 'https://github.com/Farhan-07-00/weather-dashboard',
    demo:   'https://weathermaxxx.netlify.app/',
    image:  '/assets/weather.png',
  },
  {
    title:       'Text Analyzer',
    category:    'Tools',
    description: 'OCR-powered web application that extracts text from images, converts it to speech, and delivers AI-driven text insights.',
    features:    [
      'Sentiment and tone scoring',
      'Readability grade calculation',
      'Keyword density and frequency charts',
    ],
    tech:   ['JavaScript','NLP.js','Chart.js'],
    github: 'https://github.com/Farhan-07-00/text-analyzer',
    demo:   'https://textualize.netlify.app/',
    image:  '/assets/text analyzer.png',
  },
  {
    title:       'Iphone 15 landing page',
    category:    'Full Stack',
    description: 'Apple\'s iPhone 15 Pro website-clone using React.js and TailwindCSS. It highlights the effective use of GSAP and Three.js for displaying iPhone 15 Pro models in various colors and shapes.',
    features:    [
      'Responsive design for all devices',
      'Interactive product showcase',
      ' seamless integration with e-commerce platform',
    ],
    tech:   ['React','Tailwind CSS','Framer Motion'],
    github: 'https://github.com/Farhan-07-00/iphone-15-ui-react',
    demo:   'https://iphone15react.netlify.app/',
    image:  '/assets/Screenshot 2026-07-05 163247.png',
  },
    
  {
    title:       'Portfolio Website',
    category:    'Full Stack',
    description: 'This site — a from-scratch portfolio with motion, accessibility, and a custom dark/light theme system.',
    features:    [
      'Scroll-driven reveal and aurora background',
      'Dark/light + multi-accent theme system',
      'Fully accessible, keyboard-navigable layout',
    ],
    tech:   ['React','Vite','Tailwind CSS','Framer Motion'],
    github: 'https://github.com/Farhan-07-00/portfolio',
    demo:   'https://farhanakthar.netlify.app/',
    image:  '/assets/Screenshot 2026-07-05 163714.png',
  },
  {
    
    title:       'Beats Earpones websites',
    category:    'Full Stack',
    description: 'Landing page design for a headphone shop featuring a modern and minimalist aesthetic, crafted using HTML, CSS, and JavaScript..',
    features:    [
      'Scroll-driven reveal and aurora background',
      'Dark/light + multi-accent theme system',
      'Fully accessible, keyboard-navigable layout',
    ],
    tech:   ['HTML','CSS', 'JavaScript',],
    github: 'https://github.com/Farhan-07-00/Beats',
    demo:   'https://beats-ear.netlify.app/',
    image:  '/assets/Screenshot 2026-07-05 163505.png',
  },
  
]

export const experience = [
  {
    type:     'Internship',
    title:    'Generative AI and Prompt Engineering Intern',
    org:      'Indian Institute of Technology, Roorkee',
    duration: 'Jun 2026 — Aug 2026',
    points:   [
      'Developed and fine-tuned large language models for specific domain applications',
      'Implemented prompt engineering techniques to optimize model responses for various tasks',
      'Collaborated with a team of researchers to evaluate model performance and improve accuracy',
    ],
  },
  {
    type:     'Internship',
    title:    'Summer Intern',
    org:      'Qspiders Technologies',
    duration: 'Jun 2026 — Aug 2026',
    points:   [
      'Developed and maintained Java-based applications, ensuring code quality and performance',
      'Collaborated with team members to debug and resolve application issues',
      'Placement guidance and mentorship provided to junior interns, fostering a collaborative learning environment',
    ],
  },
  {
    type:     'Personal Projects',
    title:    'Independent AI/Full Stack Builder',
    duration: '2023 — Present',
    points:   [
      'Designed and shipped 6 end-to-end projects spanning NLP, CV, and full stack web apps',
      'Maintained a public GitHub presence with consistent commit activity',
    ],
  },
]

export const certifications = [
  { name:'AWS Academy Graduate - Machine Learning Foundations - Training Badge',               issuer:'Amazon Web Services',              date:'2026', category:'Machine Learning',   verify:'https://www.credly.com/badges/3ecad591-c5b6-4549-b407-2ee8e4b67554/linked_in_profile' },
    { name:'IoT Edge Computing and IoT Analytics',          issuer:'Infosys Springboard',                               date:'2024', category:'ML',           verify:'https://verify.onwingspan.com/' },
  { name:'GLOBAL EMPLOYABILITY TEST 2025',  issuer:'*ets',                              date:'2025', category:'AI',           verify:'' },
  { name:'Python for Everybody',          issuer:'Coursera (University of Michigan)',   date:'2023', category:'Python',       verify:'#' },
  { name:'AWS Cloud Practitioner',        issuer:'Amazon Web Services',                 date:'2025', category:'Cloud',        verify:'#' },
  { name:'Design Thinking',               issuer:'Coursera ETA',                        date:'2025', category:'AI',           verify:'#' },
]

export const services = [
  { title:'AI Applications',         description:'End-to-end ML features — from data pipeline to a production-ready API.' },
  { title:'Full Stack Development',  description:'Complete web applications, from database schema to polished UI.' },
  { title:'Machine Learning',        description:'Model training, evaluation, and deployment for real-world problems.' },
  { title:'REST API Development',    description:'Documented, tested, and secured APIs built for scale.' },
  { title:'Responsive Web Design',   description:'Interfaces that hold up across every screen size and input type.' },
]

// EmailJS config — TODO: replace with real keys from emailjs.com
export const emailjsConfig = {
  SERVICE_ID:  'service_pgdp6as',
  TEMPLATE_ID: 'template_h7dhcfu',
  PUBLIC_KEY:  'nFtlQjSotw_6iAInc',
}
