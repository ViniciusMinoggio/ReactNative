import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from "moment";
import 'moment/locale/pt-br'

import commonStyles from "../commonStyles";
import { TouchableWithoutFeedback } from "react-native";

export default props => {

    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatedDAte = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name='trash' size={30} color='#fff' />
            </TouchableOpacity>
        )
    }
    const getLeftContent = () => {
        return (
            <View style={styles.right}>
                <Icon name='trash' size={20} color='#fff' 
                    style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }

    return (
        <GestureHandlerRootView>
            <Swipeable 
            renderLeftActions={getLeftContent}
            renderRightActions={getRightContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={() => props.onToggleTask(props.id)}>
                        <View style={styles.checkContainer}>
                            {getCheckView(props.doneAt)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={[styles.desc, doneOrNotStyle]} >{props.desc}</Text>
                        <Text style={styles.date}>{formatedDAte}</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null){
        return(
            <View style={styles.done}>
                <Icon name='check' size={20} color='white' />
            </View>
        )
    }else{
        return(
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    }, checkContainer: { width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    }, pending: { height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    }, done: { height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center'
    }, desc: { fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    }, date: { fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    }, right: { backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    }, left: { flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    }, excludeText: { fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        margin: 10
    }, excludeIcon: { marginLeft: 10 }})