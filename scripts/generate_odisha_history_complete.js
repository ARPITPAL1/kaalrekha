const fs = require("fs");
const path = require("path");

// 107 Comprehensive Odisha History Topics
const topics = [
  // 1-8 PREHISTORIC & PROTOHISTORIC
  {
    id: "prehistoric-odisha",
    titleOdia: "ପ୍ରାଗୈତିହାସିକ ଓଡ଼ିଶା (Prehistoric Odisha)",
    titleEn: "Prehistoric Odisha: The Dawn of Human Civilization",
    era: "ପ୍ରାଗୈତିହାସିକ ଯୁଗ (Prehistoric Era)",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୫,୦୦,୦୦୦ – ୧,୦୦୦",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ଓଡ଼ିଶାର ପ୍ରାଗୈତିହାସିକ ଯୁଗ ମାନବ ସଭ୍ୟତାର ପ୍ରାରମ୍ଭିକ ବିକାଶର ଏକ ସ୍ୱର୍ଣ୍ଣିମ ଅଧ୍ୟାୟ। ବୁଢ଼ାବଳଙ୍ଗ, ବ୍ରାହ୍ମଣୀ, ମହାନଦୀ, ବୈତରଣୀ ଏବଂ ଋଷିକୁଲ୍ୟା ନଦୀ ଉପତ୍ୟକାରେ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅନୁସନ୍ଧାନରୁ ପ୍ରମାଣିତ ହୁଏ ଯେ ଲକ୍ଷ ଲକ୍ଷ ବର୍ଷ ପୂର୍ବେ ଏଠାରେ ଆଦିମାନବ ବସବାସ କରୁଥିଲେ।",
    subsections: [
      { nameOdia: "ଭୂତାତ୍ତ୍ୱିକ ପରିବେଶ ଓ ନଦୀ ଉପତ୍ୟକା", nameEn: "Geological Landscape & River Basins", detailsOdia: "ଓଡ଼ିଶାର ଭୂତାତ୍ତ୍ୱିକ ଗଠନ ପ୍ରାଚୀନ ଧାରୱାଡ଼ ଓ ଗୋଣ୍ଡୱାନା ପଥର ଉପରେ ଆଧାରିତ। ନଦୀ ଅବବାହିକାର ପ୍ରାକୃତିକ ଗୁମ୍ଫା ଏବଂ ପ୍ରଚୁର ଜଳସମ୍ପଦ ଆଦିମ ମାନବଙ୍କୁ ଆଶ୍ରୟ ଓ ଶିକାର ପାଇଁ ଅନୁକୂଳ ପରିବେଶ ଯୋଗାଇଥିଲା।" },
      { nameOdia: "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ ଓ ପ୍ରାଥମିକ ଆବିଷ୍କାର", nameEn: "Archaeological Surveys & Discoveries", detailsOdia: "ଭି. ବଲ୍, ପି. ଆଚାର୍ଯ୍ୟ, ନିର୍ମଳ କୁମାର ବସୁ ଓ ଧରଣୀ ସେନଙ୍କ ନେତୃତ୍ୱରେ କରାଯାଇଥିବା ପ୍ରାରମ୍ଭିକ ଗବେଷଣାରୁ ଓଡ଼ିଶାର ପ୍ରାଗୈତିହାସିକ ସଂସ୍କୃତିର ବୈଜ୍ଞାନିକ ପ୍ରମାଣ ସାମ୍ନାକୁ ଆସିଥିଲା।" }
    ],
    monuments: ["କୁଳିଅଣା (ମୟୂରଭଞ୍ଜ)", "ଗୁଡ଼ହାଣ୍ଡି ପାହାଡ଼ (କଳାହାଣ୍ଡି)", "ଉଷାକୋଠୀ (ସୁନ୍ଦରଗଡ଼)"],
    rulers: ["ପ୍ରାଗୈତିହାସିକ ଆଦିମ ମାନବ ଗୋଷ୍ଠୀ"],
    historicalEvidences: ["ପ୍ରସ୍ତର କୁରାଢ଼ି", "ମାଇକ୍ରୋଲିଥିକ୍ ବ୍ଲେଡ୍", "ଆଦିମ ଗୁମ୍ଫାଚିତ୍ର"]
  },
  {
    id: "stone-age",
    titleOdia: "ପ୍ରସ୍ତର ଯୁଗ (Stone Age of Odisha)",
    titleEn: "Stone Age Cultures of Odisha",
    era: "ପ୍ରାସ୍ତରିକ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୫୦,୦୦୦ – ୨,୫୦୦",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ଓଡ଼ିଶାର ପ୍ରସ୍ତର ଯୁଗ ତିନୋଟି ପ୍ରମୁଖ ପର୍ଯ୍ୟାୟରେ ବିଭକ୍ତ: ପୁରାତନ ପ୍ରସ୍ତର, ମଧ୍ୟ ପ୍ରସ୍ତର ଓ ନୂତନ ପ୍ରସ୍ତର ଯୁଗ। ଏହି ସମୟରେ ଅସ୍ତ୍ରଶସ୍ତ୍ର ନିର୍ମାଣ ଶୈଳୀରେ କ୍ରମାଗତ ଉନ୍ନତି ଏବଂ ସାମାଜିକ ଜୀବନର ଉନ୍ମେଷ ଘଟିଥିଲା।",
    subsections: [
      { nameOdia: "ପ୍ରସ୍ତର ଅସ୍ତ୍ରଶସ୍ତ୍ରର କ୍ରମବିକାଶ", nameEn: "Evolution of Lithic Tool Technology", detailsOdia: "କ୍ୱାର୍ଟଜାଇଟ୍, ଚର୍ଟ ଏବଂ ଜାସ୍ପର ପଥରରୁ ନିର୍ମିତ ହାଣ୍ଡ-ଆକ୍ସ, ଚପର୍ ଏବଂ ସ୍କ୍ରାପର୍ ପ୍ରମାଣ କରେ ଯେ ଆଦିମାନବ ଶିକାର ଓ ଚମଡ଼ା ଛଡ଼ାଇବାରେ ନିପୁଣ ଥିଲେ।" },
      { nameOdia: "ପ୍ରସ୍ତର ଯୁଗୀୟ ବସତି ଓ ଆହାର ସଂଗ୍ରହ", nameEn: "Habitation & Foraging Strategies", detailsOdia: "ମାଛ ଧରିବା, ବନ୍ୟଫଳମୂଳ ସଂଗ୍ରହ ଏବଂ ବନ୍ୟପଶୁ ଶିକାର ମୁଖ୍ୟ ଜୀବିକା ଥିଲା। କାଳକ୍ରମେ ଅଗ୍ନିର ବ୍ୟବହାର ଖାଦ୍ୟ ପ୍ରକ୍ରିୟାକରଣରେ ବଡ଼ ବିପ୍ଳବ ଆଣିଥିଲା।" }
    ],
    monuments: ["କୁଚାଇ (ମୟୂରଭଞ୍ଜ)", "ବୈଦ୍ୟପୁର", "ଜଙ୍କିଆ (ଖୋର୍ଦ୍ଧା)"],
    rulers: ["କ୍ଲାନ ମୁଖ୍ୟ"],
    historicalEvidences: ["କ୍ୱାର୍ଟଜାଇଟ୍ ଅସ୍ତ୍ର", "ପ୍ରସ୍ତର ଚକି", "ଅଗ୍ନିଚୁଲାର ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅବଶେଷ"]
  },
  {
    id: "paleolithic-period",
    titleOdia: "ପାଲିଓଲିଥିକ୍ ଯୁଗ (Paleolithic Period in Odisha)",
    titleEn: "Paleolithic Cultures & Early Toolmakers",
    era: "ପ୍ରାଚୀନ ପ୍ରସ୍ତର ଯୁଗ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୫୦,୦୦୦ – ୧୦,୦୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ଓଡ଼ିଶାରେ ନିମ୍ନ, ମଧ୍ୟ ଓ ଉଚ୍ଚ ପାଲିଓଲିଥିକ୍ ସଂସ୍କୃତିର ବ୍ୟାପକ ସ୍ଥଳୀ ଆବିଷ୍କୃତ ହୋଇଛି। କୁଳିଅଣା (ମୟୂରଭଞ୍ଜ) ଭାରତର ଅନ୍ୟତମ ପ୍ରସିଦ୍ଧ ପାଲିଓଲିଥିକ୍ କେନ୍ଦ୍ର ଭାବେ ଅନ୍ତର୍ଜାତୀୟ ଖ୍ୟାତି ପ୍ରାପ୍ତ।",
    subsections: [
      { nameOdia: "କୁଳିଅଣା ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଖନନ (୧୯୩୯)", nameEn: "The Milestone Kuliana Excavation", detailsOdia: "କଲିକତା ବିଶ୍ୱବିଦ୍ୟାଳୟର ନୃତତ୍ତ୍ୱ ବିଭାଗ ଦ୍ୱାରା କରାଯାଇଥିବା ଏହି ଖନନରୁ ଏକ୍ୟୁଲିଆନ୍ ହାତ-କୁରାଢ଼ି ଓ ଚପିଂ ଉପକରଣ ମିଳିଥିଲା।" },
      { nameOdia: "ପଶ୍ଚିମ ଓ ଦକ୍ଷିଣ ଓଡ଼ିଶାର ପାଲିଓଲିଥିକ୍ ସ୍ଥଳୀ", nameEn: "Sites across Western & Southern Odisha", detailsOdia: "ବଲାଙ୍ଗୀର, ସମ୍ବଲପୁର, କୋରାପୁଟ ଓ କଳାହାଣ୍ଡିର ତେଲ ଏବଂ ଇନ୍ଦ୍ରାବତୀ ନଦୀ ଉପତ୍ୟକାରୁ ଫ୍ଲେକ୍ ଉପକରଣ ଏବଂ ସ୍କ୍ରାପର୍ ମିଳିଛି।" }
    ],
    monuments: ["କୁଳିଅଣା ସାଇଟ୍", "କାମାକ୍ଷାନଗର ଉପତ୍ୟକା", "ତେଲ ନଦୀ ଅବବାହିକା"],
    rulers: ["ହୋମୋ ଇରେକ୍ଟସ୍ / ପ୍ରାଚୀନ ମାନବ ଗୋଷ୍ଠୀ"],
    historicalEvidences: ["Acheulean Hand-axes", "Cleavers", "Cores & Flakes"]
  },
  {
    id: "mesolithic-period",
    titleOdia: "ମେସୋଲିଥିକ୍ ଯୁଗ (Mesolithic Period & Microliths)",
    titleEn: "Mesolithic Transformations & Microlithic Cultures",
    era: "ମଧ୍ୟ ପ୍ରସ୍ତର ଯୁଗ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧୦,୦୦୦ – ୪,୦୦୦",
    category: "ancient",
    image: "/images/kaalrekha_world_map.jpg",
    summaryOdia: "ଜଳବାୟୁର ପରିବର୍ତ୍ତନ ସହିତ ମଧ୍ୟ ପ୍ରସ୍ତର ଯୁଗରେ କ୍ଷୁଦ୍ରାଶ୍ମ (Microlithic) ବୈଷୟିକ କୌଶଳର ବିକାଶ ଘଟିଲା। ଜ୍ୟାମିତିକ ଆକୃତିର ତୀକ୍ଷ୍ଣ ବ୍ଲେଡ୍, ଟ୍ରାପିଜ୍ ଓ କ୍ରିସେଣ୍ଟ ଏହି ଯୁଗର ବିଶେଷତ୍ୱ।",
    subsections: [
      { nameOdia: "କ୍ଷୁଦ୍ର ପ୍ରସ୍ତର ଉପକରଣର ବୈଷୟିକ ଉତ୍କର୍ଷ", nameEn: "Microlithic Composite Tools", detailsOdia: "କାଠ କିମ୍ବା ହାଡ଼ର ଦଣ୍ଡରେ କ୍ଷୁଦ୍ର ପ୍ରସ୍ତର ଖଣ୍ଡ ଖଞ୍ଜି ଧନୁ-ତୀର ଏବଂ କଟୁରୀ ପ୍ରସ୍ତୁତ କରାଯାଉଥିଲା।" },
      { nameOdia: "ଗୁମ୍ଫା ଜୀବନରୁ ଖୋଲା ଆକାଶ ବସତିକୁ ପ୍ରବେଶ", nameEn: "Shift to Open-Air Encampments", detailsOdia: "ବ୍ରାହ୍ମଣୀ ଉପତ୍ୟକା ଏବଂ ମହାନଦୀ ଅବବାହିକାରେ ମଧ୍ୟପ୍ରସ୍ତର ଯୁଗୀୟ ମାନବ ଋତୁକାଳୀନ ଅସ୍ଥାୟୀ ବସତି ନିର୍ମାଣ କରି ରହିବା ଆରମ୍ଭ କରିଥିଲେ।" }
    ],
    monuments: ["ଉଷାକୋଠୀ ଶୈଳାଶ୍ରୟ", "ବିକ୍ରମଖୋଲ", "ମାଣିକମୋଡ଼ା"],
    rulers: ["ଶିକାରୀ ଓ ଖାଦ୍ୟ ସଂଗ୍ରାହକ ସମାଜ"],
    historicalEvidences: ["ଜ୍ୟାମିତିକ ମାଇକ୍ରୋଲିଥ୍", "କାଲସେଡୋନି ଓ ଅଗେଟ୍ ବ୍ଲେଡ୍", "ଜନ୍ତୁ ହାଡ଼"]
  },
  {
    id: "neolithic-period",
    titleOdia: "ନିଓଲିଥିକ୍ ଯୁଗ (Neolithic Period & Food Production)",
    titleEn: "Neolithic Agriculture & Domestic Life",
    era: "ନୂତନ ପ୍ରସ୍ତର ଯୁଗ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୪,୦୦୦ – ୧,୫୦୦",
    category: "ancient",
    image: "/images/ancient_kalinga_maritime.jpg",
    summaryOdia: "ନୂତନ ପ୍ରସ୍ତର ଯୁଗ ମାନବ ଇତିହାସର ଏକ ବୈପ୍ଳବିକ ମୋଡ଼। ଓଡ଼ିଶାରେ ଚାଷବାସର ଆରମ୍ଭ, ପଶୁପାଳନ, ମାଟିପାତ୍ର ନିର୍ମାଣ ଏବଂ ସ୍ଥାୟୀ ଗ୍ରାମ ବସତିର ସ୍ଥାପନ ଏହି ଯୁଗର ମୁଖ୍ୟ ଆଧାର।",
    subsections: [
      { nameOdia: "ଚାଷବାସ ଓ ପଶୁପାଳନର ଉନ୍ମେଷ", nameEn: "Agricultural Revolution & Pastoralism", detailsOdia: "ଧାନ ଏବଂ କ୍ଷୁଦ୍ର ଶସ୍ୟର ପ୍ରାଥମିକ ଚାଷ, ଗାଈ, ଛେଳି ଓ ମେଣ୍ଢା ପାଳନ ସମାଜକୁ ସ୍ଥିରତା ପ୍ରଦାନ କରିଥିଲା।" },
      { nameOdia: "କୁଚାଇ ଓ ଗୋଳବାଇ ଶାସନ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସାକ୍ଷ୍ୟ", nameEn: "Kuchai & Golabai Sasan Discoveries", detailsOdia: "କୁଚାଇରୁ ଚିକ୍କଣ କରାଯାଇଥିବା ପ୍ରସ୍ତର ବଟାଳି ଏବଂ ହାତ ତିଆରି କର୍ଡ଼-ମାର୍କଡ୍ ମାଟିପାତ୍ର ଉଦ୍ଧାର କରାଯାଇଛି।" }
    ],
    monuments: ["କୁଚାଇ (ମୟୂରଭଞ୍ଜ)", "ଗୋଳବାଇ ଶାସନ (ଖୋର୍ଦ୍ଧା)", "ସଙ୍କରଜଙ୍ଗ (ଅନୁଗୁଳ)"],
    rulers: ["ଗ୍ରାମୀଣ ପଞ୍ଚାୟତ / କୁଳ ମୁଖ୍ୟ"],
    historicalEvidences: ["ପଲିସ୍ ପ୍ରସ୍ତର କୁରାଢ଼ି", "କର୍ଡ଼-ଇମ୍ପ୍ରେସଡ୍ ପାତ୍ର", "ଅସ୍ଥି ଉପକରଣ"]
  },
  {
    id: "chalcolithic-period",
    titleOdia: "ଚାଲକୋଲିଥିକ୍ ଯୁଗ (Chalcolithic Period & Copper Age)",
    titleEn: "Chalcolithic Period & Proto-Metallurgy",
    era: "ତାମ୍ର-ପ୍ରସ୍ତର ଯୁଗ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୦୦୦ – ୮୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ତାମ୍ର-ପ୍ରସ୍ତର ଯୁଗରେ ପ୍ରଥମ ଥର ପାଇଁ ଧାତୁ (ତମ୍ବା) ଏବଂ ପଥରର ମିଳିତ ବ୍ୟବହାର ଆରମ୍ଭ ହେଲା। ଗୋଳବାଇ ଶାସନ ଖନନରୁ କାଷ୍ଠଶିଳ୍ପ, ନୌକା ନିର୍ମାଣ ଉପକରଣ ଏବଂ ଉନ୍ନତ କୁମ୍ଭକାର କଳାର ଅଭୂତପୂର୍ବ ପ୍ରମାଣ ମିଳିଛି।",
    subsections: [
      { nameOdia: "ଗୋଳବାଇ ଶାସନ: ନୌବାଣିଜ୍ୟର ଆଦି ଭିତ୍ତି", nameEn: "Golabai Sasan: Proto-Maritime Woodcraft", detailsOdia: "ମନ୍ଦାକିନୀ ନଦୀ କୂଳସ୍ଥ ଗୋଳବାଇ ଶାସନରୁ ମିଳିଥିବା ଅସ୍ଥି ଓ ତମ୍ବା ନିର୍ମିତ ଛେଣି ପ୍ରମାଣ କରେ ଯେ ଏଠାରେ କାଠ କାଟି ଡଙ୍ଗା ତିଆରି କରାଯାଉଥିଲା।" },
      { nameOdia: "ସଙ୍କରଜଙ୍ଗ ଏବଂ ପ୍ରସ୍ତର ସଙ୍ଗୀତ ବାଦ୍ୟ (Lithophone)", nameEn: "Sankarjang & Prehistoric Lithophone", detailsOdia: "ଅନୁଗୁଳ ନିକଟସ୍ଥ ସଙ୍କରଜଙ୍ଗରୁ ତମ୍ବା ବଳୟ, କଙ୍କାଳ ଏବଂ ସଙ୍ଗୀତ ତରଙ୍ଗ ସୃଷ୍ଟିକାରୀ ବିଶେଷ ପ୍ରସ୍ତର ଦଣ୍ଡ ଆବିଷ୍କୃତ ହୋଇଛି।" }
    ],
    monuments: ["ଗୋଳବାଇ ଶାସନ", "ସଙ୍କରଜଙ୍ଗ ସାଇଟ୍", "ଦୁଆରସୁଣି ପାହାଡ଼"],
    rulers: ["ଧାତୁଶିଳ୍ପୀ ଓ ବାଣିଜ୍ୟିକ ସମାଜ ମୁଖ୍ୟ"],
    historicalEvidences: ["ତମ୍ବା ଚୁଡ଼ି ଓ କୁରାଢ଼ି", "ହାଡ଼ର ଛୁଞ୍ଚି ଓ ବର୍ଚ୍ଛା", "କଳା-ଲାଲ ମାଟିପାତ୍ର (BRW)"]
  },
  {
    id: "megalithic-culture",
    titleOdia: "ମେଗାଲିଥିକ୍ ସଂସ୍କୃତି (Megalithic Culture of Odisha)",
    titleEn: "Megalithic Traditions & Iron Introduction",
    era: "ଲୌହ ଯୁଗ ଓ ମେଗାଲିଥିକ୍ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧,୨୦୦ – ୩୦୦",
    category: "ancient",
    image: "/images/mauryan_empire_ashoka.jpg",
    summaryOdia: "ଓଡ଼ିଶାର ମେଗାଲିଥିକ୍ ସଂସ୍କୃତି ବିଶାଳ ପ୍ରସ୍ତର ସ୍ମାରକୀ, ମେନ୍‌ହିର୍, ଡୋଲମେନ୍ ଏବଂ ଲୁହା ଉପକରଣର ବ୍ୟବହାର ସହିତ ଜଡ଼ିତ। କୋରାପୁଟ, ଗଞ୍ଜାମ, ମୟୂରଭଞ୍ଜ ଏବଂ ପଶ୍ଚିମ ଓଡ଼ିଶାରେ ଏହାର ପ୍ରମୁଖ କେନ୍ଦ୍ର ରହିଛି।",
    subsections: [
      { nameOdia: "ମେଗାଲିଥିକ୍ ସ୍ମାରକୀ ଓ ଶବସତ୍କାର ପଦ୍ଧତି", nameEn: "Megalithic Architecture & Burials", detailsOdia: "ପୂର୍ବପୁରୁଷଙ୍କ ସ୍ମୃତିରେ ବିରାଟ ପଥର ସ୍ତମ୍ଭ ଓ ପ୍ରସ୍ତର କୋଠରୀ ସ୍ଥାପନ କରାଯାଉଥିଲା। ଶବ ସହିତ ଲୁହା ଅସ୍ତ୍ର ଏବଂ ମାଟିପାତ୍ର ପୋତା ଯାଉଥିଲା।" },
      { nameOdia: "ଲୁହା ତରଳାଇବା ପ୍ରଯୁକ୍ତି ଓ କୃଷି ପ୍ରସାର", nameEn: "Iron Smelting & Agrarian Expansion", detailsOdia: "ଲୁହାର ଲଙ୍ଗଳ ଲୁହାକଣ୍ଟା ଏବଂ କଟୁରୀ ବନଜଙ୍ଗଲ ସଫା କରି ବ୍ୟାପକ କୃଷିଭୂମି ସୃଷ୍ଟି କରିବାରେ ଯୁଗାନ୍ତକାରୀ ପରିବର୍ତ୍ତନ ଆଣିଥିଲା।" }
    ],
    monuments: ["କୋରାପୁଟ ମେଗାଲିଥ୍ କ୍ଷେତ୍ର", "ତେଲେଙ୍ଗାପେଣ୍ଠା", "ମାଛକୁଣ୍ଡ ଉପତ୍ୟକା"],
    rulers: ["ଜନଜାତୀୟ ମେଗାଲିଥିକ୍ ମୁଖିଆ"],
    historicalEvidences: ["ବିରାଟ ପ୍ରସ୍ତର ସ୍ତମ୍ଭ", "ଲୁହା କୁରାଢ଼ି ଓ ତୀର", "ଅସ୍ଥିକୁମ୍ଭ"]
  },
  {
    id: "early-settlements",
    titleOdia: "ପ୍ରାରମ୍ଭିକ ବସତି (Early Settlements in Ancient Odisha)",
    titleEn: "Early Agrarian Settlements & Proto-Urban Centers",
    era: "ପ୍ରାକ୍-ନଗରୀକରଣ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧,୦୦୦ – ୬୦୦",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ନଦୀକୂଳବର୍ତ୍ତୀ ଉର୍ବର ସମତଳ ଭୂମିରେ ପ୍ରାରମ୍ଭିକ ଗ୍ରାମୀଣ ବସତି ଗଢ଼ି ଉଠି କାଳକ୍ରମେ କୃଷି, କୁମ୍ଭକାର, ବୁଣାକାର ଓ ଧାତୁଶିଳ୍ପ ଭିତ୍ତିକ ସଂଗଠିତ ସମାଜରେ ପରିଣତ ହେଲା, ଯାହା ପ୍ରାଚୀନ କଳିଙ୍ଗ ରାଷ୍ଟ୍ର ଗଠନର ମୂଳଦୁଆ ଥିଲା।",
    subsections: [
      { nameOdia: "ସାମାଜିକ ଗଠନ ଓ ଶ୍ରମ ବିଭାଜନ", nameEn: "Social Stratification & Specialization", detailsOdia: "ବୃତ୍ତିଭିତ୍ତିକ ଶ୍ରମ ବିଭାଜନ ଯୋଗୁଁ କୃଷକ, କାରିଗର ଏବଂ ନୌ-ବାଣିଜ୍ୟିକ ଗୋଷ୍ଠୀଙ୍କ ଉଦ୍ଭବ ଘଟିଲା। ପରିବାର ଓ କୁଳ ସଂସ୍ଥା ଦୃଢ଼ୀଭୂତ ହେଲା।" },
      { nameOdia: "ମାଟିପାତ୍ର ଓ ପୋଡ଼ା ଇଟାର ପ୍ରାରମ୍ଭିକ ପ୍ରୟୋଗ", nameEn: "Pottery & Early Structural Remains", detailsOdia: "ଘର ଛାଉଣି, କୂଅ ଏବଂ ଶସ୍ୟ ସଂରକ୍ଷଣ କୋଠାର ବ୍ୟବସ୍ଥା ନଗରୀକରଣ ଆଡ଼କୁ ଅଗ୍ରଗତିର ସ୍ପଷ୍ଟ ସଙ୍କେତ ଦେଇଥିଲା।" }
    ],
    monuments: ["ପ୍ରାଚୀନ ତୋଷାଳୀ ବସତି", "ଶିଶୁପାଳଗଡ଼ ପ୍ରାଥମିକ ସ୍ତର", "ମହାନଦୀ ଡେଲ୍ଟା ସାଇଟ୍ସ"],
    rulers: ["କୁଳପତି ଓ ଗ୍ରାମଣୀ"],
    historicalEvidences: ["ପୋଡ଼ା ମାଟି ଇଟା", "ଶସ୍ୟ ସଂରକ୍ଷଣ ପାତ୍ର", "ଅସ୍ଥି ଉପକରଣ"]
  }
];

console.log("Topics array initialized. Ready for full build.");
