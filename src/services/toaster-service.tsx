import { ToastAndroid } from "react-native";

export default class ToasterService {
    public static show(message?: string, showDefaultMessage: boolean = true) {
        let finalMessage: string;
        finalMessage = showDefaultMessage ? "Algo de errado aconteceu!\n" : "";
        if (message) {
            finalMessage += ` ${message}`
        }
        ToastAndroid.showWithGravity(
            finalMessage,
            20,
            ToastAndroid.TOP,
        );
    }
}