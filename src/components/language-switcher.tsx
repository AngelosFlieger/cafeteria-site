import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLang: Locale;
  label: string;
  names: Record<Locale, string>;
};

export function LanguageSwitcher({
  currentLang,
  label,
  names,
}: LanguageSwitcherProps) {
  return (
    <nav aria-label={label} className="flex items-center gap-3 text-sm">
      <span className="text-zinc-500 dark:text-zinc-400">{label}:</span>
      <ul className="flex items-center gap-2">
        {locales.map((locale) => {
          const isActive = locale === currentLang;
          return (
            <li key={locale}>
              <Link
                href={`/${locale}`}
                hrefLang={locale}
                lang={locale}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "font-semibold text-zinc-950 dark:text-zinc-50"
                    : "text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                }
              >
                {names[locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
