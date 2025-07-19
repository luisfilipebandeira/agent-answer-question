import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";

type GetRoomsApiResponse = Array<{
    id: string;
    name: string;
    questionsCount: number;
    createdAt: string;
}>

export const RoomList = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["create-room"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3333/rooms");

            const result: GetRoomsApiResponse = await response.json();

            return result;
        }
    });
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Salas recentes
                </CardTitle>

                <CardDescription>Acesso rapido para as salas criadas recentemente</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
                {isLoading && (<h3>Carregando...</h3>)}

                {data?.map(room => {
                    return (
                        <Link to={`/room/${room.id}`} key={room.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent">
                            <div className="flex-1 flex-col gap-1">
                                <h3 className="font-medium">{room.name}</h3>

                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">{room.questionsCount} perguntas</Badge>
                                </div>
                            </div>

                            <span className="flex items-center gap-1 text-sm">
                                Entrar 
                                <ArrowRight className="size-3"/>
                            </span>
                        </Link>
                    )
                })}
            </CardContent>
        </Card>
    )
}