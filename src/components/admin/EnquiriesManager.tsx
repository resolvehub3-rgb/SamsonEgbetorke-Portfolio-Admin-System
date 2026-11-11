/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  MailCheck,
  MailWarning,
  Eye,
  X,
  Clock,
  User,
} from 'lucide-react';
import { ContactEnquiryItem } from '../../types/portfolio.ts';
import { portfolioService } from '../../services/portfolioService.ts';

interface EnquiriesManagerProps {
  enquiries: ContactEnquiryItem[];
  onUpdated: () => void;
}

export const EnquiriesManager: React.FC<EnquiriesManagerProps> = ({
  enquiries,
  onUpdated,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiryItem | null>(null);

  const filtered = enquiries
    .filter((e) => {
      if (filterStatus === 'all') return true;
      return e.status === filterStatus;
    })
    .filter(
      (e) =>
        e.full_name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.subject.toLowerCase().includes(search.toLowerCase()) ||
        e.message.toLowerCase().includes(search.toLowerCase())
    );

  const handleStatusChange = async (
    id: string,
    status: ContactEnquiryItem['status']
  ) => {
    await portfolioService.updateEnquiryStatus(id, status);
    onUpdated();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this contact enquiry from the database?')) {
      await portfolioService.deleteEnquiry(id);
      onUpdated();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const handleOpenDetail = (item: ContactEnquiryItem) => {
    setSelectedEnquiry(item);
    if (item.status === 'unread') {
      handleStatusChange(item.id, 'read');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Contact Enquiries</h2>
          <p className="text-xs text-slate-400">
            Messages received from the public portfolio contact form stored in Supabase.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs self-start sm:self-auto">
          {['all', 'unread', 'read', 'replied', 'spam'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded capitalize font-medium transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by sender, email, or keywords..."
          className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900/80 border border-slate-800 focus:border-sky-500 rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Messages List / Table */}
      <div className="bg-[#0e1b3d] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        {filtered.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item)}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors cursor-pointer ${
                  item.status === 'unread' ? 'bg-sky-950/20' : ''
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`font-semibold ${
                        item.status === 'unread' ? 'text-sky-300 font-bold' : 'text-white'
                      }`}
                    >
                      {item.full_name}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 font-mono text-[11px] truncate">
                      {item.email}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.2 rounded-full border capitalize ${
                        item.status === 'unread'
                          ? 'text-sky-400 border-sky-500/40 bg-sky-500/10'
                          : item.status === 'replied'
                          ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
                          : item.status === 'spam'
                          ? 'text-red-400 border-red-500/40 bg-red-500/10'
                          : 'text-slate-400 border-slate-700 bg-slate-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-200 truncate">
                    {item.subject}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-1">{item.message}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs">
                  {item.created_at && (
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 p-6">
            <Mail className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No contact messages matching filter.</p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-[#0B1530] border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
                  Enquiry Details
                </span>
                <h3 className="text-base font-bold text-white">
                  {selectedEnquiry.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender metadata */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Sender:</span>
                <span className="text-white font-semibold">{selectedEnquiry.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(
                    selectedEnquiry.subject
                  )}`}
                  className="text-sky-400 hover:underline font-mono"
                >
                  {selectedEnquiry.email}
                </a>
              </div>
              {selectedEnquiry.created_at && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Received:</span>
                  <span className="text-slate-300 font-mono">
                    {new Date(selectedEnquiry.created_at).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Message Body */}
            <div className="p-4 rounded-xl bg-[#0e1b3d] border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Message Body
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </p>
            </div>

            {/* Status Change & Reply Options */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleStatusChange(selectedEnquiry.id, 'read')}
                  className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Mark Read
                </button>
                <button
                  onClick={() => handleStatusChange(selectedEnquiry.id, 'replied')}
                  className="px-2.5 py-1 text-xs rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40"
                >
                  Mark Replied
                </button>
                <button
                  onClick={() => handleStatusChange(selectedEnquiry.id, 'spam')}
                  className="px-2.5 py-1 text-xs rounded bg-red-950 hover:bg-red-900 text-red-300 border border-red-800/40"
                >
                  Mark Spam
                </button>
              </div>

              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(
                  selectedEnquiry.subject
                )}`}
                className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
