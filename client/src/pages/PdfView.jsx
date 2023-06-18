// import React, { useState,useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const PdfView = () => {
//   const location = useLocation();
//   const { url, user, pdfname } = location.state;
//   const [newComment, setNewComment] = useState('');
//   const [commentList, setCommentList] = useState([]);

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/${user}/${pdfname}/comments`);
//       console.log("response",response)
//       setCommentList([...commentList,response.data]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddComment = async () => {
//     try {
//       // Make a POST request to add the comment
//       await axios.post(`http://localhost:4000/${user}/${pdfname}/comments`,{ description: newComment,user :user  });
      
//       // Add the new comment to the comment list
//       setCommentList([...commentList, { user: `${user}`, description: newComment }]);

//       // Clear the input field
//       setNewComment('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div>
//       <div className="pdf-view">
//         <div className="pdf-description">
//           <div>
//             {url && (
//               <iframe src={url} title="Downloaded File" />
//             )}
//           </div>
//           <div>
//             <button >Share</button>
//           </div>
//           <div>
//             <h2>Comment Section</h2>
//             {console.log(commentList)}
//             {commentList.map((comment) => (
//               <div key={comment._id}>
//                 <p>User: {comment.user}</p>
//                 <p>Description: {comment.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="add-comment">
//           <h2>Add Comment</h2>
//           <textarea
//             rows="3"
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//           ></textarea>
//           <button onClick={handleAddComment}>Submit Comment</button>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default PdfView;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';

const PdfView = () => {
  const location = useLocation();
  const { url, user, pdfname } = location.state;
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/${user}/${pdfname}/comments`);
      console.log("response", response);
      setCommentList([...commentList, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    try {
      // Make a POST request to add the comment
      await axios.post(`http://localhost:4000/${user}/${pdfname}/comments`, { description: newComment, user: user });

      // Add the new comment to the comment list
      setCommentList([...commentList, { user: `${user}`, description: newComment }]);

      // Clear the input field
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      // Make a POST request to send the email
      toast.error("Email not sent", {
        position: "bottom-left",
      });

      // Clear the recipient email field
      setRecipientEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div className="pdf-view">
          <div className="pdf-description">
            <div>
              {url && (
                <iframe src={url} title="Downloaded File" />
              )}
            </div>
            <div>
              <button onClick={handleShare}>Share</button>
              <input
                type="email"
                placeholder="Recipient's Email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>
            <div>
              <h2>Comment Section</h2>
              {console.log(commentList)}
              {commentList.map((comment) => (
                <div key={comment._id}>
                  <p>User: {comment.user}</p>
                  <p>Description: {comment.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="add-comment">
            <h2>Add Comment</h2>
            <textarea
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button onClick={handleAddComment}>Submit Comment</button>
          </div>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
};

export default PdfView;
