import React, { useState } from "react";
import { motion } from "framer-motion";
export default function LoginInput({
  placeHolder,
  icon,
  inputState,
  InputStateFunc,
  type,
}) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      } flex items-center justify-center gap-4 bg-gray-100 rounded backdrop-blur-md w-full h-full px-4 py-2`}>
      {icon}
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold rounded outline-none"
        value={inputState}
        onChange={(e) => InputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
}
