import { usePostApi, BaseResponse } from "./useApi";
import { MaskImage } from "../entity/MaskImage";

type MaskImageResponse = MaskImage & BaseResponse;

export const usePostMaskImage = () => {
  const apiSet = usePostApi<MaskImageResponse, MaskImage>();
  const url = "/api/image";
  const execute = (maskImage: MaskImage) => {
    apiSet.execute(url, maskImage);
  };
  return { ...apiSet, execute };
};
