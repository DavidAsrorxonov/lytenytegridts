import type { SortComparatorFn } from "@1771technologies/lytenyte-core/types";
import type { RequestData } from "./data";

export const customComparators: Record<
  string,
  SortComparatorFn<RequestData>
> = {
  region: (left, right) => {
    if (left.kind === "branch" || right.kind === "branch") {
      if (left.kind === "branch" && right.kind === "branch") return 0;
      if (left.kind === "branch" && right.kind !== "branch") return -1;
      if (left.kind !== "branch" && right.kind === "branch") return 1;
    }
    if (!left.data || !right.data) return !left.data ? 1 : -1;

    const leftData = left.data as RequestData;
    const rightData = right.data as RequestData;

    return leftData["region.fullname"].localeCompare(
      rightData["region.fullname"]
    );
  },
  "timing-phase": (left, right) => {
    if (left.kind === "branch" || right.kind === "branch") {
      if (left.kind === "branch" && right.kind === "branch") return 0;
      if (left.kind === "branch" && right.kind !== "branch") return -1;
      if (left.kind !== "branch" && right.kind === "branch") return 1;
    }
    if (!left.data || !right.data) return !left.data ? 1 : -1;

    const leftData = left.data as RequestData;
    const rightData = right.data as RequestData;

    return leftData.Latency - rightData.Latency;
  },
};
