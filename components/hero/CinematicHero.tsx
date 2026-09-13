"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Calendar,
  Landmark,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface EraData {
  id: string;
  name: string;
  nameOdia: string;
  period: string;
  periodOdia: string;
  description: string;
  descriptionOdia: string;
  civilizations: {
    name: string;
    nameOdia: string;
    tag: string;
    tagOdia: string;
    period: string;
    focus: string;
    focusOdia: string;
    image: string;
    link: string;
  }[];
  events: {
    title: string;
    titleOdia: string;
    year: string;
    location: string;
    desc: string;
    descOdia: string;
  }[];
}

export const eraTimelineData: EraData[] = [
  {
    id: "ancient",
    name: "Ancient World",
    nameOdia: "ପ୍ରାଚୀନ ଯୁଗ",
    period: "3000 BCE – 500 CE",
    periodOdia: "ଖ୍ରୀ.ପୂ. ୩୦୦୦ – ଖ୍ରୀଷ୍ଟାବ୍ଦ ୫୦୦",
    description: "The dawn of urban civilizations, philosophical awakening, and classical empires across the Mediterranean and Indus-Ganges valleys.",
    descriptionOdia: "ପ୍ରାଚୀନ ସଭ୍ୟତାର ଉନ୍ମେଷ, ପ୍ରସ୍ତର ଯୁଗରୁ ସିନ୍ଧୁ ଉପତ୍ୟକା, ପ୍ରାଚୀନ କଳିଙ୍ଗ, ମୌର୍ଯ୍ୟ ଓ ରୋମାନ୍ ସାମ୍ରାଜ୍ୟର ସ୍ୱର୍ଣ୍ଣିମ ଗାଥା।",
    civilizations: [
      {
        name: "Ancient Kalinga",
        nameOdia: "ପ୍ରାଚୀନ କଳିଙ୍ଗ ଓ ଉତ୍କଳ",
        tag: "MARITIME EMPIRE",
        tagOdia: "ସାମୁଦ୍ରିକ ସାମ୍ରାଜ୍ୟ",
        period: "6th Century BCE – 1st Century CE",
        focus: "Maritime Sadhabas, Dhauli Edicts, Emperor Kharavela & Hathigumpha Inscription",
        focusOdia: "ନୌବାଣିଜ୍ୟ, ଧଉଳି ଶିଳାଲେଖ, ସମ୍ରାଟ ଖାରବେଳ ଓ ହାତୀଗୁମ୍ଫା ଅଭିଲେଖ",
        image: "/images/ancient_kalinga_maritime.jpg",
        link: "/india#kalinga",
      },
      {
        name: "Roman Empire",
        nameOdia: "ରୋମାନ୍ ସାମ୍ରାଜ୍ୟ",
        tag: "IMPERIAL CAPITOL",
        tagOdia: "ପ୍ରାଚୀନ ଶାସନର କେନ୍ଦ୍ର",
        period: "27 BCE – 476 CE",
        focus: "Pax Romana, Senate, Aqueducts, Legal Jurisprudence & Colosseum",
        focusOdia: "ରୋମାନ୍ ଆଇନ, ସିନେଟ୍, ସ୍ଥାପତ୍ୟ କଳା ଓ କୋଲୋସିୟମ୍",
        image: "/images/rome_colosseum.jpg",
        link: "/research#roman",
      },
      {
        name: "Indus Valley (Harappa)",
        nameOdia: "ସିନ୍ଧୁ ସଭ୍ୟତା (ହରପ୍ପା ଓ ମହେଞ୍ଜୋଦାରୋ)",
        tag: "FIRST URBAN GRID",
        tagOdia: "ପ୍ରଥମ ନଗର ସଭ୍ୟତା",
        period: "2600 – 1900 BCE",
        focus: "Standardized Brick Metrology, Great Bath, Dholavira Water Reservoirs & Seals",
        focusOdia: "ଉନ୍ନତ ନଗର ପରିକଳ୍ପନା, ସ୍ନାନାଗାର, ଢୋଲାଭିରା ଜଳ ପ୍ରଣାଳୀ ଓ ମୋହର",
        image: "/images/indus_valley_harappa.jpg",
        link: "/india#indus",
      },
      {
        name: "Classical Athens",
        nameOdia: "ପ୍ରାଚୀନ ଏଥେନ୍ସ",
        tag: "CRADLE OF DEMOCRACY",
        tagOdia: "ଗଣତନ୍ତ୍ର ଓ ଦର୍ଶନର ଜନ୍ମଭୂମି",
        period: "5th – 4th Century BCE",
        focus: "Democratic Assembly, Socratic Philosophy, Parthenon & Classical Drama",
        focusOdia: "ସକ୍ରେଟିକ୍ ଦର୍ଶନ, ଗଣତାନ୍ତ୍ରିକ ବ୍ୟବସ୍ଥା ଓ ପାର୍ଥେନନ୍",
        image: "/images/athens_parthenon.jpg",
        link: "/research#athens",
      },
      {
        name: "Mauryan Empire",
        nameOdia: "ମୌର୍ଯ୍ୟ ସାମ୍ରାଜ୍ୟ",
        tag: "PAN-ASIAN DHAMMA",
        tagOdia: "ଅଖଣ୍ଡ ଭାରତ ଓ ଧର୍ମାଶୋକ",
        period: "322 – 185 BCE",
        focus: "Chandragupta Maurya, Chanakya's Arthashastra, Kalinga War & Ashoka Pillars",
        focusOdia: "ଚାଣକ୍ୟଙ୍କ ଅର୍ଥଶାସ୍ତ୍ର, କଳିଙ୍ଗ ଯୁଦ୍ଧ, ଅଶୋକ ସ୍ତମ୍ଭ ଓ ଧର୍ମପ୍ରଚାର",
        image: "/images/mauryan_empire_ashoka.jpg",
        link: "/india#maurya",
      },
      {
        name: "Gupta Golden Age",
        nameOdia: "ଗୁପ୍ତ ସ୍ୱର୍ଣ୍ଣ ଯୁଗ",
        tag: "CLASSICAL RENAISSANCE",
        tagOdia: "ଭାରତୀୟ ସ୍ୱର୍ଣ୍ଣ ଯୁଗ",
        period: "319 – 550 CE",
        focus: "Aryabhata's Astronomy, Kalidasa's Literature, Nalanda University & Metallurgy",
        focusOdia: "ଆର୍ଯ୍ୟଭଟ୍ଟଙ୍କ ଗଣିତ, କାଳିଦାସଙ୍କ କାବ୍ୟ ଓ ନାଳନ୍ଦା ବିଶ୍ୱବିଦ୍ୟାଳୟ",
        image: "/images/kaalrekha_hero_collage.jpg",
        link: "/india#gupta",
      },
    ],
    events: [
      {
        title: "The Kalinga War & Ashoka's Edict of Peace",
        titleOdia: "ଐତିହାସିକ କଳିଙ୍ଗ ଯୁଦ୍ଧ ଓ ଅଶୋକଙ୍କ ଶାନ୍ତି ପ୍ରସ୍ତରଲେଖ",
        year: "261 BCE",
        location: "Dhauli River Basin, Odisha",
        desc: "A transformative clash on the Daya River banks leading Emperor Ashoka to renounce violence and spread Buddhism across Asia.",
        descOdia: "ଦୟା ନଦୀ କୂଳରେ ସଂଘଟିତ ଯୁଦ୍ଧ ପରେ ଚଣ୍ଡାଶୋକ ଧର୍ମାଶୋକରେ ରୂପାନ୍ତରିତ ହୋଇ ଅହିଂସା ନୀତି ଗ୍ରହଣ କଲେ।",
      },
      {
        title: "Construction of the Roman Colosseum",
        titleOdia: "ରୋମାନ୍ କୋଲୋସିୟମ୍ ନିର୍ମାଣ",
        year: "80 CE",
        location: "Rome, Italy",
        desc: "Inauguration of the Flavian Amphitheatre, the largest monument to ancient architectural engineering.",
        descOdia: "ପ୍ରାଚୀନ ସ୍ଥାପତ୍ୟର ବିସ୍ମୟକର ପ୍ରତୀକ ଭାବେ ବିଶାଳ ଆମ୍ଫିଥିଏଟରର ପ୍ରତିଷ୍ଠା।",
      },
      {
        title: "Coronation of Emperor Kharavela & Hathigumpha Record",
        titleOdia: "ସମ୍ରାଟ ଖାରବେଳଙ୍କ ରାଜ୍ୟାଭିଷେକ ଓ ହାତୀଗୁମ୍ଫା ପ୍ରଶସ୍ତି",
        year: "1st Century BCE",
        location: "Udayagiri, Bhubaneswar",
        desc: "Kharavela consolidates the Mahameghavahana empire, defeats Magadhan forces, and brings back the revered Kalinga Jina.",
        descOdia: "ଖାରବେଳ କଳିଙ୍ଗର ଦିଗ୍ବିଜୟ କରି ମଗଧରୁ କଳିଙ୍ଗ ଜିନ ପ୍ରତିମା ପୁନରୁଦ୍ଧାର କଲେ।",
      },
    ],
  },
  {
    id: "medieval",
    name: "Medieval Era",
    nameOdia: "ମଧ୍ୟ ଯୁଗ",
    period: "500 – 1500 CE",
    periodOdia: "୫୦୦ – ୧୫୦୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ",
    description: "The grand era of majestic temple architecture in Odisha, Chola maritime expansion, Delhi Sultanates, and the Byzantine Silk Road.",
    descriptionOdia: "ଓଡ଼ିଶାରେ ଗଙ୍ଗ ଓ ସୋମବଂଶୀ ମନ୍ଦିର ନିର୍ମାଣ, ଚୋଳ ସାମୁଦ୍ରିକ ସାମ୍ରାଜ୍ୟ ଓ ଭାରତୀୟ ସଂସ୍କୃତିର ମହାନ ଯୁଗ।",
    civilizations: [
      {
        name: "Eastern Ganga Dynasty",
        nameOdia: "ପୂର୍ବ ଗଙ୍ଗ ବଂଶ",
        tag: "TEMPLE ARCHITECTS",
        tagOdia: "ମନ୍ଦିର ସ୍ଥାପତ୍ୟର ସ୍ୱର୍ଣ୍ଣ ଯୁଗ",
        period: "1078 – 1434 CE",
        focus: "Puri Jagannath Temple, Konark Sun Temple (Black Pagoda) & Kalinga Architecture",
        focusOdia: "ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର, କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ଓ କଳିଙ୍ଗ ସ୍ଥାପତ୍ୟ",
        image: "/images/eastern_ganga_konark.jpg",
        link: "/india#ganga",
      },
      {
        name: "Somavamshi Dynasty",
        nameOdia: "ସୋମବଂଶୀ (କେଶରୀ) ରାଜବଂଶ",
        tag: "EKAMRA HERITAGE",
        tagOdia: "ଏକାମ୍ର କ୍ଷେତ୍ରର ପ୍ରତିଷ୍ଠାତା",
        period: "9th – 12th Century CE",
        focus: "Lingaraj Temple, Mukteshwar Temple (Gem of Odishan Architecture) & Yayati Kesari",
        focusOdia: "ଲିଙ୍ଗରାଜ ମନ୍ଦିର, ମୁକ୍ତେଶ୍ୱର ମନ୍ଦିର ଓ ଯଯାତି କେଶରୀ",
        image: "/images/eastern_ganga_konark.jpg",
        link: "/india#somavamshi",
      },
      {
        name: "Chola Empire",
        nameOdia: "ଚୋଳ ସାମ୍ରାଜ୍ୟ",
        tag: "MARITIME THALASSOCRACY",
        tagOdia: "ସାମୁଦ୍ରିକ ବିଜୟ ଅଭିଯାନ",
        period: "848 – 1279 CE",
        focus: "Rajaraja Chola, Brihadeeswarar Temple, Southeast Asian Naval Expeditions & Bronze Sculptures",
        focusOdia: "ରାଜରାଜ ଚୋଳ, ବୃହଦୀଶ୍ୱର ମନ୍ଦିର ଓ ଦକ୍ଷିଣ-ପୂର୍ବ ଏସିଆ ନୌବାଣିଜ୍ୟ",
        image: "/images/chola_maritime_empire.jpg",
        link: "/india#chola",
      },
      {
        name: "Vijayanagara Empire",
        nameOdia: "ବିଜୟନଗର ସାମ୍ରାଜ୍ୟ",
        tag: "CITY OF VICTORY",
        tagOdia: "ହମ୍ପିର ଗୌରବ",
        period: "1336 – 1646 CE",
        focus: "Krishnadevaraya, Hampi Stone Chariot, Virupaksha Temple & International Diamond Trade",
        focusOdia: "କୃଷ୍ଣଦେବରାୟ, ହମ୍ପି ପ୍ରସ୍ତର ରଥ ଓ ହୀରା ବାଣିଜ୍ୟ",
        image: "/images/vijayanagara_hampi.jpg",
        link: "/india#vijayanagara",
      },
      {
        name: "Delhi Sultanate",
        nameOdia: "ଦିଲ୍ଲୀ ସୁଲତାନେଟ୍",
        tag: "INDO-ISLAMIC SYNTHESIS",
        tagOdia: "ଇଣ୍ଡୋ-ଇସଲାମିକ ଯୁଗ",
        period: "1206 – 1526 CE",
        focus: "Qutub Minar, Iron Pillar, Alai Darwaza & Medieval Fortifications",
        focusOdia: "କୁତୁବ ମିନାର, ଲୌହ ସ୍ତମ୍ଭ ଓ ମଧ୍ୟଯୁଗୀୟ ଦୁର୍ଗ",
        image: "/images/kaalrekha_hero_collage.jpg",
        link: "/india#sultanate",
      },
      {
        name: "Byzantine Empire",
        nameOdia: "ବାଇଜାଣ୍ଟାଇନ୍ ସାମ୍ରାଜ୍ୟ",
        tag: "EASTERN MEDITERRANEAN",
        tagOdia: "କନଷ୍ଟାଣ୍ଟିନୋପଲ",
        period: "330 – 1453 CE",
        focus: "Hagia Sophia, Justinian Code, Silk Route Trade & Mosaic Masterpieces",
        focusOdia: "ହାଗିଆ ସୋଫିଆ, ଜଷ୍ଟିନିଆନ୍ କୋଡ୍ ଓ ସିଲ୍କ ରୁଟ୍",
        image: "/images/athens_parthenon.jpg",
        link: "/research#byzantine",
      },
    ],
    events: [
      {
        title: "Consecration of the Konark Sun Temple",
        titleOdia: "କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର ନିର୍ମାଣ",
        year: "1250 CE",
        location: "Konark, Bay of Bengal Coast",
        desc: "King Langula Narasimhadeva I completes the colossal 24-wheeled chariot temple dedicated to Surya.",
        descOdia: "ରାଜା ଲାଙ୍ଗୁଳା ନରସିଂହଦେବଙ୍କ ଦ୍ୱାରା ୨୪ ଚକ ବିଶିଷ୍ଟ ସୂର୍ଯ୍ୟ ରଥ ମନ୍ଦିର ନିର୍ମିତ ହେଲା।",
      },
      {
        title: "Ascension of Kapilendra Deva & Gajapati Empire",
        titleOdia: "କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ରାଜ୍ୟାରୋହଣ ଓ ଗଜପତି ସାମ୍ରାଜ୍ୟ",
        year: "1435 CE",
        location: "Cuttack / Puri, Odisha",
        desc: "Kapilendra Deva establishes the Suryavamsha Gajapati dynasty, expanding borders from the Ganges to the Kaveri.",
        descOdia: "ଗଙ୍ଗାଠାରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତାରିତ ଗଜପତି ସାମ୍ରାଜ୍ୟର ପ୍ରତିଷ୍ଠା।",
      },
    ],
  },
  {
    id: "early-modern",
    name: "Early Modern",
    nameOdia: "ପ୍ରାରମ୍ଭିକ ଆଧୁନିକ ଯୁଗ",
    period: "1500 – 1800 CE",
    periodOdia: "୧୫୦୦ – ୧୮୦୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ",
    description: "The era of the Gajapati Empire, Mughal grand monuments including the Taj Mahal, the rise of Maratha Swarajya, and global voyages of exploration.",
    descriptionOdia: "ଗଜପତି ଓ ଭୋଇ ରାଜବଂଶ, ମୋଗଲ ସ୍ଥାପତ୍ୟର ଶିଖର (ତାଜମହଲ), ଛତ୍ରପତି ଶିବାଜୀଙ୍କ ସ୍ୱରାଜ୍ୟ ଓ ମରାଠା ଶାସନ।",
    civilizations: [
      {
        name: "Gajapati & Bhoi Dynasties",
        nameOdia: "ଗଜପତି ଓ ଖୋର୍ଦ୍ଧା ଭୋଇ ବଂଶ",
        tag: "LORDS OF ELEPHANTS",
        tagOdia: "ଗଜପତି ମହାରାଜା ଓ ଜଗନ୍ନାଥ ରକ୍ଷକ",
        period: "1434 – 1803 CE",
        focus: "Purushottama Deva (Kanchi Abhiyana), Mukunda Deva, Khurda Fort & Jagannath Sevaks",
        focusOdia: "କାଞ୍ଚି ବିଜୟ, ଖୋର୍ଦ୍ଧା ଗଡ଼ ଓ ଜଗନ୍ନାଥ ସଂସ୍କୃତିର ସୁରକ୍ଷା",
        image: "/images/ancient_kalinga_maritime.jpg",
        link: "/india#gajapati",
      },
      {
        name: "Mughal Empire",
        nameOdia: "ମୋଗଲ ସାମ୍ରାଜ୍ୟ",
        tag: "IMPERIAL MONUMENTS",
        tagOdia: "ମହାନ ସ୍ଥାପତ୍ୟ ଓ ସାମ୍ରାଜ୍ୟ",
        period: "1526 – 1857 CE",
        focus: "Akbar the Great, Shah Jahan, Taj Mahal, Red Fort, Fatehpur Sikri & Miniature Art",
        focusOdia: "ଆକବର, ଶାହଜାହାନ, ତାଜମହଲ, ଲାଲ୍ କିଲ୍ଲା ଓ ମିନିଏଚର୍ ଚିତ୍ରକଳା",
        image: "/images/kaalrekha_hero_collage.jpg",
        link: "/india#mughal",
      },
      {
        name: "Maratha Empire (Swarajya)",
        nameOdia: "ମରାଠା ସାମ୍ରାଜ୍ୟ (ସ୍ୱରାଜ୍ୟ)",
        tag: "VALOR & CONFEDERACY",
        tagOdia: "ଛତ୍ରପତି ଶିବାଜୀ ଓ ପେଶୱା",
        period: "1674 – 1818 CE",
        focus: "Chhatrapati Shivaji Maharaj, Fort Architecture, Peshwa Administration & Rule in Odisha",
        focusOdia: "ଶିବାଜୀ ମହାରାଜ, ଦୁର୍ଗ ନିର୍ମାଣ, ପେଶୱା ଶାସନ ଓ ଓଡ଼ିଶାରେ ମରାଠା ସମୟ",
        image: "/images/maratha_empire_shivaji.jpg",
        link: "/india#maratha",
      },
      {
        name: "European Maritime Trading Companies",
        nameOdia: "ୟୁରୋପୀୟ ବଣିକ କମ୍ପାନୀ ସମୂହ",
        tag: "GLOBAL TRADE NETWORKS",
        tagOdia: "ବାଣିଜ୍ୟିକ ବନ୍ଦର ଓ ସାମ୍ରାଜ୍ୟବାଦ",
        period: "1600 – 1800 CE",
        focus: "Portuguese, Dutch, French, English East India Company at Balasore and Pipli ports",
        focusOdia: "ବାଲେଶ୍ୱର ଓ ପିପିଲି ବନ୍ଦରରେ ଇଂରେଜ ଓ ଫରାସୀ ବାଣିଜ୍ୟ କୋଠି",
        image: "/images/kaalrekha_world_map.jpg",
        link: "/india#europeans",
      },
    ],
    events: [
      {
        title: "Construction of the Taj Mahal in Agra",
        titleOdia: "ଆଗ୍ରାରେ ତାଜମହଲର ନିର୍ମାଣ",
        year: "1632–1653 CE",
        location: "Agra, Yamuna River Bank",
        desc: "Emperor Shah Jahan commissions the world-renowned white marble mausoleum for Mumtaz Mahal.",
        descOdia: "ମୋଗଲ ସମ୍ରାଟ ଶାହଜାହାନଙ୍କ ଦ୍ୱାରା ଶ୍ୱେତ ମାର୍ବଲ ସୌଧର ନିର୍ମାଣ।",
      },
      {
        title: "Coronation of Chhatrapati Shivaji Maharaj",
        titleOdia: "ଛତ୍ରପତି ଶିବାଜୀ ମହାରାଜଙ୍କ ରାଜ୍ୟାଭିଷେକ",
        year: "1674 CE",
        location: "Raigad Fort, Maharashtra",
        desc: "Founding of Hindavi Swarajya and establishment of Maratha naval and mountain warfare supremacy.",
        descOdia: "ରାୟଗଡ଼ ଦୁର୍ଗରେ ହିନ୍ଦବୀ ସ୍ୱରାଜ୍ୟର ପ୍ରତିଷ୍ଠା।",
      },
    ],
  },
  {
    id: "modern",
    name: "Modern Era",
    nameOdia: "ଆଧୁନିକ ଯୁଗ",
    period: "1800 – 1945 CE",
    periodOdia: "୧୮୦୦ – ୧୯୪୫ ଖ୍ରୀଷ୍ଟାବ୍ଦ",
    description: "The age of anti-colonial resistance: the 1817 Paika Rebellion of Odisha, the 1857 Indian Uprising, Utkal Sammilani (1936), and Gandhi's nationwide freedom struggle.",
    descriptionOdia: "୧୮୧୭ ପାଇକ ବିଦ୍ରୋହ, ଉତ୍କଳ ସମ୍ମିଳନୀ (୧୯୩୬ ସ୍ୱତନ୍ତ୍ର ଓଡ଼ିଶା ପ୍ରଦେଶ ଗଠନ) ଓ ଭାରତୀୟ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ।",
    civilizations: [
      {
        name: "Paika Rebellion & Khurda Resistance",
        nameOdia: "ପାଇକ ବିଦ୍ରୋହ (୧୮୧୭) ଓ ବକ୍ସି ଜଗବନ୍ଧୁ",
        tag: "FIRST WAR OF INDEPENDENCE",
        tagOdia: "ଭାରତର ପ୍ରଥମ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ",
        period: "1803 – 1825 CE",
        focus: "Bakshi Jagabandhu Bidyadhara, Jayee Rajguru, Tapanga & Banapur Armed Uprising",
        focusOdia: "ବକ୍ସି ଜଗବନ୍ଧୁ, ଜୟୀ ରାଜଗୁରୁ, ତାପଙ୍ଗ ଓ ଘୁମୁସର ବିଦ୍ରୋହ",
        image: "/images/paika_rebellion_1817.jpg",
        link: "/india#paika",
      },
      {
        name: "Odia Language Movement & 1936 Province",
        nameOdia: "ଭାଷା ଆନ୍ଦୋଳନ ଓ ୧୯୩୬ ସ୍ୱତନ୍ତ୍ର ଓଡ଼ିଶା ଗଠନ",
        tag: "LINGUISTIC STATEHOOD",
        tagOdia: "ଭାଷାଭିତ୍ତିକ ପ୍ରଥମ ପ୍ରଦେଶ",
        period: "1868 – 1936 CE",
        focus: "Utkal Gourab Madhusudan Das, Fakir Mohan Senapati, Maharaja Krushna Chandra Gajapati",
        focusOdia: "ଉତ୍କଳ ଗୌରବ ମଧୁସୂଦନ ଦାସ, ଫକୀର ମୋହନ ସେନାପତି ଓ କୃଷ୍ଣଚନ୍ଦ୍ର ଗଜପତି",
        image: "/images/historian_portrait.jpg",
        link: "/india#odisha-1936",
      },
      {
        name: "Indian Freedom Movement",
        nameOdia: "ଭାରତୀୟ ସ୍ୱାଧୀନତା ଆନ୍ଦୋଳନ",
        tag: "AHIMSA & SATYAGRAHA",
        tagOdia: "ଅହିଂସା ଓ ସ୍ୱରାଜ",
        period: "1885 – 1947 CE",
        focus: "Mahatma Gandhi, Salt Satyagraha at Inchudi & Eram (Raktatirtha), Subhas Chandra Bose (INA)",
        focusOdia: "ମହାତ୍ମା ଗାନ୍ଧୀ, ଇଞ୍ଚୁଡ଼ି ଲବଣ ସତ୍ୟାଗ୍ରହ, ରକ୍ତତୀର୍ଥ ଇରମ ଓ ନେତାଜୀ ସୁଭାଷ ବୋଷ",
        image: "/images/indian_freedom_struggle.jpg",
        link: "/india#freedom",
      },
      {
        name: "Tribal & Peasant Revolts in Odisha",
        nameOdia: "ଓଡ଼ିଶାର ଆଦିବାସୀ ଓ କୃଷକ ବିଦ୍ରୋହ",
        tag: "INDIGENOUS VALOR",
        tagOdia: "ଆଦିବାସୀ ବୀରତ୍ୱ",
        period: "1830 – 1942 CE",
        focus: "Veer Surendra Sai of Sambalpur, Laxman Nayak of Koraput, Dharanidhar Naik of Keonjhar",
        focusOdia: "ବୀର ସୁରେନ୍ଦ୍ର ସାଏ, ଶହୀଦ ଲକ୍ଷ୍ମଣ ନାୟକ ଓ ଧରଣୀଧର ନାୟକ",
        image: "/images/paika_rebellion_1817.jpg",
        link: "/india#tribal",
      },
    ],
    events: [
      {
        title: "The Great Paika Rebellion of 1817",
        titleOdia: "ଐତିହାସିକ ୧୮୧୭ ପାଇକ ମହାସଂଗ୍ରାମ",
        year: "1817 CE",
        location: "Khurda & Banapur, Odisha",
        desc: "Bakshi Jagabandhu leads the warrior peasantry against British East India Company oppression.",
        descOdia: "ବକ୍ସି ଜଗବନ୍ଧୁଙ୍କ ନେତୃତ୍ୱରେ ଇଂରେଜ ଶାସନ ବିରୋଧରେ ପ୍ରଚଣ୍ଡ ସଶସ୍ତ୍ର ବିପ୍ଳବ।",
      },
      {
        title: "Formation of Separate Odisha Province",
        titleOdia: "ସ୍ୱତନ୍ତ୍ର ଓଡ଼ିଶା ପ୍ରଦେଶ ଗଠନ (୧ ଅପ୍ରେଲ ୧୯୩୬)",
        year: "1 April 1936",
        location: "Cuttack, Odisha",
        desc: "Odisha becomes the first state in British India organized on a linguistic basis through Utkal Sammilani.",
        descOdia: "ଭାଷା ଭିତ୍ତିରେ ଗଠିତ ଭାରତର ପ୍ରଥମ ସ୍ୱତନ୍ତ୍ର ରାଜ୍ୟ ଭାବେ ଓଡ଼ିଶାର ଆବିର୍ଭାବ।",
      },
    ],
  },
  {
    id: "contemporary",
    name: "Contemporary",
    nameOdia: "ସମକାଳୀନ ଯୁଗ",
    period: "1945 – Present",
    periodOdia: "୧୯୪୫ – ବର୍ତ୍ତମାନ",
    description: "Democratic India, integration of Princely States (Mayurbhanj, Dhenkanal), construction of Hirakud Dam, scientific heritage preservation, and global digital archives.",
    descriptionOdia: "ସ୍ୱାଧୀନ ଭାରତ, ଗଡ଼ଜାତ ମିଶ୍ରଣ, ହୀରାକୁଦ ବନ୍ଧ ନିର୍ମାଣ, ସମ୍ବିଧାନ ପ୍ରଣୟନ ଓ ଡିଜିଟାଲ୍ ଐତିହ୍ୟ ସଂରକ୍ଷଣ।",
    civilizations: [
      {
        name: "Republic of India & Constitution",
        nameOdia: "ଭାରତୀୟ ଗଣତନ୍ତ୍ର ଓ ସମ୍ବିଧାନ",
        tag: "LARGEST DEMOCRACY",
        tagOdia: "ବିଶ୍ୱର ବୃହତ୍ତମ ଗଣତନ୍ତ୍ର",
        period: "1947 – Present",
        focus: "Dr. B.R. Ambedkar, Constitution of 1950, Space Exploration (ISRO), Green Revolution",
        focusOdia: "ଡକ୍ଟର ବି.ଆର. ଆମ୍ବେଦକର, ସମ୍ବିଧାନ, ଇସ୍ରୋ ମହାକାଶ ଗବେଷଣା ଓ ବିକାଶ",
        image: "/images/kaalrekha_hero_collage.jpg",
        link: "/india#republic",
      },
      {
        name: "Modern Odisha & Princely Integration",
        nameOdia: "ଆଧୁନିକ ଓଡ଼ିଶା ଓ ଗଡ଼ଜାତ ମିଶ୍ରଣ",
        tag: "UNITY & PROGRESS",
        tagOdia: "ଏକତା ଓ ବିକାଶ",
        period: "1947 – Present",
        focus: "Harekrushna Mahatab, Sardar Patel, Integration of 26 Princely States, Hirakud Dam & Paradip Port",
        focusOdia: "ହରେକୃଷ୍ଣ ମହତାବ, ୨୬ ଗଡ଼ଜାତ ରାଜ୍ୟର ମିଶ୍ରଣ, ହୀରାକୁଦ ବନ୍ଧ ଓ ପାରାଦ୍ୱୀପ ବନ୍ଦର",
        image: "/images/historian_portrait.jpg",
        link: "/india#post-independence",
      },
      {
        name: "Classical Heritage & Odissi Arts",
        nameOdia: "ଜଗନ୍ନାଥ ସଂସ୍କୃତି ଓ ଶାସ୍ତ୍ରୀୟ ଓଡ଼ିଶୀ କଳା",
        tag: "LIVING TRADITIONS",
        tagOdia: "ଜୀବନ୍ତ ଶାସ୍ତ୍ରୀୟ ଐତିହ୍ୟ",
        period: "Continuous Heritage",
        focus: "UNESCO Heritage Konark, Jagannath Rath Yatra, Classical Odissi Dance, Pattachitra & Odia Language (6th Classical)",
        focusOdia: "ଶ୍ରୀଜଗନ୍ନାଥ ରଥଯାତ୍ରା, ଶାସ୍ତ୍ରୀୟ ଓଡ଼ିଶୀ ନୃତ୍ୟ, ପଟ୍ଟଚିତ୍ର ଓ ଶାସ୍ତ୍ରୀୟ ଓଡ଼ିଆ ଭାଷା",
        image: "/images/rome_colosseum.jpg",
        link: "/india#culture",
      },
    ],
    events: [
      {
        title: "Integration of Odisha Princely States",
        titleOdia: "ଓଡ଼ିଶାରେ ଗଡ଼ଜାତ ରାଜ୍ୟ ମିଶ୍ରଣ ପର୍ବ",
        year: "1947–1949",
        location: "Cuttack & New Delhi",
        desc: "Mayurbhanj, Dhenkanal, Keonjhar, Nilgiri, Talcher, and all princely states formally integrate into Odisha.",
        descOdia: "ମୟୂରଭଞ୍ଜ, ଢେଙ୍କାନାଳ, କେନ୍ଦୁଝର ସମେତ ସମସ୍ତ ଗଡ଼ଜାତ ଓଡ଼ିଶା ସହ ମିଳିତ ହେଲା।",
      },
      {
        title: "Inauguration of the Hirakud Dam on the Mahanadi",
        titleOdia: "ମହାନଦୀରେ ହୀରାକୁଦ ବନ୍ଧର ଉଦ୍‌ଘାଟନ",
        year: "1957",
        location: "Sambalpur, Odisha",
        desc: "Prime Minister Jawaharlal Nehru inaugurates the world's longest earthen dam, transforming the agricultural economy.",
        descOdia: "ପୃଥିବୀର ଦୀର୍ଘତମ ମାଟିବନ୍ଧ ଉଦ୍‌ଘାଟିତ ହୋଇ ବନ୍ୟା ନିୟନ୍ତ୍ରଣ ଓ ବିଦ୍ୟୁତ ଉତ୍ପାଦନ ଆରମ୍ଭ ହେଲା।",
      },
    ],
  },
];

