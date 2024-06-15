import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import SignInButton from "./SignInButton";
import UserAccount from "./UserAccount";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed inset-x-0 top-0 bg-blue-500 dark:bg-blue-800 z-[10] h-fit border-b border-gray-300 dark:border-gray-700 py-2 shadow-lg dark:shadow-purple-300">
      <div className="flex items-center justify-between h-full px-8 mx-auto max-w-7xl">
        <Link href={"/"} className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 bg-yellow-300 text-black border-orange-300 px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block">
            BrainForge
          </p>
        </Link>
        <div className="flex items-center gap-7">
          <ThemeToggle />
          <div className="flex items-center">
            {session?.user ? (
              <UserAccount user={session.user} />
            ) : (
              <SignInButton text={"Sign In"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
