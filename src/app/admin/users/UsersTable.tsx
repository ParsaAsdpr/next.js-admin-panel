"use client";
import {
  Column,
  ColumnDef,
  createColumnHelper,
  Header,
  SortingState,
} from "@tanstack/react-table";
import User from "../../../core/types/User";
import { Badge, Skeleton, HStack, Alert, useToast } from "@chakra-ui/react";
import displayDate from "../../../core/utils/displayDate";
import TableContainer from "../../../components/common/TableContainer";
import { useEffect, useState } from "react";
import SearchInput from "../../../components/common/SearchInput";
import { HiFilter, HiUserAdd } from "react-icons/hi";
import Query from "../../../core/types/QueryType";
import { useRouter } from "next/navigation";
import ButtonComponent from "../../../components/common/ButtonComponent";
import { useMutation, useQuery } from "react-query";
import { toastConfig } from "../../../core/libs/toastConfig";
import { queryClient } from "../../../components/PageWrapper";
import ResponseType from "../../../core/types/ResponseType";
import useAuth from "../../../core/hooks/useAuth";
import { useUser } from "../../../core/contexts/User.Context";
import withAuth from "../../../components/hoc/withAuth";

const UsersTable = () => {
  const router = useRouter();
  const { isAdmin } = useAuth();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [query, setQuery] = useState<Query>({
    currentPage: 1,
    limit: 10,
    search: "",
    sorting: null,
  });

  const toast = useToast(toastConfig);

  // GET USERS
  const {
    data,
    isLoading,
    error,
  }: { data: ResponseType<User>; isLoading: boolean; error: any } = useQuery({
    queryKey: ["users", query],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?page=${
          query.currentPage
        }&limit=${query.limit}&search=${encodeURI(query.search)}${
          query.sorting
            ? `&sortBy=${query.sorting.id}&sortOrder=${
                query.sorting.desc === true ? "desc" : "asc"
              }`
            : ""
        }`
      ).then((res) => res.json()),
  });

  // DELETE USER
  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`, {
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
        title: "کاربر با موفقیت حذف شد",
        status: "success",
      });
      queryClient.invalidateQueries(["users", query]);
    },
  });

  useEffect(() => {
    router.prefetch("/users/create");
  }, [router]);

  const handleDelete = (id: string) => {
    mutate(id);
  };

  const handleClick = (url: string) => {
    router.push(url);
  };

  const columnHelper = createColumnHelper<User>();
  const columns: ColumnDef<User>[] = [
    columnHelper.accessor("name", {
      header: "نام",
    }),
    columnHelper.accessor("email", {
      header: "ایمیل",
    }),
    columnHelper.accessor("role.name", {
      header: "نقش",
      enableSorting: false,
    }),
    columnHelper.accessor("isActive", {
      header: "وضعیت",
      cell: ({ cell }) =>
        cell.renderValue() === true ? (
          <Badge colorScheme="green" px={2} py={0.5} rounded={10}>
            فعال
          </Badge>
        ) : (
          <Badge colorScheme="red" px={2} py={0.5} rounded={10}>
            غیر فعال
          </Badge>
        ),
    }),
    columnHelper.accessor("lastLogin", {
      header: "آخرین ورود",
      cell: ({ cell }) => displayDate(cell.getValue()),
    }),
    columnHelper.accessor("createdAt", {
      header: "تاریخ ثبت نام",
      cell: ({ cell }) => displayDate(cell.getValue()),
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
                  onClick={() => handleDelete(row.original.id)}
                >
                  حذف
                </ButtonComponent>
                <ButtonComponent
                  size="sm"
                  onClick={() =>
                    handleClick(`/admin/users/edit/${row.original.id}`)
                  }
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
              rightIcon={<HiUserAdd fontSize={18} />}
              onClick={() => handleClick("/admin/users/create")}
            >
              افزودن کاربر
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

export default withAuth(UsersTable);
