import { Text } from 'react-native';

import { Container } from '@src/components';

export default function CollectionCreationScreen() {
  return (
    <Container
      useHeader={true}
      headerTitle='Create Collection'
    >
      <Text>Create Collection Screen</Text>
    </Container>
  )
}