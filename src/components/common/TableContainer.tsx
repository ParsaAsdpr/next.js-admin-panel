"use client";
import TableComponent from "./Table";
import { Flex, HStack, Select } from "@chakra-ui/react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import PN from "persian-number";
import ButtonComponent from "./ButtonComponent";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: any[];
  page?: number;
  totalPages?: number;
  columns: ColumnDef<any>[];
  onPaginate?: (page: number) => void;
  currentPage?: number;
  limit?: number;
  onLimitChange?: (limit: number) => void;
  sorting: SortingState;
  onSortingChange: (column: any) => void
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
  onSortingChange,
  sorting
}: Props) => {
  return (
    <>
      <TableComponent columns={columns} data={data} onSortingChange={onSortingChange} sorting={sorting} />
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        {page && totalPages && currentPage && onPaginate && totalPages > 1 && (
          <HStack
            px={3}
            py={2}
            spacing={3}
            justifyContent="center"
            flexGrow={1}
          >
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
        )}

        {limit && onLimitChange && (
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
        )}
      </Flex>
    </>
  );
};

export default TableContainer;
