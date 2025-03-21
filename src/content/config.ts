import { defineCollection, z } from "astro:content";
import type { Country } from "@/lib/types/countries";

const books = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    img: z.string(),
    readtime: z.number(),
    description: z.string(),
    buy: z.object({
      spain: z.string().url(),
      usa: z.string().url(),
    }),
  }),
});

const countries = defineCollection({
  loader: async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data.map((country: Country) => ({
      id: country.cca3,
      name: country.name.common,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const collections = { books, countries };
