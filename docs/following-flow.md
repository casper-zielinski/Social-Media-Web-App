# Following Flow

## Firestore Struktur

```
users/
  {userTableId}/
    following/         ← Liste der User denen ich folge
      {docId}: { email, name, username, userTableId: toFollowUserId }

    followers/         ← Liste der User die mir folgen
      {docId}: { email, name, username, userTableId: followerUserId }

    followingPostFeed/ ← Kopien der Posts von Usern denen ich folge
      {docId}: { ...postData, originalPostId }

posts/
  {postId}: { text, name, username, userFromUserTableId, timeStamp, likes, ... }
```

---

## lib/follow.ts — `followUser(user, toFollowUserId)`

Die Funktion ist Toggle: ein Aufruf folgt, der nächste entfolgt.

### 1. Daten laden

```ts
const followerDoc = getDoc(users / toFollowUserId)   // Profil des zu-followenden Users
const userDoc     = getDoc(users / user.userTableId) // Eigenes Profil
const userFollowingDocs = getDocs(users / user.userTableId / following) // Wen folge ich schon?
const existingPosts     = getDocs(posts where userFromUserTableId == toFollowUserId) // Seine Posts
```

### 2. Bereits-Folgen Check

```ts
const alreadyFollowing = userFollowingDocs
  .filter(val => val.data().email === followerDoc.data()?.email)
  .length > 0;
```

Sucht in der eigenen `following`-Collection ob die E-Mail des Ziel-Users schon vorkommt.

---

### Fall A: Unfollow (alreadyFollowing === true)

Drei Lösch-Operationen:

| Was | Wo |
|---|---|
| Seine Posts aus meinem Feed | `users/{meinId}/followingPostFeed` where `userFromUserTableId == toFollowUserId` |
| Mein Eintrag bei seinen Followers | `users/{toFollowUserId}/followers` where `userTableId == meinId` |
| Sein Eintrag in meiner Following-Liste | `users/{meinId}/following` where `userTableId == toFollowUserId` |

---

### Fall B: Follow (alreadyFollowing === false)

Drei Schreib-Operationen:

| Was | Wo |
|---|---|
| Mich als Follower bei ihm eintragen | `users/{toFollowUserId}/followers` ← meine Userdaten |
| Ihn in meine Following-Liste | `users/{meinId}/following` ← seine Userdaten |
| Alle seine bestehenden Posts in meinen Feed kopieren | `users/{meinId}/followingPostFeed` ← je eine Kopie pro Post |

> Neue Posts die er nach dem Follow schreibt werden separat in `lib/post.ts` direkt in die `followingPostFeed` aller seiner Follower geschrieben.

---

## PostFeed — Wie weiß die UI wem ich folge?

### 1. `followingIds` State (für den Follow-Button)

```ts
// PostFeed.tsx
const [followingIds, setFollowingIds] = useState<string[]>([]);

onSnapshot(users / user.userTableId / following, (snap) =>
  setFollowingIds(snap.docs.map(d => d.data().userTableId))
)
```

Ein **Echtzeit-Listener** auf `following`. Jedes Mal wenn sich die Collection ändert (follow/unfollow), wird `followingIds` neu gesetzt — ein Array mit den `userTableId`s aller gefolgten User.

Der FollowButton bekommt dann:
```tsx
<FollowButton
  isFollowing={followingIds.includes(post.data().userFromUserTableId)}
/>
```

### 2. `postsFollowing` State (der Feed-Inhalt)

```ts
// lib/get.ts — subscribeToPostsFeed()
onSnapshot(users / user.userTableId / followingPostFeed, (snap) =>
  setPostsFollowing(snap.docs)
)
```

Ein **Echtzeit-Listener** auf `followingPostFeed`. Da beim Follow alle Posts kopiert und beim Unfollow alle gelöscht werden, spiegelt diese Collection immer genau die Posts der gefolgten User wider.

### 3. Tab-Auswahl

```ts
// PostFeed.tsx
const showPosts = navigationPagerForYou ? posts : postsFollowing;
```

`navigationPagerForYou = true` → "For You" Feed (alle Posts)
`navigationPagerForYou = false` → "Following" Feed (nur `postsFollowing`)
