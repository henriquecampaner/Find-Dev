/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';

import {
  Avatar,
  DevName,
  DevBio,
  DevTechs,
  DevContainer,
  Container,
  Map,
  MarkMap,
  SearchForm,
  Input,
  SubmitButton,
} from './styles';

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, []);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });

    setDevs(response.data.devs);

    setupWebsocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <Map
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <MarkMap
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}
          >
            <Avatar
              source={{
                uri: dev.avatar_url,
              }}
            />
            <DevContainer
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username,
                });
              }}
            >
              <Container>
                <DevName>{dev.name}</DevName>
                <DevBio>{dev.bio}</DevBio>
                <DevTechs>{dev.techs.join(', ')}</DevTechs>
              </Container>
            </DevContainer>
          </MarkMap>
        ))}
      </Map>
      <SearchForm>
        <Input
          placeholder="Search Devs for technology"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <SubmitButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </SubmitButton>
      </SearchForm>
    </>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
