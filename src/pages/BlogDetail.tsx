import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CommentSection from "@/components/CommentSection";
import { initialBlogs } from "@/data/blogs";
import heroBlog from "@/assets/hero-blog.jpg";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(initialBlogs.find((b) => b.id === id));
  const [loading, setLoading] = useState(!blog);

  useEffect(() => {
    if (!blog && id && !isNaN(Number(id))) {
      fetch(`http://localhost:5092/api/Blogs/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Not found");
            return res.json();
        })
        .then(data => {
            const mappedBlog = {
                id: data.blogID || data.blogId,
                title: data.title,
                content: data.content || "",
                image: data.imgUrl || data.imgURL || heroBlog,
                category: "Điểm đến",
                author: data.user?.fullName || "Voyager Writer",
                date: data.createdAt ? new Date(data.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date().toLocaleDateString(),
                readTime: "Đọc 5 phút",
            };
            setBlog(mappedBlog);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    } else {
        setLoading(false);
    }
  }, [id, blog]);

  if (loading) return <Layout><div className="editorial-section py-20 text-center">Đang tải...</div></Layout>;

  if (!blog) {
    return (
      <Layout>
        <div className="editorial-section py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Không tìm thấy bài viết</h1>
          <Link to="/blogs" className="btn-primary inline-block mt-4 text-sm">Quay lại Nhật ký</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" width={800} height={600} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
        <div className="editorial-section relative z-10 flex flex-col justify-end h-full pb-10">
          <span className="category-badge mb-3">{blog.category}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground max-w-3xl">{blog.title}</h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center font-body text-xs font-bold text-primary-foreground">
              {blog.author.split(" ").map(n => n[0]).join("")}
            </div>
            <span className="font-body text-sm text-primary-foreground/80">{blog.author} · {blog.date} · {blog.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="editorial-section py-12 max-w-3xl mx-auto">
        <Link to="/blogs" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} /> Quay lại Nhật ký
        </Link>
        <div className="prose prose-lg prose-teal max-w-none font-body text-lg leading-relaxed text-foreground/90 quill-content">
          {blog.content.includes('<p>') || blog.content.includes('<h1>') ? (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          ) : (
            blog.content.split("\n\n").map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))
          )}
        </div>
        
        {id && !isNaN(Number(id)) && (
          <CommentSection apiEndpoint="Blogs" itemId={Number(id)} />
        )}
      </article>
    </Layout>
  );
};

export default BlogDetail;
