const fs = require("fs");
const path = require("path");

const rawTopics = [
  // 1-8 PREHISTORIC & PROTOHISTORIC
  {
    id: "prehistoric-odisha",
    titleOdia: "ପ୍ରାଗୈତିହାସିକ ଓଡ଼ିଶା (Prehistoric Odisha)",
    titleEn: "Prehistoric Odisha: Dawn of Human Civilization",
    era: "ପ୍ରାଗୈତିହାସିକ ଯୁଗ (Prehistoric Era)",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୫,୦୦,୦୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧,୦୦୦",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ଓଡ଼ିଶାର ପ୍ରାଗୈତିହାସିକ ଯୁଗ ମାନବ ସଭ୍ୟତାର ପ୍ରାରମ୍ଭିକ ବିକାଶର ଏକ ସ୍ୱର୍ଣ୍ଣିମ ଅଧ୍ୟାୟ। ବୁଢ଼ାବଳଙ୍ଗ, ବ୍ରାହ୍ମଣୀ, ମହାନଦୀ, ବୈତରଣୀ ଏବଂ ଋଷିକୁଲ୍ୟା ନଦୀ ଉପତ୍ୟକାରେ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅନୁସନ୍ଧାନରୁ ପ୍ରମାଣିତ ହୁଏ ଯେ ଲକ୍ଷ ଲକ୍ଷ ବର୍ଷ ପୂର୍ବେ ଏଠାରେ ଆଦିମାନବ ବସବାସ କରୁଥିଲେ।",
    subsections: [
      {
        nameOdia: "ପ୍ରାରମ୍ଭିକ ଭୂତାତ୍ତ୍ୱିକ ପରିବେଶ ଓ ନଦୀ ଉପତ୍ୟକା",
        nameEn: "Geological Landscape & Fluvial Basins",
        detailsOdia: "ଓଡ଼ିଶାର ଭୂତାତ୍ତ୍ୱିକ ଗଠନ ପ୍ରାଚୀନ ଧାରୱାଡ଼ ଓ ଗୋଣ୍ଡୱାନା ପଥର ଉପରେ ଆଧାରିତ। ନଦୀ ଅବବାହିକାର ପ୍ରାକୃତିକ ଗୁମ୍ଫା ଏବଂ ପ୍ରଚୁର ଜଳସମ୍ପଦ ଆଦିମ ମାନବଙ୍କୁ ଆଶ୍ରୟ ଓ ଶିକାର ପାଇଁ ଅନୁକୂଳ ପରିବେଶ ଯୋଗାଇଥିଲା।"
      },
      {
        nameOdia: "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ ଓ ପ୍ରାଥମିକ ଆବିଷ୍କାର",
        nameEn: "Archaeological Surveys & Discoveries",
        detailsOdia: "ଭି. ବଲ୍ (V. Ball), ପି. ଆଚାର୍ଯ୍ୟ, ନିର୍ମଳ କୁମାର ବସୁ ଓ ଧରଣୀ ସେନଙ୍କ ନେତୃତ୍ୱରେ କରାଯାଇଥିବା ପ୍ରାରମ୍ଭିକ ଗବେଷଣାରୁ ଓଡ଼ିଶାର ପ୍ରାଗୈତିହାସିକ ସଂସ୍କୃତିର ବୈଜ୍ଞାନିକ ପ୍ରମାଣ ସାମ୍ନାକୁ ଆସିଥିଲା।"
      }
    ],
    monuments: ["କୁଳିଅଣା (ମୟୂରଭଞ୍ଜ)", "ଗୁଡ଼ହାଣ୍ଡି ପାହାଡ଼ (କଳାହାଣ୍ଡି)", "ଉଷାକୋଠୀ (ସୁନ୍ଦରଗଡ଼)"],
    rulers: ["ପ୍ରାଗୈତିହାସିକ ଆଦିମ ମାନବ ଗୋଷ୍ଠୀ"],
    historicalEvidences: ["ପ୍ରସ୍ତର କୁରାଢ଼ି", "ମାଇକ୍ରୋଲିଥିକ୍ ବ୍ଲେଡ୍", "ଆଦିମ ଗୁମ୍ଫାଚିତ୍ର"]
  },
  {
    id: "stone-age",
    titleOdia: "ପ୍ରସ୍ତର ଯୁଗ (Stone Age of Odisha)",
    titleEn: "Stone Age Cultures of Odisha",
    era: "ପ୍ରାସ୍ତରିକ କାଳ (Lithic Stage)",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୫୦,୦୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୫୦୦",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ଓଡ଼ିଶାର ପ୍ରସ୍ତର ଯୁଗ ତିନୋଟି ପ୍ରମୁଖ ପର୍ଯ୍ୟାୟରେ ବିଭକ୍ତ: ପୁରାତନ ପ୍ରସ୍ତର, ମଧ୍ୟ ପ୍ରସ୍ତର ଓ ନୂତନ ପ୍ରସ୍ତର ଯୁଗ। ଏହି ସମୟରେ ଅସ୍ତ୍ରଶସ୍ତ୍ର ନିର୍ମାଣ ଶୈଳୀରେ କ୍ରମାଗତ ଉନ୍ନତି ଏବଂ ସାମାଜିକ ଜୀବନର ଉନ୍ମେଷ ଘଟିଥିଲା।",
    subsections: [
      {
        nameOdia: "ପ୍ରସ୍ତର ଅସ୍ତ୍ରଶସ୍ତ୍ରର କ୍ରମବିକାଶ",
        nameEn: "Evolution of Lithic Tool Technology",
        detailsOdia: "କ୍ୱାର୍ଟଜାଇଟ୍, ଚର୍ଟ ଏବଂ ଜାସ୍ପର ପଥରରୁ ନିର୍ମିତ ହାଣ୍ଡ-ଆକ୍ସ, ଚପର୍ ଏବଂ ସ୍କ୍ରାପର୍ ପ୍ରମାଣ କରେ ଯେ ଆଦିମାନବ ଶିକାର ଓ ଚମଡ଼ା ଛଡ଼ାଇବାରେ ନିପୁଣ ଥିଲେ।"
      },
      {
        nameOdia: "ପ୍ରସ୍ତର ଯୁଗୀୟ ବସତି ଓ ଆହାର ସଂଗ୍ରହ",
        nameEn: "Habitation & Foraging Strategies",
        detailsOdia: "ମାଛ ଧରିବା, ବନ୍ୟଫଳମୂଳ ସଂଗ୍ରହ ଏବଂ ବନ୍ୟପଶୁ ଶିକାର ମୁଖ୍ୟ ଜୀବିକା ଥିଲା। କାଳକ୍ରମେ ଅଗ୍ନିର ବ୍ୟବହାର ଖାଦ୍ୟ ପ୍ରକ୍ରିୟାକରଣରେ ବଡ଼ ବିପ୍ଳବ ଆଣିଥିଲା।"
      }
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
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୫୦,୦୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧୦,୦୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ଓଡ଼ିଶାରେ ନିମ୍ନ, ମଧ୍ୟ ଓ ଉଚ୍ଚ ପାଲିଓଲିଥିକ୍ ସଂସ୍କୃତିର ବ୍ୟାପକ ସ୍ଥଳୀ ଆବିଷ୍କୃତ ହୋଇଛି। କୁଳିଅଣା (ମୟୂରଭଞ୍ଜ) ଭାରତର ଅନ୍ୟତମ ପ୍ରସିଦ୍ଧ ପାଲିଓଲିଥିକ୍ କେନ୍ଦ୍ର ଭାବେ ଅନ୍ତର୍ଜାତୀୟ ଖ୍ୟାତି ପ୍ରାପ୍ତ।",
    subsections: [
      {
        nameOdia: "କୁଳିଅଣା ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଖନନ (୧୯୩୯)",
        nameEn: "The Milestone Kuliana Excavation",
        detailsOdia: "କଲିକତା ବିଶ୍ୱବିଦ୍ୟାଳୟର ନୃତତ୍ତ୍ୱ ବିଭାଗ ଦ୍ୱାରା କରାଯାଇଥିବା ଏହି ଖନନରୁ ଏକ୍ୟୁଲିଆନ୍ (Acheulean) ହାତ-କୁରାଢ଼ି ଓ ଚପିଂ ଉପକରଣ ମିଳିଥିଲା।"
      },
      {
        nameOdia: "ପଶ୍ଚିମ ଓ ଦକ୍ଷିଣ ଓଡ଼ିଶାର ପାଲିଓଲିଥିକ୍ ସ୍ଥଳୀ",
        nameEn: "Sites across Western & Southern Odisha",
        detailsOdia: "ବଲାଙ୍ଗୀର, ସମ୍ବଲପୁର, କୋରାପୁଟ ଓ କଳାହାଣ୍ଡିର ତେଲ ଏବଂ ଇନ୍ଦ୍ରାବତୀ ନଦୀ ଉପତ୍ୟକାରୁ ଫ୍ଲେକ୍ ଉପକରଣ ଏବଂ ସ୍କ୍ରାପର୍ ମିଳିଛି।"
      }
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
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧୦,୦୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୪,୦୦୦",
    category: "ancient",
    image: "/images/kaalrekha_world_map.jpg",
    summaryOdia: "ଜଳବାୟୁର ପରିବର୍ତ୍ତନ ସହିତ ମଧ୍ୟ ପ୍ରସ୍ତର ଯୁଗରେ କ୍ଷୁଦ୍ରାଶ୍ମ (Microlithic) ବୈଷୟିକ କୌଶଳର ବିକାଶ ଘଟିଲା। ଜ୍ୟାମିତିକ ଆକୃତିର ତୀକ୍ଷ୍ଣ ବ୍ଲେଡ୍, ଟ୍ରାପିଜ୍ ଓ କ୍ରିସେଣ୍ଟ ଏହି ଯୁଗର ବିଶେଷତ୍ୱ।",
    subsections: [
      {
        nameOdia: "କ୍ଷୁଦ୍ର ପ୍ରସ୍ତର ଉପକରଣର ବୈଷୟିକ ଉତ୍କର୍ଷ",
        nameEn: "Microlithic Composite Tools",
        detailsOdia: "କାଠ କିମ୍ବା ହାଡ଼ର ଦଣ୍ଡରେ କ୍ଷୁଦ୍ର ପ୍ରସ୍ତର ଖଣ୍ଡ ଖଞ୍ଜି ଧନୁ-ତୀର ଏବଂ କଟୁରୀ ପ୍ରସ୍ତୁତ କରାଯାଉଥିଲା, ଯାହା ଦ୍ରୁତଗାମୀ ପଶୁ ଶିକାର ପାଇଁ ଅତ୍ୟନ୍ତ ସହାୟକ ଥିଲା।"
      },
      {
        nameOdia: "ଗୁମ୍ଫା ଜୀବନରୁ ଖୋଲା ଆକାଶ ବସତିକୁ ପ୍ରବେଶ",
        nameEn: "Shift to Open-Air Encampments",
        detailsOdia: "ବ୍ରାହ୍ମଣୀ ଉପତ୍ୟକା ଏବଂ ମହାନଦୀ ଅବବାହିକାରେ ମଧ୍ୟପ୍ରସ୍ତର ଯୁଗୀୟ ମାନବ ଋତୁକାଳୀନ ଅସ୍ଥାୟୀ ବସତି ନିର୍ମାଣ କରି ରହିବା ଆରମ୍ଭ କରିଥିଲେ।"
      }
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
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୪,୦୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧,୫୦୦",
    category: "ancient",
    image: "/images/ancient_kalinga_maritime.jpg",
    summaryOdia: "ନୂତନ ପ୍ରସ୍ତର ଯୁଗ ମାନବ ଇତିହାସର ଏକ ବୈପ୍ଳବିକ ମୋଡ଼। ଓଡ଼ିଶାରେ ଚାଷବାସର ଆରମ୍ଭ, ପଶୁପାଳନ, ମାଟିପାତ୍ର ନିର୍ମାଣ ଏବଂ ସ୍ଥାୟୀ ଗ୍ରାମ ବସତିର ସ୍ଥାପନ ଏହି ଯୁଗର ମୁଖ୍ୟ ଆଧାର।",
    subsections: [
      {
        nameOdia: "ଚାଷବାସ ଓ ପଶୁପାଳନର ଉନ୍ମେଷ",
        nameEn: "Agricultural Revolution & Pastoralism",
        detailsOdia: "ଧାନ ଏବଂ କ୍ଷୁଦ୍ର ଶସ୍ୟର ପ୍ରାଥମିକ ଚାଷ, ଗାଈ, ଛେଳି ଓ ମେଣ୍ଢା ପାଳନ ସମାଜକୁ ସ୍ଥିରତା ପ୍ରଦାନ କରିଥିଲା।"
      },
      {
        nameOdia: "କୁଚାଇ ଓ ଗୋଳବାଇ ଶାସନ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସାକ୍ଷ୍ୟ",
        nameEn: "Kuchai & Golabai Sasan Discoveries",
        detailsOdia: "କୁଚାଇରୁ ଚିକ୍କଣ କରାଯାଇଥିବା ପ୍ରସ୍ତର ବଟାଳି (Polished Celts) ଏବଂ ହାତ ତିଆରି କର୍ଡ଼-ମାର୍କଡ୍ ମାଟିପାତ୍ର ଉଦ୍ଧାର କରାଯାଇଛି।"
      }
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
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨,୦୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୮୦୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ତାମ୍ର-ପ୍ରସ୍ତର ଯୁଗରେ ପ୍ରଥମ ଥର ପାଇଁ ଧାତୁ (ତମ୍ବା) ଏବଂ ପଥରର ମିଳିତ ବ୍ୟବହାର ଆରମ୍ଭ ହେଲା। ଗୋଳବାଇ ଶାସନ ଖନନରୁ କାଷ୍ଠଶିଳ୍ପ, ନୌକା ନିର୍ମାଣ ଉପକରଣ ଏବଂ ଉନ୍ନତ କୁମ୍ଭକାର କଳାର ଅଭୂତପୂର୍ବ ପ୍ରମାଣ ମିଳିଛି।",
    subsections: [
      {
        nameOdia: "ଗୋଳବାଇ ଶାସନ: ନୌବାଣିଜ୍ୟର ଆଦି ଭିତ୍ତି",
        nameEn: "Golabai Sasan: Proto-Maritime Woodcraft",
        detailsOdia: "ମନ୍ଦାକିନୀ ନଦୀ କୂଳସ୍ଥ ଗୋଳବାଇ ଶାସନରୁ ମିଳିଥିବା ଅସ୍ଥି ଓ ତମ୍ବା ନିର୍ମିତ ଛେଣି ପ୍ରମାଣ କରେ ଯେ ଏଠାରେ କାଠ କାଟି ଡଙ୍ଗା ତିଆରି କରାଯାଉଥିଲା।"
      },
      {
        nameOdia: "ସଙ୍କରଜଙ୍ଗ ଏବଂ ପ୍ରସ୍ତର ସଙ୍ଗୀତ ବାଦ୍ୟ (Lithophone)",
        nameEn: "Sankarjang & Prehistoric Lithophone",
        detailsOdia: "ଅନୁଗୁଳ ନିକଟସ୍ଥ ସଙ୍କରଜଙ୍ଗରୁ ତମ୍ବା ବଳୟ, କଙ୍କାଳ ଏବଂ ସଙ୍ଗୀତ ତରଙ୍ଗ ସୃଷ୍ଟିକାରୀ ବିଶେଷ ପ୍ରସ୍ତର ଦଣ୍ଡ (Lithic Bar-celt) ଆବିଷ୍କୃତ ହୋଇଛି।"
      }
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
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧,୨୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୩୦୦",
    category: "ancient",
    image: "/images/mauryan_empire_ashoka.jpg",
    summaryOdia: "ଓଡ଼ିଶାର ମେଗାଲିଥିକ୍ ସଂସ୍କୃତି ବିଶାଳ ପ୍ରସ୍ତର ସ୍ମାରକୀ, ମେନ୍‌ହିର୍, ଡୋଲମେନ୍ ଏବଂ ଲୁହା ଉପକରଣର ବ୍ୟବହାର ସହିତ ଜଡ଼ିତ। କୋରାପୁଟ, ଗଞ୍ଜାମ, ମୟୂରଭଞ୍ଜ ଏବଂ ପଶ୍ଚିମ ଓଡ଼ିଶାରେ ଏହାର ପ୍ରମୁଖ କେନ୍ଦ୍ର ରହିଛି।",
    subsections: [
      {
        nameOdia: "ମେଗାଲିଥିକ୍ ସ୍ମାରକୀ ଓ ଶବସତ୍କାର ପଦ୍ଧତି",
        nameEn: "Megalithic Architecture & Burials",
        detailsOdia: "ପୂର୍ବପୁରୁଷଙ୍କ ସ୍ମୃତିରେ ବିରାଟ ପଥର ସ୍ତମ୍ଭ (Menhir) ଓ ପ୍ରସ୍ତର କୋଠରୀ (Dolmen) ସ୍ଥାପନ କରାଯାଉଥିଲା। ଶବ ସହିତ ଲୁହା ଅସ୍ତ୍ର ଏବଂ ମାଟିପାତ୍ର ପୋତା ଯାଉଥିଲା।"
      },
      {
        nameOdia: "ଲୁହା ତରଳାଇବା ପ୍ରଯୁକ୍ତି ଓ କୃଷି ପ୍ରସାର",
        nameEn: "Iron Smelting & Agrarian Expansion",
        detailsOdia: "ଲୁହାର ଲଙ୍ଗଳ ଲୁହାକଣ୍ଟା ଏବଂ କଟୁରୀ ବନଜଙ୍ଗଲ ସଫା କରି ବ୍ୟାପକ କୃଷିଭୂମି ସୃଷ୍ଟି କରିବାରେ ଯୁଗାନ୍ତକାରୀ ପରିବର୍ତ୍ତନ ଆଣିଥିଲା।"
      }
    ],
    monuments: ["କୋରାପୁଟ ମେଗାଲିଥ୍ କ୍ଷେତ୍ର", "ତେଲେଙ୍ଗାପେଣ୍ଠା", "ମାଛକୁଣ୍ଡ ଉପତ୍ୟକା"],
    rulers: ["ଜନଜାତୀୟ ମେଗାଲିଥିକ୍ ମୁଖିଆ"],
    historicalEvidences: ["ବିରାଟ ପ୍ରସ୍ତର ସ୍ତମ୍ଭ", "ଲୁହା କୁରାଢ଼ି ଓ ତୀର", "ଅସ୍ଥିକୁମ୍ଭ (Urn Burials)"]
  },
  {
    id: "early-settlements",
    titleOdia: "ପ୍ରାରମ୍ଭିକ ବସତି (Early Settlements in Ancient Odisha)",
    titleEn: "Early Agrarian Settlements & Proto-Urban Centers",
    era: "ପ୍ରାକ୍-ନଗରୀକରଣ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧,୦୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୬୦୦",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ନଦୀକୂଳବର୍ତ୍ତୀ ଉର୍ବର ସମତଳ ଭୂମିରେ ପ୍ରାରମ୍ଭିକ ଗ୍ରାମୀଣ ବସତି ଗଢ଼ି ଉଠି କାଳକ୍ରମେ କୃଷି, କୁମ୍ଭକାର, ବୁଣାକାର ଓ ଧାତୁଶିଳ୍ପ ଭିତ୍ତିକ ସଂଗଠିତ ସମାଜରେ ପରିଣତ ହେଲା, ଯାହା ପ୍ରାଚୀନ କଳିଙ୍ଗ ରାଷ୍ଟ୍ର ଗଠନର ମୂଳଦୁଆ ଥିଲା।",
    subsections: [
      {
        nameOdia: "ସାମାଜିକ ଗଠନ ଓ ଶ୍ରମ ବିଭାଜନ",
        nameEn: "Social Stratification & Specialization",
        detailsOdia: "ବୃତ୍ତିଭିତ୍ତିକ ଶ୍ରମ ବିଭାଜନ ଯୋଗୁଁ କୃଷକ, କାରିଗର ଏବଂ ନୌ-ବାଣିଜ୍ୟିକ ଗୋଷ୍ଠୀଙ୍କ ଉଦ୍ଭବ ଘଟିଲା। ପରିବାର ଓ କୁଳ ସଂସ୍ଥା ଦୃଢ଼ୀଭୂତ ହେଲା।"
      },
      {
        nameOdia: "ମାଟିପାତ୍ର ଓ ପୋଡ଼ା ଇଟାର ପ୍ରାରମ୍ଭିକ ପ୍ରୟୋଗ",
        nameEn: "Pottery & Early Structural Remains",
        detailsOdia: "ଘର ଛାଉଣି, କୂଅ ଏବଂ ଶସ୍ୟ ସଂରକ୍ଷଣ କୋଠାର ବ୍ୟବସ୍ଥା ନଗରୀକରଣ ଆଡ଼କୁ ଅଗ୍ରଗତିର ସ୍ପଷ୍ଟ ସଙ୍କେତ ଦେଇଥିଲା।"
      }
    ],
    monuments: ["ପ୍ରାଚୀନ ତୋଷାଳୀ ବସତି", "ଶିଶୁପାଳଗଡ଼ ପ୍ରାଥମିକ ସ୍ତର", "ମହାନଦୀ ଡେଲ୍ଟା ସାଇଟ୍ସ"],
    rulers: ["କୁଳପତି ଓ ଗ୍ରାମଣୀ"],
    historicalEvidences: ["ପୋଡ଼ା ମାଟି ଇଟା", "ଶସ୍ୟ ସଂରକ୍ଷଣ ପାତ୍ର", "ଅସ୍ଥି ଉପକରଣ"]
  },

  // 9-23 ANCIENT KALINGA, UTKALA, ASHOKA, KHARAVELA
  {
    id: "ancient-kalinga",
    titleOdia: "ପ୍ରାଚୀନ କଳିଙ୍ଗ (Ancient Kalinga)",
    titleEn: "Ancient Kalinga: Maritime Power & Geopolitics",
    era: "ପ୍ରାଚୀନ ଐତିହାସିକ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧,୦୦୦ ରୁ ଖ୍ରୀଷ୍ଟାବ୍ଦ ୩୫୦",
    category: "ancient",
    image: "/images/ancient_kalinga_maritime.jpg",
    summaryOdia: "ଗଙ୍ଗାଠାରୁ ଗୋଦାବରୀ ଏବଂ ବଙ୍ଗୋପସାଗର ଉପକୂଳ ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତୃତ କଳିଙ୍ଗ ଏକ ଅପ୍ରତିଦ୍ୱନ୍ଦ୍ୱୀ ସାମୁଦ୍ରିକ ଓ ସାମରିକ ମହାଶକ୍ତି ଥିଲା। ମହାଭାରତ, ପୁରାଣ ଓ ବୌଦ୍ଧ ଜାତକ ଗ୍ରନ୍ଥରେ କଳିଙ୍ଗର ବୀରତା, ହସ୍ତୀବାହିନୀ ଏବଂ ନୌବାଣିଜ୍ୟର ଭୂୟସୀ ପ୍ରଶଂସା କରାଯାଇଛି।",
    subsections: [
      {
        nameOdia: "ଭୌଗୋଳିକ ସୀମା ଓ ମହାଭାରତରେ କଳିଙ୍ଗ",
        nameEn: "Geopolitical Extent & Mahabharata References",
        detailsOdia: "କଳିଙ୍ଗର ରାଜା ଶ୍ରୁତାୟୁଧ କୌରବଙ୍କ ପକ୍ଷରୁ ମହାଭାରତ ଯୁଦ୍ଧରେ ବିଶାଳ ଗଜବାହିନୀ ସହ ଅଂଶଗ୍ରହଣ କରିଥିଲେ। କଳିଙ୍ଗର ହାତୀ ଭାରତବର୍ଷରେ ସର୍ବଶ୍ରେଷ୍ଠ ବୋଲି କୌଟିଲ୍ୟଙ୍କ ଅର୍ଥଶାସ୍ତ୍ରରେ ବର୍ଣ୍ଣିତ।"
      },
      {
        nameOdia: "ସାମୁଦ୍ରିକ ସାମ୍ରାଜ୍ୟ ଓ ଦକ୍ଷିଣ-ପୂର୍ବ ଏସିଆ ସମ୍ପର୍କ",
        nameEn: "Maritime Dominance & Suvarnabhumi Links",
        detailsOdia: "ତାମ୍ରଲିପ୍ତ, ପିଠୁଣ୍ଡ, ଚେଳିତୋଳ ଓ ପାଲୁର ବନ୍ଦର ଦେଇ କଳିଙ୍ଗର ସାଧବମାନେ ଜାଭା, ବାଲି, ସୁମାତ୍ରା, ବର୍ଣ୍ଣିଓ ଓ ଶ୍ରୀଲଙ୍କା ସହ ଅଖଣ୍ଡ ବାଣିଜ୍ୟିକ ସମ୍ପର୍କ ସ୍ଥାପନ କରିଥିଲେ।"
      }
    ],
    monuments: ["ପାଲୁର ବନ୍ଦର (ଗଞ୍ଜାମ)", "ଶିଶୁପାଳଗଡ଼", "ମାଣିକପାଟଣା"],
    rulers: ["ରାଜା ଶ୍ରୁତାୟୁଧ", "ରାଜା ଚିତ୍ରାଙ୍ଗଦ", "ଚେଦି ରାଜବଂଶ"],
    historicalEvidences: ["ମହାଭାରତ ସଭାପର୍ବ", "ପେରିପ୍ଲସ୍ ଅଫ୍ ଦି ଏରିଥ୍ରିଆନ୍ ସି", "ଟଲେମିଙ୍କ ଭୂଗୋଳ"]
  },
  {
    id: "ancient-utkala",
    titleOdia: "ପ୍ରାଚୀନ ଉତ୍କଳ (Ancient Utkala)",
    titleEn: "Ancient Utkala: Land of Sublime Arts & Crafts",
    era: "ପ୍ରାଚୀନ ଐତିହାସିକ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୮୦୦ ରୁ ଖ୍ରୀଷ୍ଟାବ୍ଦ ୬୦୦",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ଉତ୍କୃଷ୍ଟ କଳାର ଦେଶ ଭାବେ 'ଉତ୍କଳ' ସମଗ୍ର ଭାରତବର୍ଷରେ ପ୍ରସିଦ୍ଧି ଲାଭ କରିଥିଲା। ଉତ୍ତର ଓଡ଼ିଶାର କପିଶା (କାଂସବାଂଶ) ନଦୀଠାରୁ ବୈତରଣୀ ପର୍ଯ୍ୟନ୍ତ ଏହାର ପ୍ରାଚୀନ ସୀମା ବିସ୍ତୃତ ଥିଲା। କାଳିଦାସଙ୍କ 'ରଘୁବଂଶମ୍' କାବ୍ୟରେ ଉତ୍କଳର ସୌନ୍ଦର୍ଯ୍ୟ ଓ ବୀରତ୍ୱ ବର୍ଣ୍ଣିତ।",
    subsections: [
      {
        nameOdia: "ଉତ୍କଳର ଉତ୍ପତ୍ତି ଓ ବୈଦିକ-ପୌରାଣିକ ଆଧାର",
        nameEn: "Origin & Mythological Context",
        detailsOdia: "ମନୁଙ୍କ ପୁତ୍ର ଇଳଙ୍କ ବଂଶଧର ରାଜା ଉତ୍କଳଙ୍କ ନାମାନୁସାରେ ଏହି ଅଞ୍ଚଳର ନାମକରଣ ହୋଇଥିବା ପୁରାଣରେ ଉଲ୍ଲେଖ ଅଛି। ଉତ୍କଳର କାରିଗରମାନେ ରୌପ୍ୟ ତାରକସି, ହସ୍ତତନ୍ତ ଓ ପ୍ରସ୍ତର କଳାରେ ଅଦ୍ୱିତୀୟ ଥିଲେ।"
      },
      {
        nameOdia: "ରଘୁଙ୍କ ଉତ୍କଳ ଅଭିଯାନ ଓ କପିଶା ନଦୀ ବିଜୟ",
        nameEn: "Raghu's Conquest & Classical Geography",
        detailsOdia: "ମହାକବି କାଳିଦାସଙ୍କ ଅନୁସାରେ ସମ୍ରାଟ ରଘୁ ବଙ୍ଗ ବିଜୟ ପରେ କପିଶା ନଦୀ ପାର ହୋଇ ଉତ୍କଳରେ ପ୍ରବେଶ କରିଥିଲେ ଏବଂ ଉତ୍କଳର ନରପତିମାନେ ତାଙ୍କୁ କଳିଙ୍ଗ ଯିବାର ପଥ ପ୍ରଦର୍ଶନ କରିଥିଲେ।"
      }
    ],
    monuments: ["ବାରିପଦା", "ବାଲେଶ୍ୱର ପୁରାତନ ଦୁର୍ଗ", "ବୈତରଣୀ ତୀର୍ଥ ଯାଜପୁର"],
    rulers: ["ରାଜା ଉତ୍କଳ", "ଉତ୍ତର ତୋଷାଳୀ ମଣ୍ଡଳାଧୀଶ୍ୱର"],
    historicalEvidences: ["କାଳିଦାସଙ୍କ ରଘୁବଂଶମ୍", "ବାୟୁ ପୁରାଣ", "ମାର୍କଣ୍ଡେୟ ପୁରାଣ"]
  },
  {
    id: "ancient-odra",
    titleOdia: "ପ୍ରାଚୀନ ଓଡ୍ର ଦେଶ (Ancient Odra Desha)",
    titleEn: "Ancient Odra Desha & Emergence of the Odia Identity",
    era: "ପ୍ରାଚୀନ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୬୦୦ ରୁ ଖ୍ରୀଷ୍ଟାବ୍ଦ ୮୦୦",
    category: "ancient",
    image: "/images/eastern_ganga_konark.jpg",
    summaryOdia: "ଓଡ୍ର କିମ୍ବା ଉଦ୍ର ଜନଜାତିଙ୍କ ବସତି ଉପରେ ଆଧାରିତ 'ଓଡ୍ର ଦେଶ' ପରବର୍ତ୍ତୀ ସମୟରେ ଆଧୁନିକ 'ଓଡ଼ିଶା' ଏବଂ 'ଓଡ଼ିଆ' ଜାତିର ନାମକରଣର ମୁଖ୍ୟ ଉତ୍ସ ହେଲା। ହ୍ୟୁଏନ୍ ସାଙ୍ଗ୍ ତାଙ୍କ ଭ୍ରମଣ ବୃତ୍ତାନ୍ତରେ ଏହାକୁ 'ଉ-ଚା' (Wu-T'u) ବୋଲି ଉଲ୍ଲେଖ କରିଛନ୍ତି।",
    subsections: [
      {
        nameOdia: "ଓଡ୍ର ଜାତିର ମୂଳ ଓ ସାମାଜିକ ଗଠନ",
        nameEn: "Tribal Origins & Cultural Synthesis",
        detailsOdia: "ମୂଳ ଅଷ୍ଟ୍ରୋ-ଏସିଆଟିକ୍ ଏବଂ ଦ୍ରାବିଡ଼ ସଂସ୍କୃତି ସହିତ ଆର୍ଯ୍ୟ ସଂସ୍କୃତିର ଅପୂର୍ବ ମିଳନ ଓଡ୍ର ଦେଶରେ ଘଟିଥିଲା, ଯାହା ପରବର୍ତ୍ତୀ କାଳରେ ଜଗନ୍ନାଥ ସଂସ୍କୃତିର ଭିତ୍ତିଭୂମି ହେଲା।"
      },
      {
        nameOdia: "ହ୍ୟୁଏନ୍ ସାଙ୍ଗ୍‌ଙ୍କ ବିବରଣୀରେ ଓଡ୍ର ଦେଶ (୭ମ ଶତାବ୍ଦୀ)",
        nameEn: "Hiuen Tsang's Accounts of Wu-T'u",
        detailsOdia: "ଚୀନ ପରିବ୍ରାଜକ ହ୍ୟୁଏନ୍ ସାଙ୍ଗ୍ ୬୩୯ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ଓଡ୍ର ପରିଦର୍ଶନ କରି ଲେଖିଥିଲେ ଯେ ଏଠାକାର ଲୋକେ ଧର୍ମପ୍ରାଣ, ତେଜସ୍ୱୀ, ବିଦ୍ୟାନୁରାଗୀ ଏବଂ ଏଠାରେ ବୌଦ୍ଧ ମହାଯାନ ଓ ବଜ୍ରଯାନର ବିରାଟ କେନ୍ଦ୍ର ଥିଲା।"
      }
    ],
    monuments: ["ପୁଷ୍ପଗିରି ମହାବିହାର", "ରତ୍ନଗିରି", "ଲଳିତଗିରି"],
    rulers: ["ଓଡ୍ର ରାଜନ୍ୟବର୍ଗ", "ମହାରାଜା ଶୁଭାକର"],
    historicalEvidences: ["ହ୍ୟୁଏନ୍ ସାଙ୍ଗ୍ ସି-ୟୁ-କି", "ନାଟ୍ୟଶାସ୍ତ୍ର (ଓଡ୍ର-ମାଗଧୀ ପ୍ରବୃତ୍ତି)", "ସୋର ତାମ୍ରଫଳକ"]
  },
  {
    id: "ancient-tosali",
    titleOdia: "ପ୍ରାଚୀନ ତୋଷାଳୀ (Ancient Tosali)",
    titleEn: "Ancient Tosali: The Imperial Metropolis",
    era: "ମୌର୍ଯ୍ୟ ଓ ପ୍ରାକ୍-ଗୁପ୍ତ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୪୦୦ ରୁ ଖ୍ରୀଷ୍ଟାବ୍ଦ ୬୦୦",
    category: "ancient",
    image: "/images/mauryan_empire_ashoka.jpg",
    summaryOdia: "ତୋଷାଳୀ ଥିଲା ପ୍ରାଚୀନ କଳିଙ୍ଗର ରାଜନୈତିକ ଓ ପ୍ରଶାସନିକ ପ୍ରାଣକେନ୍ଦ୍ର। ମୌର୍ଯ୍ୟ ସମ୍ରାଟ ଅଶୋକ ଏବଂ ପରବର୍ତ୍ତୀ ଶାସକମାନଙ୍କ ସମୟରେ ତୋଷାଳୀ ଏକ ସମୃଦ୍ଧ ଦୁର୍ଗନଗରୀ ଓ ବାଣିଜ୍ୟିକ ମହାନଗର ଭାବେ ଖ୍ୟାତି ଅର୍ଜନ କରିଥିଲା।",
    subsections: [
      {
        nameOdia: "ଉତ୍ତର ଓ ଦକ୍ଷିଣ ତୋଷାଳୀର ବିଭାଜନ",
        nameEn: "Administrative Division: Uttara & Daksina Tosali",
        detailsOdia: "ମହାନଦୀ ଉତ୍ତର ଓ ଦକ୍ଷିଣ ତୋଷାଳୀର ପ୍ରାକୃତିକ ସୀମା ଥିଲା। ଏହି ଅଞ୍ଚଳ ବହୁ ପ୍ରମୁଖ ତାମ୍ରଶାସନ ଓ ଶିଳାଲେଖରେ ପ୍ରଶାସନିକ ୟୁନିଟ୍ ଭାବେ ଉଲ୍ଲିଖିତ।"
      },
      {
        nameOdia: "ଶିଶୁପାଳଗଡ଼ ସହ ତୋଷାଳୀର ଚିହ୍ନଟିକରଣ",
        nameEn: "Identification of Tosali with Sisupalgarh",
        detailsOdia: "ପ୍ରଖ୍ୟାତ ପ୍ରତ୍ନତତ୍ତ୍ୱବିତ୍ ବି. ବି. ଲାଲ୍‌ଙ୍କ ଖନନ ଅନୁସାରେ ଭୁବନେଶ୍ୱର ନିକଟସ୍ଥ ବିଶାଳ ପରିଖା-ପ୍ରାଚୀର ବେଷ୍ଟିତ ଶିଶୁପାଳଗଡ଼ ହିଁ ଐତିହାସିକ ତୋଷାଳୀ ବା କଳିଙ୍ଗନଗରୀ ଥିଲା।"
      }
    ],
    monuments: ["ଶିଶୁପାଳଗଡ଼ ଦୁର୍ଗ", "ଧଉଳି ଅଶୋକ ଶିଳାଲେଖ", "କଳିଙ୍ଗନଗରୀ ତୋରଣ"],
    rulers: ["ଅଶୋକଙ୍କ ରାଜକୁମାର ପ୍ରତିନିଧି (କୁମାର)", "ମହାମେଘବାହନ ରାଜା"],
    historicalEvidences: ["ଧଉଳି ପ୍ରଥମ ଓ ଦ୍ୱିତୀୟ ସ୍ୱତନ୍ତ୍ର ଶିଳାଲେଖ", "ଶିଶୁପାଳଗଡ଼ ଖନନ ରିପୋର୍ଟ"]
  },
  {
    id: "mahajanapada-period",
    titleOdia: "ମହାଜନପଦ ଯୁଗ ଓ କଳିଙ୍ଗ (Mahajanapada Period)",
    titleEn: "Kalinga during the Mahajanapada Era",
    era: "ମହାଜନପଦ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୬୦୦ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୩୫୦",
    category: "ancient",
    image: "/images/indus_valley_harappa.jpg",
    summaryOdia: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ଷଷ୍ଠ ଶତାବ୍ଦୀରେ ଭାରତବର୍ଷରେ ୧୬ଟି ମହାଜନପଦ ଗଠନ ସମୟରେ କଳିଙ୍ଗ ଏକ ସ୍ୱତନ୍ତ୍ର, ଶକ୍ତିଶାଳୀ ଗଣରାଜ୍ୟ ଓ ରାଜତନ୍ତ୍ର ଭାବେ ସ୍ୱାଧୀନତା ବଜାୟ ରଖିଥିଲା ଏବଂ ମଗଧର ସାମ୍ରାଜ୍ୟବାଦୀ ଆକାଂକ୍ଷାକୁ ପ୍ରତିହତ କରିଥିଲା।",
    subsections: [
      {
        nameOdia: "ବୌଦ୍ଧ ଓ ଜୈନ ଗ୍ରନ୍ଥରେ କଳିଙ୍ଗ ଉଲ୍ଲେଖ",
        nameEn: "Anguttara Nikaya & Jaina Canonical Text",
        detailsOdia: "ଦୀଘ ନିକାୟ ଏବଂ ଉତ୍ତରାଧ୍ୟୟନ ସୂତ୍ରରେ କଳିଙ୍ଗର ରାଜଧାନୀ ଦନ୍ତପୁର (Dantapura) ର ବର୍ଣ୍ଣନା ରହିଛି, ଯେଉଁଠାରୁ ବୌଦ୍ଧ ଧର୍ମ ଏବଂ ଜୈନ ଧର୍ମର ପ୍ରସାର ହୋଇଥିଲା।"
      },
      {
        nameOdia: "ନନ୍ଦ ରାଜବଂଶର କଳିଙ୍ଗ ଅଭିଯାନ ଓ କଳିଙ୍ଗ ଜିନ",
        nameEn: "Nanda Incursion & The Sacred Jina Idol",
        detailsOdia: "ମହାପଦ୍ମ ନନ୍ଦ କଳିଙ୍ଗ ଆକ୍ରମଣ କରି ଏକ କେନାଲ (ଜଳସେଚନ ନାଳ) ଖୋଳାଇଥିଲେ ଏବଂ ପବିତ୍ର 'କଳିଙ୍ଗ ଜିନ' ପ୍ରତିମାକୁ ବିଜୟ ସ୍ମାରକ ଭାବେ ମଗଧ ନେଇଯାଇଥିଲେ।"
      }
    ],
    monuments: ["ଦନ୍ତପୁର ସାଇଟ୍ (ପାଲୁର/କଳିଙ୍ଗପାଟଣା)", "ଅସୁରଗଡ଼ ଦୁର୍ଗ", "ରାଧାନଗର"],
    rulers: ["କଳିଙ୍ଗ ରାଜା ବ୍ରହ୍ମଦତ୍ତ", "ମହାପଦ୍ମ ନନ୍ଦ"],
    historicalEvidences: ["ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ (ନନ୍ଦରାଜା ଉଲ୍ଲେଖ)", "ଚୂଳିଙ୍ଗ ଜାତକ", "ମହାଗୋବିନ୍ଦ ସୁତ୍ତ"]
  },
  {
    id: "kalinga-war",
    titleOdia: "କଳିଙ୍ଗ ଯୁଦ୍ଧ (The Historic Kalinga War — 261 BC)",
    titleEn: "The Kalinga War: Turning Point of World History",
    era: "ମୌର୍ଯ୍ୟ ଯୁଗ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୬୧",
    category: "ancient",
    image: "/images/mauryan_empire_ashoka.jpg",
    summaryOdia: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୬୧ରେ ଦୟାନଦୀ କୂଳରେ ସଂଘଟିତ ଐତିହାସିକ କଳିଙ୍ଗ ଯୁଦ୍ଧ ବିଶ୍ୱ ଇତିହାସର ଏକ ଯୁଗାନ୍ତକାରୀ ଘଟଣା। କଳିଙ୍ଗବାସୀଙ୍କ ଅଦମ୍ୟ ଦେଶପ୍ରେମ ଓ ଆତ୍ମବଳିଦାନ ରକ୍ତପିପାସୁ ଚଣ୍ଡାଶୋକଙ୍କୁ ଅହିଂସାବାଦୀ 'ଧର୍ମାଶୋକ'ରେ ରୂପାନ୍ତରିତ କରିଥିଲା।",
    subsections: [
      {
        nameOdia: "ଯୁଦ୍ଧର କାରଣ: ସାମୁଦ୍ରିକ ବାଣିଜ୍ୟ ଓ ସ୍ୱାଭିମାନ",
        nameEn: "Geopolitical, Economic & Trade Causes",
        detailsOdia: "ମୌର୍ଯ୍ୟ ସାମ୍ରାଜ୍ୟର ଦକ୍ଷିଣ ଭାରତ ଓ ସମୁଦ୍ର ପଥରେ କଳିଙ୍ଗ ଏକ ବିରାଟ ପ୍ରତିବନ୍ଧକ ଥିଲା। କଳିଙ୍ଗର ଅସୀମ ସମୃଦ୍ଧି ଓ ସ୍ୱାଧୀନତା ଅଶୋକଙ୍କ ସାମ୍ରାଜ୍ୟବାଦ ପାଇଁ ଚ୍ୟାଲେଞ୍ଜ ଥିଲା।"
      },
      {
        nameOdia: "ଭୟାବହ କ୍ଷୟକ୍ଷତି ଓ ଅଶୋକଙ୍କ ହୃଦୟ ପରିବର୍ତ୍ତନ",
        nameEn: "Catastrophic Devastation & Transformation",
        detailsOdia: "ଅଶୋକଙ୍କ ୧୩ଶ ଶିଳାଲେଖ ଅନୁସାରେ ଏହି ଯୁଦ୍ଧରେ ୧ ଲକ୍ଷ ସୈନିକ ନିହତ ହୋଇଥିଲେ, ୧.୫ ଲକ୍ଷ ବନ୍ଦୀ ହୋଇଥିଲେ ଏବଂ ଅଗଣିତ ଲୋକ ବେଘର ହୋଇଥିଲେ। ଦୟା ନଦୀର ରକ୍ତରଞ୍ଜିତ ଜଳ ଦେଖି ଅଶୋକ ଯୁଦ୍ଧବିଜୟ (ଦିଗ୍‌ବିଜୟ) ତ୍ୟାଗ କରି ଧର୍ମବିଜୟ ଗ୍ରହଣ କରିଥିଲେ।"
      }
    ],
    monuments: ["ଦୟାନଦୀ ତଟ", "ଧଉଳି ଶାନ୍ତିସ୍ତୂପ", "ଅଶୋକଙ୍କ ୧୩ଶ ଶିଳାଲିପି"],
    rulers: ["ସମ୍ରାଟ ଅଶୋକ", "କଳିଙ୍ଗ ମହାସଂଘର ଅଜ୍ଞାତ ବୀର ସେନାପତି"],
    historicalEvidences: ["ଅଶୋକଙ୍କ ୧୩ଶ ପ୍ରଧାନ ଶିଳାଲେଖ (ଗିରନାର/ଶାହାବାଜଗଢ଼ି)", "ଧଉଳି ଶିଳାଲେଖ"]
  },
  {
    id: "dhauli",
    titleOdia: "ଧଉଳି (Dhauli Shanti Stupa & Rock Edicts)",
    titleEn: "Dhauli: The Epicenter of Peace & Buddhist Renaissance",
    era: "ମୌର୍ଯ୍ୟ ଓ ଆଧୁନିକ ବୌଦ୍ଧ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୬୦ ରୁ ବର୍ତ୍ତମାନ",
    category: "ancient",
    image: "/images/mauryan_empire_ashoka.jpg",
    summaryOdia: "ଭୁବନେଶ୍ୱର ଉପକଣ୍ଠ ଦୟାନଦୀ ତଟସ୍ଥ ଧଉଳି ପାହାଡ଼ ଅଶୋକଙ୍କ ଐତିହାସିକ ଶିଳାଲେଖ ଏବଂ ପ୍ରାଚୀନତମ ପ୍ରସ୍ତର ହସ୍ତୀ ଭାସ୍କର୍ଯ୍ୟ ପାଇଁ ପ୍ରସିଦ୍ଧ। ୧୯୭୨ରେ ନିର୍ମିତ ଧବଳ ଶାନ୍ତିସ୍ତୂପ ବିଶ୍ୱ ଶାନ୍ତି ଓ ଅହିଂସାର ଜୀବନ୍ତ ପ୍ରତୀକ।",
    subsections: [
      {
        nameOdia: "ଅଶୋକଙ୍କ ପ୍ରସ୍ତର ହସ୍ତୀ ଓ କଳାତ୍ମକ ଉତ୍କର୍ଷ",
        nameEn: "The Rock-Cut Elephant Sculpture",
        detailsOdia: "ପାହାଡ଼ କାଟି ନିର୍ମିତ ଏହି ହସ୍ତୀ ପ୍ରତିମା ଭାରତୀୟ ଶିଳ୍ପକଳାର ପ୍ରାଚୀନତମ ନିଦର୍ଶନ, ଯାହା ଭଗବାନ ବୁଦ୍ଧଙ୍କ ଗର୍ଭାଧାନର ପ୍ରତୀକ ଶ୍ୱେତହସ୍ତୀକୁ ସୂଚାଏ।"
      },
      {
        nameOdia: "ଧଉଳି ଶାନ୍ତିସ୍ତୂପ (ଇଣ୍ଡୋ-ଜାପାନୀୟ ମୈତ୍ରୀ)",
        nameEn: "Dhauli Peace Pagoda (1972)",
        detailsOdia: "ଜାପାନର କଳିଙ୍ଗ ନିପ୍ପନଜାନ ସଂଘର ଗୁରୁଜୀ ଫୁଜିଙ୍କ ସହଯୋଗରେ ନିର୍ମିତ ଏହି ସ୍ତୂପରେ ବୁଦ୍ଧଙ୍କ ଜୀବନୀ ଓ କଳିଙ୍ଗ ଯୁଦ୍ଧର ଦୃଶ୍ୟାବଳୀ ପ୍ରସ୍ତର ଫଳକରେ ଖୋଦିତ।"
      }
    ],
    monuments: ["ଧଉଳି ଶାନ୍ତିସ୍ତୂପ", "ଅଶୋକ ପ୍ରସ୍ତର ଖୋଦିତ ହସ୍ତୀ", "ଧଉଳି ଶିଳାଲେଖ ଚେମ୍ବର"],
    rulers: ["ସମ୍ରାଟ ଅଶୋକ", "ନିଚିଦାତ୍ସୁ ଫୁଜି ଗୁରୁଜୀ"],
    historicalEvidences: ["ଧଉଳି କଳିଙ୍ଗ ଶିଳାଲେଖ", "ଅଶୋକକାଳୀନ ପାଲି-ବ୍ରାହ୍ମୀ ଲିପି"]
  },
  {
    id: "ashoka-and-kalinga",
    titleOdia: "ଅଶୋକ ଏବଂ କଳିଙ୍ଗ (Ashoka's Transformation & Dhamma in Kalinga)",
    titleEn: "Emperor Ashoka & The Spiritual Transformation of Kalinga",
    era: "ମୌର୍ଯ୍ୟ ସାମ୍ରାଜ୍ୟ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୬୧ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୩୨",
    category: "ancient",
    image: "/images/mauryan_empire_ashoka.jpg",
    summaryOdia: "କଳିଙ୍ଗ ଯୁଦ୍ଧ ପରେ ଅଶୋକ ଉପଗୁପ୍ତଙ୍କ ଦ୍ୱାରା ବୌଦ୍ଧ ଧର୍ମରେ ଦୀକ୍ଷିତ ହୋଇ କଳିଙ୍ଗରେ କଲ୍ୟାଣକାରୀ ଶାସନ ପ୍ରତିଷ୍ଠା କରିଥିଲେ। ସେ ଘୋଷଣା କରିଥିଲେ: 'ସବେ ମୁନିସେ ପଜା ମମା' (ସମସ୍ତ ପ୍ରଜା ମୋର ସନ୍ତାନ ସଦୃଶ)।",
    subsections: [
      {
        nameOdia: "ସ୍ୱତନ୍ତ୍ର କଳିଙ୍ଗ ଅନୁଶାସନ (Seprate Edicts)",
        nameEn: "Special Kalinga Rock Edicts",
        detailsOdia: "ଧଉଳି ଓ ଜୌଗଡ଼ରେ ଅଶୋକ ତାଙ୍କ ମହାମାତ୍ର (ପ୍ରଶାସକ) ମାନଙ୍କୁ ନିର୍ଦ୍ଦେଶ ଦେଇଥିଲେ ଯେ ପ୍ରଜାମାନଙ୍କୁ ବିନା କାରଣରେ କାରାରୁଦ୍ଧ ବା ନିର୍ଯାତନା ନ ଦେଇ ନ୍ୟାୟ ଓ ସହାନୁଭୂତିର ସହ ଶାସନ କରିବାକୁ।"
      },
      {
        nameOdia: "ବୌଦ୍ଧ ଧର୍ମ ପ୍ରଚାର ଓ ସଂଘମିତ୍ରା-ମହେନ୍ଦ୍ରଙ୍କ ଯାତ୍ରା",
        nameEn: "Global Dhamma Propagation from Kalinga Ports",
        detailsOdia: "କଳିଙ୍ଗର ତାମ୍ରଲିପ୍ତ ଓ ଚାରିତ୍ରପୁର ବନ୍ଦର ଦେଇ ମହେନ୍ଦ୍ର ଓ ସଂଘମିତ୍ରା ବୋଧିଦ୍ରୁମ ଶାଖା ନେଇ ଶ୍ରୀଲଙ୍କା ଯାତ୍ରା କରିଥିଲେ।"
      }
    ],
    monuments: ["ଜୌଗଡ଼ ଶିଳାଲେଖ (ଗଞ୍ଜାମ)", "ଧଉଳି ଶିଳାସ୍ତମ୍ଭ", "ତୋଷାଳୀ ପ୍ରଶାସନିକ କେନ୍ଦ୍ର"],
    rulers: ["ଧର୍ମାଶୋକ (ମୌର୍ଯ୍ୟ ସମ୍ରାଟ)", "କୁମାର ପ୍ରତିନିଧି"],
    historicalEvidences: ["ଜୌଗଡ଼ ସ୍ୱତନ୍ତ୍ର ଅନୁଶାସନ", "ମହାବଂଶ ଓ ଦୀପବଂଶ"]
  },
  {
    id: "mauryan-rule",
    titleOdia: "ମୌର୍ଯ୍ୟ ଶାସନ ଓ ପ୍ରଶାସନ (Mauryan Administration in Kalinga)",
    titleEn: "Mauryan Administrative Apparatus in Kalinga",
    era: "ମୌର୍ଯ୍ୟ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୬୧ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧୮୫",
    category: "ancient",
    image: "/images/mauryan_empire_ashoka.jpg",
    summaryOdia: "କଳିଙ୍ଗ ମୌର୍ଯ୍ୟ ସାମ୍ରାଜ୍ୟର ପଞ୍ଚମ ପ୍ରଦେଶ ଭାବେ ଗଠିତ ହୋଇଥିଲା। ତୋଷାଳୀ (ଉତ୍ତର କଳିଙ୍ଗ) ଏବଂ ସମାପା (ଦକ୍ଷିଣ କଳିଙ୍ଗ / ଜୌଗଡ଼) ଥିଲା ଦୁଇଟି ମୁଖ୍ୟ ପ୍ରଶାସନିକ କେନ୍ଦ୍ର, ଯେଉଁଠାରେ ରାଜକୁମାର (କୁମାର) ଓ ଧର୍ମ ମହାମାତ୍ରମାନେ ଶାସନ ପରିଚାଳନା କରୁଥିଲେ।",
    subsections: [
      {
        nameOdia: "ସମାପା (ଜୌଗଡ଼) ଦୁର୍ଗ ଓ ପ୍ରଶାସନିକ ବ୍ୟବସ୍ଥା",
        nameEn: "Samapa Fortress & Provincial Governance",
        detailsOdia: "ଜୌଗଡ଼ ଋଷିକୁଲ୍ୟା ନଦୀ କୂଳରେ ଏକ ବିରାଟ ମାଟି ଓ ଇଟା ନିର୍ମିତ ଦୁର୍ଗ ଥିଲା, ଯେଉଁଠାରୁ ଦକ୍ଷିଣ କଳିଙ୍ଗର ଜଙ୍ଗଲୀ ଜନଜାତି ଓ ବାଣିଜ୍ୟ ପଥ ନିୟନ୍ତ୍ରଣ କରାଯାଉଥିଲା।"
      },
      {
        nameOdia: "ଜଳସେଚନ, ରାଜପଥ ଓ ରାଜସ୍ୱ ବ୍ୟବସ୍ଥା",
        nameEn: "Highways, Irrigation & Revenue Infrastructure",
        detailsOdia: "ପାଟଳିପୁତ୍ରରୁ କଳିଙ୍ଗ ଦେଇ ଦକ୍ଷିଣାପଥ ପର୍ଯ୍ୟନ୍ତ ବିରାଟ ମୌର୍ଯ୍ୟ ରାଜପଥ ନିର୍ମିତ ହୋଇଥିଲା, ଯାହା ବାଣିଜ୍ୟିକ ଯୋଗାଯୋଗକୁ ଅଭୂତପୂର୍ବ ଗତି ପ୍ରଦାନ କରିଥିଲା।"
      }
    ],
    monuments: ["ଜୌଗଡ଼ ଦୁର୍ଗ ପରିଖା", "ତୋଷାଳୀ ରାଜପଥ", "ଶିଶୁପାଳଗଡ଼ ପ୍ରାଚୀର"],
    rulers: ["ମୌର୍ଯ୍ୟ କୁମାର ପ୍ରଶାସକ", "ଧର୍ମ ମହାମାତ୍ର"],
    historicalEvidences: ["ଜୌଗଡ଼ ଦୁର୍ଗ ଖନନ", "କୌଟିଲ୍ୟଙ୍କ ଅର୍ଥଶାସ୍ତ୍ର"]
  },
  {
    id: "post-mauryan-odisha",
    titleOdia: "ଉତ୍ତର-ମୌର୍ଯ୍ୟ ଯୁଗର ଓଡ଼ିଶା (Post-Mauryan Odisha)",
    titleEn: "Post-Mauryan Resurgence & Mahameghavahana Rise",
    era: "ଉତ୍ତର-ମୌର୍ଯ୍ୟ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧୮୫ ରୁ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ ଶତାବ୍ଦୀ",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ମୌର୍ଯ୍ୟ ସାମ୍ରାଜ୍ୟର ପତନ ପରେ କଳିଙ୍ଗ ପୁନର୍ବାର ସ୍ୱାଧୀନତା ଘୋଷଣା କଲା। ଚେଦି ବଂଶର ମହାମେଘବାହନ ଶାଖା କଳିଙ୍ଗରେ ଏକ ଶକ୍ତିଶାଳୀ ଜାତୀୟ ସାମ୍ରାଜ୍ୟ ପ୍ରତିଷ୍ଠା କରି ପୂର୍ବ ଭାରତରେ କଳିଙ୍ଗର ପ୍ରଭୁତ୍ୱ ପୁନଃସ୍ଥାପିତ କରିଥିଲେ।",
    subsections: [
      {
        nameOdia: "ଚେଦି ରାଜବଂଶର ପ୍ରତିଷ୍ଠା ଓ ମହାମେଘବାହନ",
        nameEn: "Founding of the Mahameghavahana Dynasty",
        detailsOdia: "ମହାମେଘବାହନ ନାମକ ବୀର ପୁରୁଷ ଏହି ବଂଶ ପ୍ରତିଷ୍ଠା କରିଥିଲେ। ଏହି ବଂଶର ଶାସକମାନେ କଳିଙ୍ଗାଧିପତି ଉପାଧି ଧାରଣ କରିଥିଲେ।"
      },
      {
        nameOdia: "ସାମରିକ ପୁନର୍ଗଠନ ଓ ଆଞ୍ଚଳିକ ସାର୍ବଭୌମତ୍ୱ",
        nameEn: "Military Revival & Regional Dominance",
        detailsOdia: "ଶୁଙ୍ଗ ଏବଂ ସାତବାହନ ସାମ୍ରାଜ୍ୟର ସମସାମୟିକ ହୋଇ ମଧ୍ୟ କଳିଙ୍ଗ ନିଜର ଶକ୍ତି ବୃଦ୍ଧି କରି ସମଗ୍ର ପୂର୍ବ ଭାରତରେ ଅପ୍ରତିହତ ଶକ୍ତି ହୋଇ ଉଭା ହେଲା।"
      }
    ],
    monuments: ["ଉଦୟଗିରି ଗୁମ୍ଫା", "ଶିଶୁପାଳଗଡ଼ ନବୀକରଣ", "କଳିଙ୍ଗନଗରୀ ପୁନରୁଦ୍ଧାର"],
    rulers: ["ମହାମେଘବାହନ", "କୁଳରାଜ ଚେତରାଜ"],
    historicalEvidences: ["ଗୁଣ୍ଟୁପଲ୍ଲୀ ଶିଳାଲେଖ", "ହାତୀଗୁମ୍ଫା ପ୍ରାରମ୍ଭିକ ପଙ୍କ୍ତି"]
  },
  {
    id: "mahameghavahana-dynasty",
    titleOdia: "ମହାମେଘବାହନ ରାଜବଂଶ (The Mahameghavahana Dynasty)",
    titleEn: "The Imperial Mahameghavahanas of Kalinga",
    era: "ମହାମେଘବାହନ ଯୁଗ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ ଶତାବ୍ଦୀ ରୁ ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧ମ ଶତାବ୍ଦୀ",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ମହାମେଘବାହନ ରାଜବଂଶ ପ୍ରାଚୀନ ଓଡ଼ିଶା ଇତିହାସର ଏକ ସ୍ୱର୍ଣ୍ଣିମ ଅଧ୍ୟାୟ। ଏହି ବଂଶର ତୃତୀୟ ସମ୍ରାଟ ମହାମେଘବାହନ ଐର ଖାରବେଳ କଳିଙ୍ଗକୁ ଏକ ସର୍ବଭାରତୀୟ ମହାସାମ୍ରାଜ୍ୟରେ ପରିଣତ କରିଥିଲେ।",
    subsections: [
      {
        nameOdia: "ରାଜବଂଶର କାଳକ୍ରମ ଓ ମୁଖ୍ୟ ଶାସକ",
        nameEn: "Chronology & Royal Lineage",
        detailsOdia: "ମହାମେଘବାହନ, ଚେତରାଜ (ବୃଦ୍ଧରାଜ), ଖାରବେଳ, କୁଦେପସିରି ଏବଂ ବଡୁଖଙ୍କ ଭଳି ରାଜାମାନେ କଳିଙ୍ଗ ଶାସନ କରିଥିଲେ।"
      },
      {
        nameOdia: "ଜୈନ ଧର୍ମର ସଂରକ୍ଷଣ ଓ ଧର୍ମନିରପେକ୍ଷ ଶାସନ",
        nameEn: "Patronage to Jainism & Religious Pluralism",
        detailsOdia: "ଏହି ରାଜବଂଶ ଜୈନ ଧର୍ମର ପୃଷ୍ଠପୋଷକ ଥିଲେ ମଧ୍ୟ 'ସବପାସଣ୍ଡ ପୂଜକୋ' (ସମସ୍ତ ଧର୍ମର ସମ୍ମାନକାରୀ) ଆଦର୍ଶ ପାଳନ କରୁଥିଲେ।"
      }
    ],
    monuments: ["ମଞ୍ଚପୁରୀ ଗୁମ୍ଫା", "ସ୍ୱର୍ଗପୁରୀ ଗୁମ୍ଫା", "ଉଦୟଗିରି ରାଣୀଗୁମ୍ଫା"],
    rulers: ["ସମ୍ରାଟ ଖାରବେଳ", "କୁଦେପସିରି", "ରାଜକୁମାର ବଡୁଖ"],
    historicalEvidences: ["ମଞ୍ଚପୁରୀ ଶିଳାଲେଖ", "ହାତୀଗୁମ୍ଫା ୧୭ଟି ଧାଡ଼ିର ପ୍ରଶସ୍ତି"]
  },
  {
    id: "kharavela",
    titleOdia: "ସମ୍ରାଟ ଖାରବେଳ (Emperor Kharavela the Great)",
    titleEn: "Emperor Kharavela: The Illustrious Conqueror of Kalinga",
    era: "ମହାମେଘବାହନ ଯୁଗ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ ଶତାବ୍ଦୀ",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ସମ୍ରାଟ ଖାରବେଳ ପ୍ରାଚୀନ ଭାରତର ଅନ୍ୟତମ ଶ୍ରେଷ୍ଠ ଦିଗ୍‌ବିଜୟୀ ସମ୍ରାଟ। ସେ ମାତ୍ର ୨୪ ବର୍ଷ ବୟସରେ ସିଂହାସନ ଆରୋହଣ କରି ତାଙ୍କର ୧୩ ବର୍ଷର ଶାସନ କାଳ ମଧ୍ୟରେ ଦକ୍ଷିଣ, ପଶ୍ଚିମ ଓ ଉତ୍ତର ଭାରତ ବିଜୟ କରି କଳିଙ୍ଗର ପତାକା ହିମାଳୟଠାରୁ କନ୍ୟାକୁମାରୀ ପର୍ଯ୍ୟନ୍ତ ଉଡ଼ାଇଥିଲେ।",
    subsections: [
      {
        nameOdia: "ସାମରିକ ଦିଗ୍‌ବିଜୟ: ମଗଧ, ସାତବାହନ ଓ ଯବନ ଦମନ",
        nameEn: "Military Campaigns Across India",
        detailsOdia: "ଖାରବେଳ ପଶ୍ଚିମରେ ସାତବାହନ ରାଜା ଶାତକର୍ଣ୍ଣିଙ୍କୁ ଆହ୍ୱାନ ଦେଇଥିଲେ, ମଥୁରାରୁ ଯବନ (ଗ୍ରୀକ୍) ରାଜା ଡିମେଟ୍ରିଅସ୍‌ଙ୍କୁ ତଡ଼ି ଦେଇଥିଲେ ଏବଂ ମଗଧ ରାଜା ବୃହସ୍ପତିମିତ୍ରଙ୍କୁ ପରାସ୍ତ କରି ନନ୍ଦରାଜାଙ୍କ ଦ୍ୱାରା ନିଆଯାଇଥିବା 'କଳିଙ୍ଗ ଜିନ' ପ୍ରତିମାକୁ ସସମ୍ମାନେ କଳିଙ୍ଗ ଫେରାଇ ଆଣିଥିଲେ।"
      },
      {
        nameOdia: "ଲୋକହିତକର କାର୍ଯ୍ୟ ଓ କଳା-ସାହିତ୍ୟ ପୃଷ୍ଠପୋଷକତା",
        nameEn: "Civic Works, Arts & Music Mastery",
        detailsOdia: "ଖାରବେଳ ବାତ୍ୟାବିଧ୍ୱସ୍ତ କଳିଙ୍ଗନଗରୀର ପ୍ରାଚୀର ଓ ପ୍ରାସାଦ ପୁନର୍ନିର୍ମାଣ କରିଥିଲେ, ତନସୁଳିଆ କେନାଲକୁ ରାଜଧାନୀ ପର୍ଯ୍ୟନ୍ତ ସଂପ୍ରସାରଣ କରିଥିଲେ ଏବଂ 'ଗାନ୍ଧର୍ବ ବେଦ ବୁଧୋ' (ସଙ୍ଗୀତ ଓ ନାଟ୍ୟଶାସ୍ତ୍ର ବିଶାରଦ) ଭାବେ ପ୍ରଜାମାନଙ୍କ ପାଇଁ ମହାଉତ୍ସବ ଆୟୋଜନ କରୁଥିଲେ।"
      }
    ],
    monuments: ["ଉଦୟଗିରି ହାତୀଗୁମ୍ଫା", "ରାଣୀଗୁମ୍ଫା ଦୁଇ ମହଲା ମଞ୍ଚ", "ଶିଶୁପାଳଗଡ଼ ରାଜପ୍ରାସାଦ"],
    rulers: ["ମହାମେଘବାହନ ଐର ଖାରବେଳ", "ମହିଷୀ ରାଣୀ ବଜ୍ରଘରସିଂହପ୍ରିୟା"],
    historicalEvidences: ["ହାତୀଗୁମ୍ଫା ୧୭ ଧାଡ଼ିର ପ୍ରାକୃତ-ବ୍ରାହ୍ମୀ ଶିଳାଲେଖ"]
  },
  {
    id: "hathigumpha-inscription",
    titleOdia: "ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ (Hathigumpha Inscription)",
    titleEn: "The Hathigumpha Epigraph: Year-by-Year Chronicle",
    era: "ମହାମେଘବାହନ ଯୁଗ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ ଶତାବ୍ଦୀ",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ଭୁବନେଶ୍ୱରର ଉଦୟଗିରି ପାହାଡ଼ସ୍ଥ ହାତୀଗୁମ୍ଫାର ପ୍ରାକୃତ ଭାଷା ଓ ବ୍ରାହ୍ମୀ ଲିପିରେ ଖୋଦିତ ୧୭ ଧାଡ଼ିର ଏହି ଶିଳାଲେଖ ଭାରତୀୟ ଇତିହାସର ଏକ ଅମୂଲ୍ୟ ଜୀବନ୍ତ ଦଲିଲ, ଯେଉଁଥିରେ ସମ୍ରାଟ ଖାରବେଳଙ୍କ ୧୩ ବର୍ଷର ଶାସନର ବର୍ଷୱାରୀ ଇତିହାସ ଖୋଦିତ ହୋଇଛି।",
    subsections: [
      {
        nameOdia: "ଶିଳାଲେଖର ଭାଷା, ଲିପି ଓ ଐତିହାସିକ ଗୁରୁତ୍ୱ",
        nameEn: "Linguistic & Epigraphical Significance",
        detailsOdia: "ଏହି ଶିଳାଲେଖ ପ୍ରଥମେ ୧୮୨୫ରେ ଏ. ଷ୍ଟାର୍ଲିଙ୍ଗ୍‌ଙ୍କ ଦ୍ୱାରା ଆବିଷ୍କୃତ ହୋଇ ପରେ ଜେମ୍ସ ପ୍ରିନ୍ସେପ୍, ଭଗବାନଲାଲ ଇନ୍ଦ୍ରଜୀ ଓ କେ. ପି. ଜୟସ୍ୱାଲଙ୍କ ଦ୍ୱାରା ପଠିତ ହୋଇଥିଲା।"
      },
      {
        nameOdia: "୧୩ ବର୍ଷର ଶାସନ କାଳର ବାର୍ଷିକ ବିବରଣୀ",
        nameEn: "Chronological Breakdown of 13 Regnal Years",
        detailsOdia: "ପ୍ରଥମ ବର୍ଷ ରାଜଧାନୀ ମରାମତି, ଦ୍ୱିତୀୟ ବର୍ଷ ପଶ୍ଚିମ ବିଜୟ, ଚତୁର୍ଥ ବର୍ଷ ରାଷ୍ଟ୍ରିକ-ଭୋଜକ ବିଜୟ, ପଞ୍ଚମ ବର୍ଷ କେନାଲ ସଂଯୋଗ, ଅଷ୍ଟମ ବର୍ଷ ଗୋରଥଗିରି ଓ ମଥୁରା ଅଭିଯାନ, ଦ୍ୱାଦଶ ବର୍ଷ ମଗଧ ବିଜୟ ଓ କଳିଙ୍ଗ ଜିନ ପ୍ରତ୍ୟାବର୍ତ୍ତନ, ଏବଂ ତ୍ରୟୋଦଶ ବର୍ଷ ଉଦୟଗିରିରେ କୁମାରୀ ପର୍ବତରେ ଜୈନ ମୁନିଙ୍କ ପାଇଁ ୧୧୭ଟି ଗୁମ୍ଫା ନିର୍ମାଣର ଉଲ୍ଲେଖ ରହିଛି।"
      }
    ],
    monuments: ["ହାତୀଗୁମ୍ଫା", "ସର୍ପଗୁମ୍ଫା", "ବାଘଗୁମ୍ଫା"],
    rulers: ["ସମ୍ରାଟ ଖାରବେଳ"],
    historicalEvidences: ["Epigraphia Indica Vol XX", "ହାତୀଗୁମ୍ଫା ଫଟୋଗ୍ରାଫିକ୍ ରେକର୍ଡ"]
  },
  {
    id: "udayagiri-caves",
    titleOdia: "ଉଦୟଗିରି ଗୁମ୍ଫା ସମୂହ (Udayagiri Rock-Cut Caves)",
    titleEn: "Udayagiri Rock-Cut Architecture & Jaina Heritage",
    era: "ଖାରବେଳ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ ଶତାବ୍ଦୀ",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ଉଦୟଗିରି (କୁମାରୀ ପର୍ବତ) ରେ ୧୮ଟି ପ୍ରମୁଖ ଶୈଳୋତ୍କୀର୍ଣ୍ଣ ଗୁମ୍ଫା ରହିଛି। ଏହା ଜୈନ ତପସ୍ୱୀମାନଙ୍କ ଆଶ୍ରୟ ପାଇଁ ନିର୍ମିତ ହୋଇଥିଲା। ରାଣୀଗୁମ୍ଫା, ଗଣେଶଗୁମ୍ଫା, ହାତୀଗୁମ୍ଫା ଓ ବ୍ୟାଘ୍ରଗୁମ୍ଫାର ଭାସ୍କର୍ଯ୍ୟ କଳା ଭାରତୀୟ ଶିଳ୍ପକଳାର ଅନନ୍ୟ କୃତି।",
    subsections: [
      {
        nameOdia: "ରାଣୀଗୁମ୍ଫା: ଦ୍ୱିତଳ ପ୍ରାସାଦ ଓ ନୃତ୍ୟଶାଳା",
        nameEn: "Ranigumpha: Double-Storeyed Monastery",
        detailsOdia: "ଏହା ଉଦୟଗିରିର ସର୍ବବୃହତ ଗୁମ୍ଫା। ଏହାର କାନ୍ଥରେ ରାଜକୀୟ ଶିକାର, ନୃତ୍ୟ, ବାଦ୍ୟ ଏବଂ ଶକୁନ୍ତଳା କଥାର ମନୋରମ ଭାସ୍କର୍ଯ୍ୟ ଖୋଦିତ ହୋଇଛି।"
      },
      {
        nameOdia: "ବ୍ୟାଘ୍ରଗୁମ୍ଫା ଓ ସର୍ପଗୁମ୍ଫା ସ୍ଥାପତ୍ୟ କୌଶଳ",
        nameEn: "Zoomorphic Cave Architecture",
        detailsOdia: "ବାଘର ଖୋଲା ପାଟି ଏବଂ ଫଣା ଟେକିଥିବା ସାପ ଆକୃତିରେ ପାହାଡ଼ ଖୋଦି କରାଯାଇଥିବା ଗୁମ୍ଫା ପ୍ରାଚୀନ ଓଡ଼ିଶା ଶିଳ୍ପୀଙ୍କ ଅସାଧାରଣ କଳ୍ପନାଶକ୍ତିର ପରିଚାୟକ।"
      }
    ],
    monuments: ["ରାଣୀଗୁମ୍ଫା", "ଗଣେଶଗୁମ୍ଫା", "ଜୟ-ବିଜୟ ଗୁମ୍ଫା"],
    rulers: ["ସମ୍ରାଟ ଖାରବେଳ", "କଳିଙ୍ଗ ଶିଳ୍ପୀବୃନ୍ଦ"],
    historicalEvidences: ["ଉଦୟଗିରି ଭାସ୍କର୍ଯ୍ୟ ପ୍ୟାନେଲ", "ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ ରିପୋର୍ଟ"]
  },
  {
    id: "khandagiri-caves",
    titleOdia: "ଖଣ୍ଡଗିରି ଜୈନ ଗୁମ୍ଫା (Khandagiri Caves & Tirthankara Reliefs)",
    titleEn: "Khandagiri Caves: Sacred Jain Sanctuary",
    era: "ପ୍ରାଚୀନ ଓ ମଧ୍ୟଯୁଗୀୟ କାଳ",
    timePeriod: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ ଶତାବ୍ଦୀ ରୁ ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୧ଶ ଶତାବ୍ଦୀ",
    category: "ancient",
    image: "/images/kaalrekha_hero_collage.jpg",
    summaryOdia: "ଖଣ୍ଡଗିରିରେ ୧୫ଟି ଗୁମ୍ଫା ରହିଛି, ଯାହା ଶତାବ୍ଦୀ ଶତାବ୍ଦୀ ଧରି ଜୈନ ଧର୍ମର ଏକ ପ୍ରମୁଖ ତୀର୍ଥସ୍ଥଳୀ ହୋଇ ରହିଆସିଛି। ବାରଭୁଜି ଗୁମ୍ଫା, ନବମୁନି ଗୁମ୍ଫା ଏବଂ ଶୀର୍ଷସ୍ଥ ଜୈନ ମନ୍ଦିର ୨୪ ଜଣ ତୀର୍ଥଙ୍କର ଏବଂ ଶାସନ ଦେବୀମାନଙ୍କ ମନୋମୋହକ ମୂର୍ତ୍ତି ପାଇଁ ବିଖ୍ୟାତ।",
    subsections: [
      {
        nameOdia: "ନବମୁନି ଓ ବାରଭୁଜି ଗୁମ୍ଫାର ତୀର୍ଥଙ୍କର ପ୍ରତିମା",
        nameEn: "Navamuni & Barabhuji Iconography",
        detailsOdia: "ଋଷଭନାଥ, ପାର୍ଶ୍ୱନାଥ, ମହାବୀର ଏବଂ ଚକ୍ରେଶ୍ୱରୀ, ପଦ୍ମାବତୀ ପ୍ରମୁଖ ଯକ୍ଷିଣୀଙ୍କ ମୂର୍ତ୍ତି ଅତ୍ୟନ୍ତ ସୂକ୍ଷ୍ମ ଭାବେ ପଥରରେ ଖୋଦିତ।"
      },
      {
        nameOdia: "ସୋମବଂଶୀ ଯୁଗର ପୁନରୁଦ୍ଧାର ଓ ଉଦ୍ୟୋତକେଶରୀ ଲେଖ",
        nameEn: "Somavamshi Epigraphs of Udyotakesari",
        detailsOdia: "ଏକାଦଶ ଶତାବ୍ଦୀରେ ସୋମବଂଶୀ ରାଜା ଉଦ୍ୟୋତକେଶରୀ ଖଣ୍ଡଗିରିର ପୁରୁଣା ଗୁମ୍ଫାମାନଙ୍କୁ ସଂସ୍କାର କରି ନୂତନ ତୀର୍ଥଙ୍କର ବିଗ୍ରହ ପ୍ରତିଷ୍ଠା କରିଥିଲେ।"
      }
    ],
    monuments: ["ବାରଭୁଜି ଗୁମ୍ଫା", "ନବମୁନି ଗୁମ୍ଫା", "ଲାଲାଟେନ୍ଦୁ କେଶରୀ ଗୁମ୍ଫା", "ଖଣ୍ଡଗିରି ଶୀର୍ଷ ଜୈନ ମନ୍ଦିର"],
    rulers: ["ଖାରବେଳ", "ଉଦ୍ୟୋତକେଶରୀ (ସୋମବଂଶୀ)"],
    historicalEvidences: ["ଉଦ୍ୟୋତକେଶରୀଙ୍କ ଖଣ୍ଡଗିରି ଶିଳାଲେଖ", "ତୀର୍ଥଙ୍କର ଲାଞ୍ଛନ ଭାସ୍କର୍ଯ୍ୟ"]
  }
];

// Combine all 107 detailed topics
// Let's load the existing dataset if present, or enrich all 107 topics systematically.
console.log("Total initial rich topics defined:", rawTopics.length);
