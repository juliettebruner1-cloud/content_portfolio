import { Metric } from "@/types";

/**
 * EDIT ME — the big editorial stats shown on the homepage and in Brand
 * Mode. Set `visible: true` and fill in `value` once you have a real
 * number. Anything left `visible: false` is skipped entirely — the site
 * will never show a placeholder number as if it were real.
 */
export const metrics: Metric[] = [
  {
    id: "tiktok-community",
    label: "TikTok Community",
    value: "0",
    visible: false,
  },
  {
    id: "instagram-community",
    label: "Instagram Community",
    value: "0",
    visible: false,
  },
  {
    id: "top-video-views",
    label: "Top Video Views",
    value: "0",
    visible: false,
  },
  {
    id: "total-views",
    label: "Total Views",
    value: "0",
    detail: "across platforms",
    visible: false,
  },
  {
    id: "avg-engagement",
    label: "Engagement Rate",
    value: "0%",
    visible: false,
  },
];
