import { useEffect, useRef } from "react";
import CartesianPlaneProps from "../interfaces/props/CartesianPlaneProps";
import useWindowDimensions from "../functions/useWindowDimensions";

function CartesianPlane(props: CartesianPlaneProps) {
    const { points } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { width, height } = useWindowDimensions()

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Limpar o canvas
                ctx.clearRect(0, 0, width, height);

                // Desenhar eixo X
                ctx.beginPath();
                ctx.moveTo(0, height / 2);
                ctx.lineTo(width, height / 2);
                ctx.strokeStyle = '#202020';
                ctx.stroke();

                // Desenhar eixo Y
                ctx.beginPath();
                ctx.moveTo(width / 2, 0);
                ctx.lineTo(width / 2, height);
                ctx.strokeStyle = '#202020';
                ctx.stroke();

                // Desenhar pontos
                points.forEach(point => {
                    ctx.beginPath();
                    ctx.arc(width / 2 + point.x, height / 2 - point.y, 3, 0, 2 * Math.PI);
                    ctx.fillStyle = 'red';
                    ctx.fill();
                });
            }
        }
    }, [width, height, points]);

    return <canvas ref={canvasRef} width={width} height={height} />
}

export default CartesianPlane