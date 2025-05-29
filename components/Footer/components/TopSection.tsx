import React from "react";
import styles from "./TopSection.module.scss";
import Image from "next/image";
import check from "../../../public/assets/Footer/Checkin.svg";
import Form from "./Form";
import { getPreferredLocale } from "../../../helpers/getLocale";
import { getDictionary } from "../../../lib/dictionary";

const TopFooter = async () => {
  const lang = getPreferredLocale() as "pl" | "en";
  const { TopFooter } = await getDictionary(lang) as {
    TopFooter: {
      mainHeading: string;
      qualityTitle: string;
      qualityParagraph1: string;
      qualityParagraph2: string;
      qualityParagraph3: string;
      qualityParagraph4: string;
    };
  };
  const { FormFooter } = await getDictionary(lang) as {
    FormFooter: {
      description: string;
      errorMessage: string;
      inputNameLabel: string;
      inputNamePlaceholder: string;
      inputEmailLabel: string;
      inputEmailPlaceholder: string;
      consentText: string;
      buttonText: string;
      processingText: string;
      emailSubject: string;
      emailBodyLinkText: string;
    };
  };

  return (
    <div className={` ${styles.newsletter} `}>
      <div className={`Container  ${styles.newsletterContainer}`}>
        <h2 className={` ${styles.mainHeading}`}>{TopFooter.mainHeading}</h2>
      </div>

      <div className={` ${styles.container} Container `}>
        <div className={`${styles.left}  `}>
          <div className={`${styles.top} `}>
            <Image src={check} width={50} height={50} alt="logo" />
            <h3>{TopFooter.qualityTitle}</h3>
          </div>
          <div className={`${styles.bottom} `}>
            <p>{TopFooter.qualityParagraph1}</p>
            <p>{TopFooter.qualityParagraph2}</p>
            <p>{TopFooter.qualityParagraph3}</p>
            <p>{TopFooter.qualityParagraph4}</p>
          </div>
        </div>
        <Form formFooter={FormFooter} />
      </div>
    </div>
  );
};

export default TopFooter;
