-- ==============================================================================
-- INITIAL VERIFIED SEED DATA FOR SAMSON EGBETORKE PORTFOLIO
-- Real data provided directly by Samson Egbetorke / SamTeck Digital
-- ==============================================================================

-- 1. PROFILE
INSERT INTO public.profiles (
  full_name,
  title,
  business_name,
  short_intro,
  bio,
  location,
  email,
  github_url,
  linkedin_url,
  twitter_url
) VALUES (
  'Samson Egbetorke',
  'Software Developer | SaaS Builder | Technology Innovator',
  'SamTeck Digital',
  'Founder of SamTeck Digital. Focused on identifying real-world problems and building practical software applications, SaaS platforms, business management systems and intelligent digital solutions.',
  'My journey into software development began with a simple curiosity: how can technology be used to identify problems and create solutions that make everyday work easier?

Growing up in Ghana''s Volta Region, I developed an interest in technology despite having limited access to the resources needed to learn programming. Without a personal laptop at the time, I made use of internet cafés, a flash drive and every available opportunity to explore and learn.

After moving to Accra, I acquired my own computer and became more committed to developing my programming skills. I began my learning journey with Python before transitioning into frontend development with HTML, CSS and JavaScript. My curiosity and continuous learning led me to React for frontend development, Node.js for backend engineering, and database technologies including Supabase and PostgreSQL.

Today, I focus on designing and developing practical software products, business management systems and intelligent digital solutions.

What drives me is the belief that technology should reduce unnecessary pressure, minimise paperwork, improve efficiency and make everyday business operations faster and easier.

My long-term ambition is to become an outstanding technology innovator, contributing to Ghana''s technological advancement by building meaningful solutions to real-world problems.',
  'Accra, Ghana',
  'samtechdigital@gmail.com',
  'https://github.com/samteckdigital',
  'https://linkedin.com/in/samsonegbetorke',
  'https://x.com/samteckdigital'
) ON CONFLICT DO NOTHING;

-- 2. EDUCATION
INSERT INTO public.education (institution, qualification, details, status, display_order, is_visible) VALUES
('Accra Institute of Technology (AIT)', 'Bachelor of Science in Computer Science', 'Currently pursuing degree studies focused on software engineering, algorithms, and computational systems.', 'in_progress', 1, true),
('IPMC Training College', 'Diploma Studies in Technology', 'Comprehensive technology foundation coursework and practical computing modules.', 'completed', 2, true),
('Abor Senior High School', 'WASSCE (West African Senior School Certificate)', 'Visual Arts, Graphic Design, Elective ICT', 'completed', 3, true)
ON CONFLICT DO NOTHING;

-- 3. WORK EXPERIENCE
INSERT INTO public.work_experience (role_title, company_or_org, description, start_date, end_date, is_current, display_order, is_visible) VALUES
('Independent Technology Developer', 'Self-Employed / SamTeck Digital', 'Full-stack software development, SaaS product architecture, and building practical business management solutions.', '2023', 'Present', true, 1, true),
('ICT Teacher', 'Virgin Proprietary School', 'Delivered computer studies and practical digital literacy instruction to foundational and junior students.', '2022', '2023', false, 2, true),
('Security Officer', 'Zen Petroleum Limited, Korle Gonno Branch', 'Maintained station security and customer service; observed operational bottlenecks that inspired future complaint management SaaS innovation (ResolveHub).', '2021', '2022', false, 3, true),
('Graphic Design & Printing Assistant', 'Elegance Innovations, Osu, Accra', 'Assisted with branding, typography, print reproduction, and visual communication materials.', '2020', '2021', false, 4, true),
('Building Construction Assistant', 'Site Operations', 'Supported general building and physical construction activities, instilling practical discipline and attention to detail.', '2019', '2020', false, 5, true)
ON CONFLICT DO NOTHING;

-- 4. SKILL CATEGORIES & SKILLS
DO $$
DECLARE
  cat_lang UUID;
  cat_fe UUID;
  cat_be UUID;
  cat_db UUID;
  cat_tools UUID;
  cat_ai UUID;
  cat_deploy UUID;
BEGIN
  INSERT INTO public.skill_categories (name, display_order) VALUES ('Programming Languages', 1) RETURNING id INTO cat_lang;
  INSERT INTO public.skill_categories (name, display_order) VALUES ('Frontend', 2) RETURNING id INTO cat_fe;
  INSERT INTO public.skill_categories (name, display_order) VALUES ('Backend', 3) RETURNING id INTO cat_be;
  INSERT INTO public.skill_categories (name, display_order) VALUES ('Databases', 4) RETURNING id INTO cat_db;
  INSERT INTO public.skill_categories (name, display_order) VALUES ('Development Tools', 5) RETURNING id INTO cat_tools;
  INSERT INTO public.skill_categories (name, display_order) VALUES ('AI Development Tools', 6) RETURNING id INTO cat_ai;
  INSERT INTO public.skill_categories (name, display_order) VALUES ('Deployment', 7) RETURNING id INTO cat_deploy;

  -- Skills
  INSERT INTO public.skills (category_id, name, display_order) VALUES
  (cat_lang, 'Python', 1),
  (cat_lang, 'JavaScript', 2),
  (cat_lang, 'TypeScript', 3),

  (cat_fe, 'HTML', 1),
  (cat_fe, 'CSS', 2),
  (cat_fe, 'React', 3),

  (cat_be, 'Node.js', 1),

  (cat_db, 'Supabase', 1),
  (cat_db, 'PostgreSQL', 2),
  (cat_db, 'Neon', 3),

  (cat_tools, 'Visual Studio Code', 1),
  (cat_tools, 'Git', 2),
  (cat_tools, 'GitHub', 3),

  (cat_ai, 'OpenCode', 1),
  (cat_ai, 'Google AI Studio', 2),
  (cat_ai, 'ChatGPT', 3),

  (cat_deploy, 'Vercel', 1);
