# 📋 ToDo App 

A **ToDo App** built with **Next.js** and **TypeScript**. The app features a card-based layout for managing tasks, with functionality for adding, editing, deleting, searching, and batch deleting tasks. It also includes a **user list** fetched from an API using a **custom hook**.

---

## 🛠️ Tech Stack
- **Next.js**
- **TypeScript**
- **Material UI**
- **Redux Toolkit**
- **Axios** (for API calls)
- **React Hooks**

---

## 🚀 Features

### ✅ **Stage 1 Features**
1. **Add/Delete ToDo Cards** – Create and remove tasks in a card-like layout.
2. **Search Functionality** – Filter ToDo cards based on their headers.
3. **Top Navbar with Hamburger Menu** – A responsive navbar with user options.
4. **Bottom Bar with API Call** – Fetch and display users from [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) using a custom hook.
5. **Responsive Design** – The UI adapts to different screen sizes.

### ✅ **Stage 2 Features**
1. **Edit ToDo Cards** – Select individual cards to edit their content.
2. **Pagination** – Implement pagination for both ToDo cards and user cards.
3. **Batch Delete** – Select multiple ToDo cards and delete them at once.
4. **Clean and Bulletproof Architecture** – Ensured **no warnings** and **clean, maintainable code**.

---

## 📂 Folder Structure

```bash
📂 src
 ┣ 📂 app
 ┃ ┣ 📂 todo
 ┃ ┃ ┗ 📂 list
 ┃ ┃   ┗ 📜 page.tsx
 ┃ ┣ 📂 user
 ┃ ┃ ┗ 📂 list
 ┃ ┃   ┗ 📜 page.tsx
 ┃ ┣ 📜 header.tsx
 ┃ ┣ 📜 layout.tsx
 ┃ ┣ 📜 page.tsx
 ┣ 📂 components
 ┃ ┗ 📜 pagination.tsx
 ┣ 📂 hooks
 ┃ ┗ 📜 useFetchUser.ts
 ┣ 📂 redux
 ┃ ┣ 📜 searchSlice.ts
 ┃ ┗ 📜 store.ts
 ┣ 📂 sections
 ┃ ┣ 📂 todo
 ┃ ┃ ┣ 📂 view
 ┃ ┃ ┃ ┣ 📜 index.ts
 ┃ ┃ ┃ ┗ 📜 todo-list-view.tsx
 ┃ ┗ 📂 user
 ┃   ┣ 📂 view
 ┃   ┃ ┣ 📜 index.ts
 ┃   ┃ ┗ 📜 todo-list-view.tsx
 ┗ 📂 type
   ┗ 📜 todo.ts
   ┗ 📜 user.ts

