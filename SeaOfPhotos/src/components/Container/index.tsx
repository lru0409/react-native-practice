import { View, Text, ActivityIndicator, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

type ContainerProps = {
  useHeader?: boolean;
  headerTitle?: string;
  headerRight?: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

function BaseContainer({
  useHeader = false,
  headerTitle,
  headerRight,
  isLoading = false,
  isError = false,
  edges = ['top', 'left', 'right'],
  style,
  children,
}: ContainerProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      {useHeader && (
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={20} style={styles.backIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{headerTitle}</Text>
          </View>
          <View style={styles.headerRight}>
            {headerRight}
          </View>
        </View>
      )}
      {isError && (
        <View style={styles.errorContainer}>
          <Icon name='alert-circle' size={46} />
          <Text style={styles.errorText}>
            오류가 발생했습니다.
            {'\n'}
            나중에 다시 시도해주세요.
          </Text>
        </View>
      )}
      {!isError && isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {!isError &&!isLoading && children}
    </SafeAreaView>
  );
}

function Main({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.main, style]}>{children}</View>;
}

function Bottom({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.bottom, style]}>{children}</View>;
}

const Container = Object.assign(BaseContainer, {
  Main,
  Bottom,
});

export default Container;