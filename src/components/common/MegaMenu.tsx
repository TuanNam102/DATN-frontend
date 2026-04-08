import React from "react";
import { Link } from "react-router-dom";

interface MegaMenuLink {
  name: string;
  path: string;
  label?: string;
  tag?: {
    text: string;
    color: string;
  };
}

interface MegaMenuColumn {
  title?: string;
  links: MegaMenuLink[];
  image?: {
    src: string;
    alt: string;
    link: string;
  };
  tag?: {
    text: string;
    color: string;
  };
}

interface MegaMenuProps {
  type: "home" | "shop" | "products" | "blog" | "pages";
}

const homeMegaMenuData: MegaMenuColumn[] = [
  {
    links: [
      { name: "Home 1", path: "/pages/home-1" },
      { name: "Home 2", path: "/pages/home-2" },
      { name: "Home 3", path: "/pages/home-3" },
      { name: "Home 4", path: "/pages/home-4" },
      { name: "Home 5", path: "/pages/home-5" },
    ],
  },
];

const shopMegaMenuData: MegaMenuColumn[] = [
  {
    title: "Shop Layouts",
    links: [
      { name: "All Products", path: "/products" },
      { name: "Left Sidebar", path: "/products" },
      { name: "Right Sidebar", path: "/products" },
      { name: "Box container", path: "/products" },
      { name: "Wide container", path: "/products" },
      { name: "List View", path: "/products" },
      { name: "Collections List", path: "/products" },
      { name: "Filter Sidebar", path: "/products" },
      { name: "Filter Hidden", path: "/products" },
    ],
  },
  {
    title: "Shop Layouts",
    links: [
      { name: "Grid 2 columns", path: "/collections/grid-2-columns" },
      { name: "Grid 3 columns", path: "/collections/grid-3-columns" },
      { name: "Grid 4 columns", path: "/collections/grid-4-columns" },
      { name: "Grid 5 columns", path: "/collections/grid-5-columns" },
      { name: "Grid 6 columns", path: "/collections/grid-6-columns" },
      { name: "Collection title style 01", path: "/collections/collection-title-style-01" },
      { name: "Collection title style 02", path: "/collections/collection-title-style-02" },
      { name: "Collection title style 03", path: "/collections/collection-title-style-03" },
      { name: "Collection title style 04", path: "/collections/collection-title-style-04" },
      { name: "Collection title style 05", path: "/collections/collection-title-style-05" },
    ],
  },
  {
    title: "Shop Features",
    links: [
      { name: "Drawer sidebar", path: "/collections/drawer-sidebar" },
      { name: "Dropdown sidebar", path: "/collections/dropdown-sidebar" },
      { name: "Toggle sidebar", path: "/collections/toggle-sidebar" },
      { name: "Best seller products", path: "/collections/best-seller" },
      { name: "Image banner", path: "/collections/image-banner" },
      { name: "Pagination page", path: "/collections/pagination-page" },
      { name: "Infinite scrolling", path: "/collections/infinite-scrolling" },
      { name: "Product recently viewed", path: "/collections/product-recently-viewed", tag: { text: "NEW", color: "#516cf4" } },
    ],
  },
  {
    title: "Product Card Styles",
    links: [
      { name: "Product card style 01", path: "/collections/product-card-style-01" },
      { name: "Product card style 02", path: "/collections/product-card-style-02" },
      { name: "Product card style 03", path: "/collections/product-card-style-03" },
      { name: "Product card style 04", path: "/collections/product-card-style-04" },
      { name: "Product card style 05", path: "/collections/product-card-style-05" },
      { name: "Product card style 06", path: "/collections/product-card-style-06" },
      { name: "Product card style 07", path: "/collections/product-card-style-07" },
      { name: "Product card style 08", path: "/collections/product-card-style-08" },
      { name: "Product card style 09", path: "/collections/product-card-style-09" },
      { name: "Product card style 10", path: "/collections/product-card-style-10" },
    ],
  },
  {
    title: "Product Card Features",
    links: [
      { name: "Media auto", path: "/collections/media-auto", tag: { text: "HOT", color: "#e62e05" } },
      { name: "Media carousel", path: "/collections/media-carousel", tag: { text: "NEW", color: "#516cf4" } },
      { name: "Media carousel autoplay", path: "/collections/media-carousel-autoplay", tag: { text: "NEW", color: "#516cf4" } },
      { name: "Media video", path: "/collections/media-video", tag: { text: "NEW", color: "#516cf4" } },
      { name: "Toggle quick add", path: "/collections/quickadd-toggle", tag: { text: "HOT", color: "#e62e05" } },
      { name: "Popup quick add", path: "/collections/quickadd-popup", tag: { text: "NEW", color: "#516cf4" } },
    ],
  },
  {
    links: [],
    image: {
      src: "https://landing.shopilaunch.com/starter/megamenu_banner.jpg",
      alt: "affiliate",
      link: "https://shopify.pxf.io/9gPaY0",
    },
  },
];

