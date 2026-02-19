import { forwardRef } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface InfiniteScrollViewProps extends ScrollViewProps {
  onEndReached?: () => void;
  paddingToBottom?: number; // 바닥 감지 여유 공간
  isRefreshing?: boolean;
  onRefresh?: () => void | Promise<unknown>;
  children: React.ReactNode;
}

const InfiniteScrollView = forwardRef<ScrollView, InfiniteScrollViewProps>((props, ref) => {
  const {
    onEndReached,
    paddingToBottom = 20,
    isRefreshing = false,
    onRefresh,
    children,
    ...rest
  } = props;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    if (isBottom) {
      onEndReached?.();
    }
  };

  return (
    <ScrollView
      ref={ref}
      onScroll={handleScroll}
      refreshControl={
        onRefresh != null ? (
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      {...rest}
    >
      {children}
    </ScrollView>
  );
});

export default InfiniteScrollView;
