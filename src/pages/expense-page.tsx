import React, { Component } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { Expense } from "../core/models/expense";
import { expenseService } from "../services/expense-service";
import { globalStyle } from "../core/styles/global-styles";
import { Card } from 'react-native-elements';
import ExpenseItemView from "../core/components/expense-item-view";

type State = { expenses: Array<Expense>, loading: boolean };
export class ExpensePage extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = { expenses: [], loading: true };
    }

    componentDidMount() {
        const unsubscribe = expenseService
            .collection()
            .onSnapshot((querySnapShot) => {
                const list: Expense[] = querySnapShot.docs.map((document) => {
                    return {
                        ...document.data() as Expense,
                        id: document.id
                    };
                });
                this.setState({
                    expenses: list
                });

                if (this.state.loading) {
                    this.setState({ loading: false })
                }
            }, (error) => console.log(error)
            );

        return () => unsubscribe();
    }

    render() {
        const { loading, expenses } = this.state;

        if (loading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color={globalStyle.color.loader} />
                </View>
            );
        }
        return (
            <SafeAreaView style={[styles.container, styles.horizontal, styles.center]}>
                <Card containerStyle={styles.card} >
                    <FlatList
                        data={expenses}
                        renderItem={({ item }) => <ExpenseItemView name={item.name} value={item.value}></ExpenseItemView>}
                    />
                </Card>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: globalStyle.padding.SM

    },
    center: {
        alignItems: 'center',
        padding: 50,
        bottom: 0
    },
    card: {
        minHeight: 500,
        minWidth: 350,
        padding: globalStyle.padding.SM,
        borderRadius: 8

    }
})