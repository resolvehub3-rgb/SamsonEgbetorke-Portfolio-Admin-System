/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectStats {
  total: number;
  published: number;
  drafts: number;
  archived: number;
  completed: number;
  working: number;
  underDevelopment: number;
  concept: number;
  featuredCount: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: 'Completed' | 'Working' | 'Under Development' | 'Concept';
  publishing_status: 'published' | 'draft' | 'archived';
  is_featured: boolean;
  display_order: number;
  created_at?: string;
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

/**
 * Calculates real aggregate metrics for dashboard
 */
export function calculateProjectStats(projects: ProjectItem[]): ProjectStats {
  const stats: ProjectStats = {
    total: projects.length,
    published: 0,
    drafts: 0,
    archived: 0,
    completed: 0,
    working: 0,
    underDevelopment: 0,
    concept: 0,
    featuredCount: 0,
  };

  for (const p of projects) {
    if (p.publishing_status === 'published') stats.published++;
    else if (p.publishing_status === 'draft') stats.drafts++;
    else if (p.publishing_status === 'archived') stats.archived++;

    if (p.status === 'Completed') stats.completed++;
    else if (p.status === 'Working') stats.working++;
    else if (p.status === 'Under Development') stats.underDevelopment++;
    else if (p.status === 'Concept') stats.concept++;

    if (p.is_featured && p.publishing_status === 'published') {
      stats.featuredCount++;
    }
  }

  return stats;
}

/**
 * Calculates enquiry statistics
 */
export function calculateEnquiryStats(enquiries: ContactEnquiryItem[]) {
  const total = enquiries.length;
  const unread = enquiries.filter(e => e.status === 'unread').length;
  const replied = enquiries.filter(e => e.status === 'replied').length;
  const spam = enquiries.filter(e => e.status === 'spam').length;
  return { total, unread, replied, spam };
}

/**
 * Generates URL-friendly slug
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validates contact form fields
 */
export function validateContactForm(data: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sorts items by display_order ascending
 */
export function sortByDisplayOrder<T extends { display_order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.display_order - b.display_order);
}
