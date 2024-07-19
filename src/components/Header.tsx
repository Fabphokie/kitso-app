import Link from "next/link";
import DropDownButton from "./DropDownButton";

export default function Header() {
  const topics = ['Puberty', 'Pregnancy', 'Family Planning', 'Mental wellness'];
  const logoUrl = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTY0bGd3bXcxNXA2djdrampna2pmN2xsd2VqYjd5c2VucGZuM3JmMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/j1ODNPrvSVeyThBe3b/giphy.gif";  // GIF URL

  return (
    <header className="bg-pastel-purple text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <Link href="/" className="flex items-center">
            <img src={logoUrl} alt="Kitso Logo" className="w-12 h-auto ml-2" />  {/* Adjust the width, height, and margin as needed */}
            <span>K i t s o.</span>
          </Link>
        </div>
        <div>
          <DropDownButton topics={topics} />
        </div>
        <div className="space-x-4 ">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
