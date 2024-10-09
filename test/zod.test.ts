import { it } from "vitest";
import { z } from "zod";

it("zod works well", async () => {
  const UserSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    age: z.number().min(18).optional(),
  });

  type User = z.infer<typeof UserSchema>;

  // Using the schema
  const userData = {
    username: "johndoe",
    email: "john@example.com",
    age: 2,
  };

  try {
    const user = UserSchema.parse(userData);
    console.log("Valid user:", user);
  } catch (error) {
    console.error("Invalid data:", error);
  }
});
