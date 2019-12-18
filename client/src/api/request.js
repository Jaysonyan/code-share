const BASE_URL = "http://localhost:4000"

const sendRequest(endpoint, method, header={}, body={}) => (
  fetch(`${BASE_URL}/${endpoint}`, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
)

export {
  sendRequest
}
