import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyle } from '../styles/global-styles';

type ExpenseItemViewProps = {
    name: string,
    value: number,
    onEditLongPress?: Function,
    onRemovePress?: Function
}

export default class ExpenseItemView extends React.Component<ExpenseItemViewProps> {
    render() {
        const { name, value, onEditLongPress, onRemovePress } = this.props;

        return (
            <Card containerStyle={styles.card} >
                <SafeAreaView style={styles.container}>
                    <View>
                        <Text style={[styles.field]}>{name.toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text style={[styles.field]}>{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                    </View>
                    <MaterialCommunityIcons
                        name="square-edit-outline"
                        size={20}
                        color={globalStyle.color.primary}
                        onLongPress={() => onEditLongPress}
                    />
                    <MaterialCommunityIcons
                        name="minus-circle" w
                        size={20}
                        color={globalStyle.color.primary}

                        onPress={() => onRemovePress}
                    />
                </SafeAreaView>
            </Card>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    field: {
        fontSize: 20,
        fontWeight: "600",
    },
    card: {
        padding: globalStyle.padding.SM
    }
});
