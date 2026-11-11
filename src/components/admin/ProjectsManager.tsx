/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Globe,
  Upload,
  Check,
  X,
  Eye,
  Star,
  FileCheck,
  Loader2,
  Layers,
} from 'lucide-react';
import { ProjectItem, ProjectStatus, PublishingStatus } from '../../types/portfolio.ts';
import { portfolioService } from '../../services/portfolioService.ts';
import { generateSlug } from '../../utils/portfolioLogic.ts';

interface ProjectsManagerProps {
  projects: ProjectItem[];
  onProjectsUpdated: () => void;
  onPreviewProject: (project: ProjectItem) => void;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({
  projects,
  onProjectsUpdated,
  onPreviewProject,
}) => {
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form temporary string representations for tags
  const [featuresText, setFeaturesText] = useState('');
  const [techText, setTechText] = useState('');

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateNew = () => {
    const empty: ProjectItem = {
      id: '',
      name: '',
      slug: '',
      category: 'SaaS Platform',
      attribution: 'A product by SamTeck Digital',
      status: 'Working',
      publishing_status: 'published',
      is_featured: false,
      display_order: projects.length + 1,
      short_description: '',
      full_description: '',
      problem_statement: '',
      solution_description: '',
      features: [],
      technologies: [],
      owner_role: 'Founder & Full-Stack Engineer',
      contributions: '',
      live_url: '',
      github_url: '',
      cover_image_url: '',
      seo_title: '',
      seo_description: '',
    };
    setEditingProject(empty);
    setFeaturesText('');
    setTechText('');
    setIsEditing(true);
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setFeaturesText(project.features?.join('\n') || '');
    setTechText(project.technologies?.join(', ') || '');
    setIsEditing(true);
  };

  const handleNameChange = (name: string) => {
    if (!editingProject) return;
    const updates: Partial<ProjectItem> = { name };
    // Automatically generate slug if new project or matching previous
    if (!editingProject.id || editingProject.slug === generateSlug(editingProject.name)) {
      updates.slug = generateSlug(name);
    }
    setEditingProject({ ...editingProject, ...updates });
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await portfolioService.uploadMedia(file, 'projects');
      setEditingProject({ ...editingProject, cover_image_url: uploadedUrl });
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setLoading(true);
    try {
      const parsedFeatures = featuresText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const parsedTech = techText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const toSave: ProjectItem = {
        ...editingProject,
        features: parsedFeatures,
        technologies: parsedTech,
        slug: editingProject.slug || generateSlug(editingProject.name),
      };

      await portfolioService.saveProject(toSave);
      onProjectsUpdated();
      setIsEditing(false);
      setEditingProject(null);
    } catch (err) {
      console.error('Failed to save project:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await portfolioService.deleteProject(id);
      onProjectsUpdated();
    }
  };

  const handleToggleFeatured = async (project: ProjectItem) => {
    await portfolioService.saveProject({
      ...project,
      is_featured: !project.is_featured,
    });
    onProjectsUpdated();
  };

  const handleStatusChange = async (project: ProjectItem, status: ProjectStatus) => {
    await portfolioService.saveProject({
      ...project,
      status,
    });
    onProjectsUpdated();
  };

  const handlePublishingChange = async (project: ProjectItem, publishing_status: PublishingStatus) => {
    await portfolioService.saveProject({
      ...project,
      publishing_status,
    });
    onProjectsUpdated();
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Project CMS</h2>
          <p className="text-xs text-slate-400">
            Publish, edit, upload screenshots, and manage case studies in Supabase.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter projects by title or category..."
          className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900/80 border border-slate-800 focus:border-sky-500 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-[#0e1b3d] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{p.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">/{p.slug}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">
                    {p.category}
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusChange(p, e.target.value as ProjectStatus)}
                      aria-label={`Project status for ${p.name}`}
                      className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1 focus:outline-none focus:border-sky-500"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Working">Working</option>
                      <option value="Under Development">Under Development</option>
                      <option value="Concept">Concept</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={p.publishing_status}
                      onChange={(e) =>
                        handlePublishingChange(p, e.target.value as PublishingStatus)
                      }
                      aria-label={`Publishing status for ${p.name}`}
                      className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1 focus:outline-none focus:border-sky-500"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      aria-label={`Toggle featured for ${p.name}`}
                      className={`p-1.5 rounded transition-colors ${
                        p.is_featured
                          ? 'text-amber-400 bg-amber-500/10'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={p.is_featured ? 'Featured on Homepage' : 'Not Featured'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onPreviewProject(p)}
                        className="p-1.5 text-slate-400 hover:text-sky-400 rounded hover:bg-slate-800 transition-colors"
                        title="Preview Case Study"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        title="Edit Project Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Project Modal Form */}
      {isEditing && editingProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-[#0B1530] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                {editingProject.id ? `Edit: ${editingProject.name}` : 'New Project'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-6">
              {/* Row 1: Name and Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. SamTill POS"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    placeholder="samtill-pos"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Row 2: Category & Attribution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    placeholder="e.g. Retail Point of Sale and Business Management System"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Attribution
                  </label>
                  <input
                    type="text"
                    value={editingProject.attribution || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, attribution: e.target.value })
                    }
                    placeholder="A product by SamTeck Digital"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Row 3: Status, Publishing Status, Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Project Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value as ProjectStatus,
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Working">Working</option>
                    <option value="Under Development">Under Development</option>
                    <option value="Concept">Concept</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Publishing Workflow
                  </label>
                  <select
                    value={editingProject.publishing_status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        publishing_status: e.target.value as PublishingStatus,
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input
                      type="checkbox"
                      checked={editingProject.is_featured}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          is_featured: e.target.checked,
                        })
                      }
                      className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0"
                    />
                    <span className="text-xs text-white">Feature on Homepage</span>
                  </label>
                </div>
              </div>

              {/* Row 4: Descriptions */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.short_description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      short_description: e.target.value,
                    })
                  }
                  placeholder="Summary for project card previews..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Problem and Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-amber-400">
                    Problem Statement *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingProject.problem_statement}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        problem_statement: e.target.value,
                      })
                    }
                    placeholder="What real problem or friction was observed?..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-sky-400">
                    Solution Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editingProject.solution_description}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        solution_description: e.target.value,
                      })
                    }
                    placeholder="How does the system resolve this problem?..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Features (one per line) */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Confirmed Implemented Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Barcode scanning&#10;Receipt printing&#10;Offline sync"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Technologies (comma separated) */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Technology Stack (Comma separated)
                </label>
                <input
                  type="text"
                  value={techText}
                  onChange={(e) => setTechText(e.target.value)}
                  placeholder="React, Vite, Supabase, PostgreSQL, Electron"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Role & Contributions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Samson's Role
                  </label>
                  <input
                    type="text"
                    value={editingProject.owner_role}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, owner_role: e.target.value })
                    }
                    placeholder="Founder & Full-Stack Engineer"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">
                    Live URL (e.g. getresolvehub.com)
                  </label>
                  <input
                    type="url"
                    value={editingProject.live_url || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, live_url: e.target.value })
                    }
                    placeholder="https://getresolvehub.com"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Cover Image URL / File Upload */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <label className="text-xs font-medium text-slate-300 block">
                  Project Cover Image / Screenshot
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input
                    type="text"
                    value={editingProject.cover_image_url || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        cover_image_url: e.target.value,
                      })
                    }
                    placeholder="Paste image URL or upload file below..."
                    className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
                  />
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shrink-0">
                    {uploadingImage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-[11px] text-slate-400">
                  If left empty, a neutral architectural blueprint placeholder will be rendered automatically.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-md transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Project</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
