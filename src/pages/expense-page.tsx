import React, { Component } from "react";
import { Text, FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Expense } from "../core/models/expense";
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
                    <ActivityIndicator size="large" color="#ff0000" />
                </View>
            );
        }
        return (
            <FlatList
                data={expenses}
                renderItem={({ item }) => <Text>{item.id} - {item.name} : {item.value}</Text>}
            />

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
        padding: 10
    }
})