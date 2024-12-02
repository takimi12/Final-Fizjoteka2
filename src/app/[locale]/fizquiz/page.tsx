import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
// import background from "../../../public/assets/Fizquiz/download.png";


export default async function HomeLayout() {
	const backgroundStyle = {
		// backgroundImage: `url(${background.src}) `,
		height: "600px",
		marginBottom: "200px",
		width: "100%",
		display: "block",
		margin: "auto",
		backgroundSize: "cover",
		backgroundPosition: "center",
	};

	return (
		<>
			<Breadcrumbs />

			<section style={backgroundStyle}></section>
		</>
	);
}
