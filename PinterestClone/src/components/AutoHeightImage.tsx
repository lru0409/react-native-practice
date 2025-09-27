import { useEffect, useState } from 'react';
import { Image, Dimensions, ActivityIndicator } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';

const CONTAINER_WIDTH =
  Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2;

export default function AutoHeightImage({ uri, onReady }: { uri: string, onReady?: () => void }) {
  const [height, setHeight] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    Image.getSize(uri, (width, height) => {
      const ratio = height / width;
      setHeight(CONTAINER_WIDTH * ratio);
      onReady?.();
      setIsLoading(false);
    });
  }, [uri]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: CONTAINER_WIDTH, height, resizeMode: 'cover', borderRadius: 16 }}
    />
  );
}
