import { loadQuery } from "react-relay";
import type { LoaderFunctionArgs } from "react-router";
import type { GraphQLTaggedNode, OperationType } from "relay-runtime";
import { Query } from "./../../../../server/src/graphql/__generated__/resolvers";
import { createRelayLoaderEnvironment } from "./createRelayLoaderEnvironment copy";

export type RelayQueryLoaderArgs<Query extends OperationType> = {
  query: GraphQLTaggedNode;
  variables?: (loaderArgs: LoaderFunctionArgs) => Query["variables"];
};

export type RelayQueryLoaderResponse<Query extends OperationType> = {
  recordMap: { [key: string]: {} };
  variables: Query["variables"];
  " $$queryType": Query;
};

export function relayQueryLoader<Query extends OperationType>(
  args: RelayQueryLoaderArgs<Query>,
) {
  return async (
    loaderArgs: LoaderFunctionArgs,
  ): Promise<RelayQueryLoaderResponse<Query>> => {
    const variables = args.variables?.(loaderArgs) ?? {};
    const environment = createRelayLoaderEnvironment();
    const queryRef = loadQuery(environment, args.query, variables);
    await queryRef.source?.toPromise();
    const recordMap = environment.getStore().getSource().toJSON();
    return {
      recordMap,
      variables,
      " $$queryType": null as any,
    };
  };
}
