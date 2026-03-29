type BuildPageHrefParams = {
  basePath: string;
  page: number;
  params?: Record<string, string | undefined>;
};

export function buildPageHref({
  basePath,
  page,
  params = {},
}: BuildPageHrefParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value && value.trim()) {
      searchParams.set(key, value.trim());
    }
  });

  if (page > 1) {
    searchParams.set('page', String(page));
  }

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}
