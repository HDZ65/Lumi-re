import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogHeader,
} from "../../components/ui/alert-dialog";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../../components/ui/form"

import { Input } from "../../components/ui/input"
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import axios from 'axios'
import { Button } from "../ui/button";
import {  useState } from "react";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Le nom d'utilisateur doit contenir au moins 2 caractères",
    }).max(50, {
        message: "Le nom d'utilisateur ne peut pas dépasser 50 caractères",
    }),
    password: z.string().min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
    }).max(50, {
        message: "Le mot de passe ne peut pas dépasser 50 caractères",
    }),
    email: z.string().email({
        message: "Veuillez entrer une adresse e-mail valide.",
    }),
})

export function AlertInscription() {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    })

    const [error, setError] = useState('')

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Convertir tous les champs en minuscules sauf le mot de passe
        const formattedValues = {
            ...values,
            username: values.username.toLowerCase(),
            email: values.email.toLowerCase(),
        };
        console.log(formattedValues);
        try {
            const response = await axios.post('http://localhost:3000/api/user/register', formattedValues);
            console.log('Inscription réussie:', response.data);
            // Vous pouvez ajouter ici une redirection ou une gestion d'état après l'inscription réussie
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.error)
            
                console.error('Erreur lors de l\'inscription:', error.response?.data);
                // Gérer les erreurs, par exemple afficher un message à l'utilisateur
            } else {
                console.error('Erreur lors de l\'inscription:', error);
            }
        }
    }

    // Fonction pour réinitialiser le formulaire
    function handleCancel() {
        form.reset(); // Cette méthode réinitialisera les valeurs du formulaire aux valeurs par défaut
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="bg-primary-500 border border-transparent text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:border hover:border-white z-50 ">Inscription</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold">Créer un compte</AlertDialogTitle>
                    
                </AlertDialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor="username">Nom d'utilisateur</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="username"
                                            autoComplete="username"
                                            placeholder="Nom d'utilisateur"
                                            aria-invalid={fieldState.invalid ? "true" : "false"}
                                            aria-describedby={fieldState.error ? "username-error" : undefined}
                                            {...field}
                                        />
                                    </FormControl>
                                    {fieldState.error && (
                                        <span id="username-error" style={{ color: 'red' }}>
                                            {fieldState.error.message}
                                        </span>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Adresse mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            autoComplete="email"
                                            placeholder="exemple@exemple.com"
                                            aria-invalid={fieldState.invalid ? "true" : "false"}
                                            aria-describedby={fieldState.error ? "email-error" : undefined}
                                            {...field}
                                        />
                                    </FormControl>
                                    {fieldState.error && (
                                        <span id="email-error" style={{ color: 'red' }}>
                                            {fieldState.error.message}
                                        </span>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            autoComplete="current-password"
                                            type="password"
                                            placeholder="********"
                                            aria-invalid={fieldState.invalid ? "true" : "false"}
                                            aria-describedby={fieldState.error ? "password-error" : undefined}
                                            {...field}
                                        />
                                    </FormControl>
                                    {fieldState.error && (
                                        <span id="password-error" style={{ color: 'red' }}>
                                            {fieldState.error.message}
                                        </span>
                                    )}
                                </FormItem>
                                
                            )}
                            
                        />
                        <AlertDialogFooter className=" items-center">
                           
                         {error && (
                                <div id="email-error" style={{ color: 'red' }}>
                                    {error}
                                </div>
                            )}
                            <AlertDialogCancel type="button" className="text-black rounded-lg max-sm:w-full " onClick={handleCancel}>Annuler</AlertDialogCancel>
                            <Button className="max-sm:w-full" type="submit">S'inscrire</Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
