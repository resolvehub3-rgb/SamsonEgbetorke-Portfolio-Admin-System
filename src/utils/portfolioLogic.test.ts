import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProjectStats,
  calculateEnquiryStats,
  generateSlug,
  validateContactForm,
  sortByDisplayOrder,
  ProjectItem,
  ContactEnquiryItem,
} from './portfolioLogic.ts';

test('calculateProjectStats calculates counts correctly from records', () => {
  const sampleProjects: ProjectItem[] = [
    {
      id: '1',
      name: 'SamTill POS',
      slug: 'samtill-pos',
      category: 'Retail POS',
      status: 'Working',
      publishing_status: 'published',
      is_featured: true,
      display_order: 1,
    },
    {
      id: '2',
      name: 'SamleyBook',
      slug: 'samleybook',
      category: 'Smart Booking',
      status: 'Working',
      publishing_status: 'published',
      is_featured: true,
      display_order: 2,
    },
    {
      id: '3',
      name: 'Samly Provision Shop SaaS',
      slug: 'samly-provision-shop',
      category: 'Retail SaaS',
      status: 'Under Development',
      publishing_status: 'published',
      is_featured: true,
      display_order: 3,
    },
    {
      id: '4',
      name: 'SamleyEduSuite',
      slug: 'samleyedusuite',
      category: 'School Management',
      status: 'Completed',
      publishing_status: 'published',
      is_featured: true,
      display_order: 4,
    },
    {
      id: '5',
      name: 'ResolveHub',
      slug: 'resolvehub',
      category: 'Complaint SaaS',
      status: 'Completed',
      publishing_status: 'published',
      is_featured: false,
      display_order: 5,
    },
    {
      id: '6',
      name: 'Internal Draft',
      slug: 'internal-draft',
      category: 'Internal',
      status: 'Concept',
      publishing_status: 'draft',
      is_featured: false,
      display_order: 6,
    },
  ];

  const stats = calculateProjectStats(sampleProjects);
  assert.equal(stats.total, 6);
  assert.equal(stats.published, 5);
  assert.equal(stats.drafts, 1);
  assert.equal(stats.archived, 0);
  assert.equal(stats.completed, 2);
  assert.equal(stats.working, 2);
  assert.equal(stats.underDevelopment, 1);
  assert.equal(stats.concept, 1);
  assert.equal(stats.featuredCount, 4);
});

test('calculateEnquiryStats calculates unread and total enquiries accurately', () => {
  const enquiries: ContactEnquiryItem[] = [
    {
      id: 'e1',
      full_name: 'Kwame Mensah',
      email: 'kwame@example.com',
      subject: 'Custom SaaS development inquiry',
      message: 'Hello Samson, we need an inventory app.',
      status: 'unread',
    },
    {
      id: 'e2',
      full_name: 'Ama Serwaa',
      email: 'ama@example.com',
      subject: 'SamleyBook integration',
      message: 'Can this connect to our salon branch?',
      status: 'read',
    },
    {
      id: 'e3',
      full_name: 'Spam Bot',
      email: 'spam@bad.com',
      subject: 'Earn money fast',
      message: 'Click this link right now.',
      status: 'spam',
    },
  ];

  const stats = calculateEnquiryStats(enquiries);
  assert.equal(stats.total, 3);
  assert.equal(stats.unread, 1);
  assert.equal(stats.spam, 1);
});

test('generateSlug generates valid URL-safe strings', () => {
  assert.equal(generateSlug('SamTill POS'), 'samtill-pos');
  assert.equal(generateSlug('Samly Provision Shop SaaS'), 'samly-provision-shop-saas');
  assert.equal(generateSlug('AI-Powered Application! & Tool'), 'ai-powered-application-tool');
});

test('validateContactForm checks validation rules', () => {
  const invalid = validateContactForm({
    fullName: '',
    email: 'invalid-email',
    subject: 'hi',
    message: 'short',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    fullName: 'John Doe',
    email: 'john@samteck.com',
    subject: 'Project inquiry',
    message: 'We would love to discuss a business management system.',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('sortByDisplayOrder orders items sequentially', () => {
  const items = [
    { id: 'b', display_order: 3 },
    { id: 'a', display_order: 1 },
    { id: 'c', display_order: 2 },
  ];
  const sorted = sortByDisplayOrder(items);
  assert.equal(sorted[0].id, 'a');
  assert.equal(sorted[1].id, 'c');
  assert.equal(sorted[2].id, 'b');
});
