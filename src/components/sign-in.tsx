import Image from "next/image";

import { signIn } from "@/modules/auth";
import Link from "next/link";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
      className="max-w-md border border-gray-200 rounded-md shadow-lg"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-6 pt-8 text-center md:px-16">
        <Link href="/">
          <Image
            src="/relaunch.svg"
            alt="Logo"
            className="h-10 w-10 rounded-full"
            width={20}
            height={20}
          />
        </Link>
        <h3 className="font-display text-2xl font-bold">Get started!</h3>
        <p className="text-sm text-gray-500">
          To submit your project to the Relaunch, create a free account by
          signing in with Google.
        </p>
      </div>
      <div className="flex flex-col space-y-4 bg-gray-50 px-4 rounde-b-md py-8 md:px-16">
        <button type="submit">Sign in with Google</button>
      </div>
    </form>
  );
}
