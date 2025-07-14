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
  .filter(Boolean);

const outputDir = "./lib";
const outputPath = path.join(outputDir, "generated-countries.ts");

await fs.mkdir(outputDir, { recursive: true }); // ✅ Ensure 'lib' folder exists
await fs.writeFile(
  outputPath,
  `export const countries = ${JSON.stringify(countryData, null, 2)};`,
);

console.log("✅ Country list generated at", outputPath);
