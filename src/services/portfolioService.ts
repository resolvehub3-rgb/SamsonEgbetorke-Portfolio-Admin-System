/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase.ts';
import {
  Profile,
  EducationItem,
  WorkExperienceItem,
  SkillCategory,
  ServiceItem,
  ProjectItem,
  AchievementItem,
  ContactEnquiryItem,
  WebsiteSettings,
} from '../types/portfolio.ts';

// Verified Initial Authentic Data for Samson Egbetorke
const INITIAL_PROFILE: Profile = {
  full_name: 'Samson Egbetorke',
  title: 'Software Developer | SaaS Builder | Technology Innovator',
  business_name: 'SamTeck Digital',
  short_intro: 'Founder of SamTeck Digital. Focused on identifying real-world problems and building practical software applications, SaaS platforms, business management systems and intelligent digital solutions.',
  bio: `My journey into software development began with a simple curiosity: how can technology be used to identify problems and create solutions that make everyday work easier?

Growing up in Ghana's Volta Region, I developed an interest in technology despite having limited access to the resources needed to learn programming. Without a personal laptop at the time, I made use of internet cafés, a flash drive and every available opportunity to explore and learn.

After moving to Accra, I acquired my own computer and became more committed to developing my programming skills. I began my learning journey with Python before transitioning into frontend development with HTML, CSS and JavaScript. My curiosity and continuous learning led me to React for frontend development, Node.js for backend engineering, and database technologies including Supabase and PostgreSQL.

Today, I focus on designing and developing practical software products, business management systems and intelligent digital solutions.

What drives me is the belief that technology should reduce unnecessary pressure, minimise paperwork, improve efficiency and make everyday business operations faster and easier.

My long-term ambition is to become an outstanding technology innovator, contributing to Ghana's technological advancement by building meaningful solutions to real-world problems.`,
  location: 'Accra, Ghana',
  email: 'samtechdigital@gmail.com',
  avatar_url: '/src/assets/images/samson_profile_portrait_1794388187201.jpg',
  github_url: 'https://github.com/samteckdigital',
  linkedin_url: 'https://linkedin.com/in/samsonegbetorke',
  twitter_url: 'https://x.com/samteckdigital',
};

const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Accra Institute of Technology (AIT)',
    qualification: 'Bachelor of Science in Computer Science',
    details: 'Currently pursuing. Focused on software engineering, computer science theory, algorithms, and computational systems.',
    status: 'in_progress',
    display_order: 1,
    is_visible: true,
  },
  {
    id: 'edu-2',
    institution: 'IPMC Training College',
    qualification: 'Diploma Studies in Technology',
    details: 'Foundational computing and practical technology coursework.',
    status: 'completed',
    display_order: 2,
    is_visible: true,
  },
  {
    id: 'edu-3',
    institution: 'Abor Senior High School',
    qualification: 'WASSCE',
    details: 'Visual Arts, Graphic Design, Elective ICT',
    status: 'completed',
    display_order: 3,
    is_visible: true,
  },
];

const INITIAL_EXPERIENCE: WorkExperienceItem[] = [
  {
    id: 'exp-1',
    role_title: 'Independent Technology Developer',
    company_or_org: 'Self-Employed / SamTeck Digital',
    description: 'Full-stack software development, SaaS product architecture, and building practical business management solutions.',
    start_date: '2023',
    end_date: 'Present',
    is_current: true,
    display_order: 1,
    is_visible: true,
  },
  {
    id: 'exp-2',
    role_title: 'ICT Teacher',
    company_or_org: 'Virgin Proprietary School',
    description: 'Delivered computer studies and practical digital literacy instruction to foundational and junior students.',
    start_date: '2022',
    end_date: '2023',
    is_current: false,
    display_order: 2,
    is_visible: true,
  },
  {
    id: 'exp-3',
    role_title: 'Security Officer',
    company_or_org: 'Zen Petroleum Limited, Korle Gonno Branch',
    description: 'Maintained station security and customer service; observed customer feedback and communication bottlenecks that inspired the creation of ResolveHub.',
    start_date: '2021',
    end_date: '2022',
    is_current: false,
    display_order: 3,
    is_visible: true,
  },
  {
    id: 'exp-4',
    role_title: 'Graphic Design & Printing Assistant',
    company_or_org: 'Elegance Innovations, Osu, Accra',
    description: 'Supported typography, branding reproduction, digital layouts, and visual print materials.',
    start_date: '2020',
    end_date: '2021',
    is_current: false,
    display_order: 4,
    is_visible: true,
  },
  {
    id: 'exp-5',
    role_title: 'Building Construction Assistant',
    company_or_org: 'Site Operations',
    description: 'Supported general building and physical construction activities, building practical work ethic and on-site discipline.',
    start_date: '2019',
    end_date: '2020',
    is_current: false,
    display_order: 5,
    is_visible: true,
  },
];

