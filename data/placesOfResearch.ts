export interface ResearchPlace {
  id: string;
  name: string;
  ancientName: string;
  modernCountry: string;
  coordinates: {
    lat: number;
    lng: number;
    formatted: string;
  };
  period: string;
  relevance: string;
  relatedPublicationSlug?: string;
  relatedProjectSlug?: string;
  svgPos: { x: number; y: number }; // For interactive map positioning
}

export const placesOfResearch: ResearchPlace[] = [
  {
    id: "konark",
    name: "Konark Sun Temple",
    ancientName: "Arka Kshetra / Konaditya",
    modernCountry: "Puri, Odisha, India",
    coordinates: {
      lat: 19.8876,
      lng: 86.0945,
      formatted: "19°53′N 86°05′E",
    },
    period: "13th c. CE (1250 CE)",
    relevance: "Monumental stone chariot architecture with 24 carved solar wheels, erotic sculpture, and ancient maritime beacon on the Bay of Bengal.",
    relatedPublicationSlug: "eastern-ganga-maritime-heritage",
    relatedProjectSlug: "kalinga-epigraphy-project",
    svgPos: { x: 62, y: 56 },
  },
  {
    id: "dhauli",
    name: "Dhauli & Toshali",
    ancientName: "Tosali / Kalinga Nagar",
    modernCountry: "Bhubaneswar, Odisha, India",
    coordinates: {
      lat: 20.1923,
      lng: 85.8395,
      formatted: "20°11′N 85°50′E",
    },
    period: "3rd c. BCE (261 BCE)",
    relevance: "Primary rock edicts of Emperor Ashoka inscribed in Prakrit-Brahmi script following the transformative Kalinga War, with rock-cut elephant protome.",
    relatedPublicationSlug: "ashokan-edicts-and-kalinga",
    relatedProjectSlug: "kalinga-epigraphy-project",
    svgPos: { x: 61, y: 54 },
  },
  {
    id: "udayagiri-khandagiri",
    name: "Udayagiri & Khandagiri Caves",
    ancientName: "Kumari Parvata",
    modernCountry: "Bhubaneswar, Odisha, India",
    coordinates: {
      lat: 20.2631,
      lng: 85.7855,
      formatted: "20°15′N 85°47′E",
    },
    period: "1st c. BCE",
    relevance: "17-line Hathigumpha Brahmi inscription of Emperor Kharavela recording his 13-year military campaigns, Jain monastic cells, and Rani Gumpha friezes.",
    relatedPublicationSlug: "kharavela-hathigumpha-inscription",
    relatedProjectSlug: "kalinga-epigraphy-project",
    svgPos: { x: 60, y: 53 },
  },
  {
    id: "puri-sriksetra",
    name: "Puri Jagannath Temple",
    ancientName: "Purushottama Kshetra / Srikshetra",
    modernCountry: "Puri, Odisha, India",
    coordinates: {
      lat: 19.8049,
      lng: 85.8179,
      formatted: "19°48′N 85°49′E",
    },
    period: "12th c. CE (1161 CE)",
    relevance: "214-foot Rekha Deula sanctum, Madala Panji temple chronicle repository, and spiritual hub of syncretic tribal-Vedic Jagannath culture.",
    relatedPublicationSlug: "jagannath-culture-and-odisha-chronicles",
    relatedProjectSlug: "kalinga-epigraphy-project",
    svgPos: { x: 61, y: 58 },
  },
  {
    id: "lothal",
    name: "Lothal Indus Port",
    ancientName: "Lothal (Indus Port)",
    modernCountry: "Gujarat, India",
    coordinates: {
      lat: 22.5218,
      lng: 72.2494,
      formatted: "22°31′N 72°14′E",
    },
    period: "2400 BCE – 1900 BCE",
    relevance: "World's oldest engineered tidal dockyard connecting Bronze Age Harappan merchants with Mesopotamian and Persian Gulf maritime trade routes.",
    relatedPublicationSlug: "indus-valley-trade-networks",
    relatedProjectSlug: "indus-civilization-survey",
    svgPos: { x: 38, y: 48 },
  },
  {
    id: "dholavira",
    name: "Dholavira",
    ancientName: "Kotada Timba",
    modernCountry: "Kutch, Gujarat, India",
    coordinates: {
      lat: 23.8868,
      lng: 70.2173,
      formatted: "23°53′N 70°13′E",
    },
    period: "2600 BCE – 1900 BCE",
    relevance: "UNESCO World Heritage Indus metropolis featuring stepped rock-cut water reservoirs, tri-partite fortified layout, and 10-character Indus signboard.",
    relatedPublicationSlug: "dholavira-hydraulic-engineering",
    relatedProjectSlug: "indus-civilization-survey",
    svgPos: { x: 36, y: 44 },
  },
  {
    id: "hampi",
    name: "Hampi & Vijayanagara",
    ancientName: "Pampa Kshetra / Vijayanagara",
    modernCountry: "Karnataka, India",
    coordinates: {
      lat: 15.3350,
      lng: 76.4600,
      formatted: "15°20′N 76°27′E",
    },
    period: "1336 CE – 1646 CE",
    relevance: "Imperial capital of Krishnadevaraya; monolithic Stone Chariot, musical pillared mandapas of Vittala Temple, and Tungabhadra riverfront fortifications.",
    relatedPublicationSlug: "vijayanagara-architecture-and-trade",
    relatedProjectSlug: "deccan-heritage-survey",
    svgPos: { x: 44, y: 70 },
  },
  {
    id: "nalanda",
    name: "Nalanda Mahavihara",
    ancientName: "Nalanda Mahavihara",
    modernCountry: "Bihar, India",
    coordinates: {
      lat: 25.1357,
      lng: 85.4450,
      formatted: "25°08′N 85°26′E",
    },
    period: "5th c. – 12th c. CE",
    relevance: "Ancient world's leading residential university with Dharmaganja library, monastic dormitories, and bronze metallurgy casting studios.",
    relatedPublicationSlug: "nalanda-and-buddhist-scholasticism",
    relatedProjectSlug: "gangetic-archaeology-project",
    svgPos: { x: 58, y: 39 },
  },
  {
    id: "thanjavur",
    name: "Thanjavur Brihadisvara",
    ancientName: "Thanjapuri",
    modernCountry: "Tamil Nadu, India",
    coordinates: {
      lat: 10.7828,
      lng: 79.1318,
      formatted: "10°46′N 79°07′E",
    },
    period: "1010 CE (Chola Empire)",
    relevance: "Monumental granite temple built by Rajaraja Chola I with an 80-tonne monolithic cupola and detailed Tamil epigraphs of imperial naval expeditions.",
    relatedPublicationSlug: "chola-maritime-expeditions-and-temples",
    relatedProjectSlug: "south-indian-epigraphy-project",
    svgPos: { x: 48, y: 82 },
  },
  {
    id: "ajanta-ellora",
    name: "Ajanta & Ellora Caves",
    ancientName: "Ajanta & Verul",
    modernCountry: "Maharashtra, India",
    coordinates: {
      lat: 20.5519,
      lng: 75.7033,
      formatted: "20°33′N 75°42′E",
    },
    period: "2nd c. BCE – 10th c. CE",
    relevance: "30 rock-cut Buddhist caves with classical tempera murals, alongside the monolithic Kailash Temple carved top-down from a single basalt cliff.",
    relatedPublicationSlug: "rock-cut-cave-architecture-of-india",
    relatedProjectSlug: "deccan-heritage-survey",
    svgPos: { x: 43, y: 52 },
  },
  {
    id: "sanchi",
    name: "Great Stupa of Sanchi",
    ancientName: "Kakanaya / Cetiyagiri",
    modernCountry: "Madhya Pradesh, India",
    coordinates: {
      lat: 23.4795,
      lng: 77.7397,
      formatted: "23°28′N 77°44′E",
    },
    period: "3rd c. BCE – 1st c. CE",
    relevance: "Hemispherical Buddhist dome with four elaborately sculpted torana gateways depicting Jataka tales, early floral motifs, and Ashokan pillars.",
    relatedPublicationSlug: "sanchi-stupas-and-early-buddhist-art",
    relatedProjectSlug: "gangetic-archaeology-project",
    svgPos: { x: 47, y: 43 },
  },
  {
    id: "rakhigarhi",
    name: "Rakhigarhi Excavation Site",
    ancientName: "Rakhigarhi (Ghaggar Valley)",
    modernCountry: "Haryana, India",
    coordinates: {
      lat: 29.2889,
      lng: 76.1186,
      formatted: "29°17′N 76°07′E",
    },
    period: "2600 BCE – 1900 BCE",
    relevance: "Largest Indus Valley civilization site spanning 350+ hectares; paved baked-brick roads, advanced drainage, granaries, and ancient DNA studies.",
    relatedPublicationSlug: "rakhigarhi-and-indus-origins",
    relatedProjectSlug: "indus-civilization-survey",
    svgPos: { x: 42, y: 28 },
  },
];
