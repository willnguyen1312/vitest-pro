import { expect, it } from "vitest";
import { z } from "zod";

it("zod works well", async () => {
  const UserSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.email(),
    age: z.number().min(18).optional(),
  });

  type User = z.infer<typeof UserSchema>;

  // Using the schema
  const userData = {
    username: "johndoe",
    email: "john@example.com",
    age: 20,
  };

  try {
    const user = UserSchema.parse(userData);
    console.log("Valid user:", user);
  } catch (error) {
    console.error("Invalid data:", error);
  }
});

it("superRefine validates across fields", () => {
  const SignUpSchema = z
    .object({
      username: z.string().min(3),
      password: z.string().min(8),
      confirmPassword: z.string(),
    })
    .superRefine((value, ctx) => {
      if (value.password !== value.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }

      if (value.password.toLowerCase().includes(value.username.toLowerCase())) {
        ctx.addIssue({
          code: "custom",
          message: "Password must not contain the username",
          path: ["password"],
        });
      }
    });

  const validResult = SignUpSchema.safeParse({
    username: "johndoe",
    password: "sup3rs3cret",
    confirmPassword: "sup3rs3cret",
  });

  expect(validResult.success).toBe(true);

  const invalidResult = SignUpSchema.safeParse({
    username: "johndoe",
    password: "johndoe123",
    confirmPassword: "johndoe124",
  });

  expect(invalidResult.success).toBe(false);
  expect(invalidResult.error?.issues).toEqual([
    {
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
    {
      code: "custom",
      message: "Password must not contain the username",
      path: ["password"],
    },
  ]);
});
