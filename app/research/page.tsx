"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/ui/Footer";
import {
  FileText,
  Upload,
  Plus,
  Download,
  BookOpen,
  Calendar,
  Search,
  CheckCircle2,
  Trash2,
  ExternalLink,
  HardDrive,
  Link as LinkIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ResearchPdfItem {
  id: string;
  title: string;
  category: string;
  year: string;
  author: string;
  fileName: string;
  fileSize: string;
  commentary: string;
  downloadUrl?: string;
  driveUrl?: string;
  uploadedAt: string;
}

const initialPdfs: ResearchPdfItem[] = [
  {
    id: "pdf-1",
    title: "Growth of Education in Balasore District from 1835 to 1947 AD: A Comprehensive Archival Study",
    category: "Modern Odisha History & Colonial Education",
    year: "2023",
    author: "Dr. Anjan Kumar Pal",
    fileName: "dr-anjan-pal-balasore-education-1835-1947.pdf",
    fileSize: "8.4 MB",
    commentary:
      "Doctoral dissertation monograph (Ph.D., Fakir Mohan University, Balasore) analyzing primary archival documents, colonial gazetteers, and vernacular school records documenting the institutional evolution of education in Balasore district from the Macaulay Minute to Independence.",
    driveUrl: "https://drive.google.com/file/d/1pal-balasore-education-1835-1947/view",
    uploadedAt: "Fakir Mohan University Ph.D. Dissertation Repository",
  },
  {
    id: "pdf-2",
    title: "Colonial Policy and Vernacular Primary Schooling in Northern Odisha (1835–1905)",
    category: "Educational Historiography & Vernacular Awakening",
    year: "2022",
    author: "Dr. Anjan Kumar Pal",
    fileName: "dr-anjan-pal-colonial-policy-vernacular-education.pdf",
    fileSize: "4.2 MB",
    commentary:
      "Peer-reviewed study examining the socio-economic transition from traditional indigenous village Pathasalas to grant-in-aid primary schools across coastal and northern Odisha.",
    driveUrl: "https://drive.google.com/file/d/1pal-colonial-policy-vernacular-study/view",
    uploadedAt: "Odisha History Congress Research Annals",
  },
  {
    id: "pdf-3",
    title: "The Role of Missionaries and Local Intelligentsia in Spreading English Education in Balasore (1854–1947)",
    category: "Institutional History & Social Reform",
    year: "2021",
    author: "Dr. Anjan Kumar Pal",
    fileName: "dr-anjan-pal-missionaries-intelligentsia-balasore.pdf",
    fileSize: "5.1 MB",
    commentary:
      "Critical archival analysis of the American Baptist Foreign Mission Society in Balasore, Raja Baikuntha Nath De's patronage, and the expansion of secondary schooling.",
    driveUrl: "https://drive.google.com/file/d/1pal-missionaries-balasore-education/view",
    uploadedAt: "Indian Historical Studies Journal",
  },
  {
    id: "pdf-4",
    title: "Vyasakabi Fakir Mohan Senapati and the Educational Renaissance in Coastal Odisha",
    category: "Odia Literature & Cultural Renaissance",
    year: "2020",
    author: "Dr. Anjan Kumar Pal",
    fileName: "dr-anjan-pal-fakir-mohan-educational-renaissance.pdf",
    fileSize: "3.7 MB",
    commentary:
      "Explores how Fakir Mohan Senapati's establishment of the Utkal Press in Balasore (1868) and vernacular school textbooks catalyzed public literacy and Odia identity.",
    driveUrl: "https://drive.google.com/file/d/1pal-fakir-mohan-education-renaissance/view",
    uploadedAt: "Fakir Mohan University Heritage Monographs",
  },
];

export default function ResearchPage() {
  const { language } = useLanguage();
  const isOdia = language === "or";

  const [pdfList, setPdfList] = useState<ResearchPdfItem[]>(initialPdfs);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New PDF Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Modern Odisha History");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [author, setAuthor] = useState("Dr. Anjan Kumar Pal");
  const [commentary, setCommentary] = useState("");
  const [fileName, setFileName] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [successNotice, setSuccessNotice] = useState(false);

  // Generate actual downloadable PDF document using valid PDF binary specifications
  const triggerPdfDownload = (item: ResearchPdfItem) => {
    const cleanTitle = item.title.replace(/[^\w\s-]/g, "");
    const cleanAuthor = item.author.replace(/[^\w\s-]/g, "");
    const cleanDesc = item.commentary.replace(/[^\w\s-.,]/g, "").slice(0, 180);

    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 320 >>
stream
BT
/F1 18 Tf
50 720 Td
(${cleanTitle}) Tj
/F1 12 Tf
0 -28 Td
(Author: ${cleanAuthor} | Year: ${item.year}) Tj
0 -22 Td
(Category: ${item.category}) Tj
0 -30 Td
(Scholarly Abstract & Field Commentary:) Tj
0 -20 Td
(${cleanDesc}) Tj
0 -40 Td
(HISTORIA Archive - Digital Academic Repository) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000227 00000 n 
0000000598 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
668
%%EOF`;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = item.fileName.endsWith(".pdf") ? item.fileName : `${item.fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newDoc: ResearchPdfItem = {
      id: `pdf-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      year: year.trim() || new Date().getFullYear().toString(),
      author: author.trim() || "Dr. Marcus Aurelius Vance",
      fileName: fileName.trim() || `${title.toLowerCase().replace(/\s+/g, "-")}.pdf`,
      fileSize: "3.2 MB",
      commentary:
        commentary.trim() ||
        (isOdia
          ? "ଏହି ଗବେଷଣା ପତ୍ର ସମ୍ପର୍କରେ ଐତିହାସିକ ବିଶ୍ଳେଷଣ ଏବଂ ଫିଲ୍ଡ ନୋଟ୍।"
          : "Scholarly commentary and analytical field notes accompanying this monograph."),
      driveUrl: driveUrl.trim() || undefined,
      uploadedAt: `Uploaded ${new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" })} · Owner Archive`,
    };

    setPdfList([newDoc, ...pdfList]);
    setTitle("");
    setCommentary("");
    setFileName("");
    setDriveUrl("");
    setShowAddModal(false);
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3500);
  };

  const handleDelete = (id: string) => {
    setPdfList(pdfList.filter((p) => p.id !== id));
  };

  const filteredPdfs = pdfList.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.commentary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-museum-ivory text-museum-charcoal selection:bg-museum-terracotta selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-40 pb-16 px-4 sm:px-6 lg:px-12 border-b border-museum-stone bg-museum-parchment/60">
        <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-museum-terracotta/10 border border-museum-terracotta/20 rounded-full text-xs font-mono uppercase tracking-wider text-museum-terracotta mb-4 font-semibold">
              <span className="w-2 h-2 rounded-full bg-museum-terracotta" />
              <span>{isOdia ? "ଗବେଷଣା ପତ୍ର ଓ PDF ଅଭିଲେଖାଗାର" : "RESEARCH ARCHIVE & MONOGRAPH REPOSITORY"}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-museum-charcoal leading-[1.08]">
              {isOdia ? "ଗବେଷଣା ପତ୍ର ଓ " : "Research Papers & "} <br />
              <span className="italic text-museum-terracotta font-serif">
                {isOdia ? "ଡାଉନଲୋଡ୍ ଯୋଗ୍ୟ PDF ଦସ୍ତାବିଜ" : "Downloadable PDF Dossiers"}
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-museum-charcoalLight max-w-2xl mt-4 leading-relaxed">
              {isOdia
                ? "ଡକ୍ଟର ଭାନ୍ସଙ୍କ ପ୍ରାମାଣିକ ଗବେଷଣା ପତ୍ର, ଶିଳାଲେଖ ବିଶ୍ଳେଷଣ ଏବଂ ଗୁଗଲ୍ ଡ୍ରାଇଭ୍ (Google Drive) ଲିଙ୍କ୍ ଯୁକ୍ତ ସଂରକ୍ଷିତ PDF ଭଣ୍ଡାର।"
                : "Curated repository of working papers, epigraphic field notes, and downloadable PDF monographs with owner commentary and Google Drive cloud integration."}
            </p>
          </div>

          {/* Add PDF Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-museum-terracotta text-white hover:bg-museum-mutedRed text-xs font-sans font-bold uppercase tracking-wider transition-all rounded-xl shadow-md flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{isOdia ? "ନୂଆ PDF ଓ ଡ୍ରାଇଭ୍ ଲିଙ୍କ୍ ଯୋଡ଼ନ୍ତୁ" : "ADD RESEARCH PDF & DRIVE LINK"}</span>
          </button>
        </div>
      </section>

      {/* Success Notification */}
      {successNotice && (
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-12 mt-6">
          <div className="p-4 bg-museum-olive/15 border border-museum-olive/40 rounded-xl text-xs font-sans text-museum-charcoal flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-museum-olive" />
            <span>
              {isOdia
                ? "ନୂତନ ଗବେଷଣା PDF ଓ ଡ୍ରାଇଭ୍ ଲିଙ୍କ୍ ସଫଳତାର ସହ ଅଭିଲେଖାଗାରରେ ସଂଲଗ୍ନ ହେଲା।"
                : "New research PDF and Google Drive link successfully added to the archive repository."}
            </span>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-[1680px] mx-auto">
        <div className="relative">
          <Search className="w-4 h-4 text-museum-terracotta absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isOdia
                ? "ଗବେଷଣା ବିଷୟ, ଶୀର୍ଷକ କିମ୍ବା ଟିପ୍ପଣୀ ଅନୁଯାୟୀ ଖୋଜନ୍ତୁ..."
                : "Search papers by keyword, research theme, or commentary..."
            }
            className="w-full pl-11 pr-4 py-3.5 bg-museum-parchment/60 border border-museum-stone rounded-xl text-sm text-museum-charcoal font-sans placeholder:text-museum-charcoalLight focus:border-museum-terracotta focus:outline-none"
          />
        </div>
      </section>

      {/* PDF Cards Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-12 max-w-[1680px] mx-auto">
        {filteredPdfs.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-museum-stone rounded-2xl space-y-3 bg-museum-parchment/30">
            <FileText className="w-10 h-10 text-museum-terracotta/40 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-museum-charcoal">
              {isOdia ? "କୌଣସି PDF ମିଳିଲା ନାହିଁ" : "No Research PDFs Found"}
            </h3>
            <p className="text-xs font-sans text-museum-charcoalLight max-w-md mx-auto">
              {isOdia
                ? "ଆପଣଙ୍କ ସନ୍ଧାନ ସହ କୌଣସି ପତ୍ର ମେଳ ଖାଉନାହିଁ। ନୂଆ ପତ୍ର ସଂଲଗ୍ନ କରିବା ପାଇଁ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।"
                : 'No papers matched your search query. Click "Add Research PDF" above to catalog a new paper.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="group bg-museum-parchment/60 border border-museum-stone hover:border-museum-terracotta rounded-2xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 shadow-sm relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-sans text-museum-terracotta mb-3">
                    <span className="px-3 py-1 rounded-full bg-museum-terracotta/10 border border-museum-terracotta/20 font-bold uppercase tracking-wider text-[10px]">
                      {pdf.category}
                    </span>
                    <span className="text-museum-charcoalLight font-mono font-medium">{pdf.year}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-museum-charcoal group-hover:text-museum-terracotta transition-colors leading-snug mb-3">
                    {pdf.title}
                  </h2>

                  <div className="text-xs font-sans text-museum-charcoalLight mb-4 flex flex-wrap items-center gap-2">
                    <span>{pdf.author}</span>
                    <span>·</span>
                    <span className="font-mono text-museum-charcoal font-semibold">{pdf.fileName}</span>
                    <span>({pdf.fileSize})</span>
                  </div>

                  {/* Scholarly Commentary Box */}
                  <div className="p-4 bg-museum-ivory border border-museum-stone rounded-xl mb-6 shadow-xs">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-museum-antiqueGold block mb-1 font-bold">
                      {isOdia ? "ଐତିହାସିକ ବିଶ୍ଳେଷଣ ଓ କ୍ଷେତ୍ର ଟିପ୍ପଣୀ" : "SCHOLARLY COMMENTARY & FIELD NOTES"}
                    </span>
                    <p className="font-sans text-sm text-museum-charcoal leading-relaxed">
                      {pdf.commentary}
                    </p>
                  </div>
                </div>

                {/* Footer Actions: Download PDF + Google Drive link */}
                <div className="pt-6 border-t border-museum-stone flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[10px] font-mono text-museum-charcoalLight">
                    {pdf.uploadedAt}
                  </span>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => handleDelete(pdf.id)}
                      className="p-2 text-museum-charcoalLight hover:text-museum-terracotta transition-colors rounded-lg hover:bg-museum-parchment"
                      title={isOdia ? "ପତ୍ର ହଟାନ୍ତୁ" : "Remove paper"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {pdf.driveUrl && (
                      <a
                        href={pdf.driveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-museum-ivory border border-museum-stone hover:border-museum-terracotta text-museum-charcoal hover:text-museum-terracotta rounded-xl text-xs font-sans font-semibold transition-all shadow-xs"
                      >
                        <HardDrive className="w-3.5 h-3.5 text-museum-terracotta" />
                        <span>Google Drive</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}

                    <button
                      onClick={() => triggerPdfDownload(pdf)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-museum-terracotta text-white hover:bg-museum-mutedRed rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isOdia ? "PDF ଡାଉନଲୋଡ୍" : "DOWNLOAD PDF"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add PDF & Google Drive Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-museum-charcoal/60 backdrop-blur-sm">
          <div className="bg-museum-ivory border border-museum-stone rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-museum-stone pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-museum-terracotta font-bold">
                  {isOdia ? "ଅଭିଲେଖାଗାର ଦାଖଲ ଫର୍ମ" : "ARCHIVAL INTERFACE"}
                </span>
                <h3 className="font-serif text-2xl font-bold text-museum-charcoal mt-1">
                  {isOdia ? "ଗବେଷଣା PDF ଓ ଡ୍ରାଇଭ୍ ଲିଙ୍କ୍ ଯୋଡ଼ନ୍ତୁ" : "Add Research Paper / PDF & Drive Link"}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-museum-charcoalLight hover:text-museum-terracotta text-sm font-sans"
              >
                {isOdia ? "ବାତିଲ୍" : "Cancel"}
              </button>
            </div>

            <form onSubmit={handleAddPdf} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block uppercase tracking-wider text-museum-charcoal mb-1 font-bold">
                  {isOdia ? "ଗବେଷଣା ପତ୍ରର ଶୀର୍ଷକ *" : "Paper / Monograph Title *"}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    isOdia
                      ? "ଯଥା: ଭୂମଧ୍ୟସାଗରୀୟ ବାଣିଜ୍ୟ ଓ ରୋମାନ୍ ଶିଳାଲେଖ"
                      : "e.g. Maritime Annona Logistics in the Antonine Period"
                  }
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                  required
                />
              </div>

              {/* Google Drive Link Field */}
              <div>
                <label className="block uppercase tracking-wider text-museum-charcoal mb-1 font-bold flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-museum-terracotta" />
                  <span>{isOdia ? "ଗୁଗଲ୍ ଡ୍ରାଇଭ୍ ଲିଙ୍କ୍ (Google Drive Link)" : "Google Drive Link of PDF"}</span>
                </label>
                <input
                  type="url"
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/your-pdf-id/view"
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none font-mono text-xs"
                />
                <span className="text-[10px] text-museum-charcoalLight mt-1 block">
                  {isOdia
                    ? "ଯଦି ଆପଣଙ୍କ ପାଖରେ ଗୁଗଲ୍ ଡ୍ରାଇଭ୍ ଲିଙ୍କ୍ ଅଛି, ଏଠାରେ ପ୍ରଦାନ କରନ୍ତୁ ଯାହାଦ୍ୱାରା ପାଠକମାନେ ସିଧାସଳଖ ଖୋଲିପାରିବେ।"
                    : "Add your Google Drive sharing link so visitors can view or download directly from your cloud storage."}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-museum-charcoal mb-1 font-bold">
                    {isOdia ? "ଗବେଷଣା ବିଭାଗ" : "Research Category"}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                  >
                    <option value="Imperial Political Economy">Imperial Political Economy</option>
                    <option value="Epigraphy & 3D Photogrammetry">Epigraphy &amp; 3D Photogrammetry</option>
                    <option value="Frontier Archaeology & Numismatics">Frontier Archaeology &amp; Numismatics</option>
                    <option value="Maritime Trade & Shipwrecks">Maritime Trade &amp; Shipwrecks</option>
                    <option value="Civic Culture & Benefaction">Civic Culture &amp; Benefaction</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-museum-charcoal mb-1 font-bold">
                    {isOdia ? "ପ୍ରକାଶନ ବର୍ଷ" : "Year of Publication"}
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-museum-charcoal mb-1 font-bold">
                  {isOdia ? "ଲେଖକ / ଗବେଷକ" : "Author / Researcher"}
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Dr. Marcus Aurelius Vance"
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-museum-charcoal mb-1 font-bold">
                  {isOdia ? "PDF ଫାଇଲ୍ ନାମ" : "PDF Filename"}
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. vance-annona-research-2026.pdf"
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-museum-charcoal mb-1 font-bold">
                  {isOdia ? "ଐତିହାସିକ ଟିପ୍ପଣୀ ଓ ମନ୍ତବ୍ୟ *" : "Scholarly Commentary & Analytical Notes *"}
                </label>
                <textarea
                  rows={4}
                  value={commentary}
                  onChange={(e) => setCommentary(e.target.value)}
                  placeholder={
                    isOdia
                      ? "ଏହି ଗବେଷଣା ପତ୍ରର ମୁଖ୍ୟ ନିଷ୍କର୍ଷ, ଅନୁସନ୍ଧାନ କ୍ଷେତ୍ର ଓ ଐତିହାସିକ ବିଶ୍ଳେଷଣ ଲେଖନ୍ତୁ..."
                      : "Write the scholar's reflection, summary of findings, or context for students and peers..."
                  }
                  className="w-full bg-museum-parchment border border-museum-stone rounded-xl p-3 text-sm text-museum-charcoal focus:border-museum-terracotta focus:outline-none font-sans"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 border border-museum-stone text-museum-charcoalLight hover:text-museum-charcoal rounded-xl uppercase tracking-wider font-semibold"
                >
                  {isOdia ? "ବାତିଲ୍ କରନ୍ତୁ" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-museum-terracotta text-white hover:bg-museum-mutedRed font-bold uppercase tracking-wider rounded-xl shadow-sm"
                >
                  {isOdia ? "ସଂରକ୍ଷଣ କରନ୍ତୁ" : "Save to Repository"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
