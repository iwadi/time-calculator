export const formatTime = (totalSeconds: number) => {
    const safeTotalSeconds = Math.max(0, totalSeconds);
    const hours = Math.floor(safeTotalSeconds / 3600);
    const remainingSeconds = safeTotalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const formatPart = (value: number, unit: string) => {
        if (value <= 0) return '';
        return `${value} ${unit}`;
    };

    const timeParts = [
        formatPart(hours, 'час'),
        formatPart(minutes, 'мин'),
        `${seconds} сек`,
    ].filter(part => part !== '');

    return timeParts.join(' ');
};