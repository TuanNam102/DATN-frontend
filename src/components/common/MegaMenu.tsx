import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  type: "home" | "brands" | "perfumes" | "decants";
}

const brandsMegaMenuData: MegaMenuColumn[] = [
  {
    title: "Thương hiệu nổi bật",
    links: [
      { name: "AFNAN", path: "/collections/afnan" },
      { name: "CHANEL", path: "/collections/chanel" },
      { name: "GUCCI", path: "/collections/gucci" },
      { name: "HERMES", path: "/collections/hermes" },
      { name: "YSL", path: "/collections/ysl" },
      { name: "DIOR", path: "/collections/dior" },
    ],
  },
  {
    links: [],
    image: {
      src: "/images/megamenu_banner.png",
      alt: "Brands Banner",
      link: "/collections/all",
    },
  },
];

const perfumesMegaMenuData: MegaMenuColumn[] = [
  {
    title: "Dành cho",
    links: [
      { name: "Nước hoa Nam", path: "/collections/nam" },
      { name: "Nước hoa Nữ", path: "/collections/nu" },
      { name: "Nước hoa Unisex", path: "/collections/unisex" },
      { name: "Tất cả nước hoa", path: "/collections/all" },
    ],
  },
];

const decantsMegaMenuData: MegaMenuColumn[] = [
  {
    title: "Dành cho",
    links: [
      { name: "Nước hoa chiết Nam", path: "/collections/chiet-nam" },
      { name: "Nước hoa chiết Nữ", path: "/collections/chiet-nu" },
    ],
  },
];

const MegaMenu: React.FC<MegaMenuProps> = ({ type }) => {
  let menuContent: MegaMenuColumn[] = [];
  let gridColsClass = "";

  switch (type) {
    case "brands":
      menuContent = brandsMegaMenuData;
      gridColsClass = "grid-cols-2";
      break;
    case "perfumes":
      menuContent = perfumesMegaMenuData;
      gridColsClass = "grid-cols-1";
      break;
    case "decants":
      menuContent = decantsMegaMenuData;
      gridColsClass = "grid-cols-1";
      break;
    default:
      return null;
  }

  return (
    <div className={`absolute left-0 top-full ${type === "brands" ? "w-[600px]" : "w-[250px]"} bg-white shadow-xl py-8 px-10 hidden group-hover:block border-t-2 border-primary`}>
      <div className={`grid ${gridColsClass} gap-8`}>
        {menuContent.map((column, colIdx) => (
          <div key={colIdx}>
            {column.title && (
              <h4 className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6 pb-2 border-b border-gray-100">
                {column.title}
              </h4>
            )}
            <ul className="space-y-4">
              {column.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link 
                    to={link.path} 
                    className="text-primary-deep/70 hover:text-primary transition-all duration-300 text-[13px] font-medium flex items-center gap-3 group/link"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover/link:bg-primary transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {column.image && (
              <Link to={column.image.link} className="block mt-6 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                <img src={column.image.src} alt={column.image.alt} className="w-full h-auto hover:scale-110 transition-transform duration-700" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
