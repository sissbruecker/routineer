// Typescript definitions (*.scss.d.ts) are created by a webpack loader during compilation
// This declaration is a fallback to prevent syntax errors in IDE as long as webpack did not run yet
declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}
