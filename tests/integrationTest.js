import { analyseExtension } from "../src/staticAnalysis.js";
import { compareSnapshots } from "../src/diff.js";
import { classifyChanges } from "../src/classifier.js";

console.log("====================================");
console.log("EXTENSIONWATCH INTEGRATION TEST");
console.log("====================================");

const oldSnapshot = {

    extension001: {

        id: "extension001",
        name: "Calculator",
        version: "1.0",

        permissions: [
            "storage"
        ],

        hostPermissions: []

    }

};

const newSnapshot = {

    extension001: {

        id: "extension001",
        name: "Calculator",
        version: "1.1",

        permissions: [
            "storage",
            "history"
        ],

        hostPermissions: []

    }

};

console.log("");
console.log("Running Static Analysis...");

const staticResult = analyseExtension(newSnapshot.extension001);

console.log(staticResult);

console.log("");
console.log("Running Diff Engine...");

const diffResult = compareSnapshots(oldSnapshot, newSnapshot);

console.log(diffResult);

console.log("");
console.log("Running Risk Classification...");

const riskResult = classifyChanges(diffResult);

console.log(riskResult);

console.log("");

console.log("====================================");
console.log("Integration Test Complete");
console.log("====================================");
