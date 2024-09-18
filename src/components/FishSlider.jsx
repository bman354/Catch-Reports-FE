import Slider from "react-slick";
import fish from "/fish.png";

export default function FishSlider({ fishForArea }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 0,
    slidesToScroll: 4,
    slidesToShow: 4,
  };

  const Fish = (src) => {
    // attach src after getting list of fish
    return (
      <div>
        <img src={fish} width={100} height={100} />
      </div>
    );
  };

  return (
    <div className='slider-container'>
      <div className=' d-flex'>
        <h2>Species</h2>
        <input placeholder='AutoComplete' />
      </div>
      <Slider {...settings}>
        {/* {fishForArea.map((fish, index) => (
          <Fish src={fish.src}/>
        ))} */}
        <Fish />
        <Fish />
        <Fish />
        <Fish />
        <Fish />
      </Slider>
    </div>
  );
}
