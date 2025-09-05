export class CategoryRequest {
    title_translations: string;
    slug: string;
    meta: object = {"scope": "ecommerce"};
    image: File;
    sort_order: string = "1";
    parent_id: string;
}
