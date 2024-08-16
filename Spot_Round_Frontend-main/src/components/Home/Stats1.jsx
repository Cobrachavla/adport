export default function Stats() {
    return (
      <section className="stats_box py-10 grid place-items-center lg:grid-cols-5 grid-cols-2 gap-5 sm:w-9/12 w-11/12 mx-auto -mt-9 px-6">
        <div>
          <select className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded">
          <option value="">Exam Name</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {/* <p className="mt-2">Select Exam Name</p> */}
        </div>
       
        <div>
          <select className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded">
          <option value="">Course</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {/* <p className="mt-2">Course</p> */}
        </div>
        <div>
          <select className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded">
          <option value="">Branch</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {/* <p className="mt-2">Branch</p> */}
        </div>
        <div>
          <select className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded">
          <option value="">Category</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {/* <p className="mt-2">Category</p> */}
        </div>
        <div>
          <select className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded">
          <option value="">Gender</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {/* <p className="mt-2">Gender</p> */}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter marks scored"
            className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          
          <button className="md:text-[15px] text-[12px] font-bold p-2 bg-orange-500 text-white rounded w-full">
            Search
          </button>
        </div>
      </section>
    );
  }
  