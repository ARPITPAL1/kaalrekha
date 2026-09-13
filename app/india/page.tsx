"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import {
  Compass,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Search,
  BookOpen,
  X,
  Scroll,
  Landmark,
  Shield,
  ArrowRight,
} from "lucide-react";
import { indianHistoryComplete, HistorySectionItem } from "@/data/indiaCompleteHistory";
import { odishaHistoryComplete, OdishaHistorySectionItem } from "@/data/odishaCompleteHistory";
import { useLanguage } from "@/context/LanguageContext";

interface HistoricalPlace360 {
  id: string;
  nameOdia: string;
  nameEnglish: string;
  locationOdia: string;
  locationEnglish: string;
  era: string;
  descriptionOdia: string;
  imageUrl: string;
  mapEmbedUrl: string;
}

const historicalPlaces: HistoricalPlace360[] = [
  {
    id: "konark",
    nameOdia: "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର",
    nameEnglish: "Konark Sun Temple",
    locationOdia: "ପୁରୀ, ଓଡ଼ିଶା",
    locationEnglish: "Puri, Odisha",
    era: "୧୩ଶ ଶତାବ୍ଦୀ (୧୨୫୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ)",
    descriptionOdia:
      "ଗଙ୍ଗବଂଶର ପ୍ରତାପୀ ସମ୍ରାଟ ଲାଙ୍ଗୁଳା ନରସିଂହଦେବଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ଏହି ଅଦ୍ୱିତୀୟ ସୂର୍ଯ୍ୟ ରଥ ମନ୍ଦିର। ୧୨ ଯୋଡ଼ା କାରୁକାର୍ଯ୍ୟପୂର୍ଣ୍ଣ ପ୍ରସ୍ତର ଚକ ଏବଂ ୭ଟି ଅଶ୍ୱ ସହିତ ଏହା କଳିଙ୍ଗ ସ୍ଥାପତ୍ୟ କଳାର ଶ୍ରେଷ୍ଠ ନିଦର୍ଶନ। ଏହା ୟୁନେସ୍କୋ (UNESCO) ବିଶ୍ୱ ଐତିହ୍ୟ ସ୍ଥଳୀ ଭାବରେ ସ୍ୱୀକୃତ।",
    imageUrl: "/images/eastern_ganga_konark.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE1KOGt2ck1tQWlsNE5OaWpFTzduSnYtNl9pTGVhSXRvczM3QWhX!2m2!1d19.8875953!2d86.0945398!3f120!4f0!5f0.7820865974627469",
  },
  {
    id: "dhauli",
    nameOdia: "ଧଉଳି ଶାନ୍ତି ସ୍ତୂପ ଓ ଅଶୋକ ଶିଳାଲେଖ",
    nameEnglish: "Dhauli Shanti Stupa & Ashokan Edicts",
    locationOdia: "ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
    locationEnglish: "Bhubaneswar, Odisha",
    era: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୬୧ ଓ ୧୯୭୨ ଖ୍ରୀଷ୍ଟାବ୍ଦ",
    descriptionOdia:
      "ଦୟା ନଦୀ କୂଳରେ ଐତିହାସିକ କଳିଙ୍ଗ ଯୁଦ୍ଧର ସ୍ମାରକୀ ସ୍ଥଳ। ଏଠାରେ ସମ୍ରାଟ ଅଶୋକଙ୍କ ଚଣ୍ଡାଶୋକରୁ ଧର୍ମାଶୋକରେ ରୂପାନ୍ତରଣ ଘଟିଥିଲା। ପାହାଡ଼ ପାଦଦେଶରେ ପ୍ରାଚୀନ ହସ୍ତୀ ପ୍ରସ୍ତର ଭାସ୍କର୍ଯ୍ୟ ଓ ବ୍ରାହ୍ମୀ ଲିପିର ଅନୁଶାସନ ରହିଛି। ଶିଖରରେ ଜାପାନ-ଭାରତ ମୈତ୍ରୀ ଶାନ୍ତି ସ୍ତୂପ ବିରାଜମାନ।",
    imageUrl: "/images/ancient_kalinga_maritime.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE1ZOHBwTGd2VXZ4Q0Y3eEpIdlFCRW54QWhqZVRhWEN3U2RjR3NZ!2m2!1d20.1923188!2d85.8394625!3f210!4f5!5f0.7820865974627469",
  },
  {
    id: "khandagiri",
    nameOdia: "ଉଦୟଗିରି ଓ ଖଣ୍ଡଗିରି ଗୁମ୍ଫା (ହାତୀଗୁମ୍ଫା)",
    nameEnglish: "Udayagiri & Khandagiri Caves",
    locationOdia: "ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
    locationEnglish: "Bhubaneswar, Odisha",
    era: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ ଶତାବ୍ଦୀ (ସମ୍ରାଟ ଖାରବେଳ)",
    descriptionOdia:
      "ମହାମେଘବାହନ ଐର ଖାରବେଳଙ୍କ ସମୟର ଜୈନ ସନ୍ନ୍ୟାସୀମାନଙ୍କ ପାଇଁ ଖୋଦିତ ପ୍ରସ୍ତର ଗୁମ୍ଫା ସମୂହ। ହାତୀଗୁମ୍ଫାରେ ଖାରବେଳଙ୍କ ୧୩ ବର୍ଷ ଶାସନର ବିସ୍ତୃତ ବ୍ରାହ୍ମୀ ଶିଳାଲେଖ, ରାଣୀଗୁମ୍ଫା ଓ ଗଣେଶ ଗୁମ୍ଫାର ଦ୍ୱିତଳ କାରୁକାର୍ଯ୍ୟ କଳିଙ୍ଗର ପରାକ୍ରମ ପ୍ରଦର୍ଶନ କରେ।",
    imageUrl: "/images/ancient_kalinga_maritime.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE1uR3M5eHk5OG9oWl9jNTRsQ09qNUNzTHc2d1p0Zk0xdkZzWnpJ!2m2!1d20.2631024!2d85.7854611!3f45!4f0!5f0.7820865974627469",
  },
  {
    id: "puri-jagannath",
    nameOdia: "ଶ୍ରୀ ଜଗନ୍ନାଥ ମନ୍ଦିର ଓ ବଡ଼ଦାଣ୍ଡ",
    nameEnglish: "Puri Jagannath Temple & Grand Road",
    locationOdia: "ପୁରୀ, ଓଡ଼ିଶା",
    locationEnglish: "Puri, Odisha",
    era: "୧୨ଶ ଶତାବ୍ଦୀ (୧୧୬୧ ଖ୍ରୀଷ୍ଟାବ୍ଦ)",
    descriptionOdia:
      "ଗଙ୍ଗ ସମ୍ରାଟ ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗଦେବଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ୨୧୪ ଫୁଟ ଉଚ୍ଚ ଏହି ପବିତ୍ର ଶ୍ରୀମନ୍ଦିର ଚତୁର୍ଦ୍ଧାମୂର୍ତ୍ତିଙ୍କ ପୂଜାପୀଠ। ମେଘନାଦ ପାଚେରୀ, କୂର୍ମ ବେଢ଼ା, ଅରୁଣ ସ୍ତମ୍ଭ ଏବଂ ବିଶ୍ୱପ୍ରସିଦ୍ଧ ରଥଯାତ୍ରାର ବଡ଼ଦାଣ୍ଡ ଓଡ଼ିଆ ଜାତିର ପ୍ରାଣକେନ୍ଦ୍ର।",
    imageUrl: "/images/kaalrekha_hero_collage.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE14eGlLdW5aQUR4bEFpMVVqS3BnUXlvdU81aGl6aDF1NVdYbmQy!2m2!1d19.8048744!2d85.8179244!3f180!4f10!5f0.7820865974627469",
  },
  {
    id: "lingaraj-temple",
    nameOdia: "ଲିଙ୍ଗରାଜ ମନ୍ଦିର ଓ ବିନ୍ଦୁସାଗର",
    nameEnglish: "Lingaraj Temple & Bindusagar",
    locationOdia: "ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
    locationEnglish: "Bhubaneswar, Odisha",
    era: "୧୧ଶ ଶତାବ୍ଦୀ (ସୋମବଂଶ)",
    descriptionOdia:
      "ସୋମବଂଶୀ ରାଜା ଯଯାତି କେଶରୀ ଓ ଲଲାଟେନ୍ଦୁ କେଶରୀଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ କଳିଙ୍ଗ ସ୍ଥାପତ୍ୟର ସର୍ବୋତ୍କୃଷ୍ଟ କୀର୍ତ୍ତି। ୧୮୦ ଫୁଟ ଉଚ୍ଚ ଶିଖର ଓ ହରିହର ସମନ୍ୱିତ ପୂଜା ପୀଠ।",
    imageUrl: "/images/eastern_ganga_konark.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Lingaraj+Temple+Bhubaneswar&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "hampi",
    nameOdia: "ହମ୍ପି ସ୍ମାରକୀ ସମୂହ ଓ ପ୍ରସ୍ତର ରଥ",
    nameEnglish: "Group of Monuments at Hampi",
    locationOdia: "ବିଜୟନଗର, କର୍ଣ୍ଣାଟକ",
    locationEnglish: "Vijayanagara, Karnataka",
    era: "୧୪ଶ–୧୬ଶ ଶତାବ୍ଦୀ (ବିଜୟନଗର ସାମ୍ରାଜ୍ୟ)",
    descriptionOdia:
      "ବିଜୟନଗର ସାମ୍ରାଜ୍ୟର ଐତିହାସିକ ରାଜଧାନୀ। ତୁଙ୍ଗଭଦ୍ରା ନଦୀ କୂଳରେ ଅବସ୍ଥିତ ବିଠଲ ମନ୍ଦିରର ପ୍ରସ୍ତର ରଥ, ସଙ୍ଗୀତମୟ ସ୍ତମ୍ଭ ଏବଂ ବିରୂପାକ୍ଷ ମନ୍ଦିର ପ୍ରାଚୀନ ହିନ୍ଦୁ ସ୍ଥାପତ୍ୟର ଅପୂର୍ବ ନିଦର୍ଶନ।",
    imageUrl: "/images/vijayanagara_hampi.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE1jZkVndFpmQjFXRjJjQTVwX3N6MmtIem9Oa1Fxbk9aTkZ5WktT!2m2!1d15.3350132!2d76.460024!3f180!4f5!5f0.7820865974627469",
  },
  {
    id: "thanjavur",
    nameOdia: "ତଞ୍ଜାଭୁର ବୃହଦୀଶ୍ୱର ମନ୍ଦିର",
    nameEnglish: "Brihadisvara Temple Thanjavur",
    locationOdia: "ତଞ୍ଜାଭୁର, ତାମିଲନାଡୁ",
    locationEnglish: "Thanjavur, Tamil Nadu",
    era: "୧୧ଶ ଶତାବ୍ଦୀ (୧୦୧୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ - ରାଜରାଜ ଚୋଳ)",
    descriptionOdia:
      "ଚୋଳ ସମ୍ରାଟ ରାଜରାଜ ଚୋଳ ପ୍ରଥମଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ବିଶାଳ ଗ୍ରାନାଇଟ୍ ମନ୍ଦିର। ୮୦ ଟନ୍ ଓଜନର ଏକକ ପଥର କଳସ ଏବଂ ଚୋଳ ନୌସେନା ଓ ବିଜୟ ଅଭିଯାନର ତାମିଲ ଶିଳାଲେଖ ଏଠାରେ ସଂରକ୍ଷିତ।",
    imageUrl: "/images/chola_maritime_empire.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Brihadisvara+Temple+Thanjavur&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "ajanta",
    nameOdia: "ଅଜନ୍ତା ଗୁମ୍ଫା ଓ ଚିତ୍ରକଳା",
    nameEnglish: "Ajanta Caves & Fresco Murals",
    locationOdia: "ଔରଙ୍ଗାବାଦ, ମହାରାଷ୍ଟ୍ର",
    locationEnglish: "Aurangabad, Maharashtra",
    era: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨ୟ – ୬ଷ୍ଠ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ",
    descriptionOdia:
      "ୱାଘୋରା ନଦୀ ଉପତ୍ୟକାର ଅର୍ଦ୍ଧଚନ୍ଦ୍ରାକାର ପାହାଡ଼ କାନ୍ଥରେ ଖୋଦିତ ୩୦ଟି ପ୍ରାଚୀନ ବୌଦ୍ଧ ଚୈତ୍ୟ ଓ ବିହାର। ଜାତକ କାହାଣୀ ଆଧାରିତ ଭିତ୍ତିଚିତ୍ର ପ୍ରାଚୀନ ଭାରତୀୟ ଚିତ୍ରକଳାର ସର୍ବୋଚ୍ଚ ଶିଖର।",
    imageUrl: "/images/mauryan_empire_ashoka.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Ajanta+Caves+Maharashtra&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "ellora",
    nameOdia: "ଏଲୋରା କୈଳାସ ମନ୍ଦିର (ମୋନୋଲିଥିକ୍)",
    nameEnglish: "Ellora Caves & Kailash Temple",
    locationOdia: "ମହାରାଷ୍ଟ୍ର",
    locationEnglish: "Maharashtra, India",
    era: "୮ମ ଶତାବ୍ଦୀ (ରାଷ୍ଟ୍ରକୂଟ ରାଜା କୃଷ୍ଣ ପ୍ରଥମ)",
    descriptionOdia:
      "ଏକ ବିଶାଳ ବାସାଲ୍ଟ ପାହାଡ଼କୁ ଉପରୁ ତଳକୁ କାଟି ନିର୍ମିତ ବିଶ୍ୱର ସର୍ବବୃହତ୍ ମୋନୋଲିଥିକ୍ (ଏକକ ପ୍ରସ୍ତର) ମନ୍ଦିର। ହିନ୍ଦୁ, ବୌଦ୍ଧ ଓ ଜୈନ ଧର୍ମର ଏକତାର ପ୍ରତୀକ।",
    imageUrl: "/images/chola_maritime_empire.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Kailasa+Temple+Ellora+Caves&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "sanchi",
    nameOdia: "ସାଞ୍ଚି ମହାସ୍ତୂପ ଓ ତୋରଣ",
    nameEnglish: "Great Stupa at Sanchi",
    locationOdia: "ରାୟସେନ, ମଧ୍ୟପ୍ରଦେଶ",
    locationEnglish: "Raisen, Madhya Pradesh",
    era: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୩ୟ ଶତାବ୍ଦୀ – ୧ମ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ",
    descriptionOdia:
      "ସମ୍ରାଟ ଅଶୋକଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ପ୍ରାଚୀନତମ ପ୍ରସ୍ତର ସ୍ମାରକୀ। ଚାରୋଟି ସୂକ୍ଷ୍ମ କାରୁକାର୍ଯ୍ୟପୂର୍ଣ୍ଣ ତୋରଣ ଦ୍ୱାରରେ ବୁଦ୍ଧଙ୍କ ଜୀବନ ଓ ପ୍ରାଚୀନ ଭାରତୀୟ ସମାଜର ନିଖୁଣ ଚିତ୍ର ଖୋଦିତ।",
    imageUrl: "/images/mauryan_empire_ashoka.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Great+Stupa+Sanchi+Madhya+Pradesh&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "nalanda",
    nameOdia: "ପ୍ରାଚୀନ ନାଳନ୍ଦା ମହାବିହାର",
    nameEnglish: "Ancient Nalanda University",
    locationOdia: "ନାଳନ୍ଦା, ବିହାର",
    locationEnglish: "Nalanda, Bihar",
    era: "୫ମ – ୧୨ଶ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ",
    descriptionOdia:
      "ପ୍ରାଚୀନ ବିଶ୍ୱର ସର୍ବଶ୍ରେଷ୍ଠ ଆବାସିକ ବିଶ୍ୱବିଦ୍ୟାଳୟ। ୧୦,୦୦୦ ରୁ ଅଧିକ ଛାତ୍ର ଏବଂ ୨,୦୦୦ ଶିକ୍ଷକଙ୍କ ସହ ଧର୍ମଗଞ୍ଜ ପାଠାଗାର ବିଶ୍ୱଜ୍ଞାନର କେନ୍ଦ୍ର ଥିଲା।",
    imageUrl: "/images/today_history_quill.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Nalanda+University+Ruins+Bihar&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "khajuraho",
    nameOdia: "ଖଜୁରାହୋ ମନ୍ଦିର ସମୂହ",
    nameEnglish: "Khajuraho Group of Monuments",
    locationOdia: "ଛତରପୁର, ମଧ୍ୟପ୍ରଦେଶ",
    locationEnglish: "Chhatarpur, Madhya Pradesh",
    era: "୧୦ମ–୧୧ଶ ଶତାବ୍ଦୀ (ଚାନ୍ଦେଲା ବଂଶ)",
    descriptionOdia:
      "ଚାନ୍ଦେଲା ରାଜପୁତ ଶାସକମାନଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ନାଗର ଶୈଳୀର ଶ୍ରେଷ୍ଠ ହିନ୍ଦୁ ଓ ଜୈନ ମନ୍ଦିର ସମୂହ। କନ୍ଦାରିୟା ମହାଦେବ ମନ୍ଦିର ଏବଂ ଲକ୍ଷ୍ମଣ ମନ୍ଦିରର କାନ୍ଥରେ ଖୋଦିତ ଜୀବନ, ଧର୍ମ, ପ୍ରେମ ଓ ସଙ୍ଗୀତର କାରୁକାର୍ଯ୍ୟ ବିଶ୍ୱବିଖ୍ୟାତ।",
    imageUrl: "/images/eastern_ganga_konark.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE4zU0ZkQ250Z01uTVNfTWlfS2pTMEptWVp3b29RNEQ4U045bk9H!2m2!1d24.8519543!2d79.9197361!3f30!4f5!5f0.7820865974627469",
  },
  {
    id: "tajmahal",
    nameOdia: "ତାଜମହଲ",
    nameEnglish: "Taj Mahal",
    locationOdia: "ଆଗ୍ରା, ଉତ୍ତର ପ୍ରଦେଶ",
    locationEnglish: "Agra, Uttar Pradesh",
    era: "୧୭ଶ ଶତାବ୍ଦୀ (୧୬୩୨–୧୬୫୩ ଖ୍ରୀଷ୍ଟାବ୍ଦ)",
    descriptionOdia:
      "ମୋଗଲ ସମ୍ରାଟ ଶାହଜାହାନଙ୍କ ଦ୍ୱାରା ନିଜ ପ୍ରିୟ ପତ୍ନୀ ମୁମତାଜ ମହଲଙ୍କ ସ୍ମୃତିରେ ନିର୍ମିତ ଶ୍ୱେତ ମାର୍ବଲ ପ୍ରସ୍ତରର ବିଶ୍ୱବିଖ୍ୟାତ ସୌଧ। ଏହା ଭାରତୀୟ, ପାରସ୍ୟ ଓ ଇସଲାମିକ ସ୍ଥାପତ୍ୟର ଚମତ୍କାର ମିଳନ ଏବଂ ପୃଥିବୀର ସପ୍ତାଶ୍ଚର୍ଯ୍ୟ ମଧ୍ୟରୁ ଅନ୍ୟତମ।",
    imageUrl: "/images/vijayanagara_hampi.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE5aMkVrUXd1Vk1aYlZ1V3J3M2sxeVd4aXkxa3pYckhxLWt3TnpT!2m2!1d27.1751448!2d78.0421422!3f0!4f0!5f0.7820865974627469",
  },
  {
    id: "qutubminar",
    nameOdia: "କୁତୁବ ମିନାର ଓ ପ୍ରାଚୀନ ଲୌହ ସ୍ତମ୍ଭ",
    nameEnglish: "Qutub Minar & Iron Pillar",
    locationOdia: "ନୂଆଦିଲ୍ଲୀ",
    locationEnglish: "New Delhi",
    era: "୧୨ଶ–୧୩ଶ ଶତାବ୍ଦୀ (୧୧୯୨ ଖ୍ରୀଷ୍ଟାବ୍ଦ)",
    descriptionOdia:
      "କୁତୁବୁଦ୍ଦିନ ଐବକ ଓ ଇଲତୁତମିଶଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ୭୨.୫ ମିଟର ଉଚ୍ଚ ଏହି ବିଶାଳ ଇଟା ନିର୍ମିତ ମିନାର। ଏହାର ନିକଟରେ ଚତୁର୍ଥ ଶତାବ୍ଦୀର ପ୍ରସିଦ୍ଧ କଳଙ୍କିହୀନ ଲୌହ ସ୍ତମ୍ଭ ଅବସ୍ଥିତ, ଯାହା ପ୍ରାଚୀନ ଭାରତୀୟ ଧାତୁବିଦ୍ୟାର ଚମତ୍କାରିତା ପ୍ରଦର୍ଶନ କରେ।",
    imageUrl: "/images/vijayanagara_hampi.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE1hVFlFVDQ1V01fcmRhYnFaYm5mU0d2VThzMWdOenJFTk5pTkVq!2m2!1d28.5244281!2d77.1854559!3f280!4f10!5f0.7820865974627469",
  },
  {
    id: "redfort",
    nameOdia: "ଲାଲ୍ କିଲ୍ଲା (ରକ୍ତ ଦୁର୍ଗ)",
    nameEnglish: "Red Fort",
    locationOdia: "ଦିଲ୍ଲୀ",
    locationEnglish: "Delhi",
    era: "୧୬୩୮–୧୬୪୮ ଖ୍ରୀଷ୍ଟାବ୍ଦ",
    descriptionOdia:
      "ମୋଗଲ ଶାସନର କେନ୍ଦ୍ରସ୍ଥଳ ତଥା ମୋଗଲ ସ୍ଥାପତ୍ୟର ଗୌରବମୟ ପ୍ରତୀକ। ଲାଲ ବାଲୁକା ପଥରରେ ନିର୍ମିତ ଏହି ଦୁର୍ଗ ଭାରତର ସ୍ୱାଧୀନତା ଆନ୍ଦୋଳନ ସହିତ ଅଙ୍ଗାଙ୍ଗୀ ଭାବେ ଜଡ଼ିତ, ଯେଉଁଠାରେ ପ୍ରତ୍ୟେକ ବର୍ଷ ସ୍ୱାଧୀନତା ଦିବସରେ ଜାତୀୟ ପତାକା ଉତ୍ତୋଳନ କରାଯାଏ।",
    imageUrl: "/images/vijayanagara_hampi.jpg",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!4v1715000000000!6m8!1m7!1sCAoSLEFGMVFpcE10d29Fck1iS3d0eVRqVjZpYjN5R1dZblRxbXpnd1VpY21hNV9E!2m2!1d28.6561592!2d77.2410203!3f0!4f0!5f0.7820865974627469",
  },
  {
    id: "colosseum",
    nameOdia: "ରୋମାନ୍ କଲୋସିୟମ୍",
    nameEnglish: "Colosseum, Rome",
    locationOdia: "ରୋମ୍, ଇଟାଲୀ",
    locationEnglish: "Rome, Italy",
    era: "୭୦–୮୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ (ଫ୍ଲାଭିଆନ୍ ବଂଶ)",
    descriptionOdia:
      "ପ୍ରାଚୀନ ରୋମାନ୍ ସାମ୍ରାଜ୍ୟର ସର୍ବବୃହତ୍ ଆମ୍ଫିଥିଏଟର। ପ୍ରାଚୀନ ଗ୍ଲାଡିଏଟର ଯୁଦ୍ଧ, ନାଟକ ଓ ରାଜକୀୟ ଉତ୍ସବର ଐତିହାସିକ ପୀଠ ଏବଂ ପୃଥିବୀର ନୂତନ ସପ୍ତାଶ୍ଚର୍ଯ୍ୟ ମଧ୍ୟରୁ ଅନ୍ୟତମ।",
    imageUrl: "/images/kaalrekha_world_map.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Colosseum+Rome+Italy&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "eiffel",
    nameOdia: "ଏଫେଲ୍ ଟାୱାର୍",
    nameEnglish: "Eiffel Tower, Paris",
    locationOdia: "ପ୍ୟାରିସ୍, ଫ୍ରାନ୍ସ",
    locationEnglish: "Paris, France",
    era: "୧୮୮୯ ଖ୍ରୀଷ୍ଟାବ୍ଦ (ଗୁସ୍ତାଭ୍ ଏଫେଲ୍)",
    descriptionOdia:
      "ଫରାସୀ ବିପ୍ଳବର ଶତବାର୍ଷିକୀ ଅବସରରେ ନିର୍ମିତ ୩୩୦ ମିଟର ଉଚ୍ଚ ପିଟୁଆ ଲୁହା ସ୍ଥାପତ୍ୟ ସ୍ମାରକୀ। ବିଶ୍ୱର ସର୍ବାଧିକ ପରିଦର୍ଶିତ ଐତିହ୍ୟ ସ୍ଥଳ।",
    imageUrl: "/images/kaalrekha_world_map.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Eiffel+Tower+Paris+France&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "pyramids",
    nameOdia: "ଗିଜାର ମହା ପିରାମିଡ୍",
    nameEnglish: "Great Pyramid of Giza",
    locationOdia: "ଗିଜା, ଇଜିପ୍ଟ (ମିଶର)",
    locationEnglish: "Giza, Egypt",
    era: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୨୫୬୦ (ପ୍ରାଚୀନ ମିଶର ସଭ୍ୟତା)",
    descriptionOdia:
      "ପ୍ରାଚୀନ ପୃଥିବୀର ସପ୍ତାଶ୍ଚର୍ଯ୍ୟ ମଧ୍ୟରୁ ଏକମାତ୍ର ଅକ୍ଷୁଣ୍ଣ ସ୍ମାରକୀ। ଫାରାଓ ଖୁଫୁଙ୍କ ସମୟରେ ନିର୍ମିତ ପ୍ରସ୍ତର ସ୍ଥାପତ୍ୟ ବିଦ୍ୟାର ଚରମ ଶିଖର।",
    imageUrl: "/images/kaalrekha_world_map.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Great+Pyramid+of+Giza+Egypt&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "petra",
    nameOdia: "ପେତ୍ରା ପ୍ରସ୍ତର ନଗରୀ",
    nameEnglish: "Petra Ancient Rock City",
    locationOdia: "ମା'ଆନ, ଜୋର୍ଡାନ",
    locationEnglish: "Ma'an, Jordan",
    era: "ଖ୍ରୀଷ୍ଟପୂର୍ବ ୪ର୍ଥ ଶତାବ୍ଦୀ (ନବାତିଆନ୍ ସାମ୍ରାଜ୍ୟ)",
    descriptionOdia:
      "ଗୋଲାପୀ ବାଲୁକା ପାହାଡ଼ କାନ୍ଥରେ ଖୋଦିତ ଅଲ୍-ଖଜନେହ୍ ରାଜପ୍ରାସାଦ ଓ ପ୍ରାଚୀନ ମରୁଭୂମି ଜଳ ସଂରକ୍ଷଣ ପ୍ରଣାଳୀ।",
    imageUrl: "/images/kaalrekha_world_map.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Petra+Jordan&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "machupicchu",
    nameOdia: "ମାଚୁ ପିଚୁ ଇନକା ଦୁର୍ଗ",
    nameEnglish: "Machu Picchu Inca Citadel",
    locationOdia: "କୁସ୍କୋ, ପେରୁ",
    locationEnglish: "Cusco, Peru",
    era: "୧୫ଶ ଶତାବ୍ଦୀ (୧୪୫୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ - ଇନକା ସଭ୍ୟତା)",
    descriptionOdia:
      "ଆଣ୍ଡିଜ୍ ପର୍ବତମାଳାର ୨,୪୩୦ ମିଟର ଉଚ୍ଚତାରେ ଅବସ୍ଥିତ ଇନକା ସଭ୍ୟତାର ଅପୂର୍ବ ସହର ଓ ପ୍ରସ୍ତର ଜ୍ୟୋତିର୍ବିଜ୍ଞାନ କେନ୍ଦ୍ର।",
    imageUrl: "/images/kaalrekha_world_map.jpg",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Machu+Picchu+Peru&t=k&z=17&ie=UTF8&iwloc=&output=embed",
  },
];

