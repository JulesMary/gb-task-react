import { DefaultError, useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchAll } from "../../data/api/VulnerabilityAPI";
import { VulnerabilityEntity } from "../../domain/entities/vulnerability.entity";

const useVulnerabilities = (): UseQueryResult<
  VulnerabilityEntity[],
  DefaultError
> => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const PATH = "vulnerabilities";
  return useQuery({
    queryKey: [PATH],
    queryFn: async () => fetchAll(`${URL}/${PATH}`),
    select: (data) => data.data,
  });
};

export { useVulnerabilities };
