import tourBagan from "@/assets/tour-bagan.jpg";
import tourBali from "@/assets/tour-bali.jpg";
import tourAmalfi from "@/assets/tour-amalfi.jpg";
import tourIceland from "@/assets/tour-iceland.jpg";
import tourVenice from "@/assets/tour-venice.jpg";
import tourSapaDetail from "@/assets/tour-sapa-detail.jpg";

export interface Tour {
  id: string;
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
  content: string;
  itinerary: { title: string; description: string }[];
}

export const initialTours: Tour[] = [
  {
    id: "sapa-mist",
    title: "Sapa Mist & Mountains",
    description: "A 7-day immersive journey through tribal villages and high-altitude tea plantations.",
    image: tourSapaDetail,
    category: "Nature & Culture",
    duration: "5 Days / 4 Nights",
    groupSize: "Max 8 People",
    level: "Moderate Trek",
    departure: "Hanoi, VN",
    price: 1249,
    rating: 4.9,
    reviewCount: 124,
    content: `"Where the clouds find their home and the ancient traditions of the North meet the luxury of modern comfort."\n\nJourney deep into the Hoang Lien Son mountain range, where the iconic rice terraces of Sapa paint the landscape in shades of emerald and gold. This isn't just a trek; it's a sensory immersion into the heart of Northern Vietnam's ethnic diversity.\n\nWe've curated a path that balances the physical challenge of mountain trails with the soulful connection of village stays and high-end boutique lodges.`,
    itinerary: [
      { title: "Arrival & Tả Phìn Exploration", description: "Transfer from Hanoi to the cool heights of Sapa. We begin with a gentle walk into the Red Dao community of Tả Phìn, famous for their medicinal herbal baths and intricate embroidery." },
      { title: "The Heart of the Valley", description: "A full day trek through Muong Hoa Valley. We cross suspension bridges and wind through Lao Chai and Tả Van villages, stopping for an organic lunch prepared by a local Hmong family." },
      { title: "Clouds of Fansipan", description: "A specialized cable car ascent to the \"Roof of Indochina\". Experience the spiritual complex at the peak before a private sunset viewing from our boutique partner lodge." },
    ],
  },
  {
    id: "bagan-kingdom",
    title: "The Lost Kingdom of Bagan",
    description: "Explore over 2,000 ancient temples across the plains of Myanmar at dawn.",
    image: tourBagan,
    category: "Cultural Immersion",
    duration: "7 Days",
    groupSize: "Max 6 People",
    level: "Easy",
    departure: "Yangon, MM",
    price: 3100,
    rating: 4.8,
    reviewCount: 87,
    content: `Step back in time across the vast temple plains of Bagan. With over 2,000 Buddhist monuments dotting the landscape, every sunrise reveals a new silhouette.\n\nOur curated journey includes private e-bike tours, hot air balloon rides, and exclusive after-hours access to select temples.`,
    itinerary: [
      { title: "Yangon Arrival & Cultural Briefing", description: "Arrive in Yangon and explore the colonial district before flying to Bagan." },
      { title: "Temple Plains at Dawn", description: "Wake before sunrise for a private hot air balloon ride over the ancient temples." },
      { title: "Village Life & Lacquerware", description: "Visit traditional lacquerware workshops and dine with a local family." },
    ],
  },
  {
    id: "bali-sanctuary",
    title: "Bali Sanctuary Retreat",
    description: "Find stillness in the heart of Ubud's jungles with luxury wellness and culture.",
    image: tourBali,
    category: "Wellness & Luxury",
    duration: "6 Days",
    groupSize: "Max 10 People",
    level: "Easy",
    departure: "Denpasar, ID",
    price: 2800,
    rating: 4.7,
    reviewCount: 156,
    content: `Escape to Bali's spiritual heart. Our sanctuary retreat combines yoga, meditation, and traditional Balinese healing with five-star jungle accommodations.\n\nFrom infinity pools overlooking rice terraces to private ceremonies at water temples, this is wellness elevated.`,
    itinerary: [
      { title: "Arrival & Jungle Welcome", description: "Transfer to your private villa nestled in the Ubud jungle. Evening welcome ceremony." },
      { title: "Morning Yoga & Rice Terrace Walk", description: "Sunrise yoga followed by a guided walk through the Tegallalang terraces." },
      { title: "Water Temple & Healing Session", description: "Visit Tirta Empul for a purification ritual followed by a traditional Balinese massage." },
    ],
  },
  {
    id: "amalfi-shores",
    title: "Azure Shores of Amalfi",
    description: "Culinary escapes and private boat tours along the world's most dramatic coastline.",
    image: tourAmalfi,
    category: "Mediterranean Coastal",
    duration: "5 Days",
    groupSize: "Max 8 People",
    level: "Easy",
    departure: "Naples, IT",
    price: 2400,
    rating: 4.6,
    reviewCount: 93,
    content: `Sail the turquoise waters of the Amalfi Coast. From Positano's pastel cliffside to Ravello's hidden gardens, this journey is a masterclass in la dolce vita.\n\nPrivate boat charters, cooking classes with local nonnas, and sunset aperitivos on secluded terraces.`,
    itinerary: [
      { title: "Naples to Positano", description: "Private transfer along the coastal road with stops at hidden viewpoints." },
      { title: "Capri by Sea", description: "Full-day private boat charter to Capri with swimming in the Blue Grotto." },
      { title: "Ravello & Cooking Class", description: "Explore the gardens of Villa Rufolo followed by a hands-on pasta making class." },
    ],
  },
  {
    id: "iceland-auroras",
    title: "Reykjavik & The Auroras",
    description: "Luxury basecamps and thermal springs under the dancing northern lights.",
    image: tourIceland,
    category: "Nordic Discovery",
    duration: "4 Days",
    groupSize: "Max 6 People",
    level: "Moderate",
    departure: "Reykjavik, IS",
    price: 3200,
    rating: 5.0,
    reviewCount: 64,
    content: `Chase the Northern Lights across Iceland's otherworldly landscape. From glacial lagoons to geothermal hot springs, this is nature at its most dramatic.\n\nStay in exclusive glass-roofed lodges designed for aurora viewing from the comfort of your bed.`,
    itinerary: [
      { title: "Reykjavik & Golden Circle", description: "Explore the capital before driving the Golden Circle — Thingvellir, Geysir, and Gullfoss." },
      { title: "South Coast & Glacier Hike", description: "Black sand beaches, waterfalls, and a guided glacier walk on Sólheimajökull." },
      { title: "Aurora Basecamp", description: "Transfer to our glass-roofed lodge for the ultimate northern lights experience." },
    ],
  },
  {
    id: "venice-hidden",
    title: "The Venice Hidden Tour",
    description: "Explore the secret gardens and artisan workshops of the floating city.",
    image: tourVenice,
    category: "History & Art",
    duration: "6 Days",
    groupSize: "Max 8 People",
    level: "Easy",
    departure: "Venice, IT",
    price: 1950,
    rating: 4.7,
    reviewCount: 78,
    content: `Discover the Venice that tourists never see. Behind the famous facades lie secret gardens, ancient workshops, and centuries-old traditions.\n\nOur local guides open doors that are normally closed — private palace visits, mask-making ateliers, and moonlit gondola rides through hidden canals.`,
    itinerary: [
      { title: "Arrival & Hidden Venice Walk", description: "Skip the crowds and explore the quiet sestieri of Dorsoduro and Cannaregio." },
      { title: "Murano & Artisan Workshops", description: "Private glassblowing demonstration and visit to a centuries-old mask workshop." },
      { title: "Secret Gardens & Palace Tour", description: "Access normally-closed gardens and a private palazzo with art collection viewing." },
    ],
  },
];
