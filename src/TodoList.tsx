export function TodoList() {
  return (
    <div className="mx-auto max-w-md bg-black opacity-80 shadow-xl rounded-2xl overflow-hidden border border-gray-400 mt-10">
      <div className="p-6 border-b border-gray-400">
        <h1 className="text-center text-xl font-bold text-rose-400 mb-4">
          Ez a Todo List oldal!
        </h1>
        <h2 className="text-rose-400 text-center">
          Itt tudsz hozzáadni új teendőket a listádhoz.
        </h2>
      </div>

      <form className="p-6">
        <input
          type="text"
          placeholder="Új teendő..."
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
      </form>
    </div>
  );
}
export default TodoList;
