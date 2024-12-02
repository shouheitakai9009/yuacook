import { MemoComponent } from '@/features/memo/components';
import { getBaseUrl } from '@/utils/get_base_url';

export default async function MemoPage() {
  const baseUrl = getBaseUrl()
  const data = await fetch(`${baseUrl}/api/memos`, {
    method: 'GET',
    next: { revalidate: 3600, tags: ['memo'] }
  });

  const memo = await data.json();

  return <MemoComponent memo={memo} />;
}
