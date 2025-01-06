import { Button } from "@/components/ui/button";
import { signOut } from "@/modules/auth";

export default function SignOutPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button type="submit" variant={"destructive"}>
          Sign out
        </Button>
      </form>
    </div>
  );
}
