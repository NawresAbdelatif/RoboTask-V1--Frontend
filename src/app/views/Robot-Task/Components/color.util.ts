export const USER_COLORS = [
 '#5FACD3', '#0078B8', '#B1A09B', '#72A1B4', '#ba68c8',
    '#BCCEC9', '#317AC1', '#7986cb', '#a1887f', '#90a4ae'
];

export function getColorForUser(username: string): string {
    if (!username) return USER_COLORS[0];
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % USER_COLORS.length;
    return USER_COLORS[index];
}
