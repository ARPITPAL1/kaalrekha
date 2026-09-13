const fs = require("fs");
const path = require("path");

const rawList = [
  "Paleolithic Age", "Mesolithic Age", "Neolithic Age", "Chalcolithic Age", "Megalithic Culture",
  "Harappa", "Mohenjo-daro", "Dholavira", "Lothal", "Kalibangan",
  "Rakhigarhi", "Society & Culture (IVC)", "Economy & Trade (IVC)", "Religion (IVC)", "Art & Architecture (IVC)", "Decline (IVC)",
  "Early Vedic Age", "Later Vedic Age", "Vedic Literature", "Vedic Society", "Vedic Economy", "Vedic Religion & Philosophy", "Political Organization (Vedic)",
  "Sixteen Mahajanapadas", "Magadha", "Jainism", "Buddhism", "Ajivikas", "Other Sramana Traditions",
  "Chandragupta Maurya", "Bindusara", "Ashoka", "Kalinga War", "Mauryan Administration", "Mauryan Economy", "Mauryan Art & Architecture", "Mauryan Decline",
  "Shunga Dynasty", "Kanva Dynasty", "Indo-Greeks", "Shakas", "Parthians", "Kushanas", "Satavahanas", "Sangam Age",
  "Chandragupta I", "Samudragupta", "Chandragupta II", "Gupta Administration", "Science & Mathematics (Gupta)", "Literature (Gupta)", "Art & Architecture (Gupta)", "Religion (Gupta)", "Gupta Decline",
  "Vakatakas", "Pallavas", "Chalukyas", "Rashtrakutas", "Palas", "Pratiharas", "Cholas", "Cheras", "Pandyas", "Rajput Kingdoms",
  "Slave/Mamluk Dynasty", "Khilji Dynasty", "Tughlaq Dynasty", "Sayyid Dynasty", "Lodi Dynasty", "Delhi Sultanate Administration", "Delhi Sultanate Military", "Delhi Sultanate Economy", "Sultanate Architecture", "Sultanate Society & Culture",
  "Vijayanagara Empire", "Bahmani Sultanate", "Deccan Sultanates", "Bengal Sultanate", "Gujarat Sultanate", "Mewar", "Ahom Kingdom", "Kashmir", "Odisha Kingdoms",
  "Babur", "Humayun", "Akbar", "Jahangir", "Shah Jahan", "Aurangzeb", "Mughal Administration", "Mansabdari System", "Mughal Economy", "Mughal Art & Architecture", "Mughal Literature", "Mughal Religion", "Mughal Decline",
  "Shivaji", "Swarajya", "Maratha Administration", "Peshwas", "Maratha Confederacy", "Anglo-Maratha Wars", "Maratha Decline",
  "Guru Nanak", "Sikh Gurus", "Guru Arjan", "Guru Gobind Singh", "Khalsa", "Maharaja Ranjit Singh", "Sikh Empire", "Anglo-Sikh Wars",
  "Portuguese", "Dutch", "English", "French", "Danish", "European Trading Companies",
  "Carnatic Wars", "Battle of Plassey", "Battle of Buxar", "Subsidiary Alliance", "Doctrine of Lapse", "Anglo-Mysore Wars", "British Territorial Expansion",
  "East India Company", "Governor-Generals", "Land Revenue Systems", "Permanent Settlement", "Ryotwari System", "Mahalwari System", "Economic Policies (British)", "Drain of Wealth", "Education Policies (British)", "Judicial System (British)",
  "Tribal Revolts", "Peasant Movements", "Sanyasi-Fakir Rebellion", "Santhal Rebellion", "Munda Rebellion", "Indigo Revolt", "Deccan Riots",
  "Revolt of 1857", "Formation of INC", "Moderates", "Extremists", "Swadeshi Movement", "Home Rule Movement", "Revolutionary Movement",
  "Gandhian Era", "Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement", "INA", "Cabinet Mission",
  "Champaran", "Kheda", "Ahmedabad Mill Strike", "Rowlatt Act", "Jallianwala Bagh", "Dandi March", "Salt Satyagraha", "Government of India Acts", "Simon Commission", "Round Table Conferences", "Cripps Mission", "Mountbatten Plan", "Partition",
  "Independence — 1947", "Integration of Princely States", "Constitution", "Republic — 1950", "Linguistic Reorganization", "Five-Year Plans", "Green Revolution",
  "Indo-Pak War 1947-48", "Sino-Indian War 1962", "Indo-Pak War 1965", "Bangladesh Liberation War 1971", "Emergency", "Economic Liberalization — 1991", "Contemporary India",
  "Indian Art & Architecture", "Indian Literature", "Indian Religions & Philosophy", "Science & Technology in Ancient India", "Indian Coins & Numismatics", "Inscriptions & Epigraphy", "Indian Languages & Scripts", "Trade & Maritime History", "Military History", "Social & Cultural History", "Economic History", "Women in Indian History", "Tribal History", "History of Indian States & Regions", "Important Historical Personalities", "Important Battles", "Historical Places & Monuments", "Maps & Historical Geography", "Timelines", "Primary Sources & Archaeological Evidence"
];

console.log("Total items:", rawList.length);
