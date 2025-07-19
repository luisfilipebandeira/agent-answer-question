import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createRoomSchema = z.object({
    name: z.string().min(3, "O nome da sala é obrigatório"),
    description: z.string().optional(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export const CreateRoomForm = () => {
    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    const queryClient = useQueryClient();

    const { mutateAsync: createRoom } = useMutation({
        mutationFn: async (data: CreateRoomFormData) => {
            const response = await fetch("http://localhost:3333/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }); 

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["create-room"] })
        },
    })

    async function handleCreateRoom(data: CreateRoomFormData) {
        await createRoom(data);
        createRoomForm.reset();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar sala</CardTitle>
                <CardDescription>Crie uma nova sala para começar a fazer perguntas e receber respostas da ia</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
                        <FormField 
                            control={createRoomForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da sala</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite o nome da sala" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={createRoomForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição da sala</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Descrição" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Criar Sala</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}