"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  Search,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  X,
  Save,
  Filter,
  Download,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

interface Lead {
  id: number;
  created_at: string;
  nama: string;
  domisili: string;
  whatsapp: string;
  keterangan: string;
  status: string;
  source: string;
  admin_notes: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  Baru: {
    label: "Baru Masuk",
    color: "#3b82f6",
    bg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  Dihubungi: {
    label: "Follow Up",
    color: "#6366f1",
    bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  Prospek: {
    label: "Prospek Hot",
    color: "#eab308",
    bg: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  Survei: {
    label: "Jadwal Survei",
    color: "#a855f7",
    bg: "bg-purple-50 text-purple-700 border-purple-200",
  },
  Closing: {
    label: "Closing / Deal",
    color: "#22c55e",
    bg: "bg-green-50 text-green-700 border-green-200",
  },
  Batal: {
    label: "Junk / Batal",
    color: "#ef4444",
    bg: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editForm, setEditForm] = useState({ status: "", admin_notes: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      fetchLeads();
    };
    init();
  }, [router]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast.error("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        lead.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.whatsapp?.includes(searchTerm);
      const matchStatus =
        statusFilter === "All" || lead.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const handleExportCSV = () => {
    const headers = [
      "Tanggal",
      "Nama",
      "Domisili",
      "WhatsApp",
      "Status",
      "Catatan Admin",
      "Pesan User",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          `"${new Date(lead.created_at).toLocaleDateString()}"`,
          `"${lead.nama}"`,
          `"${lead.domisili}"`,
          `'${lead.whatsapp}`,
          `"${lead.status}"`,
          `"${lead.admin_notes || ""}"`,
          `"${lead.keterangan || ""}"`,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Leads_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setEditForm({
      status: lead.status || "Baru",
      admin_notes: lead.admin_notes || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedLead) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status: editForm.status, admin_notes: editForm.admin_notes })
        .eq("id", selectedLead.id);
      if (error) throw error;
      toast.success("Data diperbarui!");
      setIsModalOpen(false);
      fetchLeads();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG["Baru"];
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${config.bg}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="text-amber-500" /> Manajemen Leads
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola data prospek, update status, dan follow-up.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Total Leads
            </p>
            <p className="text-2xl font-extrabold text-slate-900">
              {leads.length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Potensi (Hot)
            </p>
            <p className="text-2xl font-extrabold text-slate-900">
              {
                leads.filter(
                  (l) => l.status === "Prospek" || l.status === "Survei"
                ).length
              }
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Total Closing
            </p>
            <p className="text-2xl font-extrabold text-slate-900">
              {leads.filter((l) => l.status === "Closing").length}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama / WhatsApp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm transition"
            />
          </div>
          <div className="relative">
            <div className="absolute left-3 top-2.5 pointer-events-none">
              <Filter className="w-4 h-4 text-slate-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="All">Semua Status</option>
              {Object.keys(STATUS_CONFIG).map((s) => (
                <option key={s} value={s}>
                  {STATUS_CONFIG[s].label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition shadow-md"
          >
            <Download className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-slate-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-400">Tidak ada data ditemukan.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 active:scale-[0.99] transition-transform"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900">{lead.nama}</h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <StatusBadge status={lead.status} />
                </div>
                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />{" "}
                    {lead.domisili}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <a
                      href={`https://wa.me/${lead.whatsapp
                        .replace(/^0/, "62")
                        .replace(/\+/g, "")}`}
                      target="_blank"
                      className="text-green-600 font-medium hover:underline"
                    >
                      {lead.whatsapp}
                    </a>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-400 italic max-w-[60%] truncate">
                    {lead.admin_notes || "Belum ada catatan"}
                  </span>
                  <button
                    onClick={() => openEditModal(lead)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md transition"
                  >
                    <Edit3 className="w-3 h-3" /> Kelola
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Nama User
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                    Catatan
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50 transition group"
                  >
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                      <br />
                      <span className="text-xs text-slate-400">
                        {new Date(lead.created_at).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">
                          {lead.nama}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {lead.domisili}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      {lead.admin_notes ? (
                        <span
                          className="text-xs text-slate-600 block truncate"
                          title={lead.admin_notes}
                        >
                          {lead.admin_notes}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300 italic">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a
                          href={`https://wa.me/${lead.whatsapp
                            .replace(/^0/, "62")
                            .replace(/\+/g, "")}`}
                          target="_blank"
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full transition"
                          title="Chat WhatsApp"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(lead)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition"
                          title="Edit Status"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">
                Update Status Prospek
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-600 uppercase font-bold tracking-wider mb-1">
                  Data User
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {selectedLead.nama}
                </p>
                <div className="flex gap-4 mt-2 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {selectedLead.whatsapp}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {selectedLead.domisili}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-amber-200/50">
                  {/* 👇👇 PERBAIKAN DISINI: Pakai &quot; bukan " */}
                  <p className="text-xs text-amber-800 italic">
                    &quot;{selectedLead.keterangan || "Tidak ada pesan khusus"}
                    &quot;
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Pilih Status Baru
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(STATUS_CONFIG).map((key) => (
                    <button
                      key={key}
                      onClick={() => setEditForm({ ...editForm, status: key })}
                      className={`text-xs py-3 px-3 rounded-lg border transition-all duration-200 text-left flex items-center gap-2 font-medium ${
                        editForm.status === key
                          ? `ring-2 ring-offset-1 ${STATUS_CONFIG[key].bg
                              .replace("bg-", "bg-white ")
                              .replace("text-", "ring-")}`
                          : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: STATUS_CONFIG[key].color }}
                      ></div>
                      {STATUS_CONFIG[key].label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Catatan Internal
                </label>
                <textarea
                  rows={3}
                  value={editForm.admin_notes}
                  onChange={(e) =>
                    setEditForm({ ...editForm, admin_notes: e.target.value })
                  }
                  placeholder="Tulis progress follow-up, jadwal meeting, dll..."
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                />
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-md flex items-center gap-2 disabled:opacity-70"
              >
                {saving ? (
                  "Menyimpan..."
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
