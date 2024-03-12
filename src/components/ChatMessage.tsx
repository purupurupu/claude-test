type ChatMessageProps = {
  message: {
    content: string;
  };
  isSender: boolean;
};

export default function ChatMessage({ message, isSender }: ChatMessageProps) {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`${
          isSender ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        } rounded-lg p-3`}
      >
        {message.content}
      </div>
    </div>
  );
}
