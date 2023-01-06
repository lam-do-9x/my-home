import { AdjustmentsVerticalIcon, PlusIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { CpLayout } from '@components/Layout'
import Header from '@components/Header'

export default function Topic() {
  return (
    <CpLayout>
      <Header title="Dictionary" />
      <div className="mx-6 mt-6 flex items-center">
        <h2 className="font-large mr-4 flex max-w-min rounded border p-2 text-lg uppercase">
          Topic
        </h2>
        <div className="cursor-pointer rounded-md border p-3 shadow hover:bg-gray-100">
          <PlusIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden font-sans shadow">
          <div className="mx-6 mb-6 w-full">
            <div className="mb-2 flex justify-end">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <MagnifyingGlassIcon className="h-5 w-5 fill-gray-300" />
                </span>
                <input
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Search for topic..."
                  type="text"
                  name="search"
                />
              </label>
            </div>
            <table className="w-full min-w-max table-auto rounded shadow-md">
              <thead>
                <tr className="bg-gray-200 text-center text-sm uppercase leading-normal text-gray-600">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Words</th>
                  <th className="flex justify-center py-3 px-6">
                    <AdjustmentsVerticalIcon className="h-6 w-6" />
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-gray-600"></tbody>
            </table>
          </div>
        </div>
      </div>
    </CpLayout>
  )
}
