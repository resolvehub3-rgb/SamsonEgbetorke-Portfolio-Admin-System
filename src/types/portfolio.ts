/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Profile {
  id?: string;
  full_name: string;
  title: string;
  business_name: string;
  short_intro: string;
  bio: string;
  location: string;
  email: string;
  avatar_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  updated_at?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  details?: string;
  status: 'in_progress' | 'completed';
  display_order: number;
  is_visible: boolean;
  created_at?: string;
}

export interface WorkExperienceItem {
  id: string;
  role_title: string;
  company_or_org: string;
  description: string;
  start_date?: string;
  end_date?: string;
  is_current: boolean;
  display_order: number;
  is_visible: boolean;
  created_at?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  display_order: number;
  skills?: SkillItem[];
}

export interface SkillItem {
  id: string;
  category_id: string;
  name: string;
  display_order: number;
  is_visible: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
  is_published: boolean;
}

export type ProjectStatus = 'Completed' | 'Working' | 'Under Development' | 'Concept';
export type PublishingStatus = 'published' | 'draft' | 'archived';

export interface ProjectImageItem {
  id: string;
  project_id: string;
  image_url: string;
  caption?: string;
  display_order: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  attribution?: string;
  status: ProjectStatus;
  publishing_status: PublishingStatus;
  is_featured: boolean;
  display_order: number;
  short_description: string;
  full_description: string;
  problem_statement: string;
  solution_description: string;
  features: string[];
  technologies: string[];
  owner_role: string;
  contributions?: string;
  live_url?: string;
  github_url?: string;
  cover_image_url?: string;
  screenshots?: ProjectImageItem[];
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  event_date?: string;
  type: 'achievement' | 'upcoming_event' | 'award';
  is_completed: boolean;
  display_order: number;
}

export interface ContactEnquiryItem {
  id: string;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'spam' | 'archived';
  created_at?: string;
}

export interface WebsiteSettings {
  site_title: string;
  meta_description: string;
  contact_email: string;
  location: string;
  business_name: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
}
