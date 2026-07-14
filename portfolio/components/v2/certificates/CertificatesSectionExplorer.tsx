"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { 
  Folder, FileText, Search, LayoutGrid, List, ChevronRight, 
  ChevronLeft, Monitor, HardDrive, Clock, ExternalLink, Shield
} from "lucide-react";
import { SiCss, SiLinux, SiMysql, SiPhp } from "react-icons/si";

const certIconMap: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  SiPhp: { icon: SiPhp, color: "#777BB4" },
  SiMysql: { icon: SiMysql, color: "#4479A1" },
  SiLinux: { icon: SiLinux, color: "#FCC624" },
  SiCss3: { icon: SiCss, color: "#1572B6" },
  SiOracle: { icon: Database, color: "#F80000" },
};
import { Database } from "lucide-react";

export default function CertificatesSectionExplorer() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeFolder, setActiveFolder] = useState<"All" | "BNSP" | "University">("All");
  const certs = portfolioData.certifications;

  const filteredCerts = certs.filter(c => {
    if (activeFolder === "BNSP") return c.isBNSP;
    if (activeFolder === "University") return !c.isBNSP;
    return true;
  });

  return (
    <section id="certificates" className="w-full bg-[#111111] py-24 px-4 md:px-12 flex flex-col items-center justify-center min-h-screen">
      
      <div className="mb-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-2">Terminal / File Explorer</h2>
        <p className="text-gray-400 text-sm">Gaya jendela OS native. Klik pada baris file untuk membuka sertifikat.</p>
      </div>

      {/* Jendela OS */}
      <div className="w-full max-w-5xl h-[600px] bg-[#1e1e1e] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#333] flex flex-col overflow-hidden text-sm text-gray-300 font-sans">
        
        {/* Title Bar (Mac Style) */}
        <div className="h-12 bg-[#2d2d2d] flex items-center justify-between px-4 border-b border-[#111] select-none">
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          </div>
          <div className="font-semibold text-gray-400 text-xs flex items-center gap-2">
            <Folder className="w-4 h-4 text-blue-400" />
            Certifications
          </div>
          <div className="w-20"></div>
        </div>

        {/* Toolbar */}
        <div className="h-14 bg-[#252526] flex items-center px-4 border-b border-[#111] justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-gray-500">
              <ChevronLeft className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
              <ChevronRight className="w-5 h-5 hover:text-gray-300 cursor-pointer" />
            </div>
            <div className="font-mono text-xs text-gray-400 bg-[#1e1e1e] px-4 py-1.5 rounded-md border border-[#333]">
              Berlin_Sugiyanto / Portfolio / Certifications / {activeFolder}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-[#1e1e1e] rounded-md border border-[#333] overflow-hidden">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-1.5 ${viewMode === "grid" ? "bg-[#37373d] text-white" : "text-gray-500 hover:text-gray-300"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-1.5 ${viewMode === "list" ? "bg-[#37373d] text-white" : "text-gray-500 hover:text-gray-300"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <div className="relative hidden md:block">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-[#1e1e1e] border border-[#333] rounded-md pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 w-48"
              />
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar */}
          <div className="w-48 bg-[#252526] border-r border-[#111] p-2 flex flex-col gap-6 hidden md:flex overflow-y-auto">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 mt-2">Favorites</p>
              <ul className="flex flex-col gap-0.5">
                <li>
                  <button onClick={() => setActiveFolder("All")} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs ${activeFolder === "All" ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}`}>
                    <Monitor className="w-4 h-4 text-blue-400" /> All Certs
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveFolder("BNSP")} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs ${activeFolder === "BNSP" ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}`}>
                    <Shield className="w-4 h-4 text-emerald-400" /> BNSP National
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveFolder("University")} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs ${activeFolder === "University" ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}`}>
                    <Folder className="w-4 h-4 text-blue-400" /> University
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Locations</p>
              <ul className="flex flex-col gap-0.5">
                <li>
                  <div className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-gray-500">
                    <HardDrive className="w-4 h-4" /> Local Disk (C:)
                  </div>
                </li>
                <li>
                  <div className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-gray-500">
                    <Clock className="w-4 h-4" /> Recents
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* File View Area */}
          <div className="flex-1 bg-[#1e1e1e] overflow-y-auto p-4">
             {viewMode === "list" ? (
               <table className="w-full text-left text-xs">
                 <thead className="text-gray-400 border-b border-[#333]">
                   <tr>
                     <th className="pb-2 font-medium">Name</th>
                     <th className="pb-2 font-medium hidden md:table-cell">Issuer</th>
                     <th className="pb-2 font-medium">Date Modified</th>
                     <th className="pb-2 font-medium">Kind</th>
                     <th className="pb-2 font-medium text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {filteredCerts.map((cert) => (
                     <tr key={cert.name} className="border-b border-[#222] hover:bg-[#2a2d2e] group transition-colors">
                       <td className="py-2.5 flex items-center gap-3 text-gray-200">
                         <FileText className={`w-5 h-5 ${cert.isBNSP ? 'text-emerald-400' : 'text-blue-400'}`} />
                         <span className="truncate max-w-[200px] md:max-w-[300px]">{cert.name}</span>
                       </td>
                       <td className="py-2.5 text-gray-400 hidden md:table-cell">{cert.issuer}</td>
                       <td className="py-2.5 text-gray-500">{cert.year}</td>
                       <td className="py-2.5 text-gray-500">PDF Document</td>
                       <td className="py-2.5 text-right">
                         <a href={cert.driveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
                           Open <ExternalLink className="w-3 h-3" />
                         </a>
                       </td>
                     </tr>
                   ))}
                   {filteredCerts.length === 0 && (
                     <tr>
                       <td colSpan={5} className="py-10 text-center text-gray-500">This folder is empty.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             ) : (
               <div className="flex flex-wrap gap-6">
                 {filteredCerts.map((cert) => (
                   <a 
                     key={cert.name} 
                     href={cert.driveLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex flex-col items-center gap-2 p-3 w-28 rounded-lg hover:bg-[#2a2d2e] transition-colors group text-center cursor-pointer"
                   >
                     <div className="w-16 h-16 bg-[#252526] border border-[#333] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform relative">
                        <FileText className={`w-8 h-8 ${cert.isBNSP ? 'text-emerald-400' : 'text-blue-400'}`} />
                        {cert.isBNSP && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#252526]">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                        )}
                     </div>
                     <span className="text-[11px] text-gray-300 leading-tight line-clamp-2">{cert.name}</span>
                   </a>
                 ))}
                 {filteredCerts.length === 0 && (
                   <div className="w-full py-10 text-center text-gray-500">This folder is empty.</div>
                 )}
               </div>
             )}
          </div>

        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-[#007acc] text-white text-[10px] flex items-center px-4 justify-between">
          <span>{filteredCerts.length} items</span>
          <span>UTF-8 • Portfolio Space</span>
        </div>
      </div>
    </section>
  );
}
