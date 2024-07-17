export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-white p-4">
      <div className="carousel mb-4">
        <div className="carousel-text text-4xl font-bold">
          <span>Welcome to Kitso! </span>
          
          
        </div>
      </div>
      <p className="text-lg mb-6 text-center">
        Your ultimate destination for knowledge, growth, and innovation.
      </p>
      <div style={{ width: "100%" }}>
        <div style={{ height: 0, paddingBottom: "56.25%", position: "relative", width: "100%" }}>
          <iframe
            allowFullScreen
            frameBorder="0"
            height="600"
            src="https://giphy.com/embed/CHJAZ8hZUsH3yyBw4q/video"
            style={{ height: '600px' }}
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
