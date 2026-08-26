import { analyseExtension } from "../src/staticAnalysis.js";
import { testExtensions } from "./testData.js";

console.log("====================================");
console.log("STATIC ANALYSIS UNIT TEST");
console.log("====================================");

for (const extensionName in testExtensions) {

    const extension = testExtensions[extensionName];

    console.log("------------------------------------");
    console.log("Testing:", extension.name);

    const result = analyseExtension(extension);

    console.log(result);
}

console.log("====================================");
console.log("Static Analysis Tests Complete");
console.log("====================================");
