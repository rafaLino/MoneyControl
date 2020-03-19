import React, { Component } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import ExpenseItemView from "../core/components/expense-item-view";
import { Expense } from "../core/models/expense";
import { globalStyle } from "../core/styles/global-styles";
import { expenseService } from "../services/expense-service";

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
                <FlatList
                    data={expenses}
                    renderItem={({ item }) => <ExpenseItemView name={item.name} value={item.value}></ExpenseItemView>}
                />
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
        alignItems: 'center'
    }
})