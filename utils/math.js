export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

export const rand = (min, max) => {
    return ~~(Math.random() * (max - min + 1) + min);
};

export const fixed = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};