interface CinematicHeroProps {
  onEraChange?: (era: EraData) => void;
  selectedEraIndex?: number;
}

export default function CinematicHero({ onEraChange, selectedEraIndex: externalEraIndex }: CinematicHeroProps) {
  const [internalEraIndex, setInternalEraIndex] = useState(0); // Ancient World by default
  const { language } = useLanguage();
  const isOdia = language === "or";

  // Live Today in History Data State
  const [liveTodayEvents, setLiveTodayEvents] = useState<{ year: string | number; text: string; textOdia?: string }[]>([]);

  useEffect(() => {
    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    fetch(`/api/today-in-history?month=${m}&day=${d}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.events && data.events.length > 0) {
          setLiveTodayEvents(data.events);
        }
      })
      .catch(() => {});
  }, []);

  const selectedEraIndex = externalEraIndex !== undefined ? externalEraIndex : internalEraIndex;
  const currentEra = eraTimelineData[selectedEraIndex];

  const handleSelectEra = (index: number) => {
    setInternalEraIndex(index);
    if (onEraChange) {
      onEraChange(eraTimelineData[index]);
    }
  };

  const handlePrevEra = () => {
    const nextIdx = (selectedEraIndex - 1 + eraTimelineData.length) % eraTimelineData.length;
    handleSelectEra(nextIdx);
  };

  const handleNextEra = () => {
    const nextIdx = (selectedEraIndex + 1) % eraTimelineData.length;
    handleSelectEra(nextIdx);
  };

  // Format today's date
  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const odiaMonths = ["ଜାନୁଆରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଅପ୍ରେଲ", "ମେ", "ଜୁନ୍", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର"];
  const dateStringOdia = `${today.getDate()} ${odiaMonths[today.getMonth()]}`;

  return (
    <section className="relative w-full bg-[#FAF7F2] text-museum-charcoal overflow-hidden pt-28 pb-14 border-b border-museum-stone">
      {/* Delicate Antique Archival Grid Texture */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#8A3324_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* MAIN HERO SPLIT: Left Typography + Right Montage Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clean Editorial Presentation */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-museum-parchment border border-museum-stone text-[11px] font-mono uppercase tracking-[0.2em] text-[#8A3324] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A3324]" />
              <span>{isOdia ? "ଅନୁସନ୍ଧାନ · ଶିକ୍ଷା · ସଂଯୋଗ" : "EXPLORE · LEARN · CONNECT"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-museum-charcoal leading-[1.04]">
              {isOdia ? "ଇତିହାସ ଜୀବନ୍ତ ରହେ" : "HISTORY LIVES IN"}{" "}
              <span className="text-[#8A3324] block sm:inline font-serif italic">
                {isOdia ? "ମଣିଷଙ୍କ ମଧ୍ୟରେ" : "PEOPLE"}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-museum-charcoalLight leading-relaxed max-w-xl">
              {isOdia
                ? "ମାନବ ସଭ୍ୟତାର ଐତିହାସିକ ସମୟରେଖାରେ ପାଦ ଥାପନ୍ତୁ। ପ୍ରାଚୀନ ସମୟରୁ ଆଧୁନିକ ଯୁଗ ପର୍ଯ୍ୟନ୍ତ ଆମ ପୃଥିବୀକୁ ଗଢ଼ିଥିବା ସଭ୍ୟତା, ସାମ୍ରାଜ୍ୟ, ବିଚାରଧାରା ଓ ମହାନ ବ୍ୟକ୍ତିବିଶେଷଙ୍କୁ ଆବିଷ୍କାର କରନ୍ତୁ।"
                : "Step into the timeline of human civilization. Explore civilizations, kingdoms, ideas, and individuals who shaped our world — from ancient roots to the modern age."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#timeline-slider"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#8A3324] hover:bg-[#70291C] text-white font-sans text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm hover:shadow group cursor-pointer"
              >
                <span>{isOdia ? "ସମୟରେଖା ଅନୁସନ୍ଧାନ →" : "Explore the Timeline"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-museum-parchment/80 border border-museum-stone hover:border-[#8A3324] text-museum-charcoal hover:text-[#8A3324] font-sans text-xs font-semibold tracking-wider transition-all duration-300 shadow-2xs"
              >
                <BookOpen className="w-4 h-4 text-[#8A3324]" />
                <span>{isOdia ? "ଗବେଷଣା ଦେଖନ୍ତୁ" : "View Research"}</span>
              </Link>

              <Link
                href="/india"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-museum-parchment/60 border border-museum-stone hover:border-museum-antiqueGold text-museum-charcoal text-xs font-sans font-semibold tracking-wider transition-all duration-300 shadow-2xs"
              >
                <span>{isOdia ? "ଭାରତ ଓ ଓଡ଼ିଶା ଇତିହାସ" : "Indian History (ଓଡ଼ିଆ / हिन्दी)"}</span>
              </Link>
            </div>

            {/* Bottom 3 Stats Bar */}
            <div className="pt-6 border-t border-museum-stone/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-museum-parchment border border-museum-stone flex items-center justify-center text-[#8A3324] shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-museum-charcoal block text-sm">2,500+</span>
                  <span className="text-[11px] text-museum-charcoalLight">{isOdia ? "ଐତିହାସିକ ଆଲେଖ୍ୟ" : "Historical Articles"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-museum-parchment border border-museum-stone flex items-center justify-center text-[#8A3324] shrink-0">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-museum-charcoal block text-sm">{isOdia ? "ବିଶ୍ୱ ସଭ୍ୟତା" : "World Civilizations"}</span>
                  <span className="text-[11px] text-museum-charcoalLight">{isOdia ? "ଗୋଟିଏ ସ୍ଥାନରେ" : "In One Place"}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-museum-parchment border border-museum-stone flex items-center justify-center text-[#8A3324] shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-museum-charcoal block text-sm">{isOdia ? "ଗବେଷକଙ୍କ ପାଇଁ" : "Built for"}</span>
                  <span className="text-[11px] text-museum-charcoalLight">{isOdia ? "ଉତ୍ସୁକ ମନ" : "Curious Minds"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Archival Artwork Montage (Ashoka + Colosseum + Centurion + Taj Mahal) */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-museum-stone shadow-md bg-museum-parchment/40 group">
              <Image
                src="/images/kaalrekha_hero_collage.jpg"
                alt="Ashoka Lion Capital, Roman Colosseum, Roman Centurion and Taj Mahal archival historical montage"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />

              {/* Gentle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-museum-charcoal/40 via-transparent to-transparent pointer-events-none" />

              {/* Top Archival Badge Quote */}
              <div className="absolute top-4 left-4 bg-museum-ivory/95 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-museum-stone/80 text-[10px] font-mono text-museum-charcoal uppercase tracking-wider font-semibold shadow-xs">
                {isOdia ? "ସଭ୍ୟତା ଗଢ଼େ ଉଜ୍ଜ୍ୱଳ ଭବିଷ୍ୟତ" : "CIVILIZATIONS SHAPE A BRIGHTER TOMORROW"}
              </div>

              {/* Bottom Quote Box */}
              <div className="absolute bottom-3 right-3 max-w-xs bg-museum-ivory/95 backdrop-blur-sm p-2.5 rounded-lg border border-museum-stone/80 text-right text-[11px] font-serif italic text-museum-charcoal shadow-xs">
                &ldquo;{isOdia ? "ଅତୀତକୁ ଜାଣିବା ହିଁ ଏକ ଜ୍ଞାନୀ ଭବିଷ୍ୟତ ନିର୍ମାଣ କରିବା।" : "To know the past is to build a wiser future."}&rdquo;
              </div>
            </div>
          </div>

        </div>

        {/* ERA TIMELINE NAVIGATION BAR */}
        <div id="timeline-slider" className="mt-12 pt-8 border-t border-museum-stone/80">
          <div className="flex items-center justify-between gap-2">
            
            {/* Left Chevron Button */}
            <button
              onClick={handlePrevEra}
              className="w-10 h-10 rounded-full bg-museum-parchment border border-museum-stone hover:border-[#8A3324] hover:bg-museum-ivory text-museum-charcoal flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
              aria-label="Previous Era"
            >
              <ChevronLeft className="w-4 h-4 text-museum-charcoal" />
            </button>

            {/* Timeline Era Nodes Bar */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 px-2">
              {eraTimelineData.map((era, index) => {
                const isActive = index === selectedEraIndex;
                return (
                  <button
                    key={era.id}
                    onClick={() => handleSelectEra(index)}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-museum-ivory border-[#8A3324] shadow-sm ring-1 ring-[#8A3324]/20"
                        : "bg-museum-parchment/60 border-museum-stone/70 hover:bg-museum-ivory hover:border-museum-stone"
                    }`}
                  >
                    {/* Top Dot Marker */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`w-2 h-2 rounded-full transition-all ${
                          isActive ? "bg-[#8A3324] scale-125" : "bg-museum-stone"
                        }`}
                      />
                      <span className="text-[9px] font-mono text-museum-charcoalLight uppercase tracking-wider">
                        {isOdia ? era.periodOdia : era.period}
                      </span>
                    </div>

                    {/* Era Title */}
                    <h3
                      className={`font-serif text-xs sm:text-sm font-bold truncate transition-colors ${
                        isActive ? "text-[#8A3324]" : "text-museum-charcoal"
                      }`}
                    >
                      {isOdia ? era.nameOdia : era.name}
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={handleNextEra}
              className="w-10 h-10 rounded-full bg-museum-parchment border border-museum-stone hover:border-[#8A3324] hover:bg-museum-ivory text-museum-charcoal flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
              aria-label="Next Era"
            >
              <ChevronRight className="w-4 h-4 text-museum-charcoal" />
            </button>

          </div>
        </div>

        {/* TWO BOTTOM FEATURE CARDS (Events & Today in History) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Card: Iconic Events */}
          <div className="lg:col-span-7 bg-museum-parchment/60 rounded-2xl border border-museum-stone p-6 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-museum-stone/70 mb-4">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#8A3324] uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#8A3324]" />
                <span>
                  {isOdia
                    ? "ବିଶ୍ୱକୁ ରୂପ ଦେଇଥିବା ପ୍ରମୁଖ ଐତିହାସିକ ଘଟଣାବଳୀ"
                    : "EXPLORE ICONIC EVENTS THAT SHAPED OUR WORLD"}
                </span>
              </div>
              <Link
                href="/india#timeline"
                className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#8A3324] hover:underline"
              >
                <span>{isOdia ? "ଅଧିକ ଦେଖନ୍ତୁ" : "VIEW MORE"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Events List in Active Era */}
            <div className="space-y-3">
              {currentEra.events.slice(0, 2).map((ev, idx) => (
                <div
                  key={idx}
                  className="bg-museum-ivory p-3.5 rounded-xl border border-museum-stone/80 flex items-start gap-3.5 shadow-2xs hover:border-[#8A3324] transition-colors"
                >
                  <div className="px-2.5 py-1 rounded bg-[#8A3324]/10 border border-[#8A3324]/20 text-[#8A3324] font-mono text-[10px] font-bold shrink-0 mt-0.5">
                    {ev.year}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-museum-charcoal">
                      {isOdia ? ev.titleOdia : ev.title}
                    </h4>
                    <p className="text-xs text-museum-charcoalLight font-sans mt-0.5 line-clamp-2">
                      {isOdia ? ev.descOdia : ev.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: Today in History Live Stream */}
          <div className="lg:col-span-5 bg-museum-parchment/60 rounded-2xl border border-museum-stone p-6 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8A3324] uppercase tracking-wider font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isOdia ? "ଆଜିର ଇତିହାସ" : "Today in History"}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8A3324]/10 text-[#8A3324] border border-[#8A3324]/20 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 animate-spin-slow" />
                  <span>{isOdia ? "ଲାଇଭ୍ ତାରିଖ ଅପଡେଟ୍" : "Live Date Sync"}</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-museum-charcoal flex items-baseline gap-2">
                <span>{isOdia ? dateStringOdia : dateString}</span>
              </h3>

              {/* Dynamic Historical Occurrences list date-wise with year */}
              <div className="mt-3 space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                {liveTodayEvents.length > 0 ? (
                  liveTodayEvents.slice(0, 4).map((ev, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-museum-ivory/80 border border-museum-stone/70 flex items-start gap-2.5 hover:border-[#8A3324]/50 transition-colors"
                    >
                      <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-[#8A3324] text-white shrink-0">
                        {ev.year}
                      </span>
                      <p className="text-xs font-sans text-museum-charcoal line-clamp-2 leading-snug">
                        {isOdia && ev.textOdia ? ev.textOdia : ev.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-sans text-xs text-museum-charcoalLight italic py-2">
                    {isOdia
                      ? "ଆଜିର ତାରିଖରେ ଘଟିଥିବା ଐତିହାସିକ ଘଟଣାବଳୀ ଲୋଡ୍ ହେଉଛି..."
                      : "Loading historical occurrences for today..."}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-museum-stone/70 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-mono text-museum-charcoalLight">
                <Landmark className="w-3.5 h-3.5 text-[#8A3324]" />
                <span>{isOdia ? `ସମୁଦାୟ ${liveTodayEvents.length} ଘଟଣା ଉପଲବ୍ଧ` : `${liveTodayEvents.length} events on this day`}</span>
              </div>

              <Link
                href="/india#timeline"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#8A3324] hover:bg-museum-mutedRed text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs group"
              >
                <span>{isOdia ? "ସମ୍ପୂର୍ଣ୍ଣ ଦେଖନ୍ତୁ" : "View Full Timeline"}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
