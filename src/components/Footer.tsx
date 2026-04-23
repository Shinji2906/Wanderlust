import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-teal-dark text-primary-foreground">
    <div className="editorial-section py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-lg font-bold mb-3">The Editorial Voyager</h3>
          <p className="font-body text-sm opacity-80 leading-relaxed">
            Crafting premium travel experiences through storytelling and curation since 2024.
          </p>
        </div>
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">Navigation</h4>
          <div className="space-y-2">
            <Link to="/" className="block font-body text-sm opacity-80 hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/tours" className="block font-body text-sm opacity-80 hover:opacity-100 transition-opacity">Tours</Link>
            <Link to="/blogs" className="block font-body text-sm opacity-80 hover:opacity-100 transition-opacity">Journal</Link>
          </div>
        </div>
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">Legal</h4>
          <div className="space-y-2">
            <span className="block font-body text-sm opacity-80">Privacy Policy</span>
            <span className="block font-body text-sm opacity-80">Terms of Service</span>
            <span className="block font-body text-sm opacity-80">Contact Us</span>
          </div>
        </div>
        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-4 opacity-70">Social</h4>
          <div className="space-y-2">
            <span className="block font-body text-sm opacity-80">Instagram</span>
            <span className="block font-body text-sm opacity-80">Twitter</span>
            <span className="block font-body text-sm opacity-80">YouTube</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-12 pt-6">
        <p className="font-body text-xs opacity-60">© 2024 The Editorial Voyager. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
