"use client";
import {
  Column,
  ColumnDef,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";
import { Skeleton, HStack, Alert, useToast } from "@chakra-ui/react";
import displayDate from "../../../core/utils/displayDate";
import TableContainer from "../../../components/common/TableContainer";
import { useEffect, useState } from "react";
import SearchInput from "../../../components/common/SearchInput";
import { HiFilter } from "react-icons/hi";
import Query from "../../../core/types/QueryType";
import { useRouter } from "next/navigation";
import ButtonComponent from "../../../components/common/ButtonComponent";
import { useMutation, useQuery } from "react-query";
import { toastConfig } from "../../../core/libs/toastConfig";
import { queryClient } from "../../../components/PageWrapper";
import { FaPlus } from "react-icons/fa";
import Role from "../../../core/types/Role";
import ResponseType from "../../../core/types/ResponseType";
import { useUser } from "../../../core/contexts/User.Context";
import withAuth from "../../../components/hoc/withAuth";

const RolesTable = () => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.roleId === 2) setIsAdmin(true);
  }, [user]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [query, setQuery] = useState<Query>({
    currentPage: 1,
    limit: 10,
    search: "",
    sorting: null,
  });

  const toast = useToast(toastConfig);
  const router = useRouter();

  // GET ROLES
  const {
    data,
    isLoading,
    error,
  }: { data: ResponseType<Role>; isLoading: boolean; error: any } = useQuery({
    queryKey: ["roles", query],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles?page=${
          query.currentPage
        }&limit=${query.limit}&search=${query.search}${
          query.sorting
            ? `&sortBy=${query.sorting.id}&sortOrder=${
                query.sorting.desc === true ? "desc" : "asc"
              }`
            : ""
        }`
      ).then((res) => res.json()),
  });

  // DELETE ROLE
  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles/${id}`, {
        method: "DELETE",
      });
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
    onSuccess: () => {
      toast({
        title: "نقش با موفقیت حذف شد",
        status: "success",
      });
      queryClient.invalidateQueries(["roles", query]);
    },
  });

  useEffect(() => {
    router.prefetch("/roles/create");
  }, [router]);

  const handleDelete = (id: string) => {
    mutate(id);
  };

  const handleClick = (url: string) => {
    router.push(url);
  };

  const columnHelper = createColumnHelper<Role>();
  const columns: ColumnDef<Role>[] = [
    columnHelper.accessor("id", {
      header: "شناسه",
    }),
    columnHelper.accessor("name", {
      header: "نام نقش",
    }),
    columnHelper.accessor("slug", {
      header: "شناسه نقش",
    }),
    columnHelper.accessor("createdAt", {
      header: "تاریخ ایجاد",
      cell: (info) => displayDate(info.getValue()),
    }),
    ...(isAdmin
      ? [
          columnHelper.display({
            header: "عملیات",
            enableSorting: false,
            cell: ({ row }) => (
              <HStack>
                <ButtonComponent
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(row.original.id.toString())}
                >
                  حذف
                </ButtonComponent>
                <ButtonComponent
                  size="sm"
                  onClick={() => handleClick(`/admin/roles/edit/${row.original.id}`)}
                >
                  ویرایش
                </ButtonComponent>
              </HStack>
            ),
          }),
        ]
      : []),
  ];

  const handleSorting = (column: Column<any, unknown>) => {
    const sort = {
      id: column.id,
      desc: column.getIsSorted() === "desc" ? false : true,
    };
    setQuery({
      ...query,
      currentPage: 1,
      sorting: sort,
    });
    setSorting(sort ? [sort] : []);
  };

  if (error) return <Alert status="error">{error.message}</Alert>;

  return (
    <>
      <HStack w="100%" spacing={[3, 3, 4, 5]}>
        <SearchInput
          query={query.search}
          onSearch={(searchQuery) =>
            setQuery({ ...query, currentPage: 1, search: searchQuery })
          }
        />
        <HStack>
          <ButtonComponent
            variant="outline"
            color="#888"
            border="2px solid #888"
            _hover={{ bg: "#888", color: "white" }}
            rightIcon={<HiFilter fontSize={18} />}
          >
            فیلتر
          </ButtonComponent>
          {isAdmin && (
            <ButtonComponent
              px={5}
              rightIcon={<FaPlus fontSize={18} />}
              onClick={() => handleClick("/admin/roles/create")}
            >
              افزودن نقش
            </ButtonComponent>
          )}
        </HStack>
      </HStack>

      {isLoading ? (
        <Skeleton w="100%" py={2}></Skeleton>
      ) : (
        <TableContainer
          columns={columns}
          data={data?.data}
          page={data?.page}
          totalPages={data?.totalPages}
          onPaginate={(page) => setQuery({ ...query, currentPage: page })}
          currentPage={query.currentPage}
          limit={query.limit}
          onLimitChange={(limit) =>
            setQuery({ ...query, currentPage: 1, limit: limit })
          }
          onSortingChange={handleSorting}
          sorting={sorting}
        />
      )}
    </>
  );
};

export default withAuth(RolesTable);
