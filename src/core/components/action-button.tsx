import React, { FunctionComponent } from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import { globalStyle } from '../styles/global-styles';

type actionButtonProps = {
    title: string,
    main?: boolean | true,
    onClick: ((event: GestureResponderEvent) => void) | undefined
}

const ActionButton: FunctionComponent<actionButtonProps> = (props: actionButtonProps) => {
    return (
        <TouchableOpacity
            onPress={props.onClick}

            style={{
                borderRadius: 8,
                borderColor: globalStyle.color.primary,
                backgroundColor: props.main ? globalStyle.color.red : "",
                borderWidth: 1,
                minWidth: 100,
                alignItems: "center",
                padding: globalStyle.padding.MD,
                shadowOffset: { width: 10, height: 20 },
                shadowColor: globalStyle.color.tertiary,
                shadowOpacity: 0.5,
                shadowRadius: 2,
            }}
        >
            <Text
                style={{
                    color: props.main ? "white" : globalStyle.color.red,
                    fontWeight: "600",
                    letterSpacing: 1,
                    fontSize: globalStyle.fontSize.MD
                }}
            >{props.title}
            </Text>
        </TouchableOpacity>
    );
};


export default ActionButton;