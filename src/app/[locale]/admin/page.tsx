
import React from "react";
import Link from "next/link";
import styles from "./Admin.module.scss"
import Code from "../../../components/AdminComponents1/AddingCodes"


export default async function Admin() {

  return (
    <>
    <Code />
    <div className={`Container m-auto ${styles.adminBar}`}>
      <div className="my-4">
        <Link href="/admin/produkty" className="text-lg block py-2 px-4 rounded-lg bg-secondary text-secondary-inverse hover:bg-secondary-hover">
           <button>
            Dodawanie produktów
            </button>
        </Link>
      </div>
      <div className="my-4">
        <Link href="/admin/newsletter"className="text-lg block py-2 px-4 rounded-lg bg-secondary text-secondary-inverse hover:bg-secondary-hover" >
<button>
Kontakty zapisane do newslettera
</button>
        </Link>
      </div>
    </div>

  
    </>
  );
}
