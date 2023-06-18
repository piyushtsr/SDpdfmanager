import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfFiles, setPDFFiles] = useState([]);
  const [fileURL, setFileURL] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleSearch = () => {
    const results = pdfFiles.filter((pdf) =>
      pdf.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("pdf", selectedFile);

        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const response = await axios.post(
          `http://localhost:4000/users/${data.user}/pdfs`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSelectedFile(null)
        toast("PDF uploaded successfully", {
          position: "top-right",
        });
      } catch (error) {
        toast.error("Error uploading PDF", {
          position: "top-right",
        });
      }
    } else {
      toast.error("Please select a PDF file", {
        position: "top-right",
      });
    }
  };

  const handleDownload = async (e) => {
    try {
      const pathtf = e.path
      const filename = pathtf.split("/")[1];
      const response = await axios.get(`http://localhost:4000/download/${filename}`, {
        responseType: "blob",
      });

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      setFileURL(fileURL);
      navigate("/pdfview", { state: { url: fileURL, comments: [],pdfname:e.name,user:username }});
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const response = await axios.get(
          `http://localhost:4000/users/${data.user}/pdfs`
        );
        setPDFFiles(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPDFs();
  }, [pdfFiles]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <div className="home_page">
        <div className="mt">
          Welcome <span>{username}</span>
          <button className="mt1" onClick={Logout}>LOGOUT</button>
        </div>
        <div className="list">
          <div>
            <input
              type="text"
              className="custom"
              placeholder="Search for filename"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          
          <input
            className="custom mleft"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <button onClick={handleFileUpload}>Upload PDF</button>
        </div>

        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
        <div className="pdf_list">
          <h2>List of PDF Files:</h2>
          <div>
            <ul>
              <hr/>
              {pdfFiles.map((pdf) => (
                <li key={pdf._id}>
                  <div>
                  {pdf.name}
                  </div>
                  <div>
                    <button onClick={() => handleDownload(pdf)}>
                      View PDF
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
