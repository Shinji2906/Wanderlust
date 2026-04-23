import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import authRegister from "@/assets/auth-register.jpg";
import { toast } from "sonner";

const API_URL = "http://localhost:5092/api/Auth";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!form.agree) {
      toast.error("You must agree to the Terms of Service.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: form.name, email: form.email, password: form.password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(data.message || "Registration successful! You can now login.");
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          {/* Left: Content + Image */}
          <div className="hidden lg:flex flex-col justify-between p-10 bg-secondary overflow-hidden">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-3">Begin Your Journey</p>
              <h2 className="font-display text-4xl font-bold leading-tight">
                Discover the<br />world's<br /><em className="font-normal">quietest corners.</em>
              </h2>
              <p className="font-body text-muted-foreground mt-4 max-w-sm">
                Join an exclusive community of modern voyagers. Your account unlocks curated itineraries and artisanal travel narratives.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden mt-6 flex-1 max-h-[400px]">
              <img src={authRegister} alt="Paradise coast" className="w-full h-full object-cover" loading="lazy" width={800} height={1000} />
              <div className="absolute bottom-4 left-4">
                <p className="font-body text-[10px] uppercase tracking-widest text-primary-foreground/80">Featured Destination</p>
                <p className="font-display text-lg italic text-primary-foreground">The Alentejo Coast</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-md">
              <h1 className="font-display text-3xl font-bold mb-1">Create Account</h1>
              <p className="font-body text-muted-foreground mb-8">
                Already a member? <Link to="/login" className="text-primary font-medium hover:underline">Login here</Link>
              </p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="label-editorial">Full Name</label>
                  <input className="input-editorial" placeholder="Evelyn Thorne" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="label-editorial">Email Address</label>
                  <input className="input-editorial" type="email" placeholder="voyager@aura.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label-editorial">Password</label>
                    <input className="input-editorial" type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                  </div>
                  <div>
                    <label className="label-editorial">Confirm Password</label>
                    <input className="input-editorial" type="password" placeholder="••••••••" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
                  </div>
                </div>
                <label className="flex items-start gap-2 font-body text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="accent-primary mt-1" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} />
                  <span>I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span> regarding my travel data.</span>
                </label>
                <button type="submit" disabled={loading} className="btn-primary w-full text-center text-base py-3.5 disabled:opacity-70">
                  {loading ? "Registering..." : "Register Now"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">Or join with</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="btn-outline text-sm flex items-center justify-center gap-2 py-3">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button className="btn-outline text-sm flex items-center justify-center gap-2 py-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
