export interface ResearchArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  inquiryQuestions: string[];
  keyThemes: string[];
  era: string;
  location: string;
}

export const researchAreas: ResearchArea[] = [
  {
    id: "empire-power",
    number: "01",
    title: "EMPIRE & POWER",
    subtitle: "Administrative Logistics and Imperial Hegemony",
    description:
      "Investigating the fiscal and logistical machinery of Roman imperial authority. How did a city of one million sustain dominion over fifty million subjects across three continents without modern telecommunications?",
    inquiryQuestions: [
      "To what extent did provincial elites exercise agency in shaping imperial edicts?",
      "How did grain requisition and maritime logistics structure provincial economies?",
      "What administrative mechanisms allowed the Roman tax apparatus to endure succession crises?",
    ],
    keyThemes: ["Imperial Bureaucracy", "Annona Grain Supply", "Fiscal Taxation", "Provincial Governors"],
    era: "100 BCE – 300 CE",
    location: "Rome, Ravenna, Ostia Antica",
  },
  {
    id: "war-society",
    number: "02",
    title: "WAR & SOCIETY",
    subtitle: "Lived Experience of the Legionary Frontiers",
    description:
      "Beyond battlefield tactics, the Roman military was the empire's largest employer, cultural transmitter, and technological engine. We examine soldiers as economic actors, fathers, and cultural brokers along contested frontiers.",
    inquiryQuestions: [
      "How did legionary pay spur local manufacturing along the Rhine and Danube?",
      "What were the legal and social conditions of camp followers and informal families?",
      "How did veteran colonial settlements transform indigenous agrarian landscapes?",
    ],
    keyThemes: ["Legionary Logistics", "Frontier Fortresses (Limes)", "Veterans & Land Grants", "Auxiliary Recruitment"],
    era: "200 BCE – 400 CE",
    location: "Danube, Rhine Frontier, Hadrian's Wall",
  },
  {
    id: "culture-memory",
    number: "03",
    title: "CULTURE & MEMORY",
    subtitle: "Civic Monuments, Memory Sanctions & Epigraphy",
    description:
      "Examining how ancient communities commemorated triumph, memorialized deceased kin, and deliberately erased disgraced rulers (damnatio memoriae) from public monuments and bronze inscriptions.",
    inquiryQuestions: [
      "What role did public bronze inscriptions play in shaping collective civic memory?",
      "How did the erasure of names on stone affect local political legitimacy?",
      "In what ways did provincial cities reinterpret Greek classical motifs for Roman audiences?",
    ],
    keyThemes: ["Epigraphic Culture", "Damnatio Memoriae", "Funerary Stelae", "Civic Honorifics"],
    era: "300 BCE – 500 CE",
    location: "Athens, Ephesus, Aphrodisias",
  },
  {
    id: "trade-migration",
    number: "04",
    title: "TRADE & MIGRATION",
    subtitle: "Maritime Networks, Amphorae & Human Mobility",
    description:
      "Tracing the movement of goods, enslavement, and free merchant diasporas across the Mediterranean basin. Shipwreck cargo analysis, lead isotopic tracing, and ceramic petrography provide physical evidence of interconnected markets.",
    inquiryQuestions: [
      "How integrated were regional price mechanisms across the Mediterranean?",
      "What was the scale of maritime transport during the Roman Climatic Optimum?",
      "How did merchant collegia manage credit and maritime insurance?",
    ],
    keyThemes: ["Maritime Shipwrecks", "Dressel 20 Amphorae", "Merchant Guilds (Collegia)", "Portus & Alexandria"],
    era: "200 BCE – 300 CE",
    location: "Mediterranean Basin, Alexandria, Carthage",
  },
  {
    id: "epigraphy-archaeology",
    number: "05",
    title: "EPIGRAPHY & ARCHAEOLOGY",
    subtitle: "Digital Archiving and Material Epistemic Recovery",
    description:
      "Fusing traditional epigraphic squeezes and Latin paleography with 3D photogrammetry, multi-spectral imaging, and machine learning transcription for damaged stone, bronze, and papyrus documents.",
    inquiryQuestions: [
      "How can Reflectance Transformation Imaging (RTI) recover eroded inscription fragments?",
      "What are the ethical implications of 3D photogrammetric digitization of contested antiquities?",
      "How can open-access linked data unite dispersed museum epigraphic collections?",
    ],
    keyThemes: ["3D Photogrammetry", "Epigraphic RTI", "Latin Paleography", "Open Linked Data"],
    era: "Ancient & Modern Archival Practice",
    location: "Oxford, Rome, British Museum",
  },
];
