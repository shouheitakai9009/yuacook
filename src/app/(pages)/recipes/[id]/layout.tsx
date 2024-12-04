import { Header } from "@/components/layouts/Header";
import { Button } from "@/components/shadcn/ui/button";
import { redirect } from "next/navigation";

export default async function RecipeDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  async function redirectEdit() {
    "use server";
    redirect(`/recipes/edit/${(await params).id}`);
  }
  return (
    <main className="grid grid-rows-[48px_1fr] h-[100vh] overflow-hidden">
      <Header
        rightComponent={
          <form action={redirectEdit}>
            <Button type="submit" className="text-md">
              編集
            </Button>
          </form>
        }
      />
      {children}
    </main>
  );
}
