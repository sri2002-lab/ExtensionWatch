import { compareSnapshots } from "../src/diff.js";

console.log("====================================");
console.log("DIFF ENGINE UNIT TEST");
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

const result = compareSnapshots(oldSnapshot, newSnapshot);

console.log(result);

console.log("====================================");
console.log("Diff Engine Test Complete");
console.log("====================================");
