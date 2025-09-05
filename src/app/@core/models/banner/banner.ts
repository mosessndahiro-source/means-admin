export class MediaImage {
    default: string;
}

export class MediaUrl {
    images: Array<MediaImage>;
}

export class Banner {
    id: string;
    title: string;
    title_translations: object;
    meta: object;
    sort_order: string;
    mediaurls: Array<MediaImage>;
}
