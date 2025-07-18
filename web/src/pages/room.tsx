import { Navigate, useParams } from "react-router-dom";

export function Room() {
    const { roomId } = useParams();

    if (!roomId) {
        return <Navigate to="/" replace />;
    }

    return <div>Room {roomId}</div>
}