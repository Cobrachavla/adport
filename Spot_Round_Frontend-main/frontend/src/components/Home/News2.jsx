import React, { useState, useEffect } from "react";
import { news_2, news_3, news_4, news_5 } from "../../assets/home";
import Container from "../Container";
import SectionTitle from "./SectionTitle";

const images = [news_2, news_3, news_4, news_5]; // array of images

export default function News() {
  const [recommendedColleges, setRecommendedColleges] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Number of colleges to display initially

  useEffect(() => {
    // Fetch data from the recommended colleges API endpoint
    fetch("http://localhost:4000/api/recommended")
      .then((response) => response.json())
      .then((data) => {
        // Assign an image to each recommended college based on its index
        const collegesWithImages = data.map((college, index) => ({
          ...college,
          image: images[index % images.length], // Loop through images
        }));
        setRecommendedColleges(collegesWithImages);
      })
      .catch((error) => {
        console.error("Error fetching recommended colleges:", error);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Increase the count by 10 when button is clicked
  };

  return (
    <section className="my-14">
      <Container>
        <div>
          <SectionTitle title="Recommended For You" classes="text-center" />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start gap-4 mt-8">
            {recommendedColleges.slice(0, visibleCount).map((college) => (
              <div
                className="h-auto w-[320px] mx-auto px-2 pt-2 pb-4 rounded-md border-2 border-gray-200 relative z-10"
                key={college['_id']} // Use _id from MongoDB as the key
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img src={college.image} alt={college['colleege_name']} />
                </div>
                <article className="px-2">
                  <h2 className="font-bold text-[25px] hover:text-[#6D9886] transition-colors cursor-pointer my-4">
                    {college['colleege_name']}
                  </h2>
                  <p className="font-light text-[14px]">
                    Located in city={college['ciity']}, with a percentile of {college['percentiile']}.
                  </p>
                  <button className="block mx-auto text-[#6D9886] mt-6">
                    Read more
                  </button>
                </article>
              </div>
            ))}
          </div>
          {visibleCount < recommendedColleges.length && (
            <div className="text-xl text-center more_news_gradient h-44 w-full text-black font-bold uppercase py-4 flex items-end justify-center relative z-20">
              <button className="cursor-pointer" onClick={handleShowMore}>
                More colleges
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

