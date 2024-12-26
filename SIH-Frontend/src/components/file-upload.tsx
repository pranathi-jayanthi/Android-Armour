"use client";

import { useCallback, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { dbAndroidZipInsert } from "@/service/android";
import { useRouter } from "next/navigation";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [progress, setProgress] = useState(0);
  const { data } = useSession();
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/zip": [".zip"],
      "application/apk": [".apk"],
    },
  });

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercentage);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          const userId = data?.user.id;

          if (!userId) {
            return;
          }

          const androidZip = await dbAndroidZipInsert(url, file.name);

          fetch("http://0.0.0.0:8000/process-zip", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: androidZip?.id,
              filename: androidZip?.filename,
              originalUrl: androidZip?.originalUrl,
              progress: androidZip?.progress,
              error: androidZip?.error,
              updatedUrl: androidZip?.updatedUrl,
              userId: androidZip?.userId,
            }),
          });

          setUploading(false);

          router.push("/detailed-view");
        });
      }
    );
  };

  return (
    <div className="flex justify-center min-h-[92vh] bg-gray-100 p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upload Android Zip File</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[60vh]">
          <div
            {...getRootProps()}
            className="border-2 border-dashed mt-10 border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center h-48">
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              {isDragActive ? (
                <p className="text-lg text-gray-600">Drop the file here ...</p>
              ) : (
                <>
                  <p className="text-lg text-gray-600 mb-1">
                    Drag &amp; drop a file here, or click to select a file
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported file types: ZIP
                  </p>
                </>
              )}
              {file && (
                <p className="mt-4 text-sm text-primary">
                  Selected file: {file.name}
                </p>
              )}
            </div>
          </div>

          {uploading && (
            <div className="mt-4">
              <Progress value={progress} />
              <p className="text-sm text-gray-700 mt-2">
                {Math.round(progress)}% done
              </p>
            </div>
          )}

          {downloadURL && (
            <p className="mt-4 text-green-500">
              File uploaded! Download URL:{" "}
              <a href={downloadURL} className="text-blue-500 underline">
                {downloadURL}
              </a>
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleUpload} disabled={uploading || !file}>
            {uploading ? "Uploading..." : "Upload File"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
