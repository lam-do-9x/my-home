const notionFetch = async ({ url, method = "GET", condition = "" }) => {
  const body = method !== "GET" ? { body: JSON.stringify(condition) } : "";
  return await fetch(url, {
    method,
    headers: {
      authorization: `Bearer ${process.env.NOTION_API_OFFICIAL_KEYS}`,
      "Notion-Version": "2021-08-16",
      "Content-Type": "application/json",
    },
    ...body,
  }).then((res) => res.json());
};

const databaseNotion = async (id, condition) => {
  const url = `${process.env.NOTION_DATABASE_BASE_URI}/${id}/query`;
  const { results } = await notionFetch({ url, method: "POST", condition });
  return results;
};

const childBlockNotion = async (id, cursor) => {
  const cursors = cursor !== "" ? `?start_cursor=${cursor}` : cursor;
  const url = `${process.env.NOTION_BLOCK_BASE_URI}/${id}/children${cursors}`;
  return await notionFetch({ url });
};

const pageNotion = async (id) => {
  const url = `${process.env.NOTION_PAGE_BASE_URI}/${id}`;
  return await notionFetch({ url });
};

let blocks = [];
let results;

const getAllChildBlockNotion = async (id, cursor = "") => {
  const response = await childBlockNotion(id, cursor);

  blocks.push(...response.results);
  results = [...blocks];

  if (response.has_more) {
    await getAllChildBlockNotion(id, response.next_cursor);
  }

  blocks = [];
  return results;
};

export { databaseNotion, childBlockNotion, pageNotion, getAllChildBlockNotion };
