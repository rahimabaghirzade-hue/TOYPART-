/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, Music } from 'lucide-react';

interface AnalyticsDashboardProps {
  shabashHistory: Array<{ time: string; amount: number }>;
  songPlayStats: Array<{ name: string; plays: number }>;
  totalShabash: number;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  shabashHistory,
  songPlayStats,
  totalShabash,
}) => {
  const COLORS = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];

  return (
    <div className="w-full bg-slate-900 border border-amber-900/40 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-md">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Analitika və Statistika Paneli
          </h3>
          <p className="text-xs text-slate-400">
            Zaman üzrə toplanan şabaşlar və ən məşhur mahnıların reytinqi
          </p>
        </div>
      </div>

      {/* Summary metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Ümumi Şabaş Vəsaiti</p>
            <h4 className="text-2xl sm:text-3xl font-black text-amber-300 font-mono mt-1">
              ₼ {totalShabash}
            </h4>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">İfa Olunan Mahnılar</p>
            <h4 className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
              {songPlayStats.reduce((acc, s) => acc + s.plays, 0)} dəfə
            </h4>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Music className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Shabash over time */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Zaman Üzrə Toplanan Şabaş (₼)</span>
          </h4>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={shabashHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#475569', borderRadius: 8 }}
                  labelStyle={{ color: '#F8FAFC', fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Popular Wedding Songs */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Music className="w-4 h-4 text-emerald-400" />
            <span>Məşhur Toy Mahnılarının Payı</span>
          </h4>
          <div className="w-full h-64 flex items-center justify-center">
            {songPlayStats.length === 0 || songPlayStats.every((s) => s.plays === 0) ? (
              <p className="text-xs text-slate-500">Hələ mahnı ifa olunmayıb</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={songPlayStats}
                    dataKey="plays"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} (${(((percent ?? 0) * 100)).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {songPlayStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#475569', borderRadius: 8 }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
