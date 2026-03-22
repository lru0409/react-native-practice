import {
  Children,
  ComponentRef,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import styles from './styles';

type TabItem = {
  label: string;
  value: string;
};

type TabLayout = {
  width: number;
  x: number;
};

type TabsRootProps = {
  items: readonly TabItem[];
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

type TabsListProps = {
  style?: StyleProp<ViewStyle>;
};

type TabsPagerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type TabsPanelProps = {
  value: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

type TabsContextValue = {
  items: readonly TabItem[];
  activeValue: string;
  setActiveValue: (value: string) => void;
  tabLayouts: Record<string, TabLayout>;
  registerTabLayout: (value: string, layout: TabLayout) => void;
  pageWidth: number;
  setPageWidth: (width: number) => void;
  pagerRef: React.RefObject<ComponentRef<typeof Animated.ScrollView> | null>;
  scrollX: SharedValue<number>;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs.');
  }
  return context;
}

function Root({
  items,
  children,
  value,
  defaultValue,
  onValueChange,
  style,
}: TabsRootProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '');
  const [tabLayouts, setTabLayouts] = useState<Record<string, TabLayout>>({});
  const [pageWidth, setPageWidth] = useState(0);

  const pagerRef = useRef<ComponentRef<typeof Animated.ScrollView>>(null);
  const scrollX = useSharedValue(0);

  const activeValue = value ?? internalValue;

  useEffect(() => {
    console.log('activeValue', activeValue);
  }, [activeValue]);

  useEffect(() => {
    const activeIndex = items.findIndex((item) => item.value === activeValue);
    if (pageWidth <= 0 || activeIndex < 0) {
      return;
    }
    const nextOffset = activeIndex * pageWidth;
    if (Math.abs(scrollX.value - nextOffset) < 1) { // TODO: === 0이 아니고 1인 이유?
      return;
    }
    pagerRef.current?.scrollTo({ x: nextOffset, animated: true });
  }, [activeValue, items, pageWidth, scrollX]);


  const setActiveValue = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const registerTabLayout = (tabValue: string, layout: TabLayout) => {
    setTabLayouts((prev) => {
      const prevLayout = prev[tabValue];
      if (prevLayout?.width === layout.width && prevLayout.x === layout.x) {
        return prev;
      }
      return { ...prev, [tabValue]: layout };
    });
  };

  const contextValue = useMemo(
    () => ({
      items,
      activeValue,
      setActiveValue,
      tabLayouts,
      registerTabLayout,
      pageWidth,
      setPageWidth,
      pagerRef,
      scrollX,
    }),
    [activeValue, items, pageWidth, scrollX, tabLayouts]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <View style={style}>{children}</View>
    </TabsContext.Provider>
  );
}

function List({ style }: TabsListProps) {
  const { items, registerTabLayout, tabLayouts, setActiveValue, pageWidth, scrollX } = useTabsContext();

  const indicatorStyle = useAnimatedStyle(() => {
    const hasAllLayouts = items.every((item) => Boolean(tabLayouts[item.value]));
    if (!hasAllLayouts || pageWidth <= 0) {
      return { width: 0 };
    }

    const inputRange = items.map((_, index) => index * pageWidth);
    const xRange = items.map((item) => tabLayouts[item.value].x);
    const widthRange = items.map((item) => tabLayouts[item.value].width);

    return {
      transform: [{ translateX: interpolate(scrollX.value, inputRange, xRange, Extrapolation.CLAMP) }],
      width: interpolate(scrollX.value, inputRange, widthRange, Extrapolation.CLAMP),
    };
  });

  const handleTabLayout = (tabValue: string) => (event: LayoutChangeEvent) => {
    const { width, x } = event.nativeEvent.layout;
    registerTabLayout(tabValue, { width, x });
  };

  return (
    <View style={[styles.listContainer, style]}>
      <View style={styles.tabList}>
        {items.map((item) => (
          <Pressable
            key={item.value}
            style={styles.tabButton}
            onPress={() => setActiveValue(item.value)}
            onLayout={handleTabLayout(item.value)}
          >
            <Text style={styles.tabLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </View>
  );
}

function Pager({ children, style }: TabsPagerProps) {
  const { items, activeValue, setActiveValue, pageWidth, setPageWidth, pagerRef, scrollX } = useTabsContext();

  const childArray = Children.toArray(children);
  const panelMap = new Map<string, TabsPanelProps>();

  childArray.forEach((child) => {
    if (isValidElement<TabsPanelProps>(child)) {
      panelMap.set(child.props.value, child.props);
    }
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth <= 0 || nextWidth === pageWidth) {
      return;
    }
    setPageWidth(nextWidth);
  };

  const handleMomentumScrollEnd = (event: {
    nativeEvent: {
      contentOffset: {
        x: number;
      };
    };
  }) => {
    if (pageWidth <= 0) {
      return;
    }
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    const nextValue = items[nextIndex]?.value;
    if (nextValue && nextValue !== activeValue) {
      setActiveValue(nextValue);
    }
  };

  return (
    <View style={[styles.pagerContainer, style]} onLayout={handleLayout}>
      <Animated.ScrollView
        ref={pagerRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      >
        <View style={styles.pagerContent}>
          {items.map((item) => {
            const panel = panelMap.get(item.value);

            return (
              <View
                key={item.value}
                style={[
                  styles.page,
                  pageWidth > 0 ? { width: pageWidth } : null,
                  panel?.style,
                ]}
              >
                {panel?.children ?? null}
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

function Panel({ children, style }: TabsPanelProps) {
  return <View style={style}>{children}</View>;
}

const Tabs = Object.assign(Root, {
  List,
  Pager,
  Panel,
});

export default Tabs;
