import CartesianPlane from "../components/CartesianPlane"
import useWindowDimensions from "../functions/useWindowDimensions";

function Home() {
    const points = [
        { x: 50, y: 50 },
        { x: -50, y: -50 },
        { x: 100, y: -100 },
    ];

    return (
        <main>
            <CartesianPlane points={points} />
        </main>
    )
}

export default Home