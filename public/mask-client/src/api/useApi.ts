import { useState } from "react";
import { axios } from "./axios";
import { isArray, isObject, mapValues, mapKeys, camelCase } from "lodash";

export type BaseResponse = {
  message?: string;
};

export const fCamelToSnake = (p: string) => {
  //大文字を_+小文字にする(例:A を _a)
  return (
    p.charAt(0).toLowerCase() +
    p
      .substr(1)
      .replace(/([A-Z])/g, (s: string) => "_" + s.charAt(0).toLowerCase())
  );
};

const snakeCase = fCamelToSnake;
export const objectToFormData = (
  obj: any,
  form?: FormData,
  namespace?: string
) => {
  let fd = form || new FormData();
  let formKey: string;

  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = snakeCase(namespace) + "[" + snakeCase(property) + "]";
      } else {
        formKey = snakeCase(property);
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File) &&
        !(obj[property] instanceof Array)
      ) {
        objectToFormData(obj[property], fd, property);
      } else if (obj[property] instanceof Array) {
        if (obj[property].length == 0) {
          fd.append(formKey + "[]", "");
        } else {
          obj[property].forEach((element: any) => {
            if (typeof element === "object") {
              objectToFormData(element, fd, formKey + "[]");
            } else {
              fd.append(formKey + "[]", element);
            }
          });
        }
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};

// @ts-ignore
const mapKeysDeep = (
  data: any,
  callback: (value: string, key: string) => {}
) => {
  if (isArray(data)) {
    return data.map((innerData: object) => mapKeysDeep(innerData, callback));
  } else if (isObject(data)) {
    return mapValues(mapKeys(data, callback), (val: any) =>
      mapKeysDeep(val, callback)
    );
  } else {
    return data;
  }
};

export const mapKeysCamelCase = (data: any) => {
  return mapKeysDeep(data, (_: string, key: string) => camelCase(key));
};

export const mapKeysSnakeCase = (data: any) => {
  return mapKeysDeep(data, (_: string, key: string) => snakeCase(key));
};

export const useGetApi = <T extends BaseResponse, U>() => {
  const [response, setResponse] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(false);
  const f = async (url: string, params?: U) => {
    setLoading(true);
    const res = await axios.get<T>(url, { params: mapKeysSnakeCase(params) });
    setResponse(mapKeysCamelCase(res.data) as T);
    setLoading(false);
  };

  const execute = (url: string, params?: U) => {
    if (loading) {
      return;
    }
    try {
      f(url, params);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return { response, loading, execute };
};

export function usePostApi<T extends BaseResponse, U>() {
  const [response, setResponse] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = async (url: string, formObject: U) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const formData = objectToFormData(formObject);
      const result = await axios.post(url, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      const data: T = result.data;
      setResponse(() => data);

      // フォームをクリアする
      // form.resetForm()
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return { loading, response, execute };
}
