import { Container } from "@/components/layouts/Container";
import { Header } from "@/components/layouts/Header";

export default function NotFound() {
  return (
    <>
      <Header isHiddenAdd />
      <Container className="flex justify-center items-center flex-col gap-y-4 h-full">
        <h1 className="text-center text-4xl font-bold">404 - Not found</h1>
        <section>
          <p>ページが見つかりませんでした。</p>
          <p>URLを打ち間違えているかもしれないです。</p>
        </section>
      </Container>
    </>
  );
}