export default function IndiaPage() {
  const { language } = useLanguage();
  const isOdia = language === "or";

  // Dual Tab: 'india' or 'odisha'
  const [activeTab, setActiveTab] = useState<"india" | "odisha">("india");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [active360Place, setActive360Place] = useState<HistoricalPlace360>(historicalPlaces[0]);
  const [searchQuery360, setSearchQuery360] = useState("");
  const [selectedRegion360, setSelectedRegion360] = useState<string>("all");

  // Deep reading modal state
  const [readingIndiaItem, setReadingIndiaItem] = useState<HistorySectionItem | null>(null);
  const [readingOdishaItem, setReadingOdishaItem] = useState<OdishaHistorySectionItem | null>(null);

  // Filter 360 Places
  const filtered360Places = historicalPlaces.filter((place) => {
    const matchesSearch =
      place.nameOdia.toLowerCase().includes(searchQuery360.toLowerCase()) ||
      place.nameEnglish.toLowerCase().includes(searchQuery360.toLowerCase()) ||
      place.locationOdia.toLowerCase().includes(searchQuery360.toLowerCase()) ||
      place.locationEnglish.toLowerCase().includes(searchQuery360.toLowerCase());

    const isGlobal = ["colosseum", "eiffel", "pyramids", "petra", "machupicchu"].includes(place.id) ||
      (!place.locationEnglish.includes("India") && !place.locationEnglish.includes("Odisha"));

    const matchesRegion =
      selectedRegion360 === "all" ||
      (selectedRegion360 === "odisha" && place.locationEnglish.includes("Odisha")) ||
      (selectedRegion360 === "india" && (place.locationEnglish.includes("India") || place.locationEnglish.includes("Odisha") || place.locationEnglish.includes("Tamil Nadu") || place.locationEnglish.includes("Karnataka") || place.locationEnglish.includes("Maharashtra") || place.locationEnglish.includes("Madhya Pradesh") || place.locationEnglish.includes("Bihar") || place.locationEnglish.includes("Delhi") || place.locationEnglish.includes("Uttar Pradesh"))) ||
      (selectedRegion360 === "global" && isGlobal);

    return matchesSearch && matchesRegion;
  });

  const handleExecuteLiveSearch = (query: string) => {
    if (!query.trim()) return;
    const matched = historicalPlaces.find(
      (p) =>
        p.nameEnglish.toLowerCase().includes(query.toLowerCase()) ||
        p.nameOdia.toLowerCase().includes(query.toLowerCase())
    );
    if (matched) {
      setActive360Place(matched);
    } else {
      const embed = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;
      setActive360Place({
        id: "custom-search",
        nameOdia: query,
        nameEnglish: query,
        locationOdia: "ବିଶ୍ୱବ୍ୟାପୀ ଐତିହ୍ୟ ଓ ଭୌଗୋଳିକ ସ୍ଥଳ",
        locationEnglish: "Worldwide Geospatial Heritage Location",
        era: "ରିଅଲ୍-ଟାଇମ୍ ଗୁଗଲ୍ ମ୍ୟାପ୍ସ ୩୬୦° ଅନ୍ୱେଷଣ",
        descriptionOdia: `ଗୁଗଲ୍ ମ୍ୟାପ୍ସରୁ '${query}' ର ପ୍ରତ୍ୟକ୍ଷ ଲାଇଭ୍ ୩୬୦° ଉପଗ୍ରହ, ରାସ୍ତା ଓ ଐତିହାସିକ ସ୍ଥଳୀ ଭ୍ୟୁ। ମାଉସ୍ କିମ୍ବା ଆଙ୍ଗୁଳି ସାହାଯ୍ୟରେ ସମ୍ପୂର୍ଣ୍ଣ ଘୂରାଇ ନିଖୁଣ ଭାବରେ ଦେଖନ୍ତୁ।`,
        imageUrl: "/images/kaalrekha_world_map.jpg",
        mapEmbedUrl: embed,
      });
    }
  };

  // Filter India Items
  const filteredIndia = indianHistoryComplete.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.titleOdia.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summaryOdia.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filter Odisha Items
  const filteredOdisha = odishaHistoryComplete.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.titleOdia.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summaryOdia.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-museum-ivory text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-12 border-b border-museum-stone bg-museum-parchment/60">
        <div className="max-w-[1680px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-museum-antiqueGold/15 border border-museum-antiqueGold/30 rounded-full text-xs font-mono uppercase tracking-wider text-museum-charcoal mb-4 font-semibold">
            <span className="w-2 h-2 rounded-full bg-museum-terracotta" />
            <span>{isOdia ? "ଭାରତ ଓ ଓଡ଼ିଶା ଐତିହାସିକ ଅଭିଲେଖାଗାର" : "INDIA & ODISHA HISTORICAL ARCHIVE"}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-museum-charcoal leading-tight">
            {isOdia ? "ଭାରତ ଓ ଓଡ଼ିଶାର ସମ୍ପୂର୍ଣ୍ଣ ଇତିହାସ" : "Complete History of India & Odisha"}
          </h1>

          <p className="font-sans text-base sm:text-lg text-museum-charcoalLight max-w-4xl mt-3 leading-relaxed">
            {isOdia
              ? "ପ୍ରାଗୈତିହାସିକ ଯୁଗଠାରୁ ଆରମ୍ଭ କରି ସିନ୍ଧୁ ସଭ୍ୟତା, ମୌର୍ଯ୍ୟ, ଗୁପ୍ତ, ମୋଗଲ, ମରାଠା ଓ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ ଏବଂ ପ୍ରାଚୀନ କଳିଙ୍ଗ, ଖାରବେଳ, ଗଙ୍ଗ, ଗଜପତି, ଜଗନ୍ନାଥ ସଂସ୍କୃତି ଓ ୧୮୧୭ ପାଇକ ବିଦ୍ରୋହର ବିସ୍ତୃତ ଦଲିଲ। ଶେଷରେ ଐତିହାସିକ ସ୍ଥଳର ୩୬୦° ଭ୍ୟୁ ଅନୁଭବ କରନ୍ତୁ।"
              : "Exhaustive documentation spanning from prehistoric India and the Indus Valley to the Maurya, Gupta, Mughal, and Maratha empires, alongside Ancient Kalinga, Kharavela, Eastern Gangas, Gajapatis, Jagannath culture, and the 1817 Paika Rebellion. Features 360° Google Maps Street Views."}
          </p>

          {/* DUAL TAB SWITCHER: INDIA vs ODISHA */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("india");
                setSelectedCategory("all");
              }}
              className={`px-6 py-3 rounded-xl font-serif text-sm sm:text-base font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
                activeTab === "india"
                  ? "bg-museum-terracotta text-white shadow-md scale-105"
                  : "bg-museum-ivory border border-museum-stone text-museum-charcoal hover:bg-museum-parchment"
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>{isOdia ? "🇮🇳 ଭାରତର ଇତିହାସ (Indian History)" : "🇮🇳 Indian History (Complete)"}</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-white">
                {indianHistoryComplete.length} ଅଧ୍ୟାୟ
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("odisha");
                setSelectedCategory("all");
              }}
              className={`px-6 py-3 rounded-xl font-serif text-sm sm:text-base font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
                activeTab === "odisha"
                  ? "bg-museum-antiqueGold text-museum-charcoal shadow-md scale-105 font-bold"
                  : "bg-museum-ivory border border-museum-stone text-museum-charcoal hover:bg-museum-parchment"
              }`}
            >
              <Scroll className="w-4 h-4 text-museum-terracotta" />
              <span>{isOdia ? "🏛️ ଓଡ଼ିଶାର ଇତିହାସ (Odisha History)" : "🏛️ Odisha History & Heritage"}</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-white">
                {odishaHistoryComplete.length} ଅଧ୍ୟାୟ
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Search & Era Filter Bar */}
      <section className="py-6 px-4 sm:px-6 lg:px-12 max-w-[1680px] mx-auto border-b border-museum-stone/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Era filter pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-museum-charcoalLight font-sans font-semibold mr-1">
              {isOdia ? "କାଳଖଣ୍ଡ:" : "Era:"}
            </span>
            {[
              { id: "all", label: isOdia ? "ସମସ୍ତ (All)" : "All" },
              { id: "ancient", label: isOdia ? "ପ୍ରାଚୀନ ଯୁଗ (Ancient)" : "Ancient" },
              { id: "medieval", label: isOdia ? "ମଧ୍ୟ ଯୁଗ (Medieval)" : "Medieval" },
              { id: "modern", label: isOdia ? "ଆଧୁନିକ ଯୁଗ (Modern)" : "Modern" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-museum-charcoal text-white font-bold"
                    : "bg-museum-parchment border border-museum-stone text-museum-charcoal hover:border-museum-terracotta"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-museum-terracotta absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchTermSafe(e.target.value)}
              placeholder={isOdia ? "ଅଧ୍ୟାୟ ବା ବିଷୟ ଖୋଜନ୍ତୁ..." : "Search chapters or rulers..."}
              className="w-full pl-9 pr-3 py-2 bg-museum-parchment/60 border border-museum-stone rounded-xl text-xs text-museum-charcoal font-sans placeholder:text-museum-charcoalLight focus:border-museum-terracotta focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main Chapter Cards Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-[1680px] mx-auto">
        {activeTab === "india" ? (
          /* INDIA CHAPTERS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIndia.map((item) => (
              <div
                key={item.id}
                className="group bg-museum-parchment/50 border border-museum-stone hover:border-museum-terracotta rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-museum-terracotta mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-museum-terracotta/10 border border-museum-terracotta/20 font-bold text-[10px]">
                      {item.era}
                    </span>
                    <span className="text-[11px] text-museum-charcoalLight font-mono">{item.timePeriod}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-museum-charcoal group-hover:text-museum-terracotta transition-colors mb-3">
                    {item.titleOdia}
                  </h3>

                  <p className="font-sans text-xs text-museum-charcoalLight leading-relaxed line-clamp-4 mb-4">
                    {item.summaryOdia}
                  </p>

                  {/* Subsections Pill Preview */}
                  <div className="space-y-1 mb-4 pt-2 border-t border-museum-stone/60">
                    <span className="text-[10px] font-mono text-museum-antiqueGold font-bold uppercase block">
                      {isOdia ? "ପ୍ରମୁଖ ବିଷୟବସ୍ତୁ:" : "Key Subsections:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.subsections.slice(0, 3).map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-museum-ivory border border-museum-stone text-[10px] text-museum-charcoal font-sans"
                        >
                          {sub.nameOdia}
                        </span>
                      ))}
                      {item.subsections.length > 3 && (
                        <span className="text-[10px] font-mono text-museum-terracotta pt-0.5 font-bold">
                          +{item.subsections.length - 3} ଅଧିକ
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-museum-stone flex items-center justify-between">
                  <button
                    onClick={() => setReadingIndiaItem(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-museum-terracotta text-white hover:bg-museum-mutedRed rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isOdia ? "ସମ୍ପୂର୍ଣ୍ଣ ଅଧ୍ୟାୟ ପଢ଼ନ୍ତୁ" : "READ FULL CHAPTER"}</span>
                  </button>

                  <span className="text-[10px] font-mono text-museum-charcoalLight">
                    {item.subsections.length} ବିଭାଗ
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ODISHA CHAPTERS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOdisha.map((item) => (
              <div
                key={item.id}
                className="group bg-museum-parchment/50 border border-museum-stone hover:border-museum-antiqueGold rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 border border-museum-stone/80 bg-museum-charcoal/10">
                    <Image
                      src={item.image}
                      alt={item.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs text-white">
                      <span className="px-2 py-0.5 rounded-md bg-museum-terracotta/90 font-bold text-[10px] tracking-wide">
                        {item.era}
                      </span>
                      <span className="text-[10px] font-mono bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.timePeriod}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-museum-charcoal group-hover:text-museum-terracotta transition-colors mb-2">
                    {item.titleOdia}
                  </h3>
                  <p className="text-[11px] font-mono text-museum-charcoalLight mb-2">{item.titleEn}</p>

                  <p className="font-sans text-xs text-museum-charcoal leading-relaxed line-clamp-3 mb-4">
                    {item.summaryOdia}
                  </p>

                  {/* Subsections Preview */}
                  <div className="space-y-1 mb-4 pt-2 border-t border-museum-stone/60">
                    <span className="text-[10px] font-mono text-museum-terracotta font-bold uppercase block">
                      {isOdia ? "ପ୍ରମୁଖ ଅଧ୍ୟାୟ ବିଷୟବସ୍ତୁ:" : "Key Subsections:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.subsections.slice(0, 3).map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-museum-ivory border border-museum-stone text-[10px] text-museum-charcoal font-sans"
                        >
                          {sub.nameOdia}
                        </span>
                      ))}
                      {item.subsections.length > 3 && (
                        <span className="text-[10px] font-mono text-museum-terracotta pt-0.5 font-bold">
                          +{item.subsections.length - 3} ଅଧିକ
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-museum-stone flex items-center justify-between">
                  <button
                    onClick={() => setReadingOdishaItem(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-museum-antiqueGold text-museum-charcoal hover:bg-museum-parchment rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-xs border border-museum-stone cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-museum-terracotta" />
                    <span>{isOdia ? "ସମ୍ପୂର୍ଣ୍ଣ ଦଲିଲ ପଢ଼ନ୍ତୁ" : "READ FULL DOCUMENT"}</span>
                  </button>

                  <span className="text-[10px] font-mono text-museum-charcoalLight">
                    {item.subsections.length} ବିଭାଗ
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 360° GOOGLE MAP PANORAMAS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-museum-parchment/60 border-t border-museum-stone">
        <div className="max-w-[1680px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-museum-stone">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A3324] font-semibold block mb-2">
                {isOdia ? "ବିଶ୍ୱ ଓ ଭାରତର ପ୍ରସିଦ୍ଧ ଐତିହ୍ୟ ସ୍ଥଳୀର ୩୬୦° ଭ୍ୟୁ" : "GLOBAL & REGIONAL HERITAGE MONUMENTS — 360° PANORAMAS"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-museum-charcoal">
                {isOdia ? "ପ୍ରତ୍ୟକ୍ଷ ୩୬୦° ବିଶ୍ୱବ୍ୟାପୀ ଗୁଗଲ୍ ମ୍ୟାପ୍ସ ଅନୁଭୂତି" : "Interactive 360° Worldwide Google Maps Panoramas"}
              </h2>
            </div>
            <p className="text-xs font-sans text-museum-charcoalLight max-w-md mt-2 md:mt-0">
              {isOdia
                ? "କୋଣାର୍କ, ତାଜମହଲ, ରୋମାନ୍ କଲୋସିୟମ୍, ପ୍ୟାରିସ୍ ଏଫେଲ୍ ଟାୱାର୍ କିମ୍ବା ଯେକୌଣସି ବିଶ୍ୱବ୍ୟାପୀ ସ୍ଥଳ ଖୋଜି ପ୍ରତ୍ୟକ୍ଷ ୩୬୦° ଭ୍ୟୁ ଘୂରାଇ ଅନୁଭବ କରନ୍ତୁ।"
                : "Experience real 360-degree street view panoramas of ancient Indian, Odishan, and iconic world heritage monuments."}
            </p>
          </div>

          {/* Search and Category Filter for 360 Places */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: isOdia ? "ସମସ୍ତ ସ୍ଥାନ (All)" : "All Places" },
                { id: "odisha", label: isOdia ? "🏛️ ଓଡ଼ିଶା ଐତିହ୍ୟ (Odisha)" : "🏛️ Odisha Heritage" },
                { id: "india", label: isOdia ? "🇮🇳 ଭାରତୀୟ ସ୍ଥାପତ୍ୟ (India)" : "🇮🇳 Pan-India" },
                { id: "global", label: isOdia ? "🌍 ବିଶ୍ୱ ସ୍ଥାପତ୍ୟ (Global)" : "🌍 Global Wonders" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion360(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                    selectedRegion360 === tab.id
                      ? "bg-museum-terracotta text-white font-bold shadow-xs"
                      : "bg-museum-ivory border border-museum-stone text-museum-charcoal hover:bg-museum-parchment"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 360 Interactive Live Search Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExecuteLiveSearch(searchQuery360);
              }}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-museum-terracotta absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery360}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery360(val);
                    const match = historicalPlaces.find(
                      (p) =>
                        p.nameEnglish.toLowerCase().includes(val.toLowerCase()) ||
                        p.nameOdia.toLowerCase().includes(val.toLowerCase())
                    );
                    if (match) {
                      setActive360Place(match);
                    }
                  }}
                  placeholder={isOdia ? "ଯେକୌଣସି ୩୬୦° ସ୍ଥାନ ଖୋଜନ୍ତୁ (Konark, Hampi, Taj)..." : "Search any monument (Konark, Hampi, Taj)..."}
                  className="w-full pl-9 pr-8 py-2.5 bg-museum-ivory border border-museum-stone rounded-xl text-xs text-museum-charcoal font-sans placeholder:text-museum-charcoalLight focus:border-museum-terracotta focus:outline-none shadow-xs"
                />
                {searchQuery360 && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery360("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-museum-charcoalLight hover:text-museum-charcoal text-xs cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#8A3324] hover:bg-museum-mutedRed text-white rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer shrink-0"
              >
                {isOdia ? "୩୬୦° ଦେଖନ୍ତୁ" : "EXPLORE 360°"}
              </button>
            </form>
          </div>

          {/* Selector pills for 360 Places */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filtered360Places.map((place) => (
              <button
                key={place.id}
                onClick={() => setActive360Place(place)}
                className={`px-3.5 py-2 rounded-xl text-xs font-sans font-semibold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                  active360Place.id === place.id
                    ? "bg-museum-charcoal text-white shadow-sm ring-2 ring-museum-terracotta"
                    : "bg-museum-ivory border border-museum-stone text-museum-charcoal hover:bg-museum-parchment hover:border-museum-terracotta"
                }`}
              >
                <Compass className={`w-3.5 h-3.5 ${active360Place.id === place.id ? "text-museum-antiqueGold animate-pulse" : "text-museum-terracotta"}`} />
                <span>{place.nameOdia}</span>
                <span className="text-[10px] opacity-70 ml-1 font-mono">({place.nameEnglish})</span>
              </button>
            ))}
          </div>

          {/* 360 Viewer Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-museum-ivory border border-museum-stone rounded-2xl p-6 sm:p-8 shadow-sm">
            {/* Embed iframe */}
            <div className="lg:col-span-8 aspect-[16/9] w-full rounded-xl overflow-hidden border border-museum-stone shadow-inner bg-black">
              <iframe
                src={active360Place.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${active360Place.nameEnglish} 360 View`}
              />
            </div>

            {/* Description details */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-museum-terracotta font-bold uppercase tracking-wider block mb-1">
                  {active360Place.era}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-museum-charcoal mb-1">
                  {active360Place.nameOdia}
                </h3>
                <p className="text-xs font-mono text-museum-charcoalLight mb-4 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-museum-terracotta" />
                  <span>{active360Place.locationOdia} ({active360Place.locationEnglish})</span>
                </p>
                <p className="font-sans text-sm text-museum-charcoal leading-relaxed">
                  {active360Place.descriptionOdia}
                </p>
              </div>

              <div className="p-4 bg-museum-parchment/60 rounded-xl border border-museum-stone text-xs font-mono space-y-1">
                <span className="text-[10px] text-museum-antiqueGold font-bold uppercase block">
                  ୩୬୦° ଦୃଶ୍ୟ ସୂଚନା
                </span>
                <p className="text-museum-charcoalLight text-[11px] font-sans">
                  ମାଉସ୍ କିମ୍ବା ଆଙ୍ଗୁଳି ସାହାଯ୍ୟରେ ସମ୍ପୂର୍ଣ୍ଣ ୩୬୦ ଡିଗ୍ରୀ ଘୂରାଇ ନିଖୁଣ କାରୁକାର୍ଯ୍ୟ ଅନୁଧ୍ୟାନ କରନ୍ତୁ।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEEP READING MODAL FOR INDIA ITEMS */}
      {readingIndiaItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-museum-charcoal/70 backdrop-blur-md">
          <div className="bg-museum-ivory border border-museum-stone rounded-2xl p-6 sm:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-8 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-museum-stone pb-4">
              <div>
                <span className="text-xs font-mono text-museum-terracotta uppercase font-bold tracking-wider">
                  {readingIndiaItem.era} · {readingIndiaItem.timePeriod}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-museum-charcoal mt-1">
                  {readingIndiaItem.titleOdia}
                </h2>
                <p className="text-xs font-mono text-museum-charcoalLight mt-1">{readingIndiaItem.titleEn}</p>
              </div>
              <button
                onClick={() => setReadingIndiaItem(null)}
                className="p-2 rounded-xl bg-museum-parchment border border-museum-stone text-museum-charcoal hover:border-museum-terracotta cursor-pointer"
                title="ବନ୍ଦ କରନ୍ତୁ (Close)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comprehensive Summary */}
            <div className="p-5 rounded-xl bg-museum-parchment/60 border border-museum-stone text-sm sm:text-base font-serif text-museum-charcoal leading-relaxed shadow-xs">
              {readingIndiaItem.summaryOdia}
            </div>

            {/* Detailed Subsections */}
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-museum-terracotta font-bold block">
                ବିସ୍ତୃତ ଐତିହାସିକ ବିଶ୍ଳେଷଣ (DETAILED SCHOLARLY CHAPTERS)
              </span>

              {readingIndiaItem.subsections.map((sub, idx) => (
                <div key={idx} className="p-6 bg-museum-parchment/30 border border-museum-stone rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-museum-terracotta text-white text-xs font-mono flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-museum-charcoal">
                      {sub.nameOdia}
                    </h3>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-museum-charcoal leading-relaxed whitespace-pre-line pl-8">
                    {sub.detailsOdia}
                  </p>
                </div>
              ))}
            </div>

            {/* Archaeological Sites & Sources */}
            {readingIndiaItem.archaeologicalSites && (
              <div className="p-5 bg-museum-parchment/60 rounded-xl border border-museum-stone space-y-2 text-xs font-sans">
                <span className="text-[10px] font-mono uppercase tracking-wider text-museum-antiqueGold font-bold block">
                  ପ୍ରମୁଖ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ କ୍ଷେତ୍ର ଓ ପ୍ରାଥମିକ ଉତ୍ସ
                </span>
                <div className="flex flex-wrap gap-2">
                  {readingIndiaItem.archaeologicalSites.map((site, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-md bg-museum-ivory border border-museum-stone text-museum-charcoal font-medium">
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-museum-stone flex justify-end">
              <button
                onClick={() => setReadingIndiaItem(null)}
                className="px-6 py-2.5 bg-museum-terracotta text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-museum-mutedRed transition-all"
              >
                ବନ୍ଦ କରନ୍ତୁ (CLOSE)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEEP READING MODAL FOR ODISHA ITEMS */}
      {readingOdishaItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-museum-charcoal/70 backdrop-blur-md">
          <div className="bg-museum-ivory border border-museum-stone rounded-2xl p-6 sm:p-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-8 shadow-2xl relative">
            
            {/* Modal Hero Image */}
            <div className="relative h-56 sm:h-72 w-full rounded-xl overflow-hidden border border-museum-stone shadow-md bg-museum-charcoal">
              <Image
                src={readingOdishaItem.image}
                alt={readingOdishaItem.titleEn}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                onClick={() => setReadingOdishaItem(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 border border-white/20 text-white hover:bg-museum-terracotta transition-colors cursor-pointer"
                title="ବନ୍ଦ କରନ୍ତୁ (Close)"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 rounded-full bg-museum-terracotta text-white text-[11px] font-mono font-bold tracking-wider mb-2">
                  {readingOdishaItem.era} · {readingOdishaItem.timePeriod}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight drop-shadow-md">
                  {readingOdishaItem.titleOdia}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-museum-parchment/90 mt-1">{readingOdishaItem.titleEn}</p>
              </div>
            </div>

            {/* Comprehensive Summary */}
            <div className="p-6 rounded-xl bg-museum-parchment/70 border border-museum-stone text-sm sm:text-base font-serif text-museum-charcoal leading-relaxed shadow-xs space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-museum-terracotta font-bold block">
                ଐତିହାସିକ ସାରାଂଶ ଓ ପୃଷ୍ଠଭୂମି (HISTORICAL EXECUTIVE SUMMARY)
              </span>
              <p>{readingOdishaItem.summaryOdia}</p>
            </div>

            {/* Detailed Subsections */}
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-museum-terracotta font-bold block">
                ବିସ୍ତୃତ ଐତିହାସିକ ବିଶ୍ଳେଷଣ ଓ ଗବେଷଣାତ୍ମକ ଦଲିଲ (SCHOLARLY RESEARCH CHAPTERS)
              </span>

              {readingOdishaItem.subsections.map((sub, idx) => (
                <div key={idx} className="p-6 bg-museum-parchment/40 border border-museum-stone rounded-xl space-y-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-museum-antiqueGold text-museum-charcoal text-xs font-mono flex items-center justify-center font-bold shadow-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-museum-charcoal">
                        {sub.nameOdia}
                      </h3>
                      <p className="text-[11px] font-mono text-museum-charcoalLight">{sub.nameEn}</p>
                    </div>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-museum-charcoal leading-relaxed whitespace-pre-line pl-10 border-l-2 border-museum-antiqueGold/40 ml-3.5">
                    {sub.detailsOdia}
                  </p>
                </div>
              ))}
            </div>

            {/* Monuments, Rulers & Historical Evidences */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {readingOdishaItem.monuments && (
                <div className="p-4 bg-museum-parchment/60 rounded-xl border border-museum-stone space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-museum-terracotta font-bold block">
                    🏛️ ପ୍ରମୁଖ ସ୍ମାରକୀ ଓ ସ୍ଥଳୀ
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {readingOdishaItem.monuments.map((m, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-museum-ivory border border-museum-stone text-[11px] text-museum-charcoal font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {readingOdishaItem.rulers && (
                <div className="p-4 bg-museum-parchment/60 rounded-xl border border-museum-stone space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-museum-antiqueGold font-bold block">
                    👑 ଶାସକ ଓ ନେତୃତ୍ୱ
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {readingOdishaItem.rulers.map((r, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-museum-ivory border border-museum-stone text-[11px] text-museum-charcoal font-medium">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {readingOdishaItem.historicalEvidences && (
                <div className="p-4 bg-museum-parchment/60 rounded-xl border border-museum-stone space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-museum-charcoal font-bold block">
                    📜 ପ୍ରାଥମିକ ପ୍ରମାଣ ଓ ଲେଖ
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {readingOdishaItem.historicalEvidences.map((e, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-museum-ivory border border-museum-stone text-[11px] text-museum-charcoal font-medium">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-museum-stone flex items-center justify-between">
              <span className="text-xs font-mono text-museum-charcoalLight">
                KAALREKHA Odishan Historical Archive · Dr. Anjan Kumar Pal
              </span>
              <button
                onClick={() => setReadingOdishaItem(null)}
                className="px-6 py-2.5 bg-museum-terracotta text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-museum-mutedRed transition-all cursor-pointer shadow-sm"
              >
                ବନ୍ଦ କରନ୍ତୁ (CLOSE)
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );

  function setSearchTermSafe(val: string) {
    setSearchQuery(val);
  }
}
