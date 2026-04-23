import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { BlogPost } from "./BlogList";
import { TourType } from "./TourList";
import heroProfile from "@/assets/hero-home.jpg"; // Reusing an asset or you can add a new one
import { initialBlogs } from "@/data/blogs";

// Mock simple API addresses
const API_URL_BLOGS = "http://localhost:5092/api/Blogs";
// const API_URL_TOURS = "http://localhost:5092/api/Tours";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"blogs" | "tours">("blogs");
  const [userBlogs, setUserBlogs] = useState<BlogPost[]>([]);
  const [userTours, setUserTours] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Fetch only blogs since tours aren't tied to users in the DB
      const resBlogs = await fetch(API_URL_BLOGS);
      if (resBlogs.ok) {
        const dataBlogs = await resBlogs.json();
        // Filter by userIntId
        const myBlogsData = dataBlogs.filter((b: any) => b.userIntId === user.userIntId);
        
        const mappedBlogs: BlogPost[] = myBlogsData.map((b: any) => ({
          id: b.blogId,
          title: b.title,
          excerpt: b.excerpt || b.content?.slice(0, 120) + "..." || "No summary available.",
          content: b.content || "",
          image: b.imgUrl || heroProfile,
          category: "Destinations",
          author: user.fullName,
          date: b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : new Date().toLocaleDateString(),
          readTime: "5 min read",
        }));
        setUserBlogs([...mappedBlogs.reverse(), ...(initialBlogs as any).slice(0, 3)]);
      }
      
      // Setting an empty array for Tours as requested (awaiting future implementations)
      setUserTours([]);

    } catch (error) {
      console.error(error);
      toast.error("Could not load profile data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[35vh] min-h-[300px] overflow-hidden flex items-end">
        <img src={heroProfile} alt="Profile background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
        <div className="editorial-section relative z-10 w-full pb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
            {/* Random aesthetic avatar placeholder using UI Avatars */}
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=0D8B7A&color=fff&size=128&font-size=0.33`} 
              alt={user.fullName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left text-primary-foreground">
            <h1 className="font-display text-3xl md:text-5xl font-bold">{user.fullName}</h1>
            <p className="font-body text-sm md:text-base opacity-80 mt-1">{user.email} • Mạng lưới Voyager</p>
          </div>
        </div>
      </section>

      {/* Tabs Layout */}
      <section className="editorial-section py-12 min-h-[50vh]">
        <div className="flex border-b border-border/50 mb-8">
          <button 
            className={`pb-4 px-6 font-body text-sm font-medium transition-colors relative ${activeTab === 'blogs' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('blogs')}
          >
            Nhật ký (Blogs)
            {activeTab === 'blogs' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
          </button>
          <button 
            className={`pb-4 px-6 font-body text-sm font-medium transition-colors relative ${activeTab === 'tours' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setActiveTab('tours')}
          >
            Hành trình (Tours)
            {activeTab === 'tours' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <p className="text-center text-muted-foreground py-10 font-body">Đang tải dữ liệu...</p>
        ) : (
          <div className="animate-fade-in">
            {activeTab === "blogs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBlogs.length > 0 ? (
                  userBlogs.map((blog) => (
                    <Link to={`/blogs/${blog.id}`} key={blog.id} className="group flex flex-col card-editorial">
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground font-body text-[10px] uppercase tracking-wider px-2 py-1 rounded">
                          {blog.category}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors flex-1">{blog.title}</h3>
                        <div className="flex items-center justify-between text-muted-foreground mt-4 font-body text-xs">
                          <span>{blog.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border border-dashed border-border rounded-xl bg-card/50">
                    <p className="font-body text-muted-foreground mb-4">Bạn chưa có bài viết nhật ký nào trên chân trời mới.</p>
                    <Link to="/blogs" className="btn-primary text-sm inline-flex">Viết blog đầu tiên</Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "tours" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTours.length > 0 ? (
                  userTours.map((tour) => (
                    <div key={tour.id} className="card-editorial p-6">
                      <h3 className="font-display text-xl font-bold">{tour.title}</h3>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border border-dashed border-border rounded-xl bg-card/50">
                    <p className="font-body text-muted-foreground mb-4">Bạn chưa tổ chức hành trình mới nào.</p>
                    <Link to="/tours" className="btn-primary text-sm inline-flex">Tạo Tour mới ngay</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Profile;
