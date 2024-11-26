"use client"
import { useState } from 'react';
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
  // State to manage current page
  const [currentPage, setCurrentPage] = useState(1);
  // Number of contacts per page
  const contactsPerPage = 1;

  // Calculate index range for current page
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  // Function to handle page change
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Go to first page
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Go to last page
  const goToLastPage = () => {
    setCurrentPage(Math.ceil(contacts.length / contactsPerPage));
  };

  // Go to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(contacts.length / contactsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className={`container mx-auto ${styles.adminBar}`}>
        <h2 className="text-2xl font-bold">Lista kontaktów zapisanych do newslettera</h2>
      </div>
      
      <div className={`container mx-auto ${styles.list}`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imię
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data utworzenia
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentContacts.map((contact) => (
              <tr key={contact._id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contact.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-1 border border-gray-300 ${currentPage === 1 ? 'bg-gray-200' : 'bg-gray-300'} ${currentPage === 1 ? styles.disabledButton : ''}`}
            style={{ backgroundColor: currentPage === 1 ? '#d2d6dc' : '#24596a', color: 'white' }}
          >
            First
          </button>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-1 border border-gray-300 ${currentPage === 1 ? 'bg-gray-200' : 'bg-gray-300'} ${currentPage === 1 ? styles.disabledButton : ''}`}
            style={{ backgroundColor: currentPage === 1 ? '#d2d6dc' : '#24596a', color: 'white' }}
          >
            Prev
          </button>
          <div className="flex">
            {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 border border-gray-300 ${currentPage === index + 1 ? 'bg-gray-200' : 'bg-gray-300'} ${currentPage === index + 1 ? styles.disabledButton : ''}`}
                style={{ backgroundColor: currentPage === index + 1 ? '#d2d6dc' : '#24596a', color: 'white' }}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === Math.ceil(contacts.length / contactsPerPage)}
            className={`mx-1 px-3 py-1 border border-gray-300 ${currentPage === Math.ceil(contacts.length / contactsPerPage) ? 'bg-gray-200' : 'bg-gray-300'} ${currentPage === Math.ceil(contacts.length / contactsPerPage) ? styles.disabledButton : ''}`}
            style={{ backgroundColor: currentPage === Math.ceil(contacts.length / contactsPerPage) ? '#d2d6dc' : '#24596a', color: 'white' }}
          >
            Next
          </button>
          <button
            onClick={goToLastPage}
            disabled={currentPage === Math.ceil(contacts.length / contactsPerPage)}
            className={`mx-1 px-3 py-1 border border-gray-300 ${currentPage === Math.ceil(contacts.length / contactsPerPage) ? 'bg-gray-200' : 'bg-gray-300'} ${currentPage === Math.ceil(contacts.length / contactsPerPage) ? styles.disabledButton : ''}`}
            style={{ backgroundColor: currentPage === Math.ceil(contacts.length / contactsPerPage) ? '#d2d6dc' : '#24596a', color: 'white' }}
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
}
