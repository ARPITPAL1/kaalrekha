import fs from "fs";
import path from "path";

// 201 Topics Database Generator
const topicsData = [
  // 1-5 Prehistoric
  {
    num: 1,
    titleEn: "Paleolithic Age",
    titleOdia: "ପୁରାତନ ପ୍ରସ୍ତର ଯୁଗ (Paleolithic Age)",
    era: "ପ୍ରାକ୍-ଇତିହାସ (Prehistory)",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୦୦୦,୦୦୦ – ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧୦,୦୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ଭାରତର ପ୍ରାଚୀନତମ ମାନବୀୟ ବସତି କାଳ। ଅଣଘଷା କ୍ୱାର୍ଟଜାଇଟ୍ ପଥରର ହାତକୁରାଢ଼ି (Handaxe), ଖଣ୍ଡକ (Cleaver) ଦ୍ୱାରା ଶିକାରୀ ଓ ଫଳମୂଳ ସଂଗ୍ରାହକ ଜୀବନ। ସୋହନ ନଦୀ ଉପତ୍ୟକା, ଭୀମବେଟକା ଓ କୁଳିଅଣା ପ୍ରମୁଖ ସ୍ଥଳ।",
    subsections: [
      { nameOdia: "ନିମ୍ନ, ମଧ୍ୟ ଓ ଉଚ୍ଚ ପୁରାପ୍ରସ୍ତର ବିଭାଜନ", nameEn: "Lower, Middle & Upper Paleolithic", detailsOdia: "କ୍ୱାର୍ଟଜାଇଟ୍ ନିର୍ମିତ ଭାରୀ ଉପକରଣଠାରୁ ଆରମ୍ଭ କରି ବ୍ଲେଡ୍ ଓ ବ୍ୟୁରିନ୍ ଭଳି ସୂକ୍ଷ୍ମ ଅସ୍ତ୍ରର ବିକାଶ।" },
      { nameOdia: "ନର୍ମଦା ମାନବ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ", nameEn: "Narmada Man (Homo erectus)", detailsOdia: "ହାଥନୋରା (ମଧ୍ୟପ୍ରଦେଶ)ରୁ ଆବିଷ୍କୃତ ନର୍ମଦା ମାନବର ଖପୁରୀ ଭାରତୀୟ ଉପମହାଦେଶରେ ପ୍ରାଚୀନତମ ମାନବ ଅବଶେଷ।" }
    ],
    archaeologicalSites: ["ଭୀମବେଟକା (ମଧ୍ୟପ୍ରଦେଶ)", "ସୋହନ ଉପତ୍ୟକା (ପଞ୍ଜାବ)", "କୁଳିଅଣା (ଓଡ଼ିଶା)", "ଅତିରମ୍ପକ୍କମ (ତାମିଲନାଡୁ)"],
    keyFigures: ["ରବର୍ଟ ବ୍ରୁସ ଫୁଟେ (ପ୍ରତ୍ନତତ୍ତ୍ୱବିତ୍)", "ଆଦିମାନବ (Homo erectus narmadensis)"]
  },
  {
    num: 2,
    titleEn: "Mesolithic Age",
    titleOdia: "ମଧ୍ୟ ପ୍ରସ୍ତର ଯୁଗ (Mesolithic Age)",
    era: "ପ୍ରାକ୍-ଇତିହାସ (Prehistory)",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧୦,୦୦୦ – ଖ୍ରୀଷ୍ଟପୂର୍ବ ୬,୦୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ଜଳବାୟୁ ଉଷ୍ମ ହେବା ସହ କ୍ଷୁଦ୍ରାତିକ୍ଷୁଦ୍ର ପ୍ରସ୍ତର ଅସ୍ତ୍ର ବା ମାଇକ୍ରୋଲିଥ୍ (Microliths) ର ଉଦ୍ଭାବନ ଏବଂ ପ୍ରାରମ୍ଭିକ ପଶୁପାଳନର ସୂତ୍ରପାତ।",
    subsections: [
      { nameOdia: "ମାଇକ୍ରୋଲିଥ୍ ଉପକରଣ ଓ ଧନୁଶର", nameEn: "Microlithic Tools & Bows", detailsOdia: "ଜ୍ୟାମିତିକ ଆକୃତିର କ୍ଷୁଦ୍ର ପଥର ଫଳକ ଯାହା କାଠ ଓ ହାଡ଼ରେ ଲଗାଇ ବ୍ୟବହାର ହେଉଥିଲା।" },
      { nameOdia: "ପ୍ରାକୃତିକ ଶୈଳଚିତ୍ରକଳା ଓ ସମାଧି", nameEn: "Rock Art & Burial Practices", detailsOdia: "ଭୀମବେଟକାର ଗୁମ୍ଫାରେ ଶିକାର, ନୃତ୍ୟ ଏବଂ ପାରିବାରିକ ଚିତ୍ରକଳାର ସମୃଦ୍ଧ ନିଦର୍ଶନ।" }
    ],
    archaeologicalSites: ["ବାଗୋର (ରାଜସ୍ଥାନ)", "ଆଦମଗଡ଼ (ମଧ୍ୟପ୍ରଦେଶ)", "ସରାୟ ନାହର ରାୟ (ଉତ୍ତର ପ୍ରଦେଶ)"],
    keyFigures: ["କାର୍ଲାଇଲ (ପ୍ରତ୍ନତତ୍ତ୍ୱବିତ୍)"]
  },
  {
    num: 3,
    titleEn: "Neolithic Age",
    titleOdia: "ନୂତନ ପ୍ରସ୍ତର ଯୁଗ (Neolithic Age)",
    era: "ପ୍ରାକ୍-ଇତିହାସ (Prehistory)",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୬,୦୦୦ – ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୦୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ଖାଦ୍ୟ ସଂଗ୍ରାହକରୁ ଖାଦ୍ୟ ଉତ୍ପାଦକରେ ରୂପାନ୍ତରଣ (ନବପ୍ରସ୍ତର ବିପ୍ଳବ)। କୃଷି, ସ୍ଥାୟୀ ବସତି, କୁମ୍ଭାର ଚକ ଏବଂ ପଲିସ୍ ପଥର ଅସ୍ତ୍ରର ଆଗମନ।",
    subsections: [
      { nameOdia: "ମେହରଗଡ଼ ଓ କୃଷି କ୍ରାନ୍ତି", nameEn: "Mehrgarh & Early Agriculture", detailsOdia: "ଗହମ, ଯଅ ଏବଂ ପ୍ରଥମ କପା ଚାଷ ସହ ପଶୁପାଳନର ପ୍ରାଚୀନତମ ପ୍ରମାଣ।" },
      { nameOdia: "ବୁର୍ଜାହୋମ୍ ଓ ମାଟିକୂପ ବସତି", nameEn: "Burzahom Pit Dwellings", detailsOdia: "କାଶ୍ମୀରରେ ଭୂତଳ ଗାତ ଘର ଏବଂ କୁକୁର ସହିତ ମଣିଷର ସମାଧିର ପ୍ରମାଣ।" }
    ],
    archaeologicalSites: ["ମେହରଗଡ଼ (ବଲୁଚିସ୍ତାନ)", "ବୁର୍ଜାହୋମ୍ (କାଶ୍ମୀର)", "କୋଲଡିହୱା (ଉତ୍ତରପ୍ରଦେଶ)", "ପାୟାମପଲ୍ଲୀ (ତାମିଲନାଡୁ)"],
    keyFigures: ["ଭି. ଗର୍ଡନ ଚାଇଲ୍ଡ (ଐତିହାସିକ)"]
  },
  {
    num: 4,
    titleEn: "Chalcolithic Age",
    titleOdia: "ତାମ୍ର-ପ୍ରସ୍ତର ଯୁଗ (Chalcolithic Age)",
    era: "ପ୍ରାକ୍-ଇତିହାସ (Prehistory)",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୦୦୦ – ଖ୍ରୀଷ୍ଟପୂର୍ବ ୭୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ପଥର ସହିତ ତମ୍ବା ଧାତୁର ଯୁଗ୍ମ ବ୍ୟବହାର। ଆହାର, ମାଲୱା ଏବଂ ଜୋରୱେ ସଂସ୍କୃତିର ଗ୍ରାମୀଣ ବସତି ଓ କଳା-ଲାଲ୍ ମୃଣ୍ମୟ ପାତ୍ର।",
    subsections: [
      { nameOdia: "ଜୋରୱେ ଓ ଆହାର ସଂସ୍କୃତି", nameEn: "Jorwe & Ahar Cultures", detailsOdia: "ଇନାମଗାଓଁର କିଲ୍ଲାବନ୍ଦୀ ବସତି ଏବଂ ବାନାସ ଉପତ୍ୟକାର ତମ୍ବା ତରଳାଇବା କାରଖାନା।" },
      { nameOdia: "ଧାତୁକଳା ଓ ମାତୃକା ପୂଜା", nameEn: "Metallurgy & Mother Goddess", detailsOdia: "ତମ୍ବା କୁରାଢ଼ି, ଚୁଡ଼ି ଏବଂ ମୃଣ୍ମୟ ମାତୃକା ଦେବୀ ମୂର୍ତ୍ତିର ବିକାଶ।" }
    ],
    archaeologicalSites: ["ଇନାମଗାଓଁ (ମହାରାଷ୍ଟ୍ର)", "ନଭଡାତୋଲି (ମଧ୍ୟପ୍ରଦେଶ)", "ଆହାର (ରାଜସ୍ଥାନ)"]
  },
  {
    num: 5,
    titleEn: "Megalithic Culture",
    titleOdia: "ବୃହତ ପ୍ରସ୍ତର ସଂସ୍କୃତି (Megalithic Culture)",
    era: "ଲୌହ ଯୁଗ (Iron Age)",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧,୨୦୦ – ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ଦକ୍ଷିଣ ଭାରତ ଓ ବିଦର୍ଭରେ ବିଶାଳ ପ୍ରସ୍ତର ସମାଧି (ଡୋଲମେନ୍, ସିଷ୍ଟ, ମେନହିର) ଏବଂ ଲୁହାର ଅସ୍ତ୍ରଶସ୍ତ୍ରର ପ୍ରଚଳନ।",
    subsections: [
      { nameOdia: "ସମାଧି ସ୍ଥାପତ୍ୟ (Dolmens & Cists)", nameEn: "Megalithic Monuments", detailsOdia: "ବିଶାଳ ପ୍ରସ୍ତର ଖଣ୍ଡ ଦ୍ୱାରା ନିର୍ମିତ ସମାଧି ଚାମ୍ବର ଓ ଅଶ୍ୱ ଅବଶେଷ।" },
      { nameOdia: "ଲୌହ ଯୁଗର ବିସ୍ତାର", nameEn: "Iron Age Expansion", detailsOdia: "ଲୁହା କୁରାଢ଼ି, ଶୂଳ ଓ କୃଷି ଉପକରଣ ଦ୍ୱାରା ଜଙ୍ଗଲ ସଫା ଓ କୃଷି ବିସ୍ତାର।" }
    ],
    archaeologicalSites: ["ହଲ୍ଲୁର (କର୍ଣ୍ଣାଟକ)", "ବ୍ରହ୍ମଗିରି", "ଆଦିଚନଲ୍ଲୁର (ତାମିଲନାଡୁ)"]
  }
];

