import styles from "./Error.module.scss"

interface ErrorPageProps {
    message: string;
}

export default function ErrorPage({ message }: ErrorPageProps) {
    return (
        <div className={styles.Container}>

 <div className={`Container ${styles.inner}`}>
             <h1 style={{ color: 'red' }}>Wystąpił błąd. </h1>
            <p>{message}</p>
        </div>
        </div>
    );
}
