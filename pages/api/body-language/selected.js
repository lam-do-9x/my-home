import { prisma } from "../../../lib/prisma";
import { removeDuplicateArrayObject } from "../../../lib/helper";

function transformSelected(selected) {
  const selectedSection = selected.map((clothe) => clothe.selected);
  return removeDuplicateArrayObject(selectedSection);
}

export default async function handle(req, res) {
  const bodyLanguageEmotionSelected =
    await prisma.bodyLanguageEmotionsSelected.findMany({
      select: {
        selected: true,
      },
    });
  const bodyLanguageEmotionSelectedOptions = transformSelected(
    bodyLanguageEmotionSelected
  );

  const bodyLanguageTypesSelected =
    await prisma.bodyLanguageTypesSelected.findMany({
      select: {
        selected: true,
      },
    });
  const bodyLanguageTypesSelectedOptions = transformSelected(
    bodyLanguageTypesSelected
  );

  return res.json({
    bodyLanguageEmotionSelectedOptions,
    bodyLanguageTypesSelectedOptions,
  });
}
