import { ShieldExclamationIcon } from "@heroicons/react/outline";

export default function Notification({ response }) {
  return (
    <div
      className={`flex items-center fixed right-0 top-3 ${
        Object.keys(response).length !== 0 ? "" : "hidden"
      }`}
    >
      <div
        className={`space-x-2 bg-white rounded flex items-start ${
          response.code === 400 || response.code === 401
            ? "text-red-600"
            : "text-green-600"
        } mx-auto max-w-2xl shadow-lg`}
      >
        <div
          className={`w-1 self-stretch ${
            response.code === 400 || response.code === 401
              ? "bg-red-800"
              : "bg-green-800"
          }`}
        ></div>
        <div className="flex space-x-2 p-4">
          <ShieldExclamationIcon className="h5 w-5" />
          <h3
            className={`${
              response.code === 400 || response.code === 401
                ? "text-red-800"
                : "text-green-800"
            } tracking-wider flex-1`}
          >
            {response.message}
          </h3>
        </div>
      </div>
    </div>
  );
}
