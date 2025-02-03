import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    Src_IP_hash: "abc123",
    Dst_IP_hash: "def456",
    Protocol_hash: "ghi789",
    IN_BYTES: 12345,
    OUT_BYTES: 67890,
    IN_PKTS: 100,
    OUT_PKTS: 200,
    TCP_FLAGS: "SYN",
    FLOW_DURATION_MILLISECONDS: 5000,
    Label: "Normal",
  },
  {
    Src_IP_hash: "jkl012",
    Dst_IP_hash: "mno345",
    Protocol_hash: "pqr678",
    IN_BYTES: 54321,
    OUT_BYTES: 98765,
    IN_PKTS: 150,
    OUT_PKTS: 250,
    TCP_FLAGS: "ACK",
    FLOW_DURATION_MILLISECONDS: 6000,
    Label: "Attack",
  },
  {
    Src_IP_hash: "stu901",
    Dst_IP_hash: "vwx234",
    Protocol_hash: "yzb567",
    IN_BYTES: 11111,
    OUT_BYTES: 22222,
    IN_PKTS: 120,
    OUT_PKTS: 220,
    TCP_FLAGS: "FIN",
    FLOW_DURATION_MILLISECONDS: 7000,
    Label: "Normal",
  },
];
function Dataset() {
  return (
    <ScrollArea className="h-[200px] w-[90vw] rounded-md border p-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50]">Src_IP_hash</TableHead>
            <TableHead>Dst_IP_hash</TableHead>
            <TableHead>Protocol_hash</TableHead>
            <TableHead>IN_BYTES</TableHead>
            <TableHead>OUT_BYTES</TableHead>
            <TableHead>IN_PKTS</TableHead>
            <TableHead>OUT_PKTS</TableHead>
            <TableHead>TCP_FLAGS</TableHead>
            <TableHead>FLOW_DURATION_MILLISECONDS</TableHead>
            <TableHead>Label</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.Src_IP_hash}</TableCell>
            <TableCell>{item.Dst_IP_hash}</TableCell>
            <TableCell>{item.Protocol_hash}</TableCell>
            <TableCell>{item.IN_BYTES}</TableCell>
            <TableCell>{item.OUT_BYTES}</TableCell>
            <TableCell>{item.IN_PKTS}</TableCell>
            <TableCell>{item.OUT_PKTS}</TableCell>
            <TableCell>{item.TCP_FLAGS}</TableCell>
            <TableCell>{item.FLOW_DURATION_MILLISECONDS}</TableCell>
            <TableCell>{item.Label}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
export default Dataset