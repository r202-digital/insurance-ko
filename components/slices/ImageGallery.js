import React from "react";
import { RichText } from "prismic-reactjs";

import DocLink from "components/DocLink";
import { linkResolver } from "prismic-configuration";

const ImageGallery = ({ slice }) => (
  <section className="image-gallery content-section">
    <RichText
      render={slice.primary.gallery_title}
      linkResolver={linkResolver}
    />
    <div className="gallery">
      {slice.items.map((item, index) => (
        <GalleryItem item={item} key={index} />
      ))}
    </div>
  </section>
);

const GalleryItem = ({ item }) => (
  <div className="gallery-item">
    <img src={item.image.url} alt={item.image.alt} />
    <RichText render={item.image_description} linkResolver={linkResolver} />
    <p className="gallery-link">
      <DocLink link={item.link}>{RichText.asText(item.link_label)}</DocLink>
    </p>
  </div>
);

export default ImageGallery;
