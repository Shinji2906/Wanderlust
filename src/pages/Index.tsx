import { Link } from "react-router-dom";
import { Search, MapPin, Users } from "lucide-react";
import Layout from "@/components/Layout";
import heroHome from "@/assets/hero-home.jpg";
import tourBagan from "@/assets/tour-bagan.jpg";
import tourBali from "@/assets/tour-bali.jpg";
import tourAmalfi from "@/assets/tour-amalfi.jpg";
import blogSapa from "@/assets/blog-sapa.jpg";
import blogFood from "@/assets/blog-food.jpg";
import blogMorocco from "@/assets/blog-morocco.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <img src={heroHome} alt="Rice terraces at dawn" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/40 to-transparent" />
        <div className="editorial-section relative z-10 flex flex-col justify-center h-full max-w-2xl">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary-foreground/80 mb-4">Beyond the Ordinary</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Crafting your<br /><em className="font-normal">Unseen Horizon</em>
          </h1>
          <p className="font-body text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-lg">
            Curated travel experiences for the discerning wanderer. From hidden valleys to architectural marvels, we tell the stories of the world through your lens.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 bg-background/95 backdrop-blur-sm rounded-lg p-3 max-w-lg">
            <div className="flex items-center gap-2 px-3 py-2 flex-1">
              <MapPin size={16} className="text-muted-foreground" />
              <input type="text" placeholder="Destination" className="bg-transparent font-body text-sm outline-none w-full text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 flex-1 border-t sm:border-t-0 sm:border-l border-border">
              <Users size={16} className="text-muted-foreground" />
              <input type="text" placeholder="Guests" className="bg-transparent font-body text-sm outline-none w-full text-foreground placeholder:text-muted-foreground" />
            </div>
            <Link to="/tours" className="btn-primary flex items-center gap-2 text-sm justify-center">
              <Search size={16} /> Explore
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Collections */}
      <section className="editorial-section py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Signature <em className="font-normal">Collections</em>
            </h2>
            <p className="font-body text-muted-foreground mt-2 max-w-lg">
              Handpicked journeys that define the editorial experience. Luxury meets authenticity in every corner of the globe.
            </p>
          </div>
          <Link to="/tours" className="font-body text-sm text-primary font-medium mt-4 md:mt-0 hover:underline">
            View all tours →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/tours/bagan-kingdom" className="group relative rounded-xl overflow-hidden aspect-[3/4]">
            <img src={tourBagan} alt="Bagan temples" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={1000} />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
              <span className="category-badge mb-3">Cultural Immersion</span>
              <h3 className="font-display text-2xl font-bold mt-2">The Lost Kingdom of Bagan</h3>
              <p className="font-body text-sm opacity-80 mt-1">7 Days · from $3,100</p>
            </div>
          </Link>

          <div className="grid grid-rows-2 gap-6">
            <Link to="/tours/bali-sanctuary" className="group relative rounded-xl overflow-hidden">
              <img src={tourBali} alt="Bali retreat" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                <span className="font-body text-xs uppercase tracking-wider opacity-80">New</span>
                <h3 className="font-display text-lg font-bold">Bali Sanctuary Retreat</h3>
                <p className="font-body text-xs opacity-80">Find stillness in the heart of Ubud's jungles</p>
              </div>
            </Link>
            <Link to="/tours/amalfi-shores" className="group relative rounded-xl overflow-hidden">
              <img src={tourAmalfi} alt="Amalfi Coast" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                <h3 className="font-display text-lg font-bold">Amalfi Coast Wanderer</h3>
                <p className="font-body text-xs opacity-80">Discovering the hidden paths of Southern Italy</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Journal Preview */}
      <section className="editorial-section py-20 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold">The <em className="font-normal">Journal</em></h2>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Tales of the Unexpected</p>
          </div>
          <Link to="/blogs" className="font-body text-sm text-primary font-medium hover:underline">All stories →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: blogSapa, title: "The Emerald Terraces of Sapa", cat: "Destinations", time: "8 min", id: "emerald-terraces-sapa" },
            { img: blogFood, title: "Roots of Mediterranean Flavor", cat: "Food & Culture", time: "6 min", id: "mediterranean-flavor" },
            { img: blogMorocco, title: "The Hidden Alleys of Chefchaouen", cat: "Destinations", time: "5 min", id: "chefchaouen-dreams" },
          ].map((post) => (
            <Link to={`/blogs/${post.id}`} key={post.id} className="group">
              <div className="rounded-lg overflow-hidden aspect-[4/3] mb-4">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
              </div>
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">{post.cat} · {post.time}</span>
              <h3 className="font-display text-lg font-semibold mt-1 group-hover:text-primary transition-colors">{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="editorial-section py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Voices of<br /><em className="font-normal">The Voyager</em></h2>
          </div>
          <div className="bg-teal-dark rounded-xl p-8 text-primary-foreground">
            <p className="font-body text-4xl text-primary-foreground/30 leading-none mb-2">"</p>
            <p className="font-display text-lg italic leading-relaxed opacity-90">
              The Editorial Voyager transformed how I see the world. It wasn't just a tour, it was a carefully curated narrative that respected the culture and the silence of the places we visited. Simply perfect.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-body text-sm font-bold">SR</div>
              <div>
                <p className="font-body text-sm font-medium">Elena Rodriguez</p>
                <p className="font-body text-xs opacity-70">Creative Director, NYC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-teal-dark text-primary-foreground py-20">
        <div className="editorial-section text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Your next story begins</h2>
          <p className="font-display text-2xl md:text-3xl italic text-gold mb-6">with a single step.</p>
          <p className="font-body opacity-80 mb-8">
            Join our exclusive reading list for early access to boutique tours, hidden destination guides, and editorial travel stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-body text-sm outline-none focus:border-primary-foreground/40" />
            <button className="bg-primary-foreground text-teal-dark px-6 py-3 rounded-md font-body font-medium text-sm hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
