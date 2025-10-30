import Head from "next/head";

export default function Home({ image, title }) {
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <Head>
        <title>{title || "Overlay Banner"}</title>
      </Head>

      {/* Image */}
      {image ? (
        <img
          src={image}
          alt="Banner"
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "auto",
            display: "block",
            margin: "0 auto"
          }}
        />
      ) : (
        <p style={{ color: "gray" }}>Please provide an image URL via ?image=</p>
      )}

      {/* Banner Text */}
      {title && (
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "15px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "-4px"
          }}
        >
          {decodeURIComponent(title)}
        </div>
      )}
    </div>
  );
}

// Server-side rendering to capture URL params
export async function getServerSideProps(context) {
  const { image = "", title = "" } = context.query;
  return { props: { image, title } };
}