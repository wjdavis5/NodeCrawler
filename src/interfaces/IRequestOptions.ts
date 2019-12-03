interface IRequestOptions {
    uri: string;
    transform(body: string);
}
