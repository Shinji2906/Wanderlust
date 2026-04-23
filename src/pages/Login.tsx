import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import authFeatured from "@/assets/auth-featured.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const API_URL = "http://localhost:5092/api/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        toast.success(data.message || "Logged in successfully!");
        login(data.user);
        navigate("/");
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          {/* Left: Image + Quote */}
          <div className="hidden lg:flex flex-col justify-between p-10 bg-secondary relative overflow-hidden">
            <div>
              <h2 className="font-display text-3xl italic text-foreground mb-2">Begin your next chapter.</h2>
              <p className="font-body text-sm text-muted-foreground">"The world is a book and those who do not travel read only one page."</p>
              <p className="font-body text-xs text-muted-foreground mt-1">— St. Augustine</p>
            </div>
            <div className="relative rounded-xl overflow-hidden mt-6 flex-1 max-h-[500px]">
              <img src={authFeatured} alt="Travel" className="w-full h-full object-cover" loading="lazy" width={800} height={1000} />
              <div className="absolute bottom-4 left-4">
                <p className="font-body text-[10px] uppercase tracking-widest text-primary-foreground/80">Featured Destination</p>
                <p className="font-display text-lg italic text-primary-foreground">The Grand Canyon Rim</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-md">
              <h1 className="font-display text-3xl font-bold mb-1">Welcome Back</h1>
              <p className="font-body text-muted-foreground mb-8">Continue your global journey with us.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="label-editorial">Email Address</label>
                  <input className="input-editorial" type="email" placeholder="traveler@aura.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">Password</label>
                    <button type="button" className="font-body text-xs text-primary hover:underline">Forgot password?</button>
                  </div>
                  <input className="input-editorial" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <label className="flex items-center gap-2 font-body text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="accent-primary" /> Keep me signed in
                </label>
                <button type="submit" disabled={loading} className="btn-primary w-full text-center text-base py-3.5 disabled:opacity-70">
                  {loading ? "Logging in..." : "Login to Expedition"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">Or continue with</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="btn-outline text-sm flex items-center justify-center gap-2 py-3">
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button className="btn-outline text-sm flex items-center justify-center gap-2 py-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  Facebook
                </button>
              </div>

              <p className="font-body text-sm text-center text-muted-foreground mt-6">
                New to the journey? <Link to="/register" className="text-primary font-medium hover:underline">Register your account</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
