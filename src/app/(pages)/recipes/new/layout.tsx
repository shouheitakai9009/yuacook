import { Header } from "@/components/layouts/Header";

export default function RecipesNewLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      <article className="pb-4">{children}</article>
    </main>
  );
}
