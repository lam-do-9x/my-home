import { useState } from "react";
import { LightningBoltIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Layout from "../../../../components/cp/Layout";
import BodyLanguageTrainingStart from "../../../../components/cp/BodyLanguageTrainingStart";
import BodyLanguageTrainingQA from "../../../../components/cp/BodyLanguageTrainingQA";

export default function BodyLanguage() {
  const [hideQa, setHideQa] = useState(true);

  return (
    <Layout>
      <div className="mx-6 my-6 h-full w-full">
        <div className="flex items-center">
          <h2 className="font-large mr-4 flex rounded border p-2 text-lg uppercase">
            Body Language Training
          </h2>
        </div>
        <div className="w-full py-4 px-4">
          <div className="row-gap-0 grid gap-8 lg:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 sm:h-12 sm:w-12">
                <LightningBoltIcon className="h-6 w-6" />
              </div>
              <h6 className="mb-2 text-xl font-bold">Start</h6>
              <div className="top-0 right-0 flex h-24 items-center justify-center lg:absolute lg:-mr-8">
                <ArrowRightIcon className="w-6 rotate-90 transform text-gray-700 lg:rotate-0" />
              </div>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 sm:h-12 sm:w-12">
                <LightningBoltIcon className="h-6 w-6" />
              </div>
              <h6 className="mb-2 text-xl font-bold">In progress</h6>
              <div className="top-0 right-0 flex h-24 items-center justify-center lg:absolute lg:-mr-8">
                <ArrowRightIcon className="w-6 rotate-90 transform text-gray-700 lg:rotate-0" />
              </div>
            </div>
            <div className="relative text-center">
              <div className="mx-auto mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 sm:h-12 sm:w-12">
                <LightningBoltIcon className="h-6 w-6" />
              </div>
              <h6 className="mb-2 text-xl font-bold">Finish</h6>
            </div>
          </div>
          <BodyLanguageTrainingStart onClick={() => setHideQa(false)} />
          <BodyLanguageTrainingQA hide={hideQa} />
        </div>
      </div>
    </Layout>
  );
}
