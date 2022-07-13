import Image from "next/image";

export default function MediaDisplay(props) {
  return (
    <div className="w-full">
      {props.media.includes("image") && (
        <Image
          className="object-cover"
          src={props.media ?? "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"}
          width={550}
          height={500}
        />
      )}
      {props.media.includes("video") && (
        <video style={{ width: "550px" }} controls={true}>
          <source src={props.media} />
        </video>
      )}
    </div>
  );
}
