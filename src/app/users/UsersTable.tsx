"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import User from "../../types/User";
import { Badge, Skeleton, HStack, Alert, useToast } from "@chakra-ui/react";
import displayDate from "../../utils/displayDate";
import UsersResponseType from "../../types/UsersResponseType";
import TableContainer from "../../components/common/TableContainer";
import { useEffect, useState } from "react";
import SearchInput from "../../app/users/SearchInput";
import { HiFilter, HiUserAdd } from "react-icons/hi";
import Query from "../../types/QueryType";
import { useRouter } from "next/navigation";
import ButtonComponent from "../../components/common/ButtonComponent";
import { useMutation, useQuery } from "react-query";
import { toastConfig } from "../../libs/toastConfig";
import { queryClient } from "../../components/PageWrapper";

const UsersTable = () => {
  const [query, setQuery] = useState<Query>({
    currentPage: 1,
    limit: 10,
    search: "",
  });

  const router = useRouter();
  const toast = useToast(toastConfig);

  // GET USERS
  const {
    data,
    isLoading,
    error,
  }: { data: UsersResponseType; isLoading: boolean; error: any } = useQuery({
    queryKey: ["users", query],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?page=${query.currentPage}&limit=${query.limit}&search=${query.search}`
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
    columnHelper.accessor("role", {
      header: "نقش",
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
    columnHelper.display({
      header: "عملیات",
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
          <ButtonComponent size="sm" onClick={() => handleClick(`/users/edit/${row.original.id}`)}>ویرایش</ButtonComponent>
        </HStack>
      ),
    }),
  ];

  if (error) return <Alert status="error">{error.message}</Alert>;

  return (
    <>
      <HStack w="100%" spacing={[3, 3, 4, 5]}>
        <SearchInput
          query={query.search}
          onSearch={(searchQuery) =>
            setQuery({ ...query, search: searchQuery })
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
          <ButtonComponent
            px={5}
            rightIcon={<HiUserAdd fontSize={18} />}
            onClick={() => handleClick("/users/create")}
          >
            افزودن کاربر
          </ButtonComponent>
        </HStack>
      </HStack>

      {isLoading ? (
        <Skeleton w="100%" py={2}></Skeleton>
      ) : (
        <TableContainer
          columns={columns}
          data={data?.users}
          page={data?.page}
          totalPages={data?.totalPages}
          onPaginate={(page) => setQuery({ ...query, currentPage: page })}
          currentPage={query.currentPage}
          limit={query.limit}
          onLimitChange={(limit) => setQuery({ ...query, limit: limit })}
        />
      )}
    </>
  );
};

export default UsersTable;
