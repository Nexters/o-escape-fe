import { apiClient } from "@/lib/reactQueryProvider";
import { QUERY_KEY } from "@/queries/getHintList";
import { MutationConfigOptions } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface Request {
  id: number;
}
type Response = void;

const URL_PATH = `/v1/hint`;
const MUTATION_KEY = [URL_PATH];

export const deleteHint = async (req: Request) => {
  const res = await apiClient.delete<Request, AxiosResponse<Response>>(
    URL_PATH,
    { data: req }
  );

  return res.data;
};

export const useDeleteHint = (configOptions?: MutationConfigOptions) => {
  const queryClient = useQueryClient();

  const info = useMutation<Response, void, Request, void>({
    mutationKey: MUTATION_KEY,
    mutationFn: (req) => deleteHint(req),
    ...configOptions?.options,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      // console.log("성공 시 실행")
    },
    onSettled: () => {
      //   console.log("항상 실행");
    },
  });

  return info;
};
