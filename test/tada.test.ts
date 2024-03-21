type Data = {
  errors?: [
    {
      message: string;
    },
  ];
};

it("should run", () => {
  let data: Data = {
    errors: [
      {
        message: "oh no",
      },
    ],
  };
  const error = data.errors?.[0]?.message;

  console.log("error, ", error);
});
