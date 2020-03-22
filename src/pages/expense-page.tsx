import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import ActionModal from "../core/components/action-modal";
import ExpenseItemView from "../core/components/expense-item-view";
import IconButton from "../core/components/icon-button";
import { Expense } from "../core/models/expense";
import { modelBase } from "../core/models/model-base";
import { globalStyle } from "../core/styles/global-styles";
import { toCurrencyNumber } from "../core/utils/to-currency";
import { expenseService } from "../services/expense-service";
import ToasterService from "../services/toaster-service";


type State = {
    expenses: Array<Expense>,
    loading: boolean,
    showModal: boolean,
    data?: any,
    newExpense?: Expense
};
export class ExpensePage extends Component<{}, State> {

    private _newExpense: Expense;
    private _isMounted: boolean;
    private _unsubscribe?: Function;
    private _nameTextInput: TextInput | null = null;
    private _valueTextInput: TextInput | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            expenses: [],
            loading: true,
            showModal: false
        };

        this._newExpense = { id: "", name: "", value: 0 };
        this._isMounted = false;
    }



    removeExpenseItem = (id: string) => {
        this.openModal({ id });
    }

    confirmRemove = async (data: modelBase) => {
        try {
            await expenseService.delete(data.id);
        } catch (error) {
            ToasterService.show("Tente novamente mais tarde.");
        }
        finally {
            this.closeModal();
        }
    }

    editExpenseItem = async (item: Expense) => {
        try {

            await expenseService.update(item.id, item);

        } catch (error) {
            ToasterService.show("Tente novamente mais tarde.");
        }
        finally {
            this.closeModal();
        }
    }

    addExpense = async (item: Expense) => {
        try {
            if ((item.name == "" || item.name == null || item.name == undefined) ||
                (item.value == 0 || item.value == null || item.value == undefined))
                throw new Error("Preencha as informações da Despesa");
            await expenseService.create(item);
            this.clearNewExpense();
        } catch (error) {
            ToasterService.show((error as Error).message)
        }
    }

    clearNewExpense = () => {
        delete this._newExpense.name;
        delete this._newExpense.value;
        this._nameTextInput && this._nameTextInput.clear();
        this._valueTextInput && this._valueTextInput.clear();
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    openModal = (data: any) => {
        this.setState({ showModal: true, data });
    }

    getExpenses(): void {
        this._unsubscribe = expenseService
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
            }, (error) => {
                ToasterService.show((error as Error).message);
                this._unsubscribe && this._unsubscribe();
            }
            );
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.getExpenses();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this._unsubscribe && this._unsubscribe();
    }


    render() {
        const {
            loading,
            expenses,
            showModal,
            data
        } = this.state;

        if (loading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color={globalStyle.color.loader} />
                </View>
            );
        }
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.inputBox}>
                        <View>
                            <TextInput
                                style={styles.addInput}
                                placeholder="Adicione uma nova despesa"
                                placeholderTextColor={globalStyle.color.grey}
                                onChangeText={(text) => this._newExpense.name = text}
                                ref={(input) => this._nameTextInput = input}
                                onSubmitEditing={() => this._valueTextInput?.focus()}
                            />
                            <TextInput
                                style={styles.addInput}
                                placeholder="Adicione o valor"
                                placeholderTextColor={globalStyle.color.grey}
                                keyboardType="number-pad"
                                onChangeText={(text) => this._newExpense.value = toCurrencyNumber(text)}
                                ref={(input) => this._valueTextInput = input}
                            />
                        </View>
                        <IconButton
                            iconName="plus-circle"
                            onPress={() => this.addExpense(this._newExpense)}
                            iconStyle={{ textAlign: "right", paddingLeft: 20 }}
                        />
                    </View>

                    <SafeAreaView style={styles.horizontal}>
                        <FlatList
                            data={expenses}
                            renderItem={({ item }) => (
                                <ExpenseItemView
                                    key={item.id}
                                    item={item}
                                    onRemovePress={this.removeExpenseItem}
                                    onEditPress={this.editExpenseItem}
                                />)}
                        />
                        <ActionModal
                            modalOptions={{ isOpen: showModal, optionalData: data }}
                            title="Você deseja remover este item?"
                            onAcceptAction={this.confirmRemove}
                            onDeniedAction={this.closeModal}
                        />
                    </SafeAreaView>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: globalStyle.padding.MD,
        paddingTop: '20%'
    },
    horizontal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: globalStyle.padding.SM
    },
    addInput: {
        borderWidth: 1,
        borderColor: globalStyle.color.primary,
        borderRadius: 10,
        minWidth: Dimensions.get('screen').width - 150,
        paddingHorizontal: globalStyle.padding.MD,
        paddingTop: globalStyle.padding.MD,
        marginBottom: 12
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center"
    }
})