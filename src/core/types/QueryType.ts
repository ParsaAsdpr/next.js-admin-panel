type Query = {
  currentPage: number;
  limit: number;
  search: string;
  sorting?: {
    id: string;
    desc: boolean;
  } | null;
};

export default Query;
