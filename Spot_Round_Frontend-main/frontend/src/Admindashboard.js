import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [mhtCetFile, setMhtCetFile] = useState(null);
  const [neetFile, setNeetFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleMhtCetFileChange = (e) => {
    setMhtCetFile(e.target.files[0]);
  };

  const handleNeetFileChange = (e) => {
    setNeetFile(e.target.files[0]);
  };

  const uploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append('csvFile', file);  // 'csvFile' should match the multer field name
  
    setUploading(true);
    try {
      const response = await axios.post(`http://localhost:4000/upload-${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert(`${type.toUpperCase()} dataset updated successfully!`);
      } else {
        alert(`Failed to upload ${type} dataset.`);
      }
    } catch (error) {
      console.error(`Error uploading ${type} file:`, error);
      alert(`Error uploading ${type} dataset.`);
    } finally {
      setUploading(false);
    }
  };
  
  const handleMhtCetUpload = () => {
    if (mhtCetFile) {
      uploadFile(mhtCetFile, 'mhtcet');
    } else {
      alert('Please select a file to upload for MHT-CET.');
    }
  };

  const handleNeetUpload = () => {
    if (neetFile) {
      uploadFile(neetFile, 'neet');
    } else {
      alert('Please select a file to upload for NEET.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="upload-section">
        <h3>Update MHT-CET Dataset</h3>
        <input type="file" onChange={handleMhtCetFileChange} />
        <button onClick={handleMhtCetUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload MHT-CET CSV'}
        </button>
      </div>

      <div className="upload-section">
        <h3>Update NEET Dataset</h3>
        <input type="file" onChange={handleNeetFileChange} />
        <button onClick={handleNeetUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload NEET CSV'}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
