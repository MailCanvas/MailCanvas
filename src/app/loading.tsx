import loadingImage from "../../public/Loading.png";

export default function loading() {
  return (
    <div className="relative w-screen h-screen bg-white flex items-center justify-center">
      <div
        className="absolute w-[300px] h-[300px] bg-center bg-cover"
        style={{
          backgroundImage: `url(${loadingImage.src})`,
        }}
      ></div>
      <div className="mt-40 relative z-10 text-green-600 text-xl font-semibold">
        Loading..
      </div>
    </div>
  );
}
