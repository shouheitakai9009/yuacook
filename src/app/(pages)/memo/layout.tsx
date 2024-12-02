import { Header } from '@/components/layouts/Header';
import { SaveButton } from '@/features/memo/components/SaveButton';
import { TextProvider } from '@/features/memo/components/TextProvider';

export default async function MemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TextProvider>
      <main className="grid grid-rows-[48px_1fr] h-[100vh] overflow-hidden">
        <Header rightComponent={<SaveButton />} />
        {children}
      </main>
    </TextProvider>
  );
}
