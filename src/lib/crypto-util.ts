export const randomBytes = (size: number) => {
  const array = new Uint8Array(size);
  window.crypto.getRandomValues(array);
  return array;
}

export const hashData = async (data: string):Promise<string> => {
    const algorithm = "SHA-256";
    const byteData = new TextEncoder().encode(data);
    const digest = await window.crypto.subtle.digest(algorithm, byteData);
    const hashArray = Array.from(new Uint8Array(digest));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}