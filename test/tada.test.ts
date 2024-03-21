type Data = {
  errors?: [
    {
      message: string;
    },
  ];
};

it("should run", () => {
  let data: Data = {};
  const error = data.errors?.[0]?.message ?? "no error";

  console.log("error, ", error);
});
