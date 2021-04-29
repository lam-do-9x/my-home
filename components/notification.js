export default function Notification({message}) {
    return (
        <div className={`flex items-center ${message === '' ? 'hidden' : ''}`}>
            <div className="space-x-2 bg-red-50 rounded flex items-start text-red-600 mx-auto max-w-2xl shadow-lg">
                <div className="w-1 self-stretch bg-red-800"></div>
                <div className="flex space-x-2 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-5 pt-1" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.5 5h3l-1 10h-1l-1-10zm1.5 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" /></svg>
                    <h3 className={"text-red-800 tracking-wider flex-1"}>{message}</h3>
                </div>
            </div>
        </div>
    );
}
