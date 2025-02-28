/**
 * @generated SignedSource<<0d6025c6a75c2e9000453f9815a6203f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RootPageQuery$variables = Record<PropertyKey, never>;
export type RootPageQuery$data = {
  readonly ping: string;
};
export type RootPageQuery = {
  response: RootPageQuery$data;
  variables: RootPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ping",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "cf27ba91298d179b2ef2071c4e6acde1",
    "id": null,
    "metadata": {},
    "name": "RootPageQuery",
    "operationKind": "query",
    "text": "query RootPageQuery {\n  ping\n}\n"
  }
};
})();

(node as any).hash = "6302a9c5b7ed1f61a62358b42dfc968c";

export default node;
