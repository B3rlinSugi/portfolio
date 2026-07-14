"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Search, Filter, Download, ExternalLink, ShieldCheck, ChevronLeft, ChevronRight, MoreHorizontal, Database, FileText } from "lucide-react";
import { SiCss, SiLinux, SiMysql, SiPhp } from "react-icons/si";

const certIconMap: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  SiPhp: { icon: SiPhp, color: "#777BB4" },
  SiMysql: { icon: SiMysql, color: "#4479A1" },
  SiLinux: { icon: SiLinux, color: "#FCC624" },
  SiCss3: { icon: SiCss, color: "#1572B6" },
  SiOracle: { icon: Database, color: "#F80000" },
};

export default function CertificatesSectionDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const certs = portfolioData.certifications;
  
  // Fitur Filter & Pencarian
  const filteredCerts = certs.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Fitur Pagination
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredCerts.length / itemsPerPage));
  const currentData = filteredCerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Data Analitik (KPIs)
  const totalCerts = certs.length;
  const nationalCerts = certs.filter(c => c.isBNSP).length;
  const uniCerts = certs.filter(c => !c.isBNSP).length;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  return (
    <section id="certificates" className="w-full bg-[#f8fafc] py-24 px-4 md:px-12 min-h-screen text-slate-900 font-sans selection:bg-indigo-100">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">Certifications Dashboard</h2>
            <p className="text-slate-500 text-sm md:text-base">Manage, search, and audit all verified technical credentials.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:shadow transition-all">
            <Download className="w-4 h-4"/> Export CSV Report
          </button>
        </div>

        {/* KPI / Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-slate-500 text-sm font-medium">Total Credentials</p>
            </div>
            <h3 className="text-4xl font-black text-slate-900">{totalCerts}</h3>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-slate-500 text-sm font-medium">National Standard (BNSP)</p>
            </div>
            <h3 className="text-4xl font-black text-slate-900">{nationalCerts}</h3>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-slate-500 text-sm font-medium">Institutional (University)</p>
            </div>
            <h3 className="text-4xl font-black text-slate-900">{uniCerts}</h3>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search certificates..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm w-full sm:w-80 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset halaman saat mencari
                }}
              />
            </div>
            <button className="flex items-center gap-2 text-slate-600 bg-white border border-slate-200 shadow-sm px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 w-full sm:w-auto justify-center">
              <Filter className="w-4 h-4" /> Filter Options
            </button>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/80 text-slate-500 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Credential Name</th>
                  <th className="px-6 py-4">Issuer</th>
                  <th className="px-6 py-4">Status / Type</th>
                  <th className="px-6 py-4">Issue Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentData.map(cert => (
                  <tr key={cert.name} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {cert.isBNSP ? (
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-indigo-600" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{cert.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-xs">{cert.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-700 font-medium">{cert.issuer}</p>
                    </td>
                    <td className="px-6 py-4">
                      {cert.isBNSP ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified National
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Course Certificate
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">
                      {cert.year}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href={cert.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {currentData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="w-10 h-10 text-slate-300 mb-3" />
                        <p className="text-slate-500 font-medium text-base">No certificates found</p>
                        <p className="text-slate-400 text-sm">Try adjusting your search query.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
            <span className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900">{filteredCerts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredCerts.length)}</span> of <span className="text-slate-900">{filteredCerts.length}</span> results
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-8 h-8 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-white cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-md text-sm font-bold flex items-center justify-center transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-indigo-600 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-8 h-8 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-white cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
