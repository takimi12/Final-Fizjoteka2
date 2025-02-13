

interface ErrorPageProps {
    message: string;
}

export default function ErrorPage({ message }: ErrorPageProps) {
    return (
        <div className="Container">
        <div>
            <h1 style={{ color: 'red' }}>Wystąpił błąd</h1>
            <p>{message}</p>
        </div>
        </div>
    );
}