const INITIAL_SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'sc-1',
    name: 'Programming Languages',
    display_order: 1,
    skills: [
      { id: 's-1', category_id: 'sc-1', name: 'Python', display_order: 1, is_visible: true },
      { id: 's-2', category_id: 'sc-1', name: 'JavaScript', display_order: 2, is_visible: true },
      { id: 's-3', category_id: 'sc-1', name: 'TypeScript', display_order: 3, is_visible: true },
    ],
  },
  {
    id: 'sc-2',
    name: 'Frontend',
    display_order: 2,
    skills: [
      { id: 's-4', category_id: 'sc-2', name: 'HTML', display_order: 1, is_visible: true },
      { id: 's-5', category_id: 'sc-2', name: 'CSS', display_order: 2, is_visible: true },
      { id: 's-6', category_id: 'sc-2', name: 'React', display_order: 3, is_visible: true },
    ],
  },
  {
    id: 'sc-3',
    name: 'Backend',
    display_order: 3,
    skills: [
      { id: 's-7', category_id: 'sc-3', name: 'Node.js', display_order: 1, is_visible: true },
    ],
  },
  {
    id: 'sc-4',
    name: 'Databases',
    display_order: 4,
    skills: [
      { id: 's-8', category_id: 'sc-4', name: 'Supabase', display_order: 1, is_visible: true },
      { id: 's-9', category_id: 'sc-4', name: 'PostgreSQL', display_order: 2, is_visible: true },
      { id: 's-10', category_id: 'sc-4', name: 'Neon', display_order: 3, is_visible: true },
    ],
  },
  {
    id: 'sc-5',
    name: 'Development Tools',
    display_order: 5,
    skills: [
      { id: 's-11', category_id: 'sc-5', name: 'Visual Studio Code', display_order: 1, is_visible: true },
      { id: 's-12', category_id: 'sc-5', name: 'Git', display_order: 2, is_visible: true },
      { id: 's-13', category_id: 'sc-5', name: 'GitHub', display_order: 3, is_visible: true },
    ],
  },
  {
    id: 'sc-6',
    name: 'AI Development Tools',
    display_order: 6,
    skills: [
      { id: 's-14', category_id: 'sc-6', name: 'OpenCode', display_order: 1, is_visible: true },
      { id: 's-15', category_id: 'sc-6', name: 'Google AI Studio', display_order: 2, is_visible: true },
      { id: 's-16', category_id: 'sc-6', name: 'ChatGPT', display_order: 3, is_visible: true },
    ],
  },
  {
    id: 'sc-7',
    name: 'Deployment',
    display_order: 7,
    skills: [
      { id: 's-17', category_id: 'sc-7', name: 'Vercel', display_order: 1, is_visible: true },
    ],
  },
];

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Custom Software Development',
    description: 'Building applications tailored to business needs and operational challenges.',
    icon_name: 'Code',
    display_order: 1,
    is_published: true,
  },
  {
    id: 'srv-2',
    title: 'SaaS Development',
    description: 'Developing subscription-based business applications and multi-tenant software platforms.',
    icon_name: 'Layers',
    display_order: 2,
    is_published: true,
  },
  {
    id: 'srv-3',
    title: 'AI-Powered Application Development',
    description: 'Integrating AI capabilities into applications to improve workflows and solve practical problems.',
    icon_name: 'Cpu',
    display_order: 3,
    is_published: true,
  },
  {
    id: 'srv-4',
    title: 'Database Design and Integration',
    description: 'Designing database structures and connecting application data systems with secure RLS.',
    icon_name: 'Database',
    display_order: 4,
    is_published: true,
  },
  {
    id: 'srv-5',
    title: 'Business Management Systems',
    description: 'Developing software that helps organisations reduce paperwork, improve efficiency and manage operations.',
    icon_name: 'Building2',
    display_order: 5,
    is_published: true,
  },
];

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'SamTill POS',
    slug: 'samtill-pos',
    category: 'Retail Point of Sale and Business Management System',
    attribution: 'A product by SamTeck Digital',
    status: 'Working',
    publishing_status: 'published',
    is_featured: true,
    display_order: 1,
    short_description: 'Retail point-of-sale and business management system designed to digitise sales and inventory processes while separating cashier operations from shop-owner management activities.',
    full_description: 'SamTill POS is a retail point-of-sale and business management system that digitises sales and inventory processes while separating cashier operations from shop-owner management activities. It eliminates paper stock books, accelerates checkout lines, and gives business owners real-time mobile visibility into shop activity.',
    problem_statement: 'Many shops depend on physical stock books and manual processes for recording sales, tracking inventory, monitoring cashiers and managing business operations. Physical stock records can be damaged or lost, while manual stock management and interruptions during cashier operations can delay customer service.',
    solution_description: 'SamTill POS is a retail point-of-sale and business management system designed to digitise sales and inventory processes while separating cashier operations from shop-owner management activities.',
    features: [
      'Product registration and barcode scanning',
      'Sales processing and receipt printing',
      'Inventory and stock management',
      'Digital stock movement book',
      'Cashier accounts and access control',
      'Shop-owner mobile management',
      'Offline sales and synchronization',
      'Customer display on a second monitor',
      'Live sales dashboards and analytics',
      'Low-stock and expiry alerts',
    ],
    technologies: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Electron', 'PWA'],
    owner_role: 'Lead Architect & Full-Stack Developer',
    contributions: 'Independently designed the architecture, dual-screen customer display sync, offline-first local cache synchronization, and shop-owner mobile dashboard.',
    live_url: '',
    github_url: '',
    screenshots: [],
    seo_title: 'SamTill POS | Retail Point of Sale & Inventory Management System',
    seo_description: 'SamTill POS digitizes sales, barcode scanning, stock tracking, and shop-owner mobile oversight.',
  },
  {
    id: 'proj-2',
    name: 'SamleyBook',
    slug: 'samleybook',
    category: 'Smart Appointment Booking and Management Platform',
    attribution: 'A product by SamTeck Digital',
    status: 'Working',
    publishing_status: 'published',
    is_featured: true,
    display_order: 2,
    short_description: 'QR-powered appointment booking platform that helps service-based businesses manage appointments and communicate with customers through automated SMS notifications.',
    full_description: 'SamleyBook is an automated appointment management and communication platform designed for salons and service enterprises. Customers access bookings via instant QR scan without application installation, choose service slots, and receive scheduled SMS updates and reminders.',
    problem_statement: 'The concept originated from observing long waiting times and inefficient appointment scheduling during visits to a busy salon. Customers arrived and waited without reliable appointment coordination. Some were asked to return later but still experienced delays.',
    solution_description: 'SamleyBook is a QR-powered appointment booking platform that helps service-based businesses manage appointments and communicate with customers through automated SMS notifications.',
    features: [
      'Business registration',
      'Business service and price configuration',
      'Unique QR-code booking access',
      'Customer booking without registration',
      'No additional app installation required',
      'Customer name and telephone number collection',
      'Service, date and time selection',
      'Partial and full payment options',
      'Owner-controlled booking confirmation',
      'SMS booking confirmation',
      'SMS reminder 24 hours before appointments',
      'SMS reminder five minutes before appointments',
      'Post-service feedback link by SMS',
    ],
    technologies: ['React', 'Node.js', 'Supabase', 'SasuSync SMS integration', 'Moolre payment gateway', 'Vercel deployment'],
    owner_role: 'Creator & Full-Stack Developer',
    contributions: 'Independently built by Samson without collaborators. Engineered the complete QR booking flow, SasuSync SMS automation schedule, and Moolre checkout.',
    live_url: '',
    github_url: '',
    screenshots: [],
    seo_title: 'SamleyBook | Smart QR Appointment Booking & SMS Reminders',
    seo_description: 'Smart appointment booking platform with QR code access, Moolre payments, and SasuSync SMS automation.',
  },
  {
    id: 'proj-3',
    name: 'Samly Provision Shop SaaS',
    slug: 'samly-provision-shop',
    category: 'Multi-Tenant Retail Management SaaS',
    attribution: 'A product by SamTeck Digital',
    status: 'Under Development',
    publishing_status: 'published',
    is_featured: true,
    display_order: 3,
    short_description: 'Multi-tenant retail management platform designed to simplify sales calculations, product searches and subscription-based business management.',
    full_description: 'Samly Provision Shop SaaS is a cloud retail management platform designed for high-turnover neighbourhood shops. It features rapid change computation, product lookup, and automated subscription renewal billing.',
    problem_statement: 'The idea came from observing a busy provision shop at Tuesday Market, Mamprobi, Accra. The shop owner relied on a calculator for product totals and a physical notebook to check prices. These manual processes delayed customer transactions and increased waiting times.',
    solution_description: 'Samly Provision Shop SaaS is a multi-tenant retail management platform designed to simplify sales calculations, product searches and subscription-based business management.',
    features: [
      'Automatic price calculation',
      'Automatic customer change calculation',
      'Product search',
      'Multi-tenant business registration',
      'Subscription management',
      'Moolre subscription payment integration',
      'SasuSync SMS notifications for subscription due dates',
    ],
    technologies: ['React', 'Node.js', 'Supabase', 'Moolre', 'SasuSync', 'Vercel'],
    owner_role: 'Lead SaaS Builder',
    contributions: 'Spearheaded multi-tenant tenant isolation, price summing algorithm, change calculator, and billing SMS dispatcher.',
    live_url: '',
    github_url: '',
    screenshots: [],
    seo_title: 'Samly Provision Shop SaaS | Cloud Retail Platform for High-Turnover Shops',
    seo_description: 'Multi-tenant provision shop SaaS automating checkout calculations and subscription renewals.',
  },
  {
    id: 'proj-4',
    name: 'SamleyEduSuite',
    slug: 'samleyedusuite',
    category: 'School Management and Academic Reporting Platform',
    attribution: 'A product by SamTeck Digital',
    status: 'Completed',
    publishing_status: 'published',
    is_featured: true,
    display_order: 4,
    short_description: 'School management platform designed to support academic reporting, student-parent relationships, teacher communication and administrative monitoring.',
    full_description: 'SamleyEduSuite is a school management platform built in strict alignment with the Ghanaian educational curriculum. It enables teachers to record continuous assessment scores, generate terminal report cards, and grant parents immediate digital access.',
    problem_statement: 'The concept came from identifying gaps in school management platforms, particularly around academic report generation aligned with the Ghanaian curriculum and communication between parents and teachers.',
    solution_description: 'SamleyEduSuite is a school management platform designed to support academic reporting, student-parent relationships, teacher communication and administrative monitoring.',
    features: [
      'Ghanaian curriculum-based report generation',
      'Real-time parent access to published report cards',
      'Student-parent linking',
      'Parent-teacher communication',
      'Teacher feedback and reviews',
      'Administrative monitoring',
      'Student promotion',
      'Manual payment management with automatic approval',
    ],
    technologies: ['React', 'Node.js', 'Supabase', 'Vercel'],
    owner_role: 'Architect & Lead Engineer',
    contributions: 'Engineered the Ghanaian curriculum grading matrix, terminal report card generation engine, parent verification, and student promotion pipelines.',
    live_url: '',
    github_url: '',
    screenshots: [],
    seo_title: 'SamleyEduSuite | Ghanaian Curriculum School Management Platform',
    seo_description: 'Academic reporting, report card generator, and parent-teacher communication system.',
  },
  {
    id: 'proj-5',
    name: 'ResolveHub',
    slug: 'resolvehub',
    category: 'QR-Based Complaint Management SaaS',
    attribution: 'A product by SamTeck Digital',
    status: 'Completed',
    publishing_status: 'published',
    is_featured: false,
    display_order: 5,
    short_description: 'Complaint management platform that enables organisations to register service stations or branches and assign unique QR codes for instant customer feedback.',
    full_description: 'ResolveHub is a production SaaS platform currently live at getresolvehub.com. Organisations register multiple branches and service points, deploying branch-specific QR codes where customers can report grievances directly to management without app installations.',
    problem_statement: "The idea came from Samson's experience working as a security officer, where he observed that customers did not always have an effective channel to communicate complaints to management.",
    solution_description: 'ResolveHub is a complaint management platform that enables organisations to register service stations or branches and assign unique QR codes to each location. Customers scan the QR code and submit complaints through a web portal without creating an account or downloading an application.',
    features: [
      'Organisation registration',
      'Branch and station management',
      'Unique QR codes for locations',
      'No-login complaint submission',
      'Complaint categorisation',
      'Complaint descriptions',
      'Photograph uploads as evidence',
    ],
    technologies: ['React', 'Node.js', 'Neon PostgreSQL', 'Render', 'Live at getresolvehub.com'],
    owner_role: 'Founder & Full-Stack Engineer',
    contributions: 'Conceptualized from real security operations work. Engineered complete QR routing, incident notification dashboard, and photo attachment triage.',
    live_url: 'https://getresolvehub.com',
    github_url: '',
    screenshots: [],
    seo_title: 'ResolveHub | QR-Based Customer Complaint Management SaaS',
    seo_description: 'ResolveHub enables organisations to gather immediate customer complaints via location QR codes.',
  },
];

