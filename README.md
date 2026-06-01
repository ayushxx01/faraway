# Faraway 💌

A shared relationship journaling application where two people can connect using a unique partner code and maintain a daily journal together.

## Overview

Faraway is designed to create a private shared space for couples. Each day generates a new journal page where both partners can write their thoughts, experiences, memories, or reflections. Over time, these entries form a shared timeline of the relationship.

---

## Current Features

### Authentication

* User registration using Firebase Authentication
* User login using email and password
* Protected user-specific data

### Profile Setup

Users create a profile containing:

* Display Name / Username
* Age
* Gender

The system automatically generates a unique partner code.

### Partner Connection System

* Users can share their partner code.
* Entering a valid partner code connects two users.
* Prevents connecting to already-connected users.
* Generates a unique `pairId` for the relationship.

### Relationship Data Model

Users Collection:

```text
users
 └─ uid
      email
      username
      age
      gender
      partnerCode
      isConnected
      connectedTo
      pairId
```

Relationships Collection:

```text
relations
 └─ pairId
      journals
          ├─ 2026-06-01
          ├─ 2026-06-02
          └─ ...
```

### Daily Journal System

When a connected user opens the application:

1. Today's journal is checked.
2. If it does not exist, a new journal document is created.
3. If it exists, the journal is loaded.

Journal document structure:

```json
{
  "date": "2026-06-01",
  "user1Id": "...",
  "user2Id": "...",
  "user1entry": "",
  "user2entry": ""
}
```

### Shared Journal UI

Each partner sees:

* My Journal (editable)
* Partner Journal (read-only)

Users can:

* Write journal entries
* Save updates
* Refresh and retain data
* View partner's latest saved entry

### Firestore Integration

Implemented:

* setDoc
* getDoc
* updateDoc
* document references
* relationship-specific journal storage

---

## Architecture

### Components

```text
AuthPage
 ├─ LoginComp
 └─ RegisterComp

HomePage
 ├─ IsntConnComp
 └─ IsConnComp

IsConnComp
 └─ JournalComp
```

### Relationship Flow

```text
Register/Login
        ↓
Profile Setup
        ↓
Partner Connection
        ↓
Pair Created
        ↓
Daily Journal Created
        ↓
Both Users Write
        ↓
Journal History Builds Over Time
```

---

## Tech Stack

Frontend:

* React
* React Router
* Tailwind CSS

Backend:

* Firebase Authentication
* Cloud Firestore

---

## Future Features

### Journal History

Allow users to browse previous journal entries.

Planned structure:

```text
History
 ├─ Journal Card
 ├─ Journal Card
 ├─ Journal Card
 └─ ...
```

Each card displays:

* Date
* My Entry Preview
* Partner Entry Preview

Clicking a card opens the full journal.

---

### Real-Time Updates

Current:

```text
Partner Saves
      ↓
Refresh Required
      ↓
View Update
```

Planned:

```text
Partner Saves
      ↓
Instant Sync
      ↓
View Update
```

Using Firestore real-time listeners.

---

### AI Relationship Themes

During onboarding, both users answer a set of questions.

Examples:

* Favorite season
* Dream destination
* Favorite movie
* How did you meet?

Responses are combined and sent to an AI model.

The AI generates a unique relationship theme such as:

* Your Name
* Studio Ghibli
* Starry Night
* Mountain Cabin
* Cyberpunk
* Sakura Garden

The relationship space adapts visually to the generated theme.

---

### Relationship Dashboard

Potential additions:

* Relationship streaks
* Anniversary tracker
* Shared goals
* Memory timeline
* Milestone tracking

---

### Notifications

Planned reminders:

* Daily journal reminders
* Missed journal notifications
* Anniversary reminders

---

## MVP Status

Completed:

* Authentication
* Profile creation
* Partner connection
* Pair generation
* Journal creation
* Journal saving
* Firestore persistence

In Progress:

* UI Improvements
* History System

Planned:

* Real-time sync
* AI-generated themes
* Relationship dashboard
* Notifications

---

## Vision

Faraway aims to become more than a journaling app. The long-term goal is to create a personalized digital space where two people can preserve memories, track their journey together, and build a unique shared world that evolves with their relationship.
