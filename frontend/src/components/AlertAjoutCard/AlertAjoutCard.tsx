import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
} from "../../components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select";
import { toast } from 'react-toastify'; // Assurez-vous d'installer react-toastify si ce n'est pas déjà fait
import axios from 'axios';
import { Button } from '../ui/button';
import { useState } from "react";

function strUcFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface AlertAjoutCardProps {
    onAdd: (siteData: { title: string; description: string; image: string; url: string; category: string }) => void;
}

const formSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    description: z.string().min(1, "La description est requise"),
    image: z.string().min(1, "L'URL de l'image est requise"),
    url: z.string().min(1, "L'URL du site est requise"),
    category: z.string().min(1, "La catégorie est requise"),
});

export function AlertAjoutCard({ onAdd }: AlertAjoutCardProps) {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            url: "",
            category: "",
        },
    });

    const [error, setError] = useState('')

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formattedValues = {
            ...values,
            title: strUcFirst(values.title),
            description: strUcFirst(values.description),
            image: values.image,
            url: values.url,
            category: values.category,
        };
        console.log(formattedValues);
        try {
            onAdd(formattedValues);
            const response = await axios.post('http://localhost:3000/api/card/ajouter', formattedValues);
            console.log('Site ajouté:', response.data);
            toast.success("Nouveau site ajouté");

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

    function handleCancel() {
        form.reset(); // Cette méthode réinitialisera les valeurs du formulaire aux valeurs par défaut
    }


    return (
        <AlertDialog aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <AlertDialogTrigger asChild>
                <button className="bg-primary-500 border border-transparent text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:border hover:border-white z-50" aria-haspopup="dialog">Ajouter un site</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle id="alert-dialog-title">Ajouter les informations du site</AlertDialogTitle>
                    <AlertDialogDescription id="alert-dialog-description">
                        Veuillez entrer les informations du site avant de confirmer. Cette action ajoutera le site à votre bibliothèque.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Titre du site</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            placeholder="Entrez le titre du site"
                                            {...field}
                                            aria-invalid={fieldState.invalid ? "true" : "false"}
                                            aria-describedby="title-error"
                                        />
                                    </FormControl>
                                    {fieldState.error && (
                                        <span id="title-error" style={{ color: 'red' }} aria-live="polite">
                                            {fieldState.error.message}
                                        </span>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="description"
                                            placeholder="Entrez une description du site"
                                            {...field}
                                            aria-invalid={fieldState.invalid ? "true" : "false"}
                                            aria-describedby="description-error"
                                        />
                                    </FormControl>
                                    {fieldState.error && (
                                        <span id="description-error" style={{ color: 'red' }} aria-live="polite">
                                            {fieldState.error.message}
                                        </span>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor="image">URL de l'image</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="image"
                                            placeholder="Entrez l'URL de l'image représentative du site"
                                            {...field}
                                            aria-invalid={fieldState.invalid ? "true" : "false"}
                                            aria-describedby="image-error"
                                        />
                                    </FormControl>
                                    {fieldState.error && (
                                        <span id="image-error" style={{ color: 'red' }} aria-live="polite">
                                            {fieldState.error.message}
                                        </span>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor="url">URL du site</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="url"
                                            placeholder="Entrez l'URL du site (accueil du site)"
                                            {...field}
                                            aria-invalid={fieldState.invalid ? "true" : "false"}
                                            aria-describedby="url-error"
                                        />
                                    </FormControl>
                                    {fieldState.error && (
                                        <span id="url-error" style={{ color: 'red' }} aria-live="polite">
                                            {fieldState.error.message}
                                        </span>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor="category">Catégorie</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue {...field} placeholder="Sélectionnez une catégorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Catégories</SelectLabel>
                                                    {["inspiration", "composants", "tutoriels", "outils", "reference", "securite", "performance", "accessibilite", "design", "developpement", "tests", "actualites"].map((value) => (
                                                        <SelectItem key={value} value={value} onClick={() => form.setValue('category', value)}>
                                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    {fieldState.error && (
                                        <span style={{ color: 'red' }} aria-live="polite">
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
                            <AlertDialogCancel onClick={handleCancel}>Annuler</AlertDialogCancel>
                            <Button className="max-sm:w-full" type="submit">Ajouter</Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}

