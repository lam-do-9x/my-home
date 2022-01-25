import Image from "next/image";

export default function Loader() {
  return (
    <div className="my-4 flex justify-center">
      <Image
        className="rounded-full"
        src="/loading-spin.svg"
        width={50}
        height={50}
      />
    </div>
  );
}
