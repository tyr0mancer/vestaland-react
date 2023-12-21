// Für PNG-Dateien (zum Beispiel images.d.ts)
declare module '*.png' {
  const value: any;
  export default value;
}

// Für JPG-Dateien (falls benötigt)
declare module '*.jpg' {
  const value: any;
  export default value;
}
