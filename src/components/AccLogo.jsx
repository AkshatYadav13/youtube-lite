
const AccLogo = ({ url, size }) => {
  return (
    <img
      style={{ width: size, height: size ,borderRadius:'50%'}}
      src={url}
      onError={(e) => {
        e.target.src = 'https://banner2.cleanpng.com/20190227/zox/kisspng-clip-art-computer-icons-openclipart-user-vector-gr-my-svg-png-icon-free-download-14-352-onlinewe-1713904397626.webp'; // Set fallback image
      }}
    />
  );
};

export default AccLogo;
