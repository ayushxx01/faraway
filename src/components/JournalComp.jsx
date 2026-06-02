import React, { useState } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

const JournalComp = ({ journal, currentUserUid, pair, formData ,partner}) => {

  const today = new Date().toISOString().split("T")[0]
  const isUser1 = currentUserUid === journal.user1Id

  const [myEntry, setMyEntry] = useState(
    isUser1 ? journal.user1entry : journal.user2entry
  )
  const partnerUid = formData.connectedTo;
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
        .journal-textarea:focus { outline: none; border-color: rgba(232,228,240,0.18) !important; }
        .journal-textarea::placeholder { color: rgba(232,228,240,0.2); }
        .save-btn-user1:hover { opacity: 0.85; }
        .save-btn-user2:hover { opacity: 0.85; }
      `}</style>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '18px',
      }}>

        {/* My Journal Card */}
        <div style={{
          background: '#1a1624',
          borderRadius: '16px',
          padding: '22px',
          border: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(232,228,240,0.35)',
                marginBottom: '4px',
              }}>
                My Journal
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '26px',
                fontWeight: 500,
                color: isUser1 ? '#e8956d' : '#7e9fe8',
                lineHeight: 1.1,
              }}>
                {isUser1 ? formData?.name : formData?.partnername}
              </div>
            </div>
            <div style={{ fontSize: '22px', opacity: 0.7 }}>
              {isUser1 ? '🌅' : '🌙'}
            </div>
          </div>

          <textarea
            className="journal-textarea"
            value={myEntry}
            onChange={(e) => setMyEntry(e.target.value)}
            placeholder="Write your heart out..."
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: '10px',
              padding: '16px',
              color: '#e8e4f0',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              lineHeight: 1.7,
              resize: 'none',
              minHeight: '200px',
              width: '100%',
              transition: 'border-color 0.2s',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button
              className={isUser1 ? 'save-btn-user1' : 'save-btn-user2'}
              onClick={handleSave}
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '8px 18px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                background: isUser1 ? '#e8956d' : '#7e9fe8',
                color: isUser1 ? '#1a0f08' : '#08101a',
              }}
            >
              Save Entry
            </button>
          </div>
        </div>

        {/* Partner Journal Card */}
        <div style={{
          background: '#1a1624',
          borderRadius: '16px',
          padding: '22px',
          border: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(232,228,240,0.35)',
                marginBottom: '4px',
              }}>
                Partner Journal
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '26px',
                fontWeight: 500,
                color: isUser1 ? '#7e9fe8' : '#e8956d',
                lineHeight: 1.1,
              }}>
                {partner}
              </div>
            </div>
            <div style={{ fontSize: '22px', opacity: 0.7 }}>
              {isUser1 ? '🌙' : '🌅'}
            </div>
          </div>

          <textarea
            className="journal-textarea"
            value={partnerEntry}
            readOnly
            placeholder="Their words will appear here..."
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.07)',
              borderRadius: '10px',
              padding: '16px',
              color: '#e8e4f0',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              lineHeight: 1.7,
              resize: 'none',
              minHeight: '200px',
              width: '100%',
              cursor: 'default',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(232,228,240,0.2)',
              fontWeight: 500,
            }}>
              Read only
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default JournalComp
