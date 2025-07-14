import fs from "fs/promises";
import countries from "i18n-iso-countries";
import { getCountryCallingCode } from "libphonenumber-js";
import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);
const enLocale = require("i18n-iso-countries/langs/en.json");

countries.registerLocale(enLocale);

function getEmojiFlag(code) {
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65),
    );
}

const countryData = Object.entries(countries.getNames("en"))
  .map(([code, name]) => {
    try {
      const dialCode = getCountryCallingCode(code);
      const flag = getEmojiFlag(code);
      return {
        name,
        flag,
        code,
        dial_code: `+${dialCode}`,
      };
    } catch {
      return null;
    }
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

const countryNames = countryData
  .map((country) => JSON.stringify(country.name))
  .sort()
  .join(" | ");

const countryFlags = countryData
  .map((country) => JSON.stringify(country.flag))
  .sort()
  .join(" | ");

const countryDialCodes = [
  ...new Set(countryData.map((country) => `"${country.dial_code}"`)),
]
  .sort()
  .join(" | ");

const typeDefinitions = `
// ⚠️ This file is auto-generated. Do not edit manually.
// Run the country generation script to regenerate.

import { CountryCode } from "libphonenumber-js";

export interface CountryInfo {
  name: CountryName;
  flag: CountryFlag;
  code: CountryCode;
  dial_code: CountryDialCode;
}

export type CountryName = ${countryNames};
export type CountryFlag = ${countryFlags};
export type CountryDialCode = ${countryDialCodes};


`;

const dataExport = `
export const EAST_AFRICA_COUNTRY_CODES: CountryCode[] = ["KE", "UG", "TZ", "RW", "BI"];
export const ALL_COUNTRIES = ${JSON.stringify(countryData, null, 2)} as const satisfies CountryInfo[];\n`;
const fulloutput = typeDefinitions + dataExport + "\n";

const outputDir = "./src/lib";
const outputPath = path.join(outputDir, "generated-countries.ts");

await fs.rm(outputPath, { force: true }).catch(() => {});
await fs.mkdir(outputDir, { recursive: true }); // ✅ Ensure 'lib' folder exists
await fs.writeFile(outputPath, fulloutput);

console.log("✅ Country list generated at", outputPath);
