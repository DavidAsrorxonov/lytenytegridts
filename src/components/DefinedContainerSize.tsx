import { Grid, useClientRowDataSource } from "@1771technologies/lytenyte-core";
import type { Column, RowLayout } from "@1771technologies/lytenyte-core/types";
import { memo, useId } from "react";
import { requestData } from "../lib/data";
import "@1771technologies/lytenyte-core/grid.css";

type RequestData = {
  Date: string;
  Status: number;
  Method: string;
  Pathname: string;
  Latency: number;
  "region.shortname": string;
  "region.fullname": string;
  "timing-phase.dns": number;
  "timing-phase.tls": number;
  "timing-phase.ttfb": number;
  "timing-phase.connection": number;
  "timing-phase.transfer": number;
};

const columns: Column<RequestData>[] = [
  { id: "Date", name: "Date", type: "datetime" },
  { id: "Status", name: "Status" },
  { id: "Method", name: "Method" },
  { id: "timing-phase", name: "Timing Phase" },
  { id: "Pathname", name: "Pathname" },
  { id: "Latency", name: "Latency" },
  { id: "region", name: "Region" },
];

export function DefinedContainerSize() {
  const ds = useClientRowDataSource<RequestData>({
    data: requestData,
  });

  const grid = Grid.useLyteNyte({
    gridId: useId(),
    columns,
    rowDataSource: ds,
  });

  const view = grid.view.useValue();

  return (
    <div className="lng-grid" style={{ width: "100%", height: "500px" }}>
      <Grid.Root grid={grid}>
        <Grid.Viewport>
          <Grid.Header>
            {view.header.layout.map((row, i) => (
              <Grid.HeaderRow headerRowIndex={i} key={i}>
                {row.map((c) => {
                  if (c.kind === "group") {
                    return (
                      <Grid.HeaderGroupCell cell={c} key={c.idOccurrence} />
                    );
                  }

                  return <Grid.HeaderCell cell={c} key={c.column.id} />;
                })}
              </Grid.HeaderRow>
            ))}
          </Grid.Header>

          <Grid.RowsContainer>
            <Grid.RowsCenter>
              {view.rows.center.map((row) => {
                if (row.kind === "full-width") {
                  return <Grid.RowFullWidth row={row} key={row.id} />;
                }

                return (
                  <Grid.Row key={row.id} row={row} accepted={["row"]}>
                    {row.cells.map((cell) => (
                      <Grid.Cell cell={cell} key={cell.id} />
                    ))}
                  </Grid.Row>
                );
              })}
            </Grid.RowsCenter>
          </Grid.RowsContainer>
        </Grid.Viewport>
      </Grid.Root>
    </div>
  );
}
