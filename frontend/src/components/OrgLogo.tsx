import { useState } from "react";

function OrgLogo({ organization }:{organization:any}) {
  const [logo, setLogo] = useState(organization.profileImage || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid&w=740&q=80");
  const [hovered, setHovered] = useState(false);

  const handleLogoChange = async (e:any) => {
    const file = e.target.files[0];
    if (!file) return;
     const previewURL = URL.createObjectURL(file);


  setLogo(previewURL); 
  };

  return (
    <div
      className="relative w-24 h-24 rounded-lg overflow-hidden group cursor-pointer border border-gray-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* image or default */}
      <img
        src={logo }
        alt="Org Logo"
        className="w-full h-full object-cover rounded-lg"
      />
      <div
        className={`absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        Change Logo
      </div>

      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleLogoChange}
      />
    </div>
  );
}

export default OrgLogo;
