export async function recordAndSendAudio(language: string, durationMs = 10000) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];

    return await new Promise<string>((resolve) => {
      let finished = false;

      const finish = (result: string) => {
        if (finished) return;
        finished = true;
        stream.getTracks().forEach((track) => track.stop());
        resolve(result);
      };

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onerror = (event) => {
        console.warn("MediaRecorder error", event);
        finish("");
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunks, {
            type: mediaRecorder.mimeType || "audio/webm",
          });
          const formData = new FormData();
          formData.append("file", audioBlob, "recording.webm");

          const langParam = encodeURIComponent(language);
          const response = await fetch(`http://127.0.0.1:8000/transcribe?lang=${langParam}`, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          finish(data.text || "");
        } catch (error) {
          console.warn("Speech transcription request failed", error);
          finish("");
        }
      };

      mediaRecorder.start(100);

      setTimeout(() => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      }, durationMs);
    });
  } catch (error) {
    console.warn("Unable to access microphone", error);
    return "";
  }
}
