"use client";
import { useState } from "react";
import styles from "./Newsletter.module.scss";

interface Contact {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function NewsLetter({ contacts }: { contacts: Contact[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(contacts.length / contactsPerPage));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(contacts.length / contactsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className={`${styles.container} Container `}>
        <h1 className={styles.title}>Lista kontaktów zapisanych do newslettera</h1>
      </div>

      <div className={`${styles.listContainer} Container`}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>Imię</th>
              <th className={styles.tableHeader}>Email</th>
              <th className={styles.tableHeader}>Data utworzenia</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {currentContacts.map((contact) => (
              <tr key={contact._id} className={styles.tableRow}>
                <td className={styles.tableCell}>{contact.name}</td>
                <td className={styles.tableCell}>{contact.email}</td>
                <td className={styles.tableCell}>
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.paginationContainer}>
          <button
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabledButton : ""
            }`}
          >
            Pierwsza
          </button>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabledButton : ""
            }`}
          >
            Poprzednia
          </button>
          <div className={styles.paginationNumbers}>
            {Array.from(
              { length: Math.ceil(contacts.length / contactsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`${styles.paginationNumber} ${
                    currentPage === index + 1 ? styles.activePage : ""
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === Math.ceil(contacts.length / contactsPerPage)}
            className={`${styles.paginationButton} ${
              currentPage === Math.ceil(contacts.length / contactsPerPage)
                ? styles.disabledButton
                : ""
            }`}
          >
            Następna
          </button>
          <button
            onClick={goToLastPage}
            disabled={currentPage === Math.ceil(contacts.length / contactsPerPage)}
            className={`${styles.paginationButton} ${
              currentPage === Math.ceil(contacts.length / contactsPerPage)
                ? styles.disabledButton
                : ""
            }`}
          >
          Ostatnia
          </button>
        </div>
      </div>
    </>
  );
}
