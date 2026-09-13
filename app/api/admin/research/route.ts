import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, validateSession, isUserAdmin } from "@/lib/auth";
import { publications, Publication } from "@/data/publications";

// Memory store for custom research published by Admin in session/dev
declare global {
  // eslint-disable-next-line no-var
  var __historia_custom_publications: Publication[] | undefined;
}

const customPubs = global.__historia_custom_publications ?? [];
if (process.env.NODE_ENV !== "production") {
  global.__historia_custom_publications = customPubs;
}

export async function GET() {
  const allPubs = [...customPubs, ...publications];
  return NextResponse.json({
    success: true,
    count: allPubs.length,
    publications: allPubs,
  });
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = validateSession(sessionId);

    if (!session || !isUserAdmin(session.email)) {
      return NextResponse.json(
        { error: "Access restricted. Only Dr. Anjan Kumar Pal can publish research." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, year, type, publisher, description, abstract, researchQuestion, relatedThemes } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are mandatory." }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `research-${Date.now()}`;

    const newPub: Publication = {
      slug,
      title: title.trim(),
      year: year || new Date().getFullYear().toString(),
      type: (type as Publication["type"]) || "ARTICLE",
      publisher: publisher || "KAALREKHA Academic Press",
      description: description.trim(),
      abstract: abstract || description.trim(),
      researchQuestion: researchQuestion || "Historical and archival investigation.",
      keyArguments: body.keyArguments || [description.slice(0, 100)],
      citationBibtex: `@article{pal${year || 2026}, author = {Dr. Anjan Kumar Pal}, title = {${title}}, year = {${year || 2026}}}`,
      relatedThemes: relatedThemes || ["ODISHA MARITIME", "HISTORICAL ARCHIVES", "INSCRIPTIONS"],
      featured: true,
    };

    customPubs.unshift(newPub);

    return NextResponse.json({
      success: true,
      message: "Research successfully published to KAALREKHA archive.",
      publication: newPub,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
