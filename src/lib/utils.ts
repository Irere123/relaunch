import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nFormatter(
  num?: number,
  opts: { digits?: number; full?: boolean } = { digits: 1 }
) {
  if (!num) return "0";

  if (opts.full) {
    return Intl.NumberFormat("en-US").format(num);
  }

  const loopup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.o+$|(\.[0-9]*[1-9])0+$/;
  const item = loopup
    .slice()
    .reverse()
    .find((item) => num >= item.value);

  return item
    ? (num / item.value).toFixed(opts.digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function constructMetadata({
  title = "Relaunch",
  description = "Showcasing your ideas to the public internet.",
  image = "https://relaunch-pro.vercel.app",
}: {
  title?: string;
  description?: string;
  image?: string | null;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: [{ url: image }],
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      creator: "@irere_emmanuel",
    },
    metadataBase: new URL("https://relaunch-pro.vercel.app"),
  };
}

export const getUrlWithRef = (url: string) => {
  const urlWithRef = new URL(url);

  urlWithRef.searchParams.set("ref", "relaunch");

  return urlWithRef.toString();
};

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];
