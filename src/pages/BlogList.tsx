import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Layout from "@/components/Layout";
import heroBlog from "@/assets/hero-blog.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { initialBlogs } from "@/data/blogs";

const API_URL = "http://localhost:5092/api/Blogs";
const categoryFilters = ["All Stories", "Adventures", "Food & Culture", "Destinations"];

// Simplified type based on what the UI needs, mapped from the API
export type BlogPost = {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState("All Stories");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", category: "Destinations" });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      
      // Map the API data to our Frontend structure
      const mappedBlogs: BlogPost[] = data.map((b: any) => ({
        id: b.blogId,
        title: b.title,
        excerpt: b.excerpt || b.content?.slice(0, 120) + "..." || "No summary available.",
        content: b.content || "",
        image: b.imgUrl || heroBlog,
        category: "Destinations", // Backend might not have category in blog directly, using default for now
        author: "Voyager Writer", // Can be b.user?.fullName if API includes User data
        date: b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date().toLocaleDateString(),
        readTime: "5 min read", 
      }));
      
      setBlogs([...mappedBlogs, ...(initialBlogs as any)]);
    } catch (error) {
      console.error(error);
      toast.error("Could not load blogs.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeFilter === "All Stories" ? blogs : blogs.filter((b) => b.category === activeFilter);

  const handleCreate = async () => {
    if (!user) {
      toast.error("You must be logged in to create a post.");
      return;
    }
    if (!form.title || !form.content) {
      toast.error("Please fill in the title and content.");
      return;
    }

    try {
      const newApiBlog = {
        title: form.title,
        content: form.content,
        excerpt: form.excerpt,
        userIntId: user.userIntId,
        status: "Published",
        createdAt: new Date().toISOString()
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApiBlog),
      });

      if (!res.ok) throw new Error("Failed to post blog");
      
      toast.success("Blog published successfully!");
      setForm({ title: "", excerpt: "", content: "", category: "Destinations" });
      setShowCreate(false);
      fetchBlogs(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error("Could not publish blog.");
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={heroBlog} alt="Travel journal" className="absolute inset-0 w-full h-full object-cover" width={1200} height={800} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-dark/20" />
        <div className="editorial-section relative z-10 flex flex-col justify-end h-full pb-10">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary-foreground/80 mb-2">Our Stories</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">
            The Curated<br /><em className="font-normal">Horizon</em>
          </h1>
        </div>
      </section>

      {/* Filters + Create */}
      <section className="editorial-section py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold">Explore Journals</h2>
            <p className="font-body text-sm text-muted-foreground italic">Select a path to begin your reading voyage</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 flex-wrap">
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`font-body text-xs px-4 py-2 rounded-full border transition-colors ${
                    activeFilter === cat ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {user && (
              <button onClick={() => setShowCreate(!showCreate)} className="btn-primary text-sm flex items-center gap-1 whitespace-nowrap">
                <Plus size={16} /> New Post
              </button>
            )}
          </div>
        </div>

        {/* Create Form */}
        {showCreate && user && (
          <div className="bg-card border border-border rounded-xl p-6 mb-10 animate-fade-in">
            <h3 className="font-display text-xl font-bold mb-4">Create a New Blog Post</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label-editorial">Title</label>
                <input className="input-editorial" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Your story title" />
              </div>
              <div className="md:col-span-2">
                <label className="label-editorial">Excerpt</label>
                <input className="input-editorial" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary (optional)" />
              </div>
              <div className="md:col-span-2">
                <label className="label-editorial">Content</label>
                <textarea className="input-editorial min-h-[120px]" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write your story..." />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleCreate} className="btn-primary text-sm">Publish Story</button>
              <button onClick={() => setShowCreate(false)} className="btn-outline text-sm">Cancel</button>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground py-10">Loading stories...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.length > 0 ? filtered.map((blog, i) => (
              <Link to={`/blogs/${blog.id}`} key={blog.id} className={`group ${i === 0 ? "md:col-span-2" : ""}`}>
                <div className={`card-editorial flex flex-col ${i === 0 ? "md:flex-row" : ""}`}>
                  <div className={`overflow-hidden ${i === 0 ? "md:w-3/5 aspect-[16/9] md:aspect-auto" : "aspect-[16/9]"}`}>
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                  </div>
                  <div className={`p-6 flex flex-col justify-center ${i === 0 ? "md:w-2/5" : ""}`}>
                    <span className="font-body text-xs uppercase tracking-widest text-primary font-semibold">{blog.category}</span>
                    <h3 className={`font-display font-bold mt-2 group-hover:text-primary transition-colors ${i === 0 ? "text-2xl" : "text-lg"}`}>
                      {blog.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-2 line-clamp-3">{blog.excerpt}</p>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center font-body text-[10px] font-bold text-muted-foreground">
                        {blog.author.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-body text-xs text-muted-foreground">{blog.author} · {blog.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
               <p className="col-span-2 text-center text-muted-foreground py-10">No stories found.</p>
            )}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="editorial-section py-16">
        <div className="bg-card border border-border rounded-xl p-8 max-w-md">
          <h3 className="font-display text-xl font-bold">Join the Expedition</h3>
          <p className="font-body text-sm text-muted-foreground mt-1 mb-4">
            Sign up for our bi-weekly editorial digest featuring exclusive travel narratives and photography tips.
          </p>
          <input type="email" placeholder="Email Address" className="input-editorial mb-3" />
          <button className="btn-primary text-sm w-full">Subscribe Now</button>
        </div>
      </section>
    </Layout>
  );
};

export default BlogList;
