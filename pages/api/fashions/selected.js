import { prisma } from "../../../lib/prisma";
import { removeDuplicateArrayObject } from "../../../lib/helper";

function transformSelected(selected) {
  const selectedSection = selected.map((clothe) => clothe.selected);
  return removeDuplicateArrayObject(selectedSection);
}

export default async function handle(req, res) {
  const fashionClothesSelected = await prisma.fashionClothesSelected.findMany({
    select: {
      selected: true,
    },
  });
  const clothesSelectedOptions = transformSelected(fashionClothesSelected);

  const fashionTypesSelected = await prisma.fashionTypesSelected.findMany({
    select: {
      selected: true,
    },
  });
  const typesSelectedOptions = transformSelected(fashionTypesSelected);

  return res.json({ clothesSelectedOptions, typesSelectedOptions });
}
