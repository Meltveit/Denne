"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { Message } from "@/lib/types";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";

interface ChatComponentProps {
  params: { id: string };
}

export default function ChatComponent({ params }: ChatComponentProps) {
  const [user, loading] = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as Message))
        .filter(
          (msg) =>
            (msg.senderId === user.uid && msg.receiverId === params.id) ||
            (msg.senderId === params.id && msg.receiverId === user.uid)
        );
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [user, params.id]);

  const handleSendMessage = async () => {
    if (!user || (!newMessage.trim() && !fileUrl)) return;

    await addDoc(collection(db, "messages"), {
      senderId: user.uid,
      receiverId: params.id,
      content: newMessage,
      file: fileUrl || undefined,
      timestamp: Date.now(),
    });

    setNewMessage("");
    setFileUrl(null);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>You must be logged in to view messages.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === user.uid ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    msg.senderId === user.uid ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.file && (
                    <a href={msg.file} target="_blank" rel="noopener noreferrer" className="underline">
                      Download file
                    </a>
                  )}
                  <p className="text-xs mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg"
            />
            <FileUpload onUpload={(url) => setFileUrl(url)} />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}