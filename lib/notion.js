const notionFetch = async ({ url, method = "GET", condition = "" }) => {
  const body = method !== "GET" ? { body: JSON.stringify(condition) } : "";
  const res = await fetch(url, {
    method,
    headers: {
      authorization: `Bearer ${process.env.NOTION_API_OFFICIAL_KEYS}`,
      "Notion-Version": "2021-08-16",
      "Content-Type": "application/json",
    },
    ...body,
  });

  const { results } = await res.json();

  return results;
};

const databaseNotion = async (id, condition) => {
  const url = `${process.env.NOTION_DATABASE_BASE_URI}/${id}/query`;
  return await notionFetch({ url, method: "POST", condition });
};

export { databaseNotion };