const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Founded SamTeck Digital',
    description: 'Established technology and software innovation entity dedicated to building practical SaaS and digital business systems.',
    event_date: '2023',
    type: 'achievement',
    is_completed: true,
    display_order: 1,
  },
  {
    id: 'ach-2',
    title: 'Deployed ResolveHub to Production',
    description: 'Launched QR-based complaint management platform live to organizations at getresolvehub.com.',
    event_date: '2024',
    type: 'achievement',
    is_completed: true,
    display_order: 2,
  },
  {
    id: 'ach-3',
    title: 'BSc Computer Science Completion',
    description: 'Accra Institute of Technology (AIT) Bachelor of Science in Computer Science graduation milestone.',
    event_date: 'Upcoming',
    type: 'upcoming_event',
    is_completed: false,
    display_order: 3,
  },
];

const INITIAL_SETTINGS: WebsiteSettings = {
  site_title: 'Samson Egbetorke | Software Developer & SaaS Builder',
  meta_description: 'Explore the professional portfolio of Samson Egbetorke, a software developer, SaaS builder and technology innovator creating practical software solutions and digital products.',
  contact_email: 'samtechdigital@gmail.com',
  location: 'Accra, Ghana',
  business_name: 'SamTeck Digital',
  github_url: 'https://github.com/samteckdigital',
  linkedin_url: 'https://linkedin.com/in/samsonegbetorke',
  twitter_url: 'https://x.com/samteckdigital',
};

