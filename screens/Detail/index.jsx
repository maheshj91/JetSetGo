import { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import moment, { duration } from 'moment';

const time = require('../../assets/time.png');
const checked = require('../../assets/checked.png');

function Details () {
    const navigation = useNavigation();
    const route = useRoute();

    const {flightData} = route.params;
    const { displayData, fare } = flightData;
    const { source, airlines, stopInfo, destination, totalDuration } = displayData;

    const trip = stopInfo === 'Non stop';
    const depTime = moment(source.depTime);
    const arrTime = moment(destination.arrTime);
    const flight = `${source.airport.cityCode}-${destination.airport.cityCode}, ${depTime.format('DD MMM')}`;
    const airline = airlines.length > 0 ? airlines[0].airlineName : '';
    const flightNumber = airlines.length > 0 ? airlines[0].flightNumber : '';

    const departure = `${source.airport.airportName},`;
    const arrival = `${destination.airport.airportName},`;
    console.log(`Details is : ${JSON.stringify(flightData)}`);
    
    useLayoutEffect(()=> {
        navigation.setOptions({
            title: `${flight} (${airline})`
        });
    }, [navigation, flightData, source.airport.cityCode, destination.airport.cityCode, depTime, flight, airline]);

    const AirlineDetails = () => {
        return(
            <View style={{width: '100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.label}>Airline Details</Text>
                <View style={[styles.detailsContainer, {width:'100%', marginVertical:10}]}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
                            <Text style={styles.label}>Airline:</Text>
                            <Text style={styles.value}>{airline}</Text>
                        </View>
                        <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                            <Text style={styles.label}>Flight Number:</Text>
                            <Text style={styles.value}>{flightNumber}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const Departure = () => {
        return(
            <View style={{width: '100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.label}>Departure</Text>
                <View style={[styles.detailsContainer, {width:'100%', marginVertical:10, alignItems:'center'}]}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                        <Text style={styles.label}>Departure:</Text>
                        <Text style={styles.label}>Departure Time:</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                        <Text style={styles.value}>{departure}</Text>
                        <Text style={styles.value}>{depTime.format('MMM Do, YYYY')}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                        <Text style={styles.value}>{source.airport.cityName}</Text>
                        <Text style={styles.value}>{depTime.format('dddd')} at {depTime.format('LT')}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const Arrival = () => {
        return(
            <View style={{width: '100%', justifyContent:'center', alignItems:'center'}}>
                <Text style={styles.label}>Destination</Text>
                <View style={[styles.detailsContainer, {width:'100%', marginVertical:10, alignItems:'center'}]}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                        <Text style={styles.label}>Arrival:</Text>
                        <Text style={styles.label}>Arrival Time:</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                        <Text style={styles.value}>{arrival}</Text>
                        <Text style={styles.value}>{arrTime.format('MMM Do, YYYY')}</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                        <Text style={styles.value}>{destination.airport.cityName}</Text>
                        <Text style={styles.value}>{arrTime.format('dddd')} at {arrTime.format('LT')}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const FlightDetails = () => {
        return(
            <View style={{width: '100%', justifyContent:'center', alignItems:'center'}}>
                <Departure/>
                <Arrival/>
            </View>
        );
    };

    return(
    <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View >    
                        <View style={[styles.card, styles.flightCard]}>
                            <Image style={styles.time} source={time}/>
                            <Text style={styles.flight}>{flight}</Text>
                        </View>
                    </View>
                    <View style={{width:'20%'}}>
                        <View style={[styles.card, styles.flightCard]}>
                            <Text style={styles.flight}>{totalDuration}</Text>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginTop: 20}}>
                    <AirlineDetails/>
                    <FlightDetails/>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <Image style={[styles.check, {tintColor: trip? '#22F709' : "#A3A3A3"}]} source={checked}/>
                        <Text style={[styles.fare, trip ? styles.nonStop : styles.stop]}>{stopInfo}</Text>
                    </View>
                    <Text style={styles.fare}>₹{fare}</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:'#6BA4B8'
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    detailsContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'white',
      marginVertical: 5,
    },
    value: {
      fontSize: 16,
      marginBottom: 10,
      color:'white',
    },
    flightContainer: {
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 3,
        width: '33%',
        borderWidth:1,
        borderColor: '#E8E8E8'
    },
    card: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
    },
    flightCard: {
        borderRadius: 3,
        paddingHorizontal: 8, 
        paddingVertical: 3,
        flexDirection:'row',
        alignItems:'center'
    },
    flight: {
        fontSize:10,
        fontWeight:'500',
        color:'#A3A3A3',
        marginHorizontal:3
    },
    time: {
        height: 8, 
        width: 8, 
        tintColor: '#A3A3A3'
    },
    check: {
        tintColor: '#22F709',
        height: 20, 
        width: 20, 
    },
    fare: {
        marginStart: 8,
        fontSize: 20,
        fontWeight:'600',
        color:'white',
      },
  });

export default Details;