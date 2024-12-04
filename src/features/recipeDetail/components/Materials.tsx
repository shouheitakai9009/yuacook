import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/ui/table";
import { Material } from "@prisma/client";

interface Props {
  materials: Material[];
}

export const Materials: React.FC<Props> = ({ materials }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>材料名</TableHead>
          <TableHead>分量</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {materials.map((material, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{material.name}</TableCell>
            <TableCell>
              {material.amount} {material.unitName}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
