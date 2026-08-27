import React, { useState } from 'react';
import { ArrowLeft, Plus, Send, ChevronRight, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

type AdminTab = 'overview' | 'drops' | 'orders' | 'messages' | 'team';

export const AdminDashboard: React.FC = () => {
  const { activeDrop, setActiveDrop, orders, sourcingRequests, setActiveTab, chinaFriends, messages, sendMessage } = useApp();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [newKg, setNewKg] = useState(activeDrop.weightCollectedKg);
  const [dropName, setDropName] = useState('China Drop #001');
  const [replyText, setReplyText] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('cf-1');
  const [roles, setRoles] = useState<Record<string,string>>({ 'cf-1': 'China Friend', 'cf-2': 'Senior Sourcing Agent' });

  const TABS: {id: AdminTab; label: string; icon: string}[] = [
    {id:'overview', label:'Home',     icon:'📊'},
    {id:'drops',    label:'Drops',    icon:'📦'},
    {id:'orders',   label:'Orders',   icon:'🧾'},
    {id:'messages', label:'Messages', icon:'💬'},
    {id:'team',     label:'Team',     icon:'👥'},
  ];

  const rate = activeDrop.weightCollectedKg >= 5000 ? 5 : activeDrop.weightCollectedKg >= 2500 ? 6.5 : 8;

  return (
    <div className="flex flex-col h-full overflow-hidden animate-fadeIn">
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🛡️</span>
          <div>
            <p className="text-sm font-black text-white">Admin Panel</p>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">China Drop Operator</p>
          </div>
        </div>
        <button onClick={() => setActiveTab('home')}
          className="flex items-center gap-1 bg-white/8 border border-white/8 text-gray-300 text-[11px] font-bold px-2.5 py-1.5 rounded-xl press-scale">
          <ArrowLeft className="w-3 h-3"/> Exit
        </button>
      </div>

      {/* Tab bar */}
      <div className="shrink-0 flex gap-1.5 px-3 pb-2 overflow-x-auto scrollbar-none">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-none flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl press-scale ${
              tab === t.id ? 'bg-[#e50914] text-white' : 'bg-white/6 text-gray-400 border border-white/6'
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-3 pb-24 space-y-3">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <>
            {/* Key stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                {label:'Buyers', value: activeDrop.buyersJoined.toLocaleString(), icon:'👥', color:'text-blue-400'},
                {label:'Weight', value: `${activeDrop.weightCollectedKg} kg`, icon:'⚖️', color:'text-amber-400'},
                {label:'Freight', value: `$${rate}/kg`, icon:'✈️', color:'text-emerald-400'},
                {label:'Orders', value: orders.length.toString(), icon:'🧾', color:'text-purple-400'},
              ].map(s => (
                <div key={s.label} className="bg-[#13151f] border border-white/6 rounded-2xl p-3 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{s.icon}</span>
                    <span className="text-[10px] text-gray-500 font-bold">{s.label}</span>
                  </div>
                  <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Drop progress */}
            <div className="bg-[#13151f] border border-white/6 rounded-2xl p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-black text-white">Drop Progress</span>
                <span className="text-gray-400">{((activeDrop.weightCollectedKg/5000)*100).toFixed(0)}% of 5,000 kg</span>
              </div>
              <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#e50914] via-amber-400 to-emerald-500 rounded-full transition-all duration-700"
                  style={{width:`${Math.min(100,(activeDrop.weightCollectedKg/5000)*100)}%`}}/>
              </div>
            </div>

            {/* Sourcing requests badge */}
            {sourcingRequests.length > 0 && (
              <button onClick={() => setTab('messages')}
                className="w-full bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3 flex items-center justify-between press-scale">
                <div className="flex items-center gap-2">
                  <span className="text-base">🔔</span>
                  <p className="text-xs font-bold text-amber-400">{sourcingRequests.length} sourcing request{sourcingRequests.length > 1 ? 's' : ''} awaiting reply</p>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-400"/>
              </button>
            )}

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setTab('drops')}
                className="bg-[#13151f] border border-white/6 rounded-2xl p-3 flex flex-col items-center gap-2 press-scale hover:bg-white/5">
                <span className="text-2xl">📦</span>
                <span className="text-[11px] font-bold text-gray-300">Manage Drop</span>
              </button>
              <button onClick={() => setTab('orders')}
                className="bg-[#13151f] border border-white/6 rounded-2xl p-3 flex flex-col items-center gap-2 press-scale hover:bg-white/5">
                <span className="text-2xl">🧾</span>
                <span className="text-[11px] font-bold text-gray-300">View Orders</span>
              </button>
              <button onClick={() => setTab('messages')}
                className="bg-[#13151f] border border-white/6 rounded-2xl p-3 flex flex-col items-center gap-2 press-scale hover:bg-white/5">
                <span className="text-2xl">💬</span>
                <span className="text-[11px] font-bold text-gray-300">Reply Messages</span>
              </button>
              <button onClick={() => setTab('team')}
                className="bg-[#13151f] border border-white/6 rounded-2xl p-3 flex flex-col items-center gap-2 press-scale hover:bg-white/5">
                <span className="text-2xl">👥</span>
                <span className="text-[11px] font-bold text-gray-300">Manage Team</span>
              </button>
            </div>
          </>
        )}

        {/* ── DROPS ── */}
        {tab === 'drops' && (
          <>
            {/* Drop identity */}
            <div className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-white">📦 Drop Details</p>
                <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">ACTIVE</span>
              </div>

              {/* Name */}
              <div>
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Drop Name</label>
                <input value={dropName} onChange={e => setDropName(e.target.value)}
                  className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#e50914] transition"/>
              </div>

              {/* Announcement */}
              <div>
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Drop Announcement</label>
                <textarea rows={2} defaultValue="🚀 China Drop #001 is now open! Add your products before the deadline."
                  className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#e50914] transition resize-none placeholder:text-gray-600"/>
              </div>
            </div>

            {/* Dates & Times */}
            <div className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-3">
              <p className="text-sm font-black text-white">⏰ Schedule</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Opening Date</label>
                  <input type="date" defaultValue="2026-08-20"
                    className="w-full bg-white/6 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-[#e50914]"/>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Opening Time</label>
                  <input type="time" defaultValue="08:00"
                    className="w-full bg-white/6 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-[#e50914]"/>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Closing Date</label>
                  <input type="date" defaultValue="2026-08-30"
                    className="w-full bg-white/6 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-[#e50914]"/>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Closing Time</label>
                  <input type="time" defaultValue="23:59"
                    className="w-full bg-white/6 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-[#e50914]"/>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Departure Date</label>
                  <input type="date" defaultValue="2026-08-28"
                    className="w-full bg-white/6 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-[#e50914]"/>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">ETA Kigali</label>
                  <input type="date" defaultValue="2026-09-03"
                    className="w-full bg-white/6 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white outline-none focus:border-[#e50914]"/>
                </div>
              </div>
            </div>

            {/* Weight & Tiers */}
            <div className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-3">
              <p className="text-sm font-black text-white">⚖️ Weight & Shipping Tiers</p>
              <div>
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Current Collected Weight (kg)</label>
                <div className="flex gap-2">
                  <input type="number" value={newKg} onChange={e => setNewKg(Number(e.target.value))}
                    className="flex-1 bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-bold outline-none focus:border-[#e50914]"/>
                  <button onClick={() => { setActiveDrop(p => ({...p, weightCollectedKg: newKg})); alert(`✅ Weight updated to ${newKg} kg`); }}
                    className="bg-[#e50914] text-white text-xs font-black px-4 rounded-xl press-scale shadow-red-sm">Update</button>
                </div>
                {/* Progress */}
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-[9px] text-gray-500">
                    <span>0 kg</span><span>{newKg} kg</span><span>5,000 kg</span>
                  </div>
                  <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#e50914] via-amber-400 to-emerald-500 rounded-full transition-all"
                      style={{width:`${Math.min(100,(newKg/5000)*100)}%`}}/>
                  </div>
                </div>
              </div>

              {/* Tier configuration */}
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Shipping Tiers</p>
                {[
                  {from:'0',to:'2,499',rate:'$8.00',color:'text-red-400',bg:'bg-red-500/10 border-red-500/20'},
                  {from:'2,500',to:'4,999',rate:'$6.50',color:'text-amber-400',bg:'bg-amber-500/10 border-amber-500/20'},
                  {from:'5,000',to:'∞',rate:'$5.00',color:'text-emerald-400',bg:'bg-emerald-500/10 border-emerald-500/20'},
                ].map(t => (
                  <div key={t.rate} className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${t.bg}`}>
                    <div>
                      <p className={`text-xs font-black ${t.color}`}>{t.rate} /kg</p>
                      <p className="text-[9px] text-gray-500">{t.from} – {t.to} kg collected</p>
                    </div>
                    <input type="number" defaultValue={parseFloat(t.rate.replace('$',''))} step="0.5"
                      className={`w-16 text-right text-xs font-black ${t.color} bg-transparent outline-none border-b border-white/10 pb-0.5`}/>
                  </div>
                ))}
              </div>

              {/* Quick set buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[{v:1200,l:'Tier 1'},{v:3800,l:'Tier 2'},{v:5200,l:'Tier 3'}].map(t => (
                  <button key={t.v} onClick={() => { setNewKg(t.v); setActiveDrop(p => ({...p, weightCollectedKg: t.v})); }}
                    className="bg-white/5 border border-white/8 rounded-xl py-2 text-center press-scale hover:bg-white/8">
                    <p className="text-[10px] font-black text-gray-300">{t.l}</p>
                    <p className="text-[9px] text-gray-600">{t.v.toLocaleString()} kg</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Container & Logistics */}
            <div className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-3">
              <p className="text-sm font-black text-white">🚢 Logistics</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {label:'Container ID',     placeholder:'CN-RW-2026-0812'},
                  {label:'Flight/Vessel',    placeholder:'Kigali Air Cargo RW-902'},
                  {label:'Warehouse',        placeholder:'Yiwu Hub #3'},
                  {label:'Customs Officer',  placeholder:'Kagabo J.'},
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{f.label}</label>
                    <input defaultValue={f.placeholder}
                      className="w-full bg-white/6 border border-white/10 rounded-xl px-2.5 py-2 text-[11px] text-white outline-none focus:border-[#e50914]"/>
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup Hubs */}
            <div className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-2">
              <p className="text-sm font-black text-white">📍 Pickup Hubs</p>
              {['Kigali City Tower','Remera Bus Park','Huye Station','Rubavu Hub','Home/Office Delivery'].map((hub,i) => (
                <div key={hub} className="flex items-center justify-between bg-white/4 rounded-xl px-3 py-2">
                  <p className="text-xs font-bold text-white">{hub}</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 2} className="sr-only peer"/>
                    <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#e50914] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"/>
                  </label>
                </div>
              ))}
            </div>

            {/* Drop status */}
            <div className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-2">
              <p className="text-sm font-black text-white">🚦 Drop Status</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {s:'Open',      c:'emerald'},
                  {s:'Collecting', c:'blue'},
                  {s:'Shipped',   c:'amber'},
                  {s:'Delivered', c:'purple'},
                ].map(({s,c}) => (
                  <button key={s} onClick={() => alert(`Status → ${s}`)}
                    className={`text-[11px] font-bold py-2.5 rounded-xl press-scale border transition bg-${c}-500/10 border-${c}-500/20 text-${c}-400 hover:bg-${c}-500/20`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Save all + New drop */}
            <button onClick={() => alert(`✅ Drop "${dropName}" saved!`)}
              className="w-full bg-[#e50914] text-white font-black text-sm py-3.5 rounded-2xl press-scale shadow-red">
              Save All Changes
            </button>

            <button onClick={() => alert('New drop created!')}
              className="w-full bg-white/4 border border-dashed border-white/15 text-gray-400 font-bold text-xs py-4 rounded-2xl flex items-center justify-center gap-2 press-scale hover:bg-white/6 transition">
              <Plus className="w-4 h-4"/> Create New Drop
            </button>
          </>
        )}


        {/* ── ORDERS ── */}
        {tab === 'orders' && (
          <>
            <p className="text-xs font-black text-white">{orders.length} Orders Total</p>
            {orders.length === 0 ? (
              <div className="bg-[#13151f] border border-white/6 rounded-2xl py-10 flex flex-col items-center gap-2">
                <span className="text-3xl">📭</span>
                <p className="text-sm font-bold text-gray-500">No orders yet</p>
              </div>
            ) : orders.map(o => (
              <div key={o.id} className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-white">Order #{o.id}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{o.createdDate}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">{o.status}</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    {l:'Delivery Hub', v: o.deliveryHub},
                    {l:'Weight',       v: `${o.totalWeightKg} kg`},
                    {l:'Payment',      v: `${o.paymentMethod} · ${o.paymentStatus}`},
                    {l:'Grand Total',  v: `$${o.grandTotalUSD.toFixed(2)}`},
                  ].map(r => (
                    <div key={r.l} className="flex justify-between text-xs">
                      <span className="text-gray-500">{r.l}</span>
                      <span className="text-white font-bold">{r.v}</span>
                    </div>
                  ))}
                </div>
                {/* Items */}
                <div className="border-t border-white/5 pt-2 space-y-1.5">
                  {o.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/4 rounded-xl px-2.5 py-2">
                      <img src={item.product.image} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0"/>
                      <p className="text-[11px] font-bold text-gray-200 flex-1 truncate">{item.product.name}</p>
                      <span className="text-[10px] text-gray-500">×{item.quantity}</span>
                    </div>
                  ))}
                </div>
                {/* Update status */}
                <div className="flex gap-2">
                  {['Purchased','Shipped','Delivered'].map(s => (
                    <button key={s} onClick={() => alert(`Order #${o.id} marked as: ${s}`)}
                      className="flex-1 text-[9px] font-bold bg-white/6 border border-white/8 text-gray-400 py-1.5 rounded-lg press-scale hover:bg-white/10">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── MESSAGES ── */}
        {tab === 'messages' && (
          <>
            {/* Sourcing requests that need reply */}
            {sourcingRequests.length > 0 && (
              <div className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-black text-white">Sourcing Requests</p>
                {sourcingRequests.map(req => (
                  <div key={req.id} className="bg-white/4 rounded-xl p-3 space-y-2">
                    <p className="text-xs font-bold text-white leading-snug">{req.productUrlOrTitle}</p>
                    <p className="text-[10px] text-gray-500">Qty: {req.quantity} pcs{req.notes ? ` · ${req.notes}` : ''}</p>
                    <button
                      onClick={() => { sendMessage('cf-1', `✅ Found it! Factory price: $9.80/unit. MOQ: ${req.quantity} pcs. Sample available. Shall I confirm?`); alert('Reply sent via China Friend chat!'); }}
                      className="w-full bg-emerald-500 text-white text-[11px] font-black py-2 rounded-xl press-scale flex items-center justify-center gap-1">
                      <CheckCircle className="w-3 h-3"/> Send Quote Reply
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Message inbox per friend */}
            <div className="bg-[#13151f] border border-white/6 rounded-2xl p-4 space-y-3">
              <p className="text-xs font-black text-white">Reply as China Friend</p>
              {/* Friend selector */}
              <div className="flex gap-2 overflow-x-auto scrollbar-none">
                {chinaFriends.map(f => (
                  <button key={f.id} onClick={() => setSelectedFriend(f.id)}
                    className={`flex-none flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold press-scale ${
                      selectedFriend === f.id ? 'bg-[#e50914] text-white' : 'bg-white/6 text-gray-400 border border-white/6'
                    }`}>
                    <img src={f.avatar} alt="" className="w-5 h-5 rounded-full object-cover"/>
                    {f.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Last few messages */}
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-none">
                {(messages[selectedFriend] ?? []).slice(-4).map(m => (
                  <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-snug ${
                      m.sender === 'user' ? 'bg-[#e50914]/20 text-gray-200' : 'bg-white/8 text-gray-300'
                    }`}>{m.text}</div>
                  </div>
                ))}
              </div>

              {/* Reply input */}
              <div className="flex gap-2">
                <input
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type reply…"
                  className="flex-1 bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#e50914] placeholder:text-gray-600"
                />
                <button
                  onClick={() => { if(replyText.trim()){ sendMessage(selectedFriend, replyText.trim()); setReplyText(''); }}}
                  className="bg-[#e50914] text-white px-3 rounded-xl press-scale shadow-red-sm">
                  <Send className="w-4 h-4"/>
                </button>
              </div>

              {/* Quick reply chips */}
              <div className="flex flex-wrap gap-1.5">
                {['Noted! Checking now 🔍','Got it, sourcing 🏭','Confirmed ✅','Need more details?'].map(c => (
                  <button key={c} onClick={() => setReplyText(c)}
                    className="text-[9px] font-bold bg-white/6 border border-white/8 text-gray-400 px-2 py-1 rounded-full press-scale">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── TEAM ── */}
        {tab === 'team' && (
          <>
            <p className="text-[10px] text-gray-500 font-bold">Assign roles to each team member</p>
            {chinaFriends.map(f => (
              <div key={f.id} className="bg-[#13151f] border border-white/6 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={f.avatar} alt={f.name} className="w-11 h-11 rounded-full object-cover border-2 border-white/10"/>
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#13151f] ${f.isOnline ? 'bg-emerald-500' : 'bg-gray-600'}`}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-white">{f.name}</p>
                    <p className="text-[10px] text-gray-500">{f.location} · {f.isOnline ? '🟢 Online' : '⚫ Offline'}</p>
                  </div>
                </div>

                {/* Role selector */}
                <div>
                  <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1.5">Role</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['China Friend','Senior Agent','Sourcing Only','Suspended'].map(role => (
                      <button key={role}
                        onClick={() => setRoles(p => ({...p, [f.id]: role}))}
                        className={`text-[10px] font-bold py-2 rounded-xl press-scale transition-all border ${
                          roles[f.id] === role
                            ? role === 'Suspended'
                              ? 'bg-red-500/20 border-red-500/30 text-red-400'
                              : 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400'
                            : 'bg-white/4 border-white/6 text-gray-500 hover:bg-white/8'
                        }`}>
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current role badge */}
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-gray-500">Current: <span className="text-white font-bold">{roles[f.id] ?? 'China Friend'}</span></p>
                  <button
                    onClick={() => alert(`Role saved: ${f.name} → ${roles[f.id]}`)}
                    className="bg-[#e50914] text-white text-[10px] font-black px-3 py-1.5 rounded-xl press-scale shadow-red-sm">
                    Save Role
                  </button>
                </div>
              </div>
            ))}

            {/* Add team member */}
            <button
              onClick={() => alert('Invite a new China Friend via link!')}
              className="w-full bg-white/4 border border-dashed border-white/15 text-gray-400 font-bold text-xs py-4 rounded-2xl flex items-center justify-center gap-2 press-scale hover:bg-white/6 transition">
              <Plus className="w-4 h-4"/> Invite New Team Member
            </button>
          </>
        )}

      </div>
    </div>
  );
};
