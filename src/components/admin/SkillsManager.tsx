/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Trash2, Terminal, Check, X } from 'lucide-react';
import { SkillCategory } from '../../types/portfolio.ts';
import { portfolioService } from '../../services/portfolioService.ts';

interface SkillsManagerProps {
  categories: SkillCategory[];
  onUpdated: () => void;
}

export const SkillsManager: React.FC<SkillsManagerProps> = ({ categories, onUpdated }) => {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleAddSkill = async (categoryId: string) => {
    const skillName = newSkillInputs[categoryId]?.trim();
    if (!skillName) return;

    await portfolioService.addSkill(categoryId, skillName);
    setNewSkillInputs((prev) => ({ ...prev, [categoryId]: '' }));
    onUpdated();
  };

  const handleDeleteSkill = async (categoryId: string, skillId: string) => {
    await portfolioService.deleteSkill(categoryId, skillId);
    onUpdated();
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    await portfolioService.saveSkillCategory({
      id: '',
      name: newCategoryName.trim(),
      display_order: categories.length + 1,
    });
    setNewCategoryName('');
    setShowAddCategory(false);
    onUpdated();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Skills &amp; Technologies</h2>
          <p className="text-xs text-slate-400">
            Organize Samson's technical stack into verified categories.
          </p>
        </div>

        <button
          onClick={() => setShowAddCategory(!showAddCategory)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {showAddCategory && (
        <form
          onSubmit={handleAddCategory}
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3"
        >
          <input
            type="text"
            required
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New Category Name (e.g. Cloud Infrastructure)"
            className="flex-1 px-3 py-2 text-xs bg-[#0B1530] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg"
          >
            Create Category
          </button>
          <button
            type="button"
            onClick={() => setShowAddCategory(false)}
            className="p-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-5 rounded-xl bg-[#0e1b3d] border border-slate-800 space-y-4 shadow-md"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>{category.name}</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {category.skills?.length || 0} skills
              </span>
            </div>

            {/* Existing Skills in this category */}
            <div className="flex flex-wrap gap-2">
              {category.skills?.map((skill) => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200"
                >
                  <span>{skill.name}</span>
                  <button
                    onClick={() => handleDeleteSkill(category.id, skill.id)}
                    className="text-slate-500 hover:text-red-400 ml-1 transition-colors"
                    title={`Remove ${skill.name}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Add Skill Input */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
              <input
                type="text"
                value={newSkillInputs[category.id] || ''}
                onChange={(e) =>
                  setNewSkillInputs((prev) => ({
                    ...prev,
                    [category.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(category.id);
                  }
                }}
                placeholder={`Add skill to ${category.name}...`}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(category.id)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-sky-500 rounded-lg transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
