import { classifyChanges } from "../src/classifier.js";

console.log("====================================");
console.log("RISK CLASSIFICATION UNIT TEST");
console.log("====================================");

const sampleChanges = [

    {
        id: "extension001",
        name: "Calculator",
        versionChanged: true,
        oldVersion: "1.0",
        newVersion: "1.1",
        addedPermissions: [
            "history"
        ],
        removedPermissions: []
    },

    {
        id: "extension002",
        name: "Ad Blocker",
        versionChanged: true,
        oldVersion: "3.2",
        newVersion: "3.3",
        addedPermissions: [
            "webRequest"
        ],
        removedPermissions: []
    },

    {
        id: "extension003",
        name: "Notes",
        versionChanged: true,
        oldVersion: "2.0",
        newVersion: "2.1",
        addedPermissions: [
            "storage"
        ],
        removedPermissions: []
    }

];

const result = classifyChanges(sampleChanges);

console.log(result);

console.log("====================================");
console.log("Risk Classification Test Complete");
console.log("====================================");
