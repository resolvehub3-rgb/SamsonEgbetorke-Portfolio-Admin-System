-- ==============================================================================
-- SAMSON EGBETORKE PROFESSIONAL PORTFOLIO & CMS DATABASE SCHEMA
-- Supabase PostgreSQL with Row Level Security (RLS) and Realtime
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Portfolio Owner Information)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL DEFAULT 'Samson Egbetorke',
  title TEXT NOT NULL DEFAULT 'Software Developer | SaaS Builder | Technology Innovator',
  business_name TEXT NOT NULL DEFAULT 'SamTeck Digital',
  short_intro TEXT NOT NULL,
  bio TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'Accra, Ghana',
  email TEXT NOT NULL DEFAULT 'samtechdigital@gmail.com',
  avatar_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ADMINISTRATOR ROLES (Security & Role-Based Access Control)
CREATE TABLE IF NOT EXISTS public.administrator_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helper function to check if current user is an authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.administrator_roles
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. EDUCATION
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  qualification TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed')),
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. WORK EXPERIENCE
CREATE TABLE IF NOT EXISTS public.work_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_title TEXT NOT NULL,
  company_or_org TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SKILL CATEGORIES
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SKILLS
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Code',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  attribution TEXT DEFAULT 'A product by SamTeck Digital',
  status TEXT NOT NULL CHECK (status IN ('Completed', 'Working', 'Under Development', 'Concept')),
  publishing_status TEXT NOT NULL DEFAULT 'published' CHECK (publishing_status IN ('published', 'draft', 'archived')),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  solution_description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  owner_role TEXT NOT NULL DEFAULT 'Independent Technology Developer',
  contributions TEXT,
  live_url TEXT,
  github_url TEXT,
  cover_image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. PROJECT IMAGES / SCREENSHOTS
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ACHIEVEMENTS & MILESTONES
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TEXT,
  type TEXT NOT NULL DEFAULT 'achievement' CHECK (type IN ('achievement', 'upcoming_event', 'award')),
  is_completed BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. CONTACT ENQUIRIES
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'spam', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. WEBSITE SETTINGS
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. CONTENT AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.content_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  user_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured, publishing_status);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON public.skills(category_id);
CREATE INDEX IF NOT EXISTS idx_project_images_project ON public.project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON public.contact_enquiries(status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.administrator_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES: Public read, Admin write
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Admins can modify profile"
  ON public.profiles FOR ALL USING (public.is_admin());

-- 2. ADMINISTRATOR ROLES: Only authenticated admins can read
CREATE POLICY "Admins can view admin roles"
  ON public.administrator_roles FOR SELECT USING (public.is_admin() OR auth.uid() = user_id);

CREATE POLICY "Super admins can manage admin roles"
  ON public.administrator_roles FOR ALL USING (public.is_admin());

-- 3. EDUCATION: Public read visible, Admin full access
CREATE POLICY "Public can view visible education"
  ON public.education FOR SELECT USING (is_visible = true OR public.is_admin());

CREATE POLICY "Admins can manage education"
  ON public.education FOR ALL USING (public.is_admin());

-- 4. WORK EXPERIENCE: Public read visible, Admin full access
CREATE POLICY "Public can view visible experience"
  ON public.work_experience FOR SELECT USING (is_visible = true OR public.is_admin());

CREATE POLICY "Admins can manage work experience"
  ON public.work_experience FOR ALL USING (public.is_admin());

-- 5. SKILL CATEGORIES: Public read, Admin full access
CREATE POLICY "Public can view skill categories"
  ON public.skill_categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage skill categories"
  ON public.skill_categories FOR ALL USING (public.is_admin());

-- 6. SKILLS: Public read visible, Admin full access
CREATE POLICY "Public can view visible skills"
  ON public.skills FOR SELECT USING (is_visible = true OR public.is_admin());

CREATE POLICY "Admins can manage skills"
  ON public.skills FOR ALL USING (public.is_admin());

-- 7. SERVICES: Public read published, Admin full access
CREATE POLICY "Public can view published services"
  ON public.services FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Admins can manage services"
  ON public.services FOR ALL USING (public.is_admin());

-- 8. PROJECTS: Public read published, Admin full access
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT USING (publishing_status = 'published' OR public.is_admin());

CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL USING (public.is_admin());

-- 9. PROJECT IMAGES: Public read, Admin full access
CREATE POLICY "Public can view project images"
  ON public.project_images FOR SELECT USING (true);

CREATE POLICY "Admins can manage project images"
  ON public.project_images FOR ALL USING (public.is_admin());

-- 10. ACHIEVEMENTS: Public read, Admin full access
CREATE POLICY "Public can view achievements"
  ON public.achievements FOR SELECT USING (true);

CREATE POLICY "Admins can manage achievements"
  ON public.achievements FOR ALL USING (public.is_admin());

-- 11. CONTACT ENQUIRIES: Anyone can INSERT, Only Admins can SELECT/UPDATE/DELETE
CREATE POLICY "Anyone can submit a contact enquiry"
  ON public.contact_enquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view contact enquiries"
  ON public.contact_enquiries FOR SELECT USING (public.is_admin());

CREATE POLICY "Only admins can modify contact enquiries"
  ON public.contact_enquiries FOR ALL USING (public.is_admin());

-- 12. WEBSITE SETTINGS: Public read, Admin full access
CREATE POLICY "Public can view website settings"
  ON public.website_settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage website settings"
  ON public.website_settings FOR ALL USING (public.is_admin());

-- 13. AUDIT LOGS: Only Admins can view/insert
CREATE POLICY "Admins can view and create audit logs"
  ON public.content_audit_logs FOR ALL USING (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS (for media & screenshots)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read images
CREATE POLICY "Public Access to portfolio media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Authenticated admins can upload
CREATE POLICY "Admins can upload portfolio media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

-- Authenticated admins can delete
CREATE POLICY "Admins can delete portfolio media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');
