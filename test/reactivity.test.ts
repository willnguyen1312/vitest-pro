import { computed, effect, ref } from "@vue/reactivity";

describe("Vue reactive", () => {
  it("should be reactive", () => {
    const a = ref(1);

    const b = computed(() => a.value + 1);

    expect(b.value).toBe(2);

    a.value = 2;

    expect(b.value).toBe(3);
  });

  it("should work with effect", () => {
    const a = ref(1);
    let b = a.value;
    effect(() => (b = a.value + 1));

    expect(b).toBe(2);

    a.value = 2;

    expect(b).toBe(3);
  });
});
