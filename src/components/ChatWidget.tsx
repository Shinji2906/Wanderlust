import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

const API_URL = "http://localhost:5092/api/Chat";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Xin chào! Mình là trợ lý AI ảo của Wanderlust. Mình giúp gì được cho bạn?", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userText = message.trim();
    setMessage("");
    
    // Add User message
    const newUserMsg: Message = { id: Date.now(), text: userText, isUser: true };
    setMessages(prev => [...prev, newUserMsg]);
    
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      
      // Add Bot Message
      const newBotMsg: Message = { id: Date.now() + 1, text: data.reply, isUser: false };
      setMessages(prev => [...prev, newBotMsg]);
      
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { id: Date.now() + 1, text: "Đã xảy ra lỗi kết nối với máy chủ AI, xin vui lòng thử lại sau.", isUser: false };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[340px] h-[450px] bg-background border border-border rounded-xl shadow-2xl flex flex-col mb-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-bottom-right">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <h3 className="font-display font-medium text-lg">AI Travel</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-75 transition-opacity">
              <X size={20} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-card/10 flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`max-w-[85%] p-3 font-body text-sm ${msg.isUser ? 'bg-primary text-primary-foreground self-end rounded-2xl rounded-tr-sm shadow-sm' : 'bg-muted text-foreground self-start rounded-2xl rounded-tl-sm shadow-sm'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="max-w-[80%] p-3 font-body text-sm bg-muted text-foreground self-start rounded-2xl rounded-tl-sm animate-pulse shadow-sm">
                AI đang gõ...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-3 border-t border-border bg-background flex gap-2 items-center">
            <input 
              type="text" 
              className="flex-1 bg-transparent border border-input rounded-full px-4 py-2 font-body text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
              placeholder="Nhập yêu cầu..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !message.trim()}
              className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-md"
            >
              <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-105 hover:shadow-xl transition-all"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
