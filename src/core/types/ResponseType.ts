type ResponseType<T> = {
  page: number;
  limit: number;
  totalRoles: number;
  totalPages: number;
  data: T[];
};

export default ResponseType;
