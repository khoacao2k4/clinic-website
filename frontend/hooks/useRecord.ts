// hooks/useRecord.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecord } from "@/lib/api";

export function useRecord(recordId: string) {
  return useQuery({
    queryKey: ["record", recordId],
    queryFn: () => getRecord(recordId),
    retry: 1,
  });
}