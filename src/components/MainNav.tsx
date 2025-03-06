import Link from "next/link";

export default function MainNav({ title }: Readonly<{ title: string }>) {
  return (
    <div className="fixed top-0 inset-x-0 p-5 flex items-center justify-between">
      <div>
        <Link
          className="text-white uppercase text-lg font-[var(--font-bebas_neue)] font-black"
          href="/"
        >
          {title}
        </Link>
      </div>
      <div>
        <Link href="/about">Explore</Link>
      </div>
    </div>
  );
}
