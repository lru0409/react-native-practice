/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './src/App';
import { name as appName } from './app.json';

const Root = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <App />
      {/* 개발 시만 활성화, 프로덕션에서는 제거 가능 */}
      {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
};

AppRegistry.registerComponent(appName, () => Root);
