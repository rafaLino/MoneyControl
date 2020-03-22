import React, { FunctionComponent } from "react";
import { TouchableWithoutFeedback, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyle } from "../styles/global-styles";

type iconButtonProps = {
    iconName: string,
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
    buttonStyle?: StyleProp<ViewStyle>,
    iconStyle?: StyleProp<TextStyle>
}

const IconButton: FunctionComponent<iconButtonProps> = (props: iconButtonProps) => {
    const [pressed, setPressed] = React.useState(false);
    return (
        <TouchableWithoutFeedback
            style={props.buttonStyle}
            onPress={props.onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
        >
            <MaterialCommunityIcons
                style={props.iconStyle}
                name={pressed ? `${props.iconName}-outline` : props.iconName}
                size={30}
                color={globalStyle.color.primary}
            />
        </TouchableWithoutFeedback>
    );
}


export default IconButton;