import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

export default function Paginate(props) {
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    if (props.pageCount > 1) {
      setSelected(0);
    }
  }, [props.pageCount]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * props.perPage;
    props.handlePageClick(newOffset);
    setSelected(event.selected);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ChevronRightIcon className="h-5 w-5" />}
      previousLabel={<ChevronLeftIcon className="h-5 w-5" />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={props.perPage}
      pageCount={props.pageCount}
      forcePage={selected}
      renderOnZeroPageCount={null}
      className="py-4 flex items-center justify-center"
      pageClassName="hover:bg-gray-100"
      pageLinkClassName="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium"
      breakLinkClassName="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium"
      activeLinkClassName="bg-indigo-50 border-indigo-500 text-indigo-600"
      previousLinkClassName="inline-flex items-center px-3 py-2 text-gray-700 rounded-l-md border border-gray-300"
      nextLinkClassName="inline-flex items-center px-3 py-2 text-gray-700 rounded-r-md border border-gray-300"
      disabledLinkClassName="text-gray-100 cursor-not-allowed"
    />
  );
}
