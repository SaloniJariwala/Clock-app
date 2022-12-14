import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { categoriesData } from "../../../Data/categoriesData";

const CategoryContainer = ({ methods, isEdit }) => {
  const { control } = methods;

  useEffect(() => {
    if (!isEdit) {
      methods.setValue("category", "selected");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <span style={{ fontSize: 16 }}>Category</span>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <select
            className="form-select"
            id="sound"
            aria-label="Floating label select example"
            value={value}
            onChange={onChange}
          >
            <option value={"selected"} disabled>
              --Select Category--
            </option>
            {categoriesData?.map((item, index) => (
              <option key={index} value={item.id.toString()}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default CategoryContainer;
