import crypto from "crypto";

export interface BlogPost {
  id: string;
  type: "photo" | "video" | "text";
  title: string;
  caption: string;
  mediaUrl?: string;
  location?: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    email: string;
    avatar?: string;
    verified: boolean;
  };
  likesCount: number;
  likedBy: string[]; // Track user emails or session identifiers
  createdAt: number;
  dateFormatted: string;
  timeFormatted: string;
  isHidden: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var __historia_blog_posts: BlogPost[] | undefined;
}

const initialPosts: BlogPost[] = [
  {
    id: "post-1",
    type: "photo",
    title: "Epigraphic Inscriptions & Architectural Grandeur of Lingaraj & Prachi Valley",
    caption:
      "Field archival study documenting the 11th-century Kalingan deula architecture and stone epigraphs. The architectural geometry reflects profound astronomical alignments and maritime prosperity of the Somavamshi and Eastern Ganga dynasties. Every relief carved in sandstone reveals socio-religious life, naval expeditions, and the evolution of Proto-Odia scripts.\n\n#OdishaHeritage #Epigraphy #KalingaArchitecture #DrAnjanPal #HistoricalArchives",
    mediaUrl: "/images/odisha_bhubaneswar_lingaraj_1789302971914.jpg",
    location: "Ekamra Kshetra & Prachi River Valley, Odisha",
    tags: ["OdishaHeritage", "Epigraphy", "KalingaArchitecture", "HistoricalArchives"],
    author: {
      name: "Dr. Anjan Kumar Pal",
      role: "Lead Historian & Ph.D. Scholar",
      email: "kumar2000150@gmail.com",
      avatar: "/images/dr_anjan_kumar_pal.jpg",
      verified: true,
    },
    likesCount: 184,
    likedBy: [],
    createdAt: Date.now() - 3600 * 1000 * 4,
    dateFormatted: "13 Sep 2026",
    timeFormatted: "06:30 PM",
    isHidden: false,
  },
  {
    id: "post-2",
    type: "photo",
    title: "Maritime Navigation Records: How Kalinga Sadhabas Crossed the Indian Ocean",
    caption:
      "Investigating ancient navigation treatises and nautical charts of coastal Odisha (Balasore, Pipili, Dhamra, and Chilika). The Boita Bandana traditions celebrate centuries of oceanic voyages connecting Odisha with Bali, Java, Sumatra, and Sri Lanka. Colonial gazetteers and Dutch trading company logs corroborate Balasore's status as a premier global maritime port from ancient times through the 18th century.\n\n#MaritimeHistory #KalingaSadhabas #BoitaBandana #AncientTrade #BalasoreHistory",
    mediaUrl: "/images/ancient_kalinga_maritime_1789279186431.jpg",
    location: "Ancient Port of Balasore & Subarnarekha Estuary",
    tags: ["MaritimeHistory", "KalingaSadhabas", "BoitaBandana", "BalasoreHistory"],
    author: {
      name: "Dr. Anjan Kumar Pal",
      role: "Lead Historian & Ph.D. Scholar",
      email: "kumar2000150@gmail.com",
      avatar: "/images/dr_anjan_kumar_pal.jpg",
      verified: true,
    },
    likesCount: 247,
    likedBy: [],
    createdAt: Date.now() - 3600 * 1000 * 24,
    dateFormatted: "12 Sep 2026",
    timeFormatted: "11:15 AM",
    isHidden: false,
  },
  {
    id: "post-3",
    type: "video",
    title: "Palm-Leaf Manuscript Conservation & Karani Script Analysis",
    caption:
      "Video documentation of manuscript preservation techniques for 17th-century palm-leaf bundles (Tala Patra). We analyze the unique Karani cursive script used by royal scribes and revenue accountants across northern Odisha districts. The application of indigenous natural oils helps preserve the delicate inscribed fibers for future generations of scholars.\n\n#ManuscriptConservation #PalmLeafManuscript #OdiaCulture #KaraniScript",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Embeddable video or MP4 video URL
    location: "Fakir Mohan University Archival Research Centre, Balasore",
    tags: ["ManuscriptConservation", "PalmLeafManuscript", "OdiaCulture"],
    author: {
      name: "Dr. Anjan Kumar Pal",
      role: "Lead Historian & Ph.D. Scholar",
      email: "kumar2000150@gmail.com",
      avatar: "/images/dr_anjan_kumar_pal.jpg",
      verified: true,
    },
    likesCount: 139,
    likedBy: [],
    createdAt: Date.now() - 3600 * 1000 * 48,
    dateFormatted: "11 Sep 2026",
    timeFormatted: "03:45 PM",
    isHidden: false,
  },
  {
    id: "post-4",
    type: "text",
    title: "Archival Note on 1817 Paika Rebellion & Balasore Peasant Dispatches",
    caption:
      "“The sword of Bakshi Jagabandhu and the unyielding spirit of the Paikas of Odisha shattered the early illusion of colonial invincibility. Through revenue records in the Cuttack & Balasore archives, we trace how unjust land settlements catalyzed an organized people's resistance across the eastern seaboard.”\n\n— Excerpt from Dr. Anjan Kumar Pal's forthcoming monograph on Colonial Hegemony & Indigenous Resistance in Coastal Odisha.\n\n#PaikaRebellion #OdishaFreedomStruggle #SubalternHistory #BakshiJagabandhu",
    location: "State Archives & Balasore Historical Society",
    tags: ["PaikaRebellion", "OdishaFreedomStruggle", "SubalternHistory"],
    author: {
      name: "Dr. Anjan Kumar Pal",
      role: "Lead Historian & Ph.D. Scholar",
      email: "kumar2000150@gmail.com",
      avatar: "/images/dr_anjan_kumar_pal.jpg",
      verified: true,
    },
    likesCount: 312,
    likedBy: [],
    createdAt: Date.now() - 3600 * 1000 * 72,
    dateFormatted: "10 Sep 2026",
    timeFormatted: "09:00 AM",
    isHidden: false,
  },
];

