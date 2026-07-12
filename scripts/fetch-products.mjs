// Fetches the published Google Sheet CSV and converts it into lib/products.json
// Run this before `next build` (see package.json "prebuild" script).
//
// SETUP (one-time, in Google Sheets):
// 1. File -> Share -> Publish to web
// 2. Choose the "Product Inventory" sheet/tab specifically (not "Entire Document")
// 3. Choose format: CSV
// 4. Click Publish, copy the URL it gives you
// 5. Paste that URL below as SHEET_CSV_URL, or set it as an env var / GitHub secret
//    named PRODUCTS_SHEET_URL and it will be used automatically instead.

const SHEET_CSV_URL =
  process.env.PRODUCTS_SHEET_URL ||
  "PASTE_YOUR_PUBLISHED_CSV_URL_HERE";

import { writeFile } from "node:fs/promises";

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        cur += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(cur);
        cur = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
      } else {
        cur += c;
      }
    }
  }
  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  if (SHEET_CSV_URL.includes("PASTE_YOUR")) {
    console.warn(
      "[fetch-products] No PRODUCTS_SHEET_URL set — keeping existing lib/products.json as-is."
    );
    return;
  }

  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet CSV: ${res.status} ${res.statusText}`);
  }
  const csv = await res.text();
  const rows = parseCSV(csv);

  // Expects header row matching your Product Inventory sheet columns.
  const header = rows[0].map((h) => h.trim());
  const idx = (name) => header.indexOf(name);

  const iId = idx("Product ID");
  const iNameEn = idx("Product Name (EN)");
  const iNameHi = idx("Product Name (HI)");
  const iCategory = idx("Category");
  const iPrice = idx("Price (INR)");
  const iAmazon = idx("Amazon Affiliate Link");
  const iFlipkart = idx("Flipkart/Myntra Link (EarnKaro)");
  const iPros = idx("Pros (short)");
  const iCons = idx("Cons (short)");
  const iTagline = idx("Notes"); // optional fallback

  const products = rows
    .slice(1)
    .filter((r) => r[iNameEn] && r[iNameEn].trim())
    .map((r) => {
      const nameEn = r[iNameEn].trim();
      return {
        id: r[iId]?.trim() || slugify(nameEn),
        slug: slugify(nameEn),
        nameEn,
        nameHi: r[iNameHi]?.trim() || "",
        category: r[iCategory]?.trim() || "Kitchen",
        price: Number(String(r[iPrice] || "0").replace(/[^0-9.]/g, "")) || 0,
        rating: 4.5,
        tagline: r[iTagline]?.trim() || "",
        pros: (r[iPros] || "").split(";").map((s) => s.trim()).filter(Boolean),
        cons: (r[iCons] || "").split(";").map((s) => s.trim()).filter(Boolean),
        amazonLink: r[iAmazon]?.trim() || "#",
        flipkartLink: r[iFlipkart]?.trim() || undefined,
      };
    });

  await writeFile(
    new URL("../lib/products.generated.json", import.meta.url),
    JSON.stringify(products, null, 2)
  );
  console.log(`[fetch-products] Wrote ${products.length} products.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
