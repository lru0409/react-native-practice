import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginBottom: 25,
  },
  content: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: '50%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  // TODO: login button과 스타일이 겹침. Button 컴포넌트 만들자
  logoutButton: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;