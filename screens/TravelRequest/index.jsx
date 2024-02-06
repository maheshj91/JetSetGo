import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const TravelRequest = () => {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const submitRequest = () => {
    // Implement your logic to submit the travel request
    console.log('Travel request submitted!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Travel Request</Text>

      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Departure Date (YYYY-MM-DD)"
        value={departureDate}
        onChangeText={(text) => setDepartureDate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Return Date (YYYY-MM-DD)"
        value={returnDate}
        onChangeText={(text) => setReturnDate(text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitRequest}>
        <Text style={styles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    width: '100%',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TravelRequest;