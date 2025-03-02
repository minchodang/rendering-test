import { useMemo } from "react";
import {
  graphql,
  loadQuery,
  useLazyLoadQuery,
  useRelayEnvironment,
} from "react-relay";
import { useLoaderData } from "react-router";
import { RecordSource } from "relay-runtime";
import type { homeQuery } from "../__relay__/homeQuery.graphql";
import { createRelayLoaderEnvironment } from "../relay/createRelayLoaderEnvironment copy";
const query = graphql`
  query homeQuery{
    ping
  }
`;

export async function loader() {
  const variables = {};
  const environment = createRelayLoaderEnvironment();
  const queryRef = loadQuery(environment, query, variables);
  await queryRef.source?.toPromise();
  const recordMap = environment.getStore().getSource().toJSON();
  return {
    recordMap,
    variables,
  };
}

export default function Home() {
  const { recordMap } = useLoaderData<typeof loader>();
  const environment = useRelayEnvironment();
  useMemo(() => {
    environment.getStore().publish(new RecordSource(recordMap));
  }, [environment, recordMap]);
  const { variables } = useLoaderData<typeof loader>();
  const data = useLazyLoadQuery<homeQuery>(query, variables);

  return <div>{data.ping}</div>;
}
