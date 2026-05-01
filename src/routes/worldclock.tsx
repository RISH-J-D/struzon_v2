import { createFileRoute } from "@tanstack/react-router";
import CyberMap from "@/components/CyberMap";

export const Route = createFileRoute("/worldclock")({
  component: CyberMap,
});
