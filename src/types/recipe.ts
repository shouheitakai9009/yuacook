import { Material } from "./material";

export type Recipe = {
  recipeName: string;
  image: FileList;
  materials: Material[];
};