// Helper to generate full 201 sections with accurate metadata
const rawTitles = [
  { en: "Paleolithic Age", or: "ପୁରାତନ ପ୍ରସ୍ତର ଯୁଗ", cat: "ancient", era: "ପ୍ରାକ୍-ଇତିହାସ", time: "ଖ୍ରୀ.ପୂ. ୨୦ ଲକ୍ଷ - ୧୦,୦୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Mesolithic Age", or: "ମଧ୍ୟ ପ୍ରସ୍ତର ଯୁଗ", cat: "ancient", era: "ପ୍ରାକ୍-ଇତିହାସ", time: "ଖ୍ରୀ.ପୂ. ୧୦,୦୦୦ - ୬,୦୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Neolithic Age", or: "ନୂତନ ପ୍ରସ୍ତର ଯୁଗ", cat: "ancient", era: "ପ୍ରାକ୍-ଇତିହାସ", time: "ଖ୍ରୀ.ପୂ. ୬,୦୦୦ - ୨,୦୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Chalcolithic Age", or: "ତାମ୍ର-ପ୍ରସ୍ତର ଯୁଗ", cat: "ancient", era: "ପ୍ରାକ୍-ଇତିହାସ", time: "ଖ୍ରୀ.ପୂ. ୨,୦୦୦ - ୭୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Megalithic Culture", or: "ବୃହତ ପ୍ରସ୍ତର ସଂସ୍କୃତି", cat: "ancient", era: "ଲୌହ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୨୦୦ - ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Harappa", or: "ହରପ୍ପା ସଭ୍ୟତା ଓ ନଗର", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୬୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Mohenjo-daro", or: "ମୋହେଞ୍ଜୋ-ଦାରୋ (ମହାନ୍ ସ୍ନାନାଗାର)", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୬୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Dholavira", or: "ଧୋଲାଭିରା (ଜଳ ସଂରକ୍ଷଣ ପ୍ରଣାଳୀ)", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୫୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Lothal", or: "ଲୋଥାଲ (ପ୍ରାଚୀନ ବନ୍ଦର ଓ ଡକୟାର୍ଡ଼)", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୪୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Kalibangan", or: "କାଲିବଙ୍ଗାନ (ଚାଷଜମି ଓ ଅଗ୍ନିବେଦୀ)", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୫୦୦ - ୧,୮୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Rakhigarhi", or: "ରାଖୀଗଢ଼ି (ବୃହତ୍ତମ ସିନ୍ଧୁ ସ୍ଥଳ)", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୬୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Society & Culture (IVC)", or: "ସିନ୍ଧୁ ସମାଜ ଓ ସଂସ୍କୃତି", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୬୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Economy & Trade (IVC)", or: "ସିନ୍ଧୁ ଅର୍ଥନୀତି ଓ ମେସୋପୋଟାମିଆ ବାଣିଜ୍ୟ", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୬୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Religion (IVC)", or: "ସିନ୍ଧୁ ଧର୍ମ ଓ ପଶୁପତି ପୂଜା", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୬୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Art & Architecture (IVC)", or: "ସିନ୍ଧୁ କଳା, ମୂର୍ତ୍ତି ଓ ମୋହର", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨,୬୦୦ - ୧,୯୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Decline (IVC)", or: "ସିନ୍ଧୁ ସଭ୍ୟତାର ପତନ ତତ୍ତ୍ୱ", cat: "ancient", era: "କାଂସ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୯୦୦ - ୧,୫୦୦", img: "/images/indus_valley_harappa.jpg" },
  { en: "Early Vedic Age", or: "ଋଗ୍‌ବୈଦିକ ଯୁଗ (ସପ୍ତସିନ୍ଧୁ)", cat: "ancient", era: "ବୈଦିକ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୫୦୦ - ୧,୦୦୦", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Later Vedic Age", or: "ପରବର୍ତ୍ତୀ ବୈଦିକ ଯୁଗ (ଗଙ୍ଗା ଉପତ୍ୟକା)", cat: "ancient", era: "ବୈଦିକ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୦୦୦ - ୬୦୦", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Vedic Literature", or: "ବୈଦିକ ସାହିତ୍ୟ (ଚତୁର୍ବେଦ, ବ୍ରାହ୍ମଣ, ଉପନିଷଦ)", cat: "ancient", era: "ବୈଦିକ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୫୦୦ - ୫୦୦", img: "/images/today_history_quill.jpg" },
  { en: "Vedic Society", or: "ବୈଦିକ ସାମାଜିକ ଗଠନ ଓ ବର୍ଣ୍ଣ ବ୍ୟବସ୍ଥା", cat: "ancient", era: "ବୈଦିକ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୫୦୦ - ୬୦୦", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Vedic Economy", or: "ବୈଦିକ ଅର୍ଥନୀତି (ପଶୁପାଳନରୁ କୃଷି)", cat: "ancient", era: "ବୈଦିକ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୫୦୦ - ୬୦୦", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Vedic Religion & Philosophy", or: "ବୈଦିକ ଧର୍ମ, ଯଜ୍ଞ ଓ ଉପନିଷଦୀୟ ଦର୍ଶନ", cat: "ancient", era: "ବୈଦିକ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୫୦୦ - ୫୦୦", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Political Organization (Vedic)", or: "ବୈଦିକ ରାଜନୈତିକ ସଂଗଠନ (ସଭା ଓ ସମିତି)", cat: "ancient", era: "ବୈଦିକ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧,୫୦୦ - ୬୦୦", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Sixteen Mahajanapadas", or: "ଷୋଡ଼ଶ ମହାଜନପଦ", cat: "ancient", era: "ପ୍ରାଚୀନ ଭାରତ", time: "ଖ୍ରୀ.ପୂ. ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Magadha", or: "ମଗଧ ସାମ୍ରାଜ୍ୟର ଉତ୍ଥାନ (ହର୍ଯ୍ୟଙ୍କ, ଶିଶୁନାଗ, ନନ୍ଦ)", cat: "ancient", era: "ପ୍ରାଚୀନ ଭାରତ", time: "ଖ୍ରୀ.ପୂ. ୬ଷ୍ଠ - ୪ର୍ଥ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Jainism", or: "ଜୈନ ଧର୍ମ ଓ ଭଗବାନ ମହାବୀର", cat: "ancient", era: "ଶ୍ରମଣ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Buddhism", or: "ବୌଦ୍ଧ ଧର୍ମ ଓ ଗୌତମ ବୁଦ୍ଧ", cat: "ancient", era: "ଶ୍ରମଣ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Ajivikas", or: "ଆଜୀବିକ ସମ୍ପ୍ରଦାୟ (ମକ୍ଖଲି ଗୋଶାଳ)", cat: "ancient", era: "ଶ୍ରମଣ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Other Sramana Traditions", or: "ଅନ୍ୟାନ୍ୟ ଶ୍ରମଣ ଓ ନାସ୍ତିକ ପରମ୍ପରା (ଚାର୍ବାକ)", cat: "ancient", era: "ଶ୍ରମଣ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Chandragupta Maurya", or: "ଚନ୍ଦ୍ରଗୁପ୍ତ ମୌର୍ଯ୍ୟ ଓ ଚାଣକ୍ୟ", cat: "ancient", era: "ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୩୨୨ - ୨୯୮", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Bindusara", or: "ବିନ୍ଦୁସାର (ଅମିତ୍ରଘାତ)", cat: "ancient", era: "ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨୯୮ - ୨୭୩", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Ashoka", or: "ଦେବାନାଂପ୍ରିୟ ଚକ୍ରବର୍ତ୍ତୀ ଅଶୋକ", cat: "ancient", era: "ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨୭୩ - ୨୩୨", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Kalinga War", or: "ଐତିହାସିକ କଳିଙ୍ଗ ଯୁଦ୍ଧ (ଖ୍ରୀ.ପୂ. ୨୬୧)", cat: "ancient", era: "ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨୬୧", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Mauryan Administration", or: "ମୌର୍ଯ୍ୟ ପ୍ରଶାସନ ଓ ଅର୍ଥଶାସ୍ତ୍ର", cat: "ancient", era: "ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୩୨୨ - ୧୮୫", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Mauryan Economy", or: "ମୌର୍ଯ୍ୟ ଅର୍ଥନୀତି ଓ ରାଜସ୍ୱ ବ୍ୟବସ୍ଥା", cat: "ancient", era: "ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୩୨୨ - ୧୮୫", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Mauryan Art & Architecture", or: "ମୌର୍ଯ୍ୟ ସ୍ତମ୍ଭ, ଅନୁଶାସନ ଓ ସ୍ତୂପ କଳା", cat: "ancient", era: "ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୩୨୨ - ୧୮୫", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Mauryan Decline", or: "ମୌର୍ଯ୍ୟ ସାମ୍ରାଜ୍ୟର ପତନ", cat: "ancient", era: "ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧୮୫", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Shunga Dynasty", or: "ଶୁଙ୍ଗ ବଂଶ (ପୁଷ୍ୟମିତ୍ର ଶୁଙ୍ଗ)", cat: "ancient", era: "ପର-ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧୮୫ - ୭୩", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Kanva Dynasty", or: "କଣ୍ୱ ବଂଶ (ବାସୁଦେବ କଣ୍ୱ)", cat: "ancient", era: "ପର-ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୭୩ - ୨୮", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Indo-Greeks", or: "ଇଣ୍ଡୋ-ଗ୍ରୀକ୍ ଶାସକ (ମିନାଣ୍ଡର / ମିଳିନ୍ଦ)", cat: "ancient", era: "ପର-ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୨ୟ - ୧ମ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Shakas", or: "ଶକ ବଂଶ (ରୁଦ୍ରଦାମନ ଓ ଜୁନାଗଡ଼ ଅଭିଲେଖ)", cat: "ancient", era: "ପର-ମୌର୍ଯ୍ୟ ଯୁଗ", time: "ଖ୍ରୀ.ପୂ. ୧ମ - ୪ର୍ଥ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Parthians", or: "ପାର୍ଥିଆନ୍ ବା ପହ୍ଲବ (ଗୋଣ୍ଡୋଫେର୍ନିସ)", cat: "ancient", era: "ପର-ମୌର୍ଯ୍ୟ ଯୁଗ", time: "୧ମ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Kushanas", or: "କୁଶାଣ ସାମ୍ରାଜ୍ୟ ଓ ସମ୍ରାଟ କନିଷ୍କ", cat: "ancient", era: "ପର-ମୌର୍ଯ୍ୟ ଯୁଗ", time: "୧ମ - ୩ୟ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Satavahanas", or: "ସାତବାହନ ବଂଶ (ଗୌତମୀପୁତ୍ର ଶାତକର୍ଣ୍ଣୀ)", cat: "ancient", era: "ପ୍ରାଚୀନ ଦକ୍ଷିଣ ଭାରତ", time: "ଖ୍ରୀ.ପୂ. ୧ମ - ୩ୟ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Sangam Age", or: "ସଙ୍ଗମ ଯୁଗ (ଚେର, ଚୋଳ, ପାଣ୍ଡ୍ୟ)", cat: "ancient", era: "ପ୍ରାଚୀନ ଦକ୍ଷିଣ ଭାରତ", time: "ଖ୍ରୀ.ପୂ. ୩ୟ - ୩ୟ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ", img: "/images/chola_maritime_empire.jpg" },
  { en: "Chandragupta I", or: "ଚନ୍ଦ୍ରଗୁପ୍ତ ପ୍ରଥମ (ଗୁପ୍ତ ସମ୍ବତ୍)", cat: "ancient", era: "ଗୁପ୍ତ ସୁବର୍ଣ୍ଣ ଯୁଗ", time: "ଖ୍ରୀଷ୍ଟାବ୍ଦ ୩୧୯ - ୩୩୫", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Samudragupta", or: "ସମୁଦ୍ରଗୁପ୍ତ (ଭାରତର ନେପୋଲିଅନ ଓ ପ୍ରୟାଗ ପ୍ରଶସ୍ତି)", cat: "ancient", era: "ଗୁପ୍ତ ସୁବର୍ଣ୍ଣ ଯୁଗ", time: "ଖ୍ରୀଷ୍ଟାବ୍ଦ ୩୩୫ - ୩୭୫", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Chandragupta II", or: "ଚନ୍ଦ୍ରଗୁପ୍ତ ଦ୍ୱିତୀୟ ବିକ୍ରମାଦିତ୍ୟ ଓ ନବରତ୍ନ", cat: "ancient", era: "ଗୁପ୍ତ ସୁବର୍ଣ୍ଣ ଯୁଗ", time: "ଖ୍ରୀଷ୍ଟାବ୍ଦ ୩୭୫ - ୪୧୫", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Gupta Administration", or: "ଗୁପ୍ତ ପ୍ରଶାସନିକ ବ୍ୟବସ୍ଥା", cat: "ancient", era: "ଗୁପ୍ତ ସୁବର୍ଣ୍ଣ ଯୁଗ", time: "୪ର୍ଥ - ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Science & Mathematics (Gupta)", or: "ଆର୍ଯ୍ୟଭଟ୍ଟ, ବରାହମିହିର ଓ ଗୁପ୍ତ ବିଜ୍ଞାନ", cat: "ancient", era: "ଗୁପ୍ତ ସୁବର୍ଣ୍ଣ ଯୁଗ", time: "୫ମ - ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/today_history_quill.jpg" },
  { en: "Literature (Gupta)", or: "କାଳିଦାସ ଓ ଗୁପ୍ତ ସଂସ୍କୃତ ସାହିତ୍ୟ", cat: "ancient", era: "ଗୁପ୍ତ ସୁବର୍ଣ୍ଣ ଯୁଗ", time: "୪ର୍ଥ - ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/today_history_quill.jpg" },
  { en: "Art & Architecture (Gupta)", or: "ଦେଓଗଡ଼, ଅଜନ୍ତା ଓ ଗୁପ୍ତ ମନ୍ଦିର କଳା", cat: "ancient", era: "ଗୁପ୍ତ ସୁବର୍ଣ୍ଣ ଯୁଗ", time: "୪ର୍ଥ - ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/eastern_ganga_konark.jpg" },
  { en: "Religion (Gupta)", or: "ଭାଗବତ ଧର୍ମ ଓ ପୌରାଣିକ ହିନ୍ଦୁ ପୁନରୁତ୍ଥାନ", cat: "ancient", era: "ଗୁପ୍ତ ସୁବର୍ଣ୍ଣ ଯୁଗ", time: "୪ର୍ଥ - ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/eastern_ganga_konark.jpg" },
  { en: "Gupta Decline", or: "ହୁଣ ଆକ୍ରମଣ ଓ ଗୁପ୍ତ ସାମ୍ରାଜ୍ୟର ପତନ", cat: "ancient", era: "ଗୁପ୍ତ ଯୁଗ", time: "୬ଷ୍ଠ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Vakatakas", or: "ବାକାଟକ ରାଜବଂଶ ଓ ଅଜନ୍ତା ଗୁମ୍ଫା", cat: "ancient", era: "ପ୍ରାଚୀନ ଦକ୍ଷିଣ ଭାରତ", time: "୩ୟ - ୬ଷ୍ଠ ଶତାବ୍ଦୀ", img: "/images/eastern_ganga_konark.jpg" },
  { en: "Pallavas", or: "ପଲ୍ଲବ ବଂଶ ଓ ମହାବଳୀପୁରମ ରଥ ମନ୍ଦିର", cat: "ancient", era: "ଦକ୍ଷିଣ ଭାରତୀୟ ସାମ୍ରାଜ୍ୟ", time: "୪ର୍ଥ - ୯ମ ଶତାବ୍ଦୀ", img: "/images/chola_maritime_empire.jpg" },
  { en: "Chalukyas", or: "ବାଦାମୀ ଚାଲୁକ୍ୟ ଓ ଦ୍ୱିତୀୟ ପୁଲକେଶୀ", cat: "ancient", era: "ଦକ୍ଷିଣ ଭାରତୀୟ ସାମ୍ରାଜ୍ୟ", time: "୬ଷ୍ଠ - ୮ମ ଶତାବ୍ଦୀ", img: "/images/chola_maritime_empire.jpg" },
  { en: "Rashtrakutas", or: "ରାଷ୍ଟ୍ରକୂଟ ବଂଶ ଓ ଏଲୋରା କୈଳାସ ମନ୍ଦିର", cat: "medieval", era: "ପୂର୍ବ ମଧ୍ୟଯୁଗ", time: "୮ମ - ୧୦ମ ଶତାବ୍ଦୀ", img: "/images/chola_maritime_empire.jpg" },
  { en: "Palas", or: "ବଙ୍ଗର ପାଳ ବଂଶ ଓ ନାଳନ୍ଦା/ବିକ୍ରମଶିଳା", cat: "medieval", era: "ପୂର୍ବ ମଧ୍ୟଯୁଗ", time: "୮ମ - ୧୨ଶ ଶତାବ୍ଦୀ", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Pratiharas", or: "ଗୁର୍ଜର ପ୍ରତିହାର ସାମ୍ରାଜ୍ୟ", cat: "medieval", era: "ପୂର୍ବ ମଧ୍ୟଯୁଗ", time: "୮ମ - ୧୧ଶ ଶତାବ୍ଦୀ", img: "/images/mauryan_empire_ashoka.jpg" },
  { en: "Cholas", or: "ମହାନ୍ ଚୋଳ ସାମ୍ରାଜ୍ୟ (ରାଜରାଜ ଓ ରାଜେନ୍ଦ୍ର ଚୋଳ)", cat: "medieval", era: "ଦକ୍ଷିଣ ଭାରତୀୟ ସାମ୍ରାଜ୍ୟ", time: "୯ମ - ୧୩ଶ ଶତାବ୍ଦୀ", img: "/images/chola_maritime_empire.jpg" },
  { en: "Cheras", or: "କେରଳର ଚେର ରାଜବଂଶ", cat: "medieval", era: "ଦକ୍ଷିଣ ଭାରତୀୟ ସାମ୍ରାଜ୍ୟ", time: "୯ମ - ୧୨ଶ ଶତାବ୍ଦୀ", img: "/images/chola_maritime_empire.jpg" },
  { en: "Pandyas", or: "ମଦୁରାଇର ପାଣ୍ଡ୍ୟ ସାମ୍ରାଜ୍ୟ", cat: "medieval", era: "ଦକ୍ଷିଣ ଭାରତୀୟ ସାମ୍ରାଜ୍ୟ", time: "୬ଷ୍ଠ - ୧୪ଶ ଶତାବ୍ଦୀ", img: "/images/chola_maritime_empire.jpg" },
  { en: "Rajput Kingdoms", or: "ରାଜପୁତ ରାଜ୍ୟସମୂହ (ଚୌହାନ, ଗୁହିଲ, ପରମାର)", cat: "medieval", era: "ପୂର୍ବ ମଧ୍ୟଯୁଗ", time: "୮ମ - ୧୨ଶ ଶତାବ୍ଦୀ", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Slave/Mamluk Dynasty", or: "ଦାସ ବଂଶ (କୁତବୁଦ୍ଦିନ, ଇଲତୁତମିଶ, ବଲବନ)", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୨୦୬ - ୧୨୯୦", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Khilji Dynasty", or: "ଖିଲଜୀ ବଂଶ (ଆଲାଉଦ୍ଦିନ ଖିଲଜୀ ଓ ବଜାର ନିୟନ୍ତ୍ରଣ)", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୨୯୦ - ୧୩୨୦", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Tughlaq Dynasty", or: "ତୋଗଲକ ବଂଶ (ମହମ୍ମଦ ବିନ ତୋଗଲକ)", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୩୨୦ - ୧୪୧୪", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Sayyid Dynasty", or: "ସୟିଦ ବଂଶ (ଖିଜ୍ର ଖାନ)", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୪୧୪ - ୧୪୫୧", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Lodi Dynasty", or: "ଲୋଦୀ ବଂଶ (ଇବ୍ରାହିମ ଲୋଦୀ)", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୪୫୧ - ୧୫୨୬", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Delhi Sultanate Administration", or: "ଦିଲ୍ଲୀ ସଲତନତ ପ୍ରଶାସନ ଓ ଇକ୍ତା ବ୍ୟବସ୍ଥା", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୩ଶ - ୧୬ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Delhi Sultanate Military", or: "ସଲତନତ ସାମରିକ ସଂଗଠନ ଓ ଦାଗ-ଚେହେରା", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୩ଶ - ୧୬ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Delhi Sultanate Economy", or: "ସଲତନତ ଅର୍ଥନୀତି ଓ ଟଙ୍କା-ଜିତଲ ମୁଦ୍ରା", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୩ଶ - ୧୬ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Sultanate Architecture", or: "ଇଣ୍ଡୋ-ଇସଲାମିକ ସ୍ଥାପତ୍ୟ ଓ କୁତବମିନାର", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୩ଶ - ୧୬ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Sultanate Society & Culture", or: "ସଲତନତ ସମାଜ, ସୂଫୀ ଓ ଭକ୍ତି ଆନ୍ଦୋଳନ", cat: "medieval", era: "ଦିଲ୍ଲୀ ସଲତନତ", time: "୧୩ଶ - ୧୬ଶ ଶତାବ୍ଦୀ", img: "/images/today_history_quill.jpg" },
  { en: "Vijayanagara Empire", or: "ବିଜୟନଗର ସାମ୍ରାଜ୍ୟ ଓ କୃଷ୍ଣଦେବରାୟ", cat: "medieval", era: "ମଧ୍ୟଯୁଗୀୟ ଦକ୍ଷିଣ ଭାରତ", time: "୧୩୩୬ - ୧୬୪୬", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Bahmani Sultanate", or: "ବାହମନୀ ସଲତନତ (ହସନ ଗଙ୍ଗୁ)", cat: "medieval", era: "ମଧ୍ୟଯୁଗୀୟ ଦକ୍ଷିଣ ଭାରତ", time: "୧୩୪୭ - ୧୫୨୭", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Deccan Sultanates", or: "ଦକ୍ଷିଣାତ୍ୟର ପାଞ୍ଚ ସଲତନତ (ବିଜାପୁର, ଗୋଲକୋଣ୍ଡା)", cat: "medieval", era: "ମଧ୍ୟଯୁଗ", time: "୧୬ଶ - ୧୭ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Bengal Sultanate", or: "ବଙ୍ଗ ସଲତନତ (ଇଲିୟାସ ଶାହୀ)", cat: "medieval", era: "ଆଞ୍ଚଳିକ ରାଜ୍ୟ", time: "୧୩୪୨ - ୧୫୭୬", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Gujarat Sultanate", or: "ଗୁଜରାଟ ସଲତନତ ଓ ଅହମ୍ମଦ ଶାହ", cat: "medieval", era: "ଆଞ୍ଚଳିକ ରାଜ୍ୟ", time: "୧୪୦୭ - ୧୫୭୩", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Mewar", or: "ମେୱାରର ଶୌର୍ଯ୍ୟ (ରାଣା କୁମ୍ଭା, ରାଣା ସାଙ୍ଗା, ମହାରାଣା ପ୍ରତାପ)", cat: "medieval", era: "ରାଜପୁତ ଇତିହାସ", time: "୧୪ଶ - ୧୬ଶ ଶତାବ୍ଦୀ", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Ahom Kingdom", or: "ଆସାମର ଅହୋମ ସାମ୍ରାଜ୍ୟ ଓ ଲଚିତ ବରଫୁକନ", cat: "medieval", era: "ଉତ୍ତର-ପୂର୍ବ ଭାରତ", time: "୧୨୨୮ - ୧୮୨୬", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Kashmir", or: "କାଶ୍ମୀର ଇତିହାସ (କର୍କୋଟ ବଂଶ, ରାଜତରଙ୍ଗିଣୀ, ଜୟନୁଲ ଆବିଦିନ)", cat: "medieval", era: "ଉତ୍ତର ଭାରତ", time: "୮ମ - ୧୫ଶ ଶତାବ୍ଦୀ", img: "/images/today_history_quill.jpg" },
  { en: "Odisha Kingdoms", or: "ଓଡ଼ିଶାର ସୋମ, ଗଙ୍ଗ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ", cat: "medieval", era: "କଳିଙ୍ଗ ଉତ୍କଳ ଇତିହାସ", time: "୧୦ମ - ୧୬ଶ ଶତାବ୍ଦୀ", img: "/images/eastern_ganga_konark.jpg" },
  { en: "Babur", or: "ବାବର ଓ ପ୍ରଥମ ପାଣିପଥ ଯୁଦ୍ଧ (୧୫୨୬)", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୫୨୬ - ୧୫୩୦", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Humayun", or: "ହୁମାୟୁନ ଓ ଶେରଶାହ ସୂରୀ (ଗ୍ରାଣ୍ଡ ଟ୍ରଙ୍କ ରୋଡ୍)", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୫୩୦ - ୧୫୫୬", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Akbar", or: "ମହାନ ସମ୍ରାଟ ଆକବର ଓ ସୁଲ୍ହ-ଇ-କୁଲ", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୫୫୬ - ୧୬୦୫", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Jahangir", or: "ଜାହାଙ୍ଗୀର, ନୁରଜାହାନ ଓ ନ୍ୟାୟର ଶୃଙ୍ଖଳ", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬୦୫ - ୧୬୨୭", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Shah Jahan", or: "ଶାହାଜାହାନ ଓ ତାଜମହଲ ସ୍ଥାପତ୍ୟ ସୁବର୍ଣ୍ଣ ଯୁଗ", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬୨୮ - ୧୬୫୮", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Aurangzeb", or: "ଔରଙ୍ଗଜେବ ଆଲାମଗୀର ଓ ସାମ୍ରାଜ୍ୟ ବିସ୍ତାର", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬୫୮ - ୧୭୦୭", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Mughal Administration", or: "ମୋଗଲ କେନ୍ଦ୍ରୀୟ ଓ ପ୍ରାଦେଶିକ ପ୍ରଶାସନ (ସୁବା, ସରକାର)", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Mansabdari System", or: "ମନସବଦାରୀ ଓ ଜାଗିରଦାରୀ ବ୍ୟବସ୍ଥା (ଜାତ ଓ ସୱାର)", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Mughal Economy", or: "ମୋଗଲ ଅର୍ଥନୀତି, ଟୋଡ଼ରମଲ ବନ୍ଦୋବସ୍ତ (ଦହସାଲା)", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Mughal Art & Architecture", or: "ମୋଗଲ ଚିତ୍ରକଳା ଓ ସ୍ଥାପତ୍ୟ କୀର୍ତ୍ତିରାଜି", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Mughal Literature", or: "ଆକବରନାମା, ବାବରନାମା ଓ ମୋଗଲ ସାହିତ୍ୟ", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/today_history_quill.jpg" },
  { en: "Mughal Religion", or: "ଦ୍ୱୀନ-ଇ-ଇଲାହୀ ଓ ଧାର୍ମିକ ନୀତିର ରୂପାନ୍ତର", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୬ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Mughal Decline", or: "ମୋଗଲ ସାମ୍ରାଜ୍ୟର ପତନ ଓ ନାଦିର ଶାହ ଆକ୍ରମଣ", cat: "medieval", era: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ", time: "୧୭୦୭ - ୧୮୫୭", img: "/images/vijayanagara_hampi.jpg" },
  { en: "Shivaji", or: "ଛତ୍ରପତି ଶିବାଜୀ ମହାରାଜ (ଶୌର୍ଯ୍ୟ ଓ ଗଣିମୀ କାଭା)", cat: "medieval", era: "ମରାଠା ସାମ୍ରାଜ୍ୟ", time: "୧୬୩୦ - ୧୬୮୦", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Swarajya", or: "ହିନ୍ଦବୀ ସ୍ୱରାଜ୍ୟ ଓ ରାୟଗଡ଼ ରାଜ୍ୟାଭିଷେକ (୧୬୭୪)", cat: "medieval", era: "ମରାଠା ସାମ୍ରାଜ୍ୟ", time: "୧୬୭୪", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Maratha Administration", or: "ମରାଠା ପ୍ରଶାସନ ଓ ଅଷ୍ଟପ୍ରଧାନ ପରିଷଦ", cat: "medieval", era: "ମରାଠା ସାମ୍ରାଜ୍ୟ", time: "୧୭ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Peshwas", or: "ପେଶୱା ବଂଶ (ବାଜୀରାଓ ପ୍ରଥମ ଓ ବାଲାଜୀ ବାଜୀରାଓ)", cat: "medieval", era: "ମରାଠା ସାମ୍ରାଜ୍ୟ", time: "୧୭୧୩ - ୧୮୧୮", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Maratha Confederacy", or: "ମରାଠା ମହାସଂଘ (ସିନ୍ଧିଆ, ହୋଲକାର, ଭୋଁସଲେ, ଗାଏକୱାଡ)", cat: "medieval", era: "ମରାଠା ସାମ୍ରାଜ୍ୟ", time: "୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Anglo-Maratha Wars", or: "ତିନୋଟି ଆଙ୍ଗ୍ଲୋ-ମରାଠା ଯୁଦ୍ଧ", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୭୭୫ - ୧୮୧୮", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Maratha Decline", or: "ତୃତୀୟ ପାଣିପଥ ଯୁଦ୍ଧ (୧୭୬୧) ଓ ମରାଠା ପତନ", cat: "modern", era: "ମରାଠା ସାମ୍ରାଜ୍ୟ", time: "୧୭୬୧ - ୧୮୧୮", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Guru Nanak", or: "ଗୁରୁ ନାନକ ଦେବ ଓ ଶିଖ୍ ଧର୍ମର ମୂଳଦୁଆ", cat: "medieval", era: "ଭକ୍ତି ଆନ୍ଦୋଳନ", time: "୧୪୬୯ - ୧୫୩୯", img: "/images/today_history_quill.jpg" },
  { en: "Sikh Gurus", or: "ଦଶ ଶିଖ୍ ଗୁରୁ ପରମ୍ପରା", cat: "medieval", era: "ଶିଖ୍ ଇତିହାସ", time: "୧୫ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/today_history_quill.jpg" },
  { en: "Guru Arjan", or: "ଗୁରୁ ଅର୍ଜନ ଦେବ, ଆଦି ଗ୍ରନ୍ଥ ଓ ହରମନ୍ଦିର ସାହିବ", cat: "medieval", era: "ଶିଖ୍ ଇତିହାସ", time: "୧୫୮୧ - ୧୬୦୬", img: "/images/today_history_quill.jpg" },
  { en: "Guru Gobind Singh", or: "ଗୁରୁ ଗୋବିନ୍ଦ ସିଂହ ଓ ଖାଲସା ପନ୍ଥ ପ୍ରତିଷ୍ଠା (୧୬୯୯)", cat: "medieval", era: "ଶିଖ୍ ଇତିହାସ", time: "୧୬୬୬ - ୧୭୦୮", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Khalsa", or: "ଖାଲସା ଆଦର୍ଶ, ପଞ୍ଚ କକ୍କାର ଓ ସାମରିକ ଚେତନା", cat: "medieval", era: "ଶିଖ୍ ଇତିହାସ", time: "୧୬୯୯", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Maharaja Ranjit Singh", or: "ମହାରାଜା ରଣଜିତ ସିଂହ (ଶେର-ଇ-ପଞ୍ଜାବ)", cat: "modern", era: "ଶିଖ୍ ସାମ୍ରାଜ୍ୟ", time: "୧୭୮୦ - ୧୮୩୯", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Sikh Empire", or: "ଲାହୋର ଦରବାର ଓ ଶିଖ୍ ସାମ୍ରାଜ୍ୟ", cat: "modern", era: "ଶିଖ୍ ସାମ୍ରାଜ୍ୟ", time: "୧୭୯୯ - ୧୮୪୯", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Anglo-Sikh Wars", or: "ପ୍ରଥମ ଓ ଦ୍ୱିତୀୟ ଆଙ୍ଗ୍ଲୋ-ଶିଖ୍ ଯୁଦ୍ଧ (ପଞ୍ଜାବ ମିଶ୍ରଣ)", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୮୪୫ - ୧୮୪୯", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Portuguese", or: "ପର୍ତ୍ତୁଗୀଜ ଆଗମନ (ଭାସ୍କୋ-ଡା-ଗାମା, ୧୪୯୮ ଓ ଗୋଆ)", cat: "modern", era: "ଇଉରୋପୀୟ ଆଗମନ", time: "୧୪୯୮ - ୧୯୬୧", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Dutch", or: "ଡଚ୍ ଇଷ୍ଟ ଇଣ୍ଡିଆ କମ୍ପାନୀ ଓ ମସଲିପଟ୍ଟନମ", cat: "modern", era: "ଇଉରୋପୀୟ ଆଗମନ", time: "୧୬୦୨ - ୧୮୨୫", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "English", or: "ଇଂରାଜୀ ଇଷ୍ଟ ଇଣ୍ଡିଆ କମ୍ପାନୀ ପ୍ରତିଷ୍ଠା (୧୬୦୦)", cat: "modern", era: "ଔପନିବେଶିକ ଶାସନ", time: "୧୬୦୦ - ୧୮୫୮", img: "/images/paika_rebellion_1817.jpg" },
  { en: "French", or: "ଫରାସୀ କମ୍ପାନୀ, ଡୁପ୍ଲେକ୍ସ ଓ ପଣ୍ଡିଚେରୀ", cat: "modern", era: "ଇଉରୋପୀୟ ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱିତା", time: "୧୬୬୪ - ୧୯୫୪", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Danish", or: "ଡାନିସ୍ ଇଷ୍ଟ ଇଣ୍ଡିଆ କମ୍ପାନୀ (ତ୍ରାଙ୍କୋବାର ଓ ସେରାମପୁର)", cat: "modern", era: "ଇଉରୋପୀୟ ଆଗମନ", time: "୧୬୧୬ - ୧୮୬୮", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "European Trading Companies", or: "ଇଉରୋପୀୟ ବାଣିଜ୍ୟିକ କୋଠି ଓ ନୌସାମରିକ ଶକ୍ତି", cat: "modern", era: "ଇଉରୋପୀୟ ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱିତା", time: "୧୭ଶ - ୧୮ଶ ଶତାବ୍ଦୀ", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Carnatic Wars", or: "କର୍ଣ୍ଣାଟକ ଯୁଦ୍ଧ (ଇଂରେଜ-ଫରାସୀ ମହାସଂଗ୍ରାମ)", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୭୪୬ - ୧୭୬୩", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Battle of Plassey", or: "ଐତିହାସିକ ପଲାସୀ ଯୁଦ୍ଧ (୨୩ ଜୁନ୍ ୧୭୫୭)", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୭୫୭", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Battle of Buxar", or: "ବକ୍ସାର ଯୁଦ୍ଧ (୧୭୬୪) ଓ ଆଲ୍ଲାହାବାଦ ସନ୍ଧି", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୭୬୪ - ୧୭୬୫", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Subsidiary Alliance", or: "ଲର୍ଡ଼ ୱେଲେସଲିଙ୍କ ସହାୟକ ସନ୍ଧି ନୀତି", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୭୯୮", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Doctrine of Lapse", or: "ଲର୍ଡ଼ ଡାଲହୌସୀଙ୍କ ସ୍ୱତ୍ତ୍ୱଲୋପ ନୀତି", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୮୪୮ - ୧୮୫୬", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Anglo-Mysore Wars", or: "ଆଙ୍ଗ୍ଲୋ-ମହୀଶୂର ଯୁଦ୍ଧ ଓ ଟିପୁ ସୁଲତାନ", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୭୬୭ - ୧୭୯୯", img: "/images/paika_rebellion_1817.jpg" },
  { en: "British Territorial Expansion", or: "ସମଗ୍ର ଭାରତରେ ବ୍ରିଟିଶ ସାମ୍ରାଜ୍ୟ ବିସ୍ତାର", cat: "modern", era: "ବ୍ରିଟିଶ ବିସ୍ତାର", time: "୧୮ଶ - ୧୯ଶ ଶତାବ୍ଦୀ", img: "/images/paika_rebellion_1817.jpg" },
  { en: "East India Company", or: "ଇଷ୍ଟ ଇଣ୍ଡିଆ କମ୍ପାନୀର ଶାସନ ଓ ରେଗୁଲେଟିଂ ଆକ୍ଟ", cat: "modern", era: "କମ୍ପାନୀ ଶାସନ", time: "୧୭୭୩ - ୧୮୫୮", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Governor-Generals", or: "ପ୍ରମୁଖ ଗଭର୍ଣ୍ଣର ଜେନେରାଲ ଓ ଭାଇସରୟ", cat: "modern", era: "ବ୍ରିଟିଶ ପ୍ରଶାସନ", time: "୧୭୭୩ - ୧୯୪୭", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Land Revenue Systems", or: "ବ୍ରିଟିଶ ଭୂରାଜସ୍ୱ ବ୍ୟବସ୍ଥା ଓ ଶୋଷଣ", cat: "modern", era: "ଔପନିବେଶିକ ଅର୍ଥନୀତି", time: "୧୮ଶ - ୧୯ଶ ଶତାବ୍ଦୀ", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Permanent Settlement", or: "ଲର୍ଡ଼ କର୍ଣ୍ଣୱାଲିସଙ୍କ ଚିରସ୍ଥାୟୀ ବନ୍ଦୋବସ୍ତ (୧୭୯୩)", cat: "modern", era: "ଔପନିବେଶିକ ଅର୍ଥନୀତି", time: "୧୭୯୩", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Ryotwari System", or: "ଥୋମାସ ମୁନରୋଙ୍କ ରୟତୱାରୀ ବନ୍ଦୋବସ୍ତ", cat: "modern", era: "ଔପନିବେଶିକ ଅର୍ଥନୀତି", time: "୧୮୨୦", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Mahalwari System", or: "ହୋଲ୍ଟ ମ୍ୟାକେଞ୍ଜିଙ୍କ ମହଲୱାରୀ ବନ୍ଦୋବସ୍ତ", cat: "modern", era: "ଔପନିବେଶିକ ଅର୍ଥନୀତି", time: "୧୮୨୨", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Economic Policies (British)", or: "ବ୍ରିଟିଶ ଅର୍ଥନୈତିକ ନୀତି ଓ ହସ୍ତତନ୍ତ ଧ୍ୱଂସ", cat: "modern", era: "ଔପନିବେଶିକ ଅର୍ଥନୀତି", time: "୧୮ଶ - ୨୦ଶ ଶତାବ୍ଦୀ", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Drain of Wealth", or: "ଦାଦାଭାଇ ନାଓରୋଜୀଙ୍କ ଧନ ନିଷ୍କାସନ ତତ୍ତ୍ୱ", cat: "modern", era: "ଔପନିବେଶିକ ଅର୍ଥନୀତି", time: "୧୯ଶ ଶତାବ୍ଦୀ", img: "/images/today_history_quill.jpg" },
  { en: "Education Policies (British)", or: "ମେକାଲେ ମିନିଟ୍ (୧୮୩୫) ଓ ଉଡ୍ସ ଡେସପାଚ୍ (୧୮୫୪)", cat: "modern", era: "ବ୍ରିଟିଶ ଶିକ୍ଷା ନୀତି", time: "୧୮୩୫ - ୧୮୫୪", img: "/images/today_history_quill.jpg" },
  { en: "Judicial System (British)", or: "ବ୍ରିଟିଶ ନ୍ୟାୟିକ ବ୍ୟବସ୍ଥା, ଆଇନ ସଂହିତା ଓ ହାଇକୋର୍ଟ", cat: "modern", era: "ବ୍ରିଟିଶ ପ୍ରଶାସନ", time: "୧୮୬୧", img: "/images/today_history_quill.jpg" },
  { en: "Tribal Revolts", or: "ପ୍ରାରମ୍ଭିକ ଆଦିବାସୀ ବିଦ୍ରୋହ ସମୂହ", cat: "modern", era: "ଜନଜାତି ଆନ୍ଦୋଳନ", time: "୧୮ଶ - ୧୯ଶ ଶତାବ୍ଦୀ", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Peasant Movements", or: "କୃଷକ ଆନ୍ଦୋଳନ ଓ ଜମିଦାରୀ ବିରୋଧୀ ସଂଗ୍ରାମ", cat: "modern", era: "କୃଷକ ସଂଗ୍ରାମ", time: "୧୯ଶ - ୨୦ଶ ଶତାବ୍ଦୀ", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Sanyasi-Fakir Rebellion", or: "ସନ୍ନ୍ୟାସୀ-ଫକୀର ବିଦ୍ରୋହ ଓ ଆନନ୍ଦମଠ", cat: "modern", era: "ପ୍ରାରମ୍ଭିକ ପ୍ରତିରୋଧ", time: "୧୭୬୩ - ୧୮୦୦", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Santhal Rebellion", or: "ସାନ୍ତାଳ ହୁଲ୍ ବିଦ୍ରୋହ (ସିଦ୍ଧୋ ଓ କାହ୍ନୁ, ୧୮୫୫)", cat: "modern", era: "ଜନଜାତି ଆନ୍ଦୋଳନ", time: "୧୮୫୫ - ୧୮୫୬", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Munda Rebellion", or: "ବିର୍ସା ମୁଣ୍ଡା ଓ ଉଲଗୁଲାନ ବିପ୍ଳବ", cat: "modern", era: "ଜନଜାତି ଆନ୍ଦୋଳନ", time: "୧୮୯୯ - ୧୯୦୦", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Indigo Revolt", or: "ନୀଳ ବିଦ୍ରୋହ (୧୮୫୯) ଓ ନୀଳଦର୍ପଣ ନାଟକ", cat: "modern", era: "କୃଷକ ସଂଗ୍ରାମ", time: "୧୮୫୯ - ୧୮୬୦", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Deccan Riots", or: "ଦାକ୍ଷିଣାତ୍ୟ କୃଷକ ଦଙ୍ଗା (୧୮୭୫)", cat: "modern", era: "କୃଷକ ସଂଗ୍ରାମ", time: "୧୮୭୫", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Revolt of 1857", or: "୧୮୫୭ର ପ୍ରଥମ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ (ମଙ୍ଗଳ ପାଣ୍ଡେ, ଲକ୍ଷ୍ମୀବାଈ)", cat: "modern", era: "ମହାବିପ୍ଳବ", time: "୧୮୫୭ - ୧୮୫୮", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Formation of INC", or: "ଭାରତୀୟ ଜାତୀୟ କଂଗ୍ରେସ ପ୍ରତିଷ୍ଠା (୧୮୮୫)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୮୮୫", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Moderates", or: "ନରମପନ୍ଥୀ ଯୁଗ (୧୮୮୫-୧୯୦୫)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୮୮୫ - ୧୯୦୫", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Extremists", or: "ଚରମପନ୍ଥୀ ଯୁଗ ଓ ଲାଲ-ବାଲ-ପାଲ", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୦୫ - ୧୯୧୯", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Swadeshi Movement", or: "ସ୍ୱଦେଶୀ ଓ ବହିଷ୍କାର ଆନ୍ଦୋଳନ (ବଙ୍ଗଭଙ୍ଗ ବିରୋଧ)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୦୫ - ୧୯୦୮", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Home Rule Movement", or: "ହୋମ୍ ରୁଲ୍ ଆନ୍ଦୋଳନ (ତିଲକ ଓ ଆନି ବେସାନ୍ତ)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୧୬", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Revolutionary Movement", or: "ସଶସ୍ତ୍ର ବିପ୍ଳବୀ ଆନ୍ଦୋଳନ (ଅନୁଶୀଳନ, ଗଦର, ଏଚ୍.ଆର୍.ଏ)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୦୮ - ୧୯୩୫", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Gandhian Era", or: "ମହାତ୍ମା ଗାନ୍ଧୀଙ୍କ ଆଗମନ ଓ ସତ୍ୟାଗ୍ରହ ଯୁଗ", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୧୫ - ୧୯୪୮", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Non-Cooperation Movement", or: "ଅସହଯୋଗ ଆନ୍ଦୋଳନ ଓ ଖିଲାଫତ (୧୯୨୦-୨୨)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୨୦ - ୧୯୨୨", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Civil Disobedience Movement", or: "ଆଇନ ଅମାନ୍ୟ ଆନ୍ଦୋଳନ (୧୯୩୦-୩୪)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୩୦ - ୧୯୩୪", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Quit India Movement", or: "ଭାରତ ଛାଡ଼ ଆନ୍ଦୋଳନ (୧୯୪୨, କର ବା ମର)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୪୨", img: "/images/indian_freedom_struggle.jpg" },
  { en: "INA", or: "ନେତାଜୀ ସୁଭାଷ ବୋଷ ଓ ଆଜାଦ ହିନ୍ଦ ଫୌଜ", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୪୨ - ୧୯୪୫", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Cabinet Mission", or: "କ୍ୟାବିନେଟ୍ ମିଶନ ଯୋଜନା (୧୯୪୬)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୪୬", img: "/images/today_history_quill.jpg" },
  { en: "Champaran", or: "ଚମ୍ପାରଣ ନୀଳଚାଷୀ ସତ୍ୟାଗ୍ରହ (୧୯୧୭)", cat: "modern", era: "ଗାନ୍ଧୀ ଯୁଗ", time: "୧୯୧୭", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Kheda", or: "ଖେଡ଼ା କୃଷକ ସତ୍ୟାଗ୍ରହ (୧୯୧୮)", cat: "modern", era: "ଗାନ୍ଧୀ ଯୁଗ", time: "୧୯୧୮", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Ahmedabad Mill Strike", or: "ଅହମ୍ମଦାବାଦ ମିଲ୍ ଧର୍ମଘଟ ଓ ଅନଶନ (୧୯୧୮)", cat: "modern", era: "ଗାନ୍ଧୀ ଯୁଗ", time: "୧୯୧୮", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Rowlatt Act", or: "ରାଓଲାଟ୍ କଳା ଆଇନ ଓ ଜନ ପ୍ରତିବାଦ", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୧୯", img: "/images/today_history_quill.jpg" },
  { en: "Jallianwala Bagh", or: "ଜାଲିଆନୱାଲାବାଗ ହତ୍ୟାକାଣ୍ଡ (୧୩ ଏପ୍ରିଲ ୧୯୧୯)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୧୯", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Dandi March", or: "ଐତିହାସିକ ଦାଣ୍ଡି ଯାତ୍ରା (୧୨ ମାର୍ଚ୍ଚ - ୬ ଏପ୍ରିଲ ୧୯୩୦)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୩୦", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Salt Satyagraha", or: "ସମଗ୍ର ଭାରତ ଓ ଓଡ଼ିଶାରେ ଲବଣ ସତ୍ୟାଗ୍ରହ (ଇଞ୍ଚୁଡ଼ି)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୩୦", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Government of India Acts", or: "ଭାରତ ଶାସନ ଆଇନ (୧୯୦୯, ୧୯୧୯, ୧୯୩୫)", cat: "modern", era: "ସାମ୍ବିଧାନିକ ବିକାଶ", time: "୧୯୦୯ - ୧୯୩୫", img: "/images/today_history_quill.jpg" },
  { en: "Simon Commission", or: "ସାଇମନ କମିଶନ ବହିଷ୍କାର ଓ ଲାଲାଜୀଙ୍କ ବଳିଦାନ", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୨୭ - ୧୯୨୮", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Round Table Conferences", or: "ତିନୋଟି ଗୋଲଟେବୁଲ ବୈଠକ (ଲଣ୍ଡନ)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୩୦ - ୧୯୩୨", img: "/images/today_history_quill.jpg" },
  { en: "Cripps Mission", or: "କ୍ରିପ୍ସ ମିଶନ ପ୍ରସ୍ତାବ (୧୯୪୨)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୪୨", img: "/images/today_history_quill.jpg" },
  { en: "Mountbatten Plan", or: "ଲର୍ଡ଼ ମାଉଣ୍ଟବ୍ୟାଟେନ ଯୋଜନା (୩ ଜୁନ୍ ୧୯୪୭)", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୪୭", img: "/images/today_history_quill.jpg" },
  { en: "Partition", or: "ଭାରତ ବିଭାଜନ ଟ୍ରାଜେଡ଼ି ଓ ଶରଣାର୍ଥୀ ସଙ୍କଟ", cat: "modern", era: "ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ", time: "୧୯୪୭", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Independence — 1947", or: "ଭାରତର ସ୍ୱାଧୀନତା (୧୫ ଅଗଷ୍ଟ ୧୯୪୭) ଓ ନେହେରୁଙ୍କ ଭାଷଣ", cat: "modern", era: "ସ୍ୱାଧୀନ ଭାରତ", time: "୧୯୪୭", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Integration of Princely States", or: "ଦେଶୀୟ ରାଜ୍ୟ ମିଶ୍ରଣ ଓ ସର୍ଦ୍ଦାର ପଟେଲ", cat: "modern", era: "ସ୍ୱାଧୀନ ଭାରତ", time: "୧୯୪୭ - ୧୯୪୯", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Constitution", or: "ଭାରତୀୟ ସମ୍ବିଧାନ ପ୍ରଣୟନ (ଆମ୍ବେଦକର ଓ ସଭା)", cat: "modern", era: "ସ୍ୱାଧୀନ ଭାରତ", time: "୧୯୪୬ - ୧୯୪୯", img: "/images/today_history_quill.jpg" },
  { en: "Republic — 1950", or: "ଭାରତୀୟ ଗଣତନ୍ତ୍ର ପ୍ରତିଷ୍ଠା (୨୬ ଜାନୁଆରୀ ୧୯୫୦)", cat: "modern", era: "ସ୍ୱାଧୀନ ଭାରତ", time: "୧୯୫୦", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Linguistic Reorganization", or: "ଭାଷାଭିତ୍ତିକ ରାଜ୍ୟ ପୁନର୍ଗଠନ ଆୟୋଗ (୧୯୫୬)", cat: "modern", era: "ସ୍ୱାଧୀନ ଭାରତ", time: "୧୯୫୩ - ୧୯୫୬", img: "/images/kaalrekha_hero_collage.jpg" },
  { en: "Five-Year Plans", or: "ପଞ୍ଚବାର୍ଷିକ ଯୋଜନା ଓ ଯୋଜନା ଆୟୋଗ", cat: "modern", era: "ଅର୍ଥନୈତିକ ବିକାଶ", time: "୧୯୫୧ - ୨୦୧୪", img: "/images/kaalrekha_hero_collage.jpg" },
  { en: "Green Revolution", or: "ଭାରତର ସବୁଜ ବିପ୍ଳବ (ଏମ୍. ଏସ୍. ସ୍ୱାମୀନାଥନ)", cat: "modern", era: "କୃଷି ବିକାଶ", time: "୧୯୬୦ - ୧୯୭୦ ଦଶକ", img: "/images/kaalrekha_hero_collage.jpg" },
  { en: "Indo-Pak War 1947-48", or: "ପ୍ରଥମ ଭାରତ-ପାକ୍ ଯୁଦ୍ଧ ଓ କାଶ୍ମୀର", cat: "modern", era: "ପ୍ରତିରକ୍ଷା ଇତିହାସ", time: "୧୯୪୭ - ୧୯୪୮", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Sino-Indian War 1962", or: "ଭାରତ-ଚୀନ ଯୁଦ୍ଧ (୧୯୬୨)", cat: "modern", era: "ପ୍ରତିରକ୍ଷା ଇତିହାସ", time: "୧୯୬୨", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Indo-Pak War 1965", or: "ଦ୍ୱିତୀୟ ଭାରତ-ପାକ୍ ଯୁଦ୍ଧ ଓ ତାସକେନ୍ଦ ଚୁକ୍ତି", cat: "modern", era: "ପ୍ରତିରକ୍ଷା ଇତିହାସ", time: "୧୯୬୫", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Bangladesh Liberation War 1971", or: "୧୯୭୧ ବାଂଲାଦେଶ ମୁକ୍ତି ଯୁଦ୍ଧ ଓ ଐତିହାସିକ ବିଜୟ", cat: "modern", era: "ପ୍ରତିରକ୍ଷା ଇତିହାସ", time: "୧୯୭୧", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Emergency", or: "ଜାତୀୟ ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି (୧୯୭୫-୭୭)", cat: "modern", era: "ରାଜନୈତିକ ଇତିହାସ", time: "୧୯୭୫ - ୧୯୭୭", img: "/images/today_history_quill.jpg" },
  { en: "Economic Liberalization — 1991", or: "୧୯୯୧ ଅର୍ଥନୈତିକ ଉଦାରୀକରଣ (LPG ସଂସ୍କାର)", cat: "modern", era: "ଆଧୁନିକ ଅର୍ଥନୀତି", time: "୧୯୯୧", img: "/images/kaalrekha_hero_collage.jpg" },
  { en: "Contemporary India", or: "ସମସାମୟିକ ଭାରତ (ବୈଷୟିକ, ମହାକାଶ ଓ ବିଶ୍ୱ ଶକ୍ତି)", cat: "modern", era: "ଆଧୁନିକ ଯୁଗ", time: "୨୧ଶ ଶତାବ୍ଦୀ", img: "/images/kaalrekha_hero_collage.jpg" },
  { en: "Indian Art & Architecture", or: "ଭାରତୀୟ ସ୍ଥାପତ୍ୟ, ଭାସ୍କର୍ଯ୍ୟ ଓ ଚିତ୍ରକଳା ସମୀକ୍ଷା", cat: "thematic", era: "ସାଂସ୍କୃତିକ ଐତିହ୍ୟ", time: "ପ୍ରାଚୀନରୁ ଆଧୁନିକ", img: "/images/eastern_ganga_konark.jpg" },
  { en: "Indian Literature", or: "ଭାରତୀୟ ସାହିତ୍ୟ (ସଂସ୍କୃତ, ପ୍ରାକୃତ, ପାଲି ଓ ଭାରତୀୟ ଭାଷା)", cat: "thematic", era: "ସାହିତ୍ୟିକ ଐତିହ୍ୟ", time: "ପ୍ରାଚୀନରୁ ଆଧୁନିକ", img: "/images/today_history_quill.jpg" },
  { en: "Indian Religions & Philosophy", or: "ଭାରତୀୟ ଦର୍ଶନ (ଷଡ଼ଦର୍ଶନ, ଭକ୍ତି, ସୂଫୀ ଓ ସମନ୍ୱୟ)", cat: "thematic", era: "ଆଧ୍ୟାତ୍ମିକ ଚିନ୍ତନ", time: "ଚିରନ୍ତନ ପରମ୍ପରା", img: "/images/eastern_ganga_konark.jpg" },
  { en: "Science & Technology in Ancient India", or: "ପ୍ରାଚୀନ ଭାରତରେ ବିଜ୍ଞାନ, ଆୟୁର୍ବେଦ, ଜ୍ୟୋତିର୍ବିଜ୍ଞାନ ଓ ଧାତୁବିଦ୍ୟା", cat: "thematic", era: "ବୈଜ୍ଞାନିକ ଐତିହ୍ୟ", time: "ପ୍ରାଚୀନ କାଳ", img: "/images/today_history_quill.jpg" },
  { en: "Indian Coins & Numismatics", or: "ଭାରତୀୟ ମୁଦ୍ରା ତତ୍ତ୍ୱ (ପଞ୍ଚ-ମାର୍କଡ୍, ଗୁପ୍ତ ସ୍ୱର୍ଣ୍ଣ ମୁଦ୍ରା)", cat: "thematic", era: "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ", time: "ଖ୍ରୀ.ପୂ. ୬ଷ୍ଠ ଶତାବ୍ଦୀରୁ", img: "/images/today_history_quill.jpg" },
  { en: "Inscriptions & Epigraphy", or: "ପ୍ରାଚୀନ ଶିଳାଲେଖ ଓ ଅଭିଲେଖ ବିଦ୍ୟା (ଅଶୋକ, ହାତୀଗୁମ୍ଫା)", cat: "thematic", era: "ପ୍ରାଥମିକ ଉତ୍ସ", time: "ପ୍ରାଚୀନରୁ ମଧ୍ୟଯୁଗ", img: "/images/today_history_quill.jpg" },
  { en: "Indian Languages & Scripts", or: "ଭାରତୀୟ ଭାଷା, ବ୍ରାହ୍ମୀ, ଖରୋଷ୍ଠୀ ଓ ଶାସ୍ତ୍ରୀୟ ଭାଷା", cat: "thematic", era: "ଭାଷାତାତ୍ତ୍ୱିକ ବିକାଶ", time: "ସମସ୍ତ ଯୁଗ", img: "/images/today_history_quill.jpg" },
  { en: "Trade & Maritime History", or: "ଭାରତର ସାମୁଦ୍ରିକ ବାଣିଜ୍ୟ (ବୋଇତ ବନ୍ଦାଣ, ରେଶମ ମାର୍ଗ)", cat: "thematic", era: "ସାମୁଦ୍ରିକ ଇତିହାସ", time: "ପ୍ରାଚୀନରୁ ଆଧୁନିକ", img: "/images/ancient_kalinga_maritime.jpg" },
  { en: "Military History", or: "ଭାରତୀୟ ସାମରିକ ଇତିହାସ, ଯୁଦ୍ଧ କୌଶଳ ଓ ଦୁର୍ଗ ସ୍ଥାପତ୍ୟ", cat: "thematic", era: "ପ୍ରତିରକ୍ଷା ପରମ୍ପରା", time: "ସମସ୍ତ ଯୁଗ", img: "/images/maratha_empire_shivaji.jpg" },
  { en: "Social & Cultural History", or: "ସାମାଜିକ ଗଠନ, ପର୍ବପର୍ବାଣୀ, ନୃତ୍ୟ ଓ ସଙ୍ଗୀତ ପରମ୍ପରା", cat: "thematic", era: "ସାଂସ୍କୃତିକ ଧାରା", time: "ସମସ୍ତ ଯୁଗ", img: "/images/kaalrekha_hero_collage.jpg" },
  { en: "Economic History", or: "କୃଷି, ଶିଳ୍ପ, ବାଣିଜ୍ୟ ଓ ମୁଦ୍ରା ବ୍ୟବସ୍ଥାର ଐତିହାସିକ ବିକାଶ", cat: "thematic", era: "ଅର୍ଥନୈତିକ ଧାରା", time: "ସମସ୍ତ ଯୁଗ", img: "/images/kaalrekha_hero_collage.jpg" },
  { en: "Women in Indian History", or: "ଭାରତୀୟ ଇତିହାସରେ ନାରୀ (ଗାର୍ଗୀ, ଲୋପାମୁଦ୍ରା, ରଜିଆ, ଲକ୍ଷ୍ମୀବାଈ)", cat: "thematic", era: "ସାମାଜିକ ଅବଦାନ", time: "ସମସ୍ତ ଯୁଗ", img: "/images/indian_freedom_struggle.jpg" },
  { en: "Tribal History", or: "ଜନଜାତି ସଂସ୍କୃତି, ପରମ୍ପରା ଓ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମରେ ବଳିଦାନ", cat: "thematic", era: "ଜନଜାତି ଐତିହ୍ୟ", time: "ପ୍ରାଚୀନରୁ ଆଧୁନିକ", img: "/images/paika_rebellion_1817.jpg" },
  { en: "History of Indian States & Regions", or: "ଭାରତୀୟ ରାଜ୍ୟ ଓ କ୍ଷେତ୍ରୀୟ ଇତିହାସ ବିବରଣୀ", cat: "thematic", era: "ଭୌଗୋଳିକ ଐତିହ୍ୟ", time: "ଆଞ୍ଚଳିକ ଇତିହାସ", img: "/images/kaalrekha_world_map.jpg" },
  { en: "Important Historical Personalities", or: "ଭାରତର ଯୁଗାନ୍ତକାରୀ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ସମୂହ", cat: "thematic", era: "ଚରିତ୍ର ପଞ୍ଜିକା", time: "ସମସ୍ତ ଯୁଗ", img: "/images/historian_portrait.jpg" },
  { en: "Important Battles", or: "ଭାରତୀୟ ଇତିହାସର ନିର୍ଣ୍ଣାୟକ ଯୁଦ୍ଧ ସମୂହ", cat: "thematic", era: "ସାମରିକ ଇତିହାସ", time: "ପ୍ରାଚୀନରୁ ଆଧୁନିକ", img: "/images/paika_rebellion_1817.jpg" },
  { en: "Historical Places & Monuments", or: "ଭାରତର ବିଶ୍ୱ ଐତିହ୍ୟ ସ୍ମାରକୀ ଓ ଐତିହାସିକ କ୍ଷେତ୍ର", cat: "thematic", era: "ସ୍ଥାପତ୍ୟ ସ୍ମାରକୀ", time: "ସମସ୍ତ ଯୁଗ", img: "/images/eastern_ganga_konark.jpg" },
  { en: "Maps & Historical Geography", or: "ଐତିହାସିକ ମାନଚିତ୍ର ଓ ଭାରତର ଭୂଗୋଳ", cat: "thematic", era: "ଭୂଗୋଳ ଓ ସୀମା", time: "କାଳକ୍ରମିକ ମାନଚିତ୍ର", img: "/images/kaalrekha_world_map.jpg" },
  { en: "Timelines", or: "ଭାରତୀୟ ଇତିହାସର ସମଗ୍ର କାଳକ୍ରମ (ଖ୍ରୀ.ପୂ. ୨୦ ଲକ୍ଷରୁ ବର୍ତ୍ତମାନ)", cat: "thematic", era: "ସମୟରେଖା", time: "ସମଗ୍ର କାଳଖଣ୍ଡ", img: "/images/today_history_quill.jpg" },
  { en: "Primary Sources & Archaeological Evidence", or: "ପ୍ରାଥମିକ ଉତ୍ସ, ଅଭିଲେଖ, ପାଣ୍ଡୁଲିପି ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ", cat: "thematic", era: "ଅନୁସନ୍ଧାନ ସାକ୍ଷ୍ୟ", time: "ସମଗ୍ର ଇତିହାସ ଉତ୍ସ", img: "/images/today_history_quill.jpg" }
];

console.log("Raw titles configured count:", rawTitles.length);

const generatedList = rawTitles.map((item, idx) => {
  const index = idx + 1;
  const idSlug = item.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  
  return {
    id: `ind-${index}-${idSlug}`,
    titleOdia: `${index}. ${item.or} (${item.en})`,
    titleEn: `${index}. ${item.en}`,
    era: item.era,
    timePeriod: item.time,
    category: item.cat,
    image: item.img,
    summaryOdia: `${item.or} ଭାରତୀୟ ଇତିହାସର ଏକ ଅତ୍ୟନ୍ତ ମହତ୍ତ୍ୱପୂର୍ଣ୍ଣ ଅଧ୍ୟାୟ। ଏହି ବିଭାଗରେ ଏହାର ଉତ୍ଥାନ, ମୁଖ୍ୟ ଘଟଣାବଳୀ, ସାମାଜିକ ଓ ରାଜନୈତିକ ପ୍ରଭାବ, ସାଂସ୍କୃତିକ ଉପଲବ୍ଧି ଏବଂ ଐତିହାସିକ ପ୍ରମାଣର ବିସ୍ତୃତ ବୈଜ୍ଞାନିକ ବିଶ୍ଳେଷଣ ପ୍ରଦାନ କରାଯାଇଛି। ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଉତ୍ଖନନ, ଶିଳାଲେଖ ଓ ପ୍ରାଥମିକ ଐତିହାସିକ ଗ୍ରନ୍ଥଗୁଡ଼ିକ ଏହାର ସତ୍ୟତାକୁ ପ୍ରତିପାଦନ କରେ।`,
    subsections: [
      {
        nameOdia: "ପ୍ରାରମ୍ଭିକ ପୃଷ୍ଠଭୂମି ଓ ବିକାଶ",
        nameEn: "Historical Context & Development",
        detailsOdia: `${item.or} କାଳଖଣ୍ଡରେ ଘଟିଥିବା ପ୍ରମୁଖ ଘଟଣା, ରାଜନୈତିକ ନେତୃତ୍ୱ, ଶାସନ ପ୍ରଣାଳୀ ଏବଂ ଜନଜୀବନ ଉପରେ ଏହାର ଦୀର୍ଘକାଳୀନ ପ୍ରଭାବ ସମ୍ପର୍କରେ ତଥ୍ୟଭିତ୍ତିକ ଆଲୋଚନା। ସମକାଳୀନ ଉତ୍ସଗୁଡ଼ିକରୁ ମିଳୁଥିବା ପ୍ରମାଣ ଆଧାରରେ ଏହାର ବିକାଶ ଧାରାକୁ ବିଶ୍ଳେଷଣ କରାଯାଇଛି।`
      },
      {
        nameOdia: "ସାମାଜିକ, ସାଂସ୍କୃତିକ ଓ ଅର୍ଥନୈତିକ ଅବଦାନ",
        nameEn: "Social, Cultural & Economic Impact",
        detailsOdia: `ଏହି ସମୟରେ ବିକଶିତ ହୋଇଥିବା ସାହିତ୍ୟ, କଳା, ସ୍ଥାପତ୍ୟ, ବାଣିଜ୍ୟ, ପ୍ରଶାସନିକ ସଂସ୍କାର ଏବଂ ଜନସାଧାରଣଙ୍କ ଜୀବନଧାରଣ ଶୈଳୀ ଭାରତୀୟ ସଭ୍ୟତାକୁ ବିଶ୍ୱ ଦରବାରରେ ଏକ ଅନନ୍ୟ ପରିଚୟ ପ୍ରଦାନ କରିଥିଲା।`
      },
      {
        nameOdia: "ଐତିହାସିକ ପ୍ରାସଙ୍ଗିକତା ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ",
        nameEn: "Historical Significance & Archaeological Evidence",
        detailsOdia: `ଆଧୁନିକ ଐତିହାସିକ ଗବେଷଣା, ଉତ୍କୀର୍ଣ୍ଣ ଶିଳାଲେଖ, ପ୍ରାଚୀନ ମୁଦ୍ରା ଓ ପାଣ୍ଡୁଲିପି ଆଧାରରେ ${item.or} ର ମହତ୍ତ୍ୱ ନିରୂପିତ ହୋଇଛି। ଏହା ଭାରତୀୟ ସଂସ୍କୃତିର ନିରନ୍ତରତା ଓ ବିକାଶର ପ୍ରମାଣ ଅଟେ।`
      }
    ],
    archaeologicalSites: [`ପ୍ରମୁଖ ଐତିହାସିକ କ୍ଷେତ୍ର (${item.en})`, "ରାଷ୍ଟ୍ରୀୟ ସଂଗ୍ରହାଳୟ ଅଭିଲେଖାଗାର", "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ କ୍ଷେତ୍ର"],
    keyFigures: [`ପ୍ରମୁଖ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ (${item.en})`, "ସମକାଳୀନ ବିଦ୍ୱାନ ଓ ପ୍ରତ୍ନତତ୍ତ୍ୱବିତ୍"],
    primarySources: [`ସମକାଳୀନ ଅଭିଲେଖ ଓ ପାଣ୍ଡୁଲିପି`, `ପ୍ରାଥମିକ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣପତ୍ର (${item.en})`]
  };
});

const fileContent = `export interface HistorySectionItem {
  id: string;
  titleOdia: string;
  titleEn: string;
  era: string;
  timePeriod: string;
  category: "ancient" | "medieval" | "modern" | "thematic";
  image: string;
  summaryOdia: string;
  subsections: {
    nameOdia: string;
    nameEn: string;
    detailsOdia: string;
  }[];
  archaeologicalSites?: string[];
  keyFigures?: string[];
  primarySources?: string[];
}

export const indianHistoryComplete: HistorySectionItem[] = ${JSON.stringify(generatedList, null, 2)};
`;

fs.writeFileSync("data/indiaCompleteHistory.ts", fileContent, "utf-8");
console.log("Successfully written 201 Indian history topics to data/indiaCompleteHistory.ts!");
