import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../styles/components';
import { IoClose, IoChatbubbleEllipses, IoSend } from 'react-icons/io5';
import { useChatContext } from '../contexts/ChatContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContainerProps {
  isOpen: boolean;
}

const ChatContainer = styled.div<ChatContainerProps>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${({ isOpen }) => (isOpen ? '350px' : '60px')};
  height: ${({ isOpen }) => (isOpen ? '500px' : '60px')};
  background: ${({ isOpen }) => (isOpen ? colors.background : 'transparent')};
  border: ${({ isOpen }) => (isOpen ? `2px solid ${colors.accent}` : 'none')};
  border-radius: ${({ isOpen }) => (isOpen ? '15px' : '0')};
  box-shadow: ${({ isOpen }) =>
    isOpen ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none'};
  transition: all 0.3s ease;
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? 'calc(100vw - 40px)' : '60px')};
    height: ${({ isOpen }) => (isOpen ? 'calc(100vh - 100px)' : '60px')};
    bottom: 20px;
    right: 20px;
  }
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  background: ${colors.accent};
  color: ${colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.accentHover || colors.accent};
    transform: scale(1.05);
  }
`;

const ChatHeader = styled.div`
  padding: 15px 20px;
  background: ${colors.accent};
  color: ${colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 13px 13px 0 0;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.white};
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: ${colors.white};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.accent};
    border-radius: 3px;
  }
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  background: ${({ isUser }) => (isUser ? colors.accent : '#f0f0f0')};
  color: ${({ isUser }) => (isUser ? colors.white : colors.background)};
  padding: 12px 16px;
  border-radius: ${({ isUser }) =>
    isUser ? '15px 15px 5px 15px' : '15px 15px 15px 5px'};
  max-width: 80%;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  padding: 15px 20px;
  background: ${colors.white};
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${colors.accent};
  }

  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled.button`
  background: ${colors.accent};
  border: none;
  color: ${colors.white};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${colors.accentHover || colors.accent};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  background: #f0f0f0;
  color: #666;
  padding: 12px 16px;
  border-radius: 15px 15px 15px 5px;
  font-style: italic;
  font-size: 14px;
`;

const WelcomeMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 14px;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #f9f9f9;
`;

interface AIAssistantProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function AIAssistant({
  isOpen: externalIsOpen,
  onToggle,
}: AIAssistantProps = {}) {
  const { isChatOpen, openChat, closeChat } = useChatContext();
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use context state primarily, fall back to external or internal state
  const isOpen = isChatOpen || externalIsOpen || internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (open) {
      openChat();
    } else {
      closeChat();
    }
    if (onToggle) onToggle();
    if (!isChatOpen && externalIsOpen === undefined) setInternalIsOpen(open);
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content:
          data.message || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChatContainer isOpen={isOpen}>
      {!isOpen ? (
        <ChatButton onClick={() => setIsOpen(true)}>
          <IoChatbubbleEllipses />
        </ChatButton>
      ) : (
        <>
          <ChatHeader>
            <ChatTitle>Portfolio Assistant</ChatTitle>
            <CloseButton onClick={() => setIsOpen(false)}>
              <IoClose />
            </CloseButton>
          </ChatHeader>

          <MessagesContainer>
            {messages.length === 0 && (
              <WelcomeMessage>
                👋 Hi! I&apos;m here to help you learn about Mohammed&apos;s
                portfolio. Ask me about his skills, projects, or experience!
              </WelcomeMessage>
            )}

            {messages.map((message, index) => (
              <MessageBubble key={index} isUser={message.role === 'user'}>
                {message.content}
              </MessageBubble>
            ))}

            {isLoading && <TypingIndicator>AI is typing...</TypingIndicator>}

            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer>
            <MessageInput
              type="text"
              placeholder="Ask about Mohammed's portfolio..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <SendButton
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
            >
              <IoSend />
            </SendButton>
          </InputContainer>
        </>
      )}
    </ChatContainer>
  );
}
