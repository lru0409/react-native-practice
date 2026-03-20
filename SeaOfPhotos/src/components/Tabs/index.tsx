import { useEffect, useState } from 'react';
import { LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import styles from './styles';

type TabItem<T extends string> = {
  label: string;
  value: T;
};

type TabLayout = {
  width: number;
  x: number;
};

type TabsProps<T extends string> = {
  items: readonly TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function Tabs<T extends string>({ items, value, onChange }: TabsProps<T>) {
  const [layouts, setLayouts] = useState<Partial<Record<T, TabLayout>>>({});

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const activeLayout = layouts[value];

  useEffect(() => {
    if (!activeLayout) {
      return;
    }

    indicatorX.value = withTiming(activeLayout.x, { duration: 220 });
    indicatorWidth.value = withTiming(activeLayout.width, { duration: 220 });
  }, [activeLayout, indicatorWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: indicatorWidth.value > 0 ? 1 : 0,
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  const handleTabLayout = (tabValue: T) => (event: LayoutChangeEvent) => {
    const { width, x } = event.nativeEvent.layout;

    setLayouts((prev) => {
      const prevLayout = prev[tabValue];

      if (prevLayout?.width === width && prevLayout.x === x) {
        return prev;
      }

      return {
        ...prev,
        [tabValue]: { width, x },
      };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabList}>
        {items.map((item) => (
          <Pressable
            key={item.value}
            style={styles.tabButton}
            onPress={() => onChange(item.value)}
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
