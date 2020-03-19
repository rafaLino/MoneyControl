import React, { Fragment } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyle } from '../styles/global-styles';

type ExpenseItemViewProps = {
    name: string,
    value: number,
    onRemovePress?: Function
}

type State = {
    btnPressed: boolean,
    inEdition: boolean
}

export default class ExpenseItemView extends React.Component<ExpenseItemViewProps, State> {

    constructor(props: ExpenseItemViewProps) {
        super(props);
        this.state = {
            btnPressed: false,
            inEdition: false
        }
    }
    render() {
        const { name, value, onRemovePress } = this.props;
        const { btnPressed, inEdition } = this.state;
        return (
            <Card containerStyle={styles.card} >
                <SafeAreaView style={styles.container}>
                    <View style={styles.fieldBox}>
                        <Text style={[styles.field]}>{name.toUpperCase()}</Text>
                    </View>
                    {inEdition ?
                        <Fragment>
                            <View style={styles.fieldBox}>
                                <Text style={[styles.field]}>{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => onRemovePress}
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
                                <Text style={[styles.field]}>{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => onRemovePress}
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
        paddingLeft: 12,
        paddingRight: 50
    },
    fieldBox: {
        alignSelf: "center"
    },
    field: {
        fontSize: globalStyle.fontSize.MD,
        fontWeight: "600",
    },
    card: {
        minWidth: Dimensions.get('screen').width,
        borderRadius: 12,

    }
});
