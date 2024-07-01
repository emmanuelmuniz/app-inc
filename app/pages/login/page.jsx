import LoginForm from "@/components/auth/LoginForm"
import authOptions from "../../api/auth/authOptions/authOptions"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession(authOptions);

    if (session) redirect("/pages/dashboard");

    return <LoginForm />
}