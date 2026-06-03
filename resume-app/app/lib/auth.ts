import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireUser() {
	const session = await auth();

	if (!session?.user?.id) {
		redirect("/login?reason=dashboard");
	}

	return {
		id: session.user.id,
		email: session.user.email,
		name: session.user.name || session.user.email?.split("@")[0] || "User",
	};
}
