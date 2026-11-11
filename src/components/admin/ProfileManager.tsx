/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { User, Upload, Check, Loader2, Save, Mail, MapPin } from 'lucide-react';
import { Profile } from '../../types/portfolio.ts';
import { portfolioService } from '../../services/portfolioService.ts';

interface ProfileManagerProps {
  profile: Profile;
  onProfileUpdated: () => void;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({
  profile,
  onProfileUpdated,
}) => {
  const [formData, setFormData] = useState<Profile>({ ...profile });
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const url = await portfolioService.uploadMedia(file, 'avatars');
      setFormData((prev) => ({ ...prev, avatar_url: url }));
    } catch (err) {
      console.error('Avatar upload failed:', err);
    } finally {
      setUploadingAvatar(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await portfolioService.updateProfile(formData);
      onProfileUpdated();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Profile &amp; Biography Management
        </h2>
        <p className="text-xs text-slate-400">
          Update Samson's professional title, approved personal story, contact email, and profile avatar.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Profile records updated successfully in the database.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-6 shadow-xl">
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-800 border-2 border-slate-700 shrink-0">
            <img
              src={formData.avatar_url || '/src/assets/images/samson_profile_portrait_1794388187201.jpg'}
              alt="Profile Avatar"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <label className="text-xs font-semibold text-white block">Profile Avatar</label>
            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <input
                type="text"
                name="avatar_url"
                value={formData.avatar_url || ''}
                onChange={handleChange}
                placeholder="Avatar URL or upload image file..."
                className="flex-1 min-w-[200px] px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => avatarFileInputRef.current?.click()}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shrink-0"
              >
                {uploadingAvatar ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                <span>Upload</span>
              </button>
              <input
                ref={avatarFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFile}
                className="sr-only"
              />
            </div>
          </div>
        </div>

        {/* Identity row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Full Name *
            </label>
            <input
              type="text"
              name="full_name"
              required
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Business Entity / Attribution
            </label>
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Professional Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Professional Title *
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Short Introduction */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Short Introduction (Hero Lead) *
          </label>
          <textarea
            rows={2}
            name="short_intro"
            required
            value={formData.short_intro}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Biography (Full Story) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-300">
            Approved Professional Biography *
          </label>
          <textarea
            rows={10}
            name="bio"
            required
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500 leading-relaxed font-sans"
          />
        </div>

        {/* Location & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              GitHub URL
            </label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin_url"
              value={formData.linkedin_url || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Twitter / X URL
            </label>
            <input
              type="url"
              name="twitter_url"
              value={formData.twitter_url || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-900/80 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600 rounded-lg shadow-md transition-colors cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
