import React, { FunctionComponent } from 'react';

interface Props extends
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const DropZone: FunctionComponent<Props> = ({ ...props }:Props) => (
  <div className="flex justify-center items-center w-full text-white">
    <label className="flex flex-col justify-center items-center w-full h-64 bg-black rounded-lg border-2 border-tmrev-gray-light border-dashed cursor-pointer hover:bg-tmrev-gray-dark" htmlFor="dropzone-file">
      <div className="flex flex-col justify-center items-center pt-5 pb-6">
        <svg
          aria-hidden="true"
          className="mb-3 w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload </span>
          or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">CSV</p>
      </div>
      <input
        {...props}
        className="hidden"
        id="dropzone-file"
        type="file"
      />
    </label>
  </div>
);

export default DropZone;
