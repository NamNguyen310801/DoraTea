import React from "react";

export default function BannerCard({ url, title }) {
  return <img src={url} alt={title} className="object-cover w-full h-full" />;
}
