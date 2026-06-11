function parseDuration(str) {
    const regex = /(?:(\d+)\s*(h|hr|hrs|hours))|(?:(\d+)\s*(m|min|mins|minutes))|(?:(\d+)\s*(s|sec|secs|seconds))/g;
    let totalMilliseconds = 0;
    let match;
    let foundValidPart = false;

    while ((match = regex.exec(str)) !== null) {
        foundValidPart = true;
        if (match[1]) {
            totalMilliseconds += parseInt(match[1]) * 3600000;
        } else if (match[3]) {
            totalMilliseconds += parseInt(match[3]) * 60000;
        } else if (match[5]) {
            totalMilliseconds += parseInt(match[5]) * 1000;
        }
    }

    if (!foundValidPart) {
        throw new Error('String contains no valid duration parts');
    }

    return totalMilliseconds;
}