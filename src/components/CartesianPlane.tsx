import { useCallback, useEffect, useRef } from "react";
import CartesianPlaneProps from "../interfaces/props/CartesianPlaneProps";
import useWindowDimensions from "../functions/useWindowDimensions";

function CartesianPlane(props: CartesianPlaneProps) {
    const { points } = props
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { width, height } = useWindowDimensions()
    const markInterval = 50;

    const drawAxis = useCallback((ctx: CanvasRenderingContext2D) => {
        // Desenhar eixo X
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = 'black';
        ctx.stroke();

        // Desenhar eixo Y
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }, [width, height]);

    const drawMarks = useCallback((ctx: CanvasRenderingContext2D) => {
        for (let x = 0; x < width / 2; x += markInterval) {
            ctx.beginPath();
            ctx.moveTo(width / 2 + x, height / 2 - 5);
            ctx.lineTo(width / 2 + x, height / 2 + 5);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            if (x !== 0) ctx.fillText(x.toString(), width / 2 + x + 5, height / 2 + 15);
        }

        for (let x = 0; x > -width / 2; x -= markInterval) {
            ctx.beginPath();
            ctx.moveTo(width / 2 + x, height / 2 - 5);
            ctx.lineTo(width / 2 + x, height / 2 + 5);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            if (x !== 0) ctx.fillText(x.toString(), width / 2 + x + 5, height / 2 + 15);
        }

        for (let y = 0; y < height / 2; y += markInterval) {
            ctx.beginPath();
            ctx.moveTo(width / 2 - 5, height / 2 - y);
            ctx.lineTo(width / 2 + 5, height / 2 - y);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            if (y !== 0) ctx.fillText(y.toString(), width / 2 + 10, height / 2 - y);
        }

        for (let y = 0; y > -width / 2; y -= markInterval) {
            ctx.beginPath();
            ctx.moveTo(width / 2 - 5, height / 2 - y);
            ctx.lineTo(width / 2 + 5, height / 2 - y);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            if (y !== 0) ctx.fillText(y.toString(), width / 2 + 10, height / 2 - y);
        }
    }, [width, height, markInterval]);

    const drawPoints = useCallback((ctx: CanvasRenderingContext2D) => {
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(width / 2 + point.x, height / 2 - point.y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        });
    }, [points, width, height]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, width, height);
                drawAxis(ctx);
                drawMarks(ctx);
                drawPoints(ctx);
            }
        }
    }, [width, height, drawAxis, drawMarks, drawPoints]);

    return <canvas ref={canvasRef} width={width} height={height} />
}

export default CartesianPlane