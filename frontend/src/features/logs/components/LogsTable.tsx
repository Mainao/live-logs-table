import type { ComponentPropsWithoutRef } from "react";
import { TableVirtuoso } from "react-virtuoso";
import useSSELogs from "../hooks/useSSELogs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LogsTable() {
  const logs = useSSELogs();

  return (
    <div style={{ height: "500px" }}>
      <TableVirtuoso
        data={logs}
        followOutput="smooth"
        components={{
          Table: (props: ComponentPropsWithoutRef<"table">) => (
            <Table {...props} className="border-collapse" />
          ),
          TableHead: TableHeader,
          TableRow,
          TableBody,
        }}
        fixedHeaderContent={() => (
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        )}
        itemContent={(_index, log) => (
          <>
            <TableCell>{new Date(log.timestamp).toLocaleTimeString()}</TableCell>

            <TableCell>{log.service}</TableCell>

            <TableCell className="font-medium">{log.level}</TableCell>

            <TableCell>{log.message}</TableCell>
          </>
        )}
      />
    </div>
  );
}
