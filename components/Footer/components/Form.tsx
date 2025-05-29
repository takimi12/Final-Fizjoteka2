"use client";
import React, { useEffect, useState } from "react";
import { sendEmail } from "../../../libs/emailService";
import styles from "./Form.module.scss";
import { usePathname } from "next/navigation";

interface FormFooterProps {
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
}

function NewsletterForm({ formFooter }: { formFooter: FormFooterProps }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  const resetForm = () => {
    setEmail("");
    setName("");
    setConsent(false);
    setSuccessMessage("");
    setErrorMessage("");
    setSubmittedEmail("");
    setIsSubmitting(false);
  };

  useEffect(() => {
    resetForm();
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const mongoResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (!mongoResponse.ok) {
        throw new Error(formFooter.errorMessage);
      }

      const link = "https://raddys-web-storage1.s3.eu-north-1.amazonaws.com/157.pdf";

      await sendEmail({
        Source: "tomek12olech@gmail.com",
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: formFooter.emailSubject },
          Body: { Html: { Data: `Kliknij <a href="${link}">${formFooter.emailBodyLinkText}</a> aby pobrać poradnik.` } },
        },
      });

      setSuccessMessage("Dziękujemy za zapisanie się! Sprawdź swoją skrzynkę e-mail.");
      setSubmittedEmail(email);
      setEmail("");
      setName("");
      setConsent(false);
    } catch (error) {
      setErrorMessage(formFooter.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.right}>
      <div className={`${styles.form}`}>
        <p>{formFooter.description}</p>
        {(successMessage || errorMessage) && (
          <div className={styles.inner}>
            <div>
              {successMessage ? (
                <p>
                  Mail z darmowym rozdziałem e-booka już leci na Twojego emaila{" "}
                  <span className="text-[#FFFF00]">{submittedEmail}</span>. Jeśli będziesz czekać dłużej niż kilka minut, sprawdź zakładkę spam.
                </p>
              ) : (
                <p>{errorMessage}</p>
              )}
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <div className={styles.inputWraper}>
              <fieldset>
                <label htmlFor="FirstName">
                  {formFooter.inputNameLabel}{" "}
                  <input
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={formFooter.inputNamePlaceholder}
                    required
                    type="text"
                    name="FirstName"
                    id="FirstName"
                  />
                  <span></span>
                </label>
              </fieldset>
            </div>
            <div className={styles.inputWraper}>
              <fieldset>
                <label htmlFor="Email">
                  {formFooter.inputEmailLabel}{" "}
                  <input
                    className={styles.input}
                    type="email"
                    required
                    name="Email"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={formFooter.inputEmailPlaceholder}
                  />
                  <span></span>
                </label>
              </fieldset>
            </div>
            <div className={styles.inputWraper}>
              <fieldset>
                <label htmlFor="AcceptRegulations">
                  <input
                    className={styles.accept}
                    required
                    type="checkbox"
                    name="AcceptRegulations"
                    id="AcceptRegulations"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span className={styles.acceptSpan}>{formFooter.consentText}</span>
                </label>
              </fieldset>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>
                  <span className={styles.spinner}></span>
                  {formFooter.processingText}
                </span>
              ) : (
                <span className="default">{formFooter.buttonText}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsletterForm;
