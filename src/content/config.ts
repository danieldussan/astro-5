import type { Cocktail, Country } from "@/lib/types/collections";
import { defineCollection, z } from "astro:content";

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

const cocktails = defineCollection({
  loader: async () => {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=cocktail",
    );
    const data = await response.json();
    return data.drinks.map((cocktail: Cocktail) => ({
      id: cocktail.idDrink,
      name: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().url(),
  }),
});

export const collections = { books, countries, cocktails };
