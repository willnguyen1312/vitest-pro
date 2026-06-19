import { signal, batch, computed, effect } from "@preact/signals-core";
import { reactive } from "@vue/reactivity";

describe("signal", () => {
  it("should work as expected", () => {
    const users = signal({
      firstName: signal("John"),
      lastName: signal("Doe"),
    });

    const nestedUsers = signal({
      firstName: signal("John"),
      lastName: signal("Doe"),
    });

    effect(() => {
      console.log(`Rendering first name: ${users.value.firstName.value}`);
    });

    effect(() => {
      console.log(`Rendering last name: ${users.value.lastName.value}`);
    });

    users.value.lastName. = "New Family name";
    // users.value = {
    //   ...users.value,
    //   lastName: "New Family name",
    // };
  });
});
