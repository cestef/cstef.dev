export type Color = "blue" | "red" | "green" | "yellow";
export const Colors: Color[] = ["blue", "red", "green", "yellow"];
export const generateColors = (length: number) => {
    let res: Color[] = [];
    for (let i = 0; i < length; i++) res.push(Colors[Math.floor(Math.random() * Colors.length)]);
    return res;
};
export const ColorsCodes = {
    blue: "#29b6f6",
    red: "#f44336",
    green: "#66bb6a",
    yellow: "#ffa726",
};
