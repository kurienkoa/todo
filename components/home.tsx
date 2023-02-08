import Login from "./login";
import Todo from "./todo";
import {useAuth} from "../context/auth";
import {FC, useState} from "react";

const HomeComponent:FC = () => {
    const {currentUser} = useAuth()
    const [dark, setDark] = useState<boolean>(true);
    const handleDarkMode = () => {
        setDark(!dark);
        let html = document.querySelector("html")

        dark
            ? html?.classList.add("dark")
            : html?.classList.remove("dark")

    }
    return (
        <div className='flex flex-col h-screen dark:bg-slate-800 bg-white'>
            <button className='text-black dark:text-white' onClick={handleDarkMode}>
                {dark ? 'dark' : 'white'}
            </button>
            {
                !currentUser?.uid
                    ? <Login/>
                    : <Todo/>
            }
        </div>
    )
}
export default HomeComponent