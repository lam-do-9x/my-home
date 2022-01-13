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
  return await notionFetch({ url, method: "POST", condition });
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

const createPageNotion = async (condition) => {
  const url = `${process.env.NOTION_PAGE_BASE_URI}`;
  return await notionFetch({ url, method: "POST", condition });
};

const updatePageNotion = async (id, condition) => {
  const url = `${process.env.NOTION_PAGE_BASE_URI}/${id}`;
  return await notionFetch({ url, method: "PATCH", condition });
};

class AllChildBlockNotion {
  constructor(id, cursor = "") {
    this.id = id;
    this.cursor = cursor;
    this.blocks = [];
  }

  async get() {
    const response = await childBlockNotion(this.id, this.cursor);
    this.blocks.push(...response.results);

    if (response.has_more) {
      this.cursor = response.next_cursor;
      await this.get();
    }

    return this.blocks;
  }
}

class AllDatabaseCursorNotion {
  constructor(id, body) {
    this.id = id;
    this.body = { start_cursor: undefined, ...body };
    this.cursors = [];
  }

  async get() {
    const response = await databaseNotion(this.id, this.body);

    if (response.has_more) {
      this.cursors.push(response.next_cursor);
      this.body = { ...this.body, start_cursor: response.next_cursor };
      await this.get();
    }

    return this.cursors;
  }
}

export {
  databaseNotion,
  AllDatabaseCursorNotion,
  childBlockNotion,
  pageNotion,
  AllChildBlockNotion,
  createPageNotion,
  updatePageNotion,
};
