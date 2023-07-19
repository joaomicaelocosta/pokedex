import data from "../data.json";
import { Pokemon } from "store/pokemon";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const limit: number = Number(query.limit) || 20;
  const types: string[] = query.types ? query.types.toString().split("-") : [];
  const search: string = query.search?.toString() || "";
  let paginatedData: Pokemon[] = [];
  if (types.length > 0) {
    paginatedData = data.filter((p) =>
      types.every((type) => p.types.includes(type))
    );
  }
  if (search.length > 0) {
    paginatedData = data.filter((p) => p.name.includes(search));
  }
  if (search.length === 0 && types.length === 0) {
    paginatedData = data.slice(0, limit);
  }
  return {
    data: paginatedData,
  };
});
