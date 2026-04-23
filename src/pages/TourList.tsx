import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Star, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import heroHome from "@/assets/hero-home.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { initialTours } from "@/data/tours";

const API_URL = "http://localhost:5092/api/Tours";
const destinations = ["All", "Southeast Asia", "Europe", "Mediterranean"];
const tourTypes = ["All", "Cultural", "Adventure", "Luxury", "Wellness"];

export type TourType = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  groupSize: string;
  level: string;
  departure: string;
  price: number;
  rating: number;
  reviewCount: number;
};

const TourList = () => {
  const [tours, setTours] = useState<TourType[]>([]);
  const [destFilter, setDestFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "", description: "", category: "", duration: "", groupSize: "",
    level: "Easy", departure: "", price: "", content: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch tours");
      const data = await res.json();
      
      const mappedTours: TourType[] = data.map((t: any) => ({
        id: t.tourId,
        title: t.tourName,
        description: t.description || "An amazing journey awaits.",
        image: t.imageUrl || heroHome,
        category: "Cultural", // mapping category logic if needed
        duration: t.duration || "5 Days",
        groupSize: t.availableSlots ? `Max ${t.availableSlots} People` : "Group Tour",
        level: "Easy", // default
        departure: t.departureDate ? new Date(t.departureDate).toLocaleDateString() : "TBD",
        price: t.price || 0,
        rating: 4.5, // Mock rating
        reviewCount: 12, // Mock review count
      }));
      
      setTours([...mappedTours.reverse(), ...(initialTours as any)]);
    } catch (error) {
      console.error(error);
      toast.error("Could not load tours.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!user) {
      toast.error("You must be logged in to create a tour.");
      return;
    }
    if (!form.title || !form.price) {
      toast.error("Title and Price are required.");
      return;
    }

    try {
      const newApiTour = {
        tourName: form.title,
        categoryId: 1, // Defaulting to 1 to bypass foreign key constraint
        description: form.description,
        price: parseFloat(form.price),
        duration: form.duration || "5 Days",
        departureDate: form.departure ? new Date(form.departure).toISOString() : new Date().toISOString(),
        availableSlots: parseInt(form.groupSize.replace(/\D/g, '')) || 10,
        imageUrl: heroHome,
        createdAt: new Date().toISOString()
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApiTour),
      });

      if (!res.ok) throw new Error("Failed to post tour");
      
      toast.success("Tour published successfully!");
      setForm({ title: "", description: "", category: "", duration: "", groupSize: "", level: "Easy", departure: "", price: "", content: "" });
      setShowCreate(false);
      fetchTours();
    } catch (error) {
      console.error(error);
      toast.error("Could not publish tour.");
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="editorial-section pt-12 pb-8">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-2">Curated Experiences</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          Explore the <em className="font-normal">Horizon</em>
        </h1>
        <p className="font-body text-muted-foreground mt-2 max-w-lg">
          Hand-selected journeys that prioritize local depth and refined aesthetics. Your story begins at the edge of the known world.
        </p>
      </section>

      <section className="editorial-section pb-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:w-56 flex-shrink-0 space-y-6">
            <div>
              <h4 className="label-editorial">Destinations</h4>
              {destinations.map((d) => (
                <label key={d} className="flex items-center gap-2 font-body text-sm py-1 cursor-pointer">
                  <input type="radio" name="dest" checked={destFilter === d} onChange={() => setDestFilter(d)} className="accent-primary" />
                  {d}
                </label>
              ))}
            </div>
            <div>
              <h4 className="label-editorial">Tour Type</h4>
              <div className="flex flex-wrap gap-2">
                {tourTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`font-body text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      typeFilter === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {user && (
              <button onClick={() => setShowCreate(!showCreate)} className="btn-primary text-sm w-full flex items-center gap-1 justify-center">
                <Plus size={16} /> Add Tour
              </button>
            )}
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Create Form */}
            {showCreate && user && (
              <div className="bg-card border border-border rounded-xl p-6 mb-8 animate-fade-in">
                <h3 className="font-display text-xl font-bold mb-4">Create a New Tour</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="label-editorial">Title</label><input className="input-editorial" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Tour name" /></div>
                  <div><label className="label-editorial">Category</label><input className="input-editorial" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Cultural, Adventure" /></div>
                  <div><label className="label-editorial">Duration</label><input className="input-editorial" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 5 Days / 4 Nights" /></div>
                  <div><label className="label-editorial">Price ($)</label><input className="input-editorial" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="1249" /></div>
                  <div><label className="label-editorial">Group Size</label><input className="input-editorial" value={form.groupSize} onChange={(e) => setForm({ ...form, groupSize: e.target.value })} placeholder="Max 8 People" /></div>
                  <div><label className="label-editorial">Departure Date</label><input className="input-editorial" type="date" value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })} placeholder="City, Country" /></div>
                  <div className="md:col-span-2"><label className="label-editorial">Description</label><textarea className="input-editorial min-h-[100px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the tour..." /></div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleCreate} className="btn-primary text-sm">Publish Tour</button>
                  <button onClick={() => setShowCreate(false)} className="btn-outline text-sm">Cancel</button>
                </div>
              </div>
            )}

            {/* Tour Cards */}
            {loading ? (
              <p className="text-center text-muted-foreground py-10">Loading tours...</p>
            ) : (
              <div className="space-y-8">
                {tours.length > 0 ? tours.map((tour, i) => (
                  <Link to={`/tours/${tour.id}`} key={tour.id} className={`group card-editorial flex flex-col ${i === 0 ? "md:flex-row" : "md:flex-row"}`}>
                    <div className="md:w-2/5 overflow-hidden aspect-[4/3] md:aspect-auto relative">
                      <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                      {i === 0 && <span className="absolute top-3 left-3 bg-primary text-primary-foreground font-body text-[10px] uppercase tracking-wider px-2 py-1 rounded">Limited Access</span>}
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-background transition-colors" onClick={(e) => e.preventDefault()}>
                        <Heart size={14} className="text-foreground" />
                      </button>
                    </div>
                    <div className="md:w-3/5 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{tour.category}</span>
                          {tour.rating > 0 && (
                            <span className="flex items-center gap-1 font-body text-xs text-foreground">
                              <Star size={12} className="fill-gold text-gold" /> {tour.rating} ({tour.reviewCount})
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-bold mt-2 group-hover:text-primary transition-colors">{tour.title}</h3>
                        <p className="font-body text-sm text-muted-foreground mt-2 line-clamp-2">{tour.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">{tour.duration}</span>
                        <span className="font-display text-lg font-bold text-primary">${tour.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <p className="text-center text-muted-foreground py-10">No tours found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-dark text-primary-foreground py-16">
        <div className="editorial-section flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="font-display text-3xl font-bold">Join our circle of <em className="font-normal">sophisticated travelers</em></h2>
            <p className="font-body opacity-80 mt-2">Receive monthly curated guides to the world's most overlooked destinations.</p>
            <div className="flex gap-3 mt-6 max-w-md">
              <input type="email" placeholder="Email Address" className="flex-1 px-4 py-3 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-body text-sm outline-none" />
              <button className="bg-primary-foreground text-teal-dark px-5 py-3 rounded-md font-body font-medium text-sm">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TourList;
