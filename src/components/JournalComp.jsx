import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

const JournalComp = ({ journal, currentUserUid, pair, formData, partner }) => {

  const today = new Date().toISOString().split("T")[0]
  const isUser1 = currentUserUid === journal.user1Id

  const [myEntry, setMyEntry] = useState(
    isUser1 ? journal.user1entry : journal.user2entry
  )

  const partnerEntry = isUser1 ? journal.user2entry : journal.user1entry

  const handleSave = async () => {
    const field = isUser1 ? "user1entry" : "user2entry"
    await updateDoc(doc(db, 'relations', pair, 'journals', today), {
      [field]: myEntry
    })
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        .journal-textarea { background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.07); }
        .journal-textarea:focus { outline: none; border-color: rgba(232,228,240,0.18); }
        .journal-textarea::placeholder { color: rgba(232,228,240,0.2); }
      `}</style>

      <div className="flex flex-row flex-wrap gap-4 pt-6 px-4 md:px-8 justify-center">

        {/* My Journal Card */}
        <div className="flex flex-col gap-3 flex-1 min-w-[300px] w-full max-w-2xl rounded-2xl p-5 border border-white/5 bg-[#1a1624]">
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-widest uppercase text-white/30 mb-1">
                My Journal
              </p>
              <h2 className={`text-[26px] font-medium leading-tight ${isUser1 ? 'text-[#e8956d]' : 'text-[#7e9fe8]'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {formData.name}
              </h2>
            </div>
            <span className="text-2xl opacity-70">{isUser1 ? '🌅' : '🌙'}</span>
          </div>

          <textarea
            className="journal-textarea w-full rounded-xl p-4 text-[#e8e4f0] text-sm leading-relaxed resize-none min-h-[200px]"
            value={myEntry}
            onChange={(e) => setMyEntry(e.target.value)}
            placeholder="Write your heart out..."
          />

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className={`text-[11px] font-medium tracking-widest uppercase px-5 py-2 rounded-full border-none cursor-pointer transition-opacity hover:opacity-80
                ${isUser1 ? 'bg-[#e8956d] text-[#1a0f08]' : 'bg-[#7e9fe8] text-[#08101a]'}`}
            >
              Save Entry
            </button>
          </div>
        </div>

        {/* Partner Journal Card */}
        <div className="flex flex-col gap-3 flex-1 min-w-[300px] w-full max-w-2xl rounded-2xl p-5 border border-white/5 bg-[#1a1624]">
          
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-widest uppercase text-white/30 mb-1">
                Partner Journal
              </p>
              <h2 className={`text-[26px] font-medium leading-tight ${isUser1 ? 'text-[#7e9fe8]' : 'text-[#e8956d]'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {partner}
              </h2>
            </div>
            <span className="text-2xl opacity-70">{isUser1 ? '🌙' : '🌅'}</span>
          </div>

          <textarea
            className="journal-textarea w-full rounded-xl p-4 text-[#e8e4f0] text-sm leading-relaxed resize-none min-h-[200px] cursor-default"
            value={partnerEntry}
            readOnly
            placeholder="Their words will appear here..."
          />

          <div className="flex justify-end">
            <span className="text-[11px] font-medium tracking-widest uppercase text-white/20">
              Read only
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default JournalComp
