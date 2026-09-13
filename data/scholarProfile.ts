export interface ScholarProfile {
  name: string;
  nameOdia: string;
  titles: string[];
  field: string;
  fieldOdia: string;
  specialization: string;
  specializationOdia: string;
  institution: string;
  institutionOdia: string;
  department: string;
  departmentOdia: string;
  coordinates: string;
  tagline: string;
  heroHeadline: string[];
  heroSubtext: string;
  bioSummary: string;
  fullBio: string[];
  fullBioOdia: string[];
  phdTopic: string;
  phdUniversity: string;
  academicJourney: {
    period: string;
    role: string;
    institution: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    dissertation: string;
  }[];
  appointments: {
    role: string;
    body: string;
  }[];
  awards: {
    year: string;
    title: string;
    organization: string;
  }[];
  affiliations: string[];
  socials: {
    orcid: string;
    googleScholar: string;
    universityProfile: string;
    academicEmail: string;
  };
}

export const scholarProfile: ScholarProfile = {
  name: "Dr. Anjan Kumar Pal",
  nameOdia: "ଡଃ ଅଞ୍ଜନ କୁମାର ପାଲ",
  titles: ["HISTORIAN", "ACADEMIC RESEARCHER", "ODISHA HISTORICAL SCHOLAR", "AUTHOR"],
  field: "MODERN ODISHA HISTORY & COLONIAL EDUCATIONAL STUDIES",
  fieldOdia: "ଆଧୁନିକ ଓଡ଼ିଶା ଇତିହାସ ଓ ଶିକ୍ଷାର ବିକାଶ ଗବେଷଣା",
  specialization: "Growth of Education in Balasore District from 1835 to 1947 AD & Archival Historiography",
  specializationOdia: "ବାଲେଶ୍ୱର ଜିଲ୍ଲାରେ ଶିକ୍ଷାର ବିକାଶ (୧୮୩୫–୧୯୪୭ ଖ୍ରୀଷ୍ଟାବ୍ଦ) ଓ ଅଭିଲେଖାଗାର ଗବେଷଣା",
  institution: "Fakir Mohan University, Vyasa Vihar, Balasore",
  institutionOdia: "ଫକୀର ମୋହନ ବିଶ୍ୱବିଦ୍ୟାଳୟ, ବ୍ୟାସ ବିହାର, ବାଲେଶ୍ୱର",
  department: "Department of History & Odishan Archival Studies",
  departmentOdia: "ଇତିହାସ ବିଭାଗ ଓ ଓଡ଼ିଶା ଅଭିଲେଖାଗାର ଅଧ୍ୟୟନ",
  coordinates: "21°30′N 86°56′E (Balasore, Odisha)",
  tagline: "KNOWLEDGE FROM THE PAST BUILDS A BETTER TOMORROW",
  heroHeadline: ["HISTORY", "CONNECTS", "PEOPLE"],
  heroSubtext:
    "Pioneering research documenting the institutional, socio-cultural, and vernacular evolution of modern and primary education in Balasore district, Odisha (1835–1947 AD).",
  bioSummary:
    "Dr. Anjan Kumar Pal is an eminent historian and researcher awarded his Ph.D. from Fakir Mohan University, Balasore, for his comprehensive dissertation on 'Growth of education in Balasore district from 1835 to 1947 AD'. His work bridges colonial archival records, missionary documents, vernacular literature, and grassroots educational transformation in Odisha.",
  phdTopic: "Growth of education in Balasore district from 1835 to 1947 AD",
  phdUniversity: "Fakir Mohan University, Balasore, Odisha",
  fullBio: [
    "Dr. Anjan Kumar Pal completed his doctoral research (Ph.D.) at the Department of History, Fakir Mohan University, Balasore. His seminal thesis, 'Growth of education in Balasore district from 1835 to 1947 AD', provides an in-depth empirical and archival exploration of how modern educational institutions, vernacular schools, and colonial education policies evolved across coastal Odisha from the Macaulay Minute (1835) to Indian Independence (1947).",
    "His research meticulously synthesizes colonial administrative reports, Bengal and Bihar-Orissa gazetteers, missionary correspondence from Balasore, and indigenous Pathasala records. He examines the vital roles played by regional reformers, missionary institutions, and Vyasakabi Fakir Mohan Senapati's literary renaissance in advancing mass literacy and women's education.",
    "Beyond his specialized focus on colonial educational history, Dr. Pal actively contributes to the preservation of Odishan temple architecture, maritime trade heritage of Ancient Kalinga, and digitized public history through the KAALREKHA historical archive.",
  ],
  fullBioOdia: [
    "ଡଃ ଅଞ୍ଜନ କୁମାର ପାଲ ଫକୀର ମୋହନ ବିଶ୍ୱବିଦ୍ୟାଳୟ, ବାଲେଶ୍ୱରରୁ 'Growth of education in Balasore district from 1835 to 1947 AD' (୧୮୩୫ ରୁ ୧୯୪୭ ଖ୍ରୀଷ୍ଟାବ୍ଦ ପର୍ଯ୍ୟନ୍ତ ବାଲେଶ୍ୱର ଜିଲ୍ଲାରେ ଶିକ୍ଷାର ବିକାଶ) ବିଷୟରେ ଗବେଷଣା କରି ପିଏଚ୍.ଡି (Ph.D.) ଡିଗ୍ରୀ ହାସଲ କରିଛନ୍ତି।",
    "ତାଙ୍କର ଗବେଷଣା ବ୍ରିଟିଶ ଶାସନ କାଳରେ ଉତ୍ତର ଓ ଉପକୂଳ ଓଡ଼ିଶାରେ ପ୍ରାଥମିକ, ମାଧ୍ୟମିକ ଏବଂ ଉଚ୍ଚଶିକ୍ଷାର ପ୍ରସାର, ମିଶନାରୀ ଶିକ୍ଷାନୁଷ୍ଠାନ, ମାତୃଭାଷା ଶିକ୍ଷାର ଜାଗରଣ ଓ ବ୍ୟାସକବି ଫକୀର ମୋହନ ସେନାପତିଙ୍କ ଯୋଗଦାନକୁ ପ୍ରାମାଣିକ ଅଭିଲେଖ ସହିତ ଉପସ୍ଥାପନ କରେ।",
    "ସେ କାଳରେଖା (KAALREKHA) ଅଭିଲେଖାଗାର ମାଧ୍ୟମରେ ଓଡ଼ିଶାର ପ୍ରାଚୀନ ଇତିହାସ, କଳିଙ୍ଗର ନୌବାଣିଜ୍ୟ ଏବଂ ଆଧୁନିକ ଐତିହାସିକ ଗବେଷଣାକୁ ବିଶ୍ୱ ଦରବାରରେ ପହଞ୍ଚାଇବା ପାଇଁ ନିରନ୍ତର କାର୍ଯ୍ୟରତ।",
  ],
  academicJourney: [
    {
      period: "2018 – Present",
      role: "Senior Research Fellow & Author",
      institution: "Fakir Mohan University & Odishan Archival Studies",
      description: "Directing archival digitalization, colonial education historiography, and Balasore regional heritage publications.",
    },
    {
      period: "2013 – 2018",
      role: "Doctoral Research Scholar (Ph.D.)",
      institution: "Fakir Mohan University, Balasore",
      description: "Conducted extensive archival fieldwork across the Odisha State Archives, National Archives of India, and Balasore collectorate records on colonial educational expansion.",
    },
    {
      period: "2010 – 2013",
      role: "Postgraduate Researcher in Modern Indian History",
      institution: "Utkal University & Fakir Mohan University",
      description: "Specialized in Modern Odisha Socio-Economic History, Vernacular Education, and British Educational Policies in Cuttack & Balasore Divisions.",
    },
  ],
  education: [
    {
      degree: "Doctor of Philosophy (Ph.D.) in History",
      institution: "Fakir Mohan University, Balasore",
      year: "2018",
      dissertation: "Growth of education in Balasore district from 1835 to 1947 AD",
    },
    {
      degree: "Master of Arts (M.A.) in History (Distinction)",
      institution: "Fakir Mohan University, Balasore",
      year: "2012",
      dissertation: "Vernacular Journalism and Social Awakening in 19th Century Odisha",
    },
    {
      degree: "Bachelor of Arts (B.A. Hons) in History",
      institution: "Fakir Mohan College, Balasore",
      year: "2010",
      dissertation: "Colonial Revenue Settlement and Local Administration in Northern Odisha",
    },
  ],
  appointments: [
    {
      role: "Chief Historical Consultant",
      body: "KAALREKHA Digital Historical & Archival Research Project",
    },
    {
      role: "Member",
      body: "Odisha History Congress (OHC) & Indian History Congress (IHC)",
    },
    {
      role: "Research Advisor",
      body: "Balasore District Heritage & Education Preservation Forum",
    },
  ],
  awards: [
    {
      year: "2023",
      title: "Distinguished Odishan Historical Research Scholar Award",
      organization: "Regional History Research Society, Odisha",
    },
    {
      year: "2020",
      title: "Fakir Mohan Historical Excellence Monograph Award",
      organization: "Fakir Mohan Heritage Foundation",
    },
    {
      year: "2018",
      title: "Doctoral Research Fellowship in Regional Education",
      organization: "University Grants Commission / FMU",
    },
  ],
  affiliations: [
    "Odisha History Congress (OHC)",
    "Indian History Congress (IHC)",
    "Fakir Mohan University Alumni Research Forum",
    "All India Association for Educational Research (AIAER)",
  ],
  socials: {
    orcid: "0000-0002-4190-8821",
    googleScholar: "https://scholar.google.com/citations?user=dr_anjan_kumar_pal",
    universityProfile: "https://www.fmuniversity.nic.in/faculty/dr-anjan-pal",
    academicEmail: "archive@kaalrekha.org",
  },
};
