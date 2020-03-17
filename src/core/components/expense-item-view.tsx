import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyle } from '../styles/global-styles';

type ExpenseItemViewProps = {
    name: string,
    value: number
}
const ExpenseItemView: FunctionComponent<ExpenseItemViewProps> = ({ name, value }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.field]}>{name.toUpperCase()}</Text>
            <Text style={[styles.field]}>{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: globalStyle.padding.SS
    },
    field: {
        fontSize: 20,
        fontWeight: "600",

    }
});

export default ExpenseItemView;