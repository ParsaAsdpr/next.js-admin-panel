"use client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
  Flex,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type Props = {
  data: any[];
  columns: any[];
  onSortingChange: (column: any) => void;
  sorting: SortingState;
};

const TableComponent = ({ columns, data, onSortingChange, sorting }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: onSortingChange,
    manualSorting: true,
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
        <Thead bg="#2EB2A4" userSelect="none">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  color="white"
                  fontSize={[8.5, 9.5, 10.5, 11.5, 12.5]}
                  fontFamily="IRANSans, Geneva"
                  py="1.10rem"
                  cursor={header.column.getCanSort() ? "pointer" : "auto"}
                  onClick={
                    header.column.getCanSort()
                      ? () => onSortingChange(header.column)
                      : null
                  }
                >
                  <Flex gap={2} alignItems='center'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: <Icon as={FaChevronUp} />,
                      desc: <Icon as={FaChevronDown} />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {data &&
            table.getRowModel().rows.map((row) => (
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
