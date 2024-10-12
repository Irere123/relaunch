import { TypeOf, z } from "zod";

const zodEnv = z.object({
  // Database
  TURSO_DATABASE_URL: z.string(),
  TURSO_DATABASE_AUTH_TOKEN: z.string(),

  // Sentry

  // Authentiation
  AUTH_RESEND_KEY: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof zodEnv> {}
  }
}

try {
  zodEnv.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    const { fieldErrors } = error.flatten();

    const errorMessage = Object.entries(fieldErrors).map(([field, errors]) =>
      errors ? `${field}: ${errors.join(", ")}` : field
    );

    throw new Error(`Missing environment variables: \n ${errorMessage}`);
  }

  process.exit(1);
}
