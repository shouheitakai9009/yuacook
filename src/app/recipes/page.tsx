import { Container } from "@/components/layouts/Container";
import { SearchBox } from "@/features/SearchBox";
import { RecipeItems } from "./(items)";

export default function RecipesPage() {
  return (
    <>
      <Container className="py-2">
        <SearchBox />
      </Container>
      <RecipeItems />
    </>
  );
}
