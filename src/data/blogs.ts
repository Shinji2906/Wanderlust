import blogSapa from "@/assets/blog-sapa.jpg";
import blogFood from "@/assets/blog-food.jpg";
import blogMorocco from "@/assets/blog-morocco.jpg";
import blogDolomites from "@/assets/blog-dolomites.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export const initialBlogs: BlogPost[] = [
  {
    id: "emerald-terraces-sapa",
    title: "The Emerald Terraces: A Journey through Sapa's Vertical Gardens",
    excerpt: "Winding paths that lead to the sky, these ancient rice fields tell a story of harmony between man and mountain.",
    content: `Winding paths that lead to the sky, these ancient rice fields tell a story of harmony between man and mountain. Discover why the northern highlands of Vietnam remain the soul of Indochina.\n\nThe morning mist clings to the terraces like a silk veil, revealing layer upon layer of emerald green cascading down the mountainside. Each terrace is a testament to generations of Hmong and Dao farmers who carved this landscape with nothing but determination and an intimate understanding of the mountain's moods.\n\nWe spent a week walking the narrow paths between villages, sharing meals with families whose ancestors built these terraces centuries ago. The rice wine flows freely, and the stories even more so — tales of spirits in the mountains, of harvests blessed by rain, and of a way of life that refuses to be rushed by the modern world.\n\nAs the sun sets behind Fansipan, painting the terraces in shades of gold and amber, you understand why this place has captivated travelers for generations. It's not just the views — it's the feeling that here, time moves at the pace of the growing rice.`,
    image: blogSapa,
    category: "Destinations",
    author: "Elena Moretti",
    date: "March 15, 2024",
    readTime: "8 min read",
  },
  {
    id: "mediterranean-flavor",
    title: "Salt and Soil: Rediscovering the Roots of Mediterranean Flavor",
    excerpt: "Beyond the tourist traps lies a world of tradition. We spent three weeks in the heart of Sicily to understand how ancient harvest rituals still define modern cuisine.",
    content: `Beyond the tourist traps lies a world of tradition. We spent three weeks in the heart of Sicily to understand how ancient harvest rituals still define modern cuisine.\n\nIn a sunlit kitchen overlooking the Mediterranean, Nonna Rosa rolls pasta with the confidence of someone who has done this ten thousand times. Her hands move with a rhythm that predates recipes — this is cooking by feel, by memory, by love.\n\nThe olive oil here is different. Pressed from trees that have witnessed centuries, it carries a peppery bite that commercial oils can never replicate. We visited groves where farmers still harvest by hand, shaking the branches with wooden poles just as their great-grandparents did.\n\nSicilian food isn't about complexity — it's about respect for ingredients. A perfect tomato, warm from the vine. Sea salt harvested from ancient pans. Bread baked in wood-fired ovens that have been burning since the 1800s. Every meal is a history lesson, and every bite tells a story of this sun-drenched island.`,
    image: blogFood,
    category: "Food & Culture",
    author: "Marco Chen",
    date: "February 28, 2024",
    readTime: "6 min read",
  },
  {
    id: "chefchaouen-dreams",
    title: "Monochrome Dreams: The Hidden Alleys of Chefchaouen",
    excerpt: "A visual exploration of Morocco's blue city before the crowds arrive. A study in color, shadow, and architectural heritage.",
    content: `A visual exploration of Morocco's blue city before the crowds arrive. A study in color, shadow, and architectural heritage.\n\nChefchaouen wakes slowly. In the blue hour before dawn, the medina is a study in monochrome — every shade of blue imaginable painted across walls, steps, doorways, and flowerpots. The effect is hypnotic, as if the entire city has been dipped in the sky.\n\nThe tradition of blue-washing began with Jewish refugees in the 1930s, who believed the color represented heaven and reminded them to lead a spiritual life. Today, the practice continues, maintained by residents who repaint their homes in varying shades of blue each year.\n\nWandering the narrow alleys at dawn, before the day-trippers arrive from Fez, you can hear the city breathe. Cats stretch on blue steps. The call to prayer echoes off painted walls. A baker's oven sends warm, yeasty air through a doorway. This is the Chefchaouen that photographers dream of — silent, blue, and profoundly beautiful.`,
    image: blogMorocco,
    category: "Destinations",
    author: "Sofia Laurent",
    date: "January 20, 2024",
    readTime: "5 min read",
  },
  {
    id: "dolomites-silence",
    title: "Climbing the Silence: Solo Trekking in the High Dolomites",
    excerpt: "Testing the limits of endurance and solitude among the majestic limestone cathedrals of Northern Italy's most iconic mountain range.",
    content: `Testing the limits of endurance and solitude among the majestic limestone cathedrals of Northern Italy's most iconic mountain range.\n\nThere's a particular quality to silence at 3,000 meters. It's not the absence of sound — wind still moves across rock faces, marmots whistle warnings, and distant waterfalls provide a constant white noise. It's the absence of human noise. Up here, you are truly alone with the mountain.\n\nThe Dolomites have a way of making you feel both insignificant and deeply alive. These pale limestone towers, the remnants of an ancient coral reef, glow pink at sunrise — the famous enrosadira that has inspired artists and poets for centuries.\n\nI spent five days on the Alta Via 1, sleeping in rifugios perched on impossible ledges, eating hearty South Tyrolean food, and walking through landscapes that shift from alpine meadows to lunar rock gardens within a single hour. Every step was a meditation, every vista a reward.`,
    image: blogDolomites,
    category: "Adventures",
    author: "James Nakamura",
    date: "December 10, 2023",
    readTime: "10 min read",
  },
];
