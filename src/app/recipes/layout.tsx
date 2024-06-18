import { Header } from "@/components/layouts/Header";

export default function RecipesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />
      <article>{children}</article>
    </main>
  );
}
