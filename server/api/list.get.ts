import data from "../data.json";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const limit = Number(query.limit) || 20;
  const offset = Number(query.offset) || 0;

  const paginatedData = data.slice(offset, offset + limit);

  const nextLink = `/api/list?limit=${limit}&offset=${offset + limit}`;

  return {
    data: paginatedData,
    next: nextLink,
  };
});
