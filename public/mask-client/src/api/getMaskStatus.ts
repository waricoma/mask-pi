import { MaskStatus } from "../entity/MaskStatus";
import { useGetApi, BaseResponse } from "./useApi";

type MaskStatusResponse = MaskStatus & BaseResponse;

export const useGetMaskStatus = () => {
  const apiSet = useGetApi<MaskStatusResponse, null>();
  const url = "/api/status";
  const execute = () => {
    apiSet.execute(url);
  };
  return { ...apiSet, execute };
};
