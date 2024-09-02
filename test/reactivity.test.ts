import { computed, effect, reactive, ref } from "@vue/reactivity";

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

  it("should work with deep object", () => {
    const data = reactive([{ count: 1 }, { count: 2 }, { count: 3 }]);

    let callTimes = 0;

    effect(() => {
      // rendering first item
      // console.log(data[0].count);

      callTimes++;
    });

    data[1].count = 12;
    data[2].count = 13;

    expect(callTimes).toBe(1);
  });
});
