import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import UniversityCardList from './UniversityCard';
import FundsTabs from './FundsTabs2';

export default function Stats() {
  const [exams, setExams] = useState([]);
  const [collegeName, setCollegeName] = useState([]);
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [genders, setGenders] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [percentile, setPercentile] = useState('');
  
  const [universities, setUniversities] = useState([]);
  const [showMostPopular, setShowMostPopular] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await axios.get('http://localhost:4000/api/filters');
        setCollegeName([{ value: null, label: 'Select an option' }, ...response.data.college_name.map(name => ({ value: name, label: name }))]);
        setBranches([{ value: null, label: 'Select an option' }, ...response.data.branches.map(branch => ({ value: branch, label: branch }))]);
        setCategories([{ value: null, label: 'Select an option' }, ...response.data.categories.map(category => ({ value: category, label: category }))]);
        setCourses([{ value: null, label: 'Select an option' }, ...response.data.courses.map(course => ({ value: course, label: course }))]);
        setCity([{ value: null, label: 'Select an option' }, ...response.data.city.map(city => ({ value: city, label: city }))]);
        setGenders([{ value: null, label: 'Select an option' }, ...response.data.genders.map(gender => ({ value: gender, label: gender }))]);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    }

    fetchFilters();
  }, []);

  const isAnyFilterSelected = () => {
    return (
      selectedCity || 
      selectedCourse || 
      selectedBranch || 
      selectedCategory || 
      selectedGender || 
      percentile.trim() !== ''
    );
  };

  const handleSearch = async () => {
    if (!isAnyFilterSelected()) {
      setErrorMessage('Please select at least one filter before searching.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/predict', {
        city: selectedCity?.value,
        percentile: percentile,
        Branch_Name: selectedBranch?.value,
        Category: selectedCategory?.value,
        Course_Name: selectedCourse?.value,
      });
      console.log('Fetched universities:', response.data);
      setUniversities(response.data);
      setShowMostPopular(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const handleClearFilters = () => {
    setSelectedCity(null);
    setSelectedCourse(null);
    setSelectedBranch(null);
    setSelectedCategory(null);
    setSelectedGender(null);
    setPercentile('');
    setUniversities([]);
    setShowMostPopular(false);
    setErrorMessage('');
  };


  return (
    <>
    <section className="stats_box py-10 grid place-items-center lg:grid-cols-5 grid-cols-2 gap-5 sm:w-9/12 w-11/12 mx-auto -mt-9 px-6">
      <div className="w-full">
        <Select
          options={city}
          placeholder="Select City"
          classNamePrefix="react-select"
          value={selectedCity}
          onChange={setSelectedCity}
        />
      </div>

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
          options={branches}
          placeholder="Select Branch"
          classNamePrefix="react-select"
          value={selectedBranch}
          onChange={setSelectedBranch}
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
          options={genders}
          placeholder="Select Gender"
          classNamePrefix="react-select"
          value={selectedGender}
          onChange={setSelectedGender}
        />
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="Enter marks scored"
          className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded w-full"
          value={percentile}
          onChange={(e) => setPercentile(e.target.value)}
        />
      </div>

      <div className="w-full flex gap-2">
        <button
          className="md:text-[15px] text-[12px] font-bold p-2 bg-orange-500 text-white rounded w-full"
          onClick={handleSearch}
          disabled={!isAnyFilterSelected()}
        >
          Search
        </button>
        <button
          className="md:text-[15px] text-[12px] font-bold p-2 bg-gray-300 text-gray-600 rounded w-full"
          onClick={handleClearFilters}
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
