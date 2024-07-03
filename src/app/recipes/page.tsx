import { Container } from "@/components/layouts/Container";
import { RecipeItem } from "@/features/RecipeItem";
import { SearchBox } from "@/features/SearchBox";
import Link from "next/link";

const recipes: Array<{ title: string; imageUrl?: string }> = [
  { title: "ベーコンといんげんの炒め物", imageUrl: undefined },
  { title: "麻婆豆腐", imageUrl: undefined },
  {
    title: "きゅうりの塩昆布たたき",
    imageUrl: "https://www.yamaki.co.jp/recipe/wp-content/uploads/0266.jpg",
  },
  {
    title: "はまぐりのお吸い物",
    imageUrl:
      "https://www.sirogohan.com/_files/recipe/images/hamaguri/hamagurisaiyoko2mark.JPG",
  },
  { title: "鶏胸肉のローストチキン", imageUrl: undefined },
];

export default function RecipesPage() {
  return (
    <>
      <Container className="py-2">
        <SearchBox />
      </Container>
      {/* <Link href="/recipes/new">New Page</Link>
      <Link href="/recipes/edit/1">Edit Page</Link> */}
      <Container>
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {recipes.map((recipe, index) => (
            <RecipeItem key={index} {...recipe} />
          ))}
        </div>
      </Container>
    </>
  );
}
