import Head from "next/head";

export default function Home({ image, title }) {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    padding: "20px"
  };

  const canvasStyle = {
    position: "relative",
    width: "1080px",
    height: "1350px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
    border: "2px solid rgba(255, 255, 255, 0.1)"
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
  };

  const overlayStyle = {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    background: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 0.95) 100%)",
    padding: "80px 40px 60px 40px",
    color: "white",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    fontWeight: "800",
    lineHeight: "1.1",
    margin: "0",
    textShadow: "2px 4px 12px rgba(0, 0, 0, 0.8)",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.02em"
  };

  const noImageStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    textAlign: "center",
    padding: "40px"
  };

  const placeholderTextStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    opacity: "0.9",
    marginBottom: "20px"
  };

  const instructionStyle = {
    fontSize: "1rem",
    opacity: "0.7",
    maxWidth: "600px",
    lineHeight: "1.6"
  };

  return (
    <>
      <Head>
        <title>{title ? decodeURIComponent(title) : "Overlay Banner Generator"}</title>
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Create beautiful overlay banners with custom images and text" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🖼️</text></svg>" />
      </Head>

      <div style={containerStyle} className="banner-container">
        <div style={canvasStyle} className="banner-canvas">
          {image ? (
            <>
              <img
                src={image}
                alt="Banner Background"
                style={imageStyle}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {title && (
                <div style={overlayStyle}>
                  <h1 style={titleStyle} className="banner-title">
                    {decodeURIComponent(title)}
                  </h1>
                </div>
              )}
            </>
          ) : (
            <div style={noImageStyle}>
              <div style={placeholderTextStyle}>
                🎨 Overlay Banner Generator
              </div>
              <div style={instructionStyle}>
                Create stunning 1080×1350 banners with overlay text
                <br />
                <strong>?image=IMAGE_URL&title=YOUR_TITLE</strong>
                <br /><br />
                <em>Perfect for social media posts, presentations, and more!</em>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Server-side rendering to capture URL params
export async function getServerSideProps(context) {
  const { image = "", title = "" } = context.query;
  return { props: { image, title } };
}