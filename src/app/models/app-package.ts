export class AppPackage {
    name?: string;
    displayName?: string;
    version?: string;
    main?: string;
    license?: string;
    description?: string;
    keywords?: string[];
    author?: {
        name?: string;
        email?: string;
    };
    dependencies? : Map<string,string>[]    
}
