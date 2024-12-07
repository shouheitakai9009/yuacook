import { Header } from "@/components/layouts/Header";

export default function RecipesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-rows-[48px_1fr] h-[100vh] overflow-hidden">
      <Header />
      <article className="pb-4 overflow-y-auto">{children}</article>
    </main>
  );
}
