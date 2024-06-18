import Link from "next/link";

export default function RecipesPage() {
  return (
    <section>
      <h1>This is Recipes.</h1>
      <Link href="/recipes/new">New Page</Link>
      <Link href="/recipes/edit/1">Edit Page</Link>
    </section>
  );
}
