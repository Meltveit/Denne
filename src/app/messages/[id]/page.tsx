import { db } from "@/lib/firebase";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { Message } from "@/lib/types";
import ChatComponent from "./ChatComponent";

import type { NextPage } from "next";

type SegmentParams = { id: string };

interface ChatPageProps {
  params: SegmentParams;
}

interface MessageDocument {
  senderId: string;
  receiverId: string;
  content: string;
  file?: string;
  timestamp: number;
}

const ChatPage: NextPage<ChatPageProps> = ({ params }) => {
  return <ChatComponent params={params} />;
};

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "messages"));
  const messageIds = snapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as MessageDocument);

  const uniqueReceiverIds = [...new Set(messageIds.map((msg) => msg.receiverId))].filter(
    (id): id is string => id !== undefined && id !== null
  );

  return uniqueReceiverIds.map((id) => ({
    id,
  }));
}

export const dynamicParams = false;

export default ChatPage;