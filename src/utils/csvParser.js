// Helper function to parse CSV text into an array of objects
export function parseCSV(text) {
    const [headerLine, ...dataLines] = text.trim().split('\n');
    if (!headerLine) return [];

    // 清理並獲取標頭
    const headers = headerLine.split(',').map(h => h.trim().replace(/"/g, ''));

    const data = dataLines.map(line => {
        // 簡單的 CSV 分割，處理可能存在的引號
        // 正則表達式: /,(?=(?:(?:[^"]*"){2})*[^"]*$)/g 用於分割逗號，但忽略雙引號內的逗號
        const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g).map(v => v.trim().replace(/"/g, ''));

        return headers.reduce((obj, header, index) => {
            obj[header] = values[index] || '';
            return obj;
        }, {});
    }).filter(item => item.entry && item.entry.trim() !== ''); // 移除 entry 為空的項目
    
    return data;
}

