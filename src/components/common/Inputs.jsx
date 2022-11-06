import React from "react";
import style from "../../styles/modules/Input.module.css";

const TextInput = ({
  title,
  required,
  placeholder,
  type,
  id,
  error,
  validation,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-stone-800 text-lg font-semibold">
        {title}{" "}
        {required ? <sup className="text-red-500 px-1 text-xl">*</sup> : null}
      </label>
      <input
        className={` w-full text-stone-800 border border-stone-400 rounded-md py-3 px-3 outline-none focus:shadow-[0_0_7px_#449BFF] focus:border-[#449BFF]  ${
          error && "border-red-500"
        }`}
        type={type}
        {...validation}
        id={id}
        placeholder={placeholder}
      />
      {error && (
        <div className="text-red-500 text-xs pt-3">{error.message}</div>
      )}
    </div>
  );
};

export { TextInput };
