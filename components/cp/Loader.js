import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex justify-center my-4">
      <Image
        className="rounded-full"
        src="/loading-spin.svg"
        width={50}
        height={50}
      />
    </div>
  );
}
