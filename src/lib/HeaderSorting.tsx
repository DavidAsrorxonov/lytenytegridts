import type {
  HeaderCellRendererParams,
  SortModelItem,
} from "@1771technologies/lytenyte-core/types";
import type { RequestData } from "./data";
import "@1771technologies/lytenyte-core/grid.css";
import { customComparators } from "./Comparators";

export function HeaderSorting({
  column,
  grid,
}: HeaderCellRendererParams<RequestData>) {
  const sort = grid.state.sortModel
    .useValue()
    .find((c) => c.columnId === column.id);

  const isDescending = sort?.isDescending ?? false;

  return (
    <div
      className="flex items-center px-2 w-full h-full text-sm bg-ln-gray-05 hover:bg-ln-gray-10 transition-all"
      onClick={() => {
        const current = grid.api.sortForColumn(column.id);

        if (current === null) {
          let sort: SortModelItem<RequestData>;
          const columnId = column.id;

          if (customComparators[column.id]) {
            sort = {
              columnId,
              sort: {
                kind: "custom",
                columnId,
                comparator: customComparators[column.id],
              },
            };
          } else if (column.type === "datetime") {
            sort = {
              columnId,
              sort: {
                kind: "date",
                options: { includeTime: true },
              },
            };
          } else if (column.type === "number") {
            sort = { columnId, sort: { kind: "number" } };
          } else {
            sort = { columnId, sort: { kind: "string" } };
          }

          grid.state.sortModel.set([sort]);
          return;
        }

        if (!current.sort.isDescending) {
          grid.state.sortModel.set([{ ...current.sort, isDescending: true }]);
        } else {
          grid.state.sortModel.set([]);
        }
      }}
    ></div>
  );
}
