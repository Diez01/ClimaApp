import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';

export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    const API_KEY = 'd32989e9b34b44f383b191605242102';
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData;
    }
  }, [city]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weather App! ⛅</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your location"
        value={city}
        onChangeText={(text) => {
          setCity(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.weatherText}>Get Weather ☁</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text>City: {weatherData.location.name}🏙</Text>
          <Text>Temperature: {weatherData.current.temp_c}🌡</Text>
          <Text>Description: {weatherData.current.condition.text}🌤</Text>
        </View>
      )}
        <Image source={require('./assets/1.png')} style={{ width: 200, height: 200}}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#84b6f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    marginBottom: 15,
    width: 250,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#2196f3',
    width: 250,
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  weatherContainer: {
    backgroundColor:'#87CEFA',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
});
