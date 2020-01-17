import styled from 'styled-components/native';
import MapView, { Callout, Marker } from 'react-native-maps';

export const Container = styled.View``;

export const Map = styled(MapView)`
  flex: 1;
`;

export const MarkMap = styled(Marker)``;

export const Avatar = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 4px;
  border-width: 4px;
  border-color: #fff;
`;

export const DevName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const DevBio = styled.Text`
  color: #666;
  margin-top: 5px;
`;

export const DevTechs = styled.Text`
  margin-top: 5px;
`;

export const DevContainer = styled(Callout)`
  width: 260px;
`;

export const SearchForm = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 50px;
  background: #fff;
  color: #333;
  border-radius: 15px;
  padding: 0 20px;
  elevation: 3;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #7159c1;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;
