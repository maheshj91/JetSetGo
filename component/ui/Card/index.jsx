import { 
    View, TouchableOpacity, Text, StyleSheet, Image
} from 'react-native';
import moment from 'moment';

const time = require('../../../assets/time.png');
const checked = require('../../../assets/checked.png');
const roundTrip = require('../../../assets/exchange.png');
const oneWay = require('../../../assets/right-arrow.png');

function Card ({item, onPress}) {
  const { displayData, fare } = item;
  const { source, airlines, stopInfo, destination, totalDuration } = displayData;

  const trip = stopInfo === 'Non stop';
  const depTime = moment(source.depTime);
  const flight = `${source.airport.cityCode}-${destination.airport.cityCode}, ${depTime.format('DD MMM')}`;
  const airline = airlines.length > 0 ? airlines[0].airlineName : '';

  return(
      <TouchableOpacity onPress={()=> {onPress(item)}} style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignContent:'space-between'}}>
              <View style={styles.flightContainer}>    
                  <View style={[styles.card, styles.flightCard]}>
                    <Image style={styles.time} source={time}/>
                    <Text style={styles.flight}>{flight}</Text>
                  </View>
              </View>
              <View style={[styles.nonstopContainer]}>
                <Text style={[styles.fare, {fontSize: 10, marginEnd: 12}]}>{airline}</Text>
                <Image style={[styles.check, {tintColor: trip? '#22F709' : "#A3A3A3"}]} source={checked}/>
                <Text style={[styles.flight, trip ? styles.nonStop : styles.stop]}>{stopInfo}</Text>
                <Text style={styles.fare}>₹{fare}</Text>
              </View>
            </View>
              <View style={[styles.detailsContainer, { minHeight: 50 }]}>
                <View style={styles.detailsSubContainer}>
                  <Text style={[styles.flight, {marginHorizontal:0}]}>From</Text>
                  <Text style={styles.codeTitle}>{source.airport.airportCode}</Text>
                  <Text style={styles.nameTitle}>{source.airport.airportName}</Text>
                </View>
                <View style={styles.tripContainer}>
                  <Image style={styles.trip} source={oneWay}/>
                </View>
                <View style={styles.detailsSubContainer}>
                  <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                    <Text style={styles.flight}>Destination</Text>
                    <Text style={styles.codeTitle}>{destination.airport.airportCode}</Text>
                    <Text style={styles.nameTitle}>{destination.airport.airportName}</Text>
                  </View>
                </View>
              </View>
          </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 8,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 3,  // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      card: {
        backgroundColor: '#E5E9E9',
        padding: 8,
        borderRadius: 8,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      description: {
        fontSize: 16,
        color: '#555',
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
      detailsContainer: {
        flexDirection: 'row',
        flex:1,
        marginTop:8,
      },
      detailsSubContainer: {
        flex:1,
      },
      tripContainer: {
        justifyContent:'center', 
        alignItems:'center',
        margin:10
      },
      trip: {
        height: 16, 
        width: 16, 
      },
      codeTitle: {
        fontSize:16,
        marginTop: 5,
        fontWeight:'500',
        color:'black',
      },
      nameTitle: {
        fontSize: 10,
        marginTop: 5,
        fontWeight:'500',
        color:'black',
      },
      check: {
        tintColor: '#22F709',
        height: 12, 
        width: 12, 
      },
      nonstopContainer: {
        flexDirection:'row',
        alignItems:'center'
      },
      nonStop: {
        color:'#095CF7'
      },
      stop: {
        color:'#555555'
      },
      fare: {
        marginStart: 8,
        fontSize: 16,
        fontWeight:'600',
        color:'black',
      },
});

export default Card;