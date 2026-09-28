import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "s95p658g",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // fine for a static-export build; content is baked in at build time
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
