export class MediaImage {
    default: string;
}

export class MediaUrl {
    images: Array<MediaImage>;
}

export class Category {
    id: string;
    slug: string;
    title: string;
    title_translations: object;
    meta: object;
    parent_id: string;
    sort_order: string;
    mediaurls: Array<MediaImage>;
}
