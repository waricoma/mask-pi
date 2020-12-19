import { usePostApi, BaseResponse } from "./useApi";
import { MaskMode } from "../entity/MaskMode";

type MaskModeResponse = MaskMode & BaseResponse;

export const usePostMaskMode = () => {
  const apiSet = usePostApi<MaskModeResponse, MaskMode>();
  const url = "/api/mode";
  const execute = (formObject: MaskMode) => {
    apiSet.execute(url, formObject);
  };
  return { ...apiSet, execute };
};
