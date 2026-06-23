// Client-only PDF text extractor using pdfjs-dist
// Must only be imported inside browser event handlers / useEffect.

export async function extractPdfText(file: File): Promise<string> {
  // Dynamic import keeps pdfjs out of SSR bundle
  const pdfjs = await import("pdfjs-dist");
  // @ts-ignore - vite ?url import for the pdf.js worker
  const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

  const buf = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buf }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: unknown) => {
        const it = item as { str?: string };
        return it.str ?? "";
      })
      .join(" ");
    pages.push(text);
  }
  return pages.join("\n\n").replace(/\s+/g, " ").trim();
}
