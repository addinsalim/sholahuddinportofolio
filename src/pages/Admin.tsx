import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut, Upload, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image_url: string;
  display_order: number | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const checkAdmin = useCallback(async (userId: string) => {
    const { data } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    return data === true;
  }, []);

  const fetchCertificates = useCallback(async () => {
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setCertificates(data);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          const admin = await checkAdmin(session.user.id);
          setIsAdmin(admin);
          if (admin) fetchCertificates();
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const admin = await checkAdmin(session.user.id);
        setIsAdmin(admin);
        if (admin) fetchCertificates();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [checkAdmin, fetchCertificates]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim() || !issuer.trim() || !year.trim()) {
      toast.error("Semua field harus diisi");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("certificates")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("certificates")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("certificates").insert({
        title: title.trim(),
        issuer: issuer.trim(),
        year: year.trim(),
        image_url: urlData.publicUrl,
        display_order: certificates.length,
      });

      if (insertError) throw insertError;

      toast.success("Sertifikat berhasil diupload!");
      setTitle("");
      setIssuer("");
      setYear("");
      setFile(null);
      fetchCertificates();
    } catch (err: any) {
      toast.error(err.message || "Gagal upload sertifikat");
    }
    setUploading(false);
  };

  const handleDelete = async (cert: Certificate) => {
    if (!confirm(`Hapus sertifikat "${cert.title}"?`)) return;

    try {
      // Extract filename from URL
      const urlParts = cert.image_url.split("/");
      const fileName = urlParts[urlParts.length - 1];

      await supabase.storage.from("certificates").remove([fileName]);
      const { error } = await supabase.from("certificates").delete().eq("id", cert.id);
      if (error) throw error;

      toast.success("Sertifikat dihapus");
      fetchCertificates();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-5 bg-card border border-border rounded-lg p-8"
        >
          <h1 className="font-playfair text-2xl font-bold text-gradient-gold text-center">
            Admin Login
          </h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
            required
          />
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-accent transition-colors disabled:opacity-50"
          >
            {loginLoading ? "Loading..." : "Masuk"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← Kembali ke Portfolio
          </button>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-destructive text-sm">Akun ini tidak memiliki akses admin.</p>
        <div className="flex gap-3">
          <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-primary">
            Logout
          </button>
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-primary">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <h1 className="font-playfair text-xl font-bold text-gradient-gold">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="text-xs text-muted-foreground hover:text-primary">
            ← Portfolio
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Upload Form */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> Tambah Sertifikat
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Judul Sertifikat"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2.5 rounded-md bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
                required
              />
              <input
                type="text"
                placeholder="Penerbit"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="px-4 py-2.5 rounded-md bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
                required
              />
              <input
                type="text"
                placeholder="Tahun"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-4 py-2.5 rounded-md bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary/50"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-md bg-secondary border border-dashed border-border cursor-pointer hover:border-primary/40 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {file ? file.name : "Pilih gambar sertifikat..."}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-accent transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>

        {/* Certificate List */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-5">
            Daftar Sertifikat ({certificates.length})
          </h2>
          {certificates.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada sertifikat.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-card border border-border rounded-lg overflow-hidden group"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">{cert.title}</h3>
                      <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.year}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(cert)}
                      className="shrink-0 p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
