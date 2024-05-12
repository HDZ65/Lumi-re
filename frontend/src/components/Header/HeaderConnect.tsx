import { AlertAjoutCard } from "../AlertAjoutCard/AlertAjoutCard";
import { Deconnection } from "../Deconnection/Deconnection";

export default function Header() {
    return (
        <header className='flex justify-end items-center px-10 z-50'>
            <div className='flex gap-4 text-xl z-50'>
                <AlertAjoutCard onAdd={() => console.log("Ajout effectué")} />
                <Deconnection />
            </div>
        </header>
    )
}
