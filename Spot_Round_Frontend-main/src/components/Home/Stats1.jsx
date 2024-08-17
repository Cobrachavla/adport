import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import UniversityCardList from './UniversityCard';

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

  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await axios.get('http://localhost:4000/api/filters');
        setCollegeName(response.data.college_name.map(name => ({ value: name, label: name })));
        setBranches(response.data.branches.map(branch => ({ value: branch, label: branch })));
        setCategories(response.data.categories.map(category => ({ value: category, label: category })));
        setCourses(response.data.courses.map(course => ({ value: course, label: course })));
        setCity(response.data.city.map(city => ({ value: city, label: city })));
        setGenders(response.data.genders.map(gender => ({ value: gender, label: gender })));
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    }

    fetchFilters();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/predict', {
        city: selectedCity?.value,
        percentile: percentile,
        Branch_Name: selectedBranch?.value,
        Category: selectedCategory?.value,
        Course_Name: selectedCourse?.value,
      });
      console.log('Fetched universities:', response.data);
      setUniversities(response.data); // Store the returned colleges in state
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };


  return (
    <>
    <section className="stats_box py-10 grid place-items-center lg:grid-cols-5 grid-cols-2 gap-5 sm:w-9/12 w-11/12 mx-auto -mt-9 px-6">
      <div className="w-full">
        <Select
          options={city}
          placeholder="Select City"
          classNamePrefix="react-select"
          onChange={setSelectedCity}
        />
      </div>

      <div className="w-full">
        <Select
          options={courses}
          placeholder="Select Course"
          classNamePrefix="react-select"
          onChange={setSelectedCourse}
        />
      </div>

      <div className="w-full">
        <Select
          options={branches}
          placeholder="Select Branch"
          classNamePrefix="react-select"
          onChange={setSelectedBranch}
        />
      </div>

      <div className="w-full">
        <Select
          options={categories}
          placeholder="Select Category"
          classNamePrefix="react-select"
          onChange={setSelectedCategory}
        />
      </div>

      <div className="w-full">
        <Select
          options={genders}
          placeholder="Select Gender"
          classNamePrefix="react-select"
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

      <div className="w-full">
        <button
          className="md:text-[15px] text-[12px] font-bold p-2 bg-orange-500 text-white rounded w-full"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </section>

    <UniversityCardList universities={universities} />
    </>
  );
}
