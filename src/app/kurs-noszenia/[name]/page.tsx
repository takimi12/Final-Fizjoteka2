import Second from "../components/Second";
import Seven from "../components/Seven";
import Eleven from "../../../components/Homepage/Contact/page";
import Ten from "../components/Eight";
import Nine from "../components/Thirteen"
import Eight from "../components/Ten";


export default function Page({ params }: { params: { name: string, } }) {
    return (
        <>
        <Second />
        <Seven />
        <Eight />
        <Nine />
        <Ten />
        <Eleven />
        </>
    );
}