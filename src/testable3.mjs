import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

// extracted the reading of the file from the logic
export async function readFileFromPath(path) {
  return await readFile(path, { encoding: 'utf8' })
}


// the function only parses a csv string and has no filesystem interaction
export function parsePeopleCsv(csvData) {
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}
