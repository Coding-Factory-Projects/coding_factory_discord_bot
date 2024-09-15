export function format_user_name(name: string): string {
    return name
        .split(" ")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ")
}