// In-memory cache synced with localStorage for resilient offline/development workflow
const STORAGE_KEYS = {
  PROFILE: 'samteck_data_profile',
  EDUCATION: 'samteck_data_education',
  EXPERIENCE: 'samteck_data_experience',
  SKILLS: 'samteck_data_skills',
  SERVICES: 'samteck_data_services',
  PROJECTS: 'samteck_data_projects',
  ACHIEVEMENTS: 'samteck_data_achievements',
  ENQUIRIES: 'samteck_data_enquiries',
  SETTINGS: 'samteck_data_settings',
};

function getLocalStore<T>(key: string, defaultData: T): T {
  if (typeof window === 'undefined') return defaultData;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultData;
  } catch {
    return defaultData;
  }
}

function setLocalStore<T>(key: string, data: T, notify: boolean = true): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    if (notify) {
      window.dispatchEvent(new CustomEvent('samteck_data_changed', { detail: { key } }));
    }
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

export const portfolioService = {
  // --- PROFILE ---
  async getProfile(): Promise<Profile> {
    // Prefer locally persisted data (includes admin edits that may not have
    // synced to Supabase) so changes show up on the public site immediately.
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (cached) {
        try { return JSON.parse(cached) as Profile; } catch { /* fall through */ }
      }
    }
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('profiles').select('*').limit(1).maybeSingle();
        if (!error && data) {
          setLocalStore(STORAGE_KEYS.PROFILE, data, false);
          return data;
        }
      } catch (err) {
        console.warn('Supabase query profiles fallback:', err);
      }
    }
    return getLocalStore<Profile>(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
  },

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    const current = await this.getProfile();
    const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
    const client = getSupabaseClient();
    if (client) {
      try {
        if (updated.id) {
          await client.from('profiles').update(updated).eq('id', updated.id);
        } else {
          const { data } = await client.from('profiles').insert([updated]).select().maybeSingle();
          if (data) updated.id = data.id;
        }
      } catch (err) {
        console.error('Failed to update profile in Supabase:', err);
      }
    }
    setLocalStore(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },

  // --- EDUCATION ---
  async getEducation(): Promise<EducationItem[]> {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.EDUCATION);
      if (cached) {
        try { const parsed = JSON.parse(cached) as EducationItem[]; if (parsed && parsed.length) return parsed; } catch { /* fall through */ }
      }
    }
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('education').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          setLocalStore(STORAGE_KEYS.EDUCATION, data, false);
          return data;
        }
      } catch (err) {
        console.warn('Supabase query education fallback:', err);
      }
    }
    return getLocalStore<EducationItem[]>(STORAGE_KEYS.EDUCATION, INITIAL_EDUCATION);
  },

  async saveEducation(item: EducationItem): Promise<EducationItem> {
    const list = await this.getEducation();
    const client = getSupabaseClient();
    let result = item;

    if (client) {
      try {
        if (item.id && !item.id.startsWith('edu-')) {
          await client.from('education').update(item).eq('id', item.id);
        } else {
          const { data } = await client.from('education').insert([{
            institution: item.institution,
            qualification: item.qualification,
            details: item.details,
            status: item.status,
            display_order: item.display_order,
            is_visible: item.is_visible,
          }]).select().single();
          if (data) result = data;
        }
      } catch (err) {
        console.error('Failed to save education in Supabase:', err);
      }
    }

    const index = list.findIndex(e => e.id === item.id);
    if (index >= 0) {
      list[index] = result;
    } else {
      list.push(result);
    }
    setLocalStore(STORAGE_KEYS.EDUCATION, list);
    return result;
  },

  async deleteEducation(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('education').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete education error:', err);
      }
    }
    const list = (await this.getEducation()).filter(e => e.id !== id);
    setLocalStore(STORAGE_KEYS.EDUCATION, list);
  },

  // --- WORK EXPERIENCE ---
  async getExperience(): Promise<WorkExperienceItem[]> {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
      if (cached) {
        try { const parsed = JSON.parse(cached) as WorkExperienceItem[]; if (parsed && parsed.length) return parsed; } catch { /* fall through */ }
      }
    }
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('work_experience').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          setLocalStore(STORAGE_KEYS.EXPERIENCE, data, false);
          return data;
        }
      } catch (err) {
        console.warn('Supabase query experience fallback:', err);
      }
    }
    return getLocalStore<WorkExperienceItem[]>(STORAGE_KEYS.EXPERIENCE, INITIAL_EXPERIENCE);
  },

  async saveExperience(item: WorkExperienceItem): Promise<WorkExperienceItem> {
    const list = await this.getExperience();
    const client = getSupabaseClient();
    let result = item;

    if (client) {
      try {
        if (item.id && !item.id.startsWith('exp-')) {
          await client.from('work_experience').update(item).eq('id', item.id);
        } else {
          const { data } = await client.from('work_experience').insert([{
            role_title: item.role_title,
            company_or_org: item.company_or_org,
            description: item.description,
            start_date: item.start_date,
            end_date: item.end_date,
            is_current: item.is_current,
            display_order: item.display_order,
            is_visible: item.is_visible,
          }]).select().single();
          if (data) result = data;
        }
      } catch (err) {
        console.error('Failed to save experience in Supabase:', err);
      }
    }

    const index = list.findIndex(e => e.id === item.id);
    if (index >= 0) {
      list[index] = result;
    } else {
      list.push(result);
    }
    setLocalStore(STORAGE_KEYS.EXPERIENCE, list);
    return result;
  },

  async deleteExperience(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('work_experience').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete experience error:', err);
      }
    }
    const list = (await this.getExperience()).filter(e => e.id !== id);
    setLocalStore(STORAGE_KEYS.EXPERIENCE, list);
  },

  // --- SKILLS & CATEGORIES ---
  async getSkillCategories(): Promise<SkillCategory[]> {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (cached) {
        try { const parsed = JSON.parse(cached) as SkillCategory[]; if (parsed && parsed.length) return parsed; } catch { /* fall through */ }
      }
    }
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data: categories, error: catError } = await client
          .from('skill_categories')
          .select('*, skills(*)')
          .order('display_order', { ascending: true });

        if (!catError && categories && categories.length > 0) {
          setLocalStore(STORAGE_KEYS.SKILLS, categories, false);
          return categories;
        }
      } catch (err) {
        console.warn('Supabase query skills fallback:', err);
      }
    }
    return getLocalStore<SkillCategory[]>(STORAGE_KEYS.SKILLS, INITIAL_SKILL_CATEGORIES);
  },

  async saveSkillCategory(category: SkillCategory): Promise<SkillCategory> {
    const list = await this.getSkillCategories();
    const client = getSupabaseClient();
    let result = category;

    if (client) {
      try {
        if (category.id && !category.id.startsWith('sc-')) {
          await client.from('skill_categories').update({
            name: category.name,
            display_order: category.display_order,
          }).eq('id', category.id);
        } else {
          const { data } = await client.from('skill_categories').insert([{
            name: category.name,
            display_order: category.display_order,
          }]).select().single();
          if (data) result = { ...category, id: data.id };
        }
      } catch (err) {
        console.error('Supabase save skill category error:', err);
      }
    }

    const idx = list.findIndex(c => c.id === category.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], name: result.name, display_order: result.display_order };
    } else {
      list.push({ ...result, skills: [] });
    }
    setLocalStore(STORAGE_KEYS.SKILLS, list);
    return result;
  },

  async addSkill(categoryId: string, skillName: string): Promise<void> {
    const categories = await this.getSkillCategories();
    const cat = categories.find(c => c.id === categoryId);
    if (!cat) return;

    const newSkill = {
      id: `s-${Date.now()}`,
      category_id: categoryId,
      name: skillName.trim(),
      display_order: (cat.skills?.length || 0) + 1,
      is_visible: true,
    };

    const client = getSupabaseClient();
    if (client && !categoryId.startsWith('sc-')) {
      try {
        const { data } = await client.from('skills').insert([{
          category_id: categoryId,
          name: skillName.trim(),
          display_order: newSkill.display_order,
          is_visible: true,
        }]).select().single();
        if (data) newSkill.id = data.id;
      } catch (err) {
        console.error('Supabase add skill error:', err);
      }
    }

    if (!cat.skills) cat.skills = [];
    cat.skills.push(newSkill);
    setLocalStore(STORAGE_KEYS.SKILLS, categories);
  },

  async deleteSkill(categoryId: string, skillId: string): Promise<void> {
    const categories = await this.getSkillCategories();
    const cat = categories.find(c => c.id === categoryId);
    if (!cat || !cat.skills) return;

    const client = getSupabaseClient();
    if (client && !skillId.startsWith('s-')) {
      try {
        await client.from('skills').delete().eq('id', skillId);
      } catch (err) {
        console.error('Supabase delete skill error:', err);
      }
    }

    cat.skills = cat.skills.filter(s => s.id !== skillId);
    setLocalStore(STORAGE_KEYS.SKILLS, categories);
  },

  // --- SERVICES ---
  async getServices(): Promise<ServiceItem[]> {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (cached) {
        try { const parsed = JSON.parse(cached) as ServiceItem[]; if (parsed && parsed.length) return parsed; } catch { /* fall through */ }
      }
    }
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('services').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          setLocalStore(STORAGE_KEYS.SERVICES, data, false);
          return data;
        }
      } catch (err) {
        console.warn('Supabase query services fallback:', err);
      }
    }
    return getLocalStore<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  },

  async saveService(item: ServiceItem): Promise<ServiceItem> {
    const list = await this.getServices();
    const client = getSupabaseClient();
    let result = item;

    if (client) {
      try {
        if (item.id && !item.id.startsWith('srv-')) {
          await client.from('services').update(item).eq('id', item.id);
        } else {
          const { data } = await client.from('services').insert([{
            title: item.title,
            description: item.description,
            icon_name: item.icon_name,
            display_order: item.display_order,
            is_published: item.is_published,
          }]).select().single();
          if (data) result = data;
        }
      } catch (err) {
        console.error('Supabase save service error:', err);
      }
    }

    const index = list.findIndex(s => s.id === item.id);
    if (index >= 0) {
      list[index] = result;
    } else {
      list.push(result);
    }
    setLocalStore(STORAGE_KEYS.SERVICES, list);
    return result;
  },

  async deleteService(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('services').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete service error:', err);
      }
    }
    const list = (await this.getServices()).filter(s => s.id !== id);
    setLocalStore(STORAGE_KEYS.SERVICES, list);
  },

  // --- PROJECTS ---
  async getProjects(filter?: { publishedOnly?: boolean; featuredOnly?: boolean }): Promise<ProjectItem[]> {
    let list: ProjectItem[] = [];

    // Prefer locally persisted data so admin edits (including images) show up.
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as ProjectItem[];
          if (parsed && parsed.length) {
            list = parsed;
            if (filter?.publishedOnly) list = list.filter(p => p.publishing_status === 'published');
            if (filter?.featuredOnly) list = list.filter(p => p.is_featured);
            return list;
          }
        } catch { /* fall through */ }
      }
    }

    const client = getSupabaseClient();
    if (client) {
      try {
        let query = client.from('projects').select('*, project_images(*)').order('display_order', { ascending: true });
        if (filter?.publishedOnly) {
          query = query.eq('publishing_status', 'published');
        }
        if (filter?.featuredOnly) {
          query = query.eq('is_featured', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          list = data.map(p => ({
            ...p,
            screenshots: p.project_images || [],
          }));
          setLocalStore(STORAGE_KEYS.PROJECTS, list, false);
          if (filter?.publishedOnly) list = list.filter(p => p.publishing_status === 'published');
          if (filter?.featuredOnly) list = list.filter(p => p.is_featured);
          return list;
        }
      } catch (err) {
        console.warn('Supabase query projects fallback:', err);
      }
    }

    list = getLocalStore<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    if (filter?.publishedOnly) {
      list = list.filter(p => p.publishing_status === 'published');
    }
    if (filter?.featuredOnly) {
      list = list.filter(p => p.is_featured);
    }
    return list;
  },

  async getProjectBySlug(slug: string): Promise<ProjectItem | null> {
    // Prefer locally persisted data so admin edits (including images) are reflected.
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (cached) {
        try {
          const projects = JSON.parse(cached) as ProjectItem[];
          const found = projects.find(p => p.slug === slug);
          if (found) return found;
        } catch { /* fall through */ }
      }
    }
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('projects').select('*, project_images(*)').eq('slug', slug).maybeSingle();
        if (!error && data) {
          return {
            ...data,
            screenshots: data.project_images || [],
          };
        }
      } catch (err) {
        console.warn('Supabase query slug error:', err);
      }
    }
    const projects = await this.getProjects();
    return projects.find(p => p.slug === slug) || null;
  },

  async saveProject(project: ProjectItem): Promise<ProjectItem> {
    const list = await this.getProjects();
    const client = getSupabaseClient();
    let result = { ...project, updated_at: new Date().toISOString() };

    if (client) {
      try {
        const payload = {
          name: project.name,
          slug: project.slug,
          category: project.category,
          attribution: project.attribution,
          status: project.status,
          publishing_status: project.publishing_status,
          is_featured: project.is_featured,
          display_order: project.display_order,
          short_description: project.short_description,
          full_description: project.full_description,
          problem_statement: project.problem_statement,
          solution_description: project.solution_description,
          features: project.features,
          technologies: project.technologies,
          owner_role: project.owner_role,
          contributions: project.contributions,
          live_url: project.live_url || null,
          github_url: project.github_url || null,
          cover_image_url: project.cover_image_url || null,
          seo_title: project.seo_title,
          seo_description: project.seo_description,
          updated_at: new Date().toISOString(),
        };

        if (project.id && !project.id.startsWith('proj-')) {
          await client.from('projects').update(payload).eq('id', project.id);
        } else {
          const { data } = await client.from('projects').insert([payload]).select().single();
          if (data) result.id = data.id;
        }
      } catch (err) {
        console.error('Supabase save project error:', err);
      }
    }

    const idx = list.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      list[idx] = result;
    } else {
      list.push(result);
    }
    setLocalStore(STORAGE_KEYS.PROJECTS, list);
    return result;
  },

  async deleteProject(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('projects').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete project error:', err);
      }
    }
    const list = (await this.getProjects()).filter(p => p.id !== id);
    setLocalStore(STORAGE_KEYS.PROJECTS, list);
  },

  // --- STORAGE MEDIA UPLOAD ---
  async uploadMedia(file: File, folder: string = 'projects'): Promise<string> {
    const client = getSupabaseClient();
    if (client) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const { error: uploadError } = await client.storage
          .from('portfolio-media')
          .upload(fileName, file, { cacheControl: '3600', upsert: true });

        if (!uploadError) {
          const { data } = client.storage.from('portfolio-media').getPublicUrl(fileName);
          return data.publicUrl;
        }
      } catch (err) {
        console.error('Supabase storage upload error:', err);
      }
    }

    // Local data-URL fallback so the image persists in storage/DB instead of a
    // session-only blob URL (which breaks after a page reload).
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(URL.createObjectURL(file));
      reader.readAsDataURL(file);
    });
  },

  // --- ACHIEVEMENTS ---
  async getAchievements(): Promise<AchievementItem[]> {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (cached) {
        try { const parsed = JSON.parse(cached) as AchievementItem[]; if (parsed && parsed.length) return parsed; } catch { /* fall through */ }
      }
    }
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('achievements').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          setLocalStore(STORAGE_KEYS.ACHIEVEMENTS, data, false);
          return data;
        }
      } catch (err) {
        console.warn('Supabase query achievements fallback:', err);
      }
    }
    return getLocalStore<AchievementItem[]>(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  },

  async saveAchievement(item: AchievementItem): Promise<AchievementItem> {
    const list = await this.getAchievements();
    const client = getSupabaseClient();
    let result = item;

    if (client) {
      try {
        if (item.id && !item.id.startsWith('ach-')) {
          await client.from('achievements').update(item).eq('id', item.id);
        } else {
          const { data } = await client.from('achievements').insert([{
            title: item.title,
            description: item.description,
            event_date: item.event_date,
            type: item.type,
            is_completed: item.is_completed,
            display_order: item.display_order,
          }]).select().single();
          if (data) result = data;
        }
      } catch (err) {
        console.error('Supabase save achievement error:', err);
      }
    }

    const idx = list.findIndex(a => a.id === item.id);
    if (idx >= 0) {
      list[idx] = result;
    } else {
      list.push(result);
    }
    setLocalStore(STORAGE_KEYS.ACHIEVEMENTS, list);
    return result;
  },

  async deleteAchievement(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('achievements').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete achievement error:', err);
      }
    }
    const list = (await this.getAchievements()).filter(a => a.id !== id);
    setLocalStore(STORAGE_KEYS.ACHIEVEMENTS, list);
  },

  // --- CONTACT ENQUIRIES ---
  async submitContactEnquiry(enquiry: Omit<ContactEnquiryItem, 'id' | 'status' | 'created_at'>): Promise<boolean> {
    const newRecord: ContactEnquiryItem = {
      id: `enq-${Date.now()}`,
      full_name: enquiry.full_name,
      email: enquiry.email,
      subject: enquiry.subject,
      message: enquiry.message,
      status: 'unread',
      created_at: new Date().toISOString(),
    };

    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await client.from('contact_enquiries').insert([{
          full_name: enquiry.full_name,
          email: enquiry.email,
          subject: enquiry.subject,
          message: enquiry.message,
          status: 'unread',
        }]);
        if (!error) return true;
      } catch (err) {
        console.error('Supabase submit contact enquiry error:', err);
      }
    }

    // Save locally
    const existing = getLocalStore<ContactEnquiryItem[]>(STORAGE_KEYS.ENQUIRIES, []);
    existing.unshift(newRecord);
    setLocalStore(STORAGE_KEYS.ENQUIRIES, existing);
    return true;
  },

  async getContactEnquiries(): Promise<ContactEnquiryItem[]> {
    const local = getLocalStore<ContactEnquiryItem[]>(STORAGE_KEYS.ENQUIRIES, []);
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('contact_enquiries').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          // Merge server + local, dedup by id, so admin edits/local submissions survive.
          const merged = [...data];
          for (const l of local) {
            if (!merged.find(m => m.id === l.id)) merged.unshift(l);
          }
          merged.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
          setLocalStore(STORAGE_KEYS.ENQUIRIES, merged, false);
          return merged;
        }
      } catch (err) {
        console.warn('Supabase query contact enquiries fallback:', err);
      }
    }
    return local;
  },

  async updateEnquiryStatus(id: string, status: ContactEnquiryItem['status']): Promise<void> {
    const client = getSupabaseClient();
    if (client && !id.startsWith('enq-')) {
      try {
        await client.from('contact_enquiries').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Supabase update enquiry status error:', err);
      }
    }
    const list = await this.getContactEnquiries();
    const target = list.find(e => e.id === id);
    if (target) {
      target.status = status;
      setLocalStore(STORAGE_KEYS.ENQUIRIES, list);
    }
  },

  async deleteEnquiry(id: string): Promise<void> {
    const client = getSupabaseClient();
    if (client && !id.startsWith('enq-')) {
      try {
        await client.from('contact_enquiries').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete enquiry error:', err);
      }
    }
    const list = (await this.getContactEnquiries()).filter(e => e.id !== id);
    setLocalStore(STORAGE_KEYS.ENQUIRIES, list);
  },

  // --- WEBSITE SETTINGS ---
  async getWebsiteSettings(): Promise<WebsiteSettings> {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (cached) {
        try { return JSON.parse(cached) as WebsiteSettings; } catch { /* fall through */ }
      }
    }
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client.from('website_settings').select('*').eq('key', 'general').maybeSingle();
        if (!error && data && data.value) {
          setLocalStore(STORAGE_KEYS.SETTINGS, data.value, false);
          return data.value;
        }
      } catch (err) {
        console.warn('Supabase query settings fallback:', err);
      }
    }
    return getLocalStore<WebsiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  async updateWebsiteSettings(settings: WebsiteSettings): Promise<WebsiteSettings> {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('website_settings').upsert({
          key: 'general',
          value: settings,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Supabase update settings error:', err);
      }
    }
    setLocalStore(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  // Reset to initial authentic data if needed
  resetToInitial() {
    setLocalStore(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
    setLocalStore(STORAGE_KEYS.EDUCATION, INITIAL_EDUCATION);
    setLocalStore(STORAGE_KEYS.EXPERIENCE, INITIAL_EXPERIENCE);
    setLocalStore(STORAGE_KEYS.SKILLS, INITIAL_SKILL_CATEGORIES);
    setLocalStore(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    setLocalStore(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    setLocalStore(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    setLocalStore(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },
};
