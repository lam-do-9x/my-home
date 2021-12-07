import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import handleStatus from "../../../lib/handleStatus";
// import { formatDate } from "../../../lib/handleDate";
import Modal from "../../../components/Modal";
import Notification from "../../../components/Notification";
import { AuthMiddleware } from "../../../middleware/auth";

function PostsIndex() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [postDeleted, setPostDeleted] = useState({});
  const [responseDeleted, setResponseDeleted] = useState({});

  useEffect(async () => {
    const res = await fetch("/api/posts");
    const { posts } = await res.json();
    setPosts(posts);
  }, []);

  function showDeleteModal(post) {
    setPostDeleted(post);
    setModal(true);
  }

  function reRenderPost(res) {
    const renderPost = posts.filter((post) => {
      return post.id !== res.data.id;
    });
    setPosts(renderPost);
  }

  function handleClickModal(responseDeleted) {
    setResponseDeleted(responseDeleted);
    setModal(!modal);
    if (Object.keys(responseDeleted).length !== 0) {
      reRenderPost(responseDeleted);
      setTimeout(() => {
        setResponseDeleted({});
      }, 3000);
    }
  }

  return (
    <Layout>
      <div className="flex mx-6 my-6">
        <h2 className="mr-4 text-lg font-large uppercase rounded border p-4">
          Posts
        </h2>
        <Link href="/cp/posts/create">
          <button className="inline-block px-4 py-2 text-xs font-sm text-center uppercase transition bg-transparent border-1 border-gray-200 rounded shadow ripple hover:shadow-lg hover:bg-gray-100 focus:outline-none">
            Create
          </button>
        </Link>
      </div>
      {Object.keys(responseDeleted).length !== 0 && (
        <Notification response={responseDeleted} />
      )}
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center font-sans overflow-hidden shadow">
          <div className="w-full mx-6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-center">Published Date</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {posts.map((post) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={post.id}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <span className="font-medium">{post.title}</span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {post.publishedDate}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span
                          className={`${
                            handleStatus(post)["style"]
                          } py-1 px-3 rounded-full`}
                        >
                          {handleStatus(post)["text"]}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <Link href={`/cp/posts/${post.id}`}>
                            <div className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110 cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>
                          </Link>
                          <div
                            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer"
                            onClick={() => showDeleteModal(post)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {modal && (
                    <Modal
                      post={postDeleted}
                      onClick={(res) => handleClickModal(res)}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AuthMiddleware(PostsIndex);
