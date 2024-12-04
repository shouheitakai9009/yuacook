import {
  Breadcrumb as ShadBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

interface Props {
  name: string;
}

export const Breadcrumb: React.FC<Props> = ({ name }) => {
  return (
    <ShadBreadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">レシピ一覧</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{name}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </ShadBreadcrumb>
  );
};
