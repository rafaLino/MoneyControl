import React, { Component } from "react";
import {View, Text } from 'react-native';

export class ExpensePage extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Expense Page!</Text>
            </View>
        );
    }
}
