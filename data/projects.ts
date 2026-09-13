export interface ArchivalProject {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  category: "DIGITAL ARCHIVE" | "EXCAVATION" | "MUSEUM EXHIBITION" | "ORAL HISTORY" | "HISTORICAL MAP";
  location: string;
  coordinates: string;
  image: string;
  overview: string;
  researchQuestion: string;
  methodology: string;
  historicalContext: string;
  researchFindings: string[];
  gallery: {
    caption: string;
    description: string;
    aspectRatio?: string;
  }[];
  timeline: {
    phase: string;
    date: string;
    milestone: string;
  }[];
  relatedPublications: string[];
  collaborators: string[];
  featured: boolean;
}

export const projects: ArchivalProject[] = [
  {
    slug: "pompeii-epigraphy-project",
    title: "The Pompeii Epigraphy Project: Reconstructing Daily Civic Voices in 3D",
    subtitle: "High-resolution RTI and laser surface topology of political graffiti and street electoral tituli.",
    year: "2023 – Present",
    category: "DIGITAL ARCHIVE",
    location: "Pompeii & Herculaneum, Italy",
    coordinates: "40.75°N, 14.48°E",
    image: "/images/classical_statue_dark.jpg",
    overview:
      "A collaborative international field initiative capturing over 1,200 fragile plaster inscriptions, election slogans, and private scribbles across the walls of Pompeii before environmental decay obliterates them.",
    researchQuestion:
      "How did non-elite citizens—tavern keepers, gladiators, and enslaved workers—participate in municipal electoral campaigns and public discourse?",
    methodology:
      "Deploying high-resolution Reflectance Transformation Imaging (RTI), structure-from-motion photogrammetry, and multispectral fluorescence photography on vulnerable external plaster walls during evening low-traffic hours.",
    historicalContext:
      "Before the eruption of Vesuvius in 79 CE, the exterior façades of Pompeian houses served as living billboards for municipal elections, poetry competitions, and gladiatorial announcements.",
    researchFindings: [
      "Identified 47 previously illegible electoral programmata endorsing municipal aedile candidates.",
      "Demonstrated that female guild associations, notably tavern waitresses and wool-weavers, collectively organized public endorsements.",
      "Constructed an open-access 3D digital repository linked to the Pleiades ancient world gazetteer.",
    ],
    gallery: [
      {
        caption: "RTI Surface Scan",
        description: "Surface normal vector map revealing scratched gladiatorial tally marks on tavern stucco.",
      },
      {
        caption: "Regio V Electoral Titulus",
        description: "Red-ochre painted endorsement: 'The tavern workers urge you to elect Lucius Popidius Secundus.'",
      },
      {
        caption: "Night Survey Operations",
        description: "Computational photography rig capturing raking strobe light angles across insulated scaffolding.",
      },
    ],
    timeline: [
      { phase: "Phase I", date: "2023", milestone: "Pilot imaging of Regio V and VI street façades" },
      { phase: "Phase II", date: "2024", milestone: "Deployment of public open-access RTI browser database" },
      { phase: "Phase III", date: "2025–2026", milestone: "Machine learning automated letterform recognition" },
    ],
    relatedPublications: ["bronze-voices-erased-names"],
    collaborators: [
      "Parco Archeologico di Pompei",
      "Oxford e-Research Centre",
      "British School at Rome",
    ],
    featured: true,
  },
  {
    slug: "danubian-frontier-survey",
    title: "Limes Danubii: Fortresses, Coin Hoards & Indigenous Frontiers",
    subtitle: "Archaeological survey and geospatial modeling of legionary supply corridors along the Middle Danube.",
    year: "2021 – 2024",
    category: "EXCAVATION",
    location: "Carnuntum, Austria & Brigetio, Hungary",
    coordinates: "48.11°N, 16.86°E",
    image: "/images/roman_warrior_hero.jpg",
    overview:
      "Ground-penetrating radar and stratigraphic excavation across the military garrison and civilian settlements of Legio XIV Gemina, investigating the trans-frontier exchange of metals, horses, and amber.",
    researchQuestion:
      "How did the Roman military border function as a zone of cultural synthesis rather than an impenetrable barrier?",
    methodology:
      "Magnetometry, LiDAR aerial topography, and isotope analysis of human dental enamel recovered from veteran and civilian cemetery plots.",
    historicalContext:
      "Carnuntum served as Emperor Marcus Aurelius' headquarters during the Marcomannic Wars (170–180 CE), becoming the de facto administrative epicenter of the empire during decades of frontier warfare.",
    researchFindings: [
      "Mapped the full subterranean layout of a civilian amphitheater and craft quarter outside the legionary fortress walls.",
      "Strontium isotope ratios revealed that 34% of soldiers buried along the frontier were recruited from North Africa and Syria.",
      "Documented extensive Germanic pottery workshops inside Roman military extramural settlements.",
    ],
    gallery: [
      {
        caption: "LiDAR Topographic Hillshade",
        description: "Revealing buried ditch systems and marching camp ramparts beneath modern agricultural fields.",
      },
      {
        caption: "Embossed Bronze Scabbard Fitting",
        description: "Recovered legionary scabbard showing Mars Ultor and an imperial eagle.",
      },
      {
        caption: "Excavation Trench 4B",
        description: "Stratigraphic cross-section of a 2nd-century blacksmith's furnace.",
      },
    ],
    timeline: [
      { phase: "Fieldwork I", date: "2021", milestone: "Geophysical survey of 45 hectares at Carnuntum" },
      { phase: "Fieldwork II", date: "2022–2023", milestone: "Stratigraphic testing and coin hoard recovery" },
      { phase: "Monograph", date: "2024", milestone: "Publication of Danubian frontier economic monograph" },
    ],
    relatedPublications: ["marian-reforms-legionary-economy"],
    collaborators: [
      "Austrian Archaeological Institute (ÖAI)",
      "University of Vienna",
      "Hungarian National Museum",
    ],
    featured: true,
  },
  {
    slug: "british-museum-rome-exhibition",
    title: "Legion: Life in the Roman Army (British Museum Curatorial Advisory)",
    subtitle: "Lead academic consultant for the landmark international exhibition at the British Museum.",
    year: "2024",
    category: "MUSEUM EXHIBITION",
    location: "The British Museum, London",
    coordinates: "51.52°N, 0.13°W",
    image: "/images/roman_warrior_hero.jpg",
    overview:
      "A blockbuster international exhibition exploring life in the Roman military machine through the perspective of Claudius Terentianus, an ordinary soldier recruited from Roman Egypt whose private papyrus letters survived.",
    researchQuestion:
      "How can public museum curation bridge scholarly epigraphic research with empathetic public historical understanding?",
    methodology:
      "Curating over 200 rare artifacts loaned from 28 international museums, including the world's only complete surviving Roman legionary scutum shield and personal leather sandals from Vindolanda.",
    historicalContext:
      "The Roman army conquered and garrisoned an empire spanning over two million square miles. Behind the political triumphalism lay the grueling lived reality of disease, separation from family, and precarious frontier service.",
    researchFindings: [
      "Attracted over 320,000 visitors from across the globe, setting new benchmarks for classical history attendance.",
      "Pioneered an empathetic, non-triumphalist narrative centered on enlisted ranks and enslaved support personnel.",
      "Produced an accompanying audio documentary and educational curriculum adopted by secondary schools.",
    ],
    gallery: [
      {
        caption: "The Dura-Europos Scutum",
        description: "The world's only preserved painted Roman wooden shield, loaned from Yale University Art Gallery.",
      },
      {
        caption: "Papyrus Letter of Terentianus",
        description: "Personal plea from an enlisted sailor requesting boots and olive oil from his father.",
      },
      {
        caption: "Exhibition Colonnade Design",
        description: "Dramatic museum lighting recreating the sensory atmosphere of a legionary principia.",
      },
    ],
    timeline: [
      { phase: "Planning", date: "2021–2023", milestone: "International loan negotiation and catalogue authorship" },
      { phase: "Exhibition", date: "Feb – June 2024", milestone: "Public display in London" },
      { phase: "Legacy", date: "2025+", milestone: "Permanent digital educational archive" },
    ],
    relatedPublications: ["the-making-of-an-empire"],
    collaborators: [
      "The British Museum",
      "Yale University Art Gallery",
      "Vindolanda Trust",
    ],
    featured: true,
  },
];
