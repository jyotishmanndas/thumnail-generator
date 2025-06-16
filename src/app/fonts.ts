import { Inter, Domine } from "next/font/google"

export const inter = Inter({
    subsets: ["latin"],
    display: "swap"
})

export const domine = Domine({
    subsets: ["latin"],
    display: "swap"
})

export const presets = {
    style1: {
        fontSize: 100,
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 1)",
        opacity: 1
    },
    style2: {
        fontSize: 100,
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 1)",
        opacity: 1
    },
    style3: {
        fontSize: 100,
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.7)",
        opacity: 0.7
    }
}
