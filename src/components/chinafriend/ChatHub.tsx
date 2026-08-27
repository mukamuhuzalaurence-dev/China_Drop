import React from 'react';
import { ChevronRight, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatWindow } from './ChatWindow';

export const ChatHub: React.FC = () => {
  const { chinaFriends, setActiveFriendId, messages } = useApp();
  const [showChat, setShowChat] = React.useState(false);

  if (showChat) return <ChatWindow onBack={() => setShowChat(false)} />;

  return (
    <div className="pb-28 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#0c0d12] px-4 pt-4 pb-3 space-y-3">
        <p className="text-base font-black text-white">China Friend</p>
        <p className="text-xs text-gray-400">Real people in China. Real answers. Get supplier quotes, samples & more.</p>
      </div>

      {/* Rep List */}
      <div className="px-3 pt-3 space-y-2.5">
        {chinaFriends.map(f => {
          const lastMsg = messages[f.id]?.slice(-1)[0];
          const unread = messages[f.id]?.filter(m => m.sender === 'china_friend').length ?? 0;

          return (
            <div
              key={f.id}
              onClick={() => { setActiveFriendId(f.id); setShowChat(true); }}
              className="bg-[#13151f] border border-white/6 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer card-hover press-scale"
            >
              <div className="relative shrink-0">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#13151f] ${
                  f.isOnline ? 'bg-emerald-500' : 'bg-gray-600'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-black text-white truncate">{f.name}</p>
                  {lastMsg && <span className="text-[9px] text-gray-600 shrink-0">{lastMsg.timestamp}</span>}
                </div>
                <p className="text-[10px] text-gray-500 truncate">{lastMsg?.text ?? f.bio}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    f.isOnline ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {f.isOnline ? '● Online' : '○ Offline'}
                  </span>
                  <span className="text-[9px] text-gray-600">· {f.location}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                {unread > 0 && (
                  <span className="bg-[#e50914] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center w-[18px] h-[18px]">
                    {unread}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Start New Chat CTA */}
      <div className="px-3 mt-4">
        <button
          onClick={() => { setActiveFriendId('cf-1'); setShowChat(true); }}
          className="w-full bg-[#e50914] text-white font-black text-sm py-3.5 rounded-2xl shadow-red press-scale flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Start New Chat
        </button>
      </div>
    </div>
  );
};
