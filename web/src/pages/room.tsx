import { QuestionForm } from "@/components/question-form";
import { QuestionItem } from "@/components/question-item";
import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

export function Room() {
    const { roomId } = useParams();

    if (!roomId) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <div className="mb-8">
                    <div className="mb-4 flex items-center justify-between">
                        <Link to="/">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 size-4" />
                                Voltar ao inicio
                            </Button>
                        </Link>
                        <Link to={`/room/${roomId}/audio`}>
                            <Button variant="secondary" className="flex items-center gap-2">
                                <Radio className="size-4" />
                                Gravar Audio
                            </Button>
                        </Link>
                    </div>
                    <h1 className="mb-2 font-bold text-3xl text-foreground">
                        Sala de Perguntas
                    </h1>
                    <p className="text-muted-foreground mb-4">
                        Faça perguntas e receba respostas com IA
                    </p>

                    <QuestionForm roomId={roomId} />
                </div>

                <QuestionList roomId={roomId} />
            </div>
        </div>
    )
}