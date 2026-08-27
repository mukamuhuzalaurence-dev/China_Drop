import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Send, Smile, Paperclip, MoreVertical } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatWindow: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { chinaFriends, activeFriendId, messages, sendMessage } = useApp();
  const friend = chinaFriends.find(f => f.id === activeFriendId)!;
  const msgs = messages[activeFriendId] ?? [];
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs.length]);

  const promptChips = ['Can you quote bulk price?', 'I need 100 units', 'Quality inspection?', 'What\'s the sample cost?'];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-fadeIn">
      {/* Header */}
      <div className="bg-[#0c0d12] border-b border-white/6 px-4 py-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-1.5 rounded-xl bg-white/8 hover:bg-white/12 text-white press-scale">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="relative">
          <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
          {friend.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0c0d12]" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white truncate">{friend.name}</p>
          <p className="text-[10px] text-emerald-400 font-medium">{friend.isOnline ? '● Online' : '○ Offline'} · {friend.location}</p>
        </div>
        <div className="flex gap-1">
          <button className="p-2 rounded-xl bg-white/8 text-gray-400 press-scale"><Phone className="w-4 h-4" /></button>
          <button className="p-2 rounded-xl bg-white/8 text-gray-400 press-scale"><MoreVertical className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Bio chip */}
      <div className="px-4 py-2 bg-[#0c0d12] shrink-0">
        <div className="bg-[#13151f] border border-white/6 rounded-xl px-3 py-2 flex items-center gap-2">
          <span className="text-base">✅</span>
          <p className="text-[10px] text-gray-400 font-medium">{friend.bio}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-none bg-[#0c0d12] px-4 py-3 space-y-3">
        {msgs.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {m.sender !== 'user' && (
              <img src={friend.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-auto" />
            )}
            <div className={`max-w-[80%] space-y-1.5`}>
              {m.attachment && (
                <div className="bg-[#13151f] border border-white/8 rounded-2xl overflow-hidden">
                  <img src={m.attachment.image} alt={m.attachment.title} className="w-full h-28 object-cover" />
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-white">{m.attachment.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">${m.attachment.priceUSD?.toFixed(2)}/unit · MOQ: {m.attachment.moq} pcs</p>
                  </div>
                </div>
              )}
              {m.text && (
                <div className={`px-3.5 py-2.5 rounded-2xl text-xs font-medium leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#e50914] text-white rounded-br-md'
                    : 'bg-[#1a1c28] text-gray-100 rounded-bl-md border border-white/6'
                }`}>
                  {m.text}
                </div>
              )}
              <p className="text-[9px] text-gray-600 px-1">{m.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none bg-[#0c0d12] shrink-0">
        {promptChips.map(chip => (
          <button
            key={chip}
            onClick={() => sendMessage(activeFriendId, chip)}
            className="flex-none text-[10px] font-bold text-gray-300 bg-white/8 hover:bg-white/12 border border-white/8 px-3 py-1.5 rounded-full press-scale whitespace-nowrap"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pt-2 pb-3 bg-[#0c0d12] border-t border-white/6 flex items-center gap-2 shrink-0">
        <button className="p-2 text-gray-500 press-scale"><Paperclip className="w-4 h-4" /></button>
        <div className="flex-1 bg-[#13151f] border border-white/8 rounded-2xl flex items-center px-3.5 py-2.5 gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && text.trim()) { sendMessage(activeFriendId, text.trim()); setText(''); }}}
            placeholder="Type a message…"
            className="flex-1 text-xs text-gray-200 bg-transparent outline-none placeholder:text-gray-600"
          />
          <Smile className="w-4 h-4 text-gray-500 shrink-0" />
        </div>
        <button
          onClick={() => { if (text.trim()) { sendMessage(activeFriendId, text.trim()); setText(''); }}}
          className="w-9 h-9 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-red-sm press-scale"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
