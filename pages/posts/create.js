import Layout from "../../components/Layout";
import MDE from '../../components/MDE';
import DayPicker from "../../components/DayPicker";
import SwitchToggle from "../../components/SwitchToggle";

const PostsCreate = function () {
    return (
        <Layout>
            <div className="flex items-center justify-between px-5 py-2">
                <h1 className="text-2xl	font-normal">Create Post</h1>
                <div className="inline-block mr-2 mt-2">
                    <button type="button" className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save and Publish
                    </button>
                </div>
            </div>
            <div className="flex justify-center p-5">
                <div className="w-3/4 max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black">
                    <div className="overflow-hidden rounded-md">
                        <div className="mb-8">
                            <p className="mb-2 font-semibold">Title<i className="ml-sm text-red-500">*</i></p>
                            <input className="w-full border"/>
                        </div>
                        <div className="w-full mb-8">
                            <p className="mb-2 font-semibold">Content</p>
                            <MDE />
                        </div>
                        <div className="mb-8">
                            <p className="mb-2 font-semibold">Excerpt</p>
                            <textarea className="w-full border"/>
                        </div>
                    </div >
                </div >
                <div className="flex flex-col w-1/4 max-w-6xl mx-auto rounded-xl bg-white shadow-lg p-5 text-black h-full ml-6">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b">
                        <p>Published</p>
                        <SwitchToggle />
                    </div>
                    <div className="mb-4">
                        <p>Slug<i className="ml-sm text-red-500">*</i></p>
                        <input className="w-full border"/>
                    </div>
                    <div className="mb-4">
                        <p>Date<i className="ml-sm text-red-500">*</i></p>
                        <DayPicker />
                    </div>
                </div>
            </div >
        </Layout>);
};

export default PostsCreate;
