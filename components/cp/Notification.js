import { ShieldExclamationIcon } from "@heroicons/react/outline";

export default function Notification({ response }) {
  return (
    <div
      className={`fixed right-0 top-3 flex items-center ${
        Object.keys(response).length !== 0 ? "" : "hidden"
      }`}
    >
      <div
        className={`flex items-start space-x-2 rounded bg-white ${
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
            } flex-1 tracking-wider`}
          >
            {response.message}
          </h3>
        </div>
      </div>
    </div>
  );
}
