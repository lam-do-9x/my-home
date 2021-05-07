export default function Modal(props) {
    function close() {
        props.onClick();
    }

    async function handleSubmit(id) {
        const res = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        console.log(await res.json());
    }

    return (
        <div className="p-7 flex justify-center items-center fixed left-0 top-0 w-full h-full bg-gray-200 bg-opacity-50 z-50 transition-opacity duration-300 opacity-100">
            <div className="bg-white flex rounded-lg w-scren relative">
                <div className="flex flex-col items-start">
                    <div className="p-7 flex items-center w-full">
                        <div className="text-yellow-500 font-bold text-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Warning
                        </div>
                        <svg className="ml-auto fill-current text-gray-700 w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" onClick={close}>
                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                        </svg>
                    </div>

                    <div className="px-7 overflow-x-hidden overflow-y-auto text-xl">
                        {`Do you want to delete ${props.post.title}?`}
                    </div>

                    <div className="p-7 flex justify-end items-center w-full">
                        <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3" onClick={() => handleSubmit(props.post.id)}>
                            OK
                        </button>
                        <button type="button" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={close}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
