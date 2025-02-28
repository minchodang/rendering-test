import { Environment, Network, RecordSource, Store } from "relay-runtime";

const network = Network.create(async (operation, variables, cacheConfig) => {
  const response = await fetch("http://127.0.0.1:9000/graphql", {
    method: "post",
    body: JSON.stringify({
      query: operation?.text,
      variables,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    signal: cacheConfig.metadata?.signal as AbortSignal,
  });

  return await response.json();
});

const store = new Store(new RecordSource());

export const relayEnvironment = new Environment({
  network,
  store,
});