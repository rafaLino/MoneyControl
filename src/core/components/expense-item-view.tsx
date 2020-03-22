import React, { Fragment } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card } from 'react-native-elements';
import { Expense } from '../models/expense';
import { globalStyle } from '../styles/global-styles';
import IconButton from './icon-button';
import { toCurrency } from '../utils/to-currency';

type ExpenseItemViewProps = {
    item: Expense,
    onRemovePress: Function,
    onEditPress: Function
}

type State = {
    inEdition: boolean,
    moneyValue: string
}

export default class ExpenseItemView extends React.Component<ExpenseItemViewProps, State> {

    constructor(props: ExpenseItemViewProps) {
        super(props);
        this.state = {
            inEdition: false,
            moneyValue: toCurrency(props.item.value)
        }

    }


    submitEdit = (stringValue: string): void => {
        const newValue = parseFloat(stringValue.replace("R$", "").replace(",", "."));
        this.setState({ moneyValue: toCurrency(newValue), inEdition: false });
        this.props.item.value = newValue;
        this.props.onEditPress(this.props.item);
    }

    cancelEdition = () => {
        this.setState({ inEdition: false });
    }

    render() {
        const { item, onRemovePress } = this.props;
        const { inEdition, moneyValue } = this.state;
        return (
            <Card containerStyle={styles.card} >
                <SafeAreaView style={styles.container}>
                    <View style={styles.fieldBox}>
                        <Text style={[styles.field]}>{item.name.toUpperCase()}</Text>
                    </View>
                    {inEdition ?
                        <Fragment>
                            <View style={[styles.fieldBox, styles.inputBox]}>
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
                            <IconButton
                                iconName="close-circle"
                                buttonStyle={styles.iconButton}
                                onPress={this.cancelEdition}
                            />
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
                            <IconButton
                                iconName="minus-circle"
                                buttonStyle={styles.iconButton}
                                onPress={(e) => { e.preventDefault(); onRemovePress(item.id) }}
                            />
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
        paddingHorizontal: 0,
        paddingVertical: 20
    },
    fieldBox: {
        alignSelf: "center",
        paddingHorizontal: globalStyle.padding.MD
    },
    field: {
        fontSize: globalStyle.fontSize.MD,
        fontWeight: "600",
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
    },
    inputBox: {
        borderBottomWidth: 1,
        borderColor: globalStyle.color.red,
        borderRadius: 5,
        paddingHorizontal: globalStyle.padding.MD
    }
});
