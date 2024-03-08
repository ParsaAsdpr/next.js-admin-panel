"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Props = {
  data: any[];
  columns: any[];
};

const TableComponent = ({ columns, data }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer
      w="100%"
      fontSize={[8, 9, 10, 11, 12]}
      overflow="auto"
      rounded={10}
      border="1px solid #eee"
      borderTop="none"
      flexGrow={1}
    >
      {/* PRIMARY COLOR */}
      <Table>
        <Thead bg="#2EB2A4">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  color="white"
                  fontSize={[8.5, 9.5, 10.5, 11.5, 12.5]}
                  fontFamily="IRANSans, Geneva"
                  py="1.10rem"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {data && table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
