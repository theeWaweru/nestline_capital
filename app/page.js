// app/page.js
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Role-based redirect
  switch (session.user.role) {
    case "admin":
      redirect("/admin");
    case "editor":
      redirect("/editor/dashboard");
    default:
      redirect("/dashboard");
  }
}
