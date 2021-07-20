import React from "react";
import TextSection from "./TextSection";
import Quote from "./Quote";
import FullWidthImage from "./FullWidthImage";
import ImageGallery from "./ImageGallery";
import ImageHighlight from "./ImageHighlight";
import CarouselImageGrid from "./CarouselImageGrid";
import SectionParagraph from "./SectionParagraph";
import ShowcaseGrid from "./ShowcaseGrid";
import VideoSection from "./VideoSection";
import ImageSection from "./ImageSection";
import MultitabSection from "./MultitabSection";
import HighlightCarousel from "./HighlightCarousel";

const SliceZone = ({ sliceZone }) => (
  <div className="container">
    {sliceZone.map((slice, index) => {
      // console.log(slice)
      switch (slice.slice_type) {
        case "text_section":
          return <TextSection slice={slice} key={`slice-${index}`} />;
        case "quote":
          return <Quote slice={slice} key={`slice-${index}`} />;
        case "full_width_image":
          return <FullWidthImage slice={slice} key={`slice-${index}`} />;
        case "image_gallery":
          return <ImageGallery slice={slice} key={`slice-${index}`} />;
        case "image_highlight":
          return <ImageHighlight slice={slice} key={`slice-${index}`} />;
        case "carousel_image_grid":
          return <CarouselImageGrid slice={slice} key={`slice-${index}`} />;
        case "section_paragraph":
          return <SectionParagraph slice={slice} key={`slice-${index}`} />;
        case "showcase_grid":
          return <ShowcaseGrid slice={slice} key={`slice-${index}`} />;
        case "video_section":
          return <VideoSection slice={slice} key={`slice-${index}`} />;
        case "image_section":
          return <ImageSection slice={slice} key={`slice-${index}`} />;
        case "multi-tab_section":
          return <MultitabSection slice={slice} key={`slice-${index}`} />;
        case "highlights_carousel":
          return <HighlightCarousel slice={slice} key={`slice-${index}`} />;
        default:
          return null;
      }
    })}
  </div>
);

export default SliceZone;
