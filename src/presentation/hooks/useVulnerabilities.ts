import { DefaultError, useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchAll } from "../../data/api/VulnerabilityAPI";
import { VulnerabilityEntity } from "../../domain/entities/vulnerability.entity";

const useVulnerabilities = (): UseQueryResult<
  VulnerabilityEntity[],
  DefaultError
> => {
  const url = "http://localhost:8080/vulnerabilities";
  return useQuery({
    queryKey: ["vulnerabilities"],
    queryFn: async () => await fetchAll(url),
    select: (data) => data.data,
  });
};

export { useVulnerabilities };
