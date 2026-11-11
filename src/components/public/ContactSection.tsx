/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { portfolioService } from '../../services/portfolioService.ts';
import { validateContactForm } from '../../utils/portfolioLogic.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      const ok = await portfolioService.submitContactEnquiry({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (ok) {
        setSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitError('Unable to transmit enquiry at this moment. Please try again.');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800/80 bg-[#0e1b3d]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
            <Mail className="w-4 h-4" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Initiate a Conversation
          </h2>
          <p className="text-base text-slate-400 max-w-2xl">
            Whether you represent a technology firm, seek a custom software build, want to discuss
            SaaS development, or explore collaboration with SamTeck Digital.
          </p>
        </div>

        {/* 2-Column Split: Contact Info on left, Live Form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Credentials & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0e1b3d] border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-400">Direct Email</span>
                    <a
                      href="mailto:samtechdigital@gmail.com"
                      className="text-sm font-semibold text-white hover:text-sky-400 transition-colors"
                    >
                      samtechdigital@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-400">Location</span>
                    <span className="text-sm font-semibold text-white">Accra, Ghana</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every enquiry submitted through this form is recorded directly in the Supabase
                  database and monitored in the private administration console.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#0e1b3d] border border-slate-800 shadow-xl">
              {success ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Enquiry Received</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your message has been saved to the database. Samson
                    will review your communication and respond promptly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 px-5 py-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-4 rounded-lg bg-red-900/40 border border-red-700/60 text-xs text-red-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="fullName" className="block text-xs font-medium text-slate-300">
                        Full Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Kwame Mensah"
                        className={`w-full px-4 py-2.5 text-sm bg-slate-900/80 border ${
                          errors.fullName ? 'border-red-500' : 'border-slate-800'
                        } focus:border-sky-500 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-400">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="email" className="block text-xs font-medium text-slate-300">
                        Email Address <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. kwame@example.com"
                        className={`w-full px-4 py-2.5 text-sm bg-slate-900/80 border ${
                          errors.email ? 'border-red-500' : 'border-slate-800'
                        } focus:border-sky-500 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="subject" className="block text-xs font-medium text-slate-300">
                      Subject <span className="text-sky-400">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Inquiring about SamTill POS deployment"
                      className={`w-full px-4 py-2.5 text-sm bg-slate-900/80 border ${
                        errors.subject ? 'border-red-500' : 'border-slate-800'
                      } focus:border-sky-500 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors`}
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="message" className="block text-xs font-medium text-slate-300">
                      Message <span className="text-sky-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project, timeline, or question in detail..."
                      className={`w-full px-4 py-2.5 text-sm bg-slate-900/80 border ${
                        errors.message ? 'border-red-500' : 'border-slate-800'
                      } focus:border-sky-500 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600 disabled:opacity-50 rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving to Database...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
