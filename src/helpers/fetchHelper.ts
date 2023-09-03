import IFetchArgs from "types/IFetchArgs";

type FetchResult = {
  url: string;
  data: { [key: string]: any } | [];
  meta: { [key: string]: any };
  ok: boolean;
  type: string;
  status: number | string;
};

export default async (args: IFetchArgs): Promise<FetchResult> => {
  const apiKey = 'ICpnZFTqwCU2deiANFskvw==U8Dgvp83VlPcONst'
  try {
    const {
      method,
      url,
      data,
      params,
      bodyType,
      resType,
      options = {},
      headers = {},
    } = args || {};
    let urlParams = "";
    if (params && typeof params === "object") {
      Object.keys(params).forEach((key: string, i: number) => {
        urlParams +=
          i === 0 && !url.includes("?")
            ? `?${key}=${params[key]}`
            : `&${key}=${params[key]}`;
      });
    }

    const reqHeaders = new Headers({
      "Content-Type": "application/json; charset=utf-8",
      'X-Api-Key': apiKey,
      ...(headers || {}),
    });
    const response = await fetch(`${url}${urlParams}`,{
      method: method || "GET",
      mode: "cors",
      headers: reqHeaders,
      ...(data
        ? {
            body:
              !bodyType || bodyType === "json" ? JSON.stringify(data) : data,
          }
        : {}),
      ...options,
    });
    let result = await response[resType || "json"]();


    result = {
      url: response.url,
      data: result.data || result,
      ok: response.ok,
      meta: result.meta,
      type: response.type,
      status: response.status,
      ...result,
    } as FetchResult;
    return response.status < 400 || result.status === "true"
      ? Promise.resolve(result)
      : Promise.reject(result);
  } catch (e: any) {
    throw new Error(e);
  }
};
