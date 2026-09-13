export interface CountryHistory {
  id: string;
  name: string;
  ancientName: string;
  capital: string;
  continent: string;
  coordinates: { lat: number; lng: number };
  eraHighlights: {
    ancient: string;
    medieval: string;
    modern: string;
  };
  keyRulers: string[];
  historicalArtifacts: string[];
  overview: string;
  significance: string;
}

export const countryHistories: CountryHistory[] = [
  {
    id: "india",
    name: "India",
    ancientName: "Bharatvarsha / Aryavarta (ଜମ୍ବୁଦ୍ୱୀପ / ଭାରତବର୍ଷ)",
    capital: "New Delhi (Ancient: Pataliputra / Hastinapur / Ujjain)",
    continent: "Asia",
    coordinates: { lat: 20.5937, lng: 78.9629 },
    eraHighlights: {
      ancient:
        "Home to the Indus Valley Civilization (Harappa & Mohenjo-Daro, c. 3300–1300 BCE), the Vedic era, the rise of Buddhism and Jainism, the Maurya Empire under Chandragupta and Ashoka the Great (with the monumental Kalinga War in 261 BCE), and the golden age of arts, mathematics, and astronomy under the Imperial Guptas.",
      medieval:
        "Defined by the Delhi Sultanate, the monumental maritime empire of the Cholas in South India, the architectural zenith of the Mughal Empire under Akbar and Shah Jahan, the legendary Eastern Ganga dynasty of Odisha (builders of the Konark Sun Temple), the Vijayanagara Empire, and the rise of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
      modern:
        "The struggle against British colonial rule, beginning with the 1817 Paika Rebellion of Odisha under Bakshi Jagabandhu, the 1857 Indian Mutiny, the non-violent Satyagraha movement led by Mahatma Gandhi, Netaji Subhas Chandra Bose's Indian National Army, independence in 1947, and the emergence of the world's largest democratic constitutional republic.",
    },
    keyRulers: [
      "Emperor Ashoka the Great (Maurya)",
      "Mahameghavahana Kharavela (Kalinga)",
      "Chandragupta II Vikramaditya (Gupta)",
      "Rajaraja Chola I (Chola)",
      "Langula Narasimhadeva I (Ganga)",
      "Akbar the Great (Mughal)",
      "Chhatrapati Shivaji Maharaj (Maratha)",
    ],
    historicalArtifacts: [
      "Ashoka Pillar & Lion Capital of Sarnath (National Emblem)",
      "Konark Sun Temple Wheels & Architectural Epigraphy",
      "Pashupati Seal of Indus Valley (Mohenjo-Daro)",
      "Iron Pillar of Delhi (Rust-resistant metallurgy)",
      "Brihadisvara Temple Bronze Nataraja Sculptures",
    ],
    overview:
      "India boasts one of humanity's oldest continuous civilizations, with over five millennia of philosophical, architectural, scientific, and spiritual inquiry influencing the entire Asian continent.",
    significance:
      "Birthplace of Hinduism, Buddhism, Jainism, and Sikhism, and pioneer of the zero concept, decimal numeral system, Ayurveda, and classical metallurgy.",
  },
  {
    id: "italy",
    name: "Italy",
    ancientName: "Italia / Roma Aeterna",
    capital: "Rome",
    continent: "Europe",
    coordinates: { lat: 41.8719, lng: 12.5674 },
    eraHighlights: {
      ancient:
        "The Roman Kingdom, Republic, and Empire, which dominated the Mediterranean for centuries. Construction of the Colosseum, the Pantheon, the Roman Forum, and Roman civil law codified in the Corpus Juris Civilis.",
      medieval:
        "The rise of the Papal States, the Maritime Republics of Venice, Genoa, and Pisa, and the brilliant flowering of the Renaissance in Florence under the Medici, Leonardo da Vinci, and Michelangelo.",
      modern:
        "The 19th-century Risorgimento led by Garibaldi and Cavour, national unification in 1861, the 20th-century world wars, and post-war republic establishment.",
    },
    keyRulers: [
      "Julius Caesar (Dictator)",
      "Augustus (First Roman Emperor)",
      "Marcus Aurelius (Philosopher Emperor)",
      "Lorenzo de' Medici (Florence)",
      "Victor Emmanuel II (King of Italy)",
    ],
    historicalArtifacts: [
      "The Colosseum & Roman Forum",
      "Res Gestae Divi Augusti Bronze Inscriptions",
      "Statue of David by Michelangelo",
      "Pompeii Frescoes & Herculaneum Papyrus Scrolls",
    ],
    overview:
      "The historical cradle of Western civil law, Renaissance humanism, Roman engineering, and classical aesthetics.",
    significance:
      "Origin of the Latin alphabet, Roman legal traditions, and classical architecture spanning three continents.",
  },
  {
    id: "greece",
    name: "Greece",
    ancientName: "Hellas (Ἑλλάς)",
    capital: "Athens",
    continent: "Europe",
    coordinates: { lat: 39.0742, lng: 21.8243 },
    eraHighlights: {
      ancient:
        "Minoan and Mycenaean civilizations, the Classical Golden Age of Athens (democracy, Socrates, Plato, Aristotle), the Persian Wars, and Alexander the Great's Hellenistic empire spreading Greek culture from Egypt to the Indus River.",
      medieval:
        "The core heartland of the Byzantine Empire (Eastern Roman Empire), centered in Constantinople, preserving classical Greek philosophy, literature, and Orthodox Christian art.",
      modern:
        "The Greek War of Independence against the Ottoman Empire (1821), European philhellenism, and modern democratic state consolidation.",
    },
    keyRulers: [
      "Pericles (Athenian Statesman)",
      "Alexander the Great (Macedon)",
      "Leonidas I (Sparta)",
      "Emperor Basil II (Byzantine)",
    ],
    historicalArtifacts: [
      "The Parthenon on the Acropolis",
      "Antikythera Mechanism (First analog computer)",
      "Delphi Charioteer Bronze Sculpture",
      "Mask of Agamemnon (Mycenae)",
    ],
    overview:
      "The philosophical and democratic origin of Western intellectual traditions, drama, mathematics, and Olympic ideals.",
    significance:
      "Invention of Athenian direct democracy, Euclidean geometry, Socratic inquiry, and theatrical tragedy.",
  },
  {
    id: "egypt",
    name: "Egypt",
    ancientName: "Kemet (The Black Land)",
    capital: "Cairo (Ancient: Memphis / Thebes / Alexandria)",
    continent: "Africa",
    coordinates: { lat: 26.8206, lng: 30.8025 },
    eraHighlights: {
      ancient:
        "Old, Middle, and New Kingdoms along the fertile Nile River. Construction of the Great Pyramids of Giza, the Sphinx, Karnak Temple, the Valley of the Kings, and the Ptolemaic dynasty ending with Cleopatra VII.",
      medieval:
        "Islamic conquest, Cairo founded as the Fatimid and Mamluk capital, the defense against the Crusades under Saladin, and Al-Azhar University as an Islamic scholastic center.",
      modern:
        "Muhammad Ali Pasha's modernization, the building of the Suez Canal (1869), the discovery of Tutankhamun's tomb by Howard Carter (1922), and independence as a modern Arab republic.",
    },
    keyRulers: [
      "Khufu (Cheops - Great Pyramid)",
      "Hatshepsut (Female Pharaoh)",
      "Ramesses II the Great",
      "Cleopatra VII Philopator",
      "Saladin (Sultan of Egypt & Syria)",
    ],
    historicalArtifacts: [
      "The Great Pyramids of Giza & Sphinx",
      "Rosetta Stone (Key to deciphering Hieroglyphics)",
      "Gold Death Mask of Tutankhamun",
      "Bust of Nefertiti",
    ],
    overview:
      "A civilization flourishing for over three millennia along the Nile, famous for monumental stone architecture, hieroglyphic literature, and papyrology.",
    significance:
      "Monumental architecture, solar calendars, papyrus writing medium, and early medical and embalming sciences.",
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    ancientName: "Britannia / Albion",
    capital: "London",
    continent: "Europe",
    coordinates: { lat: 55.3781, lng: -3.4360 },
    eraHighlights: {
      ancient:
        "Prehistoric megaliths of Stonehenge, Celtic tribal kingdoms, Roman invasion under Claudius (43 CE), and the building of Hadrian's Wall across the northern frontier.",
      medieval:
        "Anglo-Saxon heptarchy, Viking raids, the 1066 Norman Conquest by William the Conqueror, signing of the Magna Carta (1215), and the Hundred Years' War.",
      modern:
        "The Tudor & Elizabethan Golden Age, Industrial Revolution beginning in the 18th century, the British Empire becoming a global maritime power, and modern parliamentary democracy.",
    },
    keyRulers: [
      "Queen Boudica (Iceni)",
      "King Alfred the Great",
      "William the Conqueror",
      "Queen Elizabeth I",
      "Winston Churchill",
    ],
    historicalArtifacts: [
      "Stonehenge Megaliths (c. 3000 BCE)",
      "Vindolanda Roman Ink Writing Tablets",
      "Magna Carta (1215 Document)",
      "Sutton Hoo Anglo-Saxon Helmet",
    ],
    overview:
      "An island nation whose common law legal system, scientific societies (Royal Society), industrial technologies, and Shakespearean literature shaped world history.",
    significance:
      "Birthplace of the Industrial Revolution, the steam engine, constitutional parliamentary monarchy, and modern global maritime navigation.",
  },
  {
    id: "france",
    name: "France",
    ancientName: "Gallia (Gaul)",
    capital: "Paris",
    continent: "Europe",
    coordinates: { lat: 46.2276, lng: 2.2137 },
    eraHighlights: {
      ancient:
        "Gallic Celtic tribes united under Vercingetorix against Julius Caesar's Gallic Wars (58–50 BCE), leading to Gallo-Roman urban centers like Lugdunum (Lyon) and Nemausus (Nîmes).",
      medieval:
        "The Frankish Empire of Charlemagne (crowned Emperor in 800 CE), Gothic cathedral architecture (Notre-Dame de Paris, Chartres), and the Capetian monarchy.",
      modern:
        "The Age of Enlightenment (Voltaire, Rousseau), the French Revolution (1789) establishing the Declaration of the Rights of Man, the Napoleonic Code, and three modern Republics.",
    },
    keyRulers: [
      "Vercingetorix (Chieftain of the Arverni)",
      "Charlemagne (Holy Roman Emperor)",
      "Louis XIV (The Sun King)",
      "Napoleon Bonaparte (Emperor)",
    ],
    historicalArtifacts: [
      "Pont du Gard Roman Aqueduct",
      "Bayeux Tapestry",
      "Palace of Versailles Hall of Mirrors",
      "Declaration of the Rights of Man and of the Citizen",
    ],
    overview:
      "A core pillar of European culture, literature, gastronomy, and political philosophy that pioneered liberty, equality, and fraternity.",
    significance:
      "Universal human rights doctrine, Napoleonic Civil Law Code, and Gothic stone masonry.",
  },
  {
    id: "china",
    name: "China",
    ancientName: "Zhongguo (The Middle Kingdom / 華夏)",
    capital: "Beijing (Ancient: Chang'an / Luoyang)",
    continent: "Asia",
    coordinates: { lat: 35.8617, lng: 104.1954 },
    eraHighlights: {
      ancient:
        "Yellow River civilization, the Shang and Zhou dynasties, the Warring States period, Confucius and Laozi, and the unification of China under Qin Shi Huang (first Emperor, builder of the Great Wall and Terracotta Army), followed by the Han Dynasty opening the Silk Road.",
      medieval:
        "The Tang Dynasty golden age of poetry and cosmopolitan trade, the Song Dynasty inventing moveable type print, paper money, and the compass, and the Ming Dynasty constructing the Forbidden City.",
      modern:
        "The Qing Dynasty, the 1911 Xinhai Revolution overthrowing 2,000 years of imperial rule, modern economic modernization, and global scientific leadership.",
    },
    keyRulers: [
      "Qin Shi Huang (First Emperor of China)",
      "Emperor Wu of Han",
      "Empress Wu Zetian (Tang)",
      "Kangxi Emperor (Qing)",
    ],
    historicalArtifacts: [
      "The Terracotta Army of Xi'an",
      "The Great Wall of China",
      "The Forbidden City, Beijing",
      "Shang Dynasty Oracle Bone Inscriptions",
    ],
    overview:
      "One of the longest unbroken written cultural traditions in the world, renowned for the Four Great Inventions: paper, printing, gunpowder, and the compass.",
    significance:
      "Invention of paper making, woodblock printing, silk trade networks, and Confucian civil service examinations.",
  },
];
