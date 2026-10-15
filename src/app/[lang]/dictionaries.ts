import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";

const dictionaries = {
  en: () =>
    import("./dictionaries/en.json").then((module) => module.default),
  de: () =>
    import("./dictionaries/de.json").then((module) => module.default),
};

export { hasLocale, locales, defaultLocale, type Locale } from "@/lib/i18n";

export const getDictionary = async (locale: Locale) => {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
};
