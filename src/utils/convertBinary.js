export const convertFileToBinary = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer(); // binary data
    const binary = new Uint8Array(arrayBuffer); // you now have the binary
    return binary;
};
