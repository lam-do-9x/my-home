import { compareDate } from "./dateTime";

export default function handleStatus(post) {
  if (post.isPublished === false) {
    return { style: "bg-gray-200", text: "Draft" };
  }

  if (
    post.isPublished === true &&
    compareDate(new Date(post.publishedDate)) <= compareDate(new Date())
  ) {
    return { style: "bg-green-200", text: "Published" };
  }

  return { style: "bg-yellow-200", text: "Schedule" };
}
