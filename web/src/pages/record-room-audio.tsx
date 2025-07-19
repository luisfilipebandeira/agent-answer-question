import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { useParams } from "react-router-dom";

const isRecordingSupported = !!navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function' && typeof window.MediaRecorder === 'function';


export const RecordRoomAudio = () => {
    const params = useParams()

    const [isRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)

    function stopRecording() {
        setIsRecording(false)

        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
        }
    }

    async function uploadAudio(audio: Blob) {
        const formData = new FormData()

        formData.append('file', audio, 'audio.webm')

        const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
            method: 'POST',
            body: formData
        })

        const result = await response.json()

        console.log(result)
    }

    async function startRecording() {
        if (!isRecordingSupported) {
            alert("Gravação de áudio não é suportada neste navegador.")
            return
        }

        setIsRecording(true)

        const audio = await navigator.mediaDevices.getUserMedia({ audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
        } })

        recorder.current = new MediaRecorder(audio, {
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64000, // 64 kbps
        })

        recorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                uploadAudio(event.data)
            }
        }

        recorder.current.onstart = () => {
            console.log("Gravação iniciada")
        }

        recorder.current.onstop = () => {
            setIsRecording(false)
            console.log("Gravação parada")
        }

        recorder.current.start()
    }

    return (
        <div className="h-screen flex items-center justify-center gap-3 flex-col">
            <Button onClick={isRecording ? stopRecording : startRecording}>Gravar audio</Button>
            {isRecording ? <p>Gravando...</p> : <p>Pressione o botão para gravar</p>}
        </div>
    )
}