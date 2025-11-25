export interface Blog {
    id: number;
    title: string;
    content: string;
    product_id?: number;
    created_at: Date;
    updated_at: Date;
    product_name?: string;
    product_image_url?: string;
    product_slug?: string;
}
