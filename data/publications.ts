export interface Publication {
  slug: string;
  title: string;
  year: string;
  type: "BOOK" | "ARTICLE" | "CHAPTER" | "REVIEW" | "FORTHCOMING";
  publisher: string;
  bookTitle?: string;
  journal?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  isbn?: string;
  description: string;
  abstract: string;
  researchQuestion: string;
  keyArguments: string[];
  citationBibtex: string;
  relatedThemes: string[];
  pdfUrl?: string;
  featured?: boolean;
}

export const publications: Publication[] = [
  {
    slug: "the-making-of-an-empire",
    title: "THE MAKING OF AN EMPIRE: Bronze, Grain, and the Roman Mediterranean (100 BCE – 200 CE)",
    year: "2026",
    type: "BOOK",
    publisher: "Oxford University Press",
    isbn: "978-0-19-887412-3",
    doi: "10.1093/oso/9780198874123.001.0001",
    description:
      "A groundbreaking monograph examining how imperial fiscal administration, maritime shipping guilds, and bronze legal inscriptions forged the Mediterranean into a coherent economic space.",
    abstract:
      "This study re-evaluates the administrative architecture of the early Roman Empire by examining the physical infrastructure of resource mobilization. Integrating epigraphic corpora with ceramic distribution data from over 240 Mediterranean shipwrecks, the book demonstrates that imperial stability was maintained not through monolithic military coercion, but through fiscal concessions to regional mercantile elites. The volume reconstructs the fiscal networks of the Annona, the grain supply that bound Alexandria, Carthage, and Rome into an interdependent ecological network.",
    researchQuestion:
      "How did Roman imperial institutions balance administrative coercion with market incentives to stabilize food supplies across fragile maritime routes?",
    keyArguments: [
      "The Annona was not a closed state command economy, but a hybrid public-private enterprise relying on subsidized navicularii (merchant shippers).",
      "Bronze epigraphic edicts served as public credit instruments, standardizing weights, measures, and maritime tax waivers.",
      "The economic integration of the Mediterranean was asymmetric, disproportionately draining Egyptian and North African agricultural surpluses toward Italy.",
    ],
    citationBibtex: `@book{vance2026making,
  author = {Vance, Marcus Aurelius},
  title = {The Making of an Empire: Bronze, Grain, and the Roman Mediterranean (100 BCE – 200 CE)},
  publisher = {Oxford University Press},
  address = {Oxford and New York},
  year = {2026},
  isbn = {978-0-19-887412-3}
}`,
    relatedThemes: ["EMPIRE & POWER", "TRADE & MIGRATION", "EPIGRAPHY & ARCHAEOLOGY"],
    pdfUrl: "/docs/sample-chapter-the-making-of-an-empire.pdf",
    featured: true,
  },
  {
    slug: "marian-reforms-legionary-economy",
    title: "The Soldier as Consumer: Military Pay, Coinage Circulation, and Market Formation on the Danubian Frontier",
    year: "2024",
    type: "ARTICLE",
    publisher: "Journal of Roman Studies",
    journal: "Journal of Roman Studies",
    volume: "114",
    pages: "45–82",
    doi: "10.1017/S007543582400018X",
    description:
      "Analyzing coin hoards and canabae (settlement) epigraphy along the Danube to trace how legionary stipends stimulated indigenous commercialization.",
    abstract:
      "By analyzing over 18,000 excavated Roman silver denarii and bronze asses across twelve legionary canabae along the Middle Danube, this article traces the microeconomic velocity of legionary cash pay. Rather than creating isolated garrisons, regular troop wages generated a consumer boom that pulled native Pannonian craftspeople into specialized pottery, glass, and iron production.",
    researchQuestion:
      "Did the presence of Roman frontier legions impoverish or stimulate indigenous frontier economies?",
    keyArguments: [
      "Legionary pay days (tres stipites) injected predictable silver liquidity into regional markets three times annually.",
      "Indigenous Pannonian artisans rapidly adapted Hellenistic and Campanian forms to appeal to soldiers' purchasing power.",
      "Veteran discharge bounties (praemia militiae) catalyzed the founding of permanent civilian municipalities.",
    ],
    citationBibtex: `@article{vance2024soldier,
  author = {Vance, Marcus Aurelius},
  title = {The Soldier as Consumer: Military Pay, Coinage Circulation, and Market Formation on the Danubian Frontier},
  journal = {Journal of Roman Studies},
  volume = {114},
  pages = {45--82},
  year = {2024},
  doi = {10.1017/S007543582400018X}
}`,
    relatedThemes: ["WAR & SOCIETY", "TRADE & MIGRATION"],
    pdfUrl: "/docs/vance-jrs-2024-danubian-frontier.pdf",
    featured: true,
  },
  {
    slug: "bronze-voices-erased-names",
    title: "Bronze Voices, Erased Names: Damnatio Memoriae and Epigraphic Palimpsests in Severan Rome",
    year: "2023",
    type: "ARTICLE",
    publisher: "Journal of Roman Archaeology",
    journal: "Journal of Roman Archaeology",
    volume: "36(2)",
    pages: "312–348",
    doi: "10.1017/jra.2023.74",
    description:
      "Reflectance Transformation Imaging (RTI) analysis of chiselled bronze and marble inscriptions following the murder of Geta in 211 CE.",
    abstract:
      "Following the murder of Emperor Geta by his brother Caracalla, an unprecedented imperial decree ordered the total erasure of Geta's name and likeness across thousands of public monuments. Using advanced 3D surface scanning and RTI, this paper examines forty-two epigraphic palimpsests across Italy and North Africa, revealing that the physical gouges left behind intentionally commemorated the violence of erasure itself.",
    researchQuestion:
      "Was damnatio memoriae intended to make individuals truly forgotten, or to perpetually stage their punishment in stone?",
    keyArguments: [
      "The physical scars left by bronze chisel erasures were deliberate monuments of imperial vengeance, not quiet deletions.",
      "Provincial stonemasons frequently left visible traces of erased titles to signify obedience to the new sovereign.",
      "The practice reveals the emotional power embedded within public municipal writing.",
    ],
    citationBibtex: `@article{vance2023bronze,
  author = {Vance, Marcus Aurelius},
  title = {Bronze Voices, Erased Names: Damnatio Memoriae and Epigraphic Palimpsests in Severan Rome},
  journal = {Journal of Roman Archaeology},
  volume = {36},
  number = {2},
  pages = {312--348},
  year = {2023},
  doi = {10.1017/jra.2023.74}
}`,
    relatedThemes: ["CULTURE & MEMORY", "EPIGRAPHY & ARCHAEOLOGY"],
    featured: true,
  },
  {
    slug: "monumental-patronage-north-africa",
    title: "Civic Benefaction and Olive Wealth: The Epigraphy of Euergetism in Roman Proconsular Africa",
    year: "2022",
    type: "CHAPTER",
    publisher: "Cambridge University Press",
    bookTitle: "Wealth, Status, and Civic Culture in the Roman West",
    pages: "189–224",
    doi: "10.1017/9781108920145.008",
    description:
      "A study of how the agricultural boom in olive oil export funded monumental forums, theater basilicas, and public baths in Roman Tunisia and Algeria.",
    abstract:
      "This chapter analyzes the epigraphy of civic benefaction (euergetism) in Dougga, Thugga, and Bulla Regia. It demonstrates that the proliferation of marble theaters and public baths in 2nd-century North Africa was direct proof of liquid capital accumulation by local olive oil magnates who purchased municipal magistracies.",
    researchQuestion:
      "How did agrarian surplus translate into classical municipal architecture in the Roman Maghreb?",
    keyArguments: [
      "North African civic elites competed through monumental gifts rather than private luxury mansions.",
      "Inscriptions deliberately emphasized donor genealogies spanning Roman and Punic ancestral lines.",
    ],
    citationBibtex: `@incollection{vance2022civic,
  author = {Vance, Marcus Aurelius},
  title = {Civic Benefaction and Olive Wealth: The Epigraphy of Euergetism in Roman Proconsular Africa},
  booktitle = {Wealth, Status, and Civic Culture in the Roman West},
  editor = {Crawford, Michael and Morley, Neville},
  publisher = {Cambridge University Press},
  pages = {189--224},
  year = {2022}
}`,
    relatedThemes: ["EMPIRE & POWER", "TRADE & MIGRATION"],
    featured: false,
  },
  {
    slug: "review-rome-and-the-ocean",
    title: "Review of: 'Rome and the Indian Ocean Trade: The Maritime Networks of the Erythraean Sea'",
    year: "2021",
    type: "REVIEW",
    publisher: "Bryn Mawr Classical Review",
    journal: "Bryn Mawr Classical Review",
    volume: "2021.11.08",
    description:
      "Critical review evaluating recent numismatic and archaeological evidence for Indo-Roman maritime transit through the Red Sea ports of Berenike and Myos Hormos.",
    abstract:
      "A comprehensive review of recent scholarship regarding Mediterranean-Indian ocean transit under the Julio-Claudian emperors, highlighting the importance of the Muziris papyrus.",
    researchQuestion:
      "How did Monsoon navigation impact Roman imperial customs revenue?",
    keyArguments: [
      "The customs tariff of Coptos shows that luxury import taxes accounted for substantial imperial revenue.",
    ],
    citationBibtex: `@article{vance2021review,
  author = {Vance, Marcus Aurelius},
  title = {Review of Rome and the Indian Ocean Trade},
  journal = {Bryn Mawr Classical Review},
  volume = {2021.11.08},
  year = {2021}
}`,
    relatedThemes: ["TRADE & MIGRATION"],
    featured: false,
  },
  {
    slug: "voices-from-the-dust-epigraphy",
    title: "Voices from the Dust: 3D Computational Epigraphy and the Fragmented Inscriptions of the Forum Romanum",
    year: "2027",
    type: "FORTHCOMING",
    publisher: "Cambridge University Press",
    description:
      "Monograph under contract presenting the findings of a decade-long computational photogrammetry and algorithmic reconstitution project in the Roman Forum.",
    abstract:
      "Scheduled for release in late 2026/early 2027, this book details the application of computational surface topography and spectral ink recovery to over 3,000 fragmented inscriptions preserved in the storehouses of the Colosseum and Roman Forum.",
    researchQuestion:
      "Can computational photogrammetry virtually refit broken epigraphic blocks scattered across European museum collections?",
    keyArguments: [
      "Fragmented lapidary archives can be algorithmically reassembled through fracture-geometry matching.",
      "Virtual open-source 3D models allow global democratic re-reading of otherwise inaccessible storehouse artifacts.",
    ],
    citationBibtex: `@book{vance2027voices,
  author = {Vance, Marcus Aurelius},
  title = {Voices from the Dust: 3D Computational Epigraphy and the Fragmented Inscriptions of the Forum Romanum},
  publisher = {Cambridge University Press},
  year = {2027},
  note = {Under contract}
}`,
    relatedThemes: ["EPIGRAPHY & ARCHAEOLOGY", "CULTURE & MEMORY"],
    featured: true,
  },
];
