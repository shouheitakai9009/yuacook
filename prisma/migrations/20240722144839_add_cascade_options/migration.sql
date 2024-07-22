-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_unitName_fkey";

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_unitName_fkey" FOREIGN KEY ("unitName") REFERENCES "Unit"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
