import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full bg-gradient-to-br from-fuchsia-100 via-white to-sky-100 py-3 sm:px-3">
      <div className="mx-auto min-h-screen w-full max-w-screen-md">
        <div className="flex min-h-screen justify-center items-center w-full h-full">
          <Image
            src="/logomark.svg"
            alt="ReLaunch Logo"
            width={64}
            height={64}
            className="h-16 animate-fade-down"
          />
        </div>
      </div>
    </div>
  );
}
