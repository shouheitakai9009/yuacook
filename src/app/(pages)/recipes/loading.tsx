import { Spinner, SpinnerWrapper } from "@/components/ui/Spinner";

export default function Loading() {
  return (<SpinnerWrapper>
    <Spinner message="レシピを読み込み中です..." />
  </SpinnerWrapper>)
}