import { Link, useLocation } from "react-router-dom";
import { Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blogs", label: "Blog" },
    { to: "/tours", label: "Tours" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="editorial-section flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold text-foreground">
          The Editorial Voyager
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium transition-colors relative py-1 ${
                isActive(link.to)
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="btn-ghost text-sm flex items-center gap-2">
                <UserIcon size={16} /> Trang cá nhân
              </Link>
              <button onClick={logout} className="btn-outline text-sm flex items-center gap-2 py-2">
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-sm">Login</Link>
              <Link to="/register" className="btn-primary text-sm">Register</Link>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block font-body text-sm py-2 text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-border">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="btn-ghost text-sm justify-start flex items-center gap-2">
                   <UserIcon size={16} /> Trang cá nhân
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="btn-outline text-sm justify-start flex items-center gap-2">
                  <LogOut size={16} /> Đăng xuất
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-ghost text-sm">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-sm">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
