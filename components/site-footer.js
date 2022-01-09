import Link from "next/link";

export default function FooterPage() {
  return (
    <div className="footer bg-dark text-white bottom">
      <p>copyright 2021 {"  "}</p>
      <p className="d-flex flex-row">
        
        Powered by{" "}
        <Link href="www.g7code.com">
          <a className="ps-2">  G7 Tech</a>
        </Link>
      </p>
    </div>
  );
}