END $$;

-- 5. SERVICES
INSERT INTO public.services (title, description, icon_name, display_order, is_published) VALUES
('Custom Software Development', 'Building applications tailored to specific business needs, operational bottlenecks, and daily operational challenges.', 'Code', 1, true),
('SaaS Development', 'Developing subscription-based business applications, multi-tenant software platforms, and cloud services.', 'Layers', 2, true),
('AI-Powered Application Development', 'Integrating AI capabilities and intelligent workflows into software to improve operational efficiency and solve practical problems.', 'Cpu', 3, true),
('Database Design and Integration', 'Designing robust relational database schemas, secure Row Level Security rules, and integrating real-time data layers.', 'Database', 4, true),
('Business Management Systems', 'Developing software systems that help organisations eliminate manual paper logs, improve efficiency, and supervise operations.', 'Building2', 5, true)
ON CONFLICT DO NOTHING;

-- 6. PROJECTS
INSERT INTO public.projects (
  name,
  slug,
  category,
  attribution,
  status,
  publishing_status,
  is_featured,
  display_order,
  short_description,
  full_description,
  problem_statement,
  solution_description,
  features,
  technologies,
  owner_role,
  contributions,
  live_url
) VALUES
(
  'SamTill POS',
  'samtill-pos',
  'Retail Point of Sale and Business Management System',
  'A product by SamTeck Digital',
  'Working',
  'published',
  true,
  1,
  'Retail point-of-sale and business management system that digitises sales and inventory while separating cashier workflows from shop-owner oversight.',
  'SamTill POS is an enterprise-grade retail point-of-sale and inventory management application designed to eliminate paper stock records and modernize shop operations. It empowers cashiers with rapid barcode scanning and receipt generation while providing business owners with remote mobile management and live financial monitoring.',
  'Many shops depend on physical stock books and manual processes for recording sales, tracking inventory, monitoring cashiers and managing business operations. Physical stock records can be damaged or lost, while manual stock management and interruptions during cashier operations can delay customer service.',
  'SamTill POS is a retail point-of-sale and business management system designed to digitise sales and inventory processes while separating cashier operations from shop-owner management activities.',
  '[
    "Product registration and barcode scanning",
    "Sales processing and receipt printing",
    "Inventory and stock management",
    "Digital stock movement book",
    "Cashier accounts and access control",
    "Shop-owner mobile management",
    "Offline sales and synchronization",
    "Customer display on a second monitor",
    "Live sales dashboards and analytics",
    "Low-stock and expiry alerts"
  ]'::jsonb,
  '["React", "Vite", "Supabase", "PostgreSQL", "Electron", "PWA"]'::jsonb,
  'Lead Architect & Full-Stack Developer',
  'Independently conceptualized, designed, and engineered the complete application architecture, dual-screen customer display, local-first offline synchronization, and owner mobile management layer.',
  NULL
),
(
  'SamleyBook',
  'samleybook',
  'Smart Appointment Booking and Management Platform',
  'A product by SamTeck Digital',
  'Working',
  'published',
  true,
  2,
  'QR-powered appointment booking platform with zero-app customer access and automated SMS notification workflows for service businesses.',
  'SamleyBook streamlines scheduling for salons, clinics, and service businesses. Customers scan a unique QR code on-site or online, select their desired service and preferred slot without downloading an app or creating an account, and receive instant SMS confirmations and timely reminders.',
  'The concept originated from observing long waiting times and inefficient appointment scheduling during visits to a busy salon. Customers arrived and waited without reliable appointment coordination. Some were asked to return later but still experienced delays.',
  'SamleyBook is a QR-powered appointment booking platform that helps service-based businesses manage appointments and communicate with customers through automated SMS notifications.',
  '[
    "Business registration",
    "Business service and price configuration",
    "Unique QR-code booking access",
    "Customer booking without registration",
    "No additional app installation required",
    "Customer name and telephone number collection",
    "Service, date and time selection",
    "Partial and full payment options",
    "Owner-controlled booking confirmation",
    "SMS booking confirmation",
    "SMS reminder 24 hours before appointments",
    "SMS reminder five minutes before appointments",
    "Post-service feedback link by SMS"
  ]'::jsonb,
  '["React", "Node.js", "Supabase", "SasuSync SMS", "Moolre Payment", "Vercel"]'::jsonb,
  'Creator & Full-Stack Engineer',
  'Independently built by Samson without collaborators. Designed booking flow, QR generation engine, SMS scheduling triggers, and payment gateway integration.',
  NULL
),
(
  'Samly Provision Shop SaaS',
  'samly-provision-shop',
  'Multi-Tenant Retail Management SaaS',
  'A product by SamTeck Digital',
  'Under Development',
  'published',
  true,
  3,
  'Multi-tenant cloud retail management platform designed to automate price calculations, customer change, and subscription management for retail shops.',
  'Samly Provision Shop SaaS replaces physical calculation books with a streamlined cloud interface tailored for high-volume retail vendors in local commercial markets. Built for quick checkout speed and low cognitive load.',
  'The idea came from observing a busy provision shop at Tuesday Market, Mamprobi, Accra. The shop owner relied on a calculator for product totals and a physical notebook to check prices. These manual processes delayed customer transactions and increased waiting times.',
  'Samly Provision Shop SaaS is a multi-tenant retail management platform designed to simplify sales calculations, product searches and subscription-based business management.',
  '[
    "Automatic price calculation",
    "Automatic customer change calculation",
    "Product search",
    "Multi-tenant business registration",
    "Subscription management",
    "Moolre subscription payment integration",
    "SasuSync SMS notifications for subscription due dates"
  ]'::jsonb,
  '["React", "Node.js", "Supabase", "Moolre", "SasuSync", "Vercel"]'::jsonb,
  'Lead SaaS Builder',
  'Engineered tenant isolation, automated price summation engine, change computing logic, and recurring billing notification pipeline.',
  NULL
),
(
  'SamleyEduSuite',
  'samleyedusuite',
  'School Management and Academic Reporting Platform',
  'A product by SamTeck Digital',
  'Completed',
  'published',
  true,
  4,
  'Comprehensive school management and academic reporting platform aligned with the Ghanaian curriculum for transparent parent-teacher collaboration.',
  'SamleyEduSuite digitizes academic record keeping, terminal report card generation, and student performance tracking in accordance with Ghanaian educational standards, providing parents with direct online access to published reports.',
  'The concept came from identifying gaps in school management platforms, particularly around academic report generation aligned with the Ghanaian curriculum and communication between parents and teachers.',
  'SamleyEduSuite is a school management platform designed to support academic reporting, student-parent relationships, teacher communication and administrative monitoring.',
  '[
    "Ghanaian curriculum-based report generation",
    "Real-time parent access to published report cards",
    "Student-parent linking",
    "Parent-teacher communication",
    "Teacher feedback and reviews",
    "Administrative monitoring",
    "Student promotion",
    "Manual payment management with automatic approval"
  ]'::jsonb,
  '["React", "Node.js", "Supabase", "Vercel"]'::jsonb,
  'Product Architect & Developer',
  'Designed full report calculation logic compliant with GES guidelines, multi-role parent/teacher permissions, and student progression pipelines.',
  NULL
),
(
  'ResolveHub',
  'resolvehub',
  'QR-Based Complaint Management SaaS',
  'A product by SamTeck Digital',
  'Completed',
  'published',
  false,
  5,
  'QR-powered customer feedback and complaint management SaaS enabling patrons to submit issues without account creation or app installation.',
  'ResolveHub is a live multi-branch complaint management platform that empowers enterprises to capture genuine customer feedback at physical touchpoints. Station-specific QR codes route complaints directly to relevant department supervisors with evidence photo support.',
  'The idea came from Samson''s experience working as a security officer, where he observed that customers did not always have an effective channel to communicate complaints to management.',
  'ResolveHub is a complaint management platform that enables organisations to register service stations or branches and assign unique QR codes to each location. Customers scan the QR code and submit complaints through a web portal without creating an account or downloading an application.',
  '[
    "Organisation registration",
    "Branch and station management",
    "Unique QR codes for locations",
    "No-login complaint submission",
    "Complaint categorisation",
    "Complaint descriptions",
    "Photograph uploads as evidence"
  ]'::jsonb,
  '["React", "Node.js", "Neon PostgreSQL", "Render", "Live at getresolvehub.com"]'::jsonb,
  'Founder & Creator',
  'Conceived from real security operational experience; built entire product lifecycle including QR routing, incident triage, and backend deployment.',
  'https://getresolvehub.com'
)
ON CONFLICT DO NOTHING;

-- 7. WEBSITE SETTINGS
INSERT INTO public.website_settings (key, value) VALUES
('general', '{
  "site_title": "Samson Egbetorke | Software Developer & SaaS Builder",
  "meta_description": "Explore the professional portfolio of Samson Egbetorke, a software developer, SaaS builder and technology innovator creating practical software solutions and digital products.",
  "contact_email": "samtechdigital@gmail.com",
  "location": "Accra, Ghana",
  "business_name": "SamTeck Digital",
  "github_url": "https://github.com/samteckdigital",
  "linkedin_url": "https://linkedin.com/in/samsonegbetorke",
  "twitter_url": "https://x.com/samteckdigital"
}'::jsonb)
ON CONFLICT DO NOTHING;
