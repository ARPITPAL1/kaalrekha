export type Language = "or" | "en";

export interface Translations {
  // Navigation
  nav: {
    home: string;
    research: string;
    globe: string;
    india: string;
    publications: string;
    about: string;
    enquiry: string;
    tagline: string;
    subtag: string;
    bookVisit: string;
    exitSession: string;
  };

  // Hero Section
  hero: {
    eyebrow: string;
    headlineMain: string;
    headlineHighlight: string;
    manifesto: string;
    exploreWorld: string;
    viewResearch: string;
    indiaHistoryOdia: string;
    latinInscription: string;
    scholarTitle: string;
    scholarName: string;
    scholarRole: string;
    civilisationsTitle: string;
    civilisationsSub: string;
    places: string;
    ideas: string;
    people: string;
    timeMachine: string;
    exploreArchive: string;
    quoteParchment: string;
    collaborativeText: string;
    dragToOrbit: string;
  };

  // Globe
  globe: {
    searchPlaceholder: string;
    historicalSignificance: string;
    ancientEra: string;
    medievalEra: string;
    modernEra: string;
    majorRulers: string;
    artifactsMonuments: string;
    layers: string;
    historicalView: string;
    modernView: string;
    tradeRoutes: string;
    empires: string;
    archaeology: string;
    geology: string;
  };

  // The Historian's Manifesto
  manifestoSection: {
    badge: string;
    heading: string;
    subheading: string;
    body1: string;
    statsInscriptions: string;
    statsSites: string;
    statsYears: string;
    specimenBadge: string;
    specimenTitle: string;
    specimenProvenance: string;
    inspectPrompt: string;
    epigraphicSpecimen: string;
  };

  // Questions from the Past
  questionsSection: {
    badge: string;
    heading: string;
    exploreAll: string;
    examine: string;
  };

  // Timeline Section
  timelineSection: {
    badge: string;
    heading: string;
    subhead: string;
    keySeals: string;
    examineScholarship: string;
    indexArtifact: string;
    stratigraphicNote: string;
    catalogId: string;
    discoverySite: string;
    status: string;
    verifiedSpecimen: string;
    peerReviewed: string;
    viewMonographs: string;
  };

  // Monograph Spotlight
  monographSection: {
    badge: string;
    title: string;
    description: string;
    readDossier: string;
    catalogue: string;
    recordTitle: string;
    publisher: string;
    year: string;
    format: string;
    isbn: string;
  };

  // Places Map Section
  placesSection: {
    badge: string;
    heading: string;
    viewMode: string;
    map: string;
    index: string;
    basinLabel: string;
    windowLabel: string;
    linkedPublication: string;
    excavationProject: string;
  };

  // Publications Section
  publicationsSection: {
    badge: string;
    heading: string;
    viewAll: string;
    readDossier: string;
    doiAvailable: string;
  };

  // 3D & India Spotlight
  spotlightSection: {
    badge: string;
    heading: string;
    launch3D: string;
    earthTitle: string;
    earthDesc: string;
    earthBtn: string;
    indiaTitle: string;
    indiaDesc: string;
    indiaBtn: string;
    realOrbit: string;
    daylightTopography: string;
    fullOdiaBadge: string;
    panorama360: string;
  };

  // About Section
  aboutSection: {
    badge: string;
    fullBioBtn: string;
    talksBtn: string;
  };

  // Portal CTA Section
  portalSection: {
    badge: string;
    headingMain: string;
    headingItalic: string;
    subhead: string;
    ctaBtn: string;
  };

  // Footer
  footer: {
    archiveDossiers: string;
    institutional: string;
    registries: string;
    copyright: string;
    zeroBiometric: string;
    accessible: string;
    credits: string;
  };

  // Enquiry Page
  enquiry: {
    badge: string;
    title: string;
    description: string;
    photoIdentityTitle: string;
    photoIdentityNotice: string;
    step1Email: string;
    step2Presence: string;
    step3Mobile: string;
    passed: string;
    pending: string;
    locked: string;
    takeSnapshot: string;
    captureBtn: string;
    retakeBtn: string;
    confirmSnapshotBtn: string;
    dispatchedToEmail: string;
    privacyClarification: string;
    submitBtn: string;
  };
}

