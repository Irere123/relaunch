import { signIn } from "@/modules/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
