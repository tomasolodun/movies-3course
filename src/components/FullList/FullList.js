import React from "react";
import Item from "./Item";

export default function FullList({ items }) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {items.map((item, index) => (
        <Item
          title={item.title}
          image={item.img}
          key={index}
          id={item.id}
          genres={item.genres}
        />
      ))}
    </div>
  );
}
