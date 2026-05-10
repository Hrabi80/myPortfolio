type ProjectSortItem = {
  order?: number;
  publishedAt: string;
};

const unorderedProjectPosition = Number.MAX_SAFE_INTEGER;

const compareByPublishedAtDesc = <T extends ProjectSortItem>(a: T, b: T) => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
};

export const sortByProjectOrder = <T extends ProjectSortItem>(items: T[]) => {
  return [...items].sort((a, b) => {
    const orderDifference =
      (a.order ?? unorderedProjectPosition) -
      (b.order ?? unorderedProjectPosition);

    return orderDifference || compareByPublishedAtDesc(a, b);
  });
};
