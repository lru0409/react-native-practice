import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

type ContainerProps = {
  useHeader?: boolean;
  headerTitle?: string;
  isLoading?: boolean;
  isError?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  children: React.ReactNode;
}

export default function Container({
  useHeader = false,
  headerTitle,
  isLoading = false,
  isError = false,
  edges = ['top', 'left', 'right'],
  children,
}: ContainerProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={edges}>
      {useHeader && (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={20} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{headerTitle}</Text>
          </View>
          <View style={styles.headerSpacer} />
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