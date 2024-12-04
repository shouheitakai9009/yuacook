import { Header } from "@/components/layouts/Header";

export default async function RecipeEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-rows-[48px_1fr] h-[100vh] overflow-hidden">
      <Header />
      {children}
    </main>
  );
}
