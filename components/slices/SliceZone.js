import React from "react";
import dynamic from "next/dynamic";

const TextSection = dynamic(() => import("./TextSection"));
const Quote = dynamic(() => import("./Quote"));
const FullWidthImage = dynamic(() => import("./FullWidthImage"));
const ImageGallery = dynamic(() => import("./ImageGallery"));
const ImageHighlight = dynamic(() => import("./ImageHighlight"));
const CarouselImageGrid = dynamic(() => import("./CarouselImageGrid"));
const SectionParagraph = dynamic(() => import("./SectionParagraph"));
const ShowcaseGrid = dynamic(() => import("./ShowcaseGrid"));
const VideoSection = dynamic(() => import("./VideoSection"));
const ImageSection = dynamic(() => import("./ImageSection"));
const MultitabSection = dynamic(() => import("./MultitabSection"));
const HighlightCarousel = dynamic(() => import("./HighlightCarousel"));
const BlogSection = dynamic(() => import("./BlogSection"));
const Testimonials = dynamic(() => import("./Testimonials"));
const HighlightSection = dynamic(() => import("./HighlightSection"));
const ContactForm = dynamic(() => import("./ContactForm"));
const ShopSection = dynamic(() => import("./ShopSection"));

const SliceZone = ({ sliceZone }) => (
  <div className="container">
    {sliceZone.map((slice, index) => {
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
        case "highlight_section":
          return <HighlightSection slice={slice} key={`slice-${index}`} />;
        case "multi-tab_section":
          return <MultitabSection slice={slice} key={`slice-${index}`} />;
        case "highlights_carousel":
          return <HighlightCarousel slice={slice} key={`slice-${index}`} />;
        case "blog_section":
          return <BlogSection slice={slice} key={`slice-${index}`} />;
        case "testimonials":
          return <Testimonials slice={slice} key={`slice-${index}`} />;
        case "contact_form":
          return <ContactForm slice={slice} key={`slice-${index}`} />;
        case "shop_section":
          return <ShopSection slice={slice} key={`slice-${index}`} />;
        default:
          return null;
      }
    })}
  </div>
);

export default SliceZone;
