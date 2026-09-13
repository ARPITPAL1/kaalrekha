export interface TimelineEra {
  id: string;
  year: string;
  label: string;
  period: string;
  headline: string;
  description: string;
  primaryArtifact: string;
  researchLink: string;
  coordinates: string;
  keyEvents: string[];
}

export const timelineEvents: TimelineEra[] = [
  {
    id: "era-300-bce",
    year: "300 BCE",
    label: "300 BCE",
    period: "Early Republic & Samnite Wars",
    headline: "The Paving of the Appian Way & Mediterranean Awakenings",
    description:
      "Rome emerges from Latium through road infrastructure and military alliances. The Via Appia connects Rome to Capua, establishing the physical conduits of rapid troop movement and grain transport.",
    primaryArtifact: "Miliarium (Roman Milestone I, Via Appia)",
    researchLink: "/research",
    coordinates: "41.85°N, 12.54°E",
    keyEvents: [
      "312 BCE: Censorship of Appius Claudius Caecus",
      "Construction of the Aqua Appia (first Roman aqueduct)",
      "Standardization of the early bronze aes signatum coinage",
    ],
  },
  {
    id: "era-100-bce",
    year: "100 BCE",
    label: "100 BCE",
    period: "Late Republic & The Marian Reforms",
    headline: "The Professionalization of the Roman Legion",
    description:
      "Gaius Marius abolishes landownership requirements for legionaries. The legionary becomes a state-equipped professional warrior carrying standardized weapons (pilum, gladius) and imperial ambitions.",
    primaryArtifact: "Bronze Montefortino Helmet & Legionary Pilum",
    researchLink: "/publications/marian-reforms-legionary-economy",
    coordinates: "41.89°N, 12.49°E",
    keyEvents: [
      "107 BCE: Marian Military Reforms enact standing volunteer legions",
      "Birth of Julius Caesar (100 BCE)",
      "The Social War (91–87 BCE) and universal Roman citizenship in Italy",
    ],
  },
  {
    id: "era-1-ce",
    year: "1 CE",
    label: "1 CE",
    period: "Augustan Principate & Pax Romana",
    headline: "Marble, Inscriptions, and the Ideology of Universal Peace",
    description:
      "Augustus transforms Rome from a city of brick into marble. The Res Gestae Divi Augusti is engraved across bronze tablets and provincial temple walls from Rome to Ancyra (modern Ankara).",
    primaryArtifact: "Monumentum Ancyranum (Res Gestae Inscriptions)",
    researchLink: "/publications/the-making-of-an-empire",
    coordinates: "39.94°N, 32.86°E",
    keyEvents: [
      "27 BCE: Octavian receives the title Augustus",
      "Dedication of the Forum of Augustus and Temple of Mars Ultor (2 BCE)",
      "Consolidation of the Praetorian Guard and Mediterranean naval fleets",
    ],
  },
  {
    id: "era-200-ce",
    year: "200 CE",
    label: "200 CE",
    period: "Severan Dynasty & Universal Citizenship",
    headline: "The Antonine Constitution & Mediterranean Integration",
    description:
      "Emperor Caracalla issues the Constitutio Antoniniana (212 CE), granting Roman citizenship to all free men across the empire. North African and Syrian elites rise to supreme imperial command.",
    primaryArtifact: "Constitutio Antoniniana Papyrus (P.Giss. 40)",
    researchLink: "/projects/pompeii-epigraphy-project",
    coordinates: "32.63°N, 14.29°E (Leptis Magna)",
    keyEvents: [
      "193–211 CE: Reign of Septimius Severus (born in Leptis Magna, Libya)",
      "212 CE: Universal citizenship edict transforms civil jurisprudence",
      "Expansion of public bath complexes (Baths of Caracalla)",
    ],
  },
  {
    id: "era-600-ce",
    year: "600 CE",
    label: "600 CE",
    period: "Late Antiquity & The Byzantine Mediterranean",
    headline: "Ravenna, Constantinople & the Shifting Imperial Axis",
    description:
      "The Western administrative capital consolidates at Ravenna while Constantinople anchors eastern Mediterranean law under the Corpus Juris Civilis of Justinian.",
    primaryArtifact: "Mosaic Panel of Emperor Justinian (Basilica of San Vitale)",
    researchLink: "/research",
    coordinates: "44.42°N, 12.19°E",
    keyEvents: [
      "534 CE: Promulgation of Justinian's legal codification",
      "Transformation of classical civic basilicas into Christian monuments",
      "Reorientation of Mediterranean maritime grain fleets to Constantinople",
    ],
  },
  {
    id: "era-1500-ce",
    year: "1500 CE",
    label: "1500 CE",
    period: "Renaissance Humanism & Antiquarian Discovery",
    headline: "The Rediscovery of Classical Epigraphy & Statuary",
    description:
      "Humanist scholars excavate the Roman Forum, unearthing the Laocoön (1506) and transcribing bronze Roman legal tablets for early European print culture.",
    primaryArtifact: "Excavation of the Laocoön and His Sons (1506 CE)",
    researchLink: "/projects/danubian-frontier-survey",
    coordinates: "41.90°N, 12.45°E",
    keyEvents: [
      "Establishment of the Vatican Museums and Capitoline collections",
      "Publication of the first Renaissance epigraphic corpus (Inscriptiones Antiquae)",
      "Systematic architectural surveying of the Colosseum and Pantheon",
    ],
  },
  {
    id: "era-present",
    year: "TODAY",
    label: "TODAY",
    period: "Digital Humanities & The Living Archive",
    headline: "3D Photogrammetry, Multispectral Imaging & Public Scholarship",
    description:
      "Modern computational archaeology reconstructs fragmented papyri, tracks illicit antiquities markets, and democratizes Mediterranean scholarship through digital open-access archives.",
    primaryArtifact: "3D Digital Epigraphic Corpus & Spatial LiDAR Maps",
    researchLink: "/projects",
    coordinates: "51.75°N, 1.25°W (Oxford)",
    keyEvents: [
      "Global open-access epigraphic linked data initiatives",
      "Machine learning restoration of damaged ancient Greek and Latin inscriptions",
      "Decolonizing classical museum collections and provenance research",
    ],
  },
];
