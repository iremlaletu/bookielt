import Image from "next/image";
import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/bookielt.png"
            alt="logo"
            width={55}
            height={30}
            priority
            className="rounded-full"
          />
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/review/create">
                <span> Create </span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="p-2 border-2" type="submit">
                  Sign Out
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Image
                  src={session?.user?.image || "/file.svg"}
                  alt="userımg"
                  width={38}
                  height={38}
                  className="rounded-full"
                />
                <span> {session?.user?.name} </span>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button className="p-2 border-2" type="submit">
                  Sign In with Google
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
