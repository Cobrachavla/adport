import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import UniversityCardList from './Neetcard';
import FundsTabs from './FundsTabs3';

export default function Stats() {
  const [institutes, setInstitutes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [quotas, setQuotas] = useState([]);  

  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuota, setSelectedQuota] = useState(null); 
  const [maxRank, setmaxRank] = useState(''); 

  const [universities, setUniversities] = useState([]);
  const [showMostPopular, setShowMostPopular] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await axios.get('http://localhost:4000/api/Neetfilters');
  
        setInstitutes([
          { value: null, label: 'Select an option' },
          ...response.data.institutes.map(inst => ({ value: inst, label: inst }))
        ]);
  
        setCategories([
          { value: null, label: 'Select an option' },
          ...response.data.categories.map(cat => ({ value: cat, label: cat }))
        ]);
  
        setCourses([
          { value: null, label: 'Select an option' },
          ...response.data.courses.map(course => ({ value: course, label: course }))
        ]);
  
        setQuotas([
          { value: null, label: 'Select an option' },
          ...response.data.quotas.map(quota => ({ value: quota, label: quota }))
        ]);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    }
  
    fetchFilters();
  }, []);
  
  const isAnyNeetFilterSelected = () => {
    return (
      selectedInstitute || 
      selectedCourse || 
      selectedCategory || 
      selectedQuota || 
      maxRank.trim() !== ''
    );
  };
  
  const handleNeetSearch = async () => {
    if (!isAnyNeetFilterSelected()) {
      setErrorMessage('Please select at least one filter before searching.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/Neetpredict', {
        maxRank: maxRank,
        course: selectedCourse?.value,
        category: selectedCategory?.value,
        quota: selectedQuota?.value,
      });
      console.log('Fetched NEET predictions:', response.data);
      setUniversities(response.data);
      setShowMostPopular(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching NEET predictions:', error);
    }
  };
  
  const handleClearNeetFilters = () => {
    setSelectedCourse(null);
    setSelectedCategory(null);
    setSelectedQuota(null);
    setmaxRank('');
    setUniversities([]);
    setShowMostPopular(false);
    setErrorMessage('');
  };
  
  return (
    <>
      <section className="stats_box py-10 grid place-items-center lg:grid-cols-5 grid-cols-2 gap-5 sm:w-9/12 w-11/12 mx-auto -mt-9 px-6">
  
        <div className="w-full">
          <Select
            options={courses}
            placeholder="Select Course"
            classNamePrefix="react-select"
            value={selectedCourse}
            onChange={setSelectedCourse}
          />
        </div>

        <div className="w-full">
          <Select
            options={categories}
            placeholder="Select Category"
            classNamePrefix="react-select"
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
  
        <div className="w-full">
          <Select
            options={quotas}
            placeholder="Select Quota"
            classNamePrefix="react-select"
            value={selectedQuota}
            onChange={setSelectedQuota}
          />
        </div>
  
        <div className="w-full">
          <input
            type="text"
            placeholder="Enter Rank"
            className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded w-full"
            value={maxRank}
            onChange={(e) => setmaxRank(e.target.value)}
          />
        </div>
  
        <div className="w-full flex gap-2">
          <button
            className="md:text-[15px] text-[12px] font-bold p-2 bg-orange-500 text-white rounded w-full"
            onClick={handleNeetSearch}
            disabled={!isAnyNeetFilterSelected()}
          >
            Search
          </button>
          <button
            className="md:text-[15px] text-[12px] font-bold p-2 bg-gray-300 text-gray-600 rounded w-full"
            onClick={handleClearNeetFilters}
          >
            Clear Filters
          </button>
        </div>
      </section>
  
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {showMostPopular && <FundsTabs universities={universities} />}
      <UniversityCardList universities={universities} />
    </>
  );
}  