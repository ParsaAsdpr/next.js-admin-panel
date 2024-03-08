"use client";
import TableComponent from "./Table";
import { Flex, HStack, Select } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import PN from "persian-number";
import ButtonComponent from "./ButtonComponent";

type Props = {
  data: any[];
  page: number;
  totalPages: number;
  columns: ColumnDef<any>[];
  onPaginate: (page: number) => void;
  currentPage: number;
  limit: number;
  onLimitChange: (limit: number) => void;
};

const TableContainer = ({
  data,
  page,
  totalPages,
  columns,
  onPaginate,
  currentPage,
  limit,
  onLimitChange,
}: Props) => {
  return (
    <>
      <TableComponent columns={columns} data={data} />
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <HStack px={3} py={2} spacing={3} justifyContent="center" flexGrow={1}>
          <ButtonComponent
            variant="outline"
            size="sm"
            onClick={() => onPaginate(currentPage - 1)}
            isDisabled={page === 1}
          >
            قبلی
          </ButtonComponent>
          <HStack spacing={1}>
            {[...Array(totalPages)].map((pageNumber, i) => (
              <ButtonComponent
                key={i}
                variant={page === i + 1 ? "solid" : "outline"}
                size="sm"
                onClick={() => onPaginate(i + 1)}
              >
                {PN.convertEnToPe(i + 1)}
              </ButtonComponent>
            ))}
          </HStack>
          <ButtonComponent
            variant="outline"
            size="sm"
            onClick={() => onPaginate(currentPage + 1)}
            isDisabled={page === totalPages}
          >
            بعدی
          </ButtonComponent>
        </HStack>

        <Select
          placeholder={limit.toString()}
          onChange={(e) => onLimitChange(parseInt(e.target.value))}
          size="sm"
          w="auto"
          variant="outline"
          rounded={5}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </Select>
      </Flex>
    </>
  );
};

export default TableContainer;
