import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

type ContainerProps = {
  useHeader?: boolean;
  headerTitle?: string;
  isLoading?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  children: React.ReactNode;
}

export default function Container({
  useHeader = false,
  headerTitle,
  isLoading = false,
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
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {!isLoading && children}
    </SafeAreaView>
  );
}