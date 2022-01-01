import { InMemoryCache, HttpLink, split } from '@apollo/client/core/core.cjs.js';
import { getMainDefinition } from '@apollo/client/utilities/utilities.cjs.js';
import { SvelteApolloClient } from 'svelte-apollo-client';
import { WebSocketLink } from '@apollo/client/link/ws/ws.cjs.js';
import { isBrowser } from 'browser-or-node';

const uri = `${ process.env.NODE_ENV == 'production' ? 'https://api.bluk.studio' : 'http://localhost:3001' }/graphql`;

// Не может сбилдился SSR из-за имплементации WebSocket.
// Для SSR надо использоваться ws (работает) а для работы в браузере
// другую имплементацию. Их надо либо разделить как-то либо же найти универсальную
// имплементацию. точка.

// Http Link
const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});

// WebSocket Link
const wsLink = isBrowser ? new WebSocketLink({
  uri: 'ws://localhost:3001/graphql',
  options: {
    reconnect: true,
  },
}) : null;

const splitLink = isBrowser ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
) : null;

// Client itself
export const client = SvelteApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// +todo

export const editorPingClient = SvelteApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const subscriptionClient = SvelteApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
})