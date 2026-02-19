import { describe, it } from "vitest";
import { createReference, serialize, fromJSON, toJSON, deserialize } from "seroval";

const value = "Hello";
describe("seroval", () => {
    it("should serialize the object", async () => {
        // console.log(serialize({ greet: () => "Hello" }));
        // Register the function with a unique ID
        const greet = createReference("greet", () => value);

        // Now you can serialize it
        const result = serialize(greet);
        console.log(result);
        console.log((deserialize(result) as () => string)());
        // console.log(result);

        // // we can now serialize this
        // const serialized = toJSON(greet); // or any of the serializer
        // // true
        // console.log(greet === fromJSON(serialized));
        // console.log(toJSON(greet));
        // console.log((fromJSON(serialized) as () => string)());
    });
});
