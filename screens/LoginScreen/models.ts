import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/NavKeys";

type LoginScreenProps = {
    route: RouteProp<RootStackParamList, 'LoginScreen'>;
}

type LoginError = {
    email: string,
    password: string
}

export type {
    LoginError,
    LoginScreenProps
}