const productsMegaMenuData: MegaMenuColumn[] = [
  {
    title: "Product Layouts",
    links: [
      { name: "All Products", path: "/products" },
      { name: "Default layout", path: "/products" },
      { name: "Box container", path: "/products" },
      { name: "Wide container", path: "/products" },
      { name: "Digital products", path: "/products" },
      { name: "Default tab", path: "/products" },
      { name: "Tab accordion inner", path: "/products" },
      { name: "Background color", path: "/products" },
      { name: "Background gradient", path: "/products" },
    ],
  },
  {
    title: "Product Features",
    links: [
      { name: "Sticky add to cart", path: "/products/sticky-add-to-cart" },
      { name: "Sticky product info", path: "/products/sticky-product-info" },
      { name: "Sticky product image", path: "/products/sticky-product-image" },
      { name: "Product video", path: "/products/product-video" },
      { name: "Product 3D model", path: "/products/product-3d-model" },
      { name: "Product countdown", path: "/products/product-countdown" },
      { name: "Product bundle", path: "/products/product-bundle" },
      { name: "Product pre-order", path: "/products/product-pre-order" },
      { name: "Product back in stock", path: "/products/product-back-in-stock" },
    ],
  },
  {
    title: "Product Gallery",
    links: [
      { name: "Gallery layout 01", path: "/products/gallery-layout-01" },
      { name: "Gallery layout 02", path: "/products/gallery-layout-02" },
      { name: "Gallery layout 03", path: "/products/gallery-layout-03" },
      { name: "Gallery layout 04", path: "/products/gallery-layout-04" },
      { name: "Gallery layout 05", path: "/products/gallery-layout-05" },
      { name: "Gallery layout 06", path: "/products/gallery-layout-06" },
      { name: "Gallery layout 07", path: "/products/gallery-layout-07" },
      { name: "Gallery layout 08", path: "/products/gallery-layout-08" },
      { name: "Gallery layout 09", path: "/products/gallery-layout-09" },
    ],
  },
  {
    links: [],
    image: {
      src: "https://borcen-store-newdemo.myshopify.com/cdn/shop/files/megamenu_banner_2.jpg?v=1757393664",
      alt: "Product Banner",
      link: "/collections/all",
    },
  },
];

const MegaMenu: React.FC<MegaMenuProps> = ({ type }) => {
  let menuContent: MegaMenuColumn[] = [];
  let gridColsClass = "";

  switch (type) {
    case "home":
      menuContent = homeMegaMenuData;
      gridColsClass = "grid-cols-5"; // Adjust based on your design
      return (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg py-8 px-12 hidden group-hover:block">
          <div className={`grid ${gridColsClass} gap-8`}>
            {menuContent[0].links.map((link, idx) => (
              <div key={idx} className="mega-menu-v2__item">
                <Link to={link.path} className="mega-menu-v2__img block aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <img 
                    src={`https://borcen-store-newdemo.myshopify.com/cdn/shop/files/home${idx + 1}.jpg?v=1757393664&width=400`} 
                    alt={link.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <h4 className="text-center">
                  <Link to={link.path} className="mega-menu-v2__link text-primary-deep hover:text-primary font-body text-sm uppercase tracking-widest">
                    {link.name}
                  </Link>
                </h4>
              </div>
            ))}
          </div>
        </div>
      );
    case "shop":
      menuContent = shopMegaMenuData;
      gridColsClass = "grid-cols-5"; // Adjust based on your design
      return (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg py-8 px-12 hidden group-hover:block">
          <div className={`grid ${gridColsClass} gap-8`}>
            {menuContent.map((column, colIdx) => (
              <div key={colIdx}>
                {column.title && (
                  <h4 className="text-primary-deep font-bold text-sm uppercase tracking-widest mb-4">
                    {column.title}
                  </h4>
                )}
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link to={link.path} className="text-primary-deep/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                        {link.name}
                        {link.tag && (
                          <span 
                            className="text-[9px] px-2 py-0.5 rounded-full text-white font-bold" 
                            style={{ backgroundColor: link.tag.color }}
                          >
                            {link.tag.text}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
                {column.image && (
                  <Link to={column.image.link} className="block mt-6 rounded-lg overflow-hidden">
                    <img src={column.image.src} alt={column.image.alt} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    case "products":
      menuContent = productsMegaMenuData;
      gridColsClass = "grid-cols-4"; // Adjust based on your design
      return (
        <div className="absolute left-0 top-full w-full bg-white shadow-lg py-8 px-12 hidden group-hover:block">
          <div className={`grid ${gridColsClass} gap-8`}>
            {menuContent.map((column, colIdx) => (
              <div key={colIdx}>
                {column.title && (
                  <h4 className="text-primary-deep font-bold text-sm uppercase tracking-widest mb-4">
                    {column.title}
                  </h4>
                )}
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link to={link.path} className="text-primary-deep/70 hover:text-primary transition-colors text-sm flex items-center gap-2">
                        {link.name}
                        {link.tag && (
                          <span 
                            className="text-[9px] px-2 py-0.5 rounded-full text-white font-bold" 
                            style={{ backgroundColor: link.tag.color }}
                          >
                            {link.tag.text}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
                {column.image && (
                  <Link to={column.image.link} className="block mt-6 rounded-lg overflow-hidden">
                    <img src={column.image.src} alt={column.image.alt} className="w-full h-auto hover:scale-105 transition-transform duration-300" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default MegaMenu;
