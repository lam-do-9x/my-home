import { Client } from "@notionhq/client";

let notion;

if (process.env.NODE_ENV === 'production') {
    notion = new Client({ auth: process.env.NOTION_API_OFFICIAL_KEYS });
} else {
    if (!global.notion) {
        global.notion = new Client({ auth: process.env.NOTION_API_OFFICIAL_KEYS });
    }
    notion = global.notion;
}

export { notion }
