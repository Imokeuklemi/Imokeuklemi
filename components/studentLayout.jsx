import Sidebar from "./sidebar";

export default function StudentLayout({ children }) {
  return (
    <div className="row flex-nowrap">
      <Sidebar />
      {children}
    </div>
  );
}
