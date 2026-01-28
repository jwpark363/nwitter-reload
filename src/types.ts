export interface ITweet{
    doc_id: string,
    created_at: number,
    user_id: string,
    display_name: string,
    message: string,
    views: number,
    image_link?: string,
}