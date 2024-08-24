
export function getHumiColorValue(humi) {
    // #E39C57 30 #FFD38B  45 #8FE759 65 #008CB5 80  #0071B5 100
    let colorValue = '#FD663D';
    if (humi < 15) {
        colorValue = '#E7A401';
    } else if (humi >= 15 && humi < 30) {
        colorValue = '#E39C57';
    } else if (humi >= 30 && humi < 45) {
        colorValue = '#D6C300';
    } else if (humi >= 45 && humi < 65) {
        colorValue = '#8FE759';
    } else if (humi >= 65 && humi < 75) {
        colorValue = '#62D4CF';
    } else if (humi >= 75 && humi < 80) {
        colorValue = '#52BBF3';
    } else if (humi >= 80 && humi < 100) {
        colorValue = '#0096FA';
    }
    return colorValue;
}

export function getTempColorValue(temp) {
    let colorValue;
    let colorValue2;
    if (temp < 20) {
        colorValue = '#370097';
        colorValue2 = '#370097';
    } else if (temp >= 20 && temp < 22) {
        colorValue = '#0034F5';
        colorValue2 = '#0034F5';
    } else if (temp >= 22 && temp < 24) {
        colorValue = '#0084C1';
        colorValue2 = '#0084C1';
    } else if (temp >= 24 && temp < 27) {
        colorValue = '#56A63B';
        colorValue2 = '#56A63B';
    } else if (temp >= 27 && temp < 28) {
        colorValue = '#CAE644';
        colorValue2 = '#CAE644';
    } else if (temp >= 28 && temp < 29) {
        colorValue = '#FFFF4D';
        colorValue2 = '#FFFF4D';
    } else if (temp >= 29 && temp < 30) {
        colorValue = '#FFB430';
        colorValue2 = '#FFB430';
    } else if (temp >= 30 && temp < 31) {
        colorValue = '#FF912A';
        colorValue2 = '#FF912A';
    } else if (temp >= 31 && temp < 32) {
        colorValue = '#FF4122';
        colorValue2 = '#FF4122';
    } else if (temp >= 32 && temp < 33) {
        colorValue = '#FF2B22';
        colorValue2 = '#FF2B22';
    } else if (temp >= 33) {
        colorValue = '#FF2B22';
        colorValue2 = '#FF2B22';
    } else {
        colorValue = '#999';
        colorValue2 = '#999';
    }
    return [colorValue, colorValue2];
}

export function getLineColorValue(humi) {
    const colorValue = "#0E84BB";
    const colorValue2 = "#0E84BB";
    return [colorValue, colorValue2];
}