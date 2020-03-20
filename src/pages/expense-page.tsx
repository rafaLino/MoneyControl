import React, { Component } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View, Modal, Alert, Text, TouchableHighlight } from 'react-native';
import ExpenseItemView from "../core/components/expense-item-view";
import { Expense } from "../core/models/expense";
import { globalStyle } from "../core/styles/global-styles";
import { expenseService } from "../services/expense-service";


type State = {
    expenses: Array<Expense>,
    loading: boolean,
    modalVisible: boolean
};
export class ExpensePage extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expenses: [],
            loading: true,
            modalVisible: false
        };
    }

    setModalVisible(visible: boolean) {
        this.setState({ modalVisible: visible });
    }

    removeExpenseItem = () => {
        this.setModalVisible(true);
    }

    editExpenseItem = async (item: Expense) => {
        await expenseService.update(item.id, item);
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
                    renderItem={({ item }) => <ExpenseItemView
                        item={item}
                        onRemovePress={this.removeExpenseItem}
                        onEditPress={this.editExpenseItem}
                    >

                    </ExpenseItemView>}
                />
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    presentationStyle="formSheet"
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
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