const blogPosts = global.__historia_blog_posts ?? initialPosts;
if (process.env.NODE_ENV !== "production") {
  global.__historia_blog_posts = blogPosts;
}

export function getBlogPosts(includeHidden = false): BlogPost[] {
  if (includeHidden) {
    return [...blogPosts].sort((a, b) => b.createdAt - a.createdAt);
  }
  return blogPosts
    .filter((post) => !post.isHidden)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}

export function addBlogPost(data: {
  type: "photo" | "video" | "text";
  title: string;
  caption: string;
  mediaUrl?: string;
  location?: string;
  tags?: string[];
}): BlogPost {
  const now = new Date();
  const newPost: BlogPost = {
    id: `post_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
    type: data.type,
    title: data.title.trim(),
    caption: data.caption.trim(),
    mediaUrl: data.mediaUrl?.trim() || undefined,
    location: data.location?.trim() || "KAALREKHA Historical Archive",
    tags: data.tags || [],
    author: {
      name: "Dr. Anjan Kumar Pal",
      role: "Lead Historian & Ph.D. Scholar",
      email: "kumar2000150@gmail.com",
      avatar: "/images/dr_anjan_kumar_pal.jpg",
      verified: true,
    },
    likesCount: 0,
    likedBy: [],
    createdAt: now.getTime(),
    dateFormatted: now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    timeFormatted: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    isHidden: false,
  };

  blogPosts.unshift(newPost);
  return newPost;
}

export function toggleBlogPostHide(id: string): { success: boolean; isHidden?: boolean } {
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return { success: false };
  post.isHidden = !post.isHidden;
  return { success: true, isHidden: post.isHidden };
}

export function deleteBlogPost(id: string): boolean {
  const index = blogPosts.findIndex((p) => p.id === id);
  if (index !== -1) {
    blogPosts.splice(index, 1);
    return true;
  }
  return false;
}

export function toggleBlogPostLike(id: string, userIdentifier: string): { success: boolean; likesCount: number; isLiked: boolean } {
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return { success: false, likesCount: 0, isLiked: false };

  const cleanUser = userIdentifier.trim().toLowerCase();
  const index = post.likedBy.indexOf(cleanUser);

  let isLiked = false;
  if (index !== -1) {
    // Already liked -> unlike
    post.likedBy.splice(index, 1);
    post.likesCount = Math.max(0, post.likesCount - 1);
    isLiked = false;
  } else {
    // Add like
    post.likedBy.push(cleanUser);
    post.likesCount += 1;
    isLiked = true;
  }

  return { success: true, likesCount: post.likesCount, isLiked };
}
