export default function SearchBar({ defaultValue = '' }) {
  return (
    <form action="/search" className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search by title or author"
        className="input flex-1"
      />
      <button type="submit" className="button-primary min-w-[10rem]">
        Search books
      </button>
    </form>
  );
}
