import { auth } from "@/modules/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <img src={session.user.image!} alt="User Avatar" />
      <p>{session.user.name}</p>
    </div>
  );
}
