import React, { FunctionComponent } from "react";
import { Dimensions, Modal, Text, View, EventEmitter } from "react-native";
import { globalStyle } from "../styles/global-styles";
import ActionButton from "./action-button";

interface modalOptions {
    isOpen: boolean,
    optionalData?: any
}
type ActionModalProps = {
    modalOptions: modalOptions,
    title: string,
    onAcceptAction: Function,
    onDeniedAction: Function
}


const ActionModal: FunctionComponent<ActionModalProps> = (props) => {
    return (
        < Modal
            animationType="fade"
            visible={props.modalOptions.isOpen}
            transparent
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    width: Dimensions.get('screen').width - 50,
                    maxHeight: 300,
                    borderColor: "white",
                    borderRadius: 12,
                    backgroundColor: "white",
                    top: '30%',
                    left: 25,
                    elevation: 1,
                    shadowColor: "black",
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                    shadowOffset: { height: 12, width: 15 },
                    zIndex: 1
                }}>
                <View
                    style={{
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            color: globalStyle.color.red,
                            fontWeight: "600",
                            fontSize: globalStyle.fontSize.LG
                        }}
                    >{props.title}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        padding: globalStyle.padding.SM,
                        alignItems: 'center'

                    }}>
                    <ActionButton
                        title="SIM"
                        onClick={() => props.onAcceptAction(props.modalOptions.optionalData)}
                    />
                    <ActionButton
                        main
                        title="NÃO"
                        onClick={() => props.onDeniedAction(props.modalOptions.optionalData)}
                    />
                </View>
            </View>
        </Modal >
    );
}
export default ActionModal;