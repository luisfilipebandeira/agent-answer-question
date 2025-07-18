import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsApiResponse = Array<{
    id: string;
    name: string;
}>

export function CreateRoom() {
    const { data, isLoading } = useQuery({
        queryKey: ["create-room"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3333/rooms");

            const result: GetRoomsApiResponse = await response.json();

            return result;
        }
    });

    return (
        <div>
            <div>create room</div>

            {isLoading && <span>Loading...</span>}
            
            <div className="flex flex-col gap-1">
                {data && data.map(room => (
                <div key={room.id}>
                    <Link to={`/room/${room.id}`}>{room.name}</Link>
                </div>
            ))}
            </div>

            <Link to="/create-room">Acessar sala</Link>
        </div>
    )
}