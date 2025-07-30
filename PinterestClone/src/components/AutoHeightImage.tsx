import { useEffect, useState } from 'react';
import { Image, Dimensions, ActivityIndicator } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';

const CONTAINER_WIDTH =
  Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2;

export default function AutoHeightImage({ uri }: { uri: string }) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      const ratio = height / width;
      setHeight(CONTAINER_WIDTH * ratio);
    });
  }, [uri]);

  if (!height) {
    return <ActivityIndicator />;
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: CONTAINER_WIDTH, height, resizeMode: 'cover', borderRadius: 16 }}
    />
  );
}