export const translations: Record<Language, Translations> = {
  or: {
    nav: {
      home: "ପ୍ରଚ୍ଛଦ",
      research: "ଗବେଷଣା",
      globe: "୩ଡି ଗ୍ଲୋବ",
      india: "ଭାରତ ଇତିହାସ",
      publications: "ପ୍ରକାଶନ",
      about: "ପରିଚୟ",
      enquiry: "ଅନୁସନ୍ଧାନ",
      tagline: "ଇତିହାସ ପ୍ରେରଣା ଦିଏ ଆଗାମୀ କାଲିକୁ",
      subtag: "ଅଭିଲେଖାଗାର",
      bookVisit: "ଅନୁସନ୍ଧାନ ପାଇଁ ଯୋଡ଼ାଯୋଗ",
      exitSession: "ଅଭିଲେଖାଗାରରୁ ପ୍ରସ୍ଥାନ",
    },
    hero: {
      eyebrow: "ଅନୁସନ୍ଧାନ · ଶିକ୍ଷା · ସଂଯୋଗ",
      headlineMain: "ଇତିହାସ ଜୀବନ୍ତ ରହେ",
      headlineHighlight: "ମଣିଷଙ୍କ ମଧ୍ୟରେ",
      manifesto:
        "ରୋମାନ୍ ସଭ୍ୟତା, ଭୂମଧ୍ୟସାଗରୀୟ ଜଳଯାତ୍ରା ଓ ପ୍ରାଚୀନ କାଳର ଜୀବନ୍ତ ଇତିହାସରେ ପ୍ରବେଶ କରନ୍ତୁ। ଯେଉଁଠାରେ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରସ୍ତର ଖଣ୍ଡ, ଶିଳାଲେଖ ଓ ମାନବୀୟ ଜୀବନ ମୁକ୍ତ ସୂର୍ଯ୍ୟାଲୋକରେ ପ୍ରକାଶ ପାଏ।",
      exploreWorld: "ପୃଥିବୀ ଭ୍ରମଣ କରନ୍ତୁ",
      viewResearch: "ଗବେଷଣା ଦେଖନ୍ତୁ",
      indiaHistoryOdia: "ଭାରତ ଇତିହାସ (ଓଡ଼ିଆରେ)",
      latinInscription: "TEMPORA MUTANTUR NOS ET MUTAMUR IN ILLIS (ସମୟ ବଦଳେ, ଆମେ ବି ସମୟ ସହ ବଦଳୁ)",
      scholarTitle: "ପ୍ରମୁଖ ଐତିହାସିକ ଓ ଗବେଷକ, ଫକୀର ମୋହନ ବିଶ୍ୱବିଦ୍ୟାଳୟ",
      scholarName: "ଡଃ ଅଞ୍ଜନ କୁମାର ପାଲ, Ph.D.",
      scholarRole: "ଫକୀର ମୋହନ ବିଶ୍ୱବିଦ୍ୟାଳୟ, ବାଲେଶ୍ୱର (ପିଏଚ୍.ଡି ଗବେଷଣା: 'Growth of education in Balasore district from 1835 to 1947 AD')",
      civilisationsTitle: "ପ୍ରମୁଖ ଐତିହାସିକ ସଭ୍ୟତା ସମୂହ",
      civilisationsSub: "ଜୀବନ୍ତ ଭୂମଧ୍ୟସାଗର ଓ ପ୍ରାଚୀନ ବିଶ୍ୱର ଇତିହାସ",
      places: "ସ୍ଥାନ",
      ideas: "ବିଚାର",
      people: "ମଣିଷ",
      timeMachine: "ଟାଇମ୍ ମେସିନ୍ (ସମୟ ଯାତ୍ରା)",
      exploreArchive: "ଦଲିଲ ଦେଖନ୍ତୁ",
      quoteParchment: "ଇତିହାସ କେବଳ ଅତୀତର ଘଟଣାବଳୀ ନୁହେଁ, ଏହା ଯୁଗ ଯୁଗର ଏକ ଜୀବନ୍ତ ବାର୍ତ୍ତାଳାପ।",
      collaborativeText: "ଡିଜିଟାଲ୍ ହିଉମାନିଟିଜ୍ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅଭିଲେଖାଗାର",
      dragToOrbit: "ଘୂରାଇବା ପାଇଁ ଟାଣନ୍ତୁ · ନଗର ଚୟନ କରନ୍ତୁ",
    },
    globe: {
      searchPlaceholder: "ଦେଶ ଖୋଜନ୍ତୁ (ଯଥା: ଭାରତ, ଇଟାଲୀ, ଗ୍ରୀସ୍, ମିଶର)...",
      historicalSignificance: "ଐତିହାସିକ ଗୁରୁତ୍ୱ",
      ancientEra: "୦୧ · ପ୍ରାଚୀନ ଯୁଗ",
      medievalEra: "୦୨ · ମଧ୍ୟ ଯୁଗ",
      modernEra: "୦୩ · ଆଧୁନିକ ଯୁଗ ଓ ରାଷ୍ଟ୍ର",
      majorRulers: "ପ୍ରମୁଖ ଐତିହାସିକ ଶାସକ ଓ ରାଜବଂଶ",
      artifactsMonuments: "ଖନନ କରାଯାଇଥିବା ପ୍ରତ୍ନତତ୍ତ୍ୱ ଓ ସ୍ମାରକୀ ସମୂହ",
      layers: "ସ୍ତର ମନୋନୟନ",
      historicalView: "ଐତିହାସିକ ଦୃଶ୍ୟ",
      modernView: "ଆଧୁନିକ ଦୃଶ୍ୟ",
      tradeRoutes: "ବାଣିଜ୍ୟିକ ପଥ",
      empires: "ସାମ୍ରାଜ୍ୟ ସୀମା",
      archaeology: "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ କ୍ଷେତ୍ର",
      geology: "ଭୂତାତ୍ତ୍ୱିକ ବୈଶିଷ୍ଟ୍ୟ",
    },
    manifestoSection: {
      badge: "ଐତିହାସିକଙ୍କ ଘୋଷଣାପତ୍ର",
      heading: "ଇତିହାସ କେବଳ ଯାହା ଘଟିଯାଇଛି ତାହା ନୁହେଁ।",
      subheading: "ଏହା ହେଉଛି ସେହି ପ୍ରାମାଣିକ ତଥ୍ୟ, ଯାହାକୁ ଆମେ ଖନନ କରୁ, ସଂରକ୍ଷଣ କରୁ ଏବଂ ବିଶ୍ଳେଷଣ କରୁ।",
      body1:
        "ବିଶାଳ ବିଜୟ ତୋରଣ ଓ ସମ୍ରାଟମାନଙ୍କ ପ୍ରତିମୂର୍ତ୍ତି ତଳେ ଲୁଚି ରହିଛି ଶସ୍ୟ ବ୍ୟବସାୟୀଙ୍କ ହିସାବ ଖାତା, ସାଧାରଣ ଲୋକଙ୍କ ଲିପି ଏବଂ ସୈନିକମାନଙ୍କ ଦରମା ପଞ୍ଜିକା। ଆମ ଅଭିଲେଖାଗାର ଏହି ପ୍ରତ୍ୟେକ ଖଣ୍ଡକୁ ପ୍ରାଚୀନ ସମାଜର ମୁଖ୍ୟ ପ୍ରାଣବାହିକା ଭାବେ ଗ୍ରହଣ କରେ।",
      statsInscriptions: "ତାଲିକାଭୁକ୍ତ ଶିଳାଲେଖ",
      statsSites: "ଖନନ ହୋଇଥିବା ସ୍ଥାନ",
      statsYears: "ଭୂମଧ୍ୟସାଗରୀୟ କ୍ଷେତ୍ର ଗବେଷଣା ବର୍ଷ",
      specimenBadge: "ପ୍ରାମାଣିକ ସଂଗ୍ରହାଳୟ ନମୁନା · BM-891",
      specimenTitle: "ପ୍ରାଚୀନ ରୋମାନ୍ ମାର୍ବଲ୍ ମୂର୍ତ୍ତି (ସେଭେରାନ ରାଜବଂଶ, ପ୍ରାୟ ୧୯୮–୨୧୧ ଖ୍ରୀଷ୍ଟାବ୍ଦ)",
      specimenProvenance: "ଉତ୍ସ: ବ୍ରିଟିଶ ସଂଗ୍ରହାଳୟ ଓ ରୋମାନ୍ ଫୋରମ୍ ଶିଳାଲେଖ ଭଣ୍ଡାର",
      inspectPrompt: "ମାର୍ବଲ ଖୋଦେଇ ପରୀକ୍ଷା କରିବା ପାଇଁ କର୍ସର ଘୁରାନ୍ତୁ",
      epigraphicSpecimen: "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସଂରକ୍ଷିତ ନମୁନା",
    },
    questionsSection: {
      badge: "ଅନୁସନ୍ଧାନର କ୍ଷେତ୍ର",
      heading: "ଅତୀତରୁ ଆସିଥିବା ପ୍ରଶ୍ନ",
      exploreAll: "ସମସ୍ତ ଗବେଷଣା ବିଷୟ ଦେଖନ୍ତୁ",
      examine: "ବିଶ୍ଳେଷଣ",
    },
    timelineSection: {
      badge: "କାଳକ୍ରମିକ ସ୍ତରୀକରଣ",
      heading: "ପାରସ୍ପରିକ କ୍ରିୟାଶୀଳ ଟାଇମଲାଇନ୍",
      subhead: "ଇତିହାସ ଏକ ନିଶ୍ଚଳ ତାରିଖ ନୁହେଁ; ଏହା ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ ଏବଂ ପରିବର୍ତ୍ତନଶୀଳ ମାନବ ଜୀବନର ଏକ ନିରନ୍ତର ସମ୍ପର୍କ।",
      keySeals: "ପ୍ରମୁଖ ଐତିହାସିକ ଦଲିଲ ଓ ଅଭିଲେଖ",
      examineScholarship: "ସମ୍ପର୍କିତ ଗବେଷଣା ପରୀକ୍ଷା କରନ୍ତୁ",
      indexArtifact: "ମୁଖ୍ୟ ଖନନ ପ୍ରତ୍ନତତ୍ତ୍ୱ",
      stratigraphicNote: "ମୁଦ୍ରା ଭଣ୍ଡାର ଏବଂ କାର୍ବନ-୧୪ ପରୀକ୍ଷିତ ଜୈବିକ ସ୍ତର ସହିତ ପ୍ରମାଣିତ ନମୁନା।",
      catalogId: "କାଟାଲଗ୍ ନଂ:",
      discoverySite: "ଆବିଷ୍କାର ସ୍ଥଳ:",
      status: "ସଂରକ୍ଷଣ ସ୍ଥିତି:",
      verifiedSpecimen: "ପ୍ରମାଣିତ ନମୁନା",
      peerReviewed: "ପ୍ରମାଣିତ ତଥ୍ୟ",
      viewMonographs: "ଗ୍ରନ୍ଥାବଳୀ ଦେଖନ୍ତୁ →",
    },
    monographSection: {
      badge: "ମୁଖ୍ୟ ଗବେଷଣା ଗ୍ରନ୍ଥ · ଅକ୍ସଫୋର୍ଡ୍ ୟୁନିଭରସିଟି ପ୍ରେସ୍",
      title: "ସାମ୍ରାଜ୍ୟ ନିର୍ମାଣ: କାଂସ୍ୟ, ଶସ୍ୟ ଓ ରୋମାନ୍ ଭୂମଧ୍ୟସାଗର",
      description:
        "୨୪୦ରୁ ଅଧିକ ପ୍ରାଚୀନ ଜାହାଜ ବୁଡ଼ିର ତଥ୍ୟ ଏବଂ ପ୍ରସ୍ତର ତାମ୍ରଫଳକ ଲିପିକୁ ବିଶ୍ଳେଷଣ କରି ଏହି ପୁସ୍ତକ ପ୍ରମାଣ କରେ ଯେ କିପରି ଶସ୍ୟ ବ୍ୟବସାୟୀ ସଂଘ ରୋମାନ୍ ଶାନ୍ତି (Pax Romana) ପ୍ରତିଷ୍ଠା କରିଥିଲେ।",
      readDossier: "ପୂର୍ଣ୍ଣ ବିବରଣୀ ପଢ଼ନ୍ତୁ",
      catalogue: "OUP କାଟାଲଗ୍",
      recordTitle: "ଗ୍ରନ୍ଥସୂଚୀ ବିବରଣୀ",
      publisher: "ପ୍ରକାଶକ:",
      year: "ପ୍ରକାଶନ ବର୍ଷ:",
      format: "ମାଧ୍ୟମ:",
      isbn: "ISBN ନମ୍ବର:",
    },
    placesSection: {
      badge: "ଭୌଗୋଳିକ ଅଧ୍ୟୟନ କ୍ଷେତ୍ର",
      heading: "ଗବେଷଣାର ଐତିହାସିକ ସ୍ଥଳୀ",
      viewMode: "ଦେଖିବା ମାଧ୍ୟମ:",
      map: "ମାନଚିତ୍ର",
      index: "ସୂଚୀପତ୍ର",
      basinLabel: "ମାରେ ନଷ୍ଟ୍ରମ · ଭୂମଧ୍ୟସାଗରୀୟ ଅବବାହିକା",
      windowLabel: "କାଳଖଣ୍ଡ:",
      linkedPublication: "ସମ୍ପର୍କିତ ଗବେଷଣା ପ୍ରକାଶନ",
      excavationProject: "ଖନନ ଓ କ୍ଷେତ୍ର ପରିଦର୍ଶନ ପ୍ରକଳ୍ପ",
    },
    publicationsSection: {
      badge: "ପ୍ରମାଣିତ ଗବେଷଣା ପୁସ୍ତକାବଳୀ",
      heading: "ନିର୍ବାଚିତ ପ୍ରକାଶନ ସମୂହ",
      viewAll: "ସମସ୍ତ ଗ୍ରନ୍ଥାବଳୀ ଦେଖନ୍ତୁ",
      readDossier: "ଦଲିଲ ଅଧ୍ୟୟନ କରନ୍ତୁ",
      doiAvailable: "DOI ଉପଲବ୍ଧ",
    },
    spotlightSection: {
      badge: "ପାରସ୍ପରିକ ୩ଡି ଅନୁସନ୍ଧାନ",
      heading: "୩ଡି ଭୂତାତ୍ତ୍ୱିକ ପୃଥିବୀ ଓ ବିଶ୍ୱ ଇତିହାସ",
      launch3D: "୩ଡି ପୃଥିବୀ ଆରମ୍ଭ କରନ୍ତୁ",
      earthTitle: "ପାରସ୍ପରିକ କ୍ରିୟାଶୀଳ ୩ଡି ଭୂତାତ୍ତ୍ୱିକ ପୃଥିବୀ",
      earthDesc: "ଗୁଗଲ୍ ଆର୍ଥ୍ ଶୈଳୀର ପ୍ରାକୃତିକ ୩ଡି ପୃଥିବୀରେ ଯେକୌଣସି ଦେଶ ଖୋଜନ୍ତୁ। ପ୍ରାଚୀନ, ମଧ୍ୟଯୁଗୀୟ ଓ ଆଧୁନିକ ଇତିହାସର ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ପାଆନ୍ତୁ।",
      earthBtn: "୩ଡି ପୃଥିବୀ ଦେଖନ୍ତୁ",
      indiaTitle: "ଭାରତର ଇତିହାସ (ଓଡ଼ିଆରେ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ)",
      indiaDesc: "ସିନ୍ଧୁ ସଭ୍ୟତା, କଳିଙ୍ଗ ଯୁଦ୍ଧ, ମୌର୍ଯ୍ୟ ଓ ଗୁପ୍ତ ସାମ୍ରାଜ୍ୟ, ୧୮୧୭ ପାଇକ ବିଦ୍ରୋହ ଓ ୧୯୪୭ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ। କୋଣାର୍କ ଓ ତାଜମହଲର ୩୬୦° ଗୁଗଲ୍ ଷ୍ଟ୍ରିଟ୍ ଭ୍ୟୁ ଅନୁଭବ କରନ୍ତୁ।",
      indiaBtn: "ପ୍ରବେଶ କରନ୍ତୁ (ଭାରତ ଅଭିଲେଖାଗାର)",
      realOrbit: "ପ୍ରାକୃତିକ କକ୍ଷପଥ",
      daylightTopography: "ପ୍ରାକୃତିକ ଦିବାଲୋକ ଭୂରୂପ",
      fullOdiaBadge: "ଓଡ଼ିଆ ଭାଷାରେ ସମ୍ପୂର୍ଣ୍ଣ ଇତିହାସ",
      panorama360: "୩୬୦° ଗୁଗଲ୍ ମ୍ୟାପ୍ ଭ୍ୟୁ",
    },
    aboutSection: {
      badge: "ସୋସାଇଟି ଅଫ୍ ଆଣ୍ଟିକ୍ୟୁରିଜ୍ ଫେଲୋ",
      fullBioBtn: "ପୂର୍ଣ୍ଣ ଜୀବନୀ ଓ CV",
      talksBtn: "ବକ୍ତବ୍ୟ ଓ ଗଣମାଧ୍ୟମ",
    },
    portalSection: {
      badge: "ଅଭିଲେଖାଗାର ପୋର୍ଟାଲ୍",
      headingMain: "ଅତୀତ ପାଖରେ ଏବେ ବି ଅଛି",
      headingItalic: "ଅନେକ ପ୍ରଶ୍ନ।",
      subhead: "ଗବେଷଣା ପ୍ରଶ୍ନ, ବକ୍ତବ୍ୟ ନିମନ୍ତ୍ରଣ କିମ୍ବା ଶିକ୍ଷାଗତ ସହଯୋଗ ପାଇଁ ଐତିହାସିକଙ୍କ ସହ ସିଧାସଳଖ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
      ctaBtn: "ଅନୁସନ୍ଧାନ ଆରମ୍ଭ କରନ୍ତୁ",
    },
    footer: {
      archiveDossiers: "ଅଭିଲେଖାଗାର ଦସ୍ତାବିଜ",
      institutional: "ପ୍ରାତିଷ୍ଠାନିକ ଓ ୩ଡି",
      registries: "ଶିକ୍ଷାଗତ ପଞ୍ଜିକରଣ",
      copyright: "ସର୍ବସ୍ୱତ୍ତ୍ୱ ସଂରକ୍ଷିତ। କେବଳ ଶିକ୍ଷାଗତ ଓ ଅଣ-ବାଣିଜ୍ୟିକ ଅନୁସନ୍ଧାନ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ।",
      zeroBiometric: "ନିରାପଦ ଗୋପନୀୟତା ନୀତି",
      accessible: "WCAG 2.1 AA ସୁଗମ୍ୟତା",
      credits: "ପ୍ରମାଣପତ୍ର ଓ ସ୍ୱୀକୃତି",
    },
    enquiry: {
      badge: "ସିଧାସଳଖ ଶୈକ୍ଷିକ ଯୋଗାଯୋଗ",
      title: "ଶୈକ୍ଷିକ ଅନୁସନ୍ଧାନ ପୋର୍ଟାଲ୍",
      description: "ସ୍ପାମ୍ ରୋକିବା ପାଇଁ ଇମେଲ୍ ଯାଞ୍ଚ ଏବଂ ପ୍ରେରକଙ୍କ ପରିଚୟ ସ୍ୱଚ୍ଛତା ନିମନ୍ତେ ଏକ ଚେହେରା ଫଟୋ ଆବଶ୍ୟକ।",
      photoIdentityTitle: "ପ୍ରେରକଙ୍କ ପରିଚୟ ଫଟୋ (Identity Photo)",
      photoIdentityNotice: "ଏହା କୌଣସି ବାୟୋମେଟ୍ରିକ୍ ସ୍କାନିଂ ନୁହେଁ। ଏହା କେବଳ ଅଭିଲେଖାଗାର ମାଲିକ ଜାଣିବା ପାଇଁ ଯେ ପ୍ରକୃତରେ କିଏ ଯୋଗାଯୋଗ କରୁଛନ୍ତି।",
      step1Email: "୧. ଇମେଲ୍ ଯାଞ୍ଚ",
      step2Presence: "୨. ପରିଚୟ ଫଟୋ",
      step3Mobile: "୩. ମୋବାଇଲ୍ OTP",
      passed: "ପ୍ରମାଣିତ",
      pending: "ବାକି ଅଛି",
      locked: "ଅବରୋଧିତ",
      takeSnapshot: "କ୍ୟାମେରା ଖୋଲି ଫଟୋ ନିଅନ୍ତୁ",
      captureBtn: "ଫଟୋ କ୍ଲିକ୍ କରନ୍ତୁ",
      retakeBtn: "ପୁନର୍ବାର ନିଅନ୍ତୁ",
      confirmSnapshotBtn: "ଫଟୋ ନିଶ୍ଚିତ କରନ୍ତୁ",
      dispatchedToEmail: "ଏହି ଅନୁସନ୍ଧାନ ସିଧାସଳଖ kumar2000150@gmail.com କୁ ପ୍ରେରଣ କରାଯିବ।",
      privacyClarification: "ଆପଣଙ୍କ ଫଟୋ କୌଣସି ବାୟୋମେଟ୍ରିକ୍ ଡାଟାବେସରେ ସଂରକ୍ଷିତ ହୁଏନାହିଁ; ଏହା କେବଳ ଇମେଲ୍ ସହିତ ମାଲିକଙ୍କ ପାଖକୁ ଯାଏ।",
      submitBtn: "ଅନୁସନ୍ଧାନ ପ୍ରେରଣ କରନ୍ତୁ",
    },
  },
  en: {
    nav: {
      home: "HOME",
      research: "RESEARCH",
      globe: "3D GLOBE",
      india: "INDIA (ODIA)",
      publications: "PUBLICATIONS",
      about: "ABOUT",
      enquiry: "ENQUIRY",
      tagline: "PAST INSPIRES TOMORROW",
      subtag: "ARCHIVUM",
      bookVisit: "Book Research Visit",
      exitSession: "Exit Archive Session",
    },
    hero: {
      eyebrow: "EXPLORE · LEARN · CONNECT",
      headlineMain: "HISTORY LIVES IN",
      headlineHighlight: "PEOPLE",
      manifesto:
        "Delve into the living tapestry of the Roman world, Mediterranean seafaring, and late antiquity. Where archaeological stones, epigraphic decrees, and human lives converge in the natural morning light of scholarship.",
      exploreWorld: "Explore the World",
      viewResearch: "View Research",
      indiaHistoryOdia: "India History (in Odia)",
      latinInscription: "TEMPORA MUTANTUR NOS ET MUTAMUR IN ILLIS",
      scholarTitle: "Distinguished Historian & Archival Researcher",
      scholarName: "Dr. Anjan Kumar Pal, Ph.D.",
      scholarRole: "Ph.D., Fakir Mohan University, Balasore · 'Growth of education in Balasore district from 1835 to 1947 AD'",
      civilisationsTitle: "EXPLORE KEY CIVILISATIONS",
      civilisationsSub: "The Living Mediterranean & Ancient World",
      places: "PLACES",
      ideas: "IDEAS",
      people: "PEOPLE",
      timeMachine: "TIME MACHINE",
      exploreArchive: "Explore archive",
      quoteParchment: "History is not merely a chronicle of what was, but a living dialogue across time.",
      collaborativeText: "COLLABORATIVE ARCHAEOLOGY & DIGITAL HUMANITIES",
      dragToOrbit: "Drag to orbit · Click pin to examine",
    },
    globe: {
      searchPlaceholder: "Search country (e.g. India, Italy, Greece, Egypt)...",
      historicalSignificance: "HISTORICAL SIGNIFICANCE",
      ancientEra: "01 · ANCIENT ERA",
      medievalEra: "02 · MEDIEVAL ERA",
      modernEra: "03 · MODERN ERA & STATEHOOD",
      majorRulers: "MAJOR HISTORICAL RULERS & SOVEREIGNS",
      artifactsMonuments: "EXCAVATED ARTIFACTS & MONUMENTS",
      layers: "Layers",
      historicalView: "Historical View",
      modernView: "Modern View",
      tradeRoutes: "Trade Routes",
      empires: "Empires",
      archaeology: "Archaeological Sites",
      geology: "Geological Features",
    },
    manifestoSection: {
      badge: "THE HISTORIAN'S MANIFESTO",
      heading: "History is not merely what transpired.",
      subheading: "It is the material evidence we choose to excavate, preserve, decipher, and interrogate.",
      body1:
        "Beneath grand triumphal arches and imperial bronze statues lie the ledgers of grain merchants, the scribbled tallies of tavern keepers, and the pay records of legionaries stationed along foggy riverbanks. Our archive treats these fragments not as trivia, but as the fundamental structural sinews of ancient society.",
      statsInscriptions: "Inscriptions Catalogued",
      statsSites: "Excavated Sites",
      statsYears: "Mediterranean Fieldwork",
      specimenBadge: "AUTHENTIC MUSEUM SPECIMEN · BM-891",
      specimenTitle: "Classical Roman Marble Portrait Bust (Severan Dynasty, c. 198–211 CE)",
      specimenProvenance: "Provenance: British Museum Curatorial Collection & Roman Forum Epigraphic Vault",
      inspectPrompt: "Move cursor to examine marble chiseling",
      epigraphicSpecimen: "Epigraphic Archive Specimen",
    },
    questionsSection: {
      badge: "FIELDS OF INQUIRY",
      heading: "Questions from the Past",
      exploreAll: "EXPLORE ALL RESEARCH THEMES",
      examine: "Examine",
    },
    timelineSection: {
      badge: "CHRONOLOGICAL STRATIGRAPHY",
      heading: "The Interactive Timeline",
      subhead:
        "Historical inquiry is not static chronology; it is the dialogue between excavated material evidence and the changing human condition across millennia.",
      keySeals: "KEY HISTORICAL SEALS & ARCHIVAL RECORDS",
      examineScholarship: "EXAMINE RELATED SCHOLARSHIP",
      indexArtifact: "EXCAVATED INDEX ARTIFACT",
      stratigraphicNote:
        "Stratigraphic anchor specimen correlated with numismatic hoards and carbon-14 dated organic layers in the Mediterranean Epigraphic Archive.",
      catalogId: "CATALOG ID:",
      discoverySite: "DISCOVERY SITE:",
      status: "CURATORIAL STATUS:",
      verifiedSpecimen: "VERIFIED SPECIMEN",
      peerReviewed: "PEER-REVIEWED EVIDENCE",
      viewMonographs: "VIEW MONOGRAPHS →",
    },
    monographSection: {
      badge: "MAJOR MONOGRAPH · OXFORD UNIVERSITY PRESS",
      title: "The Making of an Empire: Bronze, Grain, and the Roman Mediterranean",
      description:
        "Integrating epigraphic bronze tablets with cargo data from over 240 ancient Mediterranean shipwrecks, this work demonstrates how fiscal concessions and merchant shipping guilds forged the Pax Romana.",
      readDossier: "READ DOSSIER & CITATION",
      catalogue: "OUP CATALOGUE",
      recordTitle: "BIBLIOGRAPHIC RECORD",
      publisher: "PUBLISHER:",
      year: "YEAR:",
      format: "FORMAT:",
      isbn: "ISBN:",
    },
    placesSection: {
      badge: "GEOSPATIAL TOPOGRAPHY",
      heading: "Places of Research",
      viewMode: "VIEW MODE:",
      map: "Map",
      index: "Index (Accessible)",
      basinLabel: "MARE NOSTRUM · MEDITERRANEAN ARCHIVE BASIN",
      windowLabel: "CHRONOLOGICAL WINDOW:",
      linkedPublication: "Linked Publication Dossier",
      excavationProject: "Excavation & Field Project",
    },
    publicationsSection: {
      badge: "PEER-REVIEWED SCHOLARSHIP",
      heading: "Selected Publications",
      viewAll: "VIEW COMPLETE BIBLIOGRAPHY",
      readDossier: "READ DOSSIER",
      doiAvailable: "DOI AVAILABLE",
    },
    spotlightSection: {
      badge: "INTERACTIVE 3D EXPLORATION",
      heading: "Geological Earth & World History",
      launch3D: "LAUNCH 3D GEOLOGICAL EARTH",
      earthTitle: "Interactive 3D Geological Earth",
      earthDesc:
        "Rotate, zoom, and search any nation on a Google Earth-style photorealistic 3D Earth. Inspect ancient, medieval, and modern historical stratigraphy with pinpoint geographic coordinates.",
      earthBtn: "EXPLORE 3D EARTH",
      indiaTitle: "ଭାରତର ଇତିହାସ (India History & 360° Panoramas)",
      indiaDesc:
        "Comprehensive documentation of ancient Indus, Kalinga War, Maurya, Gupta, 1817 Paika Rebellion, and 1947 Independence. Experience 360° Google Maps Street Views of Konark and Taj Mahal.",
      indiaBtn: "ENTER INDIA ARCHIVE",
      realOrbit: "REAL CELESTIAL ORBIT",
      daylightTopography: "DAYLIGHT TOPOGRAPHY",
      fullOdiaBadge: "ଓଡ଼ିଆ ଭାଷାରେ ସମ୍ପୂର୍ଣ୍ଣ ଇତିହାସ",
      panorama360: "360° GOOGLE MAP PANORAMA",
    },
    aboutSection: {
      badge: "FELLOW OF THE SOCIETY OF ANTIQUARIES",
      fullBioBtn: "FULL BIOGRAPHY & CV",
      talksBtn: "TALKS & MEDIA",
    },
    portalSection: {
      badge: "THE ARCHIVE PORTAL",
      headingMain: "The Past Still Has",
      headingItalic: "Questions.",
      subhead:
        "Have a research inquiry, speaking invitation, curatorial proposal, or academic collaboration? Connect with the historian through the verified scholarly portal.",
      ctaBtn: "START AN ENQUIRY",
    },
    footer: {
      archiveDossiers: "ARCHIVE DOSSIERS",
      institutional: "INSTITUTIONAL & 3D",
      registries: "SCHOLARLY REGISTRIES",
      copyright: "All rights reserved. Curated for scholarly non-commercial reference.",
      zeroBiometric: "ZERO-BIOMETRIC POLICY",
      accessible: "WCAG 2.1 AA ACCESSIBLE",
      credits: "PROVENANCE & CREDITS",
    },
    enquiry: {
      badge: "DIRECT SCHOLARLY DISPATCH",
      title: "Academic Enquiry",
      description:
        "To prevent spam and protect scholarly dialogue, correspondence requires an authenticated session with identity transparency photo and mobile OTP.",
      photoIdentityTitle: "Sender Identity Photograph (Not Biometric Scan)",
      photoIdentityNotice:
        "This is NOT biometric authentication. It is solely an identity photo so the archive owner knows who is actually reaching out.",
      step1Email: "1. EMAIL GATE",
      step2Presence: "2. IDENTITY PHOTO",
      step3Mobile: "3. MOBILE OTP",
      passed: "PASSED",
      pending: "PENDING",
      locked: "LOCKED",
      takeSnapshot: "Activate Camera & Take Identity Photo",
      captureBtn: "Take Photo",
      retakeBtn: "Retake Photo",
      confirmSnapshotBtn: "Confirm Identity Photo",
      dispatchedToEmail: "This enquiry will be dispatched directly to kumar2000150@gmail.com.",
      privacyClarification:
        "Your photo is never stored in a biometric database; it is transmitted directly to the owner's email along with your message.",
      submitBtn: "Transmit Enquiry",
    },
  },
};
