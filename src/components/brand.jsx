import { Link } from "react-router-dom";
import iconUrl from "/icon.png";

export function BrandLink({ centered = false }) {
  return (
    <Link className={`flex items-center gap-2 text-lg font-semibold ${centered ? "justify-center" : ""}`} to="/">
      <img
        src={iconUrl}
        alt="OfferPilot AI 标志"
        width="32"
        height="32"
        className="rounded-lg bg-white/10 p-1 backdrop-blur-sm dark:bg-white dark:rounded-md"
      />
      <span>OfferPilot AI</span>
    </Link>
  );
}
