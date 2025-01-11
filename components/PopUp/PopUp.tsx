import React from "react";
import styles from "./Popup.module.scss";

type PopupProps = {
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <div className={styles.innerWrapper}>
        <h2>Dodano produkt</h2>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        </div>
        <div className={styles.textAction}>
        <p>Dodałeś przedmiot do koszyka produkt:</p>
        <h3><b>Niemowlę</b></h3>
        </div>
        <div className={styles.popupActions}>
          <button onClick={onClose}>Przeglądaj dalej</button>
          <button onClick={() => window.location.href = '/koszyk'}>Idź do koszyka</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
