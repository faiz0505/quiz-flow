"use client";
import React from "react";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
const SelectBtn = ({ items, setValue, value, type }) => {
  return (
    <Select
      selectedKeys={value}
      onSelectionChange={setValue}
      label={`select ${type}`}
      variant="bordered"
      color="primary"
    >
      <SelectSection>
        {items.map((item, i) => {
          return (
            <SelectItem key={item.id ? item.id : item}>
              {item.name ? item.name : item}
            </SelectItem>
          );
        })}
      </SelectSection>
    </Select>
  );
};

export default SelectBtn;
