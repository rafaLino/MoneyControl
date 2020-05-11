import React from 'react';
import { Dimensions, FlatList, StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Expense } from '../models/expense';
import { globalStyle } from '../styles/global-styles';
import { toCurrencyNumber, toCurrency } from '../utils/to-currency';

type ExpenseItemViewProps = {
    expenses?: Expense[]
}


export default class ExpenseItemView extends React.Component<ExpenseItemViewProps> {

    constructor(props: ExpenseItemViewProps) {
        super(props);

    }


    submitEdit = (stringValue: string): void => {
        const newValue = toCurrencyNumber(stringValue);
    }

    cancelEdition = () => {
        this.setState({ inEdition: false });
    }

    render() {
        const { expenses } = this.props;
        return (
            <Card containerStyle={styles.card}>
                <FlatList
                    data={expenses}
                    renderItem={({ item }) => (
                        <View
                            key={item.id}>
                            <Text>{item.name}________________________ {toCurrency(item.value)}</Text>
                        </View>
                    )}
                />
            </Card>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingHorizontal: 0,
        paddingVertical: 25
    },
    fieldBox: {
        alignSelf: "center",
        paddingHorizontal: globalStyle.padding.MD
    },
    field: {
        fontSize: globalStyle.fontSize.MD,
        fontWeight: "600",
        width: 100,
    },
    card: {
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
