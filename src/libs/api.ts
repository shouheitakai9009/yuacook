type Method = "GET" | "POST" | "PUT" | "DELETE";

export const get = async <TResponse = Response, TParams = {}>(
  endpoint: string,
  params?: TParams
): Promise<TResponse> => {
  return base<TParams>({ endpoint, method: "GET", params });
};

export const post = async <TResponse = Response, TParams = {}>(
  endpoint: string,
  params?: TParams
): Promise<TResponse> => {
  return base<TParams>({ endpoint, method: "POST", params });
};

const base = async <Params = {}>({
  endpoint,
  method,
  params,
}: {
  endpoint: string;
  method: Method;
  params?: Params;
}) => {
  const body = method === "GET" ? undefined : JSON.stringify(params ?? {});
  const res = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  return res.json();
};
