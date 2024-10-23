import { incrementClicks } from "@/db/mutations";
import { cache } from "react";

export default cache(incrementClicks);
