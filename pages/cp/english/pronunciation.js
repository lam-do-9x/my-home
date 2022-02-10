import { useEffect, useState } from "react";
import Layout from "../../../components/cp/Layout";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";
import PronunciationModal from "../../../components/cp/PronunciationModal";

function Pronunciation() {
  const [isLoading, setLoading] = useState(true);
  const [isShow, setShow] = useState(false);
  const [pronunciations, setPronunciation] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [ipa, setIpa] = useState(null);

  useEffect(async () => {
    const { pronunciations } = await fetch("/api/pronunciations").then((res) =>
      res.json()
    );

    setPronunciation(pronunciations);

    setLoading(false);
  }, []);

  const show = async (ipa) => {
    const { pronunciations } = await fetch(`/api/pronunciations/${ipa}`).then(
      (res) => res.json()
    );

    setSounds(pronunciations);

    setIpa(ipa);

    setShow(true);
  };

  return (
    <Layout>
      <div className="mx-6 mt-6 flex items-center">
        <h2 className="font-large mr-4 flex max-w-min rounded border p-2 text-lg uppercase">
          Pronunciation
        </h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden font-sans shadow">
          <div className="mx-6 w-full">
            <div className="my-6 rounded bg-white shadow-md">
              <table className="w-full min-w-min table-auto">
                <thead>
                  <tr className="bg-gray-200 text-center text-sm uppercase leading-normal text-gray-600">
                    <th className="py-3 px-6 text-center">ipa</th>
                    <th className="py-3 px-6 text-center">pronunciation</th>
                    <th className="py-3 px-6 text-center">type</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light text-gray-600">
                  {isLoading ? (
                    <tr className="border-b border-gray-200">
                      <td colSpan="4">
                        <Loader />
                      </td>
                    </tr>
                  ) : (
                    pronunciations.map((pronunciation) => (
                      <tr
                        className="cursor-pointer border-b border-gray-200 text-center font-medium hover:bg-gray-100"
                        key={pronunciation.id}
                        onClick={() =>
                          show(pronunciation.properties.ipa.title[0].plain_text)
                        }
                      >
                        <td className="py-3 px-6">
                          {pronunciation.properties.ipa.title[0].plain_text}
                        </td>
                        <td className="py-3 px-6">
                          {
                            pronunciation.properties.pronounce.rich_text[0]
                              .plain_text
                          }
                        </td>
                        <td className="flex justify-center py-3 px-6">
                          <div
                            className={`max-w-min rounded border px-4 py-2 bg-${pronunciation.properties.type.select.color}-200`}
                          >
                            {pronunciation.properties.type.select.name}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {isShow && (
                <PronunciationModal
                  pronunciations={sounds}
                  ipa={ipa}
                  onClick={() => setShow(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AuthMiddleware(Pronunciation);
