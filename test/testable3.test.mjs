import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, readFileFromPath } from "../src/testable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("no data", async () => {
    expect(parsePeopleCsv('')).to.deep.equal([])
  });

  test('parse example data', () => {
    const data = 
      `Loid,Forger,,Male
       Anya,Forger,6,Female
       Yor,Forger,27,Female`

    expect(parsePeopleCsv(data)).to.have.length(3)
  })

  test('parse one person', () => {
    expect(parsePeopleCsv('Anya,Forger,6,Female')[0]).to.deep.equal({ firstName: 'Anya', lastName: 'Forger', age: 6, gender: 'f' })
  })

  test('optional age', () => {
    expect(parsePeopleCsv('_,_,,_')[0].age).to.be.undefined
    expect(parsePeopleCsv('_,_,5,_')[0].age).to.equal(5)
  })

  test('lower case gender', () => {
    expect(parsePeopleCsv('_,_,,A')[0].gender).to.equal('a')
    expect(parsePeopleCsv('_,_,,b')[0].gender).to.equal('b')
  })

  test('trimming and empty lines', () => {
    expect(parsePeopleCsv(' _ , _ , 5 , A ')[0]).to.deep.equal({ firstName: '_', lastName: '_', age: 5, gender: 'a' })

    const data = 
    `Loid,Forger,,Male
     
     Yor,Forger,27,Female`
     expect(parsePeopleCsv(data)).to.have.length(2)     
  })

  test('read file', async () => {
    expect(await readFileFromPath('test/testfile.txt')).to.equal('test file\n')
  })
});
