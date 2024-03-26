type Data = {
  errors?: [
    {
      message: string;
    },
  ];
};

// commitQueue.some(c => {
//   try {
//     // @ts-expect-error Reuse the commitQueue variable here so the type changes
//     commitQueue = c._renderCallbacks;
//     c._renderCallbacks = [];
//     commitQueue.some(cb => {
//       // @ts-expect-error See above comment on commitQueue
//       cb.call(c);
//     });
//   } catch (e) {
//     options._catchError(e, c._vnode);
//   }
// });

let commitQueue: any[] = [];

commitQueue.push(
  {
    name: "c1",
    renderCallbacks: [
      {
        call: (c: any) => {
          console.log("c1, ");
        },
      },
    ],
  },
  {
    name: "c2",
    renderCallbacks: [
      {
        call: (c: any) => {
          console.log("c2, ");
        },
      },
    ],
  },
  {
    name: "c3",
    renderCallbacks: [
      {
        call: (c: any) => {
          console.log("c3, ");
        },
      },
    ],
  },
);

it("should run", () => {
  commitQueue.some((c) => {
    console.log(c);
    try {
      // commitQueue = c.renderCallbacks;
      // c.renderCallbacks = [];
      c.renderCallbacks.some((cb) => {
        cb.call(c);
      });
      c.renderCallbacks = [];
    } catch (e) {
      console.log("e, ", e);
    }
  });
});
