import { useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function FilterBar({openFilter, onSelected}) {
    const [filter, setFilter] = useState(false);

    // selected/unselected for Non stop flights
    const [selected, setSelected] = useState(false);

    return(
        <View style={styles.container}>
            <View style={{flex:1}}>
                <TouchableOpacity onPress={openFilter}>
                    <Text style={filter ? styles.selected : styles.unselected}>Filter</Text>
                </TouchableOpacity>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                <TouchableOpacity onPress={()=> {
                    setSelected(!selected)
                    onSelected();
                }}>
                    <Text style={selected ? styles.selected : styles.unselected}>Non Stop</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        color:'white',
        fontSize: 14,
        fontWeight: '700'
    },
});

export default FilterBar;