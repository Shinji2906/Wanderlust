import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { initialBlogs } from "@/data/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = initialBlogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <Layout>
        <div className="editorial-section py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Story not found</h1>
          <Link to="/blogs" className="btn-primary inline-block mt-4 text-sm">Back to Journal</Link>
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
          <ArrowLeft size={16} /> Back to Journal
        </Link>
        <div className="font-body text-lg leading-relaxed text-foreground/90 space-y-6">
          {blog.content.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetail;
