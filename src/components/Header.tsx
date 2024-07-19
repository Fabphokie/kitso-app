import Link from "next/link";
import DropDownButton from "./DropDownButton";


export default function Header() {
    const topics = ['Puberty', 'Pregnancy', 'Family Planning', 'Mental wellness']
  return (
    <header className="bg-pastel-purple text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Kitso</Link>
        </div>
        <div>
        <DropDownButton topics={topics} />
        </div>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
