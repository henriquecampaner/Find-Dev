import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username');

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${githubUsername}` }}
    />
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
