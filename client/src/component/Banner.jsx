import React, { useEffect, useState } from 'react';

const Banner = () => {
    const [bannerImage, setBannerImage] = useState('url(https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)');
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(
                    "https://api.pexels.com/v1/search?query=day scenery&orientation=landscape&size=large&per_page=25",
                    {
                        headers: { 'Authorization': 'TGdNa6ftsAxcHlqhhv8MHZmPFqzfnzigyFHFKH31QKfU2OU3dDEZYtqn' }
                    }
                );
                const json = await res.json();
                const images = json['photos'];
                console.log(images);
                if (images.length > 0) {
                    const image = images[Math.floor(Math.random() * images.length)]['src']['large'];
                    setBannerImage('url(' + image + ')');
                    console.log(image);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        if (!dataLoaded) {
            fetchImages();
            setDataLoaded(true);
        }
    }, [dataLoaded]);

    return (
        <div className="bg-white border shadow-sm py-[60px] overflow-hidden" style={{ backgroundImage: bannerImage, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="container mx-auto">
                <div className="p-4 md:p-5 flex flex-col justify-center items-center ">
                    <h3 className="font-black text-4xl text-center mb-2 mix-blend-overlay">
                        Discover Inspiring Stories Here!
                    </h3>
                    <p className="font-medium text-gray-800 text-center mix-blend-hard-light">
                        Explore, Learn, and Inspire: Your Gateway to Infinite Knowledge.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Banner;
