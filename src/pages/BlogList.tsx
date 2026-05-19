import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import heroBlog from "@/assets/hero-blog.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { initialBlogs } from "@/data/blogs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_URL = "http://localhost:5092/api/Blogs";
const categoryFilters = ["Tất cả bài viết", "Khám phá", "Ẩm thực & Văn hóa", "Điểm đến"];

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '');
};

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
  const [activeFilter, setActiveFilter] = useState("Tất cả bài viết");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", category: "Destinations", imageUrl: "" });
  const [uploadingImage, setUploadingImage] = useState(false);
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
      
      const mappedBlogs: BlogPost[] = data.map((b: any) => ({
        id: b.blogID || b.blogId,
        title: b.title,
        excerpt: b.excerpt || (b.content ? stripHtml(b.content).slice(0, 120) + "..." : "Không có tóm tắt."),
        content: b.content || "",
        image: b.imgUrl || b.imgURL || b.imageUrl || heroBlog,
        category: "Điểm đến", // Backend might not have category in blog directly, using default for now
        author: "Voyager Writer", // Can be b.user?.fullName if API includes User data
        date: b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date().toLocaleDateString(),
        readTime: "Đọc 5 phút", 
      }));
      
      setBlogs([...mappedBlogs, ...(initialBlogs as any)]);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải bài viết.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeFilter === "Tất cả bài viết" ? blogs : blogs.filter((b) => b.category === activeFilter);

  const handleCreate = async () => {
    if (!user) {
      toast.error("Bạn phải đăng nhập để tạo bài viết.");
      return;
    }
    if (!form.title || !form.content) {
      toast.error("Vui lòng nhập tiêu đề và nội dung.");
      return;
    }

    try {
      const newApiBlog = {
        title: form.title,
        content: form.content,
        excerpt: form.excerpt,
        userIntId: user.userIntId,
        status: "Published",
        imgUrl: form.imageUrl,
        createdAt: new Date().toISOString()
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApiBlog),
      });

      if (!res.ok) throw new Error("Failed to post blog");
      
      toast.success("Đã đăng bài viết thành công!");
      setForm({ title: "", excerpt: "", content: "", category: "Điểm đến", imageUrl: "" });
      setShowCreate(false);
      fetchBlogs(); // Refresh list
    } catch (error) {
      console.error(error);
      toast.error("Không thể đăng bài viết.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      setUploadingImage(true);
      const res = await fetch("http://localhost:5092/api/Upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm({ ...form, imageUrl: "http://localhost:5092" + data.url });
      toast.success("Image uploaded!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteBlog = async (id: string | number) => {
    if (isNaN(Number(id))) {
      toast.error("Không thể xóa dữ liệu mẫu");
      return;
    }
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Đã xóa bài viết");
      fetchBlogs();
    } catch (error) {
      console.error(error);
      toast.error("Không thể xóa bài viết");
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={heroBlog} alt="Travel journal" className="absolute inset-0 w-full h-full object-cover" width={1200} height={800} />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-primary/50 to-teal-dark/60" />
        <div className="editorial-section relative z-10 flex flex-col justify-end h-full pb-10">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary-foreground/80 mb-2">Chuyện của chúng tôi</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground">
            Khám phá<br /><em className="font-normal">Chân Trời Mới</em>
          </h1>
        </div>
      </section>

      {/* Filters + Create */}
      <section className="editorial-section py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold">Khám Phá Nhật Ký</h2>
            <p className="font-body text-sm text-muted-foreground italic">Chọn một lối đi để bắt đầu hành trình của bạn</p>
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
                <Plus size={16} /> Bài Viết Mới
              </button>
            )}
          </div>
        </div>

        {/* Create Form */}
        {showCreate && user && (
          <div className="bg-card border border-border rounded-xl p-6 mb-10 animate-fade-in">
            <h3 className="font-display text-xl font-bold mb-4">Tạo Bài Viết Mới</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label-editorial">Tiêu đề</label>
                <input className="input-editorial" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Tiêu đề bài viết" />
              </div>
              <div className="md:col-span-2">
                <label className="label-editorial">Đoạn trích</label>
                <input className="input-editorial" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Tóm tắt ngắn (không bắt buộc)" />
              </div>
              <div className="md:col-span-2">
                <label className="label-editorial">Ảnh bìa</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="input-editorial py-2" />
                {uploadingImage && <span className="text-sm text-primary">Đang tải lên...</span>}
                {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="mt-2 h-32 w-full rounded object-cover" />}
              </div>
              <div className="md:col-span-2">
                <label className="label-editorial">Nội dung</label>
                <div className="bg-background rounded-md mt-1 mb-10 h-[250px]">
                  <ReactQuill theme="snow" value={form.content} onChange={(val) => setForm({ ...form, content: val })} className="h-full" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleCreate} className="btn-primary text-sm">Đăng Bài</button>
              <button onClick={() => setShowCreate(false)} className="btn-outline text-sm">Hủy</button>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground py-10">Đang tải bài viết...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.length > 0 ? filtered.map((blog, i) => (
              <Link to={`/blogs/${blog.id}`} key={blog.id} className={`group ${i === 0 ? "md:col-span-2" : ""}`}>
                <div className={`card-editorial flex flex-col ${i === 0 ? "md:flex-row" : ""}`}>
                  <div className={`overflow-hidden relative ${i === 0 ? "md:w-3/5 aspect-[16/9] md:aspect-auto" : "aspect-[16/9]"}`}>
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                    {user && !isNaN(Number(blog.id)) && (user.role?.toLowerCase() === 'admin' || blog.author === user.fullName) && (
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center hover:bg-red-500 transition-all text-white z-10 opacity-0 group-hover:opacity-100" onClick={(e) => { e.preventDefault(); handleDeleteBlog(blog.id); }}>
                        <Trash2 size={14} />
                      </button>
                    )}
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
               <p className="col-span-2 text-center text-muted-foreground py-10">Không tìm thấy bài viết nào.</p>
            )}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="editorial-section py-16">
        <div className="bg-card border border-border rounded-xl p-8 max-w-md">
          <h3 className="font-display text-xl font-bold">Tham Gia Hành Trình</h3>
          <p className="font-body text-sm text-muted-foreground mt-1 mb-4">
            Đăng ký nhận bản tin để nhận những câu chuyện du lịch độc quyền và mẹo chụp ảnh.
          </p>
          <input type="email" placeholder="Địa chỉ Email" className="input-editorial mb-3" />
          <button className="btn-primary text-sm w-full">Đăng ký ngay</button>
        </div>
      </section>
    </Layout>
  );
};

export default BlogList;
