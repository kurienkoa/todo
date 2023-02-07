import Login from "./login";
import Todo from "./todo";
import {useAuth} from "../context/auth";
import {FC} from "react";

const HomeComponent:FC = () => {
    const {currentUser} = useAuth()

    return (
        <>
            {
                !currentUser?.uid
                    ? <Login/>
                    : <Todo/>
            }
        </>
    )
}
export default HomeComponent