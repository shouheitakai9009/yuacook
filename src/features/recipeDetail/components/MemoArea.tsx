import { Label } from "@/components/shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea";

interface Props {
  memo: string;
}

export const MemoArea: React.FC<Props> = ({ memo }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Label className="px-4">メモ</Label>
      <Textarea value={memo} className="min-h-[120px]" readOnly />
    </div>
  );
};
