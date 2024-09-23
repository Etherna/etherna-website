type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface PayloadRequest {
  method: Method
  endpoint: string
  body?: BodyInit
  accessToken?: string
}

export function getPayloadRequest(req: PayloadRequest) {
  const { method, endpoint, body, accessToken } = req
  const url = import.meta.env.PUBLIC_PAYLOAD_URL + endpoint
  const request = new Request(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  })
  return request
}
