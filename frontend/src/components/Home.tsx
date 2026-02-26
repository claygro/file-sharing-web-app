import { useEffect, useState } from "react";
import connection from "../config/connection.config";
import demoImage from "../assets/images.jpeg";
import {
  Search,
  FileText,
  FileImage,
  FileVideo,
  File,
  ArrowUpDown,
  Grid,
  List,
} from "lucide-react";

const Home = () => {
  interface FileDataType {
    id: string;
    sizeOfFileInKb: number;
    sizeOfFileInMb: number;
    title: string;
    createdAt: string;
    fileType: string;
  }

  const [fileData, setFileData] = useState<FileDataType[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortField, setSortField] = useState<keyof FileDataType>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  async function retriveFileData() {
    try {
      const fileResponse = await connection.get("/retrive/file");
      setFileData(fileResponse.data);
    } catch (error: unknown) {
      console.log(`Error retrieving file: ${error}`);
    }
  }

  useEffect(() => {
    retriveFileData();
  }, []);

  const getFileIcon = (type: string) => {
    const t = type.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(t))
      return <FileImage size={16} />;
    if (["mp4", "mov", "avi", "mkv"].includes(t))
      return <FileVideo size={16} />;
    if (["pdf", "doc", "docx", "txt"].includes(t))
      return <FileText size={16} />;
    return <File size={16} />;
  };

  const getFileColor = (type: string) => {
    const t = type.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(t))
      return "from-violet-500 to-purple-600";
    if (["mp4", "mov", "avi", "mkv"].includes(t))
      return "from-rose-500 to-pink-600";
    if (["pdf"].includes(t)) return "from-orange-500 to-red-500";
    if (["doc", "docx"].includes(t)) return "from-blue-500 to-cyan-500";
    if (["txt"].includes(t)) return "from-slate-400 to-slate-600";
    return "from-teal-500 to-emerald-600";
  };

  const handleSort = (field: keyof FileDataType) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = fileData
    ?.filter(
      (f) =>
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.fileType.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    ?.sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      const cmp = String(av).localeCompare(String(bv), undefined, {
        numeric: true,
      });
      return sortDir === "asc" ? cmp : -cmp;
    });

  const SortTh = ({
    field,
    label,
    className = "",
  }: {
    field: keyof FileDataType;
    label: string;
    className?: string;
  }) => (
    <th
      className={`py-3.5 px-4 font-semibold text-xs uppercase tracking-wider cursor-pointer select-none whitespace-nowrap group ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <ArrowUpDown
          size={12}
          className={`transition-opacity ${sortField === field ? "opacity-100 text-indigo-400" : "opacity-0 group-hover:opacity-40"}`}
        />
      </div>
    </th>
  );

  return (
    <div
      className="min-h-screen bg-[#0f0f14] text-white"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />
      </div>

      {/* Topbar */}
      <header className="relative z-10 border-b border-white/5 bg-[#13131a]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <File size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm hidden sm:block tracking-tight text-white/90">
              FileVault
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 mx-2">
            <div className="relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files by name or type…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 placeholder:text-white/25 text-sm focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/8">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "table" ? "bg-indigo-600 text-white shadow" : "text-white/40 hover:text-white/70"}`}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-indigo-600 text-white shadow" : "text-white/40 hover:text-white/70"}`}
            >
              <Grid size={14} />
            </button>
          </div>

          {/* Avatar */}
          <img
            src={demoImage}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border-2 border-white/10 shrink-0 hover:border-indigo-500/50 transition cursor-pointer"
          />
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Files</h1>
            <p className="text-sm text-white/40 mt-0.5">
              {filtered
                ? `${filtered.length} file${filtered.length !== 1 ? "s" : ""}`
                : "Loading…"}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Table View */}
        {viewMode === "table" && (
          <div className="rounded-2xl border border-white/8 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/8 bg-white/[0.03]">
                  <tr className="text-white/40">
                    <SortTh field="title" label="Name" />
                    <SortTh
                      field="fileType"
                      label="Type"
                      className="hidden sm:table-cell"
                    />
                    <SortTh
                      field="sizeOfFileInKb"
                      label="Size"
                      className="hidden md:table-cell"
                    />
                    <SortTh field="createdAt" label="Created" />
                    <th className="py-3.5 px-4 hidden lg:table-cell" />
                  </tr>
                </thead>
                <tbody>
                  {filtered?.map((file, i) => (
                    <tr
                      key={file.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.04] transition-colors cursor-pointer group"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      {/* Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getFileColor(file.fileType)} flex items-center justify-center shrink-0 shadow-lg`}
                          >
                            {getFileIcon(file.fileType)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-white/90 truncate max-w-[160px] sm:max-w-[260px] md:max-w-xs group-hover:text-white transition">
                              {file.title}
                            </p>
                            <p className="text-xs text-white/30 sm:hidden mt-0.5">
                              {file.fileType.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type badge */}
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-white/8 text-white/60 border border-white/8">
                          {file.fileType.toUpperCase()}
                        </span>
                      </td>

                      {/* Size */}
                      <td className="py-3.5 px-4 text-white/50 hidden md:table-cell tabular-nums">
                        {file.sizeOfFileInMb >= 1
                          ? `${file.sizeOfFileInMb.toFixed(1)} MB`
                          : `${file.sizeOfFileInKb} KB`}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-white/40 tabular-nums text-xs whitespace-nowrap">
                        {new Date(file.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 hidden lg:table-cell text-right">
                        <button className="opacity-0 group-hover:opacity-100 transition text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/50 px-3 py-1 rounded-lg">
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {filtered?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <File size={22} className="text-white/20" />
                </div>
                <p className="text-white/40 font-medium">No files found</p>
                <p className="text-white/20 text-sm mt-1">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "Upload a file to get started"}
                </p>
              </div>
            )}

            {/* Loading skeleton */}
            {!filtered && (
              <div className="divide-y divide-white/5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-4 py-3.5 animate-pulse"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/8 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-white/8 rounded w-48" />
                      <div className="h-2.5 bg-white/5 rounded w-24" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <>
            {filtered?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <File size={22} className="text-white/20" />
                </div>
                <p className="text-white/40 font-medium">No files found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {filtered?.map((file) => (
                  <div
                    key={file.id}
                    className="group rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15 p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getFileColor(file.fileType)} flex items-center justify-center mb-3 shadow-lg`}
                    >
                      {getFileIcon(file.fileType)}
                    </div>
                    <p className="text-xs font-medium text-white/80 truncate group-hover:text-white transition leading-snug">
                      {file.title}
                    </p>
                    <p className="text-xs text-white/30 mt-1">
                      {file.sizeOfFileInMb >= 1
                        ? `${file.sizeOfFileInMb.toFixed(1)} MB`
                        : `${file.sizeOfFileInKb} KB`}
                    </p>
                    <span className="inline-flex mt-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/8 text-white/40">
                      {file.fileType.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
