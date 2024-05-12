import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ThreeDCardDemo } from '../card/card';

interface Site {
  title: string;
  description: string;
  image: string;
  lien: string;
}

interface Props {
  dataSite: Site[];
}

type LazyLoadTypes = 'ondemand' | 'progressive';

const CardsSlider: React.FC<Props> = ({ dataSite }) => {
  const sliderRef = useRef<Slider | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      sliderRef.current?.slickNext();
    } else {
      sliderRef.current?.slickPrev();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 8,
    swipeToSlide: true, // Permet le glissement au toucher et potentiellement à la molette
    responsive: [
      {
        breakpoint: 1930,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          speed: 1000,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
          speed: 400,
        }
      }
    ],
    accessibility: true,
    lazyLoad: 'ondemand' as LazyLoadTypes
  };

  return (
    <div onWheel={handleWheel}>
      <Slider ref={sliderRef} {...settings}>
        {dataSite.map((site: Site) => (
          <div key={site.lien} aria-label={`Carte de ${site.title}`}>
            <ThreeDCardDemo title={site.title} description={site.description} image={site.image} lien={site.lien} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardsSlider;
