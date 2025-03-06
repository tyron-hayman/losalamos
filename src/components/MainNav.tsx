import Link from "next/link";

export default function MainNav({ title }: Readonly<{ title: string }>) {
  const navItems: Array<{ id: string; title: string; link: string }> = [
    { id: "nav01", title: "Home", link: "/" },
    { id: "nav02", title: "Explore", link: "/explore" },
  ];

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
      <div className="flex gap-5 items-center justify-end">
        {navItems.map((item, index) => (
          <Link
            key={item.id}
            className="text-white text-lg font-bold"
            href={item.link}
          >
            <span className="text-zinc-700 text-sm pr-2 font-black">
              0{index + 1}
            </span>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
