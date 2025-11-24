/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './src/App';
import { name as appName } from './app.json';

const Root = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
};

AppRegistry.registerComponent(appName, () => Root);
