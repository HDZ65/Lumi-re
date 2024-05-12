import { AlertLogin } from "../AlerteLogin/AlerteLogin";
import { AlertInscription } from "../AlertInscription/AlertInscription";
export default function HeaderDisconnect() {
    return (
        <header className='flex justify-end items-center px-10 z-50'>
            <div className='flex gap-4 text-xl z-50'>
            <AlertLogin />
            <AlertInscription />
            </div>
        </header>
    )
}