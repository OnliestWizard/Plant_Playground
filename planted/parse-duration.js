function parseDuration(str) {
    const regex = /(\d+)([hms])/g;
    let match;
    let totalMilliseconds = 0;

    while ((match = regex.exec(str)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = match[2];
        
        if (unit === 'h') {
            totalMilliseconds += value * 3600000;
        } else if (unit === 'm') {
            totalMilliseconds += value * 60000;
        } else if (unit === 's') {
            totalMilliseconds += value * 1000;
        }
    }

    if (totalMilliseconds === 0) {
        throw new Error('Invalid duration string');
    }

    return totalMilliseconds;
}