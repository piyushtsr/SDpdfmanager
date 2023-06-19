import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const PDFList = () => {
  const [pdfFiles, setPDFFiles] = useState([]);



  
    const [fileURL, setFileURL] = useState('');
  
    const navigate= useNavigate()
    
    const handleDownload = async (e) => {
      try {
        const filename = e.split('/')[1]
        const response = await axios.get(`https://pdf-manager-htwa.onrender.com/download/${filename}`, {
          responseType: 'blob', // Set the response type to 'blob' to handle binary data
        });
  
        // Create a URL for the downloaded file
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
  
        setFileURL(fileURL);
        navigate('/pdfview', {state : { url: fileURL }})
      } catch (error) {
        console.error('Error downloading the file:', error);
      }
    };


  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const { data } = await axios.post(
          "https://pdf-manager-htwa.onrender.com",
          {},
          { withCredentials: true }
        );
        const response = await axios.get(
          `https://pdf-manager-htwa.onrender.com/users/${data.user}/pdfs`
        );
        setPDFFiles(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPDFs();
  }, []);

  return (
    <div className="pdf_list">
      <h2>List of PDF Files:</h2>
      <div>
      <ul>
        {pdfFiles.map((pdf) => (
          <li key={pdf._id}>
              {pdf.name}    
              <button onClick={() => handleDownload(pdf.path)}>View PDF</button> 
              <hr style={{ borderTop: '1px solid #ccc' }} />
          </li>
          
        ))}
      </ul>
      <hr/>
      </div>
    </div>
  );
};

export default PDFList;




