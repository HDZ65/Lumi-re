import axios from 'axios'

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogHeader,
} from "../../components/ui/alert-dialog";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(50), // Added password field to the schema
})

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../../components/ui/form"

import { Input } from "../../components/ui/input"
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

export function AlertLogin() {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "", // Added password field to default values
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', values);
            console.log('Connexion réussie:', response.data);
            // Vous pouvez ajouter ici une redirection ou une gestion d'état après la connexion réussie
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Erreur lors de la connexion:', error.response?.data);
                // Gérer les erreurs, par exemple afficher un message à l'utilisateur
            } else {
                console.error('Erreur lors de la connexion:', error);
            }
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="bg-primary-500 border border-transparent text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:border hover:border-white z-50 ">Connexion</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold">Connexion</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom d'utilisateur</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nom d'utilisateur" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-black rounded-lg">Annuler</AlertDialogCancel>
                    <AlertDialogAction type="submit">Connexion</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}
