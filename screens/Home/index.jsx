import { useState, useEffect, useLayoutEffect} from 'react';
import { 
    View, Alert, ActivityIndicator, FlatList, 
    TouchableOpacity, Image, StyleSheet, Text, Modal, TextInput,
    Button, Platform, SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import URL from '../../utils/Urls';
import Card from '../../component/ui/Card';
import FilterBar from '../../component/ui/FilterBar';

const search = require('../../assets/search.png');
const checked = require('../../assets/checked.png');

function Home () {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState(false);

    // selected/unselected for Non stop flights
    const [selected, setSelected] = useState(false);

    // selected/unselected and list of available airlines
    const [airlineSelected, setAirlineSelected] = useState(-1);
    const [airlines, setAirlines] = useState([]);

    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('99999');

    const handleMinInputChange = (text) => {
        // Ensure that the input is a number
        const numericValue = text.replace(/[^0-9]/g, '');
        setMinPrice(numericValue);
    };

    const handleMaxInputChange = (text) => {
        // Ensure that the input is a number
        const numericValue = text.replace(/[^0-9]/g, '');
        setMaxPrice(numericValue);
    };

    useEffect(()=> {
        fetchData();
    }, [loading]);

    useEffect(()=> {
        if(data.length > 0) {
            let filterData = [];
            let min = minPrice;
            let max = maxPrice;
            if(minPrice.length === 0) {
                min = '0';
            }

            if(maxPrice.length === 0) {
                max= '99999'
            }
            if (airlineSelected > -1) {
                filterData = fetchFilterData();
                console.log('Filtered data : (filterData)' + filterData.length);
                if((Number(min) > 0) || (Number(max) < 99999)) {
                    filterData = filterData.filter((item) => ((item.fare > Number(min)) && (item.fare <= Number(max))));
                }

                if(selected) {
                    filterData = filterData.filter((item)=> item.displayData.stopInfo === 'Non stop');
                } 
                console.log('Filtered data : (filterData)' + filterData.length);
                setFilteredData(filterData);
            } else  {
                console.log('Filtered data : (selected)')
                filterData = data;

                if((Number(min) > 0) || (Number(max) < 99999)) {
                    filterData = filterData.filter((item) => ((item.fare > Number(min)) && (item.fare <= Number(max))));
                }

                if(selected) {
                    filterData = filterData.filter((item)=> item.displayData.stopInfo === 'Non stop');
                    setFilteredData(filterData);
                }
                setFilteredData(filterData);
            }
            
            if(airlines.length === 0){
                collectAllAirlines();
            }
        }
    }, [data, selected, airlineSelected, minPrice, maxPrice]);

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => {
                return(
                    <TouchableOpacity onPress={() => {navigation.navigate('Request')}}>
                        <Image style={{height: 16, width: 16, tintColor:'white'}} source={search} />
                    </TouchableOpacity>
                );
            },
        });
    }, [navigation]);

    const collectAllAirlines = async () => {
        const code = [];
        const airlineData = [];
        _.map(data, (item)=> _.map(item.displayData.airlines, (airline) => {
            if(!code.includes(airline.airlineCode)) {
                code.push(airline.airlineCode)
                airlineData.push(airline);
            }
        }));
        if(airlineData.length > 0) {
            const sortedPeople = airlineData.slice().sort((a, b) => a.airlineName.localeCompare(b.airlineName));
            setAirlines(sortedPeople);
        }
    };

    function fetchFilterData() {
        console.log('Filtered data : ')
        const airlineData = [];
        const code = airlines[airlineSelected].airlineCode;
        _.map(data, (item)=> _.map(item.displayData.airlines, (airline) => {
            if(code === airline.airlineCode) {
                airlineData.push(item);
            }
        }));
        console.log('Filtered data : ()'+airlineData.length);
        return airlineData;
    };

    const fetchData = async() => {
        fetch(URL, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            }).then((response) => response.json())
            .then((response) => {
                setLoading(false);
                if (response && response.data) {
                    if(response.data.result.length > 0) {
                        setData(response.data.result);
                    } else {
                        Alert.alert('Alert', `User logged in successfully`,[
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {text: 'OK', onPress: () => navigation.navigate(navigationStrings.SPLASH_WITH_SEARCH)},
                        ]);
                    }
                }
            }).catch((error) => {
              setLoading(false);
            });
    };

    const openFilter = () => {
        setFilter(true);
    };

    const onSelected = () => {
        setSelected(!selected);
    }

    const closeFilter = () => {
        setFilter(false);
    };

    function onPress(item) {
        navigation.navigate('Detail', {flightData: item});
    }

    function onClose() {
        closeFilter();
    }

    function refreshData() {
        if(data.length > 0) {
            let filterData = data;
            if(selected) {
                filterData = data.filter((item)=> item.displayData.stopInfo === 'Non stop');
            }
            setFilteredData(filterData);
        }
    }

    function onAirlineSelected(index) {
        if(airlineSelected === index) {
            index = -1;   
        }
        setAirlineSelected(index);
    }

    const renderListItem = ({item}) => {
        return(<Card item={item} onPress={onPress}/>);
    };

    const Divider = () => {
        return <View style={styles.divider} />;
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            {
                loading ? 
                <View style={styles.loader}>
                    <ActivityIndicator/>
                </View>
                :
                <View style={{flex:1}}>
                    <FilterBar openFilter={openFilter} onSelected={onSelected} />
                    <FlatList
                        contentContainerStyle={{paddingBottom: 10}}
                        style={styles.list}
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) => renderListItem(item)}
                    />

                    <Modal
                        animationType="slide" // You can customize the animation type
                        transparent={true}
                        visible={filter}
                        onRequestClose={closeFilter}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.filterTitle, {marginBottom: 10}]}>Filter</Text>
                                <Divider/>
                                <Text style={[styles.filterTitle, {marginVertical: 12}]}>Airlines</Text>
                                { airlines.length > 0 && airlines.map((item, index) => (
                                    <View key={index} style={{
                                        width:'100%', height:'10%', marginVertical:8,
                                        justifyContent:'space-between',
                                        alignItems:'center', paddingHorizontal: 8
                                        }}>
                                        <TouchableOpacity onPress={()=> {onAirlineSelected(index)}}>
                                        <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between',
                                        alignItems:'center',}}>
                                        <Text style={{fontSize: 16}}>
                                            {item.airlineName}
                                        </Text>
                                        <Image  style={{height: 12, width: 12, tintColor:(airlineSelected === index ? 'black': 'white')}}source={checked}/>
                                        </View>
                                        </TouchableOpacity>
                                        <Divider/>
                                    </View>    
                                    ))
                                }
                                <Text style={[styles.filterTitle, {marginTop: 12}]}>Fare</Text>
                                <View style={{
                                    flexDirection:'row', justifyContent:'space-between', alignItems:'center',
                                    width:'100%', marginTop: 12
                                    }}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter a number"
                                        keyboardType="numeric"
                                        value={minPrice}
                                        onChangeText={handleMinInputChange}
                                        maxLength={5}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter a number"
                                        keyboardType="numeric"
                                        value={maxPrice}
                                        onChangeText={handleMaxInputChange}
                                        maxLength={5}
                                    />
                                </View>
                                <Button onPress={onClose} title='Close'/>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#6BA4B8'
    },
    loader: {
        flex: 1,
        justifyContent:'center', 
        alignSelf:'center', 
        alignItems:'center',
    },
    list: {
        marginHorizontal: 16,
    },
    nonstopContainer: {
        flexDirection: 'row',
        justifyContent:'flex-end', 
        alignItems:'flex-end', 
        marginHorizontal: 16, 
        marginTop: 8,
        marginBottom: 3,
        
    },
    selected: {
        color:'#095CF7',
        fontSize: 12,
        fontWeight: '700'
    },
    unselected: {
        color:'#555555',
        fontSize: 12,
        fontWeight: '500'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    modalContent: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, // for Android shadow
        height: Platform.select({
            ios:'37%',
            android: '43%'
        }),
        width:'70%'
    },
    filterTitle: {
        fontSize: 22,
        fontWeight: '700'
    },  
    divider: {
        borderBottomColor: '#555555',
        borderBottomWidth: 1,
        width: '100%', // Adjust the width as needed
    },
    input: {
        height: 30,
        width:'35%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default Home;