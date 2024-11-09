import  { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Set the workerSrc for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const ResumeUpload = () => {
  const [parsedText, setParsedText] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("Please select a file.");
      return;
    }

    try {
      // Read the file as an ArrayBuffer
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(data).promise;
        let text = "";

        // Extract text from all pages
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const textContent = await page.getTextContent();
          text += textContent.items.map(item => item.str).join(' ') + "\n";
        }

        setParsedText(text);
        setError("");
      };
    } catch (err) {
      console.error("Error parsing file:", err);
      setError("Failed to parse the resume. Please try again.");
    }
  };

  return (
    <div>
      <h1>Resume Upload</h1>
      <input type="file" onChange={handleFileUpload} accept=".pdf" />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {parsedText && (
        <div>
          <h2>Parsed Resume Text:</h2>
          <pre>{parsedText}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
