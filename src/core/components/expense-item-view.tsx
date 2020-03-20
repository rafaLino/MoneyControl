import React, { Fragment } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyle } from '../styles/global-styles';
import { Expense } from '../models/expense';

type ExpenseItemViewProps = {
    item: Expense,
    onRemovePress: Function,
    onEditPress: Function
}

type State = {
    btnPressed: boolean,
    inEdition: boolean,
    moneyValue: string
}

export default class ExpenseItemView extends React.Component<ExpenseItemViewProps, State> {

    constructor(props: ExpenseItemViewProps) {
        super(props);
        this.state = {
            btnPressed: false,
            inEdition: false,
            moneyValue: this.toCurrency(props.item.value)
        }

    }

    toCurrency(number: number): string {
        return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    submitEdit = (stringValue: string): void => {
        const newValue = parseFloat(stringValue.replace("R$", "").replace(",", "."));
        this.setState({ moneyValue: this.toCurrency(newValue), inEdition: false });
        this.props.item.value = newValue;
        this.props.onEditPress(this.props.item);
    }

    render() {
        const { item, onRemovePress } = this.props;
        const { btnPressed, inEdition, moneyValue } = this.state;
        return (
            <Card containerStyle={styles.card} >
                <SafeAreaView style={styles.container}>
                    <View style={styles.fieldBox}>
                        <Text style={[styles.field]}>{item.name.toUpperCase()}</Text>
                    </View>
                    {inEdition ?
                        <Fragment>
                            <View style={styles.fieldBox}>
                                <TextInput
                                    style={[styles.field]}
                                    maxLength={14}
                                    keyboardType="number-pad"
                                    value={moneyValue}
                                    onChangeText={(text) => this.setState({ moneyValue: text })}
                                    onSubmitEditing={() => this.submitEdit(moneyValue)}
                                    autoFocus={true}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => this.submitEdit(moneyValue)}
                                onPressIn={() => this.setState({ btnPressed: true })}
                                onPressOut={() => this.setState({ btnPressed: false })}
                            >
                                <MaterialCommunityIcons
                                    name={btnPressed ? "check-circle-outline" : "check-circle"}
                                    size={30}
                                    color={globalStyle.color.primary}
                                />
                            </TouchableOpacity>

                        </Fragment>
                        :
                        <Fragment>
                            <View style={styles.fieldBox}>
                                <Text
                                    style={[styles.field]}
                                    onLongPress={() => this.setState({ inEdition: true })}
                                >
                                    {moneyValue}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={(e) => { e.preventDefault(); onRemovePress() }}
                                onPressIn={() => this.setState({ btnPressed: true })}
                                onPressOut={() => this.setState({ btnPressed: false })}
                            >
                                <MaterialCommunityIcons
                                    name={btnPressed ? "minus-circle-outline" : "minus-circle"}
                                    size={30}
                                    color={globalStyle.color.primary}
                                />
                            </TouchableOpacity>
                        </Fragment>
                    }
                </SafeAreaView>
            </Card>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 20
    },
    fieldBox: {
        alignSelf: "center"
    },
    field: {
        fontSize: globalStyle.fontSize.MD,
        fontWeight: "600",
    },
    fieldInput: {
        borderWidth: 1,
        borderColor: "blue"
    },
    card: {
        minWidth: Dimensions.get('screen').width - 100,
        minHeight: 90,
        borderRadius: 12,
    },
    iconButton: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }
});
