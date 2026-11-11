/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Database,
  Key,
  Check,
  Copy,
  Terminal,
  Save,
  Loader2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { WebsiteSettings } from '../../types/portfolio.ts';
import { portfolioService } from '../../services/portfolioService.ts';
import {
  getSupabaseCredentials,
  saveSupabaseCredentials,
  isSupabaseConfigured,
  getSupabaseClient,
} from '../../lib/supabase.ts';

interface SettingsManagerProps {
  settings: WebsiteSettings;
  onUpdated: () => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({ settings, onUpdated }) => {
  const [formData, setFormData] = useState<WebsiteSettings>({ ...settings });
  const [credentials, setCredentials] = useState(getSupabaseCredentials());
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleTestAndSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestingConnection(true);
    setTestResult(null);

    try {
      saveSupabaseCredentials(credentials.url, credentials.anonKey);
      const client = getSupabaseClient();

      if (!client) {
        setTestResult({
          success: false,
          message: 'Invalid Supabase Project URL or Anon Key format.',
        });
        setTestingConnection(false);
        return;
      }

      // Test connection with a lightweight health query
      const { data, error } = await client.from('profiles').select('id').limit(1);

      if (error) {
        if (error.code === '42P01') {
          // Table doesn't exist yet, meaning project connected but migrations need to run
          setTestResult({
            success: true,
            message: 'Connected to Supabase project! Please apply the SQL Migration script below.',
          });
        } else {
          setTestResult({
            success: false,
            message: `Supabase returned: ${error.message}`,
          });
        }
      } else {
        setTestResult({
          success: true,
          message: 'Successfully connected and verified against Supabase database!',
        });
      }

      onUpdated();
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Connection test failed.',
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await portfolioService.updateWebsiteSettings(formData);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
      onUpdated();
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleCopySql = () => {
    const sqlScript = `-- Run this in your Supabase SQL Editor:
-- (Found at supabase/migrations/001_initial_schema.sql in the repo)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

CREATE TABLE IF NOT EXISTS public.administrator_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('owner', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Full schema with RLS and seed data is available in the repository at:
-- /supabase/migrations/001_initial_schema.sql and /supabase/seed.sql`;

    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">System &amp; Database Settings</h2>
        <p className="text-xs text-slate-400">
          Connect your production Supabase project, test credentials, and review SQL migration scripts.
        </p>
      </div>

      {/* Supabase Connection Card */}
      <div className="p-8 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Supabase Database Integration</h3>
              <p className="text-xs text-slate-400">
                Direct connection to Supabase PostgreSQL, Authentication, and Storage.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-xs font-mono px-3 py-1 rounded-full border ${
                isSupabaseConfigured()
                  ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                  : 'text-amber-400 border-amber-500/30 bg-amber-500/10'
              }`}
            >
              {isSupabaseConfigured() ? 'Configured' : 'Offline / Preview'}
            </span>
          </div>
        </div>

        {testResult && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
              testResult.success
                ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-300'
                : 'bg-red-950/60 border border-red-800/80 text-red-300'
            }`}
          >
            {testResult.success ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}

        <form onSubmit={handleTestAndSaveCredentials} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 block">
              Supabase Project URL (VITE_SUPABASE_URL)
            </label>
            <input
              type="url"
              required
              value={credentials.url}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, url: e.target.value }))
              }
              placeholder="https://your-project.supabase.co"
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 block">
              Supabase Public Anon Key (VITE_SUPABASE_ANON_KEY)
            </label>
            <input
              type="text"
              required
              value={credentials.anonKey}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, anonKey: e.target.value }))
              }
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-[11px] text-slate-400 max-w-sm">
              You can find your Project URL and anon key in the Supabase Dashboard under Project Settings &gt; API.
            </p>

            <button
              type="submit"
              disabled={testingConnection}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {testingConnection ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Connecting &amp; Testing...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Save &amp; Test Connection</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* SQL Schema Migration helper */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Production PostgreSQL Migration Script</span>
            </span>

            <button
              onClick={handleCopySql}
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium cursor-pointer"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy Schema Script'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Available in your repository at <code className="text-sky-300">/supabase/migrations/001_initial_schema.sql</code> and <code className="text-sky-300">/supabase/seed.sql</code>. Paste into your Supabase SQL Editor to initialize all 13 tables, RLS policies, and media buckets.
          </p>
        </div>
      </div>

      {/* General Website Settings */}
      <form onSubmit={handleSaveSettings} className="p-8 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-6 shadow-xl">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
          Website SEO &amp; General Configuration
        </h3>

        {settingsSaved && (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Website settings updated in database.</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Site Title
            </label>
            <input
              type="text"
              value={formData.site_title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, site_title: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Meta Description (Search &amp; Social Previews)
            </label>
            <textarea
              rows={3}
              value={formData.meta_description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  meta_description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={formData.contact_email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contact_email: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={savingSettings}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            {savingSettings ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
