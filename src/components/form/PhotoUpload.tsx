import { useState } from "react";

interface PhotoUploadProps {
  fileList: any;
  setFileList: (newFileList: any) => void;
}
const PhotoUpload: React.FC<PhotoUploadProps> = ({ fileList, setFileList }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    const file = selectedFile ? e.target.files : [];
    if (selectedFile) {
      setFileList(file);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Optional: For image preview
    }
  };

  return (
    <>
      <div>
        {fileList.length === 0 && (
          <input
            type="file"
            accept="image/*"
            className="file-input"
            onChange={onChange}
          />
        )}

        {fileList.length && previewUrl  ?(
          <div className="flex justify-start items-center">
            <img
              src={previewUrl}
              alt="Image Preview"
              className="rounded-md w-30 h-30 shadow-md"
            />

            <button
              onClick={() => {
                setFileList([]);
                setPreviewUrl(null);
              }}
              type="button"
              className="btn border-none btn-sm btn-circle btn-error text-white"
            >
              x
            </button>
          </div>
        ):<></>}
      </div>
    </>
  );
};

export default PhotoUpload;
